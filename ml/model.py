"""Final LeakSense physics-informed GNN architecture."""

from __future__ import annotations

from typing import Tuple

import torch
from torch import Tensor, nn
import torch.nn.functional as F
from torch_geometric.nn import GATv2Conv


NUM_NODES = 32
NODE_FEATURES = 2
EDGE_FEATURES = 3
DEAD_CLASS_INDEX = 31
MODEL_VERSION = "final-gatv2-pignn-v1"


class LeakPIGNN(nn.Module):
    """Node-level GATv2 backbone from the final notebook PIGNN."""

    def __init__(self) -> None:
        super().__init__()

        self.gat1 = GATv2Conv(
            2, 32, heads=4, concat=True, edge_dim=3, dropout=0.10
        )
        self.norm1 = nn.LayerNorm(128)

        self.gat2 = GATv2Conv(
            128, 32, heads=4, concat=True, edge_dim=3, dropout=0.10
        )
        self.norm2 = nn.LayerNorm(128)

        self.gat3 = GATv2Conv(
            128, 32, heads=4, concat=True, edge_dim=3, dropout=0.10
        )
        self.norm3 = nn.LayerNorm(128)

        self.gat4 = GATv2Conv(
            128, 32, heads=4, concat=True, edge_dim=3, dropout=0.10
        )
        self.norm4 = nn.LayerNorm(128)

        self.location_head = nn.Sequential(
            nn.Linear(128, 64),
            nn.GELU(),
            nn.Dropout(0.10),
            nn.Linear(64, 1),
        )

        self.flow_head = nn.Sequential(
            nn.Linear(128, 128),
            nn.GELU(),
            nn.Dropout(0.10),
            nn.Linear(128, 1),
        )

    def forward(
        self, x: Tensor, edge_index: Tensor, edge_attr: Tensor
    ) -> Tuple[Tensor, Tensor]:
        x = F.gelu(self.norm1(self.gat1(x, edge_index, edge_attr)))

        residual = x
        x = F.gelu(self.norm2(self.gat2(x, edge_index, edge_attr)))
        x = x + residual

        residual = x
        x = F.gelu(self.norm3(self.gat3(x, edge_index, edge_attr)))
        x = x + residual

        residual = x
        x = F.gelu(self.norm4(self.gat4(x, edge_index, edge_attr)))
        x = x + residual

        location_logits = self.location_head(x).squeeze(-1)
        return x, location_logits


class MultiGPUPIGNN(nn.Module):
    """Batched 32-node graph wrapper used by final training and inference."""

    def __init__(self, edge_index: Tensor, edge_attr: Tensor) -> None:
        super().__init__()

        self.gnn = LeakPIGNN()
        self.register_buffer("edge_index_base", edge_index.long())
        self.register_buffer("edge_attr_base", edge_attr.float())

        self.flow_head = nn.Sequential(
            nn.Linear(256, 128),
            nn.GELU(),
            nn.Dropout(0.10),
            nn.Linear(128, 1),
        )

    def forward(self, node_features: Tensor) -> Tuple[Tensor, Tensor]:
        batch_size = node_features.size(0)
        x = node_features.reshape(batch_size * NUM_NODES, NODE_FEATURES)

        edge_count = self.edge_index_base.size(1)
        edge_index_batch = self.edge_index_base.unsqueeze(1) + (
            torch.arange(batch_size, device=x.device).view(1, batch_size, 1)
            * NUM_NODES
        )
        edge_index_batch = edge_index_batch.permute(0, 2, 1).reshape(
            2, batch_size * edge_count
        )

        edge_attr_batch = (
            self.edge_attr_base.unsqueeze(0)
            .expand(batch_size, -1, -1)
            .reshape(batch_size * edge_count, EDGE_FEATURES)
        )

        node_embeddings, location_logits = self.gnn(
            x, edge_index_batch, edge_attr_batch
        )

        node_embeddings = node_embeddings.view(batch_size, NUM_NODES, 128)
        location_logits = location_logits.view(batch_size, NUM_NODES)

        graph_mean = node_embeddings.mean(dim=1)
        graph_max = node_embeddings.max(dim=1).values
        graph_features = torch.cat([graph_mean, graph_max], dim=1)

        flow_prediction = self.flow_head(graph_features).squeeze(-1)
        return location_logits, flow_prediction


def maybe_data_parallel(model: nn.Module) -> nn.Module:
    """Match notebook behavior only when multiple CUDA devices are available."""
    if torch.cuda.device_count() > 1:
        return nn.DataParallel(model)
    return model
