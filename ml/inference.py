"""Checkpoint loading and final PIGNN inference utilities."""

from __future__ import annotations

import pickle
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, Tuple

import numpy as np
import torch
from torch import Tensor, nn

from .config import KAGGLE_CHECKPOINT, NETWORK_INP_PATH, PREPROCESSING_PATH
from .model import DEAD_CLASS_INDEX, MultiGPUPIGNN
from .network import build_graph_tensors, get_canonical_nodes, load_water_network


@dataclass(frozen=True)
class InferenceBundle:
    model: nn.Module
    metadata: Dict[str, Any]
    canonical_nodes: list[str]
    canonical_node_coords: np.ndarray
    x_scaler: Any
    y_scaler: Any
    edge_index: Tensor
    edge_attr: Tensor
    edge_mean: Tensor
    edge_std: Tensor
    device: torch.device
    preprocessing: Dict[str, Any]


_DEFAULT_BUNDLE: InferenceBundle | None = None


def _strip_module_prefix(state_dict: Dict[str, Tensor]) -> Dict[str, Tensor]:
    return {
        key.removeprefix("module."): value
        for key, value in state_dict.items()
    }


def load_checkpoint(
    checkpoint_path: str | Path,
    edge_index: Tensor,
    edge_attr: Tensor,
    device: torch.device | str | None = None,
) -> Tuple[nn.Module, Dict[str, Any]]:
    device = torch.device(device or "cpu")
    checkpoint = torch.load(checkpoint_path, map_location=device)
    state_dict = checkpoint.get("model_state_dict", checkpoint)
    state_dict = _strip_module_prefix(state_dict)

    model = MultiGPUPIGNN(edge_index.to(device), edge_attr.to(device)).to(device)
    model.load_state_dict(state_dict)
    model.eval()
    metadata = checkpoint.get("metadata", {}) if isinstance(checkpoint, dict) else {}
    return model, metadata


def load_preprocessing(preprocessing_path: str | Path) -> Dict[str, Any]:
    with open(preprocessing_path, "rb") as file:
        preprocessing = pickle.load(file)
    if not isinstance(preprocessing, dict):
        raise TypeError("preprocessing.pkl must contain a dictionary.")
    return preprocessing


def _require_preprocessing_keys(
    preprocessing: Dict[str, Any],
    required_keys: Tuple[str, ...],
) -> None:
    missing = [key for key in required_keys if key not in preprocessing]
    if missing:
        raise KeyError(f"preprocessing.pkl is missing required keys: {missing}")


def _as_tensor(value: Any) -> Tensor:
    if isinstance(value, Tensor):
        return value.detach().cpu().float()
    return torch.tensor(value, dtype=torch.float32)


def load_inference_bundle(
    checkpoint_path: str | Path = KAGGLE_CHECKPOINT,
    inp_path: str | Path = NETWORK_INP_PATH,
    preprocessing_path: str | Path = PREPROCESSING_PATH,
    device: torch.device | str | None = None,
) -> InferenceBundle:
    device = torch.device(device or "cpu")
    wn = load_water_network(inp_path)
    canonical_nodes = get_canonical_nodes(wn)
    preprocessing = load_preprocessing(preprocessing_path)

    required_keys = (
        "canonical_nodes",
        "x_scaler",
        "y_scaler",
        "edge_mean",
        "edge_std",
        "canonical_node_coords",
    )
    _require_preprocessing_keys(preprocessing, required_keys)

    saved_nodes = [str(node) for node in preprocessing["canonical_nodes"]]
    if saved_nodes != canonical_nodes:
        raise ValueError(
            "preprocessing.pkl canonical_nodes do not match WNTR node_name_list order."
        )

    edge_index, edge_attr, edge_mean, edge_std = build_graph_tensors(wn, canonical_nodes)
    saved_edge_mean = _as_tensor(preprocessing["edge_mean"])
    saved_edge_std = _as_tensor(preprocessing["edge_std"])
    if not torch.allclose(edge_mean.cpu(), saved_edge_mean, atol=1e-6, rtol=1e-5):
        raise ValueError("Computed edge_mean does not match preprocessing.pkl.")
    if not torch.allclose(edge_std.cpu(), saved_edge_std, atol=1e-6, rtol=1e-5):
        raise ValueError("Computed edge_std does not match preprocessing.pkl.")

    raw_edge_attr = (edge_attr.cpu() * edge_std.cpu()) + edge_mean.cpu()
    saved_normalized_edge_attr = (raw_edge_attr - saved_edge_mean) / saved_edge_std
    if not torch.allclose(
        edge_attr.cpu(), saved_normalized_edge_attr, atol=1e-5, rtol=1e-5
    ):
        raise ValueError("Computed edge_attr does not match preprocessing edge stats.")

    model, metadata = load_checkpoint(checkpoint_path, edge_index, edge_attr, device)

    return InferenceBundle(
        model=model,
        metadata=metadata,
        canonical_nodes=canonical_nodes,
        canonical_node_coords=np.asarray(preprocessing["canonical_node_coords"]),
        x_scaler=preprocessing["x_scaler"],
        y_scaler=preprocessing["y_scaler"],
        edge_index=edge_index,
        edge_attr=edge_attr,
        edge_mean=edge_mean,
        edge_std=edge_std,
        device=device,
        preprocessing=preprocessing,
    )


