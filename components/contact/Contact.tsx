'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookingForm from '@/components/forms/BookingForm';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    label: 'Visit Us',
    value: 'Mayuri Landmarks LLP, Pune, Maharashtra, India',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-8-6.5-8-12a8 8 0 1 1 16 0c0 5.5-8 12-8 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '+91 8237277775',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 4.18 2 2 0 0 1 5.09 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.96.7 2.88a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 5 5l1.2-1.2a2 2 0 0 1 2.11-.45c.92.33 1.88.57 2.88.7A2 2 0 0 1 22 16.9z" />
      </svg>
    ),
  },
  {
    label: 'Email Us',
    value: 'mayurilandmarks.sales@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 8L2 7" />
      </svg>
    ),
  },
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const titleLines = useRef<(HTMLSpanElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);

  titleLines.current = [];
  infoRefs.current = [];

  const addTitle = (el: HTMLSpanElement | HTMLDivElement | null) => {
    if (el && !titleLines.current.includes(el as any)) {
      titleLines.current.push(el as any);
    }
  };
  const addInfo = (el: HTMLDivElement | null) => {
    if (el && !infoRefs.current.includes(el)) {
      infoRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleLines.current,
        { y: 130, rotateX: -30, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        infoRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: infoRefs.current[0], start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-[#F5F5F0] dark:bg-[#0A0A0A] transition-colors duration-1000 text-black dark:text-white overflow-hidden"
    >
      <div className="px-4 md:px-[6vw] pt-[12vh] pb-[6vh]">
        <p className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold mb-4">
          Let's Connect
        </p>
        <div ref={headlineRef} style={{ perspective: '1000px' }}>
          {['BEGIN THE', 'JOURNEY TO YOUR', 'FOREVER HOME.'].map((line, i) => (
            <div key={i} className="overflow-hidden leading-none">
              <span
                ref={addTitle}
                className={`block font-[magtis] uppercase font-extrabold tracking-tighter leading-[0.88] ${
                  i === 1 ? 'text-[#6CAFBF]' : 'text-black dark:text-white'
                }`}
                style={{ fontSize: 'clamp(2.5rem, 7.5vw, 7.5rem)' }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-[1px] bg-black/8 dark:bg-white/8 mt-[6vh]" />
      </div>

      <div className="px-4 md:px-[6vw] pb-[12vh] grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-[6vw] items-start">
        {/* Left: Contact Info */}
        <div className="flex flex-col gap-10 pt-2">
          <p className="text-black/60 dark:text-white/60 text-base md:text-lg font-medium leading-relaxed">
            We are always open to discuss your project, answer questions, or schedule an exclusive site visit. Drop us a message and our team will get back to you within 24 hours.
          </p>

          <div className="flex flex-col gap-6">
            {contactInfo.map((info, i) => (
              <div key={i} ref={addInfo} className="flex items-start gap-5 group">
                <div className="w-11 h-11 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center text-[#6CAFBF] shrink-0 group-hover:bg-[#6CAFBF] group-hover:text-black group-hover:border-[#6CAFBF] transition-all duration-400">
                  {info.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#6CAFBF] text-xs tracking-[0.2em] uppercase font-bold">
                    {info.label}
                  </span>
                  <span className="text-black/70 dark:text-white/70 text-sm md:text-base font-medium leading-relaxed">
                    {info.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div ref={addInfo} className="flex flex-col gap-3">
            <span className="text-[#6CAFBF] text-xs tracking-[0.2em] uppercase font-bold">
              Follow Us
            </span>
            <div className="flex items-center gap-4">
              {['Instagram', 'LinkedIn', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-black/40 dark:text-white/40 text-xs md:text-sm font-semibold tracking-wide hover:text-[#6CAFBF] transition-colors border-b border-black/10 dark:border-white/10 hover:border-[#6CAFBF] pb-1"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Unified Booking Form Architecture */}
        <div ref={formRef}>
          <BookingForm type="site-visit" sourcePage="Contact Page" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
