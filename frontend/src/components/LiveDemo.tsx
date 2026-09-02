'use client';

import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// --- TYPES & HANOI DATA ---
type JunctionNode = {
  id: string;
  label: string;
  kind: 'reservoir' | 'junction' | 'tank';
  x: number;
  y: number;
  demand: number;
  pressure: number;
};

type PipeEdge = {
  id: string;
  source: string;
  target: string;
  lengthM: number;
  diameterMm: number;
  baseLeak: number;
};

export const NODES: JunctionNode[] = [
  { id: "2", label: "N2", kind: "junction", x: 470, y: 313, demand: 0, pressure: 0 },
  { id: "3", label: "N3", kind: "junction", x: 468, y: 348, demand: 0, pressure: 0 },
  { id: "4", label: "N4", kind: "junction", x: 536, y: 348, demand: 0, pressure: 0 },
  { id: "5", label: "N5", kind: "junction", x: 584, y: 348, demand: 0, pressure: 0 },
  { id: "6", label: "N6", kind: "junction", x: 631, y: 348, demand: 0, pressure: 0 },
  { id: "7", label: "N7", kind: "junction", x: 631, y: 380, demand: 0, pressure: 0 },
  { id: "8", label: "N8", kind: "junction", x: 631, y: 415, demand: 0, pressure: 0 },
  { id: "9", label: "N9", kind: "junction", x: 631, y: 450, demand: 0, pressure: 0 },
  { id: "10", label: "N10", kind: "junction", x: 593, y: 450, demand: 0, pressure: 0 },
  { id: "11", label: "N11", kind: "junction", x: 593, y: 478, demand: 0, pressure: 0 },
  { id: "12", label: "N12", kind: "junction", x: 593, y: 498, demand: 0, pressure: 0 },
  { id: "13", label: "N13", kind: "junction", x: 542, y: 498, demand: 0, pressure: 0 },
  { id: "14", label: "N14", kind: "junction", x: 554, y: 450, demand: 0, pressure: 0 },
  { id: "15", label: "N15", kind: "junction", x: 505, y: 450, demand: 0, pressure: 0 },
  { id: "16", label: "N16", kind: "junction", x: 467, y: 450, demand: 0, pressure: 0 },
  { id: "17", label: "N17", kind: "junction", x: 467, y: 427, demand: 0, pressure: 0 },
  { id: "18", label: "N18", kind: "junction", x: 468, y: 407, demand: 0, pressure: 0 },
  { id: "19", label: "N19", kind: "junction", x: 468, y: 377, demand: 0, pressure: 0 },
  { id: "20", label: "N20", kind: "junction", x: 414, y: 348, demand: 0, pressure: 0 },
  { id: "21", label: "N21", kind: "junction", x: 414, y: 315, demand: 0, pressure: 0 },
  { id: "22", label: "N22", kind: "junction", x: 414, y: 280, demand: 0, pressure: 0 },
  { id: "23", label: "N23", kind: "junction", x: 368, y: 348, demand: 0, pressure: 0 },
  { id: "24", label: "N24", kind: "junction", x: 368, y: 409, demand: 0, pressure: 0 },
  { id: "25", label: "N25", kind: "junction", x: 366, y: 450, demand: 0, pressure: 0 },
  { id: "26", label: "N26", kind: "junction", x: 403, y: 450, demand: 0, pressure: 0 },
  { id: "27", label: "N27", kind: "junction", x: 436, y: 450, demand: 0, pressure: 0 },
  { id: "28", label: "N28", kind: "junction", x: 322, y: 348, demand: 0, pressure: 0 },
  { id: "29", label: "N29", kind: "junction", x: 267, y: 350, demand: 0, pressure: 0 },
  { id: "30", label: "N30", kind: "junction", x: 267, y: 395, demand: 0, pressure: 0 },
  { id: "31", label: "N31", kind: "junction", x: 267, y: 450, demand: 0, pressure: 0 },
  { id: "32", label: "N32", kind: "junction", x: 322, y: 450, demand: 0, pressure: 0 },
  { id: "1", label: "N1", kind: "reservoir", x: 470, y: 274, demand: 0, pressure: 0 },
];

