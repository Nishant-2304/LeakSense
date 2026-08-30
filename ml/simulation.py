"""WNTR/EPANET data extraction and physics utilities."""

from __future__ import annotations

from pathlib import Path
from typing import Sequence, Tuple

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
import wntr

from .network import NodeLinkMap, compute_residual_vector


def get_coordinates(inp_path: str | Path) -> dict[str, tuple[float, float]]:
    coords: dict[str, tuple[float, float]] = {}
    in_coordinates = False

    with open(inp_path, "r", errors="ignore") as file:
        for line in file:
            line = line.strip()

            if line.upper() == "[COORDINATES]":
                in_coordinates = True
                continue
            if in_coordinates and line.startswith("["):
                break
            if not in_coordinates or not line or line.startswith(";"):
                continue

            parts = line.split()
            if len(parts) >= 3:
                try:
                    coords[parts[0]] = (float(parts[1]), float(parts[2]))
                except ValueError:
                    pass

    return coords


def extract_leak_metadata(base_dir: str | Path) -> pd.DataFrame:
    base = Path(base_dir)
    records = []
    scenario_dirs = sorted(
        [p for p in base.glob("Scenario-*") if p.is_dir()],
        key=lambda p: int(p.name.split("-")[1]),
    )

    for scenario_dir in scenario_dirs:
        scenario_id = int(scenario_dir.name.split("-")[1])
        inp_path = scenario_dir / f"Hanoi_Scenario-{scenario_id}.inp"
        leaks_dir = scenario_dir / "Leaks"

        if not inp_path.exists() or not leaks_dir.exists():
            continue

        coordinates = get_coordinates(inp_path)

        for info_file in sorted(leaks_dir.glob("Leak_*_info.csv")):
            info_df = pd.read_csv(info_file)
            info_dict = dict(
                zip(info_df.iloc[:, 0].astype(str).str.strip(), info_df.iloc[:, 1])
            )
            leak_id = str(info_dict.get("Leak Node", "")).strip()
            if not leak_id:
                continue

            x0, y0 = coordinates.get(leak_id, (None, None))
            demand_file = leaks_dir / f"Leak_{leak_id}_demand.csv"
            records.append(
                {
                    "scenario": scenario_id,
                    "leak_id": leak_id,
                    "x0": x0,
                    "y0": y0,
                    "leak_area": info_dict.get("Leak Area"),
                    "leak_diameter": info_dict.get("Leak Diameter"),
                    "leak_type": info_dict.get("Leak Type"),
                    "leak_start": info_dict.get("Leak Start"),
                    "leak_end": info_dict.get("Leak End"),
                    "demand_file": str(demand_file),
                    "coordinates_found": x0 is not None and y0 is not None,
                }
            )

    leak_metadata = pd.DataFrame(records)
    for col in ["x0", "y0", "leak_area", "leak_diameter"]:
        leak_metadata[col] = pd.to_numeric(leak_metadata[col], errors="coerce")
    leak_metadata["leak_start"] = pd.to_datetime(
        leak_metadata["leak_start"], errors="coerce"
    )
    leak_metadata["leak_end"] = pd.to_datetime(
        leak_metadata["leak_end"], errors="coerce"
    )
    return leak_metadata


def load_baseline_pressures(
    base_dir: str | Path,
    canonical_nodes: Sequence[str],
) -> Tuple[np.ndarray, np.ndarray]:
    baseline_pressures = pd.read_csv(Path(base_dir) / "Scenario-1" / "Node_pressures.csv")
    baseline_h = baseline_pressures[list(canonical_nodes)].to_numpy(dtype=np.float32)
    baseline_time = baseline_pressures["Unnamed: 0"].to_numpy()
    return baseline_h, baseline_time


