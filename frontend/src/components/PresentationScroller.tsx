// src/components/PresentationScroller.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: '01',
    title: 'Invisible By',
    cursiveWord: 'design',
    body: 'A leak inside a buried pipe gives no warning no puddle, no alarm. Most pipelines are watched at only a few fixed points, chosen by convention, not analysis. Between them, it\'s a black box. Problems go unnoticed until they\'re big enough to finally show up.',
    eg: 'A leak runs for weeks between two sensors before either one notices.',
    imageFirstHalf: '/images/Frame 1.webp',
    imageSecondHalf: '/images/Frame 1 (1).webp',
  },
  {
    id: '02',
    title: 'Coverage isn\'t',
    cursiveWord: "confidence",
    body: "Sensors at both ends only show that water was lost not where. Monitoring a pipeline isn't the same as being able to localize a problem inside it.",
    eg: 'An unexplained loss could be 200m in or 8km in every response starts by searching the whole length.',
    imageFirstHalf: '/images/Frame 1 (2).webp',
    imageSecondHalf: '/images/Frame 4 (1).webp',
  },
  {
    id: '03',
    title: 'Full Coverage Doesn\'t',
    cursiveWord: 'scale',
    body: 'Every added sensor needs power, installation, and upkeep often on buried, hard-to-reach pipe. Across kilometers, dense coverage becomes unaffordable for most operators.',
    eg: 'Instrumenting a 50km irrigation line could cost more than the water it protects',
    imageFirstHalf: '/images/Frame 5.webp',
    imageSecondHalf: '/images/Frame 7.webp',
  }
];

function CursiveWord({ word, capitalize = true }: { word: string, capitalize?: boolean }) {
  const displayWord = capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  return (
    <span className="font-pixel font-normal tracking-normal text-white">
      {displayWord}
    </span>
  );
}

function renderTextWithCursive(text: string, cursiveWord: string) {
  if (!text) return null;
  const parts = text.split(new RegExp(`(${cursiveWord})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === cursiveWord.toLowerCase() 
          ? <CursiveWord key={i} word={part} capitalize={false} />
          : part
      )}
    </span>
  );
}

export default function PresentationScroller() {
  const [currentImage, setCurrentImage] = useState(slides[0].imageFirstHalf);
  const [scrollDir, setScrollDir] = useState(1);

  // Track the direction of the scroll by comparing image array indices
  const handleImageChange = (newImage: string) => {
    if (newImage === currentImage) return;
    
    const allImages = slides.flatMap(s => [s.imageFirstHalf, s.imageSecondHalf]);
    const newIdx = allImages.indexOf(newImage);
    const currIdx = allImages.indexOf(currentImage);
    
    setScrollDir(newIdx > currIdx ? 1 : -1);
    setCurrentImage(newImage);
  };

  // Dynamic animation variants
  const imageVariants = {
    enter: { x: -60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      // If scrolling up (dir === -1), snap towards left. If down, stay in place and fade.
      x: dir === -1 ? -60 : 0,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.4 }
    })
  };

  return (
    <div className="relative w-full bg-black font-montserrat flex flex-row">
      
      {/* THE STICKY VIEWFINDER (Left Pane) */}
      <div className="w-[35%] lg:w-[40%] relative z-10">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          {/* custom={scrollDir} passes the direction to our variants */}
          <AnimatePresence mode="popLayout" custom={scrollDir}>
            <motion.img
              key={currentImage}
              src={currentImage}
              alt="Presentation visual"
              className="w-full h-full object-cover"
              custom={scrollDir}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: "easeOut" }} 
            />
          </AnimatePresence>
        </div>
      </div>

      {/* THE SCROLLING TRACK (Right Pane) */}
      <div className="w-[65%] lg:w-[60%] flex flex-col">
        {slides.map((slide) => (
          <section 
            key={slide.id} 
            className="relative w-full min-h-screen flex flex-col justify-center px-16 lg:px-32 py-20"
          >
            
            {/* INVISIBLE SCROLL TRIGGERS */}
            <div className="absolute inset-0 w-full h-full flex flex-col pointer-events-none z-0">
              <motion.div 
                // Delay added here for the first slide (75% height pushes the trigger much further down)
                className={slide.id === '01' ? "w-full h-[75%]" : "w-full h-1/2"}
                onViewportEnter={() => handleImageChange(slide.imageFirstHalf)}
                viewport={{ amount: 0.1 }} 
              />
              <motion.div 
                className={slide.id === '01' ? "w-full h-[25%]" : "w-full h-1/2"}
                onViewportEnter={() => handleImageChange(slide.imageSecondHalf)}
                viewport={{ amount: 0.1 }} 
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="relative z-10">
              
              <h3 className="text-white text-2xl lg:text-3xl font-[700] mb-12 tracking-wide">
                Current Challenges
              </h3>

              <h2 className="text-[65px] font-[700] text-[#F02B11] leading-none mb-0">
                {slide.id}
              </h2>
              
              <h1 className="text-[65px] font-[700] text-white tracking-tight mb-8 leading-[1.1] flex flex-wrap items-baseline gap-x-4">
                {slide.title} <CursiveWord word={slide.cursiveWord} capitalize={true} />
              </h1>
              
              <p className="text-base lg:text-lg font-[400] text-gray-200 leading-relaxed max-w-2xl mb-12">
                {renderTextWithCursive(slide.body, slide.cursiveWord)}
              </p>
              
              <p className="text-xs font-[400] text-gray-400 uppercase tracking-widest max-w-xl leading-relaxed">
                <span className="font-[700] text-white">EG :</span> {renderTextWithCursive(slide.eg, slide.cursiveWord)}
              </p>
            </div>
            
          </section>
        ))}
      </div>

    </div>
  );
}