'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);
  const bgFirstRef = useRef<HTMLDivElement>(null);
  const bgSecondRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const subtextRef = useRef<(HTMLElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  const menuItems = [
    { title: 'Home', num: '01', href: 'section-home' },
    { title: 'Projects', num: '02', href: 'section-projects' },
    { title: 'Amenities', num: '03', href: 'section-amenities' },
    { title: 'Services', num: '04', href: 'section-services' },
    { title: 'Contact', num: '05', href: 'section-contact' },
  ];

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      if (pathname === '/') {
        const el = document.getElementById(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push(`/#${href}`);
      }
    }, 700);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();

      gsap.set(menuRef.current, { visibility: 'visible' });
      gsap.set([bgFirstRef.current, bgSecondRef.current], { y: '-100%' });
      gsap.set(linksRef.current, { y: 150, rotate: 10, opacity: 0 });
      gsap.set(subtextRef.current, { opacity: 0, y: 20 });
      gsap.set(imageRef.current, { scale: 1.2, opacity: 0 });

      tl.to(bgFirstRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'power4.inOut',
      })
        .to(
          bgSecondRef.current,
          {
            y: '0%',
            duration: 0.8,
            ease: 'power4.inOut',
          },
          '-=0.6'
        )
        .to(
          linksRef.current,
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .to(
          imageRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        .to(
          subtextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=1'
        );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: 'hidden' });
          document.body.style.overflow = 'auto';
        },
      });

      tl.to(linksRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
      })
        .to(
          subtextRef.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          0
        )
        .to(
          imageRef.current,
          {
            opacity: 0,
            duration: 0.4,
          },
          0
        )
        .to(
          bgSecondRef.current,
          {
            y: '100%',
            duration: 0.6,
            ease: 'power4.inOut',
          },
          0.2
        )
        .to(
          bgFirstRef.current,
          {
            y: '100%',
            duration: 0.6,
            ease: 'power4.inOut',
          },
          0.3
        );
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50 invisible pointer-events-auto"
    >
      <div
        ref={bgFirstRef}
        className="absolute inset-0 bg-[#F5F5F0] dark:bg-[#111111] transition-colors duration-500 w-full h-full"
      />
      <div
        ref={bgSecondRef}
        className="absolute inset-0 bg-[#F5F5F0] dark:bg-[#111111] transition-colors duration-500 w-full h-full flex flex-col justify-between pt-[10vh] pb-[6vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-10 md:right-10 z-50 text-black dark:text-white p-2 hover:rotate-90 transition-transform duration-300"
          aria-label="Close Menu"
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        <div className="w-full flex justify-between items-center text-xs tracking-widest font-bold uppercase text-black/70 px-4 md:px-[4vw]">
          <span
            ref={(el) => {
              subtextRef.current[0] = el;
            }}
          >
            Navigation
          </span>
          <span
            ref={(el) => {
              subtextRef.current[1] = el;
            }}
          >
            Mayuri Landmarks LLP
          </span>
        </div>

        <div className="flex-1 flex items-center justify-between px-4 md:px-[4vw] overflow-hidden">
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <div
                key={item.num}
                onClick={() => handleNavClick(item.href)}
                className="group cursor-pointer flex items-baseline gap-4 md:gap-8 my-0.5 md:my-1"
              >
                <span
                  ref={(el) => {
                    subtextRef.current[index + 2] = el;
                  }}
                  className="text-xs font-mono font-bold text-black/40 dark:text-white/40 group-hover:text-[#6CAFBF] transition-colors duration-300"
                >
                  {item.num}
                </span>

                <div
                  ref={(el) => {
                    linksRef.current[index] = el;
                  }}
                  className="origin-bottom-left overflow-hidden pb-1 md:pb-4"
                >
                  <h1 className="relative text-[6vh] md:text-[10vh] font-[magtis] uppercase leading-[5.5vh] md:leading-[9vh] text-black dark:text-white transition-colors duration-1000 font-extrabold flex">
                    <span className="flex overflow-hidden">
                      {item.title.split('').map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
                          style={{
                            transitionDelay: `${charIndex * 0.03}s`,
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                    <span className="absolute left-0 top-0 flex overflow-hidden text-[#6CAFBF]">
                      {item.title.split('').map((char, charIndex) => (
                        <span
                          key={`hover-${charIndex}`}
                          className="inline-block translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                          style={{
                            transitionDelay: `${charIndex * 0.03}s`,
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex w-1/3 h-full flex-col justify-center items-center pb-[10vh]">
            <div className="w-full h-[60vh] overflow-hidden rounded-sm relative">
              <div className="absolute inset-0 bg-black/10 z-10 transition-colors duration-500 hover:bg-transparent pointer-events-none" />
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80"
                alt="Modern Architecture"
                className="w-full h-full object-cover origin-center"
              />
            </div>

            <div className="w-full pt-8 flex justify-between uppercase text-xs tracking-[0.2em] font-bold text-black/60 pointer-events-none">
              <span
                ref={(el) => {
                  subtextRef.current[5] = el;
                }}
              >
                Pune, IN
              </span>
              <span
                ref={(el) => {
                  subtextRef.current[6] = el;
                }}
              >
                Exclusive
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 mt-8 md:mt-0 justify-between items-center text-[10px] md:text-xs tracking-widest font-bold uppercase text-black/70 px-4 md:px-[4vw]">
          <a
            ref={(el) => {
              subtextRef.current[7] = el;
            }}
            href="https://www.instagram.com/mayurilandmarks?igsh=MzFpNm82eHQ0ZnVo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6CAFBF] transition-colors"
          >
            Instagram
          </a>
          <a
            ref={(el) => {
              subtextRef.current[8] = el;
            }}
            href="#"
            className="hover:text-[#6CAFBF] transition-colors"
          >
            LinkedIn
          </a>
          <a
            ref={(el) => {
              subtextRef.current[9] = el;
            }}
            href="#"
            className="hover:text-[#6CAFBF] transition-colors"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
