'use client';

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: 'Legal & RERA',
    q: 'Is this project registered under MAHA RERA and title-cleared?',
    a: 'Yes, all Mayuri Landmarks projects are fully registered under MAHA RERA (Registration No: P52100028741) with clear, unencumbered land titles verified by leading legal advisors in Pune.',
  },
  {
    category: 'Home Loans',
    q: 'Which banks offer pre-approved home loans for Mayuri Landmarks?',
    a: 'We have direct pre-approval tie-ups with State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda for instant home loan sanctions at competitive interest rates.',
  },
  {
    category: 'Booking & Payment',
    q: 'What is the initial booking token amount and construction-linked payment schedule?',
    a: 'You can book your dream residence with a minimal token amount of ₹1,00,000. The remaining balance follows a transparent, slab-wise construction milestone payment schedule.',
  },
  {
    category: 'Possession',
    q: 'What are the possession dates and construction milestone guarantees?',
    a: 'Possession dates are strictly specified in the MAHA RERA agreement with guaranteed construction milestone timelines. Delivered projects (e.g. Mayuri Infinity) were handed over on or before schedule.',
  },
  {
    category: 'Site Visit',
    q: 'Does Mayuri Landmarks provide complimentary pick-and-drop site visit services?',
    a: 'Yes, we provide free air-conditioned pick-and-drop services anywhere across Pune for buyers and their families to experience the sample flat and site walkthrough conveniently.',
  },
  {
    category: 'Maintenance',
    q: 'How are common area amenities and solar energy systems maintained?',
    a: 'Common area solar panels, generator backups, CCTV security, and elevators are managed by a dedicated facility management team with low monthly maintenance costs.',
  },
];

export default function ProjectFaq({ projectName = 'Mayuri Landmarks' }: { projectName?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="w-full bg-[#F5F5F0] dark:bg-[#0A0A0A] text-black dark:text-white py-[10vh] px-4 md:px-[6vw] border-t border-black/10 dark:border-white/10 select-none">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[6vh]">
        <div>
          <span className="text-[#6CAFBF] text-xs font-bold tracking-[0.3em] uppercase block mb-2">
            Clear Answers · Zero Uncertainty
          </span>
          <h2 className="font-[magtis] text-3xl md:text-5xl uppercase font-extrabold tracking-tight">
            Frequently Asked <span className="text-[#6CAFBF]">Questions</span>
          </h2>
        </div>
        <p className="text-black/60 dark:text-white/60 text-sm md:text-base font-medium max-w-md leading-relaxed">
          Everything you need to know about buying a home at <span className="font-bold text-black dark:text-white">{projectName}</span>.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-black dark:text-white hover:text-[#6CAFBF] dark:hover:text-[#6CAFBF] transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#6CAFBF] font-mono text-xs font-extrabold uppercase tracking-widest shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{faq.q}</span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#6CAFBF] text-black border-[#6CAFBF]' : ''
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-black/70 dark:text-white/70 leading-relaxed font-medium border-t border-black/5 dark:border-white/5 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