def class_aware_scenario_split(
    leak_metadata: pd.DataFrame,
    canonical_node_coords: np.ndarray,
    random_seed: int = 42,
    train_fraction: float = 0.70,
    val_fraction: float = 0.15,
) -> tuple[list[int], list[int], list[int], pd.DataFrame]:
    leaks_per_scenario = leak_metadata.groupby("scenario")["leak_id"].nunique()
    single_leak_scenarios = sorted(
        leaks_per_scenario[leaks_per_scenario == 1].index.tolist()
    )
    single_leak_scenarios = [sid for sid in single_leak_scenarios if sid != 1]

    rng = np.random.default_rng(random_seed)
    scenario_locations = (
        leak_metadata[leak_metadata["scenario"].isin(single_leak_scenarios)][
            ["scenario", "x0", "y0"]
        ]
        .dropna(subset=["x0", "y0"])
        .copy()
    )

    if scenario_locations["scenario"].nunique() != len(single_leak_scenarios):
        raise ValueError("Some single-leak scenarios are missing valid coordinates.")
    if len(scenario_locations) != len(single_leak_scenarios):
        raise ValueError("More than one metadata row found for a single-leak scenario.")

    scenario_xy = scenario_locations[["x0", "y0"]].to_numpy(dtype=np.float64)
    differences = scenario_xy[:, None, :] - canonical_node_coords[None, :, :]
    distances = np.sqrt(np.sum(differences**2, axis=2))
    scenario_locations["node_class"] = np.argmin(distances, axis=1)

    all_classes = np.sort(scenario_locations["node_class"].unique())
    num_scenarios = len(single_leak_scenarios)
    target_train = int(round(train_fraction * num_scenarios))
    target_val = int(round(val_fraction * num_scenarios))

    mandatory_train = []
    for node_class in all_classes:
        class_scenarios = scenario_locations.loc[
            scenario_locations["node_class"] == node_class, "scenario"
        ].to_numpy()
        mandatory_train.append(rng.choice(class_scenarios))
    mandatory_train = np.array(mandatory_train)

    all_scenarios = np.array(single_leak_scenarios)
    remaining_scenarios = all_scenarios[~np.isin(all_scenarios, mandatory_train)]
    rng.shuffle(remaining_scenarios)

    additional_train_needed = target_train - len(mandatory_train)
    additional_train = remaining_scenarios[:additional_train_needed]
    train_scenarios = np.concatenate([mandatory_train, additional_train])
    remaining_after_train = remaining_scenarios[additional_train_needed:]
    val_scenarios = remaining_after_train[:target_val]
    test_scenarios = remaining_after_train[target_val:]

    train_scenarios = sorted(train_scenarios.tolist())
    val_scenarios = sorted(val_scenarios.tolist())
    test_scenarios = sorted(test_scenarios.tolist())

    train_set = set(train_scenarios)
    val_set = set(val_scenarios)
    test_set = set(test_scenarios)
    if not train_set.isdisjoint(val_set | test_set) or not val_set.isdisjoint(test_set):
        raise ValueError("Scenario split overlap detected.")

    train_classes = set(
        scenario_locations.loc[
            scenario_locations["scenario"].isin(train_scenarios), "node_class"
        ].unique()
    )
    missing_train_classes = sorted(set(all_classes) - train_classes)
    if missing_train_classes:
        raise ValueError(f"Classes missing from training: {missing_train_classes}")

    return train_scenarios, val_scenarios, test_scenarios, scenario_locations


def build_dataset_for_scenarios(
    base_dir: str | Path,
    scenario_list: Sequence[int],
    leak_metadata: pd.DataFrame,
    baseline_h: np.ndarray,
    baseline_time: np.ndarray,
    canonical_nodes: Sequence[str],
) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    x_samples = []
    y_samples = []
    sample_scenarios = []
    base = Path(base_dir)

    for scenario_id in scenario_list:
        scenario_leak = leak_metadata[leak_metadata["scenario"] == scenario_id]
        if len(scenario_leak) != 1:
            continue

        leak_info = scenario_leak.iloc[0]
        x0 = float(leak_info["x0"])
        y0 = float(leak_info["y0"])
        leak_id = leak_info["leak_id"]

        pressures = pd.read_csv(base / f"Scenario-{scenario_id}" / "Node_pressures.csv")
        scenario_time = pressures["Unnamed: 0"].to_numpy()
        if not np.array_equal(scenario_time, baseline_time):
            continue

        h = pressures[list(canonical_nodes)].to_numpy(dtype=np.float32)
        delta_h = h - baseline_h

        leak_demand = pd.read_csv(leak_info["demand_file"])
        leak_time = leak_demand["Unnamed: 0"].to_numpy()
        if not np.array_equal(leak_time, baseline_time):
            continue

        ql = leak_demand[leak_id].to_numpy(dtype=np.float32)
        active_mask = ql != 0

        x_active = delta_h[active_mask]
        y_active = np.column_stack(
            [
                np.full(active_mask.sum(), x0, dtype=np.float32),
                np.full(active_mask.sum(), y0, dtype=np.float32),
                ql[active_mask],
            ]
        )
        scenario_labels = np.full(active_mask.sum(), scenario_id, dtype=np.int32)

        x_samples.append(x_active)
        y_samples.append(y_active)
        sample_scenarios.append(scenario_labels)

    return (
        np.concatenate(x_samples, axis=0),
        np.concatenate(y_samples, axis=0),
        np.concatenate(sample_scenarios, axis=0),
    )


