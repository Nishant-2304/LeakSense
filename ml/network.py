"""Canonical Hanoi network and graph construction utilities."""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List, Sequence, Tuple

import numpy as np
import torch
from torch import Tensor
import wntr

from .config import CANONICAL_NODES
from .model import DEAD_CLASS_INDEX, NUM_NODES


NodeLinkMap = Dict[str, List[Tuple[str, int]]]


def load_water_network(inp_path: str | Path) -> wntr.network.WaterNetworkModel:
    return wntr.network.WaterNetworkModel(str(inp_path))


def _node_kind(wn: wntr.network.WaterNetworkModel, node_name: str) -> str:
    node = wn.get_node(node_name)
    return type(node).__name__.lower()


def validate_canonical_order(
    wn: wntr.network.WaterNetworkModel,
    canonical_nodes: Sequence[str],
) -> None:
    """Assert the final model's dead class is the non-leak storage/source node."""
    if len(canonical_nodes) != NUM_NODES:
        raise ValueError(f"Expected {NUM_NODES} nodes, got {len(canonical_nodes)}")

    dead_node = canonical_nodes[DEAD_CLASS_INDEX]
    dead_kind = _node_kind(wn, dead_node)
    if "reservoir" not in dead_kind and "tank" not in dead_kind:
        raise ValueError(
            f"Dead class index {DEAD_CLASS_INDEX} maps to node {dead_node!r} "
            f"({type(wn.get_node(dead_node)).__name__}), expected Reservoir or Tank."
        )


def get_canonical_nodes(wn: wntr.network.WaterNetworkModel | None = None) -> List[str]:
    """Return the fixed trained-checkpoint node order."""
    nodes = list(CANONICAL_NODES)
    if len(nodes) != NUM_NODES:
        raise ValueError(f"Expected {NUM_NODES} nodes, got {len(nodes)}")
    if wn is not None:
        validate_canonical_order(wn, nodes)
    return nodes


def build_node_link_map(
    wn: wntr.network.WaterNetworkModel,
    canonical_nodes: Sequence[str],
) -> NodeLinkMap:
    validate_canonical_order(wn, canonical_nodes)
    nodes = list(canonical_nodes)
    node_link_map: NodeLinkMap = {node_id: [] for node_id in nodes}

    for link_id in wn.link_name_list:
        link = wn.get_link(link_id)
        start = str(link.start_node_name)
        end = str(link.end_node_name)
        name = str(link_id)

        if start in node_link_map:
            node_link_map[start].append((name, -1))
        if end in node_link_map:
            node_link_map[end].append((name, +1))

    return node_link_map


def get_canonical_node_coords(
    wn: wntr.network.WaterNetworkModel,
    canonical_nodes: Sequence[str],
) -> np.ndarray:
    return np.array(
        [wn.get_node(node_name).coordinates for node_name in canonical_nodes],
        dtype=np.float64,
    )


def map_to_nearest_canonical_node(
    xy_coords: np.ndarray,
    canonical_node_coords: np.ndarray,
) -> Tuple[np.ndarray, np.ndarray]:
    differences = xy_coords[:, None, :] - canonical_node_coords[None, :, :]
    distances = np.sqrt(np.sum(differences**2, axis=2))
    nearest_node_indices = np.argmin(distances, axis=1)
    nearest_node_distances = distances[
        np.arange(len(xy_coords)), nearest_node_indices
    ]
    return nearest_node_indices.astype(np.int64), nearest_node_distances


def build_graph_tensors(
    wn: wntr.network.WaterNetworkModel,
    canonical_nodes: Sequence[str],
) -> Tuple[Tensor, Tensor, Tensor, Tensor]:
    """Build directed edge_index and normalized [length, diameter, roughness]."""
    validate_canonical_order(wn, canonical_nodes)
    node_to_idx = {node_name: i for i, node_name in enumerate(canonical_nodes)}
    edge_pairs: list[list[int]] = []
    edge_features: list[list[float]] = []

    for _, link in wn.links():
        start_node = link.start_node_name
        end_node = link.end_node_name

        if start_node in node_to_idx and end_node in node_to_idx:
            i = node_to_idx[start_node]
            j = node_to_idx[end_node]
            attr = [
                float(getattr(link, "length", 0.0)),
                float(getattr(link, "diameter", 0.0)),
                float(getattr(link, "roughness", 0.0)),
            ]

            edge_pairs.append([i, j])
            edge_features.append(attr)
            edge_pairs.append([j, i])
            edge_features.append(attr)

    edge_index = torch.tensor(edge_pairs, dtype=torch.long).t().contiguous()
    raw_edge_attr = torch.tensor(edge_features, dtype=torch.float32)

    edge_mean = raw_edge_attr.mean(dim=0, keepdim=True)
    edge_std = raw_edge_attr.std(dim=0, keepdim=True)
    edge_std[edge_std < 1e-8] = 1.0
    edge_attr = (raw_edge_attr - edge_mean) / edge_std

    return edge_index, edge_attr, edge_mean, edge_std


def compute_residual_vector(
    flow_row,
    demand_row,
    canonical_nodes: Sequence[str],
    node_link_map: NodeLinkMap,
) -> np.ndarray:
    """Compute mass-balance residuals outside autograd for physics targets."""
    residuals = []

    for node_id in canonical_nodes:
        net_flow = 0.0
        for link_id, sign in node_link_map[node_id]:
            net_flow += sign * float(flow_row[link_id])

        demand = float(demand_row[node_id])
        residuals.append(net_flow - demand)

    return np.array(residuals, dtype=np.float32)
