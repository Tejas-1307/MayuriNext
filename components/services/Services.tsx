'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services, ServiceItem } from '@/lib/servicesData';
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  ShieldCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Services: React.FC = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const activeService: ServiceItem = services[activeIndex];
  const displayedService: ServiceItem =
    hoverIndex !== null ? services[hoverIndex] : activeService;

  const handleSelectService = (index: number) => {
    startTransition(() => {
      setActiveIndex(index);
      setExpandedDetails(false);
    });
  };

  // GSAP Choreographed Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const titleElements = headlineRef.current.querySelectorAll('.service-headline-anim');
        gsap.fromTo(
          titleElements,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Soft cross-dissolve animation when active image changes
  useEffect(() => {
    if (!mediaContainerRef.current) return;
    gsap.fromTo(
      mediaContainerRef.current,
      { opacity: 0.7, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, [activeIndex, hoverIndex]);

  return (
    <section
      ref={sectionRef}
      id="section-services"
      className="w-full bg-[#F5F5F0] dark:bg-[#080808] text-black dark:text-white transition-colors duration-1000 overflow-hidden relative select-none py-16 lg:py-20"
    >
      {/* Subtle Architectural Blueprint Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20 dark:opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(108,175,191,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,175,191,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-[6vw]">
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div ref={headlineRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="service-headline-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6CAFBF]/10 text-[#6CAFBF] text-xs font-bold uppercase tracking-[0.25em] mb-3 border border-[#6CAFBF]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>What We Offer</span>
            </div>
            <h2 className="service-headline-anim font-[magtis] uppercase font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-black dark:text-white">
              OUR <span className="text-[#6CAFBF]">SERVICES</span>
            </h2>
          </div>

          <div className="service-headline-anim max-w-md">
            <p className="text-black/70 dark:text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              We believe every space deserves precision, structure, and soul. Our specialized services span the entire lifecycle of your residential or commercial dream vision.
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 mb-10" />

        {/* ── COMPACT SINGLE-VIEWPORT SHOWCASE (2-COLUMN SPLIT) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* ══ LEFT PANEL: ARCHITECTURAL MEDIA CONTAINER (5 COLS) ══ */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              ref={mediaContainerRef}
              className="group relative w-full h-[320px] lg:h-full min-h-[340px] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-neutral-900 flex flex-col justify-between p-6"
            >
              {/* Main Service Image */}
              <img
                src={displayedService.img}
                alt={displayedService.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
              />

              {/* Ambient Linear Gradient Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Top Watermark Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md text-white border border-white/20">
                  [{displayedService.number}] {displayedService.subtitle}
                </span>

                {hoverIndex !== null && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#6CAFBF] text-black shadow-lg animate-pulse">
                    Hover Preview
                  </span>
                )}
              </div>

              {/* Bottom Room Overlay Title */}
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6CAFBF] mb-1">
                  Mayuri Landmarks LLP
                </p>
                <h3 className="font-[magtis] text-2xl md:text-3xl font-extrabold uppercase text-white tracking-wide">
                  {displayedService.title}
                </h3>
              </div>
            </div>
          </div>

          {/* ══ RIGHT PANEL: TACTILE NAVIGATOR & CONTENT PANEL (7 COLS) ══ */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-white/70 dark:bg-[#121212]/70 border border-black/5 dark:border-white/10 backdrop-blur-2xl shadow-xl">
            <div>
              {/* 4 Vertical Tactile Service Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {services.map((item, idx) => {
                  const isActive = activeIndex === idx;
                  const isHovered = hoverIndex === idx;

                  return (
                    <button
                      key={item.number}
                      onClick={() => handleSelectService(idx)}
                      onMouseEnter={() => setHoverIndex(idx)}
                      onMouseLeave={() => setHoverIndex(null)}
                      className={`group relative p-3 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-[#6CAFBF] text-white border-[#6CAFBF] shadow-lg scale-[1.02]'
                          : isHovered
                          ? 'bg-black/5 dark:bg-white/5 border-[#6CAFBF]/50 text-black dark:text-white'
                          : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/10 dark:border-white/10 text-black/70 dark:text-white/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-[magtis] text-xs font-bold tracking-widest ${
                            isActive ? 'text-white' : 'text-[#6CAFBF]'
                          }`}
                        >
                          {item.number}
                        </span>
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'w-6 bg-white'
                              : 'w-2 bg-black/20 dark:bg-white/20 group-hover:w-4 group-hover:bg-[#6CAFBF]'
                          }`}
                        />
                      </div>
                      <p className="font-[magtis] uppercase font-bold text-xs leading-tight truncate">
                        {item.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Information Panel */}
              <div className="space-y-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#6CAFBF]">
                      {activeService.subtitle}
                    </span>
                    <h3 className="font-[magtis] text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-black dark:text-white mt-1">
                      {activeService.title}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10">
                    <Clock className="w-3.5 h-3.5 text-[#6CAFBF]" />
                    <span>{activeService.executionType}</span>
                  </div>
                </div>

                <p className="text-black/80 dark:text-white/80 text-sm font-light leading-relaxed">
                  {activeService.desc}
                </p>

                {/* Specification Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeService.chips?.map((chip, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Scope Checklist */}
                <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6CAFBF] block mb-1">
                    Key Capabilities & Scope
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeService.scope?.map((scopeItem, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-medium text-black/80 dark:text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6CAFBF] shrink-0" />
                        <span className="truncate">{scopeItem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accordion Expandable Details */}
                {expandedDetails && (
                  <div className="p-4 rounded-xl bg-[#6CAFBF]/10 border border-[#6CAFBF]/30 space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6CAFBF]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Value Advantage & Quality Promise</span>
                    </div>
                    <p className="text-xs text-black/80 dark:text-white/80 leading-relaxed font-light">
                      {activeService.benefit}
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70 leading-relaxed font-light">
                      Mayuri Landmarks LLP executes every service with zero compromise on structural standards, backed by dedicated project managers and RERA-compliant warranties.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Row & Navigation to /service/[id] */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10 dark:border-white/10">
              <button
                onClick={() => setExpandedDetails(!expandedDetails)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-[#6CAFBF] transition-colors cursor-pointer"
              >
                <span>{expandedDetails ? 'Hide Quick Specs' : 'View Quick Specs'}</span>
                {expandedDetails ? (
                  <ChevronUp className="w-4 h-4 text-[#6CAFBF]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#6CAFBF]" />
                )}
              </button>

              <button
                onClick={() => router.push(`/service/${activeService.number}`)}
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#6CAFBF] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>View Full Service Page</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* ── INTEGRATED COMPACT CTA BANNER ───────────────────── */}
        <div className="w-full p-6 md:p-8 rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#6CAFBF]/20 text-[#6CAFBF] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-[magtis] uppercase font-bold text-base md:text-lg tracking-tight">
                Need guidance for your project?
              </h4>
              <p className="text-xs text-white/70 dark:text-black/70">
                Consult directly with Mayuri Landmarks senior structural & interior advisors.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('section-contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#6CAFBF] text-black font-bold text-xs uppercase tracking-widest hover:bg-white dark:hover:bg-black dark:hover:text-white transition-all duration-300 shrink-0 cursor-pointer"
          >
            <span>Discuss Requirements</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
