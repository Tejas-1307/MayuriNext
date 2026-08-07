'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const proximityData = [
  {
    category: 'Kids Education',
    emoji: '🏫',
    items: [
      { name: 'Euro School', time: '4 Min' },
      { name: 'Dhruv Global School', time: '5 Min' },
      { name: 'Bishop School', time: '5 Min' },
    ],
  },
  {
    category: 'Leisure & Daily Needs',
    emoji: '🏬',
    items: [
      { name: 'Reliance Mart & Tata Star Bazar', time: '4 Min' },
      { name: 'Dmart / Dorabjee Paradise Mall', time: '10 Min' },
    ],
  },
  {
    category: 'Travel & Transport',
    emoji: '🚌',
    items: [
      { name: 'Bus Stand', time: '2 Min' },
      { name: 'Railway Station', time: '30 Min' },
      { name: 'Airport', time: '40 Min' },
    ],
  },
  {
    category: 'Medical Emergency',
    emoji: '🏥',
    items: [
      { name: 'Nixi Hospital', time: '5 Min' },
      { name: 'Multi Speciality Hospital', time: '8 Min' },
      { name: 'Ruby Hall Clinic Wanowarie', time: '15 Min' },
    ],
  },
  {
    category: 'Business Centers',
    emoji: '🏢',
    items: [
      { name: 'Magarpatta City', time: '25 Min' },
      { name: 'SP Infocity', time: '25 Min' },
      { name: 'MG Road', time: '25 Min' },
    ],
  },
];

interface NearbySectionProps {
  projectName?: string;
  subheading?: string;
}

export const NearbySection: React.FC<NearbySectionProps> = ({
  projectName = 'Mayuri Adhinathpuram',
  subheading = 'Everything your family needs, just minutes from Mayuri Adhinathpuram.',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  // -1 indicates 'ALL' proximity tab
  const [activeProxTab, setActiveProxTab] = useState<number>(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Viewport Reveal Micro-Animation: Opacity 0 -> 1, Y 50 -> 0, 1s duration, Power4 ease
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Parallax scroll effect on background image
      if (bgImgRef.current) {
        gsap.fromTo(
          bgImgRef.current,
          { y: -50 },
          {
            y: 50,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-[60vh] select-none text-white pt-[80px] pb-[100px] md:pt-[140px] md:pb-[160px]"
    >
      {/* Background Parallax Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={bgImgRef}
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
          alt={`${projectName} location backdrop`}
          className="absolute inset-0 w-full h-[120%] object-cover top-[-10%]"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 px-4 md:px-[6vw]">
        {/* Section Header */}
        <div className="mb-[6vh] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold mb-2">
              Strategic Location
            </p>
            <h2
              className="font-[magtis] uppercase font-extrabold text-white tracking-tight leading-[0.9]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)' }}
            >
              Everything<br />
              <span className="text-[#6CAFBF]">Nearby.</span>
            </h2>
          </div>
          <p className="text-white/70 text-sm md:text-base font-medium max-w-sm leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Interactive Proximity Tabs with ALL filter */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {/* ALL Tab */}
          <button
            onClick={() => setActiveProxTab(-1)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              activeProxTab === -1
                ? 'bg-[#6CAFBF] text-black shadow-lg scale-105'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <span>🌟</span>
            <span>ALL</span>
          </button>

          {/* Individual Category Tabs */}
          {proximityData.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveProxTab(idx)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                activeProxTab === idx
                  ? 'bg-[#6CAFBF] text-black shadow-lg scale-105'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Proximity Content */}
        {activeProxTab === -1 ? (
          /* ALL CATEGORIES VIEW: Displays all nearby places */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {proximityData.map((cat) => (
              <div
                key={cat.category}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-6 space-y-4 hover:border-[#6CAFBF]/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h3 className="text-white font-[magtis] uppercase font-bold text-lg tracking-wide">
                    {cat.category}
                  </h3>
                </div>
                <div className="space-y-3">
                  {cat.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between gap-4 border-b border-white/5 pb-2 last:border-none"
                    >
                      <span className="text-white/80 text-sm font-medium">
                        {item.name}
                      </span>
                      <span className="shrink-0 bg-[#6CAFBF] text-black text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-sm">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* SINGLE CATEGORY VIEW */
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-6 md:p-10 max-w-3xl animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{proximityData[activeProxTab].emoji}</span>
              <h3 className="text-white font-[magtis] uppercase font-bold text-xl md:text-2xl tracking-wide">
                {proximityData[activeProxTab].category}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {proximityData[activeProxTab].items.map((item, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"
                >
                  <span className="text-white/80 text-sm md:text-base font-medium">
                    {item.name}
                  </span>
                  <span className="shrink-0 bg-[#6CAFBF] text-black text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NearbySection;
