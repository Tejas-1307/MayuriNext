'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { allProjectsData, ProjectItem } from '@/lib/projectsData';
import ScheduleSiteVisit from './ScheduleSiteVisit';
import EmiCalculator from '@/components/cro/EmiCalculator';
import NearbySection from '@/components/location/NearbySection';
import LocationMap from '@/components/location/LocationMap';
import BrochureSection from './BrochureSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NextProjectStripProps {
  nextProject: ProjectItem;
  navigate: (url: string) => void;
}

const NextProjectStrip: React.FC<NextProjectStripProps> = ({
  nextProject,
  navigate,
}) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const imgPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: stripRef.current, start: 'top 90%' },
        }
      );
      gsap.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: { trigger: stripRef.current, start: 'top 88%' },
        }
      );
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.3,
          scrollTrigger: { trigger: stripRef.current, start: 'top 88%' },
        }
      );
      gsap.fromTo(
        arrowRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: { trigger: stripRef.current, start: 'top 88%' },
        }
      );
    }, stripRef);
    return () => ctx.revert();
  }, [nextProject]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const onMove = (e: MouseEvent) => {
      const rect = strip.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const tick = () => {
      const img = imgRef.current;
      if (!img) return;
      imgPos.current.x += (mousePos.current.x - imgPos.current.x) * 0.08;
      imgPos.current.y += (mousePos.current.y - imgPos.current.y) * 0.08;
      img.style.transform = `translate(${imgPos.current.x - 120}px, ${
        imgPos.current.y - 90
      }px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      gsap.to(imgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      gsap.to(imgRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.4,
        ease: 'power3.in',
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    strip.addEventListener('mousemove', onMove);
    strip.addEventListener('mouseenter', onEnter);
    strip.addEventListener('mouseleave', onLeave);
    return () => {
      strip.removeEventListener('mousemove', onMove);
      strip.removeEventListener('mouseenter', onEnter);
      strip.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [nextProject]);

  const handleStripMouseEnter = () => {
    gsap.to(arrowRef.current, {
      x: 8,
      rotate: 0,
      duration: 0.4,
      ease: 'power3.out',
    });
  };
  const handleStripMouseLeave = () => {
    gsap.to(arrowRef.current, {
      x: 0,
      rotate: -45,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const marqueeText = `${nextProject.name} — ${nextProject.type} — ${nextProject.location} — `.repeat(
    6
  );

  return (
    <div
      ref={stripRef}
      onClick={() => navigate(`/project/${nextProject.id}`)}
      onMouseEnter={handleStripMouseEnter}
      onMouseLeave={handleStripMouseLeave}
      className="relative w-full cursor-pointer overflow-hidden select-none"
      style={{ background: '#F5F5F0' }}
    >
      <div
        ref={lineRef}
        className="w-full h-[1px] bg-black/15"
        style={{ transformOrigin: 'left' }}
      />

      <div
        ref={imgRef}
        className="pointer-events-none absolute top-0 left-0 w-[240px] h-[180px] z-30 overflow-hidden rounded-sm shadow-2xl"
        style={{ opacity: 0, scale: 0.85, willChange: 'transform' }}
      >
        {nextProject.video ? (
          <video
            src={nextProject.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={nextProject.thumb || nextProject.img}
            alt={nextProject.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="px-4 md:px-[6vw] py-12 md:py-16 flex flex-col gap-6 relative z-10">
        <div
          ref={labelRef}
          className="flex items-center gap-4"
          style={{ opacity: 0 }}
        >
          <span className="text-[#6CAFBF] text-[10px] tracking-[0.45em] uppercase font-bold">
            Next Project
          </span>
          <span className="flex-1 h-[1px] bg-black/10" />
          <span className="text-black/30 text-[10px] tracking-[0.3em] uppercase font-mono">
            {String(nextProject.id).padStart(2, '0')} /{' '}
            {String(allProjectsData.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-end justify-between gap-6 md:gap-10">
          <h2
            ref={titleRef}
            className="font-[magtis] uppercase font-extrabold leading-[0.88] tracking-tighter text-black"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 9rem)', opacity: 0 }}
          >
            {nextProject.name}
          </h2>

          <div
            ref={arrowRef}
            className="shrink-0 flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-black text-white mb-2"
            style={{ opacity: 0 }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ transform: 'rotate(-45deg)' }}
            >
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {[
            nextProject.type,
            nextProject.location,
            nextProject.year,
            nextProject.units,
          ].map((tag, i) => (
            <span
              key={i}
              className="text-black/40 text-xs tracking-[0.25em] uppercase font-medium border border-black/10 px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          <span
            className={`text-xs tracking-[0.25em] uppercase font-bold px-3 py-1.5 rounded-full ${
              nextProject.status === 'completed'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-amber-50 text-amber-600 border border-amber-200'
            }`}
          >
            {nextProject.status === 'completed' ? '✓ Completed' : '⬤ Ongoing'}
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden border-t border-black/8 bg-black py-4">
        <div className="next-strip-marquee flex whitespace-nowrap w-max">
          {marqueeText.split('').map((char, i) => (
            <span
              key={i}
              className="font-[magtis] uppercase font-extrabold text-white/[0.07] tracking-widest"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-black/8" />
    </div>
  );
};

interface ProjectDetailsProps {
  id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ id }) => {
  const router = useRouter();
  const currentId = parseInt(id, 10);

  const currentIndex = allProjectsData.findIndex((p) => p.id === currentId);
  const project = allProjectsData[currentIndex];

  const nextProject =
    allProjectsData[
      currentIndex === allProjectsData.length - 1 ? 0 : currentIndex + 1
    ];

  const pageRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const infoBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blueprintRef = useRef<HTMLImageElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);

  titleCharsRef.current = [];
  infoBlockRefs.current = [];

  const addToRefs = (
    el: HTMLElement | null,
    refArr: React.MutableRefObject<(HTMLElement | null)[]>
  ) => {
    if (el && !refArr.current.includes(el)) {
      refArr.current.push(el);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    if (!project) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        heroImgRef.current,
        { scale: 1.25, filter: 'brightness(0.2)' },
        { scale: 1, filter: 'brightness(1)', duration: 2.5, ease: 'power4.out' }
      ).fromTo(
        titleCharsRef.current,
        { y: 150, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          stagger: 0.05,
          ease: 'power4.out',
        },
        '-=1.8'
      );

      gsap.fromTo(
        infoBlockRefs.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: infoBlockRefs.current[0], start: 'top 85%' },
        }
      );

      gsap.to(heroImgRef.current, {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: '80% top',
          scrub: true,
        },
      });

      gsap.fromTo(
        blueprintRef.current,
        { y: 50, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: blueprintRef.current, start: 'top 80%' },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  useEffect(() => {
    if (!project || !gallerySectionRef.current || !galleryTrackRef.current)
      return;

    const section = gallerySectionRef.current;
    const track = galleryTrackRef.current;
    const panels = track.querySelectorAll('.gallery-panel');
    const imgs = track.querySelectorAll('.gallery-panel-img');

    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
    const progressBar = section.querySelector('#gallery-progress-bar') as HTMLElement;

    const hTween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBar) {
            progressBar.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    panels.forEach((panel) => {
      gsap.fromTo(
        panel,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: hTween,
            start: 'left 95%',
            end: 'left 50%',
            scrub: 0.5,
          },
        }
      );
    });

    imgs.forEach((img) => {
      gsap.fromTo(
        img,
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            containerAnimation: hTween,
            start: 'left right',
            end: 'right left',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [project]);

  if (!project) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#F5F5F0] dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-1000">
        <h1 className="text-4xl md:text-6xl font-[magtis] uppercase font-extrabold tracking-tight">
          Project Not Found
        </h1>
        <button
          onClick={() => router.push('/')}
          className="mt-8 px-10 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-widest text-xs"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  const titleChars = project.label.split('');
  const blueprintSrc = `/assets/images/blueprints/blueprint_${
    (project.id % 3) + 1
  }.png`;

  return (
    <div
      ref={pageRef}
      className="w-full min-h-screen bg-[#F5F5F0] dark:bg-[#080808] text-black dark:text-white transition-colors duration-1000 select-none overflow-hidden"
    >
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <div className="font-[magtis] text-xl md:text-2xl font-bold uppercase tracking-widest">
          Mayuri <span className="text-[#6CAFBF]">LLP</span>
        </div>
        <button
          onClick={() => router.push('/')}
          className="group flex items-center gap-3 pointer-events-auto hover:text-[#6CAFBF] transition-colors duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="rotate-180 transition-transform duration-500 group-hover:-translate-x-2"
          >
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs uppercase font-bold tracking-[0.25em]">
            Back to Overview
          </span>
        </button>
      </header>

      <section className="relative w-full h-[90vh] md:h-[100vh] overflow-hidden bg-black flex items-center justify-center rounded-b-sm md:rounded-b-[20px]">
        <div className="absolute inset-0 w-full h-[120%] -top-[10%] origin-center">
          {project.video ? (
            <video
              ref={heroImgRef as React.RefObject<HTMLVideoElement>}
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              ref={heroImgRef as React.RefObject<HTMLImageElement>}
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 mt-[10vh] overflow-hidden pointer-events-none">
          <p className="text-[#6CAFBF] text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-4 md:mb-8 text-center drop-shadow-lg">
            {project.status === 'completed'
              ? 'Delivered Masterpiece'
              : 'Vision in Progress'}
          </p>
          <h1
            className="font-[magtis] uppercase font-extrabold text-white leading-[0.85] tracking-tighter text-center flex flex-wrap justify-center overflow-hidden max-w-[95vw]"
            style={{ fontSize: 'clamp(4rem, 13vw, 18rem)' }}
          >
            {titleChars.map((char, index) => (
              <span
                key={index}
                ref={(el) => addToRefs(el, titleCharsRef)}
                className="inline-block"
                style={{ width: char === ' ' ? '3vw' : 'auto' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-[slide_2s_infinite]" />
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-[8vw] py-[20vh]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[10vh] md:gap-[15vw]">
          <div
            ref={(el) => addToRefs(el, infoBlockRefs)}
            className="flex flex-col gap-8 md:gap-12"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-[#6CAFBF] text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
                Concept & Overview
              </h3>
              <div className="h-[2px] w-24 bg-black/10 dark:bg-white/10 mt-2" />
            </div>
            <p className="text-base md:text-xl lg:text-2xl font-medium leading-[1.7] md:leading-[1.6] text-black/80 dark:text-white/80 transition-colors duration-1000 text-left">
              {project.desc}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-y-16 gap-x-12 pt-[8vh] lg:pt-0 border-t lg:border-t-0 border-black/10 dark:border-white/10 lg:border-l lg:pl-[5vw] transition-colors duration-1000">
            {[
              { label: 'Prime Location', value: project.location },
              { label: 'Typology', value: project.type },
              { label: 'Completion', value: project.year },
              { label: 'Scale', value: project.units },
              { label: 'MahaRERA Registration No.', value: 'P52100049330' },
            ].map((detail, idx) => (
              <div
                key={idx}
                ref={(el) => addToRefs(el, infoBlockRefs)}
                className="flex flex-col gap-3"
              >
                <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-black/40 dark:text-white/40 transition-colors duration-1000">
                  {detail.label}
                </span>
                <span className="font-[magtis] text-lg md:text-3xl uppercase font-extrabold leading-none text-black dark:text-white transition-colors duration-1000">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Brochure Download Section */}
      <BrochureSection
        projectName={project.name}
        brochureUrl="/brochure-mayuri-adhinathpuram.pdf"
        pdfFilename="Mayuri-Adhinathpuram-Brochure.pdf"
      />

      <section className="relative w-full h-[80vh] mt-[10vh] md:h-[100vh] border-y border-black/10 dark:border-white/10 flex items-center justify-center p-4 md:p-8 bg-[#F5F5F0] dark:bg-[#080808] transition-colors duration-1000 overflow-hidden font-mono text-[8px] md:text-[10px] uppercase">
        <div className="absolute top-6 md:top-8 left-4 md:left-8 tracking-[0.2em] opacity-50 z-10 flex flex-col md:flex-row md:items-center">
          <span>
            PROYECTO <span className="mx-2 hidden md:inline">▸▸▸</span>
          </span>
          <span className="mt-1 md:mt-0 font-bold bg-black text-white dark:bg-white dark:text-black py-1 px-2 mb-2 md:mb-0">
            [CFB] / [{project.id.toString().padStart(3, '0')}] / [{project.label}]
          </span>
        </div>

        <div className="absolute top-6 md:top-8 right-4 md:right-8 tracking-[0.2em] opacity-50 z-10 flex flex-col md:flex-row gap-2 md:gap-8 text-right md:text-left">
          <span>
            FINALIZACION:<span className="mx-1 md:mx-2">▸</span>
            {project.year.includes('Est') ? 'W.I.P' : 'DONE'}
          </span>
          <span>
            SUPERFICIE:<span className="mx-1 md:mx-2">▸</span>
            {project.units}
          </span>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 -rotate-90 origin-left tracking-[0.3em] opacity-40 z-10 hidden md:block">
          [ARCHITECTURAL. / ISO. {project.id}]
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 rotate-90 origin-right tracking-[0.3em] opacity-40 z-10 hidden md:block">
          [VECTOR. / SCHEMATIC.]
        </div>

        <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 flex flex-col gap-2 tracking-[0.2em] opacity-50 z-10">
          <span>[38*59'19"N] ▄ [0*31'00"O]</span>
          <div className="flex gap-4 mt-2 font-bold">
            <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors">
              [COOKIES]
            </span>
            <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors">
              [PRIVACY]
            </span>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-8 right-4 md:right-8 flex flex-col gap-2 text-right tracking-[0.2em] opacity-50 z-10">
          <div className="flex justify-end gap-1 mb-2">
            <span>▼</span>
            <span>▼</span>
            <span>▼</span>
          </div>
          <span>[MH] [PUNE]</span>
          <span className="hover:text-[#6CAFBF] cursor-pointer mt-2 font-bold transition-colors">
            [PRESSKIT]
          </span>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-4 md:gap-8 tracking-[0.2em] opacity-40 z-10 font-bold">
          <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors">
            [DEV.S]
          </span>
          <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors hidden md:inline">
            [INSTAGRAM]
          </span>
          <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors hidden md:inline">
            [LINKEDIN]
          </span>
          <span className="hover:text-[#6CAFBF] cursor-pointer transition-colors">
            [W.D.C]
          </span>
        </div>

        <div className="relative w-[95%] md:w-[75%] h-[60%] md:h-[75%] z-0 flex items-center justify-center mix-blend-multiply dark:mix-blend-screen opacity-90 dark:invert transition-all duration-1000">
          <img
            ref={blueprintRef}
            src={blueprintSrc}
            alt="Architectural Blueprint"
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      <section
        ref={gallerySectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
          <div className="w-full h-[2px] bg-black/[0.06] dark:bg-white/[0.06]">
            <div
              id="gallery-progress-bar"
              className="h-full bg-[#6CAFBF] origin-left"
              style={{ transform: 'scaleX(0)', transition: 'transform 0.1s linear' }}
            />
          </div>
          <div className="flex items-center justify-between px-6 md:px-12 py-5">
            <span className="text-[10px] tracking-[0.45em] uppercase font-bold text-[#6CAFBF]">
              Project Gallery
            </span>
            <span className="font-[magtis] text-sm md:text-base uppercase font-extrabold text-black/20 dark:text-white/20 tracking-widest">
              {project.label}
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-black/30 dark:text-white/30">
              {project.images?.length} Visuals
            </span>
          </div>
        </div>

        <div
          ref={galleryTrackRef}
          className="flex h-full items-stretch will-change-transform"
          style={{ width: 'max-content' }}
        >
          <div
            className="shrink-0 flex flex-col justify-end pb-16 pl-8 md:pl-16 pr-10 bg-[#F5F5F0] dark:bg-[#080808] border-r border-black/8 dark:border-white/8"
            style={{ width: 'clamp(280px, 35vw, 520px)' }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#6CAFBF] mb-4">
              Scroll →
            </p>
            <h2
              className="font-[magtis] uppercase font-extrabold leading-[0.85] tracking-tighter text-black dark:text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}
            >
              Visual<br />Journey.
            </h2>
            <p className="text-black/40 dark:text-white/40 text-sm font-medium leading-relaxed max-w-[220px]">
              A curated series of visuals from {project.name} — captured to inspire.
            </p>
            <div
              className="mt-8 font-[magtis] font-extrabold text-black/[0.05] dark:text-white/[0.05] leading-none select-none"
              style={{ fontSize: 'clamp(5rem, 10vw, 13rem)' }}
            >
              {String(project.id).padStart(2, '0')}
            </div>
          </div>

          {project.images?.map((imgUrl, idx) => {
            const isPortrait = idx % 3 === 1;
            const panelW = isPortrait
              ? 'clamp(260px, 40vw, 580px)'
              : 'clamp(340px, 58vw, 860px)';
            const label = String(idx + 1).padStart(2, '0');
            const total = String(project.images.length).padStart(2, '0');

            return (
              <div
                key={idx}
                className="gallery-panel shrink-0 relative group cursor-crosshair border-r border-black/8 dark:border-white/[0.06]"
                style={{ width: panelW }}
              >
                <div className="gallery-clip absolute inset-0 overflow-hidden">
                  <img
                    className="gallery-panel-img w-full h-full object-cover"
                    src={imgUrl}
                    alt={`${project.label} — Visual ${idx + 1}`}
                    style={{
                      willChange: 'transform',
                      transform: 'translateX(-6%)',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-black/[0.04] group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                </div>

                <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-1 mix-blend-difference text-white">
                  <span
                    className="font-[magtis] font-extrabold leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)' }}
                  >
                    {label}
                  </span>
                  <span className="text-[9px] tracking-[0.35em] uppercase font-mono opacity-60">
                    / {total}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="bg-[#F5F5F0]/95 dark:bg-[#080808]/95 backdrop-blur-md px-6 py-5 flex items-end justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#6CAFBF] text-[9px] tracking-[0.4em] uppercase font-bold">
                        {project.type}
                      </span>
                      <span className="font-[magtis] uppercase font-extrabold text-black dark:text-white text-lg leading-tight">
                        {project.name} · {label}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white dark:text-black"
                        style={{ transform: 'rotate(-45deg)' }}
                      >
                        <path
                          d="M5 12H19M19 12L13 6M19 12L13 18"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div
            className="shrink-0 flex flex-col items-center justify-center gap-6 px-16 bg-[#080808] dark:bg-[#F5F5F0]"
            style={{ width: 'clamp(240px, 28vw, 400px)' }}
          >
            <div className="w-[1px] h-16 bg-white/20 dark:bg-black/20" />
            <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#6CAFBF] text-center">
              End of Gallery
            </p>
            <p
              className="font-[magtis] uppercase font-extrabold text-white dark:text-black text-center leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 3rem)' }}
            >
              {project.name}.
            </p>
            <div className="w-[1px] h-16 bg-white/20 dark:bg-black/20" />
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F5F5F0] dark:bg-[#0C0C0C] text-black dark:text-white py-[10vh] px-4 md:px-[6vw] border-t border-black/10 dark:border-white/10 select-none">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[6vh]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest">
                MAHA RERA Registered: P52100049330
              </span>
            </div>

            <h2 className="font-[magtis] text-3xl md:text-5xl uppercase font-extrabold tracking-tight">
              Floor Plans & <span className="text-[#6CAFBF]">Layouts</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 rounded-sm p-6 md:p-10 shadow-xl">
          <div className="space-y-6">
            <div>
              <span className="text-[#6CAFBF] text-xs font-bold tracking-[0.2em] uppercase">
                Configured for {project.name}
              </span>
              <h3 className="font-[magtis] text-2xl md:text-3xl uppercase font-bold text-black dark:text-white mt-1">
                2 & 3 BHK Luxury Residences
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-black/10 dark:border-white/10 py-4 text-xs">
              <div>
                <span className="text-black/40 dark:text-white/40 block font-bold uppercase">Carpet Area</span>
                <span className="font-bold text-base text-black dark:text-white">850 - 1,450 Sq. Ft.</span>
              </div>
              <div>
                <span className="text-black/40 dark:text-white/40 block font-bold uppercase">Orientation</span>
                <span className="font-bold text-base text-black dark:text-white">East-West Vastu Compliant</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-black/50 dark:text-white/50 tracking-wider">
                Structural & Architectural Specifications
              </span>
              <ul className="space-y-2 text-xs md:text-sm text-black/80 dark:text-white/80 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF]" />
                  <span>Earthquake Resistant RCC Frame Structure</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF]" />
                  <span>Premium Vitrified Tile Flooring (800x800 mm)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF]" />
                  <span>3-Tier Video Door Security System & Solar Hot Water</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6CAFBF]" />
                  <span>Concealed Polycab/Finolex Wiring with Modular Switches</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`/brochure-${project.name.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                download={`${project.name.replace(/\s+/g, '-')}-Brochure.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-[#6CAFBF] dark:hover:bg-[#6CAFBF] dark:hover:text-black transition-colors cursor-pointer"
              >
                Download E-Brochure (PDF)
              </a>
            </div>
          </div>

          <div className="relative h-[40vh] md:h-[45vh] bg-black/5 dark:bg-white/5 rounded-sm overflow-hidden flex items-center justify-center p-6 border border-black/10 dark:border-white/10">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
              alt={`${project.name} Floor Plan`}
              className="w-full h-full object-contain filter dark:invert"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[10px] text-white font-mono">
              Scale 1:100 Architect Blueprint
            </div>
          </div>
        </div>
      </section>

      <EmiCalculator projectName={project.name} />

      <NearbySection
        projectName={project.name}
        subheading={`Everything your family needs, just minutes from ${project.name}.`}
      />

      <LocationMap
        projectName={project.name}
        address={
          project.name === 'Mayuri Adhinathpuram'
            ? '53/8, Wadachi Wadi Road, Undri, Pune – 411 060'
            : project.name === 'Optimum'
              ? 'Mayuri Optimum, CWX6+45F, Pisoli Rd, Pisoli, Pune, Maharashtra 411060'
              : project.name === 'Residency'
                ? 'MAYURI RESIDENCY, Autadwadi Handewadi, Handewadi, Pune, Maharashtra 412308'
                : `${project.name}, ${project.location}`
        }
        googleMapsUrl={
          project.name === 'Infinity'
            ? 'https://www.google.com/maps/place/Mayuri+Infinity/@18.4519829,73.9224519,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2eb2cf6eb98b5:0xb83d5d59d026ea1!8m2!3d18.4519829!4d73.9250268!16s%2Fg%2F11jlh3t9sj?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D'
            : `https://maps.google.com/?q=${encodeURIComponent(
                project.name === 'Mayuri Adhinathpuram'
                  ? '53/8, Wadachi Wadi Road, Undri, Pune – 411 060'
                  : project.name === 'Optimum'
                    ? 'Mayuri Optimum, CWX6+45F, Pisoli Rd, Pisoli, Pune, Maharashtra 411060'
                    : project.name === 'Residency'
                      ? 'MAYURI RESIDENCY, Autadwadi Handewadi, Handewadi, Pune, Maharashtra 412308'
                      : `${project.name}, ${project.location}`
              )}`
        }
        subheading={`Situated in one of Pune's fastest-growing neighborhoods, ${project.name} offers seamless connectivity while preserving the calm and comfort of residential living.`}
      />

      <ScheduleSiteVisit projectName={project.name} />

      <NextProjectStrip nextProject={nextProject} navigate={(url) => router.push(url)} />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .next-strip-marquee { animation: marquee 18s linear infinite; }
        .next-strip-marquee:hover { animation-play-state: paused; }
      `}} />
    </div>
  );
};

export default ProjectDetails;
