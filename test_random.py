import requests
import numpy as np

# Test with random sensors vs optimized
for budget in [5, 10]:
    # Optimized
    r = requests.post('http://127.0.0.1:8000/evaluate', json={'sensor_budget': budget})
    m_opt = r.json()['metrics']
    
    # Random - we can't easily test via API, let me check the optimization logic
    print(f"Budget {budget}: optimized={m_opt['mean_error']:.1f}, node_acc={m_opt['node_accuracy']:.2f}")
    print(f"  Sensors: {r.json()['optimized_sensor_nodes']}")

# The mutual info optimization in ml/optimization.py uses correlation matrix
# It should pick diverse, informative sensors
PYEOF