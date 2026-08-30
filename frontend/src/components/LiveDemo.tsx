'use client';

import { useState } from 'react';

// --- TYPES & DUMMY DATA ---
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

// 32-Node Network Structure (Simulating the Hanoi topology scale)
export const NODES: JunctionNode[] = [
  { id: "1", label: "RES", kind: "reservoir", x: 50, y: 310, demand: 0, pressure: 60 },
  // Col 1
  { id: "2", label: "N2", kind: "junction", x: 150, y: 100, demand: 100, pressure: 50 },
  { id: "3", label: "N3", kind: "junction", x: 150, y: 200, demand: 120, pressure: 48 },
  { id: "4", label: "N4", kind: "junction", x: 150, y: 310, demand: 90,  pressure: 45 },
  { id: "5", label: "N5", kind: "junction", x: 150, y: 420, demand: 110, pressure: 44 },
  { id: "6", label: "N6", kind: "junction", x: 150, y: 520, demand: 150, pressure: 41 },
  // Col 2
  { id: "7", label: "N7", kind: "junction", x: 280, y: 100, demand: 80,  pressure: 47 },
  { id: "8", label: "N8", kind: "junction", x: 280, y: 200, demand: 100, pressure: 46 },
  { id: "9", label: "N9", kind: "junction", x: 280, y: 310, demand: 130, pressure: 42 },
  { id: "10", label: "N10", kind: "junction", x: 280, y: 420, demand: 110, pressure: 41 },
  { id: "11", label: "N11", kind: "junction", x: 280, y: 520, demand: 90,  pressure: 39 },
  // Col 3
  { id: "12", label: "N12", kind: "junction", x: 410, y: 100, demand: 120, pressure: 43 },
  { id: "13", label: "N13", kind: "junction", x: 410, y: 200, demand: 140, pressure: 42 },
  { id: "14", label: "N14", kind: "junction", x: 410, y: 310, demand: 100, pressure: 40 },
  { id: "15", label: "N15", kind: "junction", x: 410, y: 420, demand: 110, pressure: 38 },
  { id: "16", label: "N16", kind: "junction", x: 410, y: 520, demand: 150, pressure: 36 },
  // Col 4
  { id: "17", label: "N17", kind: "junction", x: 540, y: 100, demand: 80,  pressure: 39 },
  { id: "18", label: "N18", kind: "junction", x: 540, y: 200, demand: 95,  pressure: 38 },
  { id: "19", label: "N19", kind: "junction", x: 540, y: 310, demand: 120, pressure: 36 },
  { id: "20", label: "N20", kind: "junction", x: 540, y: 420, demand: 105, pressure: 35 },
  { id: "21", label: "N21", kind: "junction", x: 540, y: 520, demand: 90,  pressure: 33 },
  // Col 5
  { id: "22", label: "N22", kind: "junction", x: 670, y: 100, demand: 110, pressure: 35 },
  { id: "23", label: "N23", kind: "junction", x: 670, y: 200, demand: 130, pressure: 34 },
  { id: "24", label: "N24", kind: "junction", x: 670, y: 310, demand: 100, pressure: 32 },
  { id: "25", label: "N25", kind: "junction", x: 670, y: 420, demand: 125, pressure: 31 },
  { id: "26", label: "N26", kind: "junction", x: 670, y: 520, demand: 140, pressure: 29 },
  // Col 6
  { id: "27", label: "N27", kind: "junction", x: 800, y: 100, demand: 85,  pressure: 31 },
  { id: "28", label: "N28", kind: "junction", x: 800, y: 200, demand: 100, pressure: 30 },
  { id: "29", label: "N29", kind: "junction", x: 800, y: 310, demand: 115, pressure: 28 },
  { id: "30", label: "N30", kind: "junction", x: 800, y: 420, demand: 90,  pressure: 27 },
  { id: "31", label: "N31", kind: "junction", x: 800, y: 520, demand: 105, pressure: 25 },
  // Tail
  { id: "32", label: "N32", kind: "junction", x: 920, y: 310, demand: 150, pressure: 22 },
];

