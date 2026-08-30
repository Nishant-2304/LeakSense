'use client';

export default function Footer() {
  return (
    <footer 
      className="relative w-full h-[40vh] min-h-[350px] flex flex-col py-10 font-montserrat overflow-hidden z-30"
      style={{
        // Radial gradient anchored at the bottom center: lighter red spreading into a dark maroon
        background: 'radial-gradient(ellipse at bottom center, #d82923 0%, #6e110e 100%)'
      }}
    >
      
      {/* Inline animation for seamless marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: marquee 15s linear infinite;
        }
      `}} />

      {/* Top Right Links */}
      <div className="absolute top-12 right-16 lg:right-25 flex flex-col items-start gap-1 z-20 text-white font-[700] text-lg lg:text-xl">
        <a href="#" className="hover:opacity-70 transition-opacity">Home</a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">Github</a>
      </div>

      {/* Center Marquee - Pushed lower with mt-auto, reduced text size to 8xl */}
      <div className="mt-auto mb-8 w-full flex items-center relative z-10 pointer-events-none">
        <div className="flex w-max animate-marquee-infinite">
           
           {/* Block 1 */}
           <div className="flex whitespace-nowrap items-center">
              <span className="text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6">LeakSense</span>
              <span className="text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2">•</span>
              <span className="text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6">LeakSense</span>
              <span className="text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2">•</span>
              <span className="text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6">LeakSense</span>
              <span className="text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2">•</span>
           </div>

           {/* Block 2 (Duplicate for seamless loop) */}
           <div className="flex whitespace-nowrap items-center" aria-hidden="true">
              <span className="text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6">LeakSense</span>
              <span className="text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2">•</span>
              <span className="text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6">LeakSense</span>
              <span className="text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2">•</span>
              <span className="text-white text-6xl lg:text-8xl font-[700] tracking-tight px-6">LeakSense</span>
              <span className="text-white text-4xl lg:text-6xl px-2 mb-1 lg:mb-2">•</span>
           </div>

        </div>
      </div>

      {/* Bottom Center Text */}
      <div className="w-full flex justify-center z-20">
        <p className="text-white font-[700] text-base lg:text-lg tracking-wide">
          Made by Deez Nulls
        </p>
      </div>

    </footer>
  );
}