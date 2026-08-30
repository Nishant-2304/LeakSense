import numpy as np
import torch
import torch.nn.functional as F

def optimize_sensors_empirical(R_train, Y_train, budget, model, device, num_candidates=10):
    num_nodes = R_train.shape[1]
    
    # 1. Base Information Metrics
    variances = np.var(R_train, axis=0)
    correlation_matrix = np.nan_to_num(np.abs(np.corrcoef(R_train, rowvar=False)))
    
    candidates = []
    
    # 2. Generate Candidate Pool (Adding slight randomness to explore the graph)
    for _ in range(num_candidates):
        selected = []
        scores = variances.copy()
        
        for _ in range(budget):
            # Add a small random jitter to the scores to prevent picking the exact same nodes every time
            jitter = np.random.uniform(0.9, 1.1, size=num_nodes) 
            noisy_scores = scores * jitter
            
            best_node = int(np.argmax(noisy_scores))
            selected.append(best_node)
            
            # Penalize overlaps as usual
            for i in range(num_nodes):
                if i not in selected:
                    scores[i] *= (1.0 - correlation_matrix[best_node, i])
            scores[best_node] = 0.0
            
        candidates.append(selected)
        
    # 3. The Empirical AI Test (The Forward Pass)
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
                masked_R[:, node_idx] = R_train[:, node_idx]
                
            # Convert to PyTorch tensor [800, 31]
            x_tensor = torch.tensor(masked_R, dtype=torch.float32).to(device)
            
            # Run the forward pass on all 800 scenarios at once
            predictions = model(x_tensor)
            
            # Calculate the Mean Squared Error for this specific layout
            mse_loss = F.mse_loss(predictions, y_true_tensor).item()
            
            # Keep track of the absolute best performer
            if mse_loss < lowest_error:
                lowest_error = mse_loss
                best_layout = layout
                
    return best_layout