'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const applications = [
  {
    id: 1,
    title: "Urban Water\nDetection",
    desc1: "Municipal water distribution networks span hundreds of kilometers, making continuous monitoring both expensive and operationally challenging. Undetected leaks contribute to significant water loss, increased maintenance costs, and reduced service reliability.",
    desc2: "LeakSense optimizes sensor placement using physics-informed models, allowing utilities to monitor larger portions of the network with fewer sensors. This enables faster leak localization, reduced inspection efforts, and more efficient infrastructure management.",
    images: [
      "/images/BeyondPrototype11.webp",
      "/images/BeyondPrototype12.webp",
      "/images/BeyondPrototype13.webp"
    ]
  },
  {
    id: 2,
    title: "Oil & Gas\nPipelines",
    desc1: "Oil and gas transmission pipelines often pass through remote and environmentally sensitive regions where routine inspections are difficult. Even small leaks can lead to substantial economic losses and environmental damage.",
    desc2: "By combining optimized sensor placement with physics-informed leak localization, LeakSense provides early detection and accurate identification of potential leak locations, helping operators improve safety while minimizing operational costs.",
    images: [
      "/images/BeyondPrototype21.webp",
      "/images/BeyondPrototype22.webp",
      "/images/BeyondPrototype23.webp"
    ]
  },
  {
    id: 3,
    title: "Smart Irrigation\nNetworks",
    desc1: "Modern irrigation systems distribute water across vast agricultural landscapes, where hidden leaks can waste valuable resources and negatively impact crop productivity. Traditional monitoring methods often require extensive sensor deployment.",
    desc2: "LeakSense enables efficient monitoring with strategically optimized sensor locations, reducing deployment costs while maintaining accurate leak detection. This helps improve water conservation, operational efficiency, and sustainable agricultural practices.",
    images: [
      "/images/BeyondPrototype31.webp",
      "/images/BeyondPrototype32.webp",
      "/images/BeyondPrototype33.webp"
    ]
  }
];

function SlideImageGallery({ images, altText }: { images: string[], altText: string }) {
  const [hoverIndex, setHoverIndex] = useState(0);

  return (
    // Added shrink-0 and ml-auto to force it to stay full width and locked to the right edge
    <div className="w-[45%] shrink-0 h-full overflow-hidden rounded-sm relative ml-auto">
      
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${altText} - View ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${
            hoverIndex === idx ? 'opacity-80 z-0' : 'opacity-0 -z-10'
          }`}
        />
      ))}
      
      <div className="absolute inset-0 w-full h-full flex z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-full cursor-pointer"
            onMouseEnter={() => setHoverIndex(idx)}
          />
        ))}
      </div>

    </div>
  );
}

export default function BeyondPrototype() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const ctx = gsap.context(() => {
      const scrollWidth = strip.scrollWidth - window.innerWidth;

      gsap.to(strip, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollWidth}`, 
          pin: true,
          scrub: 1, 
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newActive = Math.round(self.progress * (applications.length - 1));
            setActive(newActive);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  const handleThumbnailClick = (index: number) => {
    if (!stripRef.current) return;
    setActive(index);
    
    const scrollWidth = stripRef.current.scrollWidth - window.innerWidth;
    const targetX = (index / (applications.length - 1)) * scrollWidth;

    gsap.to(stripRef.current, {
      x: -targetX,
      duration: 1,
      ease: 'power3.inOut'
    });
  };

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden font-montserrat z-30">
      
      {/* HORIZONTAL STRIP */}
      <div ref={stripRef} className="flex h-screen w-[300vw] will-change-transform">
        {applications.map((app) => (
          <div 
            key={app.id} 
            className="w-screen h-screen flex-shrink-0 flex flex-col justify-start px-16 lg:px-25 pt-[18vh]"
          >
            {/* Top Area: Title & Image */}
            <div className="w-full flex justify-between items-start mb-12 h-[35vh]">
              
              {/* Added shrink-0 here so the empty div on slides 2 & 3 holds its 50% width */}
              <div className="w-[50%] shrink-0 flex flex-col">
                {app.id === 1 && (
                  <h1 className="text-white text-5xl lg:text-7xl font-[600] leading-none flex flex-col w-full">
                    <span className="font-pixel font-normal tracking-normal ml-[35%] lg:ml-[50%] -mb-4 z-10">
                      Where
                    </span>
                    <span className="whitespace-nowrap">LeakSense Works</span>
                  </h1>
                )}
              </div>

              <SlideImageGallery images={app.images} altText={app.title} />
              
            </div>

            {/* Bottom Area: Info Grid */}
            <div className="flex flex-row justify-start items-start gap-8 lg:gap-12 w-full pt-4">
              
              <div className="w-auto lg:w-[328px] shrink-0">
                <h2 className="text-[#F02B11] text-3xl lg:text-4xl font-[600] whitespace-pre-line leading-[1.1]">
                  {app.title}
                </h2>
              </div>

              <div className="flex-1 flex flex-row gap-12 lg:gap-16"> 
                <p className="text-gray-300 text-sm lg:text-[15px] leading-tight flex-1 font-[400]">
                  {app.desc1}
                </p>
                <p className="text-gray-300 text-sm lg:text-[15px] leading-tight flex-1 font-[400]">
                  {app.desc2}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* THUMBNAIL NAVIGATOR */}
      <div className="absolute bottom-12 right-16 lg:right-25 z-40 flex gap-4 bg-black/50 p-2 rounded-sm backdrop-blur-sm">
        {applications.map((app, index) => (
          <div
            key={app.id}
            onClick={() => handleThumbnailClick(index)}
            className={`w-[80px] h-[50px] cursor-pointer transition-all duration-300 overflow-hidden ${
              active === index 
                ? 'opacity-100 border-2 border-white' 
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            <img 
              src={app.images[0]} 
              alt={`Go to ${app.title}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

    </section>
  );
}