import numpy as np
import torch
import torch.nn.functional as F


def optimize_sensors_empirical(R_train, Y_train, budget, model, device, num_candidates=10):
    """
    Empirical sensor optimization using the trained GNN model.
    Tests multiple candidate sensor layouts and picks the one with lowest prediction error.
    """
    num_nodes = R_train.shape[1]
    
    # 1. Base Information Metrics
    variances = np.var(R_train, axis=0)
    correlation_matrix = np.nan_to_num(np.abs(np.corrcoef(R_train, rowvar=False)))
    
    candidates = []
    
    # 2. Generate Candidate Pool
    for _ in range(num_candidates):
        selected = []
        scores = variances.copy()
        
        for _ in range(budget):
            # Add jitter to explore different layouts
            jitter = np.random.uniform(0.9, 1.1, size=num_nodes) 
            noisy_scores = scores * jitter
            
            best_node = int(np.argmax(noisy_scores))
            selected.append(best_node)
            
            # Penalize overlaps
            for i in range(num_nodes):
                if i not in selected:
                    scores[i] *= (1.0 - correlation_matrix[best_node, i])
            scores[best_node] = 0.0
            
        candidates.append(selected)
    
    # 3. The Empirical AI Test (Forward Pass with GNN)
    best_layout = None
    lowest_error = float('inf')
    
    # Convert labels to tensor once
    y_true_tensor = torch.tensor(Y_train, dtype=torch.float32).to(device)
    
    model.eval()
    with torch.no_grad():
        for layout in candidates:
            # Create a zero-masked copy of the entire training dataset
            masked_R = np.zeros_like(R_train)
            for node_idx in layout:
                if node_idx < masked_R.shape[1]:
                    masked_R[:, node_idx] = R_train[:, node_idx]
            
            # For GNN, we need to run inference per scenario (batch processing is complex with graph structure)
            # Simplified: compute average error across a subset of scenarios
            subset_size = min(100, len(masked_R))
            indices = np.random.choice(len(masked_R), subset_size, replace=False)
            
            total_loss = 0.0
            for idx in indices:
                # Prepare single graph input
                masked_input = masked_R[idx]
                
                # Simple graph construction for inference
                edge_index = []
                for i in range(num_nodes):
                    for j in range(num_nodes):
                        if i != j:
                            edge_index.append([i, j])
                edge_index = torch.tensor(edge_index, dtype=torch.long).t().contiguous().to(device)
                edge_attr = torch.ones(edge_index.size(1), 3, dtype=torch.float32).to(device)
                
                node_features = torch.zeros(num_nodes, 2, dtype=torch.float32).to(device)
                node_features[:, 0] = torch.tensor(masked_input, dtype=torch.float32).to(device)
                node_features[:, 1] = 1.0
                
                pred_coords, _ = model(node_features, edge_index, edge_attr)
                true_coords = y_true_tensor[idx:idx+1]
                
                loss = F.mse_loss(pred_coords, true_coords).item()
                total_loss += loss
            
            avg_loss = total_loss / subset_size
            
            if avg_loss < lowest_error:
                lowest_error = avg_loss
                best_layout = layout
    
    return best_layout


def optimize_sensors_variance(R_train, budget):
    """Simple variance-based sensor selection (fallback)."""
    variances = np.var(R_train, axis=0)
    optimal_nodes = np.argsort(variances)[-budget:][::-1]
    return optimal_nodes.tolist()


def optimize_sensors_mutual_info(R_train, budget):
    """Mutual information / correlation-based sensor selection."""
    num_nodes = R_train.shape[1]
    variances = np.var(R_train, axis=0)
    correlation_matrix = np.nan_to_num(np.abs(np.corrcoef(R_train, rowvar=False)))
    
    selected = []
    scores = variances.copy()
    
    for _ in range(budget):
        best_node = int(np.argmax(scores))
        selected.append(best_node)
        
        for i in range(num_nodes):
            if i not in selected:
                scores[i] *= (1.0 - correlation_matrix[best_node, i])
        scores[best_node] = 0.0
    
    return selected