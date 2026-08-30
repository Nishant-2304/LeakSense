"""Sensor placement and experimental reranking helpers."""

from __future__ import annotations

import concurrent.futures
from typing import Any, Dict, Sequence

import numpy as np
import pandas as pd
import torch

from .inference import predict
from .simulation import solve_epanet_candidate


def optimize_sensors_empirical(
    residuals: np.ndarray,
    budget: int,
    num_candidates: int = 10,
    random_state: int | None = None,
) -> list[int]:
    """Variance/correlation sensor placement heuristic from the notebook."""
    rng = np.random.default_rng(random_state)
    num_nodes = residuals.shape[1]
    variances = np.var(residuals, axis=0)
    correlation_matrix = np.nan_to_num(np.abs(np.corrcoef(residuals, rowvar=False)))

    best_layout = None
    best_score = -np.inf

    for _ in range(num_candidates):
        selected: list[int] = []
        scores = variances.copy()

        for _ in range(budget):
            noisy_scores = scores * rng.uniform(0.9, 1.1, size=num_nodes)
            best_node = int(np.argmax(noisy_scores))
            selected.append(best_node)

            for node_idx in range(num_nodes):
                if node_idx not in selected:
                    scores[node_idx] *= 1.0 - correlation_matrix[best_node, node_idx]
            scores[best_node] = 0.0

        layout_score = float(np.sum(variances[selected]))
        if layout_score > best_score:
            best_score = layout_score
            best_layout = selected

    return best_layout or []


def epanet_topk_rerank_experimental(
    model: torch.nn.Module,
    x_samples: torch.Tensor,
    masks: torch.Tensor,
    sample_indices: Sequence[int],
    test_sample_scenarios: np.ndarray,
    test_node_labels: np.ndarray,
    y_scaler: Any,
    base_dir: str,
    canonical_nodes: Sequence[str],
    baseline_h: np.ndarray,
    leak_metadata,
    x_test_unscaled: np.ndarray,
    top_k: int = 3,
    max_workers: int = 8,
) -> Dict[str, float]:
    """Experimental EPANET top-k reranking; preserved from notebook, not production-ready."""
    jobs = []
    gat_predictions = {}

    for sample_idx in sample_indices:
        result = predict(
            model,
            x_samples[sample_idx : sample_idx + 1],
            masks[sample_idx : sample_idx + 1],
            top_k=top_k,
        )
        candidate_indices = [int(x) for x in result["top_indices"][0].cpu().numpy()]
        ql_pred = float(
            y_scaler.inverse_transform(
                np.array([[0.0, 0.0, float(result["ql_scaled"].item())]])
            )[0, 2]
        )
        ql_pred = max(ql_pred, 1e-3)

        scenario_id = int(test_sample_scenarios[sample_idx])
        scenario_positions = np.where(test_sample_scenarios == scenario_id)[0]
        local_idx = np.where(scenario_positions == sample_idx)[0][0]

        leak_info = leak_metadata[leak_metadata["scenario"] == scenario_id].iloc[0]
        leak_demand = pd.read_csv(leak_info["demand_file"])
        active_indices = np.where(
            leak_demand[leak_info["leak_id"]].to_numpy(dtype=np.float32) != 0
        )[0]
        row_idx = int(active_indices[local_idx])

        gat_predictions[sample_idx] = {
            "candidates": candidate_indices,
            "scenario": scenario_id,
        }

        for candidate_idx in candidate_indices:
            jobs.append(
                (
                    base_dir,
                    scenario_id,
                    row_idx,
                    candidate_idx,
                    ql_pred,
                    x_test_unscaled[sample_idx],
                    list(canonical_nodes),
                    baseline_h,
                    leak_metadata,
                )
            )

    with concurrent.futures.ProcessPoolExecutor(max_workers=max_workers) as executor:
        solved = list(executor.map(solve_epanet_candidate, jobs))

    gat_correct = 0
    physics_correct = 0
    for sample_idx in sample_indices:
        info = gat_predictions[sample_idx]
        candidate_indices = info["candidates"]
        scenario_id = info["scenario"]
        candidate_scores = [
            (candidate_idx, score)
            for solved_scenario, candidate_idx, score in solved
            if solved_scenario == scenario_id and candidate_idx in candidate_indices
        ]
        candidate_scores.sort(key=lambda item: item[1])

        gat_node = candidate_indices[0]
        physics_node = candidate_scores[0][0]
        true_node = int(test_node_labels[sample_idx])

        gat_correct += gat_node == true_node
        physics_correct += physics_node == true_node

    count = len(sample_indices)
    return {
        "samples": float(count),
        "top_k": float(top_k),
        "gat_top1_accuracy": gat_correct / count,
        "epanet_reranked_accuracy": physics_correct / count,
        "accuracy_change": (physics_correct - gat_correct) / count,
    }