def make_node_features(x: Tensor, masks: Tensor) -> Tensor:
    return torch.stack([x * masks, masks], dim=-1)


@torch.no_grad()
def predict(
    model: nn.Module,
    x: Tensor,
    masks: Tensor,
    top_k: int = 5,
) -> Dict[str, Tensor]:
    model.eval()
    node_features = make_node_features(x, masks)
    logits, ql_scaled = model(node_features)

    masked_logits = logits.clone()
    masked_logits[:, DEAD_CLASS_INDEX] = -1e9
    probabilities = torch.softmax(masked_logits, dim=1)
    top_probabilities, top_indices = torch.topk(probabilities, k=top_k, dim=1)

    return {
        "logits": logits,
        "probabilities": probabilities,
        "top_indices": top_indices,
        "top_probabilities": top_probabilities,
        "predicted_nodes": top_indices[:, 0],
        "ql_scaled": ql_scaled,
    }


def inverse_transform_flow(ql_scaled: np.ndarray, y_scaler: Any) -> np.ndarray:
    ql_scaled = np.asarray(ql_scaled)
    return y_scaler.inverse_transform(
        np.column_stack([np.zeros(len(ql_scaled)), np.zeros(len(ql_scaled)), ql_scaled])
    )[:, 2]


def _get_default_bundle() -> InferenceBundle:
    global _DEFAULT_BUNDLE
    if _DEFAULT_BUNDLE is None:
        _DEFAULT_BUNDLE = load_inference_bundle(device="cpu")
    return _DEFAULT_BUNDLE


def predict_leak(
    sensor_values: np.ndarray | list[float],
    sensor_mask: np.ndarray | list[float],
    top_k: int = 5,
    bundle: InferenceBundle | None = None,
) -> Dict[str, Any]:
    """Run local CPU inference from one 32-node pressure-deviation vector."""
    bundle = bundle or _get_default_bundle()
    sensor_values_array = np.asarray(sensor_values, dtype=np.float32).reshape(1, -1)
    sensor_mask_array = np.asarray(sensor_mask, dtype=np.float32).reshape(1, -1)
    if sensor_values_array.shape[1] != len(bundle.canonical_nodes):
        raise ValueError(f"Expected {len(bundle.canonical_nodes)} sensor values.")
    if sensor_mask_array.shape != sensor_values_array.shape:
        raise ValueError("sensor_mask must have the same shape as sensor_values.")

    x_scaled = bundle.x_scaler.transform(sensor_values_array).astype(np.float32)
    mask = (sensor_mask_array > 0).astype(np.float32)
    x_tensor = torch.tensor(x_scaled, dtype=torch.float32, device=bundle.device)
    mask_tensor = torch.tensor(mask, dtype=torch.float32, device=bundle.device)

    result = predict(bundle.model, x_tensor, mask_tensor, top_k=top_k)
    top_indices = result["top_indices"][0].detach().cpu().numpy()
    top_probabilities = result["top_probabilities"][0].detach().cpu().numpy()
    ql_scaled = result["ql_scaled"].detach().cpu().numpy()
    ql = inverse_transform_flow(ql_scaled, bundle.y_scaler)
    predicted_index = int(result["predicted_nodes"][0].item())

    return {
        "predicted_node_id": bundle.canonical_nodes[predicted_index],
        "predicted_node_index": predicted_index,
        "predicted_qL": float(ql[0]),
        "predicted_qL_scaled": float(ql_scaled[0]),
        "top_k": [
            {
                "node_id": bundle.canonical_nodes[int(node_index)],
                "node_index": int(node_index),
                "probability": float(probability),
            }
            for node_index, probability in zip(top_indices, top_probabilities)
        ],
    }


def evaluate_predictions(
    predicted_nodes: np.ndarray,
    true_nodes: np.ndarray,
    top_indices: np.ndarray,
    canonical_node_coords: np.ndarray,
    y_true: np.ndarray,
    ql_scaled: np.ndarray,
    y_scaler: Any,
) -> Dict[str, float]:
    top1_accuracy = float(np.mean(predicted_nodes == true_nodes))
    top3_accuracy = float(
        (top_indices[:, :3] == true_nodes[:, None]).any(axis=1).mean()
    )
    top5_accuracy = float((top_indices == true_nodes[:, None]).any(axis=1).mean())

    predicted_xy = canonical_node_coords[predicted_nodes]
    location_errors = np.linalg.norm(predicted_xy - y_true[:, :2], axis=1)

    pred_ql = inverse_transform_flow(ql_scaled, y_scaler)
    true_ql = y_true[:, 2]

    return {
        "top1_accuracy": top1_accuracy,
        "top3_accuracy": top3_accuracy,
        "top5_accuracy": top5_accuracy,
        "mean_location_error": float(location_errors.mean()),
        "median_location_error": float(np.median(location_errors)),
        "p90_location_error": float(np.percentile(location_errors, 90)),
        "flow_mae": float(np.mean(np.abs(pred_ql - true_ql))),
        "flow_rmse": float(np.sqrt(np.mean((pred_ql - true_ql) ** 2))),
    }
