'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

// Local asset paths
const building1 = '/assets/BG_Images/building_1.png';
const building2 = '/assets/BG_Images/building_2.png';
const building3 = '/assets/BG_Images/building_3.png';
const building5 = '/assets/BG_Images/building_5.png';
const frontBG = '/assets/BG_Images/FrontBG.png';

export interface TowerItem {
  id: number;
  name: string;
  type: string;
  scale: string;
  location: string;
  status: string;
  img: string;
  bottom: string;
  left: string;
  height: string;
  width: string;
  zIndex: number;
  depthLayer: 'foreground' | 'middle' | 'background';
  delay: number;
}

const towersData: TowerItem[] = [
  {
    id: 4,
    name: 'Mayuri Adhinathpuram',
    type: 'Residential Township',
    scale: '300+ Units',
    location: 'Pune, Maharashtra',
    status: 'Delivered • 2023',
    img: building1,
    bottom: '10%',
    left: '-6%',
    height: '52%',
    width: '50%',
    zIndex: 10,
    depthLayer: 'background',
    delay: 0.5,
  },
  {
    id: 5,
    name: 'Mayuri Optimum Phase 2',
    type: 'Mixed-Use Development',
    scale: '150+ Units',
    location: 'Pune, Maharashtra',
    status: 'Under Construction',
    img: building2,
    bottom: '10%',
    left: '12%',
    height: '72%',
    width: '62%',
    zIndex: 20,
    depthLayer: 'middle',
    delay: 0.3,
  },
  {
    id: 1,
    name: 'Mayuri Infinity',
    type: 'Residential Complex',
    scale: '120+ Units',
    location: 'Pune, Maharashtra',
    status: 'Ready to Move',
    img: building3,
    bottom: '10%',
    left: '52%',
    height: '82%',
    width: '18%',
    zIndex: 30,
    depthLayer: 'foreground',
    delay: 0.1,
  },
  {
    id: 6,
    name: 'Mayuri Elite',
    type: 'Luxury Villas',
    scale: '60+ Villas',
    location: 'Pune, Maharashtra',
    status: 'Bespoke Collection',
    img: building5,
    bottom: '10%',
    left: '54%',
    height: '45%',
    width: '48%',
    zIndex: 18,
    depthLayer: 'middle',
    delay: 0.45,
  },
];

