'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScheduleSiteVisit from '@/components/projects/ScheduleSiteVisit';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const optimumVideo = '/assets/Flats_Img/Mayuri Optimum Walkthrough.mp4';

export interface ProjectItemData {
  id: number;
  status: 'completed' | 'ongoing';
  name: string;
  label: string;
  location: string;
  type: string;
  year: string;
  units: string;
  img: string;
  thumb: string;
  video?: string;
  size?: string;
  images?: string[];
  desc?: string;
  brochure?: string;
}

export const allProjects: ProjectItemData[] = [
  {
    id: 1,
    status: 'completed',
    name: 'Mayuri Infinity',
    label: 'MAYURI INFINITY',
    location: 'Pune, Maharashtra',
    type: 'Residential Complex',
    year: '2023',
    units: '120+ Units',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format&fit=crop',
    size: 'large',
    desc: 'Mayuri Infinity represents the zenith of contemporary residential design, offering residents an unparalleled panoramic living experience in the heart of Pune. Meticulously crafted with a focus on biophilic elements, natural light, and cross-ventilation, each residence is a sanctuary of peace.',
    brochure: '/brochure-mayuri-infinity.pdf',
  },
  {
    id: 2,
    status: 'completed',
    name: 'Mayuri Optimum',
    label: 'MAYURI OPTIMUM',
    location: 'Pune, Maharashtra',
    type: 'Commercial Tower',
    year: '2022',
    units: '200+ Units',
    video: optimumVideo,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop',
    size: 'small',
    desc: 'Setting a rigorous new benchmark for corporate architecture, Mayuri Optimum integrates sustainable energy practices with bold, geometric facade design to empower modern businesses. Bathing office suites in diffuse natural sunlight.',
    brochure: '/brochure-mayuri-optimum.pdf',
  },
  {
    id: 3,
    status: 'completed',
    name: 'Mayuri Residency',
    label: 'MAYURI RESIDENCY',
    location: 'Pune, Maharashtra',
    type: 'Luxury Apartments',
    year: '2021',
    units: '80+ Units',
    img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=600&auto=format&fit=crop',
    size: 'small',
    desc: 'An intimate enclave of boutique luxury apartments tailored strictly for families seeking an oasis of calm without compromising urban connectivity. Designed with sweeping ergonomic layouts and private foyer entrances.',
    brochure: '/brochure-mayuri-residency.pdf',
  },
  {
    id: 4,
    status: 'ongoing',
    name: 'Mayuri Adhinathpuram',
    label: 'MAYURI ADHINATHPURAM',
    location: 'Pune, Maharashtra',
    type: 'Residential Township',
    year: '2025 (Est.)',
    units: '300+ Units',
    video: 'https://www.mayurilandmarks.com/images/sliders/FlatNew1.mp4',
    img: 'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
    thumb: 'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
    images: [
      'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
      'https://www.mayurilandmarks.com/images/sliders/slide2.jpg',
      'https://www.mayurilandmarks.com/images/sliders/slide1.jpg',
      'https://www.mayurilandmarks.com/images/sliders/Web2.jpg',
      'https://www.mayurilandmarks.com/images/sliders/Web1.jpg',
      'https://www.mayurilandmarks.com/images/sliders/Web3.jpg',
    ],
    size: 'large',
    desc: 'Our flagship modern township combining visionary architecture with self-sustaining community micro-ecosystems. Spanning acres of lush landscapes with integrated jogging trails and smart parking arrays.',
    brochure: '/brochure-mayuri-adhinathpuram.pdf',
  },
  {
    id: 5,
    status: 'ongoing',
    name: 'Mayuri Optimum Phase 2',
    label: 'MAYURI OPTIMUM 2',
    location: 'Pune, Maharashtra',
    type: 'Mixed-Use Development',
    year: '2026 (Est.)',
    units: '150+ Units',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    size: 'small',
    desc: 'The next evolution of commercial and residential fusion, bringing high-tech office spaces, luxury retail arcades, and sky-deck residences under a unified architectural statement.',
    brochure: '/brochure-mayuri-optimum2.pdf',
  },
  {
    id: 6,
    status: 'ongoing',
    name: 'Mayuri Elite',
    label: 'MAYURI ELITE',
    location: 'Pune, Maharashtra',
    type: 'Luxury Villas',
    year: '2026 (Est.)',
    units: '60+ Villas',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
    size: 'small',
    desc: 'Private gated luxury villa sanctuary featuring sprawling green lawns, individual private infinity pools, and bespoke architectural finishes designed for maximum privacy.',
    brochure: '/brochure-mayuri-elite.pdf',
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const titleLines = useRef<(HTMLSpanElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [quickViewProject, setQuickViewProject] = useState<ProjectItemData | null>(null);
  const [visitModalProject, setVisitModalProject] = useState<string | null>(null);

  titleLines.current = [];
  cardRefs.current = [];

  const addTitleLine = (el: HTMLSpanElement | null) => {
    if (el && !titleLines.current.includes(el)) {
      titleLines.current.push(el);
    }
  };
  const addCard = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const filtered =
    activeTab === 'all'
      ? allProjects
      : allProjects.filter((p) => p.status === activeTab);

  const prevTab = useRef(activeTab);
  useEffect(() => {
    if (!gridRef.current) return;
    if (prevTab.current === activeTab) return;
    prevTab.current = activeTab;

    gsap.fromTo(
      gridRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, [activeTab]);

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
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!cardRefs.current.length) return;
    gsap.fromTo(
      cardRefs.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [activeTab, filtered.length]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F5F0] dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-1000 pt-[14vh] pb-[16vh] overflow-hidden"
    >
      <div className="px-4 md:px-[6vw]">
        <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#6CAFBF] mb-4">
          Great & Awesome Works
        </p>

        <div
          ref={headlineRef}
          className="mb-[6vh]"
          style={{ perspective: '1000px' }}
        >
          {['Our', 'Projects'].map((word, i) => (
            <div key={i} className="overflow-hidden leading-none">
              <span
                ref={addTitleLine}
                className="block font-[magtis] uppercase font-extrabold text-[14vw] md:text-[10vw] leading-[0.88] tracking-tighter"
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Filter Tabs & Inside Mayuri Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'completed', 'ongoing'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-500 rounded-full ${
                  activeTab === tab
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg'
                    : 'bg-transparent text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15'
                }`}
              >
                {tab === 'all' ? 'All Projects' : tab === 'completed' ? 'Completed' : 'Ongoing'}
                <span
                  className={`ml-2 text-xs font-bold transition-colors duration-300 ${
                    activeTab === tab ? 'text-[#6CAFBF]' : 'text-current opacity-50'
                  }`}
                >
                  {tab === 'all'
                    ? allProjects.length
                    : allProjects.filter((p) => p.status === tab).length}
                </span>
              </button>
            ))}

            <button
              onClick={() => router.push('/interiors')}
              className="relative px-6 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-500 rounded-full bg-transparent text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 flex items-center gap-2 group"
            >
              Inside Mayuri Homes
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50 group-hover:opacity-100 transition-opacity -rotate-45"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="text-black/50 dark:text-white/50 text-sm md:text-base font-medium max-w-xs leading-relaxed">
            Architectural landmarks crafted with precision, soul, and unyielding quality across Pune.
          </p>
        </div>
      </div>

      {/* Grid of Projects — Compact & Interactive Cards */}
      <div
        ref={gridRef}
        className="px-4 md:px-[6vw] mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((project) => (
          <div
            key={project.id}
            ref={addCard}
            className="group relative flex flex-col bg-white dark:bg-[#141414] rounded-sm overflow-hidden border border-black/8 dark:border-white/8 shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Card Media Preview */}
            <div
              className="relative w-full h-[32vh] overflow-hidden cursor-pointer bg-black"
              onClick={() => router.push(`/project/${project.id}`)}
            >
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    project.status === 'completed' ? 'bg-emerald-400' : 'bg-[#6CAFBF]'
                  }`}
                />
                <span className="text-white text-[10px] tracking-widest uppercase font-bold">
                  {project.status === 'completed' ? 'Completed' : 'Ongoing'}
                </span>
              </div>

              {/* Units Tag */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-[10px] tracking-widest uppercase font-bold">
                {project.units}
              </div>

              {/* Project Label Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-[magtis] uppercase font-extrabold text-white text-2xl md:text-3xl leading-none tracking-tight group-hover:text-[#6CAFBF] transition-colors">
                  {project.label}
                </h3>
                <div className="flex items-center gap-3 text-white/60 text-xs mt-1">
                  <span>{project.type}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                </div>
              </div>
            </div>

            {/* Card Content & Progressive Disclosure */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-4">
              <p className="text-black/70 dark:text-white/70 text-xs md:text-sm line-clamp-2 leading-relaxed font-medium">
                {project.desc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/8 dark:border-white/8">
                <button
                  onClick={() => router.push(`/project/${project.id}`)}
                  className="flex-1 px-4 py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold text-[11px] tracking-widest uppercase rounded-sm hover:bg-[#6CAFBF] dark:hover:bg-[#6CAFBF] dark:hover:text-black transition-colors text-center"
                >
                  Explore Project
                </button>

                <button
                  onClick={() => setQuickViewProject(project)}
                  className="px-3 py-2.5 border border-black/15 dark:border-white/15 text-black dark:text-white hover:border-[#6CAFBF] hover:text-[#6CAFBF] font-bold text-[11px] tracking-widest uppercase rounded-sm transition-colors"
                  title="Quick View"
                >
                  Quick View
                </button>

                <button
                  onClick={() => setVisitModalProject(project.name)}
                  className="px-3 py-2.5 bg-[#6CAFBF] text-black font-bold text-[11px] tracking-widest uppercase rounded-sm hover:bg-black hover:text-white transition-colors"
                  title="Book Site Visit"
                >
                  Book Visit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal Overlay (Progressive Disclosure without page change) */}
      {quickViewProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#F5F5F0] dark:bg-[#121212] rounded-sm overflow-hidden shadow-2xl my-8 border border-black/10 dark:border-white/10">
            <button
              onClick={() => setQuickViewProject(null)}
              className="absolute top-4 right-4 z-50 text-black dark:text-white bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="relative w-full h-[40vh] bg-black">
              <img
                src={quickViewProject.img}
                alt={quickViewProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#6CAFBF] text-xs tracking-[0.25em] uppercase font-bold">
                  {quickViewProject.type}
                </span>
                <h2 className="font-[magtis] text-3xl md:text-5xl uppercase font-extrabold text-white">
                  {quickViewProject.label}
                </h2>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-widest uppercase text-black/60 dark:text-white/60 border-b border-black/10 dark:border-white/10 pb-4">
                <span>Location: {quickViewProject.location}</span>
                <span>•</span>
                <span>Completion: {quickViewProject.year}</span>
                <span>•</span>
                <span>Capacity: {quickViewProject.units}</span>
              </div>

              <p className="text-black/80 dark:text-white/80 text-sm md:text-base leading-relaxed font-medium">
                {quickViewProject.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    const id = quickViewProject.id;
                    setQuickViewProject(null);
                    router.push(`/project/${id}`);
                  }}
                  className="px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-[#6CAFBF] dark:hover:bg-[#6CAFBF] transition-colors"
                >
                  Full Details & Gallery
                </button>

                <button
                  onClick={() => {
                    const name = quickViewProject.name;
                    setQuickViewProject(null);
                    setVisitModalProject(name);
                  }}
                  className="px-8 py-3.5 bg-[#6CAFBF] text-black font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-black hover:text-white transition-colors"
                >
                  Schedule Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Site Visit Booking Modal Triggered from Card */}
      {visitModalProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#F5F5F0] dark:bg-[#0A0A0A] rounded-md overflow-hidden shadow-2xl my-8">
            <button
              onClick={() => setVisitModalProject(null)}
              className="absolute top-4 right-4 z-50 text-black dark:text-white bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 p-3 rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="p-4 md:p-8">
              <ScheduleSiteVisit projectName={visitModalProject} />
            </div>
          </div>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="px-4 md:px-[6vw] mt-[10vh]">
        <div className="w-full border border-black/10 dark:border-white/10 rounded-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/10 dark:divide-white/10">
          {[
            { value: '15+', label: 'Years of Excellence' },
            { value: '50+', label: 'Projects Delivered' },
            { value: '5000+', label: 'Happy Families' },
            { value: '100%', label: 'Commitment' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 p-6 md:p-10 group hover:bg-black transition-colors duration-500 cursor-default"
            >
              <span className="font-[magtis] text-[4vh] md:text-[6vh] font-extrabold leading-none tracking-tight group-hover:text-[#6CAFBF] transition-colors duration-500">
                {stat.value}
              </span>
              <span className="text-black/40 text-xs tracking-[0.2em] uppercase font-semibold group-hover:text-white/50 transition-colors duration-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