export const EDGES: PipeEdge[] = [
  // Reservoir to network
  { id: "P01", source: "1", target: "4", lengthM: 100, diameterMm: 350, baseLeak: 0 },
  // Vertical connections
  { id: "P02", source: "4", target: "3", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P03", source: "3", target: "2", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P04", source: "4", target: "5", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P05", source: "5", target: "6", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P09", source: "7", target: "8", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P10", source: "8", target: "9", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P11", source: "9", target: "10", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P12", source: "10", target: "11", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P16", source: "12", target: "13", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P17", source: "13", target: "14", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P18", source: "14", target: "15", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P19", source: "15", target: "16", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P23", source: "17", target: "18", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P24", source: "18", target: "19", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P25", source: "19", target: "20", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P26", source: "20", target: "21", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P30", source: "22", target: "23", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P31", source: "23", target: "24", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P32", source: "24", target: "25", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P33", source: "25", target: "26", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P37", source: "27", target: "28", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  { id: "P38", source: "28", target: "29", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P39", source: "29", target: "30", lengthM: 110, diameterMm: 250, baseLeak: 0 },
  { id: "P40", source: "30", target: "31", lengthM: 100, diameterMm: 200, baseLeak: 0 },
  // Horizontal Connections
  { id: "P06", source: "2", target: "7", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P07", source: "4", target: "9", lengthM: 130, diameterMm: 300, baseLeak: 0 },
  { id: "P08", source: "6", target: "11", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P13", source: "7", target: "12", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P14", source: "9", target: "14", lengthM: 130, diameterMm: 300, baseLeak: 0 },
  { id: "P15", source: "11", target: "16", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P20", source: "12", target: "17", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P21", source: "14", target: "19", lengthM: 130, diameterMm: 300, baseLeak: 0 },
  { id: "P22", source: "16", target: "21", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P27", source: "17", target: "22", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P28", source: "19", target: "24", lengthM: 130, diameterMm: 300, baseLeak: 0 },
  { id: "P29", source: "21", target: "26", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P34", source: "22", target: "27", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  { id: "P35", source: "24", target: "29", lengthM: 130, diameterMm: 300, baseLeak: 0 },
  { id: "P36", source: "26", target: "31", lengthM: 130, diameterMm: 200, baseLeak: 0 },
  // Tail connection
  { id: "P41", source: "29", target: "32", lengthM: 120, diameterMm: 250, baseLeak: 0 },
];

export const NODE_BY_ID: Record<string, JunctionNode> = Object.fromEntries(
  NODES.map((n) => [n.id, n])
);

// Dynamically generate 31 data points (1 to 31 full scale) for the graph
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

const pathD = `M ${paretoData.map(p => `${p.x} ${p.y}`).join(' L ')}`;

export default function LiveDemo() {
  const [sensors, setSensors] = useState<string>('12'); 

  const currentData = paretoData.find(d => d.sensors.toString() === sensors) || paretoData[11];
  const numSensors = parseInt(sensors, 10);

  // Pick the first `numSensors` nodes to simulate optimal placement
  // Now correctly scales up to 31 since we have 32 nodes mapped out.
  const activeSensors = new Set(
    NODES.slice(1, Math.min(numSensors + 1, NODES.length)).map(n => n.id) // Skipping index 0 (reservoir)
  );

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

      {/* ROW 1 (TOP): 50/50 Split */}
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
                  className="appearance-none bg-[#111] border border-gray-600 text-white px-4 py-2 pr-12 rounded-sm focus:outline-none focus:border-[#F02B11] w-48 cursor-pointer transition-colors"
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
                className="h-[42px] w-[42px] border border-[#F02B11] bg-black/50 rounded-sm flex items-center justify-center hover:bg-[#F02B11]/10 transition-colors cursor-pointer group"
                title="Upload CSV"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F02B11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <button className="bg-[#F02B11] text-white px-6 py-[10px] rounded-sm w-max flex items-center gap-3 hover:bg-[#d0250f] transition-colors font-[500] text-sm mt-2">
            Run Analysis
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* Top Right: Network Graph Component */}
        <div className="w-[50%] pr-16 lg:pr-25 pt-4 pb-8 flex items-stretch relative">
          <svg viewBox="0 0 1000 620" className="w-full h-full overflow-visible">
            
            {/* Draw Pipes (Edges) */}
            {EDGES.map((edge) => {
              const sourceNode = NODE_BY_ID[edge.source];
              const targetNode = NODE_BY_ID[edge.target];
              if (!sourceNode || !targetNode) return null;

              return (
                <line 
                  key={edge.id}
                  x1={sourceNode.x} 
                  y1={sourceNode.y} 
                  x2={targetNode.x} 
                  y2={targetNode.y} 
                  stroke="#333" 
                  strokeWidth={edge.diameterMm / 40} 
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              );
            })}

            {/* Draw Junctions (Nodes) */}
            {NODES.map((node) => {
              const isSensor = activeSensors.has(node.id);
              const isSpecial = node.kind === 'reservoir';

              return (
                <g key={node.id} className="transition-all duration-500">
                  {/* Glowing halo for active sensors */}
                  {isSensor && (
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={24} 
                      fill="#F02B11" 
                      opacity="0.2" 
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Node core */}
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r={isSpecial ? 12 : (isSensor ? 10 : 6)} 
                    fill={isSensor ? "#F02B11" : (isSpecial ? "#4A90E2" : "#666")}
                    stroke={isSensor ? "#FFF" : "none"}
                    strokeWidth={isSensor ? 2 : 0}
                  />
                  
                  {/* Labels for Tanks & Reservoirs */}
                  {isSpecial && (
                    <text 
                      x={node.x} 
                      y={node.y - 20} 
                      fill="#4A90E2" 
                      fontSize="14" 
                      fontFamily="sans-serif" 
                      fontWeight="bold" 
                      textAnchor="middle"
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

      </div>

      {/* ROW 2 (BOTTOM): Solid #1A1A1A Bar */}
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

              <path 
                d={pathD} 
                fill="none" 
                stroke="#F02B11" 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
                className="opacity-80"
              />
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
                  <div className={`rounded-full transition-all duration-300 ${isActive ? 'w-[8px] h-[8px] bg-[#F02B11] shadow-[0_0_12px_#F02B11]' : 'w-[4px] h-[4px] bg-[#555] group-hover:bg-gray-300'}`} />
                  <span className={`absolute top-full mt-2 text-[10px] font-montserrat transition-all duration-300 ${isActive ? 'text-[#F02B11] opacity-100' : 'text-[#555] opacity-0 group-hover:opacity-100'}`}>
                    {point.sensors}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Right: Accuracy Score */}
        <div className="w-[50%] pl-16 pr-16 lg:pr-25 py-10 flex flex-col">
          <div className="flex justify-between items-start w-full h-[30px] shrink-0">
            <h3 className="text-gray-100 text-lg font-[400]">Accuracy Score</h3>
          </div>

          <div className="w-full flex-1 mt-6 flex flex-col justify-center">
            <p className="text-white text-7xl lg:text-[3.5rem] font-[600] tracking-tight leading-none mb-2 transition-all">
              {currentData.accuracy}%
            </p>
            <p className="text-gray-400 text-sm font-[400]">
              {sensors === '5' ? 'Optimal sensor placement' : 'Custom sensor placement'}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}