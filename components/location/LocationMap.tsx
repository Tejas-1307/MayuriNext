'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface LocationMapProps {
  projectName?: string;
  address?: string;
  mapEmbedUrl?: string;
  googleMapsUrl?: string;
  subheading?: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  projectName = 'Mayuri Adhinathpuram',
  address = '53/8, Wadachi Wadi Road, Undri, Pune – 411 060',
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.789069337!2d73.87740637504766!3d18.463598282617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac965f7fcdb%3A0xc7fcb59ea0c26888!2sMayuri%20Adhinathpuram!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  googleMapsUrl = 'https://maps.google.com/?q=Mayuri+Adhinathpuram+Pune',
  subheading = "Situated in one of Pune's fastest-growing neighborhoods, Mayuri Adhinathpuram offers seamless connectivity while preserving the calm and comfort of residential living.",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Micro-Animation: Section Header Opacity 0 -> 1, Y 50 -> 0 (1s, Power4.out)
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
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
      }

      // Map Container Scale 0.98 -> 1, Opacity 0 -> 1
      if (mapContainerRef.current) {
        gsap.fromTo(
          mapContainerRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: mapContainerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Glass Info Card Stagger Fade Up
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mapContainerRef.current,
              start: 'top 85%',
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
      className="w-full bg-[#F5F5F0] dark:bg-[#080808] text-black dark:text-white pt-[80px] pb-[100px] md:pt-[120px] md:pb-[140px] px-4 md:px-[6vw] select-none transition-colors duration-1000 overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headerRef} className="mb-10 max-w-2xl">
        <span className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold block mb-2">
          LOCATION
        </span>
        <h2 className="font-[magtis] uppercase font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight text-black dark:text-white leading-[0.95] mb-4">
          Locate <span className="text-[#6CAFBF] font-serif">{projectName}</span>
        </h2>
        <p className="text-black/60 dark:text-white/60 text-sm md:text-base font-medium leading-relaxed">
          {subheading}
        </p>
      </div>

      {/* Interactive Map Container */}
      <div
        ref={mapContainerRef}
        id="section-map"
        className="relative w-full h-[50vh] md:h-[60vh] rounded-sm overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl"
      >
        <iframe
          title={`${projectName} Location Map`}
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter:
              'invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.75)',
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Glassmorphic Information Card Overlay */}
        <div
          ref={cardRef}
          className="absolute top-6 left-6 md:top-8 md:left-8 z-10 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/15 rounded-sm p-5 md:p-6 flex flex-col gap-2 max-w-xs md:max-w-sm shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#6CAFBF] animate-pulse" />
            <span className="text-[#6CAFBF] text-[10px] tracking-[0.25em] uppercase font-bold">
              Project Location
            </span>
          </div>
          <p className="text-white font-bold text-base md:text-lg leading-snug">
            {projectName}
          </p>
          <p className="text-white/70 text-xs md:text-sm leading-relaxed">
            {address}
          </p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#6CAFBF] text-xs tracking-widest uppercase font-bold hover:gap-3 transition-all mt-2 group"
          >
            <span>Open in Google Maps</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