def normalize_splits(
    x_train: np.ndarray,
    x_val: np.ndarray,
    x_test: np.ndarray,
    y_train: np.ndarray,
    y_val: np.ndarray,
    y_test: np.ndarray,
) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray, StandardScaler, StandardScaler]:
    x_scaler = StandardScaler()
    x_train_scaled = x_scaler.fit_transform(x_train)
    x_val_scaled = x_scaler.transform(x_val)
    x_test_scaled = x_scaler.transform(x_test)

    y_scaler = StandardScaler()
    y_train_scaled = y_scaler.fit_transform(y_train)
    y_val_scaled = y_scaler.transform(y_val)
    y_test_scaled = y_scaler.transform(y_test)

    return (
        x_train_scaled.astype(np.float32),
        x_val_scaled.astype(np.float32),
        x_test_scaled.astype(np.float32),
        y_train_scaled.astype(np.float32),
        y_val_scaled.astype(np.float32),
        y_test_scaled.astype(np.float32),
        x_scaler,
        y_scaler,
    )


def build_residual_dataset(
    base_dir: str | Path,
    scenario_list: Sequence[int],
    sample_scenarios: np.ndarray,
    leak_metadata: pd.DataFrame,
    canonical_nodes: Sequence[str],
    node_link_map: NodeLinkMap,
) -> np.ndarray:
    residual_samples = []
    base = Path(base_dir)

    for scenario_id in scenario_list:
        scenario_mask = sample_scenarios == scenario_id
        if int(scenario_mask.sum()) == 0:
            continue

        scenario_dir = base / f"Scenario-{scenario_id}"
        flow_df = pd.read_csv(scenario_dir / "Link_flows.csv")
        demand_df = pd.read_csv(scenario_dir / "Node_demands.csv")

        leak_info = leak_metadata[leak_metadata["scenario"] == scenario_id].iloc[0]
        leak_demand = pd.read_csv(leak_info["demand_file"])
        leak_id = leak_info["leak_id"]
        ql = leak_demand[leak_id].to_numpy(dtype=np.float32)
        active_indices = np.where(ql != 0)[0]

        for row_idx in active_indices:
            residual_samples.append(
                compute_residual_vector(
                    flow_df.iloc[row_idx],
                    demand_df.iloc[row_idx],
                    canonical_nodes,
                    node_link_map,
                )
            )

    return np.asarray(residual_samples, dtype=np.float32)


def solve_epanet_candidate(args):
    """Experimental top-k reranking helper from the notebook, not production-ready."""
    (
        base_dir,
        scenario_id,
        row_idx,
        candidate_idx,
        ql_pred,
        observed_delta_h,
        canonical_nodes,
        baseline_h,
        leak_metadata,
    ) = args

    base = Path(base_dir)
    scenario_inp = base / f"Scenario-{scenario_id}" / f"Hanoi_Scenario-{scenario_id}.inp"
    wn = wntr.network.WaterNetworkModel(str(scenario_inp))
    leak_info = leak_metadata[leak_metadata["scenario"] == scenario_id].iloc[0]
    leak_id = leak_info["leak_id"]
    candidate_node = canonical_nodes[candidate_idx]

    candidate_pressure = max(float(baseline_h[row_idx, candidate_idx]), 1e-3)
    area = ql_pred / (0.75 * np.sqrt(2.0 * 9.80665 * candidate_pressure))
    area = max(area, 1e-8)

    if leak_id in wn.node_name_list:
        original_leak = wn.get_node(leak_id)
        for demand in original_leak.demand_timeseries_list:
            demand.base_value = 0.0
            demand.pattern_name = None

    candidate = wn.get_node(candidate_node)
    start_seconds = int(
        (pd.Timestamp(leak_info["leak_start"]) - pd.Timestamp("2024-01-01 00:00:00")).total_seconds()
    )
    end_seconds = int(
        (pd.Timestamp(leak_info["leak_end"]) - pd.Timestamp("2024-01-01 00:00:00")).total_seconds()
    )

    candidate.add_leak(
        wn,
        area=area,
        discharge_coeff=0.75,
        start_time=start_seconds,
        end_time=end_seconds,
    )

    wn.options.time.duration = 0
    wn.options.time.hydraulic_timestep = 1800
    wn.options.time.report_timestep = 1800

    results = wntr.sim.EpanetSimulator(wn).run_sim()
    pressure_map = {
        str(node): float(value)
        for node, value in results.node["pressure"].iloc[-1].items()
    }
    available_nodes = [node for node in canonical_nodes if str(node) in pressure_map]
    if len(available_nodes) < 20:
        raise ValueError(
            f"Too few canonical nodes in EPANET results: {len(available_nodes)}/32"
        )

    simulated_h = np.array(
        [pressure_map[str(node)] for node in available_nodes], dtype=np.float32
    )
    baseline_subset = np.array(
        [baseline_h[row_idx, canonical_nodes.index(node)] for node in available_nodes],
        dtype=np.float32,
    )
    observed_subset = np.array(
        [observed_delta_h[canonical_nodes.index(node)] for node in available_nodes],
        dtype=np.float32,
    )
    simulated_delta_h = simulated_h - baseline_subset
    score = np.sqrt(np.mean((simulated_delta_h - observed_subset) ** 2))

    return scenario_id, candidate_idx, float(score)
