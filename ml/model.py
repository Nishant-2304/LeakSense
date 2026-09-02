import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GATv2Conv


class LeakPIGNN_GATv2(nn.Module):
    """
    Exact architecture matching the pignn_checkpoint.pt:
    - 4 GATv2 layers with hidden_dim=128, heads=4
    - LayerNorm after each GAT
    - gnn.location_head: Linear(128->64) -> ReLU -> Linear(64->1) [per node]
    - gnn.flow_head: Linear(128->128) -> ReLU -> Linear(128->1) [per node]
    - flow_head (root): Linear(256->128) -> ReLU -> Linear(128->1) [global]
    """
    def __init__(
        self,
        num_nodes=32,
        node_features=2,
        edge_features=3,
        hidden_dim=128,
        heads=4,
        num_layers=4,
    ):
        super().__init__()
        self.num_nodes = num_nodes
        self.num_layers = num_layers
        self.hidden_dim = hidden_dim
        self.heads = heads

        # GAT layers (matching checkpoint: gnn.gat1-gat4)
        self.gat1 = GATv2Conv(
            node_features, hidden_dim, heads=heads, concat=True,
            edge_dim=edge_features, dropout=0.1, add_self_loops=False
        )
        self.norm1 = nn.LayerNorm(hidden_dim * heads)

        self.gat2 = GATv2Conv(
            hidden_dim * heads, hidden_dim, heads=heads, concat=True,
            edge_dim=edge_features, dropout=0.1, add_self_loops=False
        )
        self.norm2 = nn.LayerNorm(hidden_dim * heads)

        self.gat3 = GATv2Conv(
            hidden_dim * heads, hidden_dim, heads=heads, concat=True,
            edge_dim=edge_features, dropout=0.1, add_self_loops=False
        )
        self.norm3 = nn.LayerNorm(hidden_dim * heads)

        self.gat4 = GATv2Conv(
            hidden_dim * heads, hidden_dim, heads=1, concat=False,
            edge_dim=edge_features, dropout=0.1, add_self_loops=False
        )
        self.norm4 = nn.LayerNorm(hidden_dim)

        # gnn.location_head: Linear(128->64) -> ReLU -> Linear(64->1)
        self.location_head = nn.Sequential(
            nn.Linear(hidden_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 1)
        )

        # gnn.flow_head: Linear(128->128) -> ReLU -> Linear(128->1)
        self.flow_head_node = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, 1)
        )

        # flow_head (root): Linear(256->128) -> ReLU -> Linear(128->1)
        # Takes concatenated [mean_pool, max_pool] = 256 features
        self.flow_head_global = nn.Sequential(
            nn.Linear(hidden_dim * 2, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, 1)
        )

        # Store base graph structure
        self.register_buffer('edge_index_base', None)
        self.register_buffer('edge_attr_base', None)

    def set_graph_structure(self, edge_index, edge_attr):
        """Set the base graph structure for inference."""
        self.edge_index_base = edge_index
        self.edge_attr_base = edge_attr

    def forward(self, x, edge_index=None, edge_attr=None, batch=None):
        # Use stored graph structure if not provided
        if edge_index is None:
            edge_index = self.edge_index_base
        if edge_attr is None:
            edge_attr = self.edge_attr_base

        # GAT layers with LayerNorm
        h = self.gat1(x, edge_index, edge_attr=edge_attr)
        h = self.norm1(h)
        h = F.relu(h)
        h = F.dropout(h, p=0.1, training=self.training)

        h = self.gat2(h, edge_index, edge_attr=edge_attr)
        h = self.norm2(h)
        h = F.relu(h)
        h = F.dropout(h, p=0.1, training=self.training)

        h = self.gat3(h, edge_index, edge_attr=edge_attr)
        h = self.norm3(h)
        h = F.relu(h)
        h = F.dropout(h, p=0.1, training=self.training)

        h = self.gat4(h, edge_index, edge_attr=edge_attr)
        h = self.norm4(h)

        # Node-level predictions
        location_logits = self.location_head(h).squeeze(-1)  # [num_nodes]
        flow_pred_node = self.flow_head_node(h).squeeze(-1)  # [num_nodes]

        # Graph-level prediction (global pooling)
        if batch is not None:
            from torch_geometric.nn import global_mean_pool, global_max_pool
            h_mean = global_mean_pool(h, batch)
            h_max = global_max_pool(h, batch)
            h_global = torch.cat([h_mean, h_max], dim=-1)  # [batch_size, 256]
        else:
            h_mean = h.mean(dim=0, keepdim=True)
            h_max = h.max(dim=0, keepdim=True)[0]
            h_global = torch.cat([h_mean, h_max], dim=-1)  # [1, 256]

        flow_global = self.flow_head_global(h_global)  # [batch_size, 1]

        return location_logits, flow_pred_node, flow_global


class PINNModel(nn.Module):
    """Legacy simple MLP for backward compatibility"""
    def __init__(self, input_dim=31, hidden_dim=128, output_dim=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, output_dim)
        )
    
    def forward(self, x):
        return self.net(x)