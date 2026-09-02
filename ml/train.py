"""Final physics-guided PIGNN loss and training utilities."""

from __future__ import annotations

import copy
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Tuple

import numpy as np
import torch
from torch import Tensor, nn
import torch.nn.functional as F

from .model import DEAD_CLASS_INDEX, MODEL_VERSION


@dataclass(frozen=True)
class TrainingConfig:
    num_epochs: int = 60
    batch_size: int = 8192
    learning_rate: float = 7e-4
    weight_decay: float = 2e-4
    scheduler_factor: float = 0.5
    scheduler_patience: int = 7
    min_lr: float = 1e-6
    grad_clip_max_norm: float = 5.0
    train_sensor_min: int = 15
    train_sensor_max: int = 32
    val_sensor_min: int = 15
    val_sensor_max: int = 32
    location_weight: float = 2.0
    flow_weight: float = 0.5
    physics_weight: float = 0.20
    label_smoothing: float = 0.05


def create_random_sensor_masks(
    num_samples: int,
    num_nodes: int = 32,
    min_sensors: int = 15,
    max_sensors: int = 32,
    device: torch.device | str | None = None,
    dtype: torch.dtype = torch.float32,
) -> Tensor:
    mask = torch.zeros(num_samples, num_nodes, dtype=dtype, device=device)
    for i in range(num_samples):
        n_active = torch.randint(min_sensors, max_sensors + 1, (1,), device=device).item()
        indices = torch.randperm(num_nodes, device=device)[:n_active]
        mask[i, indices] = 1.0
    return mask


def apply_random_sensor_mask(
    x: Tensor,
    min_sensors: int = 15,
    max_sensors: int = 32,
) -> Tuple[Tensor, Tensor]:
    batch_size, num_nodes = x.shape
    sensor_counts = torch.randint(
        min_sensors, max_sensors + 1, (batch_size,), device=x.device
    )
    random_scores = torch.rand(batch_size, num_nodes, device=x.device)
    random_order = random_scores.argsort(dim=1)
    ranks = random_order.argsort(dim=1)
    sensor_mask = (ranks < sensor_counts.unsqueeze(1)).float()
    node_features = torch.stack([x * sensor_mask, sensor_mask], dim=-1)
    return node_features, sensor_mask


def compute_class_weights(
    node_labels: np.ndarray,
    num_nodes: int = 32,
    exclude_dead_class: bool = True,
    device: torch.device | str | None = None,
) -> Tensor:
    class_counts = np.bincount(node_labels, minlength=num_nodes).astype(np.float32)
    weight_count = DEAD_CLASS_INDEX if exclude_dead_class else num_nodes
    class_weights = np.ones(weight_count, dtype=np.float32)
    valid = class_counts[:weight_count] > 0
    class_weights[valid] = 1.0 / np.sqrt(class_counts[:weight_count][valid])
    class_weights[valid] /= class_weights[valid].mean()
    return torch.tensor(class_weights, dtype=torch.float32, device=device)


def make_physics_targets(
    train_residual_matrix: np.ndarray,
    device: torch.device | str | None = None,
) -> Tuple[Tensor, Tensor]:
    """Convert non-differentiable residuals into soft node-class targets."""
    residuals = torch.tensor(
        np.abs(train_residual_matrix), dtype=torch.float32, device=device
    )
    residuals = residuals[:, :DEAD_CLASS_INDEX]
    physics_sum = residuals.sum(dim=1, keepdim=True)
    physics_target = residuals / (physics_sum + 1e-8)
    physics_valid = physics_sum.squeeze(1) > 1e-8
    return physics_target, physics_valid


def pignn_loss(
    location_logits: Tensor,
    flow_predictions: Tensor,
    node_labels: Tensor,
    ql_targets: Tensor,
    class_weights: Tensor,
    physics_targets: Tensor | None = None,
    physics_valid: Tensor | None = None,
    config: TrainingConfig = TrainingConfig(),
) -> Tuple[Tensor, Tensor, Tensor, Tensor]:
    logits = location_logits[:, :DEAD_CLASS_INDEX]

    location_loss = F.cross_entropy(
        logits,
        node_labels,
        weight=class_weights,
        label_smoothing=config.label_smoothing,
    )
    flow_loss = F.mse_loss(flow_predictions, ql_targets)
    total_loss = config.location_weight * location_loss + config.flow_weight * flow_loss

    physics_loss = torch.tensor(0.0, device=location_logits.device)
    if (
        physics_targets is not None
        and physics_valid is not None
        and physics_valid.any()
    ):
        log_probs = F.log_softmax(logits[physics_valid], dim=1)
        physics_loss = F.kl_div(
            log_probs, physics_targets[physics_valid], reduction="batchmean"
        )
        total_loss = total_loss + config.physics_weight * physics_loss

    return total_loss, location_loss, flow_loss, physics_loss