export const EDGES: PipeEdge[] = [
  { id: "P1", source: "1", target: "2", lengthM: 105, diameterMm: 1008, baseLeak: 0 },
  { id: "P2", source: "2", target: "3", lengthM: 1295, diameterMm: 988, baseLeak: 0 },
  { id: "P3", source: "3", target: "4", lengthM: 908, diameterMm: 1025, baseLeak: 0 },
  { id: "P4", source: "4", target: "5", lengthM: 1114, diameterMm: 1031, baseLeak: 0 },
  { id: "P5", source: "5", target: "6", lengthM: 1453, diameterMm: 1052, baseLeak: 0 },
  { id: "P6", source: "6", target: "7", lengthM: 439, diameterMm: 1007, baseLeak: 0 },
  { id: "P7", source: "7", target: "8", lengthM: 872, diameterMm: 1064, baseLeak: 0 },
  { id: "P8", source: "8", target: "9", lengthM: 826, diameterMm: 1010, baseLeak: 0 },
  { id: "P9", source: "9", target: "10", lengthM: 790, diameterMm: 993, baseLeak: 0 },
  { id: "P10", source: "10", target: "11", lengthM: 908, diameterMm: 759, baseLeak: 0 },
  { id: "P11", source: "11", target: "12", lengthM: 1193, diameterMm: 792, baseLeak: 0 },
  { id: "P12", source: "12", target: "13", lengthM: 3531, diameterMm: 581, baseLeak: 0 },
  { id: "P13", source: "10", target: "14", lengthM: 821, diameterMm: 398, baseLeak: 0 },
  { id: "P14", source: "14", target: "15", lengthM: 504, diameterMm: 423, baseLeak: 0 },
  { id: "P15", source: "15", target: "16", lengthM: 538, diameterMm: 296, baseLeak: 0 },
  { id: "P16", source: "17", target: "16", lengthM: 2845, diameterMm: 407, baseLeak: 0 },
  { id: "P17", source: "17", target: "18", lengthM: 1673, diameterMm: 516, baseLeak: 0 },
  { id: "P18", source: "18", target: "19", lengthM: 784, diameterMm: 611, baseLeak: 0 },
  { id: "P19", source: "19", target: "3", lengthM: 393, diameterMm: 607, baseLeak: 0 },
  { id: "P20", source: "3", target: "20", lengthM: 2187, diameterMm: 1047, baseLeak: 0 },
  { id: "P21", source: "20", target: "21", lengthM: 1519, diameterMm: 532, baseLeak: 0 },
  { id: "P22", source: "21", target: "22", lengthM: 484, diameterMm: 312, baseLeak: 0 },
  { id: "P23", source: "20", target: "23", lengthM: 2722, diameterMm: 1052, baseLeak: 0 },
  { id: "P24", source: "23", target: "24", lengthM: 1198, diameterMm: 774, baseLeak: 0 },
  { id: "P25", source: "24", target: "25", lengthM: 1255, diameterMm: 760, baseLeak: 0 },
  { id: "P26", source: "26", target: "25", lengthM: 820, diameterMm: 492, baseLeak: 0 },
  { id: "P27", source: "27", target: "26", lengthM: 310, diameterMm: 318, baseLeak: 0 },
  { id: "P28", source: "16", target: "27", lengthM: 724, diameterMm: 313, baseLeak: 0 },
  { id: "P29", source: "23", target: "28", lengthM: 1491, diameterMm: 422, baseLeak: 0 },
  { id: "P30", source: "28", target: "29", lengthM: 2032, diameterMm: 412, baseLeak: 0 },
  { id: "P31", source: "29", target: "30", lengthM: 1624, diameterMm: 295, baseLeak: 0 },
  { id: "P32", source: "30", target: "31", lengthM: 156, diameterMm: 317, baseLeak: 0 },
  { id: "P33", source: "32", target: "31", lengthM: 858, diameterMm: 423, baseLeak: 0 },
  { id: "P34", source: "25", target: "32", lengthM: 911, diameterMm: 492, baseLeak: 0 },
];

export const NODE_BY_ID: Record<string, JunctionNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n])
);

// --- API Types ---
type SimulationResponse = {
  scenario_id: number;
  sensor_budget: number;
  optimized_sensor_nodes: number[];
  ground_truth: { x: number; y: number };
  prediction: { x: number; y: number };
  status: string;
};

