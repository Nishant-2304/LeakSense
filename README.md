# LeakSense

> **Physics-informed leak localization and sensor placement for water distribution networks.**

LeakSense is a physics-informed graph learning system designed to answer a practical question for water-network operators:

> **Given limited sensors, where should they be placed to detect and localize a leak as accurately as possible?**

Instead of treating a water network as a collection of independent measurement points, LeakSense represents it as a **graph**. Nodes represent junctions and other network components, while edges represent pipes. Hydraulic measurements are converted into node-level residuals, and a **Graph Attention Network (GAT)** learns how information propagates through the network to identify the most likely leak location and estimate its severity.

The system is designed to work with different sensor budgets, allowing the optimization layer to determine the best sensor configuration rather than forcing the entire ML pipeline to assume a fixed number of sensors.

---

## Table of Contents

- [Problem](#problem)
- [What LeakSense Does](#what-leaksense-does)
- [Core Idea](#core-idea)
- [System Overview](#system-overview)
- [Dataset](#dataset)
- [Water Network Representation](#water-network-representation)
- [Physics-Informed Residuals](#physics-informed-residuals)
- [Graph Attention Network](#graph-attention-network)
- [Sensor Placement Optimization](#sensor-placement-optimization)
- [End-to-End Workflow](#end-to-end-workflow)
- [Training](#training)
- [Inference](#inference)
- [Project Architecture](#project-architecture)
- [Tech Stack](#tech-stack)
- [Running the Project](#running-the-project)
- [Expected Output](#expected-output)
- [Why This Approach](#why-this-approach)
- [Future Work](#future-work)
- [Team](#team)

---

# Problem

Water distribution networks are large, complex physical systems.

A leak can occur anywhere in the network, but installing sensors at every junction is expensive and often impractical. At the same time, a leak can propagate its hydraulic effects through multiple connected pipes, meaning that a sensor does not necessarily need to sit directly on top of the leak to detect it.

The problem therefore has two coupled parts:

### 1. Leak localization

Given hydraulic measurements from a limited set of sensors:

> **Where is the leak?**

### 2. Sensor placement

Given a limited sensor budget:

> **Which nodes should actually contain sensors?**

Traditional approaches can rely on fixed sensor configurations, exhaustive search, or simplified representations of the network.

LeakSense instead attempts to learn the **spatial and physical relationships within the network itself** and use those relationships to make sensor placement and leak localization work together.

---

# What LeakSense Does

At a high level:

```text
                    WATER NETWORK
                         │
                         ▼
               Hydraulic Measurements
                         │
                         ▼
              Physics-informed Residuals
                         │
                         ▼
                  Graph Representation
                         │
                         ▼
              Graph Attention Network
                         │
                         ▼
              Leak Location + Severity
                         │
                         ▼
               Sensor Optimization
                         │
                         ▼
              Recommended Sensor Nodes
```

The important distinction is that the **GAT understands the network as a graph**, rather than treating every node as an unrelated feature.

---

# Core Idea

A leak changes the hydraulic behaviour of a network.

If we know what the network should look like under normal conditions and compare that against what is actually measured, we can obtain a **residual**:

\[
r_i = \text{observed}_i - \text{expected}_i
\]

for each node \(i\).

These residuals form a spatial pattern.

A leak at one location may cause:

```text
Leak
  ↓
Nearby nodes → strong residuals
  ↓
Connected nodes → weaker residuals
  ↓
Distant nodes → progressively different effects
```

The important point is:

> **The residual at a node is not independent of the residuals at neighbouring nodes.**

That is exactly where graph learning becomes useful.

---

# System Overview

LeakSense consists of several major components:

```text
┌──────────────────────────────┐
│       Network Dataset        │
│  Pressures / Demands / Flows │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Physics / Hydraulic Layer    │
│                              │
│ Expected behaviour           │
│        ↓                     │
│ Residual generation          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Graph Construction     │
│                              │
│ Nodes = junctions            │
│ Edges = pipes                │
│ Features = residuals         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Graph Attention       │
│          Network             │
│                              │
│ Learns spatial relationships │
│ across the network           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Leak Prediction        │
│                              │
│ (x₀, y₀, QL)                 │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│    Sensor Optimization       │
│                              │
│ Select best N nodes          │
└──────────────────────────────┘
```

---

# Dataset

The initial implementation uses the **Hanoi water distribution network** dataset.

The dataset contains multiple simulated network scenarios with hydraulic measurements and leak information.

Each scenario contains files similar to:

```text
Scenario-X/
├── Hanoi_Scenario-X.inp
├── Node_pressures.csv
├── Node_demands.csv
├── Link_flows.csv
├── Labels.csv
├── Scenario-X_info.csv
│
└── Leaks/
    ├── Leak_leak_node0_info.csv
    └── Leak_leak_node0_demand.csv
```

Depending on the scenario, additional leak-node files may also exist directly inside `Leaks/`.

## Hydraulic Data

### `Node_pressures.csv`

Contains pressure measurements for the network nodes over time.

### `Node_demands.csv`

Contains node demand values over time.

### `Link_flows.csv`

Contains flow values for the network's pipes/links.

### `Labels.csv`

Contains the leak activity state over time.

The observed Hanoi scenarios use a 30-minute timestep over an annual simulation:

\[
8760\text{ hours}
\]

which corresponds to:

\[
17,520
\]

time steps.

## Leak Ground Truth

The leak metadata is stored inside each scenario's `Leaks` directory.

For example:

```text
Leak_leak_node0_info.csv
```

contains information such as:

```text
Leak Node
Leak Area
Leak Diameter
Leak Type
Leak Start
Leak End
```

The corresponding:

```text
Leak_leak_node0_demand.csv
```

contains the time-dependent leak flow:

\[
Q_L(t)
\]

This gives us both the **where** and the **how much** of the simulated leak.

---

# Water Network Representation

The key transformation is:

> **Turn the physical water network into a graph.**

A network such as:

```text
Node A ───── Node B ───── Node C
               │
               │
             Node D
```

becomes:

\[
G=(V,E)
\]

where:

- \(V\) = set of nodes
- \(E\) = set of pipe connections

For example:

```text
V = {A, B, C, D}

E = {
    (A,B),
    (B,C),
    (B,D)
}
```

Each node can contain features such as:

- pressure
- demand
- hydraulic residual
- sensor availability
- other derived physical quantities

Each edge represents an actual hydraulic connection between two nodes.

This graph structure is what allows the GAT to reason about **where information can physically propagate through the network**.

---

# Physics-Informed Residuals

The model should not simply learn:

```text
measurements → leak
```

Instead, we use the physics of the network to determine how far the observed system is from the expected physical behaviour.

For a node, a simplified continuity relationship is:

\[
\sum Q_{in}
-
\sum Q_{out}
-
Q_{demand}
-
Q_{leak}
=
0
\]

If the system behaves exactly as expected, the physical balance should approximately hold.

A residual can therefore be constructed as:

\[
R_i =
\sum Q_{in}
-
\sum Q_{out}
-
Q_{demand}
\]

A leak introduces an additional unaccounted flow, producing a characteristic residual pattern.

Conceptually:

```text
Normal network:

                 ┌── Qout
                 │
Qin ─────────── Node
                 │
                 └── Qdemand

              Residual ≈ 0
```

With a leak:

```text
                 ┌── Qout
                 │
Qin ─────────── Node
                 │
                 ├── Qdemand
                 │
                 └── Qleak

              Residual ≠ 0
```

The exact residual formulation can be extended to incorporate the hydraulic quantities available in the dataset.

---

# Why Residuals?

Raw measurements alone can be difficult for a model to interpret.

For example:

```text
Pressure = 43.7 m
```

doesn't immediately tell us whether that value is unusual.

But:

```text
Expected pressure = 45.2 m
Observed pressure = 43.7 m

Residual = -1.5 m
```

is directly informative.

The residual effectively asks:

> **“How much is the current network behaviour deviating from what physics says it should be?”**

That makes the input much more meaningful for leak detection.

---

# Graph Attention Network

## Why a GAT?

A normal neural network sees the input as a vector.

For example:

```text
[r₁, r₂, r₃, ..., r₃₁]
```

It does not inherently know that:

```text
Node 7
```

is physically connected to:

```text
Node 8
```

or that:

```text
Node 15
```

is several pipes away from:

```text
Node 7
```

A GAT explicitly receives the graph structure.

---

## What does the GAT actually do?

For every node, the GAT looks at:

1. The node's own features.
2. The features of its neighbouring nodes.
3. The importance of each neighbour.

Instead of treating every neighbour equally, attention allows the network to learn:

> **“Which neighbouring nodes are more useful for understanding this node?”**

For node \(i\), its representation can be thought of as:

\[
h_i' =
\sigma
\left(
\sum_{j\in\mathcal{N}(i)}
\alpha_{ij}Wh_j
\right)
\]

where:

- \(h_i\) = current node representation
- \(h_j\) = neighbour representation
- \(W\) = learnable transformation
- \(\alpha_{ij}\) = attention weight
- \(\mathcal{N}(i)\) = neighbouring nodes
- \(\sigma\) = activation function

The attention coefficient is learned from the node and its neighbour:

\[
\alpha_{ij}
=
\text{softmax}_j
\left(
\text{Attention}(Wh_i,Wh_j)
\right)
\]

So the network effectively learns:

```text
Node i
 ├── neighbour A → 0.15 attention
 ├── neighbour B → 0.62 attention
 └── neighbour C → 0.23 attention
```

Those numbers are learned during training.

---

# Why Attention Matters for Leak Localization

Suppose a leak occurs near node 17.

Its effect might look something like:

```text
              15
              │
              │
        16 ── 17 ── 18
              │
              19
```

The residuals around this region may show a characteristic pattern.

A GAT can learn that:

```text
Residual(17)
+
Residual(16)
+
Residual(18)
+
Residual(19)
+
network topology
```

contains much more useful information than an isolated residual.

After multiple graph-attention layers, information can propagate farther through the network:

```text
Layer 1
Immediate neighbours
       ↓
Layer 2
2-hop neighbourhood
       ↓
Layer 3
Larger network region
       ↓
Prediction
Leak location + severity
```

This is particularly appropriate for hydraulic networks because the **physical topology is not arbitrary**.

---

# Sensor Availability

A major requirement of LeakSense is that the model should not require the same number of sensors every time.

For example:

```text
Today:
3 sensors

Tomorrow:
5 sensors

Later:
8 sensors

One sensor breaks:
4 sensors
```

The model should still operate.

To represent this, each node can have a sensor-availability indicator:

\[
m_i\in\{0,1\}
\]

where:

```text
mᵢ = 1 → sensor available
mᵢ = 0 → no sensor
```

Therefore the model can distinguish:

```text
Residual = 0
Sensor exists
```

from:

```text
Residual = 0
Sensor doesn't exist
```

This is important because **zero residual is a valid physical value**.

---

# Sensor Placement Optimization

Once the GAT can interpret the network, the next problem is:

> **Where should we put the sensors?**

The optimizer receives information from the ML/physics layer and searches over candidate network nodes.

For a sensor budget \(k\):

\[
S^* =
\arg\max_{S,\ |S|=k}
\text{Information}(S)
\]

where \(S\) is the selected set of sensor nodes.

The exact optimization objective can incorporate things such as:

- localization accuracy
- residual sensitivity
- spatial coverage
- node connectivity
- redundancy
- predicted uncertainty

The important idea is that the user chooses the **number of sensors**, while the optimizer determines **which nodes deserve them**.

---

# Sensor Budget Flexibility

This allows the same system to answer:

```text
“I have 3 sensors.”
        ↓
Best 3 nodes?

“I have 5 sensors.”
        ↓
Best 5 nodes?

“I have 10 sensors.”
        ↓
Best 10 nodes?
```

If a sensor becomes unavailable:

```text
Current:
[Node 4, Node 9, Node 17, Node 23]

Node 17 fails
        ↓
Re-run optimization
        ↓
[Node 4, Node 9, Node 21, Node 23]
```

No complete retraining of the underlying model should be necessary simply because the sensor budget changed.

---

# End-to-End Workflow

### Step 1 — Load network

Read the network topology from the EPANET `.inp` file.

```text
Nodes
+
Pipes
+
Coordinates
+
Hydraulic properties
```

### Step 2 — Load measurements

Read:

```text
Node pressures
Node demands
Link flows
```

### Step 3 — Determine expected behaviour

Use the hydraulic/network information to establish the expected physical state.

### Step 4 — Generate residuals

Calculate node-level deviations from expected behaviour.

```text
Expected
   ↓
Observed
   ↓
Residual
```

### Step 5 — Build graph

Convert:

```text
Network topology
```

into:

```text
Graph(V,E)
```

and attach the residuals and other features to the nodes.

### Step 6 — Run GAT

The GAT propagates information through neighbouring nodes using learned attention weights.

### Step 7 — Predict leak

The network estimates:

\[
\boxed{(x_0,y_0,Q_L)}
\]

representing:

- \(x_0\) — estimated leak X-coordinate
- \(y_0\) — estimated leak Y-coordinate
- \(Q_L\) — estimated leak magnitude

### Step 8 — Optimize sensor placement

Given:

```text
Number of available sensors = k
```

the optimization layer searches for the best \(k\) nodes.

### Step 9 — Present result

The user receives:

```text
Recommended sensor locations

Estimated leak location

Estimated leak severity

Confidence / uncertainty

Expected localization error
```

---

# Training

The dataset is divided into training and validation/test data.

The model is trained using known leak scenarios where ground truth is available.

For each training example:

```text
Network graph
+
Node features
+
Residuals
+
Sensor availability
```

are provided to the GAT.

The known leak information provides the target:

\[
(x_0,y_0,Q_L)
\]

The training objective combines prediction accuracy with physics-based constraints where applicable.

Conceptually:

\[
L_{total}
=
L_{location}
+
\lambda_Q L_Q
+
\lambda_{physics}L_{physics}
\]

where:

- \(L_{location}\) penalizes incorrect leak localization.
- \(L_Q\) penalizes incorrect leak-flow estimation.
- \(L_{physics}\) encourages physically consistent predictions.

---

# Inference

After training, inference does not require the entire training dataset.

The deployed system receives a new network/measurement state:

```text
Network
+
Available sensor data
```

and produces:

```text
Leak location
+
Leak severity
+
Confidence
```

The optimization layer can then determine the best sensor configuration for the user's available sensor budget.

---

# Project Architecture

The repository is intended to eventually follow a simple monorepo structure:

```text
LeakSense/
│
├── ml/
│   ├── data/
│   ├── preprocessing/
│   ├── models/
│   ├── training/
│   └── inference/
│
├── optimization/
│   └── ...
│
├── backend/
│   └── ...
│
├── frontend/
│   └── ...
│
├── notebooks/
│   └── ...
│
├── requirements.txt
└── README.md
```

The large raw datasets should **not** be committed to GitHub.

They should instead be downloaded/mounted separately and referenced by path.

---

# Tech Stack

### Machine Learning

- Python
- PyTorch
- PyTorch Geometric
- NumPy
- Pandas
- Scikit-learn

### Hydraulic Simulation / Network Processing

- WNTR
- EPANET network files (`.inp`)

### Optimization

- Python-based optimization algorithms
- Graph/network information
- Residual-based objective functions

### Backend

- FastAPI
- Uvicorn

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Interactive network visualization

### Development

- Google Colab for model development/training
- GitHub for source-code collaboration

---

# Running the Project

## 1. Install dependencies

```bash
pip install torch
pip install torch-geometric
pip install pandas numpy scipy scikit-learn
pip install wntr
pip install fastapi uvicorn
```

Additional dependencies may be added as the optimization and frontend layers evolve.

---

## 2. Dataset

Place or mount the dataset separately.

Example Colab path:

```text
/content/Hanoi/HanoiOK
```

Do **not** commit the multi-GB dataset into Git.

---

## 3. Verify the dataset

A simple check:

```python
from pathlib import Path

BASE = Path("/content/Hanoi/HanoiOK")

print("Dataset exists:", BASE.exists())
print("Scenarios:", len(list(BASE.glob("Scenario-*"))))
```

---

# Expected Output

For a given network state, LeakSense ultimately aims to produce something similar to:

```text
┌─────────────────────────────────┐
│          LEAK DETECTED           │
├─────────────────────────────────┤
│                                 │
│ Estimated Location              │
│ X: 2716.12                      │
│ Y: 7499.55                      │
│                                 │
│ Estimated Leak Flow             │
│ QL: 17.38                       │
│                                 │
│ Recommended Sensors             │
│ Node 8                           │
│ Node 14                          │
│ Node 23                          │
│                                 │
│ Estimated Error                 │
│ ~X m                             │
└─────────────────────────────────┘
```

The actual values depend on the network state, trained model, and optimization configuration.

---

# Visualization

The frontend is intended to make the technical system understandable without requiring the user to understand GNNs or hydraulic equations.

The visual narrative follows:

```text
                    RANDOM
                      ↓
                NETWORK VIEW
                      ↓
                LEAK DETECTED
                      ↓
             AI UNDERSTANDS GRAPH
                      ↓
            SENSOR OPTIMIZATION
                      ↓
                OPTIMIZED
```

The core visual should show:

```text
Water network
    │
    ├── nodes
    ├── pipes
    ├── leak
    └── sensors
```

and dynamically demonstrate how sensor placement changes the system's ability to localize the leak.

---

# Why This Approach?

Traditional sensor deployment often faces a fundamental trade-off:

```text
More sensors
     ↓
Better information
     ↓
Higher cost
```

LeakSense attempts to attack the problem from the opposite direction:

> **Instead of asking how many sensors we need to get good information, ask which sensors give us the most information.**

The GAT provides the network-awareness required to understand spatial relationships between measurements.

The physics-informed layer provides a representation tied to the behaviour of the hydraulic system.

The optimization layer turns that information into an actionable deployment strategy.

Together:

\[
\boxed{
\text{Physics}
+
\text{Graph Learning}
+
\text{Optimization}
}
\]

becomes a single pipeline for intelligent leak monitoring.

---

# Future Work

The current system is a foundation for a broader network-monitoring platform.

Potential extensions include:

### Real-world sensor data

Move from simulated hydraulic scenarios toward real pressure/flow sensor streams.

### Uncertainty estimation

Instead of producing only:

```text
Leak location = (x,y)
```

produce:

```text
P(leak at region A)
P(leak at region B)
P(leak at region C)
```

This can provide utilities with an interpretable confidence map.

### Online monitoring

Continuously update the leak estimate as new sensor measurements arrive.

### Sensor failure handling

Automatically re-optimize sensor placement when sensors fail.

### Multiple simultaneous leaks

Extend the localization model from:

\[
1\text{ leak}
\]

to:

\[
n\text{ simultaneous leaks}
\]

### Larger networks

Test the methodology on increasingly large and complex water-distribution networks.

### Real-time deployment

Expose the trained model through FastAPI and connect it to a production dashboard.

---

# Vision

LeakSense is not intended to be merely a leak classifier.

The larger vision is:

> **An intelligent monitoring layer for physical infrastructure that combines physics, graph learning, and optimization to determine what is happening in a network and where limited sensing resources should be deployed.**

For water networks, that means:

```text
                 ┌───────────────┐
                 │ WATER NETWORK │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │    MEASURE    │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │    PHYSICS    │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │     GAT       │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │   OPTIMIZE    │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │    ACTION     │
                 └───────────────┘
```

**Detect the leak. Understand the network. Place the sensors where they matter.**

---

# Team

**LeakSense**

Built for the **VIT / DevJams Hackathon**.

