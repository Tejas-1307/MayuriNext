'use client';

import React from 'react';

interface FeaturedLandmarkHeroProps {
  isActive: boolean;
  mousePos: { x: number; y: number };
  onExplore: () => void;
}

export const FeaturedLandmarkHero: React.FC<FeaturedLandmarkHeroProps> = ({
  isActive,
  mousePos,
  onExplore,
}) => {
  // Smooth mouse tilt math: Max 2 deg rotation, Max 8px translate
  const tiltX = -mousePos.y * 2; // pitch rotation
  const tiltY = mousePos.x * 2; // yaw rotation
  const translateX = mousePos.x * 8;
  const translateY = mousePos.y * 5;

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-10 flex items-center justify-center transition-opacity duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ── 1. CINEMATIC ATMOSPHERIC SKY & GOLDEN HOUR BACKDROP ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Golden Sunset Sky Gradient */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(ellipse 90% 60% at 75% 20%, 
                rgba(245, 180, 100, 0.35) 0%, 
                rgba(180, 110, 50, 0.20) 45%, 
                rgba(15, 12, 10, 0.95) 85%
              ),
              linear-gradient(to bottom, 
                #0a0807 0%, 
                #18120e 40%, 
                #231913 70%, 
                #0d0a08 100%
              )
            `,
          }}
        />

        {/* Distant Architectural Skyline Silhouette */}
        <div
          className="absolute bottom-[20%] left-0 right-0 h-[35vh] opacity-25"
          style={{
            backgroundImage: `url('/images/services/Home_Mayuri2.png')`,
            backgroundPosition: 'center bottom',
            backgroundSize: 'cover',
            filter: 'brightness(0.2) contrast(1.4) sepia(0.5) hue-rotate(-20deg)',
            maskImage:
              'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
          }}
        />

        {/* Drifting Golden Clouds Layer */}
        <div className="absolute top-[5%] -left-[10%] w-[120%] h-[40%] opacity-30 mix-blend-screen animate-cloud-drift pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#ffd59e]/20 to-transparent blur-3xl" />
        </div>

        {/* Environmental Life: Birds Crossing Upper Sky */}
        <div className="absolute top-[18%] left-[10%] w-full h-[100px] pointer-events-none overflow-hidden opacity-40 animate-birds-flight">
          <svg className="w-16 h-8 text-[#ffd59e]" viewBox="0 0 100 50" fill="currentColor">
            <path d="M0 20 Q 25 5 50 20 Q 75 5 100 20 Q 75 12 50 25 Q 25 12 0 20 Z" />
          </svg>
        </div>
      </div>

      {/* ── 2. ARCHITECTURAL HERO STAGING CONTAINER ──────────── */}
      <div
        className="relative z-10 w-full max-w-[1400px] h-full flex items-end justify-center pb-[5vh] md:pb-[8vh] pointer-events-auto cursor-pointer group"
        onClick={onExplore}
      >
        {/* Parallax & 3D Tilt Wrapper */}
        <div
          className="relative w-[85vw] sm:w-[60vw] md:w-[42vw] lg:w-[32vw] h-[65vh] md:h-[78vh] transition-transform duration-700 ease-out flex flex-col items-center justify-end"
          style={{
            transform: `perspective(1200px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformOrigin: 'center bottom',
            willChange: 'transform',
          }}
        >
          {/* Ambient Rim Lighting Glow Behind Building */}
          <div
            className="absolute inset-0 rounded-full blur-[80px] opacity-40 group-hover:opacity-70 transition-opacity duration-1000 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 60% 30%, #6CAFBF 0%, #4d8696 40%, transparent 70%)',
            }}
          />

          {/* Directional Sunlight Beam Highlight */}
          <div
            className="absolute -top-[10%] right-[-15%] w-[140%] h-[120%] pointer-events-none opacity-40 mix-blend-color-dodge transition-opacity duration-700"
            style={{
              background: 'linear-gradient(135deg, rgba(140,210,230,0.3) 0%, transparent 60%)',
              maskImage: 'linear-gradient(to bottom, black 20%, transparent 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 90%)',
            }}
          />

          {/* ── PRIMARY HERO BUILDING IMAGE (`building_1.png`) ── */}
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Architectural Blueprint Annotation 1 */}
            <div className="hidden xl:flex absolute top-[12%] left-[-10%] items-center gap-2 pointer-events-none opacity-80 transition-opacity duration-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF] animate-ping" />
              <span className="w-10 h-[1px] bg-[#6CAFBF]/60" />
              <span className="font-mono text-[9px] text-[#6CAFBF] dark:text-[#8BC7D8] tracking-[0.3em] uppercase">
                // ARCHITECTURAL PEAK • 300+ RESIDENCES
              </span>
            </div>

            {/* Architectural Blueprint Annotation 2 */}
            <div className="hidden xl:flex absolute top-[44%] right-[-12%] items-center gap-2 pointer-events-none opacity-80 transition-opacity duration-700">
              <span className="font-mono text-[9px] text-[#6CAFBF] dark:text-[#8BC7D8] tracking-[0.3em] uppercase">
                GLASS BLOOM FAÇADE //
              </span>
              <span className="w-10 h-[1px] bg-[#6CAFBF]/60" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF]" />
            </div>

            {/* Architectural Blueprint Annotation 3 */}
            <div className="hidden xl:flex absolute bottom-[18%] left-[-8%] items-center gap-2 pointer-events-none opacity-80 transition-opacity duration-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF]" />
              <span className="w-10 h-[1px] bg-[#6CAFBF]/60" />
              <span className="font-mono text-[9px] text-[#6CAFBF] dark:text-[#8BC7D8] tracking-[0.3em] uppercase">
                // 18°31'N 73°51'E • PUNE LANDMARK
              </span>
            </div>

            <img
              src="/assets/BG_Images/building_1.png"
              alt="Mayuri Adhinathpuram Architectural Landmark"
              className="w-full h-full object-contain object-bottom select-none transition-all duration-700"
              style={{
                filter: `
                  drop-shadow(0 25px 35px rgba(0, 0, 0, 0.85))
                  drop-shadow(0 0 45px rgba(108, 175, 191, 0.3))
                  contrast(1.08)
                  saturate(1.1)
                `,
              }}
            />


            {/* Subtle Glass Bloom Shimmer */}
            <div className="absolute top-[15%] right-[22%] w-[35%] h-[40%] bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -rotate-12 pointer-events-none blur-[4px]" />

            {/* Hover Floating Invitation Tag */}
            <div className="absolute top-[22%] -right-[5vw] hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-[#6CAFBF]/30 text-white text-[10px] font-sans font-bold tracking-widest uppercase shadow-2xl opacity-0 group-hover:opacity-100 group-hover:translate-y-[-8px] transition-all duration-500 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#6CAFBF] animate-ping" />
              Mayuri Adhinathpuram Specs
            </div>
          </div>

          {/* ── ARCHITECTURAL GROUND STAGING ───────────────────── */}

          {/* 1. Base Soft Contact Shadow */}
          <div
            className="absolute -bottom-3 left-[5%] right-[5%] h-[24px] rounded-[100%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 80%)',
              filter: 'blur(8px)',
            }}
          />

          {/* 2. Ground Ambient Occlusion */}
          <div
            className="absolute -bottom-6 left-0 right-0 h-[40px]"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* ── 3. REFLECTIVE ARCHITECTURAL PLAZA FLOOR & REFLECTION ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[22vh] z-20 pointer-events-none overflow-hidden"
        style={{
          background: `
            linear-gradient(to top, 
              rgba(10, 15, 20, 0.98) 0%, 
              rgba(15, 25, 35, 0.85) 45%, 
              rgba(20, 35, 50, 0.20) 85%, 
              transparent 100%
            )
          `,
        }}
      >
        {/* Subtle Wet Marble Plaza Reflection of the Building */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[45vw] h-full opacity-25 scale-y-[-1] pointer-events-none blur-[4px]"
          style={{
            backgroundImage: `url('/assets/BG_Images/building_1.png')`,
            backgroundPosition: 'center bottom',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
          }}
        />

        {/* Polished Architectural Plaza Horizon Accent Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#f5b464]/40 to-transparent absolute top-0" />
      </div>

      {/* ── 4. FOREGROUND BIOPHILIC LANDSCAPING (`FrontBG.png`) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[26vh] z-30 pointer-events-none overflow-hidden">
        <img
          src="/assets/BG_Images/FrontBG.png"
          alt="Foreground Biophilic Landscaping & Shrubbery"
          className="w-full h-full object-cover object-top select-none opacity-90 transition-transform duration-1000 ease-out"
          style={{
            maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 90%)',
            filter: 'brightness(0.7) contrast(1.1)',
            transform: `translateY(${mousePos.y * -4}px)`,
          }}
        />
      </div>

      {/* Global CSS keyframes for environment micro-life */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes cloudDrift {
              0% { transform: translateX(0); }
              50% { transform: translateX(4%); }
              100% { transform: translateX(0); }
            }
            .animate-cloud-drift {
              animation: cloudDrift 30s ease-in-out infinite;
            }

            @keyframes birdsFlight {
              0% { transform: translateX(-10vw) translateY(0); opacity: 0; }
              20% { opacity: 0.5; }
              80% { opacity: 0.5; }
              100% { transform: translateX(110vw) translateY(-40px); opacity: 0; }
            }
            .animate-birds-flight {
              animation: birdsFlight 45s linear infinite;
              animation-delay: 4s;
            }

            @keyframes windowPulse {
              0%, 100% { opacity: 0.65; filter: blur(1.5px); }
              50% { opacity: 0.95; filter: blur(1px); }
            }
            .animate-window-pulse {
              animation: windowPulse 4s ease-in-out infinite;
            }
          `,
        }}
      />
    </div>
  );
};
