"""Local paths for LeakSense ML assets."""

from __future__ import annotations

import os
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = Path(os.environ.get("LEAKSENSE_DATA_DIR", PROJECT_ROOT / "data"))
SCENARIO_DATA_DIR = DATA_DIR / "HanoiOK"
MODEL_DIR = Path(os.environ.get("LEAKSENSE_MODEL_DIR", PROJECT_ROOT / "models"))
KAGGLE_CHECKPOINT = MODEL_DIR / "pignn_checkpoint.pt"
PREPROCESSING_PATH = MODEL_DIR / "preprocessing.pkl"
NETWORK_INP_PATH = DATA_DIR / "Hanoi.inp"

CANONICAL_NODES = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "1",
]
