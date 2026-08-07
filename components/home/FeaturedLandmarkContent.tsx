'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface FeaturedLandmarkContentProps {
  isActive: boolean;
}

export const FeaturedLandmarkContent: React.FC<FeaturedLandmarkContentProps> = ({
  isActive,
}) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/project/4'); // Mayuri Adhinathpuram
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-30 flex flex-col justify-between px-6 md:px-[8vw] py-[10vh] transition-all duration-1000 ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* ── 1. GIANT EDITORIAL WATERMARK TYPOGRAPHY (ARTWORK INTEGRATION) ── */}
      <div className="absolute top-[8vh] left-[4vw] right-[4vw] flex justify-between pointer-events-none select-none overflow-hidden z-0 opacity-15 dark:opacity-10">
        <h1 className="font-serif font-black uppercase text-[10vw] leading-none tracking-tighter text-white whitespace-nowrap">
          ADHINATHPURAM
        </h1>
      </div>

      {/* ── 2. TOP RIGHT: AWWWARDS EDITORIAL QUOTE ──────────────── */}
      <div className="hidden lg:block absolute top-[18vh] right-[8vw] max-w-sm pointer-events-none select-none z-20 text-right">
        <div className="flex items-center justify-end gap-2 mb-2">
          <span className="text-[9px] font-sans font-extrabold tracking-[0.4em] text-[#6CAFBF] dark:text-[#8BC7D8] uppercase">
            Signature Statement
          </span>
          <span className="w-2 h-2 rounded-full bg-[#6CAFBF] animate-ping" />
        </div>
        <blockquote className="font-serif italic text-2xl xl:text-3xl text-white/40 font-bold leading-tight tracking-tight select-none">
          "Some places are built. <br />
          Others are destined to become home."
        </blockquote>
      </div>

      {/* ── 3. LEFT SIDE: EDITORIAL HEADER & EMOTIONAL STORY ─────── */}
      <div className="max-w-[90vw] md:max-w-md pointer-events-auto mt-[16vh] lg:mt-[18vh] z-20">
        {/* Subtle Badge */}
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-[1px] bg-[#6CAFBF]" />
          <span className="font-sans text-[11px] md:text-xs font-bold tracking-[0.4em] text-[#4d8696] dark:text-[#6CAFBF] uppercase select-none">
            Signature Collection
          </span>
        </div>

        {/* Section Heading */}
        <h2
          className="font-serif font-extrabold uppercase leading-[0.95] tracking-tighter text-brand-dark dark:text-white mb-3 select-none"
          style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)' }}
        >
          Featured <span className="text-[#4d8696] dark:text-[#6CAFBF] font-serif">landmarks</span>
        </h2>

        {/* Project Name Presentation */}
        <h3 className="font-serif font-bold uppercase text-xl md:text-2xl tracking-widest text-[#4d8696] dark:text-[#6CAFBF] mb-4 select-none">
          MAYURI ADHINATHPURAM
        </h3>

        {/* Micro-Animated Home Living Editorial Quote */}
        <div className="relative overflow-hidden rounded-r-xl border-l-2 border-[#6CAFBF] pl-4 py-3 my-4 bg-gradient-to-r from-black/40 via-black/10 to-transparent backdrop-blur-sm shadow-xl group">
          <p className="font-sans font-medium text-brand-dark/95 dark:text-white/95 text-xs md:text-sm leading-relaxed italic animate-quote-reveal">
            "A landmark outside. A lifetime of memories inside."
          </p>
          <p className="font-sans text-[10px] text-white/60 mt-1 uppercase tracking-widest not-italic">
            Crafted for families seeking peace, warmth, and enduring legacy.
          </p>
          {/* Micro Animation Shimmer Light Bar */}
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#4d8696] via-[#6CAFBF] to-transparent animate-quote-shimmer" />
        </div>

        {/* ── REFINED PROJECT INVITATION CTA ──────────────────── */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={handleNavigate}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-dark dark:bg-white hover:bg-[#6CAFBF] text-white dark:text-black hover:text-black font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] shadow-2xl cursor-pointer"
          >
            {/* Shimmer Light Effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#6CAFBF]/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <span className="relative z-10">Experience The Architecture</span>
            
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── 4. RIGHT SIDE: CARD-FREE ARCHITECTURAL DETAILS ──────── */}
      <div className="self-end md:self-auto md:absolute md:bottom-[12vh] md:right-[8vw] z-35 w-[85vw] md:w-[22vw] pointer-events-auto">
        <div className="flex flex-col gap-3 text-white border-l-2 border-[#6CAFBF]/60 pl-5 py-2 backdrop-blur-md bg-black/30 rounded-r-xl">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-[#6CAFBF] dark:text-[#8BC7D8] uppercase">
              // Landmark Specs
            </span>
            <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">
              Delivered
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-sans text-white/50 font-bold uppercase tracking-wider">
                Location
              </span>
              <span className="text-[11px] font-semibold text-white/90">
                Pune • Maharashtra
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-sans text-white/50 font-bold uppercase tracking-wider">
                Scale
              </span>
              <span className="text-[11px] font-semibold text-white/90">
                300+ Bespoke Units
              </span>
            </div>
          </div>

          <button
            onClick={handleNavigate}
            className="mt-1 flex items-center gap-2 text-[10px] font-sans font-bold text-[#6CAFBF] dark:text-[#8BC7D8] uppercase tracking-widest hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span>Explore Landmark Specs</span>
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* Micro Animation CSS keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes quoteShimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            .animate-quote-shimmer {
              animation: quoteShimmer 4s ease-in-out infinite;
            }

            @keyframes quoteReveal {
              0% { opacity: 0; transform: translateY(12px); filter: blur(4px); }
              100% { opacity: 1; transform: translateY(0); filter: blur(0); }
            }
            .animate-quote-reveal {
              animation: quoteReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `,
        }}
      />
    </div>
  );
};
