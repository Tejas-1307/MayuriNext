'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Broucher = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  rowRefs.current = [];
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !rowRefs.current.includes(el)) {
      rowRefs.current.push(el);
    }
  };

  const docs = [
    { title: 'MAHA RERA NUMBER : P52100049330', link: '#' },
    { title: 'ADHINATHPURAM BROCHURE', link: '#' },
    { title: 'ENVIRONMENT CLEARANCE CERTIFICATE', link: '#' },
    { title: 'ENVIRONMENT COMPLIANCE CERTIFICATE', link: '#' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.4 },
        {
          scale: 1,
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        rowRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#F5F5F0] dark:bg-[#0A0A0A] transition-colors duration-1000 py-20 md:py-32 px-4 md:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <div ref={titleRef} className="w-full lg:w-1/3 flex flex-col justify-center">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#6CAFBF] mb-3">
            Essential Documentation
          </span>
          <h2 className="text-3xl md:text-5xl font-[magtis] font-extrabold uppercase text-black dark:text-white transition-colors duration-1000 leading-[1.1] mb-6">
            Downloads <br /> & Verification
          </h2>
          <p className="text-sm md:text-base text-black/70 dark:text-white/70 font-sans leading-relaxed pr-0 lg:pr-6">
            Transparency is at the core of Mayuri Landmarks LLP. Browse and download key statutory permissions, ecological clearance documentation, and property brochures.
          </p>

          <div
            ref={imageContainerRef}
            className="hidden lg:block w-full h-64 mt-8 rounded-sm overflow-hidden relative shadow-xl"
          >
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
              alt="Mayuri Project Architecture"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        <div className="w-full lg:w-7/12 flex flex-col divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
          {docs.map((doc, idx) => (
            <div
              key={idx}
              ref={addToRefs}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 md:py-8 gap-4 transition-all duration-300 hover:pl-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold font-mono text-[#6CAFBF]">
                  0{idx + 1}
                </span>
                <h3 className="text-base md:text-lg font-bold font-[magtis] tracking-wide text-black dark:text-white group-hover:text-[#6CAFBF] transition-colors duration-300 uppercase">
                  {doc.title}
                </h3>
              </div>

              <a
                href={doc.link}
                className="self-start sm:self-center flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 group-hover:border-[#6CAFBF] bg-transparent group-hover:bg-[#6CAFBF] text-black dark:text-white group-hover:text-black transition-all duration-300 font-sans font-bold text-xs tracking-wider"
              >
                <span>DOWNLOAD</span>
                <Download
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-y-[2px]"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Broucher;