def train_pignn(
    model: nn.Module,
    x_train: Tensor,
    y_train: Tensor,
    train_node_labels: np.ndarray,
    x_val: Tensor,
    y_val: Tensor,
    val_node_labels: np.ndarray,
    val_masks: Tensor,
    train_residual_matrix: np.ndarray | None = None,
    config: TrainingConfig = TrainingConfig(),
) -> Dict[str, Any]:
    device = x_train.device
    optimizer = torch.optim.AdamW(
        model.parameters(), lr=config.learning_rate, weight_decay=config.weight_decay
    )
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer,
        mode="min",
        factor=config.scheduler_factor,
        patience=config.scheduler_patience,
        min_lr=config.min_lr,
    )

    train_labels = torch.tensor(train_node_labels, dtype=torch.long, device=device)
    val_labels = torch.tensor(val_node_labels, dtype=torch.long, device=device)
    class_weights = compute_class_weights(train_node_labels, device=device)

    physics_target = physics_valid = None
    if train_residual_matrix is not None:
        physics_target, physics_valid = make_physics_targets(train_residual_matrix, device)

    train_losses: List[float] = []
    val_losses: List[float] = []
    best_val_loss = float("inf")
    best_model_state = None
    best_epoch = 0
    training_start_time = time.time()

    for epoch in range(config.num_epochs):
        model.train()
        permutation = torch.randperm(x_train.size(0), device=device)
        running_train_loss = 0.0
        running_train_physics = 0.0
        train_seen = 0

        for start in range(0, x_train.size(0), config.batch_size):
            idx = permutation[start : start + config.batch_size]
            x_batch = x_train[idx]
            y_batch = y_train[idx]
            labels = train_labels[idx]
            physics_batch = physics_target[idx] if physics_target is not None else None
            physics_valid_batch = physics_valid[idx] if physics_valid is not None else None

            node_features, _ = apply_random_sensor_mask(
                x_batch, config.train_sensor_min, config.train_sensor_max
            )
            location_logits, flow_predictions = model(node_features)
            loss, _, _, physics_loss = pignn_loss(
                location_logits,
                flow_predictions,
                labels,
                y_batch[:, 2],
                class_weights,
                physics_batch,
                physics_valid_batch,
                config,
            )

            optimizer.zero_grad(set_to_none=True)
            loss.backward()
            torch.nn.utils.clip_grad_norm_(
                model.parameters(), max_norm=config.grad_clip_max_norm
            )
            optimizer.step()

            batch_size = x_batch.size(0)
            running_train_loss += loss.detach().item() * batch_size
            running_train_physics += physics_loss.detach().item() * batch_size
            train_seen += batch_size

        train_loss = running_train_loss / train_seen
        train_physics = running_train_physics / train_seen

        model.eval()
        running_val_loss = 0.0
        val_seen = 0
        with torch.no_grad():
            for start in range(0, x_val.size(0), config.batch_size):
                end = min(start + config.batch_size, x_val.size(0))
                x_batch = x_val[start:end]
                y_batch = y_val[start:end]
                labels = val_labels[start:end]
                masks = val_masks[start:end]
                node_features = torch.stack([x_batch * masks, masks], dim=-1)

                location_logits, flow_predictions = model(node_features)
                loss, _, _, _ = pignn_loss(
                    location_logits,
                    flow_predictions,
                    labels,
                    y_batch[:, 2],
                    class_weights,
                    config=config,
                )

                batch_size = end - start
                running_val_loss += loss.detach().item() * batch_size
                val_seen += batch_size

        val_loss = running_val_loss / val_seen
        scheduler.step(val_loss)
        train_losses.append(train_loss)
        val_losses.append(val_loss)

        if val_loss < best_val_loss:
            best_val_loss = val_loss
            best_epoch = epoch + 1
            best_model_state = copy.deepcopy(model.state_dict())

        print(
            f"Epoch [{epoch + 1:02d}/{config.num_epochs}] | "
            f"Train: {train_loss:.4f} | Val: {val_loss:.4f} | "
            f"Phys: {train_physics:.4f} | LR: {optimizer.param_groups[0]['lr']:.2e} | "
            f"Time: {(time.time() - training_start_time) / 60:.1f} min"
        )

    if best_model_state is not None:
        model.load_state_dict(best_model_state)

    return {
        "model": model,
        "best_model_state": best_model_state,
        "best_epoch": best_epoch,
        "best_val_loss": best_val_loss,
        "train_losses": train_losses,
        "val_losses": val_losses,
        "class_weights": class_weights.detach().cpu(),
        "config": config,
    }


def save_checkpoint(
    path: str | Path,
    model: nn.Module,
    metadata: Dict[str, Any] | None = None,
) -> None:
    state_dict = model.module.state_dict() if hasattr(model, "module") else model.state_dict()
    checkpoint_metadata = {
        "architecture": MODEL_VERSION,
        "dead_class_index": DEAD_CLASS_INDEX,
        "training_config": TrainingConfig().__dict__,
    }
    checkpoint_metadata.update(metadata or {})
    torch.save({"model_state_dict": state_dict, "metadata": checkpoint_metadata}, path)
