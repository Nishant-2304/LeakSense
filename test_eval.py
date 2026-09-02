import requests

for budget in [3, 5, 8, 12, 15]:
    r = requests.post('http://127.0.0.1:8000/evaluate', json={'sensor_budget': budget})
    m = r.json()['metrics']
    sensors = r.json()['optimized_sensor_nodes']
    print(f'Budget {budget:2d}: mean_error={m["mean_error"]:7.1f}, node_acc={m["node_accuracy"]:.2f}, sensors={sensors}')