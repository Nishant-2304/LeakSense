import sys
from pathlib import Path

# Add project root to python search path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import random
import torch

# Import your working math function and the REAL neural network
from ml.optimization import optimize_sensors_mutual_information
from ml.network import PINNModel 

app = FastAPI(title="LeakSense Core API")

# 1. ADD CORS MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. LOAD REAL MATRICES AND PYTORCH MODEL
try:
    # Load your matrices
    R_train = np.load("R_train.npy")
    R_test = np.load("R_test.npy")
    Y_test = np.load("Y_test.npy") 
    
    # Initialize PyTorch device and model
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = PINNModel(input_dim=31, output_dim=2).to(device)
    
    # Load the trained weights your teammate generates
    model.load_state_dict(torch.load("ml/model_weights.pt", map_location=device))
    model.eval() # CRITICAL: Lock weights for inference
    
    print("SUCCESS: Real PINN and Data loaded into memory.")
except Exception as e:
    print(f"CRITICAL ERROR during startup: {e}")
    print("Ensure R_train.npy, R_test.npy, Y_test.npy, and ml/model_weights.pt exist.")

class SimulationRequest(BaseModel):
    sensor_budget: int
    scenario_id: int = -1 

@app.post("/simulate")
def run_simulation(req: SimulationRequest):
    if req.sensor_budget < 1 or req.sensor_budget > 31:
        raise HTTPException(status_code=400, detail="Budget must be between 1 and 31")

    # 1. Run the REAL Mutual Information Optimizer
    optimal_nodes = optimize_sensors_mutual_information(R_train, req.sensor_budget)
    
    # 2. Select the Test Scenario (The true leak event)
    scenario_idx = random.randint(0, R_test.shape[0] - 1) if req.scenario_id == -1 else req.scenario_id
    true_residuals = R_test[scenario_idx]
    
    # 3. The Zero-Masking Injection
    masked_input = np.zeros(31, dtype=np.float32)
    for node_idx in optimal_nodes:
        masked_input[node_idx] = true_residuals[node_idx]
        
    # 4. REAL PYTORCH INFERENCE
    # Convert the [31] array to a [1, 31] batch tensor and send to GPU/CPU
    input_tensor = torch.tensor(masked_input).unsqueeze(0).to(device)
    
    # Run the model without tracking gradients (saves memory/time)
    with torch.no_grad():
        predicted_coords = model(input_tensor)
        
    # Extract the x, y prediction from the tensor
    pred_x, pred_y = predicted_coords[0].cpu().numpy()
    
    # Extract the actual ground truth coordinates (assuming Y_test holds [x, y] coordinates)
    # If Y_test holds Node IDs, you'll map them to coords here.
    true_x, true_y = Y_test[scenario_idx] if len(Y_test.shape) > 1 else (0.0, 0.0)

    # 5. Return the JSON payload
    return {
        "scenario_id": scenario_idx,
        "sensor_budget": req.sensor_budget,
        "optimized_sensor_nodes": [int(n) for n in optimal_nodes],
        "ground_truth": {
            "x": float(true_x),
            "y": float(true_y)
        },
        "prediction": {
            "x": float(pred_x),
            "y": float(pred_y)
        },
        "status": "LIVE_INFERENCE"
    }