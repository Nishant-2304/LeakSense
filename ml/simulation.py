import numpy as np
from pathlib import Path


def generate_synthetic_data(num_scenarios=1000, num_nodes=31, seed=42):
    """Generate synthetic but realistic leak data for testing."""
    np.random.seed(seed)
    
    # Hanoi network approximate coordinates (from EPANET example)
    # These are rough coordinates for the 31 junctions
    coords = np.array([
        [1000, 5000], [2000, 4800], [3000, 4600], [4000, 4400], [5000, 4200],
        [6000, 4000], [7000, 3800], [8000, 3600], [9000, 3400], [10000, 3200],
        [1000, 4000], [2000, 3800], [3000, 3600], [4000, 3400], [5000, 3200],
        [6000, 3000], [7000, 2800], [8000, 2600], [9000, 2400], [10000, 2200],
        [1000, 3000], [2000, 2800], [3000, 2600], [4000, 2400], [5000, 2200],
        [6000, 2000], [7000, 1800], [8000, 1600], [9000, 1400], [10000, 1200],
        [5000, 5000],  # Node 32 (reservoir/tank)
    ][:num_nodes])
    
    # Generate base pressure profile (decreasing with distance from source)
    base_pressure = 50 + 30 * np.exp(-np.arange(num_nodes) / 10) + np.random.normal(0, 1, num_nodes)
    
    R_data = []
    Y_data = []
    
    for i in range(num_scenarios):
        # Random leak location
        leak_idx = np.random.randint(0, num_nodes)
        leak_magnitude = np.random.uniform(0.5, 5.0)
        
        # Pressure drop follows inverse distance from leak
        distances = np.linalg.norm(coords - coords[leak_idx], axis=1)
        pressure_drop = leak_magnitude * np.exp(-distances / 2000) + np.random.normal(0, 0.5, num_nodes)
        pressure_drop = np.maximum(pressure_drop, 0)  # No negative drops
        
        R_data.append(pressure_drop)
        Y_data.append(coords[leak_idx])
    
    R_data = np.array(R_data)
    Y_data = np.array(Y_data)
    
    # Add some correlation structure to make it more realistic
    correlation = 0.3
    for i in range(num_nodes):
        for j in range(i+1, num_nodes):
            if np.random.random() < correlation:
                R_data[:, j] = 0.7 * R_data[:, j] + 0.3 * R_data[:, i] + np.random.normal(0, 0.1, num_scenarios)
    
    return R_data, Y_data, coords


def prepare_datasets(output_dir, train_split=0.8, num_scenarios=1000, num_nodes=31):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    R_data, Y_data, coords = generate_synthetic_data(num_scenarios, num_nodes)
    
    indices = np.random.permutation(len(R_data))
    R_data = R_data[indices]
    Y_data = Y_data[indices]
    
    split_idx = int(len(R_data) * train_split)
    R_train = R_data[:split_idx]
    R_test = R_data[split_idx:]
    Y_train = Y_data[:split_idx]
    Y_test = Y_data[split_idx:]
    
    np.save(output_dir / 'R_train.npy', R_train)
    np.save(output_dir / 'R_test.npy', R_test)
    np.save(output_dir / 'Y_train.npy', Y_train)
    np.save(output_dir / 'Y_test.npy', Y_test)
    
    junction_names = [str(i+2) for i in range(num_nodes)]  # '2', '3', ..., '32'
    metadata = {
        'junction_names': junction_names,
        'node_coords': coords,
        'num_junctions': num_nodes,
        'train_size': len(R_train),
        'test_size': len(R_test),
    }
    np.save(output_dir / 'metadata.npy', metadata, allow_pickle=True)
    
    print(f"Generated synthetic data:")
    print(f"  R_train: {R_train.shape}, R_test: {R_test.shape}")
    print(f"  Y_train: {Y_train.shape}, Y_test: {Y_test.shape}")
    print(f"  Nodes: {num_nodes}")
    
    return R_train, R_test, Y_train, Y_test, metadata


if __name__ == '__main__':
    output_dir = 'data/processed'
    prepare_datasets(output_dir, num_scenarios=1000, num_nodes=31)