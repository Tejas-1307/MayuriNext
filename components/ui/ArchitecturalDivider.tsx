'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ArchitecturalDivider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const pulseDotRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        if (svgPathRef.current) {
          gsap.set(svgPathRef.current, { strokeDashoffset: 0 });
        }
        if (labelRef.current) {
          gsap.set(labelRef.current, { opacity: 1, y: 0 });
        }
        return;
      }

      // Path Drawing Animation
      if (svgPathRef.current) {
        const length = svgPathRef.current.getTotalLength();
        gsap.set(svgPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(svgPathRef.current, {
          strokeDashoffset: 0,
          duration: 2.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        });
      }

      // Traveling Cyan Dot Animation along the path
      if (pulseDotRef.current && svgPathRef.current) {
        const length = svgPathRef.current.getTotalLength();
        const obj = { val: 0 };

        gsap.to(obj, {
          val: length,
          duration: 2.4,
          ease: 'power2.out',
          onUpdate: () => {
            if (svgPathRef.current && pulseDotRef.current) {
              const pt = svgPathRef.current.getPointAtLength(obj.val);
              pulseDotRef.current.setAttribute('cx', String(pt.x));
              pulseDotRef.current.setAttribute('cy', String(pt.y));
            }
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        });
      }

      // Typography Fade Up
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, containerRef);

    // Subtle Mouse Parallax on Desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768 || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(containerRef.current.querySelectorAll('.parallax-layer'), {
        x: relX * 6,
        y: relY * 4,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      ctx.revert();
      if (containerEl) {
        containerEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Architectural Transition"
      className="w-full relative overflow-hidden bg-[#F5F5F0] dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-1000 select-none flex flex-col items-center justify-center h-[140px] sm:h-[180px] md:h-[250px]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-15 flex justify-between px-[10vw]">
        <div className="w-[1px] h-full bg-black dark:bg-white" />
        <div className="w-[1px] h-full bg-black dark:bg-white" />
        <div className="w-[1px] h-full bg-black dark:bg-white" />
      </div>

      {/* SVG Architectural Blueprint Line Artwork */}
      <div className="parallax-layer relative w-[90vw] max-w-4xl h-[80px] sm:h-[100px] md:h-[120px] flex items-center justify-center">
        <svg
          viewBox="0 0 800 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          {/* Subtle Grid Ticks (+) */}
          <g opacity="0.4" stroke="currentColor" strokeWidth="1" className="text-black/30 dark:text-white/30">
            <path d="M 50 20 L 50 30 M 45 25 L 55 25" />
            <path d="M 750 20 L 750 30 M 745 25 L 755 25" />
            <path d="M 400 10 L 400 20 M 395 15 L 405 15" />
            <path d="M 50 100 L 50 110 M 45 105 L 55 105" />
            <path d="M 750 100 L 750 110 M 745 105 L 755 105" />
          </g>

          {/* Guide Baseline */}
          <line
            x1="40"
            y1="60"
            x2="760"
            y2="60"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
            className="text-black/15 dark:text-white/15"
          />

          {/* Main Animated Blueprint Structure Path */}
          <path
            ref={svgPathRef}
            d="M 60 60 L 200 60 L 260 25 L 340 25 L 400 60 L 460 25 L 540 25 L 600 60 L 740 60"
            stroke="#6CAFBF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(108,175,191,0.5)]"
          />

          {/* Traveling Cyan Pulse Dot */}
          <circle
            ref={pulseDotRef}
            cx="60"
            cy="60"
            r="4"
            fill="#6CAFBF"
            className="drop-shadow-[0_0_10px_#6CAFBF]"
          />
        </svg>

        {/* Blueprint Coordinates Badge */}
        <div className="absolute top-2 left-6 hidden sm:flex items-center gap-2 font-mono text-[9px] text-black/40 dark:text-white/40 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF] animate-ping" />
          <span>[ 18°27'48"N · 73°52'14"E ]</span>
        </div>

        <div className="absolute bottom-2 right-6 hidden sm:block font-mono text-[9px] text-black/40 dark:text-white/40 tracking-widest uppercase">
          <span>ELEVATION 560M // ARCH-01</span>
        </div>
      </div>

      {/* Subtle Typography Statement */}
      <div
        ref={labelRef}
        className="parallax-layer mt-2 sm:mt-4 flex items-center gap-3 text-black/70 dark:text-white/70"
      >
        <span className="w-4 sm:w-8 h-[1px] bg-[#6CAFBF]" />
        <span className="font-sans font-bold text-[10px] sm:text-xs tracking-[0.35em] uppercase text-black/80 dark:text-white/80">
          Crafted With Purpose
        </span>
        <span className="w-4 sm:w-8 h-[1px] bg-[#6CAFBF]" />
      </div>
    </section>
  );
};

export default ArchitecturalDivider;
