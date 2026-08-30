"""Verify saved Kaggle PIGNN artifacts against the local package."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import torch

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from ml.config import KAGGLE_CHECKPOINT, NETWORK_INP_PATH, PREPROCESSING_PATH
from ml.inference import load_inference_bundle, predict_leak
from ml.model import DEAD_CLASS_INDEX, NUM_NODES


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--checkpoint", type=Path, default=KAGGLE_CHECKPOINT)
    parser.add_argument("--inp", type=Path, default=NETWORK_INP_PATH)
    parser.add_argument("--preprocessing", type=Path, default=PREPROCESSING_PATH)
    parser.add_argument("--device", default=None)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    bundle = load_inference_bundle(
        checkpoint_path=args.checkpoint,
        inp_path=args.inp,
        preprocessing_path=args.preprocessing,
        device=args.device,
    )

    x = torch.zeros(NUM_NODES, dtype=torch.float32).numpy()
    mask = torch.zeros(NUM_NODES, dtype=torch.float32).numpy()
    mask[:15] = 1.0

    result = predict_leak(x, mask, top_k=5, bundle=bundle)
    dead_node = bundle.canonical_nodes[DEAD_CLASS_INDEX]

    print(f"checkpoint: {args.checkpoint}")
    print(f"inp: {args.inp}")
    print(f"preprocessing: {args.preprocessing}")
    print(f"dead_class_index: {DEAD_CLASS_INDEX}")
    print(f"dead_class_node: {dead_node}")
    print(f"top1_node_index: {result['predicted_node_index']}")
    print(f"top1_node: {result['predicted_node_id']}")
    print(f"qL: {result['predicted_qL']:.6f}")
    print("top5:")
    for candidate in result["top_k"]:
        print(
            f"  {candidate['node_index']:02d} "
            f"{candidate['node_id']}: {candidate['probability']:.6f}"
        )


if __name__ == "__main__":
    main()
