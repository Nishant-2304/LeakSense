"""Validate local LeakSense ML setup without starting full training."""

from __future__ import annotations

import tempfile
import sys
from pathlib import Path

import torch

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from ml.config import DATA_DIR, KAGGLE_CHECKPOINT, NETWORK_INP_PATH
from ml.inference import load_checkpoint, predict
from ml.model import EDGE_FEATURES, NUM_NODES, MultiGPUPIGNN
from ml.network import build_graph_tensors, get_canonical_nodes, load_water_network
from ml.train import save_checkpoint


def main() -> None:
    print(f"Dataset path: {DATA_DIR}")
    if not DATA_DIR.exists():
        raise FileNotFoundError(
            f"Dataset folder not found: {DATA_DIR}. Extract Hanoi.zip so it creates this folder."
        )

    if not NETWORK_INP_PATH.exists():
        raise FileNotFoundError(f"Missing network file: {NETWORK_INP_PATH}")

    wn = load_water_network(NETWORK_INP_PATH)
    canonical_nodes = get_canonical_nodes(wn)
    edge_index, edge_attr, _, _ = build_graph_tensors(wn, canonical_nodes)

    assert len(canonical_nodes) == NUM_NODES
    assert edge_index.shape == (2, 68), edge_index.shape
    assert edge_attr.shape == (68, EDGE_FEATURES), edge_attr.shape
    print("Graph tensors ok")

    model = MultiGPUPIGNN(edge_index, edge_attr)
    x = torch.randn(2, NUM_NODES)
    masks = torch.ones(2, NUM_NODES)
    result = predict(model, x, masks, top_k=5)
    assert result["logits"].shape == (2, NUM_NODES)
    assert result["ql_scaled"].shape == (2,)
    print("Dummy inference ok")

    dummy_checkpoint = Path(tempfile.gettempdir()) / "leaksense_dummy_checkpoint.pt"
    save_checkpoint(dummy_checkpoint, model, {"source": "validate_ml_setup"})
    loaded_model, metadata = load_checkpoint(dummy_checkpoint, edge_index, edge_attr, device="cpu")
    loaded_result = predict(loaded_model, x, masks, top_k=3)
    assert loaded_result["top_indices"].shape == (2, 3)
    assert metadata["architecture"] == "final-gatv2-pignn-v1"
    print("Checkpoint save/load ok")

    if KAGGLE_CHECKPOINT.exists():
        load_checkpoint(KAGGLE_CHECKPOINT, edge_index, edge_attr, device="cpu")
        print(f"Checkpoint found and loadable: {KAGGLE_CHECKPOINT}")
    else:
        print(f"Checkpoint not found yet: {KAGGLE_CHECKPOINT}")

    print("LeakSense ML setup validation complete")


if __name__ == "__main__":
    main()
