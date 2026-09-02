from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

# Import your working math function and the REAL neural network
from ml.optimization import optimize_sensors_empirical
from ml.model import PINNModel 

from ml.config import NETWORK_INP_PATH
from ml.inference import InferenceBundle, load_inference_bundle, predict_leak
from ml.model import DEAD_CLASS_INDEX
from ml.network import load_water_network
from ml.optimization import optimize_sensors_empirical


app = FastAPI(title="LeakSense PIGNN API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SensorReading(BaseModel):
    node_id: str
    pressure_delta: float

    @field_validator("node_id")
    @classmethod
    def clean_node_id(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("node_id cannot be empty")
        return value


class PredictRequest(BaseModel):
    sensors: list[SensorReading] = Field(min_length=1)
    top_k: int = Field(default=5, ge=1, le=DEAD_CLASS_INDEX)


class OptimizeSensorsRequest(BaseModel):
    sensor_budget: int = Field(ge=1, le=DEAD_CLASS_INDEX)


class AppState:
    bundle: InferenceBundle | None
    node_to_index: dict[str, int]
    coordinates: dict[str, tuple[float, float]]
    links: list[dict[str, Any]]
    optimizer_matrix: np.ndarray | None
    startup_error: str | None


state = AppState()
state.bundle = None
state.node_to_index = {}
state.coordinates = {}
state.links = []
state.optimizer_matrix = None
state.startup_error = None


def _build_optimizer_matrix(bundle: InferenceBundle) -> np.ndarray:
    coords = np.asarray(bundle.canonical_node_coords, dtype=np.float32)
    centered = coords - coords.mean(axis=0, keepdims=True)
    return np.linalg.norm(centered[:, None, :] - centered[None, :, :], axis=2)


@app.on_event("startup")
def load_assets() -> None:
    try:
        bundle = load_inference_bundle(device="cpu")
        wn = load_water_network(NETWORK_INP_PATH)
        node_to_index = {node_id: i for i, node_id in enumerate(bundle.canonical_nodes)}

        state.bundle = bundle
        state.node_to_index = node_to_index
        state.coordinates = {
            node_id: tuple(map(float, bundle.canonical_node_coords[index]))
            for node_id, index in node_to_index.items()
        }
        state.links = [
            {
                "link_id": str(link_id),
                "start_node_id": str(link.start_node_name),
                "end_node_id": str(link.end_node_name),
            }
            for link_id, link in wn.links()
            if str(link.start_node_name) in node_to_index
            and str(link.end_node_name) in node_to_index
        ]
        state.optimizer_matrix = _build_optimizer_matrix(bundle)[:DEAD_CLASS_INDEX, :DEAD_CLASS_INDEX]
        state.startup_error = None
    except Exception as exc:
        state.startup_error = str(exc)


def _require_loaded() -> InferenceBundle:
    if state.bundle is None:
        raise HTTPException(
            status_code=503,
            detail=state.startup_error or "Model assets are not loaded.",
        )
    return state.bundle


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "status": "ok" if state.bundle is not None else "error",
        "model_loaded": state.bundle is not None,
    }


@app.get("/network")
def network() -> dict[str, Any]:
    bundle = _require_loaded()
    nodes = [
        {
            "node_id": node_id,
            "x": state.coordinates[node_id][0],
            "y": state.coordinates[node_id][1],
        }
        for node_id in bundle.canonical_nodes
    ]
    return {"nodes": nodes, "links": state.links}


@app.post("/predict")
def predict(req: PredictRequest) -> dict[str, Any]:
    bundle = _require_loaded()
    values = np.zeros(len(bundle.canonical_nodes), dtype=np.float32)
    mask = np.zeros(len(bundle.canonical_nodes), dtype=np.float32)
    seen: set[str] = set()

    for sensor in req.sensors:
        if sensor.node_id not in state.node_to_index:
            raise HTTPException(
                status_code=400,
                detail=f"Unknown node_id {sensor.node_id!r}.",
            )
        if sensor.node_id in seen:
            raise HTTPException(
                status_code=400,
                detail=f"Duplicate node_id {sensor.node_id!r}.",
            )
        seen.add(sensor.node_id)
        index = state.node_to_index[sensor.node_id]
        values[index] = sensor.pressure_delta
        mask[index] = 1.0

    result = predict_leak(values, mask, top_k=req.top_k, bundle=bundle)
    top_predictions = [
        {"node_id": item["node_id"], "probability": item["probability"]}
        for item in result["top_k"]
    ]
    return {
        "predicted_node": result["predicted_node_id"],
        "predicted_qL": result["predicted_qL"],
        "confidence": top_predictions[0]["probability"],
        "top_predictions": top_predictions,
    }


@app.post("/optimize-sensors")
def optimize_sensors(req: OptimizeSensorsRequest) -> dict[str, Any]:
    bundle = _require_loaded()
    if state.optimizer_matrix is None:
        raise HTTPException(status_code=503, detail="Sensor optimizer data is not loaded.")

    selected = optimize_sensors_empirical(
        state.optimizer_matrix,
        budget=req.sensor_budget,
        random_state=42,
    )
    sensors = []
    for index in selected:
        node_id = bundle.canonical_nodes[index]
        x, y = state.coordinates[node_id]
        sensors.append({"node_id": node_id, "node_index": index, "x": x, "y": y})
    return {"sensor_budget": req.sensor_budget, "selected_sensors": sensors}


@app.post("/simulate")
def run_simulation(req: SimulationRequest):
    if req.sensor_budget < 1 or req.sensor_budget > 31:
        raise HTTPException(status_code=400, detail="Budget must be between 1 and 31")

    # 1. Run the REAL Mutual Information Optimizer
    optimal_nodes = optimize_sensors_empirical(R_train, req.sensor_budget)
    
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