// Optimal Placements based on sequence
export const OPTIMAL_PLACEMENT_ORDER = [
  "13", "31", "22", "12", "30", "9", "27", "6", "17", "25", 
  "32", "29", "15", "21", "3", "20", "28", "24", "10", "18", 
  "14", "16", "26", "8", "4", "5", "7", "11", "19", "2", "23"
];

// Dynamically generate 31 data points for the ROI curve
const paretoData = Array.from({ length: 31 }, (_, i) => {
  const sensors = i + 1;
  let accuracy;
  if (sensors === 1) accuracy = 42;
  else if (sensors === 2) accuracy = 68;
  else if (sensors === 3) accuracy = 81;
  else if (sensors === 4) accuracy = 89;
  else if (sensors === 5) accuracy = 91;
  else if (sensors === 12) accuracy = 96;
  else accuracy = Math.min(99, Math.round(91 + 8 * (1 - Math.exp(-0.15 * (sensors - 5)))));

  const x = 5 + (sensors - 1) * (95 / 30);
  const y = 85 - ((accuracy - 42) / (99 - 42)) * 75;

  return { sensors, accuracy, x, y };
});

const pathD = `M ${paretoData.map((p) => `${p.x} ${p.y}`).join(' L ')}`;

type SensorToken = {
  sensorIndex: number;
  nodeId: string;
};

type ApiNetworkNode = {
  node_id: string;
  x: number;
  y: number;
};

type ApiNetworkLink = {
  link_id: string;
  start_node_id: string;
  end_node_id: string;
};

