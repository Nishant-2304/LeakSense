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
    imageSecondHalf: '/images/Frame 4.webp',
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

// Reverted purely to your font-pixel class, preserving the capitalize toggle
function CursiveWord({ word, capitalize = true }: { word: string, capitalize?: boolean }) {
  const displayWord = capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  return (
    <span className="font-pixel font-normal tracking-normal text-gray-900">
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

  return (
    <div className="relative w-full bg-[#f4f4f0] font-montserrat">
      
      {/* THE STICKY VIEWFINDER (Left Pane) */}
      <div className="sticky top-0 left-0 w-full h-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[35%] lg:w-[40%] h-screen overflow-hidden bg-[#1a1a1a]">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt="Presentation visual"
              className="w-full h-full object-cover"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* THE SCROLLING TRACK (Right Pane) */}
      <div className="w-full flex flex-col">
        {slides.map((slide) => (
          <section 
            key={slide.id} 
            className="relative w-full min-h-screen flex flex-row"
          >
            
            {/* INVISIBLE SCROLL TRIGGERS */}
            <div className="absolute inset-0 w-full h-full flex flex-col pointer-events-none z-0">
              <motion.div 
                className="w-full h-1/2"
                onViewportEnter={() => setCurrentImage(slide.imageFirstHalf)}
                viewport={{ amount: 0.5 }} 
              />
              <motion.div 
                className="w-full h-1/2"
                onViewportEnter={() => setCurrentImage(slide.imageSecondHalf)}
                viewport={{ amount: 0.5 }} 
              />
            </div>

            <div className="w-[35%] lg:w-[40%] bg-transparent z-10" />

            <div className="w-[65%] lg:w-[60%] flex flex-col justify-center px-16 lg:px-32 py-20 z-10">
              
              <h2 className="text-[65px] font-[700] text-black mb-4 leading-[1.2]">
                {slide.id}
              </h2>
              
              <h1 className="text-[65px] font-[700] text-black tracking-tight mb-8 leading-[1.2] flex flex-wrap items-baseline gap-x-4">
                {slide.title} <CursiveWord word={slide.cursiveWord} capitalize={true} />
              </h1>
              
              <p className="text-xl font-[400] text-gray-800 leading-relaxed max-w-2xl mb-12">
                {renderTextWithCursive(slide.body, slide.cursiveWord)}
              </p>
              
              <p className="text-xs font-[400] text-gray-500 uppercase tracking-widest max-w-xl leading-relaxed">
                <span className="font-[700] text-gray-900">EG :</span> {renderTextWithCursive(slide.eg, slide.cursiveWord)}
              </p>
              
            </div>
          </section>
        ))}
      </div>

    </div>
  );
}