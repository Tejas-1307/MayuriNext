'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BrochureSectionProps {
  projectName?: string;
  brochureUrl?: string;
  pdfFilename?: string;
}

export const BrochureSection: React.FC<BrochureSectionProps> = ({
  projectName = 'Mayuri Adhinathpuram',
  brochureUrl = '/brochure-mayuri-adhinathpuram.pdf',
  pdfFilename = 'Mayuri-Adhinathpuram-Brochure.pdf',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    'Floor Plans',
    'Specifications',
    'Amenities',
    'Location',
    'Pricing Information',
    'Project Details',
  ];

  return (
    <section
      ref={containerRef}
      aria-label={`${projectName} Official Brochure`}
      className="w-full px-4 md:px-[8vw] py-[6vh] bg-[#F5F5F0] dark:bg-[#080808] transition-colors duration-1000 select-none"
    >
      <div
        ref={cardRef}
        className="w-full bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-[24px] p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-500 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
      >
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#6CAFBF]" />
            <span className="text-[#6CAFBF] text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
              Official Documentation
            </span>
          </div>

          <h3 className="font-[magtis] uppercase font-extrabold text-2xl md:text-4xl text-black dark:text-white leading-tight tracking-tight">
            Project Brochure
          </h3>

          <p className="text-black/70 dark:text-white/70 text-xs md:text-sm font-medium leading-relaxed">
            Download the official project brochure for <span className="font-bold text-black dark:text-white">{projectName}</span> containing:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 pt-2">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-medium text-black/80 dark:text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF] shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 lg:pt-0 shrink-0">
          <a
            href={brochureUrl}
            download={pdfFilename}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${projectName} Brochure`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white dark:bg-white dark:text-black hover:bg-[#6CAFBF] dark:hover:bg-[#6CAFBF] dark:hover:text-black font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-[0_0_20px_rgba(108,175,191,0.4)] cursor-pointer"
          >
            <span>Download Brochure</span>
            <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrochureSection;
