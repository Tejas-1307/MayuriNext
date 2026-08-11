'use client';

import React, { useState, useEffect } from 'react';
import BookingForm from '@/components/forms/BookingForm';

export default function FloatingConversionBar() {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center gap-3 transition-all duration-500 transform ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
      >
        {/* WhatsApp Quick Action */}
        <a
          href="https://wa.me/918237277775?text=Hi%20Mayuri%20Landmarks%2C%20I%20am%20interested%20in%20learning%20more%20about%20your%20projects."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
          title="Chat on WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.474 1.333 4.988l-1.417 5.176 5.297-1.389c1.455.794 3.1 1.212 4.774 1.213h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.668-1.037-5.176-2.922-7.062-1.886-1.886-4.394-2.924-7.068-2.925zm0 1.667c4.587 0 8.32 3.733 8.321 8.318 0 2.224-.866 4.315-2.439 5.888-1.573 1.573-3.664 2.439-5.883 2.439h-.003c-1.488 0-2.946-.395-4.223-1.144l-.303-.178-3.136.822.836-3.056-.195-.31c-.822-1.309-1.258-2.825-1.258-4.379 0-4.584 3.733-8.318 8.318-8.318zm4.568 11.758c-.251-.126-1.484-.732-1.714-.816-.23-.084-.397-.126-.565.126-.168.251-.65.816-.797.983-.146.168-.293.188-.544.063-.251-.126-1.06-.391-2.019-1.247-.746-.665-1.25-1.487-1.396-1.738-.146-.251-.016-.387.11-.512.113-.113.251-.293.377-.44.126-.146.168-.251.251-.419.084-.168.042-.314-.021-.44-.063-.126-.565-1.36-.774-1.862-.204-.489-.411-.423-.565-.431-.146-.008-.314-.01-.482-.01-.168 0-.44.063-.67.314-.23.251-.879.858-.879 2.094 0 1.236.9 2.43 1.025 2.6.126.168 1.771 2.704 4.291 3.793.6.259 1.068.414 1.433.53.602.192 1.15.165 1.583.1.483-.072 1.484-.607 1.693-1.193.209-.586.209-1.088.146-1.193-.063-.105-.23-.168-.481-.294z" />
          </svg>
        </a>

        {/* Book Site Visit CTA Trigger */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-3 px-5 py-3.5 bg-[#6CAFBF] text-black font-bold text-xs md:text-sm tracking-widest uppercase rounded-full shadow-2xl hover:bg-white transition-all duration-300 border border-black/10 shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Book Site Visit</span>
        </button>
      </div>

      {/* Site Visit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
          <div className="relative w-full max-w-3xl lg:max-w-4xl bg-[#F5F5F0] dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-md shadow-2xl my-auto p-5 md:p-7 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 text-black dark:text-white bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 p-2.5 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <BookingForm
              type="site-visit"
              title="Book Site Visit"
              subtitle="Schedule an exclusive guided walkthrough of your future home."
              sourcePage="Floating CTA Modal"
              onSuccess={() => {
                setTimeout(() => setIsModalOpen(false), 3000);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
