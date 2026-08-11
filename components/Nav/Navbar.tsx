'use client';

import { ArrowRightIcon, LocateIcon, Sun, Moon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Menu from './Menu';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-[10vh] md:h-[12vh] flex items-center justify-between px-4 md:px-10 transition-all duration-500 z-50 ${
          scrolled
            ? 'bg-brand-bg/95 dark:bg-[#0f0f0f]/95 backdrop-blur-md shadow-sm border-b border-brand-dark/5 dark:border-white/5 py-4 md:py-6'
            : 'bg-transparent py-6 md:py-10'
        }`}
      >
        <div className="logo z-50">
          <img
            src="https://www.mayurilandmarks.com/assets/images/logo/logo.png"
            alt="Mayuri Logo"
            className="w-24 md:w-32 ml-0 md:ml-[2vw] dark:invert"
          />
        </div>

        <div className="buttons flex items-center gap-5">
          <button
            onClick={() => scrollTo('section-contact')}
            className="hidden md:flex group relative bg-[#8BC7D8] hover:bg-[#7AB6C7] text-[#111111] px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] font-sans font-bold text-xs tracking-wider"
          >
            <div className="opacity-0 flex items-center gap-2 pointer-events-none">
              <span className="whitespace-nowrap">Get in Touch</span>{' '}
              <ArrowRightIcon size={14} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[150%] w-full h-full">
              <span className="whitespace-nowrap">Get in Touch</span>{' '}
              <ArrowRightIcon size={14} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-2 -translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 w-full h-full">
              <span className="whitespace-nowrap">Get in Touch</span>{' '}
              <ArrowRightIcon size={14} />
            </div>
          </button>

          <a
            href="https://maps.google.com/?q=Mayuri+Adhinathpuram+Pune"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex group relative text-[#111111] dark:text-white border border-[#8BC7D8] hover:border-transparent hover:bg-[#8BC7D8] hover:text-[#111111] px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] font-sans font-bold text-xs tracking-wider"
          >
            <div className="opacity-0 flex items-center gap-2 pointer-events-none">
              <span className="whitespace-nowrap">Location</span>{' '}
              <LocateIcon size={14} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[150%] w-full h-full">
              <span className="whitespace-nowrap">Location</span>{' '}
              <LocateIcon size={14} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-2 translate-x-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 w-full h-full">
              <span className="whitespace-nowrap">Location</span>{' '}
              <LocateIcon size={14} />
            </div>
          </a>

          <button
            onClick={toggleTheme}
            className="relative hidden md:flex items-center justify-center text-[#8BC7D8] hover:text-[#111111] border border-[#8BC7D8] hover:bg-[#8BC7D8] w-12 h-12 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] ml-2"
            aria-label="Toggle Dark Mode"
          >
            <Sun
              size={20}
              strokeWidth={1.5}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isDarkMode
                  ? 'opacity-0 scale-50 rotate-90'
                  : 'opacity-100 scale-100 rotate-0'
              }`}
            />
            <Moon
              size={20}
              strokeWidth={1.5}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isDarkMode
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-50 -rotate-90'
              }`}
            />
          </button>

          <button
            onClick={toggleTheme}
            className="relative flex md:hidden items-center justify-center text-[#8BC7D8] hover:text-[#111111] border border-[#8BC7D8] hover:bg-[#8BC7D8] w-10 h-10 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] ml-2"
            aria-label="Toggle Dark Mode"
          >
            <Sun
              size={18}
              strokeWidth={1.5}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isDarkMode
                  ? 'opacity-0 scale-50 rotate-90'
                  : 'opacity-100 scale-100 rotate-0'
              }`}
            />
            <Moon
              size={18}
              strokeWidth={1.5}
              className={`absolute transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isDarkMode
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-50 -rotate-90'
              }`}
            />
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-3 cursor-pointer ml-0 md:ml-4 p-2 overflow-hidden hover:scale-[1.03] transition-transform duration-300 z-50"
          >
            <div className="relative w-8 h-[10px] flex flex-col justify-between overflow-hidden">
              <div className="relative w-full h-[1.5px]">
                <span className="absolute top-0 left-0 w-full h-full bg-[#111111] dark:bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[101%]" />
                <span className="absolute top-0 right-full w-full h-full bg-[#8BC7D8] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[101%]" />
              </div>
              <div className="relative w-full h-[1.5px]">
                <span className="absolute top-0 left-0 w-full h-full bg-[#111111] dark:bg-white transition-transform duration-500 delay-75 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[101%]" />
                <span className="absolute top-0 left-full w-full h-full bg-[#8BC7D8] transition-transform duration-500 delay-75 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[101%]" />
              </div>
            </div>
          </button>
        </div>
      </div>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