type PredictResponse = {
  predicted_node: string;
  predicted_qL: number;
  confidence: number;
  top_predictions: Array<{
    node_id: string;
    probability: number;
  }>;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

// Map Client mouse coordinates perfectly to SVG viewBox coordinates
const SVG_VIEWBOX = { x: 240, y: 250, w: 420, h: 280 };

export default function LiveDemo() {
  const [sensors, setSensors] = useState<string>('12');
  const [sensorTokens, setSensorTokens] = useState<SensorToken[]>([]);
  const [isOptimized, setIsOptimized] = useState<boolean>(true);
  const [prediction, setPrediction] = useState<SimulationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Custom Drag State
  const [dragState, setDragState] = useState<{
    tokenIndex: number;
    x: number;
    y: number;
  } | null>(null);

  const numSensors = parseInt(sensors, 10);
  const graphNodeById: Record<string, JunctionNode> = Object.fromEntries(
    graphNodes.map((n) => [n.id, n])
  );
  const predictionLabel = prediction
    ? `Predicted N${prediction.predicted_node} | qL ${prediction.predicted_qL.toFixed(2)} | ${(prediction.confidence * 100).toFixed(1)}% confidence | Top: ${prediction.top_predictions
        .slice(0, 3)
        .map((item) => `N${item.node_id} ${(item.probability * 100).toFixed(1)}%`)
        .join(', ')}`
    : null;

  const applyOptimizedSensors = (nodeIds: string[]) => {
    const newTokens: SensorToken[] = nodeIds.slice(0, numSensors).map((nodeId, idx) => ({
      sensorIndex: idx,
      nodeId,
    }));
    setSensorTokens(newTokens);
    setIsOptimized(true);
  };

  const optimizeSensors = async (budget: number) => {
    const response = await fetch(`${API_BASE}/optimize-sensors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sensor_budget: budget }),
    });
    if (!response.ok) {
      throw new Error(`Sensor optimization failed (${response.status})`);
    }
    const data = await response.json();
    return data.selected_sensors.map((sensor: { node_id: string }) => sensor.node_id);
  };

  const runPrediction = async (tokens: SensorToken[]) => {
    const response = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sensors: tokens.map((token) => ({
          node_id: token.nodeId,
          pressure_delta: graphNodeById[token.nodeId]?.pressure ?? 0,
        })),
      }),
    });
    if (!response.ok) {
      throw new Error(`Prediction failed (${response.status})`);
    }
    const data: PredictResponse = await response.json();
    setPrediction(data);
  };

  useEffect(() => {
    let cancelled = false;

    const loadNetwork = async () => {
      try {
        const response = await fetch(`${API_BASE}/network`);
        if (!response.ok) {
          throw new Error(`Network load failed (${response.status})`);
        }
        const data = await response.json();
        const nodes = data.nodes as ApiNetworkNode[];
        const links = data.links as ApiNetworkLink[];

        const minX = Math.min(...nodes.map((node) => node.x));
        const maxX = Math.max(...nodes.map((node) => node.x));
        const minY = Math.min(...nodes.map((node) => node.y));
        const maxY = Math.max(...nodes.map((node) => node.y));
        const padding = 28;
        const scaleX = (SVG_VIEWBOX.w - padding * 2) / (maxX - minX);
        const scaleY = (SVG_VIEWBOX.h - padding * 2) / (maxY - minY);

        if (cancelled) return;

        setGraphNodes(
          nodes.map((node) => ({
            id: node.node_id,
            label: `N${node.node_id}`,
            kind: node.node_id === '1' ? 'reservoir' : 'junction',
            x: SVG_VIEWBOX.x + padding + (node.x - minX) * scaleX,
            y: SVG_VIEWBOX.y + SVG_VIEWBOX.h - padding - (node.y - minY) * scaleY,
            demand: 0,
            pressure: 0,
          }))
        );
        setGraphEdges(
          links.map((link) => ({
            id: link.link_id,
            source: link.start_node_id,
            target: link.end_node_id,
            lengthM: 250,
            diameterMm: 500,
            baseLeak: 0,
          }))
        );
        setApiStatus('');
      } catch (error) {
        if (!cancelled) {
          setApiStatus(error instanceof Error ? error.message : 'Network load failed');
        }
      }
    };

    loadNetwork();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadOptimizedSensors = async () => {
      try {
        const optimizedNodes = await optimizeSensors(numSensors);
        if (!cancelled) {
          applyOptimizedSensors(optimizedNodes);
          setApiStatus('');
        }
      } catch (error) {
        if (!cancelled) {
          applyOptimizedSensors(OPTIMAL_PLACEMENT_ORDER.slice(0, numSensors));
          setApiStatus(error instanceof Error ? error.message : 'Sensor optimization failed');
        }
      }
    };

    loadOptimizedSensors();

    return () => {
      cancelled = true;
    };
  }, [numSensors]);

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    
    const optimalNodes = OPTIMAL_PLACEMENT_ORDER.slice(0, numSensors);
    setSensorTokens((prev) =>
      prev.map((token, idx) => ({
        ...token,
        nodeId: optimalNodes[idx] || token.nodeId,
      }))
    );
    setIsOptimized(true);

    try {
      const res = await fetch(`${API_BASE}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sensor_budget: numSensors }),
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data: SimulationResponse = await res.json();
      setPrediction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run simulation');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- CUSTOM SVG DRAG LOGIC ---
  const handlePointerDown = (e: React.PointerEvent, tokenIndex: number, startX: number, startY: number) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragState({ tokenIndex, x: startX, y: startY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState) return;

    // Convert mouse pixels to SVG viewBox coordinates
    const svgElement = e.currentTarget as SVGSVGElement;
    const rect = svgElement.getBoundingClientRect();
    
    const scaleX = SVG_VIEWBOX.w / rect.width;
    const scaleY = SVG_VIEWBOX.h / rect.height;
    
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const svgX = SVG_VIEWBOX.x + (clientX * scaleX);
    const svgY = SVG_VIEWBOX.y + (clientY * scaleY);

    setDragState({ ...dragState, x: svgX, y: svgY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragState) return;

    // Find the closest valid node to snap to
    let closestNode: JunctionNode | null = null;
    let minDistance = 20; // Maximum snapping radius in SVG units

    for (const node of graphNodes) {
      if (node.kind === 'reservoir') continue; // Note: 'continue' instead of 'return' here
      
      const dist = Math.sqrt(Math.pow(node.x - dragState.x, 2) + Math.pow(node.y - dragState.y, 2));
      if (dist < minDistance) {
        minDistance = dist;
        closestNode = node;
      }
    }

    if (closestNode) {
      const targetNodeId = closestNode.id;
      const existingTokenOnTarget = sensorTokens.find((t) => t.nodeId === targetNodeId);

      setSensorTokens((prev) => {
        return prev.map((token) => {
          if (token.sensorIndex === dragState.tokenIndex) {
            return { ...token, nodeId: targetNodeId };
          }
          // Swap if we drop onto an occupied node
          if (existingTokenOnTarget && token.sensorIndex === existingTokenOnTarget.sensorIndex) {
            const sourceNodeId = prev.find((t) => t.sensorIndex === dragState.tokenIndex)?.nodeId;
            return { ...token, nodeId: sourceNodeId || token.nodeId };
          }
          return token;
        });
      });
      setIsOptimized(false);
    }

    setDragState(null);
  };

  return (
    <section
      className="relative w-full min-h-screen pb-[15vh] font-montserrat flex flex-col pt-[10vh] border-t border-[#1a1a1a]"
      style={{
        backgroundImage: "url('/images/stripes.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* ROW 1: CONTROLS & NETWORK */}
      <div className="relative z-10 w-full min-h-[45vh] flex-1 flex flex-row">
        {/* Top Left: Controls */}
        <div className="w-[50%] flex flex-col pl-16 lg:pl-25 pr-12 pt-8">
          <h2 className="text-white text-4xl lg:text-5xl font-[500] mb-12 tracking-wide">
            LeakSense In Action
          </h2>

          <div className="flex items-end gap-8 mb-8">
            <div className="flex flex-col gap-3">
              <label className="text-gray-200 text-sm font-[400]">
                Enter number of Sensors
              </label>
              <div className="relative">
                <select
                  value={sensors}
                  onChange={(e) => setSensors(e.target.value)}
                  className="appearance-none bg-[#111] border border-gray-600 text-white px-4 py-2 pr-12 rounded-sm focus:outline-none focus:border-[#1664bf] w-48 cursor-pointer transition-colors"
                >
                  {paretoData.map((d) => (
                    <option key={d.sensors} value={d.sensors.toString()}>
                      {d.sensors} Sensor{d.sensors > 1 ? 's' : ''} {d.sensors === 31 ? '(Full)' : ''}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-gray-200 text-sm font-[400]">
                Upload your data
              </label>
              <button
                className="h-[42px] w-[42px] border border-[#1664bf] bg-black/50 rounded-sm flex items-center justify-center hover:bg-[#1664bf]/10 transition-colors cursor-pointer group"
                title="Upload CSV"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1664bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <button 
            onClick={handleRunAnalysis}
            disabled={isLoading}
            className="bg-[#1664bf] text-white px-6 py-[10px] rounded-sm w-max flex items-center gap-3 hover:bg-[#1664bf] transition-colors font-[500] text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running...
              </>
            ) : (
              <>
                Run Analysis
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Top Right: Network Graph & Animated Sensors */}
        <div className="w-[50%] pr-16 lg:pr-25 flex items-center justify-center relative">
          <svg 
            viewBox={`${SVG_VIEWBOX.x} ${SVG_VIEWBOX.y} ${SVG_VIEWBOX.w} ${SVG_VIEWBOX.h}`} 
            className="w-full h-full select-none"
            style={{ touchAction: 'none' }} // Prevents mobile scrolling while dragging
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Draw Pipes (Edges) */}
            {graphEdges.map((edge) => {
              const sourceNode = graphNodeById[edge.source];
              const targetNode = graphNodeById[edge.target];
              if (!sourceNode || !targetNode) return null;

              return (
                <line
                  key={edge.id}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="#444"
                  strokeWidth={Math.max(1, edge.diameterMm / 250)}
                  strokeLinecap="round"
                />
              );
            })}

            {/* Base Nodes (Visual only now, snapping is handled via math on drop) */}
            {graphNodes.map((node) => {
              const isReservoir = node.kind === 'reservoir';
              return (
                <g key={node.id}>
                  {/* Junction point */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isReservoir ? 6 : 2.5}
                    fill={isReservoir ? '#4A90E2' : '#777'}
                    className="pointer-events-none"
                  />

                  {isReservoir && (
                    <text
                      x={node.x}
                      y={node.y - 12}
                      fill="#4A90E2"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Moving Sensor Tokens Layer */}
            {sensorTokens.map((token) => {
              const node = graphNodeById[token.nodeId];
              if (!node) return null;

              const isDragging = dragState?.tokenIndex === token.sensorIndex;
              
              // If dragging, follow mouse exactly. If not, map to node coordinates.
              const currentX = isDragging ? dragState.x : node.x;
              const currentY = isDragging ? dragState.y : node.y;

              return (
                <g
                  key={`sensor-token-${token.sensorIndex}`}
                  onPointerDown={(e) => handlePointerDown(e, token.sensorIndex, currentX, currentY)}
                  className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} z-50`}
                  style={{
                    // Transition is disabled while dragging for instant mouse follow!
                    transition: isDragging ? 'none' : 'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: `translate(${currentX}px, ${currentY}px)`,
                  }}
                >
                  {/* Outer pulse aura */}
                  <circle
                    cx={0}
                    cy={0}
                    r={11}
                    fill="#F02B11"
                    opacity={isDragging ? "0.6" : "0.3"}
                    className={`${isDragging ? '' : 'animate-pulse'} pointer-events-none transition-opacity`}
                  />

                  {/* Invisible hit-area to make clicking easier */}
                  <circle cx={0} cy={0} r={15} fill="transparent" />

                  {/* Red sensor core */}
                  <circle
                    cx={0}
                    cy={0}
                    r={4.5}
                    fill="#F02B11"
                    stroke="#FFF"
                    strokeWidth={1}
                    className="pointer-events-none shadow-md"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ROW 2: STATS & PARETO CURVE */}
      <div className="relative z-20 w-full h-[40vh] min-h-[300px] bg-[#1A1A1A] flex flex-row border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {/* Bottom Left: ROI Frontier Graph */}
        <div className="w-[50%] pl-16 lg:pl-25 pr-12 py-10 border-r border-[#2a2a2a] flex flex-col">
          <div className="flex justify-between items-start w-full h-[30px] shrink-0">
            <h3 className="text-white text-lg font-[400]">ROI Frontier</h3>
            <span className="text-gray-500 text-xs">Accuracy vs. Cost</span>
          </div>

          <div className="w-full flex-1 mt-6 relative">
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M 0 0 L 0 100 L 100 100" fill="none" stroke="#666" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="#333" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#333" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />

              <path d={pathD} fill="none" stroke="#F02B11" strokeWidth="2" vectorEffect="non-scaling-stroke" className="opacity-80" />
            </svg>

            {paretoData.map((point) => {
              const isActive = sensors === point.sensors.toString();
              return (
                <div
                  key={point.sensors}
                  className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center cursor-pointer group z-10"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  onClick={() => setSensors(point.sensors.toString())}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive ? 'w-[8px] h-[8px] bg-[#F02B11] shadow-[0_0_12px_#F02B11]' : 'w-[4px] h-[4px] bg-[#555] group-hover:bg-gray-300'
                    }`}
                  />
                  <span
                    className={`absolute top-full mt-2 text-[10px] font-montserrat transition-all duration-300 ${
                      isActive ? 'text-[#F02B11] opacity-100' : 'text-[#555] opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {point.sensors}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Right: Accuracy Score & ML Prediction */}
        <div className="w-[50%] pl-16 pr-16 lg:pr-25 py-10 flex flex-col">
          <div className="flex justify-between items-start w-full h-[30px] shrink-0">
            <h3 className="text-gray-100 text-lg font-[400]">ML Prediction</h3>
          </div>

          <div className="w-full flex-1 mt-6 flex flex-col justify-center gap-4">
            {isLoading && (
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="animate-spin h-6 w-6 text-[#1664bf]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Running PINN inference...</span>
              </div>
            )}

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-sm border border-red-900/50">
                Error: {error}
              </div>
            )}

            {prediction && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#111] border border-gray-700 p-4 rounded-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Ground Truth</p>
                    <p className="text-white text-2xl font-[500]">({prediction.ground_truth.x.toFixed(2)}, {prediction.ground_truth.y.toFixed(2)})</p>
                  </div>
                  <div className="bg-[#111] border border-gray-700 p-4 rounded-sm">
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Prediction</p>
                    <p className="text-[#F02B11] text-2xl font-[500]">({prediction.prediction.x.toFixed(2)}, {prediction.prediction.y.toFixed(2)})</p>
                  </div>
                </div>
                
                <div className="bg-[#111] border border-gray-700 p-4 rounded-sm">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Scenario ID: {prediction.scenario_id} | Sensors: {prediction.sensor_budget}</p>
                  <p className="text-green-400 text-sm font-[400]">Status: {prediction.status}</p>
                </div>
              </div>
            )}

            {!isLoading && !error && !prediction && (
              <p className="text-gray-400 text-sm font-[400] text-center py-8">
                Click "Run Analysis" to run PINN inference
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
