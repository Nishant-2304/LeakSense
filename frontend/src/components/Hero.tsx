'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !containerRef.current) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const frameCount = 240;
    
    const getFramePath = (index: number) => 
      `/images/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const frameObj = { frame: 0 };

    // 1. Preload all frames
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      images.push(img);
    }

    // 2. Draw first frame on load
    images[0].onload = () => {
      context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    };

    // 3. Render function
    const render = () => {
      if (images[frameObj.frame]) {
         context.clearRect(0, 0, canvas.width, canvas.height);
         context.drawImage(images[frameObj.frame], 0, 0, canvas.width, canvas.height);
         setCurrentFrame(Math.round(frameObj.frame)); 
      }
    };

    // 4. Wrap GSAP logic in gsap.context()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", 
          scrub: 0.5,
          pin: true,
        }
      });

      tl.to(frameObj, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render
      });
    }, containerRef); // <- Scoped to the Hero container!

    // Safely revert ONLY this component's animations on unmount
    return () => {
      ctx.revert();
    };
  }, []);

  // Helper function to calculate opacity based on the current frame.
  const getOpacity = (startFrame: number, endFrame: number) => {
    if (currentFrame < startFrame || currentFrame > endFrame) return 0;
    
    const fadeDuration = 15;
    
    // Fade in
    if (currentFrame < startFrame + fadeDuration) {
      return (currentFrame - startFrame) / fadeDuration;
    }
    // Fade out
    if (currentFrame > endFrame - fadeDuration) {
      return (endFrame - currentFrame) / fadeDuration;
    }
    // Solid hold
    return 1;
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#000] overflow-hidden">
      
      {/* Scroll-scrubbed Video Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Dark gradient overlay to ensure text is always readable over the moving pipes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

      {/* --- TEXT SCREEN 1 (Frames 0 to 60) --- */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75"
        style={{ opacity: getOpacity(0, 60) }}
      >
        <div className="relative w-full max-w-[1200px] h-[250px] flex items-center justify-center -mt-20">
          
          {/* Top Left Text */}
          <div className="absolute left-8 lg:left-12 top-0">
            <p className="text-gray-300 text-xl lg:text-2xl font-montserrat leading-snug">
              Intelligent Monitoring for<br/>Water Networks.
            </p>
          </div>
          
          {/* Center Logo + Text */}
          <div className="flex flex-col items-center gap-2">
            <Image 
              src="/images/group 4.webp" 
              alt="LS Logo" 
              width={220} 
              height={100} 
              className="object-contain"
            />
            <h1 className="text-white text-5xl lg:text-7xl font-[700] tracking-tight">
              LeakSense
            </h1>
          </div>

          {/* Bottom Right Text */}
          <div className="absolute right-8 lg:right-12 bottom-0">
            <p className="text-gray-300 text-xl lg:text-2xl font-montserrat leading-snug">
              Engineering Intelligence<br/>Beneath the Surface.
            </p>
          </div>

        </div>
      </div>

      {/* --- TEXT SCREEN 2 (Frames 60 to 120) --- */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75"
        style={{ opacity: getOpacity(60, 120) }}
      >
        <h2 className="text-white text-5xl font-[700] mb-24 -mt-10">
          It begins with observation.
        </h2>
        <div className="flex w-full px-40 justify-between items-start">
          <p className="text-white text-2xl font-montserrat max-w-sm text-center leading-relaxed">
            LeakSense analyzes the structure of a water distribution network to determine where measurements matter most.
          </p>
          <p className="text-white text-2xl font-montserrat text-right leading-relaxed">
            No "cost."<br/>No "coverage."<br/>No "hidden leaks."
          </p>
        </div>
      </div>

      {/* --- TEXT SCREEN 3 (Frames 120 to 180) --- */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75"
        style={{ opacity: getOpacity(120, 180) }}
      >
        <div className="flex w-full px-32 justify-between items-start">
          <p className="text-white text-2xl font-montserrat max-w-lg text-center leading-relaxed">
            Every measurement carries a different amount of information. By combining network physics with optimization, LeakSense identifies the junctions where each sensor contributes the most toward understanding the system.
          </p>
          <p className="text-white text-2xl font-montserrat max-w-lg text-center leading-relaxed">
            The optimized measurements are processed by a Physics-Informed Neural Network, enabling accurate reconstruction of the network state and prediction of probable leak locations.
          </p>
        </div>
      </div>

      {/* --- TEXT SCREEN 4 (Frames 180 to 240) --- */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75"
        style={{ opacity: getOpacity(180, 240) }}
      >
        <p className="text-white text-4xl font-montserrat max-w-4xl text-center leading-relaxed -mt-20">
          Built on physics, driven by data, LeakSense delivers accurate leak localization while reducing the need for extensive sensor deployment.
        </p>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex items-center gap-2 text-gray-300 font-montserrat text-sm tracking-widest animate-pulse">
          Explore the System <span>↓</span>
        </div>
      </div>

    </section>
  );
}