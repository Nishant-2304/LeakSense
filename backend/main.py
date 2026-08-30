from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

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
def simulate() -> None:
    raise HTTPException(
        status_code=501,
        detail="Simulation/reranking is experimental and not part of the validated PIGNN inference API.",
    )
