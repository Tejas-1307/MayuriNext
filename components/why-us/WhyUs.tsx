'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Building2, Ruler, Briefcase } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);

  const newSectionRef = useRef<HTMLDivElement>(null);
  const newTextRefs = useRef<(HTMLElement | null)[]>([]);
  const serviceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const newVideoRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [accordionHover, setAccordionHover] = useState<number | null>(null);
  const [showFullStory, setShowFullStory] = useState(false);

  const cursorImageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });

  const setX = useRef<gsap.QuickToFunc | null>(null);
  const setY = useRef<gsap.QuickToFunc | null>(null);

  const servicesList = [
    'CONSTRUCTION SERVICES',
    'DESIGN-BUILD SERVICES',
    'ARCHITECTURAL SERVICES',
    'GENERAL CONTRACTING',
    'EXCELLENT AMENITIES',
  ];

  const heroImages = [
    'https://www.mayurilandmarks.com/images/sliders/Web2.jpg',
    'https://www.mayurilandmarks.com/images/sliders/Web1.jpg',
    'https://www.mayurilandmarks.com/images/sliders/Web3.jpg',
  ];

  const hoverImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
  ];

  headlineRefs.current = [];
  imgRefs.current = [];
  listRefs.current = [];
  newTextRefs.current = [];
  serviceCardRefs.current = [];

  const addToRefs = (el: any, refArray: React.MutableRefObject<any[]>) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRefs.current,
        { y: 100, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      imgRefs.current.forEach((img) => {
        gsap.fromTo(
          img,
          { y: 100, opacity: 0, scale: 1.1 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });

      gsap.fromTo(
        listRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: listRefs.current[0],
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        newTextRefs.current,
        { y: 150, rotateX: -20, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: newSectionRef.current, start: 'top 65%' },
        }
      );

      gsap.fromTo(
        newVideoRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: newSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      if (serviceCardRefs.current && serviceCardRefs.current.length > 0) {
        gsap.fromTo(
          serviceCardRefs.current,
          { y: 120, opacity: 0, scale: 0.95, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: serviceCardRefs.current[0],
              start: 'top 85%',
            },
          }
        );
      }

      setX.current = gsap.quickTo(cursorImageRef.current, 'x', {
        duration: 0.8,
        ease: 'power3',
      });
      setY.current = gsap.quickTo(cursorImageRef.current, 'y', {
        duration: 0.8,
        ease: 'power3',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const imageWidth = window.innerWidth < 768 ? 200 : 400;
    const imageHeight = window.innerWidth < 768 ? 250 : 500;

    cursorRef.current = {
      x: relX - imageWidth / 2,
      y: relY - imageHeight / 2,
    };

    if (setX.current && setY.current) {
      setX.current(cursorRef.current.x);
      setY.current(cursorRef.current.y);

      const speedX = e.movementX || 0;
      gsap.to(cursorImageRef.current, {
        rotation: speedX * 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  useEffect(() => {
    if (hoveredIndex !== null) {
      gsap.to(containerRef.current, {
        backgroundColor: '#6CAFBF',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(cursorImageRef.current, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    } else {
      const targetColor = document.documentElement.classList.contains('dark')
        ? '#0f0f0f'
        : '#F5F5F0';
      gsap.to(containerRef.current, {
        backgroundColor: targetColor,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(cursorImageRef.current, {
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  }, [hoveredIndex]);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden text-black dark:text-white pt-[12vh] pb-[10vh] transition-colors duration-1000"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full bg-[#F5F5F0] dark:bg-[#0f0f0f] transition-colors duration-1000 -z-20 pointer-events-none"
      />

      <div className="px-4 md:px-[6vw]">
        <div className="flex flex-col xl:flex-row justify-between items-start gap-12 xl:gap-0 mt-[4vh]">
          <div
            className="w-full xl:w-[65%] flex flex-col gap-2 font-[magtis] uppercase text-[4.5vh] md:text-[7.5vh] lg:text-[9vh] leading-[1] font-extrabold tracking-tight transition-colors duration-500"
            style={{ color: hoveredIndex !== null ? 'white' : 'black' }}
          >
            <div className="overflow-hidden">
              <div ref={(el) => addToRefs(el, headlineRefs)}>
                We don't build{' '}
                <span
                  className={`transition-colors duration-500 ${
                    hoveredIndex !== null ? 'text-white' : 'text-[#6CAFBF]'
                  }`}
                >
                  BUILDINGS.
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={(el) => addToRefs(el, headlineRefs)}>
                We craft <span className="italic font-normal">LIFESTYLES</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={(el) => addToRefs(el, headlineRefs)}>
                FOR OUR{' '}
                <span
                  className={`transition-colors duration-500 ${
                    hoveredIndex !== null ? 'text-white' : 'text-[#6CAFBF]'
                  }`}
                >
                  CUSTOMERS.
                </span>
              </div>
            </div>
          </div>

          <div
            ref={paragraphRef}
            className="w-full xl:w-[30%] flex flex-col font-sans transition-colors duration-500"
            style={{
              color:
                hoveredIndex !== null
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(0,0,0,0.8)',
            }}
          >
            <div className="text-base md:text-lg font-medium leading-relaxed">
              We are <span className="font-bold">Mayuri Landmarks LLP</span>, born with a purpose to build projects that breathe life into the dreams of our customers in Pune.
            </div>

            <button
              onClick={() => setShowFullStory((prev) => !prev)}
              className="mt-4 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#6CAFBF] hover:text-black dark:hover:text-white transition-colors"
            >
              <span>{showFullStory ? 'Collapse Story' : 'Read Full Story'}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-300 ${
                  showFullStory ? 'rotate-180' : ''
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable Philosophy Drawer (Progressive Disclosure) */}
        {showFullStory && (
          <div className="mt-8 p-6 md:p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-sm text-sm md:text-base leading-relaxed font-medium transition-all duration-500 animate-fadeIn">
            With a fine balance of entrepreneurial expertise and vision combined with a commitment to excellence, Mayuri Landmarks LLP has been recognized as one of the most trusted developers in Pune. We believe in constructing aesthetically designed, functionally efficient residential and commercial complexes offering unparalleled value.
          </div>
        )}

        <div className="w-full mt-[8vh] mb-[8vh] flex flex-col md:flex-row gap-8 md:gap-4 items-center md:items-start justify-between relative z-10 pointer-events-none">
          <div className="w-full md:w-[30%] h-[35vh] md:h-[50vh] mt-0 md:mt-[6vh] overflow-hidden rounded-sm">
            <img
              ref={(el) => addToRefs(el, imgRefs)}
              src={heroImages[0]}
              alt="Architecture 1"
              className="w-full h-full object-cover origin-center"
            />
          </div>
          <div className="w-full md:w-[35%] h-[40vh] md:h-[60vh] overflow-hidden rounded-sm">
            <img
              ref={(el) => addToRefs(el, imgRefs)}
              src={heroImages[1]}
              alt="Architecture 2"
              className="w-full h-full object-cover origin-center"
            />
          </div>
          <div className="w-full md:w-[25%] h-[28vh] md:h-[40vh] mt-0 md:mt-[12vh] overflow-hidden rounded-sm">
            <img
              ref={(el) => addToRefs(el, imgRefs)}
              src={heroImages[2]}
              alt="Architecture 3"
              className="w-full h-full object-cover origin-center"
            />
          </div>
        </div>

        <div
          className={`w-full h-[1px] my-[6vh] transition-colors duration-500 ${
            hoveredIndex !== null ? 'bg-white/20' : 'bg-black/10'
          }`}
        />

        {/* Philosophy and Detailed Services */}
        <div
          ref={newSectionRef}
          className="w-full flex flex-col mb-[10vh] relative z-20"
        >
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-stretch mb-[10vh] px-0 md:px-4">
            <div className="w-full md:w-[60%] flex flex-col justify-center pr-0 md:pr-8">
              <h2
                ref={(el) => addToRefs(el, newTextRefs)}
                className="text-[3.5vh] md:text-[5.5vh] font-[magtis] uppercase leading-[1.1] mb-8 tracking-tight text-black flex flex-col gap-2"
              >
                <span className="block overflow-hidden">
                  <span className="block">Mayuri Landmarks LLP</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block text-[#6CAFBF]">
                    born with a purpose
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block italic font-normal">breathe life</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block">into customer dreams.</span>
                </span>
              </h2>

              <div className="w-full md:w-5/6 flex flex-col gap-4">
                <p
                  ref={(el) => addToRefs(el, newTextRefs)}
                  className="text-black/80 text-base md:text-xl font-medium leading-relaxed"
                >
                  With a fine balance of entrepreneurial expertise and vision combined with our commitment to excellence, Mayuri Landmarks stands as a hallmark of trust in Pune.
                </p>
                <div
                  className="w-16 h-[2px] bg-[#6CAFBF] my-2"
                  ref={(el) => addToRefs(el, newTextRefs)}
                />
                <p
                  ref={(el) => addToRefs(el, newTextRefs)}
                  className="text-[#6CAFBF] text-base md:text-xl font-bold leading-relaxed"
                >
                  Constructing aesthetically designed, functionally efficient residential and commercial complexes offering "more value for money".
                </p>
              </div>
            </div>

            <div className="w-full md:w-[40%] h-[40vh] md:h-auto min-h-[55vh] rounded-sm overflow-hidden relative shadow-2xl shadow-black/10 mt-6 md:mt-0">
              <div
                ref={newVideoRef}
                className="absolute inset-[-10%] w-[120%] h-[120%]"
              >
                <video
                  src="https://felixnieto.b-cdn.net/projects/kensho_loop_30fps.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Futuristic Horizontal Service Accordion */}
          <div className="w-full flex flex-col md:flex-row h-[55vh] md:h-[60vh] gap-2 md:gap-4 mt-[3vh]">
            {[
              {
                title: 'Construction Services',
                icon: HardHat,
                desc: 'Specialized project management techniques overseeing planning, design, and construction from inception to completion.',
                img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80',
              },
              {
                title: 'Design-Build Services',
                icon: Building2,
                desc: 'Saving money and time through close collaboration between design and construction teams fostering structural innovation.',
                img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
              },
              {
                title: 'Architectural Services',
                icon: Ruler,
                desc: 'Comprehensive architectural programming, feasibility studies, construction documents, and project administration.',
                img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
              },
              {
                title: 'General Contracting',
                icon: Briefcase,
                desc: 'Primary point of responsibility for controlling construction costs, managing specialized subcontractors, and meeting schedules.',
                img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
              },
            ].map((service, index) => {
              const Icon = service.icon;
              const isActiveLocal =
                accordionHover === null ? index === 0 : accordionHover === index;

              return (
                <div
                  key={index}
                  ref={(el) => addToRefs(el, serviceCardRefs)}
                  className={`
                    relative rounded-md overflow-hidden cursor-pointer group flex
                    transition-[flex,width,height] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                    ${
                      isActiveLocal
                        ? 'flex-[4] md:flex-[5] h-full shadow-2xl saturate-100'
                        : 'flex-[1] md:flex-[1] h-full saturate-0 hover:saturate-50'
                    }
                  `}
                  onMouseEnter={() => setAccordionHover(index)}
                  onMouseLeave={() => setAccordionHover(null)}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
                      isActiveLocal ? 'scale-100' : 'scale-110'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 ${
                      isActiveLocal
                        ? 'opacity-100'
                        : 'opacity-60 group-hover:opacity-80'
                    }`}
                  />

                  <div className="absolute top-4 left-4 md:top-6 md:left-6 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/20 flex items-center justify-center z-20">
                    <Icon
                      className="text-white w-4 h-4 md:w-5 md:h-5"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 md:p-6">
                    <div
                      className={`
                      transition-opacity duration-500 delay-100 absolute bottom-6 md:bottom-12 left-0 right-0
                      ${
                        isActiveLocal
                          ? 'opacity-0 pointer-events-none'
                          : 'opacity-100'
                      }
                    `}
                    >
                      <h3 className="text-white font-[magtis] uppercase text-xs md:text-lg font-bold tracking-widest leading-none px-4 md:px-0 md:-rotate-90 md:origin-left md:translate-x-10 md:-translate-y-8 whitespace-nowrap overflow-hidden text-ellipsis">
                        {service.title}
                      </h3>
                    </div>

                    <div
                      className={`
                      flex flex-col gap-2 overflow-hidden 
                      transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                      ${
                        isActiveLocal
                          ? 'opacity-100 translate-y-0 delay-200'
                          : 'opacity-0 translate-y-10 pointer-events-none absolute bottom-0'
                      }
                    `}
                    >
                      <h3 className="text-[2.5vh] md:text-[4vh] text-white font-[magtis] uppercase font-extrabold leading-[1] md:leading-tight">
                        {service.title}
                      </h3>

                      <div className="w-12 md:w-20 h-[1px] md:h-[2px] bg-[#6CAFBF]" />

                      <p className="text-white/80 font-medium text-xs md:text-sm lg:text-base leading-relaxed md:w-5/6">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`w-full h-[1px] my-[6vh] transition-colors duration-500 ${
            hoveredIndex !== null ? 'bg-white/20' : 'bg-black/10'
          }`}
        />

        <div
          className="w-full flex flex-col mb-[8vh] relative z-20"
          onMouseMove={handleMouseMove}
        >
          <p
            className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-[4vh] transition-colors duration-500 ${
              hoveredIndex !== null ? 'text-white' : 'text-[#6CAFBF]'
            }`}
          >
            Our Expertise
          </p>

          <div className="flex flex-col group/list">
            {servicesList.map((service, index) => (
              <div
                key={index}
                ref={(el) => addToRefs(el, listRefs)}
                className={`
                  w-full flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 
                  border-b border-black/10 py-5 md:py-6 cursor-pointer
                  transition-all duration-500 
                  ${
                    hoveredIndex !== null
                      ? 'border-white/20 text-white'
                      : 'text-black hover:text-[#6CAFBF]'
                  }
                  ${
                    hoveredIndex !== null && hoveredIndex !== index
                      ? 'opacity-30 blur-[2px]'
                      : 'opacity-100 blur-0'
                  }
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className={`text-xs md:text-base font-bold tracking-widest pointer-events-none transition-transform duration-500 ${
                    hoveredIndex === index ? 'translate-x-4' : ''
                  }`}
                >
                  0{index + 1}
                </span>
                <h3
                  className={`text-[3.5vh] md:text-[6.5vh] font-[magtis] uppercase font-extrabold leading-[1] pointer-events-none transition-transform duration-500 ${
                    hoveredIndex === index
                      ? 'translate-x-4 md:translate-x-8'
                      : ''
                  }`}
                >
                  {service}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={cursorImageRef}
        className="absolute top-0 left-0 w-[200px] h-[250px] md:w-[350px] md:h-[450px] pointer-events-none z-0 rounded-sm overflow-hidden shadow-2xl scale-75 opacity-0"
        style={{
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
          {hoverImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Service ${i}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                hoveredIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </section>
  );
};

export default WhyUs;
