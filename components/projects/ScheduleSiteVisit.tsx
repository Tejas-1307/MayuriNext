'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookingForm from '@/components/forms/BookingForm';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Flexible Scheduling',
    desc: 'Choose your preferred date and time slot with instant calendar booking.',
  },
  {
    step: '02',
    title: 'Expert Guided Tour',
    desc: 'Dedicated Senior Relationship Manager assigned for personal assistance.',
  },
  {
    step: '03',
    title: '60-Min Walkthrough',
    desc: 'Sample flat experience, structural inspection & amenity tour.',
  },
  {
    step: '04',
    title: 'Instant Confirmation',
    desc: 'Receive immediate SMS, Email, and WhatsApp directions pin.',
  },
];

interface ScheduleSiteVisitProps {
  projectName?: string;
}

export default function ScheduleSiteVisit({
  projectName = '',
}: ScheduleSiteVisitProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  timelineRefs.current = [];
  const addTimelineRef = (el: HTMLDivElement | null) => {
    if (el && !timelineRefs.current.includes(el)) {
      timelineRefs.current.push(el);
    }
  };

  // GSAP Choreographed Macro Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' }
      )
        .fromTo(
          timelineRefs.current,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          cardRef.current,
          { y: 80, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' },
          '-=0.8'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="schedule-visit"
      className="w-full bg-[#F5F5F0] dark:bg-[#080808] text-black dark:text-white transition-colors duration-1000 py-16 md:py-24 px-4 md:px-[4vw] select-none"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start my-4 md:my-8">
        {/* LEFT PANEL (35% - 4.5 COLS) — Vertical Storytelling Timeline */}
        <div className="lg:col-span-5 space-y-8 lg:pr-4">
          <div ref={headlineRef} className="space-y-4">
            <span className="text-[#6CAFBF] text-xs font-bold tracking-[0.35em] uppercase block">
              Exclusive Site Experience
            </span>

            <h2 className="font-[magtis] uppercase font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[0.9] tracking-tighter">
              Schedule Your <br />
              <span className="text-[#6CAFBF]">Private Visit.</span>
            </h2>

            <p className="text-black/60 dark:text-white/60 text-sm md:text-base font-medium leading-relaxed max-w-md">
              Step into the world of Mayuri Landmarks. Experience unyielding structural craftsmanship, biophilic landscaping, and luxury sample suites firsthand.
            </p>
          </div>

          {/* Connected Timeline Journey */}
          <div className="relative pl-6 space-y-7 border-l-2 border-black/10 dark:border-white/10">
            {TIMELINE_STEPS.map((step) => (
              <div
                key={step.step}
                ref={addTimelineRef}
                className="relative group space-y-1"
              >
                {/* Node Dot */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white dark:bg-[#080808] border-2 border-[#6CAFBF] group-hover:bg-[#6CAFBF] transition-colors duration-300" />

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#6CAFBF]">
                    {step.step}
                  </span>
                  <h3 className="font-[magtis] uppercase font-bold text-base md:text-lg text-black dark:text-white">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-black/60 dark:text-white/60 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL (65% - 7 COLS) — Standardized Booking Card */}
        <div
          ref={cardRef}
          className="lg:col-span-7 bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 rounded-lg p-6 sm:p-10 shadow-2xl relative transition-all duration-500 my-2 md:my-4"
        >
          <BookingForm
            type="site-visit"
            title="Book Your Site Visit"
            subtitle="Select your preferred date, time slot, and unit configuration."
            projectName={projectName}
            autoFilled={!!projectName}
            sourcePage="Schedule Site Visit Section"
          />
        </div>
      </div>
    </section>
  );
}