const Home: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [hoveredTower, setHoveredTower] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 7500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slideKey]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setSlideKey((prev) => prev + 1);
    setHoveredTower(null);
  };

  // Mouse move tracking for 3D depth parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (currentSlide !== 2) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [currentSlide]);

  // GSAP Animations on slide change
  useEffect(() => {
    if (currentSlide === 2) {
      gsap.to('.landmarks-bg', {
        opacity: 1,
        duration: 2.5,
        ease: 'sine.inOut',
      });

      towersData.forEach((tower, idx) => {
        gsap.fromTo(
          `.tower-rise-${idx}`,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 2.2,
            ease: 'power3.out',
            delay: tower.delay + 0.6,
          }
        );
      });

      gsap.fromTo(
        '.front-entrance',
        { yPercent: 80, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 2.5,
          ease: 'power3.out',
          delay: 1.2,
        }
      );
    } else {
      gsap.to('.landmarks-bg', {
        opacity: 0,
        duration: 1.8,
        ease: 'sine.inOut',
      });

      towersData.forEach((_, idx) => {
        gsap.set(`.tower-rise-${idx}`, { yPercent: 110, opacity: 0 });
      });

      gsap.set('.front-entrance', { yPercent: 80, opacity: 0 });
    }
  }, [currentSlide]);

  // Counter animation on slide 2
  useEffect(() => {
    if (currentSlide === 1) {
      const counters = document.querySelectorAll('.slide-counter');
      counters.forEach((counter) => {
        const targetVal = parseInt(
          counter.getAttribute('data-target') || '0',
          10
        );
        const formatType = counter.getAttribute('data-format');

        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: targetVal,
            duration: 2.5,
            snap: { textContent: 1 },
            ease: 'power2.out',
            onUpdate: function () {
              const currentVal = Math.floor(
                parseFloat(counter.textContent || '0')
              );
              if (formatType === 'million') {
                (counter as HTMLElement).innerText = currentVal + '+';
              } else if (formatType === 'comma') {
                (counter as HTMLElement).innerText =
                  currentVal.toLocaleString() + '+';
              } else {
                (counter as HTMLElement).innerText = currentVal + '+';
              }
            },
          }
        );
      });
    }
  }, [currentSlide]);

  const scrollToProjects = () => {
    const el = document.getElementById('section-projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Helper for Z-depth parallax calculation
  const getParallaxStyle = (depth: 'foreground' | 'middle' | 'background', isHovered: boolean) => {
    let mult = 4;
    if (depth === 'foreground') mult = 14;
    else if (depth === 'middle') mult = 8;
    else mult = 3;

    const px = mousePos.x * mult;
    const py = mousePos.y * (mult * 0.5);

    const translateY = isHovered ? -12 : 0;
    const scale = isHovered ? 1.02 : 1;
    const rotate = isHovered ? 0.8 : 0;

    return {
      transform: `translate3d(${px}px, ${py + translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
      transformOrigin: 'bottom center',
      willChange: 'transform, filter',
    };
  };

  return (
    <div className="relative w-full h-[95vh] md:h-screen bg-brand-bg overflow-hidden select-none">
      {/* ── BACKGROUND CITYSCAPE IMAGE (Slide 1 & 2) ─────────── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <img
          src="/images/services/HomeBG_Mayuri.png"
          alt="Pune Cityscape Sunset Background"
          className="hero-bg-zoom w-full h-full object-cover select-none"
        />
      </div>

      {/* ── LANDMARKS BACKGROUND (Cross-fades in on Slide 3) ── */}
      <div
        className="landmarks-bg absolute inset-0 w-full h-full z-[1] pointer-events-none overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/services/Home_Mayuri2.png"
          alt="Landmarks Cityscape Background"
          className="landmarks-bg-zoom w-full h-full object-cover select-none brightness-95"
        />
        {/* Soft Evening Distance Fog */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* ── REFLECTIVE ARCHITECTURAL GROUND PLANE ────────────── */}
      <div
        className="landmarks-ground absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        style={{
          height: '22%',
          opacity: currentSlide === 2 ? 1 : 0,
          transition: 'opacity 2s ease',
          background: `
            linear-gradient(to top, 
              rgba(15, 12, 10, 0.85) 0%, 
              rgba(25, 20, 15, 0.5) 40%, 
              rgba(40, 30, 20, 0.15) 75%, 
              transparent 100%
            )
          `,
        }}
      >
        {/* Reflective Ground Floor Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#6CAFBF]/30 to-transparent absolute top-0" />
      </div>

      {/* ── 3D DEPTH LANDMARKS EXHIBITION (SLIDE 3 ONLY) ─────── */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-[1000ms] ${
          currentSlide === 2
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="absolute inset-0">
            {towersData.map((tower, idx) => {
              const isHovered = hoveredTower === idx;
              const isOtherHovered = hoveredTower !== null && hoveredTower !== idx;

              return (
                <div
                  key={tower.id}
                  className={`tower-rise-${idx} absolute pointer-events-auto cursor-pointer transition-all duration-500`}
                  style={{
                    bottom: tower.bottom,
                    left: tower.left,
                    height: tower.height,
                    width: tower.width,
                    zIndex: isHovered ? 40 : tower.zIndex,
                  }}
                  onMouseEnter={() => setHoveredTower(idx)}
                  onMouseLeave={() => setHoveredTower(null)}
                  onClick={() => router.push(`/project/${tower.id}`)}
                >
                  {/* Building Image Container with 3D Depth & Shadow */}
                  <div
                    className="relative w-full h-full transition-transform duration-700 ease-out"
                    style={getParallaxStyle(tower.depthLayer, isHovered)}
                  >
                    <img
                      src={tower.img}
                      alt={tower.name}
                      className="w-full h-full object-contain object-bottom select-none transition-all duration-700"
                      style={{
                        filter: isHovered
                          ? 'drop-shadow(0 0 30px rgba(108,175,191,0.6)) drop-shadow(0 20px 35px rgba(0,0,0,0.8)) brightness(1.08) saturate(1.1)'
                          : isOtherHovered
                          ? 'brightness(0.55) saturate(0.6) blur(0.5px)'
                          : 'drop-shadow(0 15px 30px rgba(0,0,0,0.5)) brightness(0.95) saturate(1.05)',
                      }}
                    />

                    {/* Architectural Base Pedestal Shadow */}
                    <div className="absolute bottom-0 left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-transparent via-[#6CAFBF]/40 to-transparent blur-[2px]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FOREGROUND LANDSCAPING ENTRANCE (FrontBG) ────────── */}
      <div
        className="front-entrance absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '35%',
          zIndex: 12,
          opacity: currentSlide === 2 ? 1 : 0,
          transform: currentSlide === 2 ? 'translateY(0)' : 'translateY(30%)',
          transition:
            'opacity 2s ease, transform 2.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: currentSlide === 2 ? '1.2s' : '0s',
        }}
      >
        <img
          src={frontBG}
          alt="Building Entrance Landscaping"
          className="w-full h-full object-cover object-top select-none z-20"
          style={{
            maskImage:
              'linear-gradient(to top, black 0%, black 40%, transparent 85%)',
            WebkitMaskImage:
              'linear-gradient(to top, black 0%, black 40%, transparent 85%)',
          }}
        />
      </div>

      {/* ── SLIDES CONTENT CONTAINER ─────────────────────────── */}
      <div className="relative z-30 w-full h-full flex items-center justify-center">
        {/* ── SLIDE 1: ASSURANCE OF QUALITY LIFE ───────────────── */}
        <div
          className={`absolute inset-0 flex items-center px-6 md:px-[8vw] transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            currentSlide === 0
              ? 'opacity-100 translate-y-0 pointer-events-auto active'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="max-w-[90vw] md:max-w-[65vw] text-left">
            <span className="slide-content-enter font-sans text-xs md:text-sm font-bold tracking-[0.4em] text-brand-dark/70 uppercase">
              Welcome to Mayuri Landmarks
            </span>

            <h1
              className="slide-content-enter font-serif font-extrabold uppercase leading-[0.95] tracking-tighter text-brand-dark mt-4 mb-6 select-none"
              style={{ fontSize: 'clamp(2.4rem, 7.5vw, 6.8rem)' }}
            >
              <div className="block text-brand-dark">Assurance of</div>
              <div className="block text-[#4d8696] font-bold mt-2 tracking-wide font-serif">
                Quality Life
              </div>
            </h1>

            <div className="slide-content-enter max-w-xl border-l-2 border-[#8BC7D8] pl-5 mt-8 space-y-4">
              <p className="font-sans font-semibold text-brand-dark/90 text-sm md:text-lg leading-relaxed">
                Building exceptional communities and premium living experiences across Pune, crafting legacies of architectural distinction and trust.
              </p>
              <p className="font-sans font-medium text-brand-dark/70 text-xs md:text-sm leading-relaxed italic">
                "Mayuri Landmarks LLP born with a purpose to build projects that breathe life into the dreams of their customers."
              </p>
            </div>

            <div className="slide-content-enter mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToProjects}
                className="px-8 py-4 bg-brand-dark hover:bg-[#8BC7D8] text-white hover:text-black font-sans font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-[1.03] shadow-lg cursor-pointer"
              >
                Explore Projects
              </button>
              <button
                onClick={() => goToSlide(1)}
                className="px-8 py-4 border border-brand-dark/30 hover:border-brand-dark text-brand-dark font-sans font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-brand-dark hover:text-white hover:scale-[1.03] cursor-pointer"
              >
                Our Legacy
              </button>
            </div>
          </div>
        </div>

        {/* ── SLIDE 2: 15+ YEARS & STATISTICS ──────────────────── */}
        <div
          className={`absolute inset-0 flex items-center px-6 md:px-[8vw] transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            currentSlide === 1
              ? 'opacity-100 translate-y-0 pointer-events-auto active'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="max-w-[90vw] md:max-w-[80vw] w-full text-left">
            <span className="slide-content-enter font-sans text-xs md:text-sm font-bold tracking-[0.4em] text-brand-dark/70 uppercase">
              Established Excellence
            </span>

            <h2
              className="slide-content-enter font-serif font-extrabold uppercase leading-[0.95] tracking-tighter text-brand-dark mt-4 mb-6 select-none"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)' }}
            >
              <div>08+ Years And</div>
              <div className="text-[#4d8696] font-bold mt-2 tracking-wide font-serif">
                still growing
              </div>
            </h2>

            <p className="slide-content-enter font-sans font-semibold text-brand-dark/95 text-sm md:text-lg max-w-xl leading-relaxed mb-10">
              Shaping Pune's modern skyline through visionary planning, uncompromising structural engineering, and values rooted in client relationships.
            </p>

            <div className="slide-content-enter grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-4xl border-t border-brand-dark/20 pt-10">
              <div className="flex flex-col gap-2">
                <span
                  data-target="10"
                  data-format="million"
                  className="slide-counter font-serif text-4xl md:text-6xl font-black text-brand-dark leading-none"
                >
                  10+
                </span>
                <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.15em] text-brand-dark/50 uppercase">
                  Mn Sq. Ft Developed
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span
                  data-target="1500"
                  data-format="comma"
                  className="slide-counter font-serif text-4xl md:text-6xl font-black text-brand-dark leading-none"
                >
                  1500+
                </span>
                <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.15em] text-brand-dark/50 uppercase">
                  Happy Families
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span
                  data-target="6"
                  data-format="none"
                  className="slide-counter font-serif text-4xl md:text-6xl font-black text-brand-dark leading-none"
                >
                  06+
                </span>
                <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.15em] text-brand-dark/50 uppercase">
                  Projects Delivered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SLIDE 3: FEATURED LANDMARKS (EDITORIAL 3D SKYLINE) ── */}
        <div
          className={`absolute inset-0 flex items-center px-6 md:px-[8vw] transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
            currentSlide === 2
              ? 'opacity-100 translate-y-0 pointer-events-auto active'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          {/* Left Side: Header & Magazine Layout Typography */}
          <div className="absolute top-[12vh] left-[6vw] md:left-[8vw] z-30 max-w-[85vw] md:max-w-sm">
            <span className="font-sans text-xs md:text-sm font-bold tracking-[0.4em] text-brand-dark/70 uppercase">
              Signature Collection
            </span>

            <h1 className="hidden lg:block text-[9.5rem] text-[#4d8696]/20 dark:text-[#6CAFBF]/20 font-bold font-['Magtis'] absolute bottom-[-32rem] tracking-tighter z-[5] pointer-events-none">
              MAYURILANDMARKS
            </h1>
            <h2
              className="font-serif font-extrabold uppercase leading-[0.95] tracking-tighter text-brand-dark mt-2 mb-3 select-none"
              style={{ fontSize: 'clamp(2.0rem, 4.5vw, 3.8rem)' }}
            >
              Featured <span className="text-[#4d8696] font-bold font-serif">landmarks</span>
            </h2>

            <p className="font-sans font-semibold text-brand-dark/70 text-xs md:text-sm leading-relaxed max-w-[280px]">
              Move cursor to explore 3D architectural depth. Hover over any tower for project details.
            </p>
          </div>

          {/* Right Side: Architectural Floating Card */}
          <div className="absolute top-[12vh] right-[6vw] md:right-[8vw] z-35 w-[85vw] md:w-[28vw] transition-all duration-500">
            <div
              className={`p-6 rounded-2xl bg-white/95 dark:bg-[#0f0f0f]/95 border border-brand-dark/15 dark:border-white/15 shadow-2xl backdrop-blur-xl transition-all duration-[600ms] ease-out ${
                hoveredTower !== null
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
              }`}
            >
              {hoveredTower !== null && (
                <div className="flex flex-col gap-4 text-brand-dark dark:text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-sans font-bold tracking-[0.2em] text-[#6CAFBF] uppercase">
                      {towersData[hoveredTower].type}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#6CAFBF]/10 text-[#6CAFBF] border border-[#6CAFBF]/30">
                      {towersData[hoveredTower].status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg md:text-xl font-bold uppercase leading-tight select-none">
                    {towersData[hoveredTower].name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 border-t border-brand-dark/10 dark:border-white/10 pt-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-sans text-brand-dark/40 dark:text-white/40 font-bold uppercase tracking-wider">
                        Location
                      </span>
                      <span className="text-[11px] font-semibold">
                        {towersData[hoveredTower].location}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] font-sans text-brand-dark/40 dark:text-white/40 font-bold uppercase tracking-wider">
                        Scale
                      </span>
                      <span className="text-[11px] font-semibold">
                        {towersData[hoveredTower].scale}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/project/${towersData[hoveredTower].id}`)
                    }
                    className="mt-2 flex items-center justify-center gap-2 bg-brand-dark dark:bg-white hover:bg-[#6CAFBF] text-white dark:text-black hover:text-black py-3 rounded-full font-sans font-bold text-[9px] uppercase tracking-widest transition-all duration-300 w-full cursor-pointer shadow-md"
                  >
                    Explore Landmark Specs
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="-rotate-45"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM TABS & NAVIGATION CONTROLS ─────────────────── */}
      <div className="absolute bottom-10 left-0 w-full px-6 md:px-[8vw] z-40 flex items-center justify-between border-t border-brand-dark/15 pt-6 text-brand-dark">
        {/* Left Side: Slide Indicators */}
        <div className="flex items-center gap-6 md:gap-12">
          {[
            { id: 0, num: '01', title: 'Assurance' },
            { id: 1, num: '02', title: 'Legacy' },
            { id: 2, num: '03', title: 'Landmarks' },
          ].map((tab) => {
            const isActive = currentSlide === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => goToSlide(tab.id)}
                className="group flex flex-col gap-2 cursor-pointer text-left focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] md:text-xs font-mono transition-colors duration-300 ${
                      isActive
                        ? 'text-brand-dark font-extrabold'
                        : 'text-brand-dark/40 group-hover:text-brand-dark/70'
                    }`}
                  >
                    {tab.num}
                  </span>
                  <span
                    className={`text-[10px] md:text-xs font-sans font-bold uppercase tracking-wider hidden md:inline transition-colors duration-300 ${
                      isActive
                        ? 'text-brand-dark font-extrabold'
                        : 'text-brand-dark/30 group-hover:text-brand-dark/60'
                    }`}
                  >
                    {tab.title}
                  </span>
                </div>
                <div className="w-[18vw] md:w-[12vw] h-[2px] bg-brand-dark/10 relative overflow-hidden rounded-full">
                  <div
                    key={`${tab.id}-${slideKey}`}
                    className={`absolute top-0 left-0 h-full bg-[#8BC7D8] rounded-full ${
                      isActive
                        ? 'active-progress-bar'
                        : currentSlide > tab.id
                        ? 'w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Prev / Next Slide Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToSlide((currentSlide - 1 + 3) % 3)}
            className="w-10 h-10 border border-brand-dark/20 hover:border-[#8BC7D8] rounded-full flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Previous Slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentSlide + 1) % 3)}
            className="w-10 h-10 border border-brand-dark/20 hover:border-[#8BC7D8] rounded-full flex items-center justify-center text-brand-dark/50 hover:text-brand-dark hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Next Slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .slide-content-enter {
          transform: translateY(24px);
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease;
        }
        .active .slide-content-enter {
          transform: translateY(0);
          opacity: 1;
        }
        .active .slide-content-enter:nth-child(1) { transition-delay: 0.1s; }
        .active .slide-content-enter:nth-child(2) { transition-delay: 0.25s; }
        .active .slide-content-enter:nth-child(3) { transition-delay: 0.4s; }
        .active .slide-content-enter:nth-child(4) { transition-delay: 0.55s; }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .active-progress-bar {
          animation: progressFill 7.5s linear forwards;
        }

        @keyframes heroBgZoom {
          0%   { transform: scale(1) translate(0, 0); }
          50%  { transform: scale(1.12) translate(-1%, -1%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        .hero-bg-zoom {
          animation: heroBgZoom 25s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes landmarksBgZoom {
          0%   { transform: scale(1.05) translate(0, 0); }
          50%  { transform: scale(1.18) translate(-1.5%, -0.5%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .landmarks-bg-zoom {
          animation: landmarksBgZoom 30s ease-in-out infinite;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .tower-rise-0 {
            height: 40% !important;
            width: 50% !important;
            left: -5% !important;
          }
          .tower-rise-1 {
            height: 58% !important;
            width: 40% !important;
            left: 10% !important;
          }
          .tower-rise-2 {
            height: 68% !important;
            width: 35% !important;
            left: 30% !important;
          }
          .tower-rise-3 {
            height: 40% !important;
            width: 48% !important;
            left: 42% !important;
          }
        }
      `,
        }}
      />
    </div>
  );
};

export default Home;
