'use client';

import { useState } from 'react';

// Dynamically generate 31 data points (1 to 31 full scale)
const paretoData = Array.from({ length: 31 }, (_, i) => {
  const sensors = i + 1;
  let accuracy;
  
  // Hardcode the initial steep climb for visual impact
  if (sensors === 1) accuracy = 42;
  else if (sensors === 2) accuracy = 68;
  else if (sensors === 3) accuracy = 81;
  else if (sensors === 4) accuracy = 89;
  else if (sensors === 5) accuracy = 91;
  else if (sensors === 12) accuracy = 96; 
  // Algorithmic diminishing returns for the rest up to 99%
  else accuracy = Math.min(99, Math.round(91 + 8 * (1 - Math.exp(-0.15 * (sensors - 5)))));
  
  // Shift X to start at 5% so it doesn't hit the Y-axis line
  const x = 5 + (sensors - 1) * (95 / 30);
  // Shift Y so it stays within the chart boundaries
  const y = 85 - ((accuracy - 42) / (99 - 42)) * 75;
  
  return { sensors, accuracy, x, y };
});

const pathD = `M ${paretoData.map(p => `${p.x} ${p.y}`).join(' L ')}`;

export default function LiveDemo() {
  const [sensors, setSensors] = useState<string>('12'); 

  const currentData = paretoData.find(d => d.sensors.toString() === sensors) || paretoData[11];

  return (
    <section 
      // Added pb-[15vh] here to force space under the bottom bar, revealing the stripes
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

        {/* Top Right: Map Component */}
        <div className="w-[50%] pr-16 lg:pr-25 pt-8 pb-8 flex items-stretch">
          <div className="w-full h-full bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl flex items-center justify-center shadow-2xl">
            <p className="text-gray-500 font-pixel text-sm tracking-widest opacity-40">
              [ MAP COMPONENT INJECTION ZONE ]
            </p>
          </div>
        </div>

      </div>

      {/* ROW 2 (BOTTOM): Solid #1A1A1A Bar */}
      <div className="relative z-20 w-full h-[40vh] min-h-[300px] bg-[#1A1A1A] flex flex-row border-t border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Bottom Left: ROI Frontier Graph */}
        <div className="w-[50%] pl-16 lg:pl-25 pr-12 py-10 border-r border-[#2a2a2a] flex flex-col">
          
          {/* Fixed-height Header Block ensures perfect Y-axis alignment with the right column */}
          <div className="flex justify-between items-start w-full h-[30px] shrink-0">
            <h3 className="text-white text-lg font-[400]">ROI Frontier</h3>
            <span className="text-gray-500 text-xs">Accuracy vs. Cost</span>
          </div>

          <div className="w-full flex-1 mt-6 relative">
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              
              {/* Thickened, explicit X and Y Axes so they are clearly visible */}
              <path d="M 0 0 L 0 100 L 100 100" fill="none" stroke="#666" strokeWidth="2" vectorEffect="non-scaling-stroke" />

              {/* Background Grid Lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="#333" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#333" strokeWidth="1" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />

              {/* Data Curve */}
              <path 
                d={pathD} 
                fill="none" 
                stroke="#F02B11" 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
                className="opacity-80"
              />
            </svg>

            {/* Interactive Data Dots */}
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
                  
                  {/* Tooltip */}
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
          
          {/* Identical Fixed-height Header Block locks alignment */}
          <div className="flex justify-between items-start w-full h-[30px] shrink-0">
            <h3 className="text-gray-100 text-lg font-[400]">Accuracy Score</h3>
          </div>

          <div className="w-full flex-1 mt-6 flex flex-col justify-center">
            <p className="text-white text-7xl lg:text-[6.5rem] font-[700] tracking-tight leading-none mb-2 transition-all">
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