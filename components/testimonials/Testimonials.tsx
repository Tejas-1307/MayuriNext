'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Quote,
  CheckCircle2,
  Star,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  Calendar,
  Users,
  Heart,
  ShieldCheck,
  ArrowRight,
  Award,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ClientStory {
  id: number;
  name: string;
  signatureName: string;
  signatureSub: string;
  avatar: string;
  verified: boolean;
  rating: number;
  purchasedProject: string;
  configuration: string;
  possessionDate: string;
  city: string;
  location: string;
  occupation: string;
  familySize: string;
  headlineQuote: string;
  storyParagraph1: string;
  storyParagraph2: string;
  favoriteRoom: string;
  bestMemory: string;
  builderExperience: string;
  constructionQuality: string;
  neighborhoodRating: string;
  wouldRecommend: string;
  hasVideo: boolean;
  videoUrl?: string;
  heroMedia: string;
  gallery: {
    key: 'living' | 'balcony' | 'family' | 'construction';
    label: string;
    img: string;
  }[];
}

const clientStories: ClientStory[] = [
  {
    id: 1,
    name: 'Rahul & Priya Deshmukh',
    signatureName: '— Rahul & Priya Deshmukh',
    signatureSub: 'Homeowners at Mayuri Infinity since 2023',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    verified: true,
    rating: 5,
    purchasedProject: 'Mayuri Infinity',
    configuration: '3.5 BHK Sky Residence',
    possessionDate: 'Nov 2023',
    city: 'Pune, MH',
    location: 'Baner-Pashan Link Rd',
    occupation: 'Tech Enterprise Director & Architect',
    familySize: 'Family of 4',
    headlineQuote: 'The first morning we opened the balcony doors, we knew this was home.',
    storyParagraph1:
      'We spent over eight months searching across western Pune for a home that didn’t feel like another rigid concrete box. The moment we stepped into Mayuri Infinity, the double-height ceiling and immediate natural airflow felt transformative.',
    storyParagraph2:
      'Our daughter chose her bedroom before we even unpacked our first box. We finally found a sanctuary where our weekends feel genuinely peaceful, far removed from weekday corporate chaos.',
    favoriteRoom: 'Sunrise Breakfast Balcony',
    bestMemory: 'Hosting Diwali dinner under starry skies on our private deck.',
    builderExperience: '5.0 / 5.0',
    constructionQuality: 'Flawless Finish',
    neighborhoodRating: '4.9 / 5.0',
    wouldRecommend: '100% Yes',
    hasVideo: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    heroMedia: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      {
        key: 'living',
        label: 'Living Haven',
        img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'balcony',
        label: 'Sunrise Terrace',
        img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'family',
        label: 'Family Moments',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'construction',
        label: 'Build Precision',
        img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 2,
    name: 'Meera & Dr. Vikram Kulkarni',
    signatureName: '— Meera & Dr. Vikram Kulkarni',
    signatureSub: 'Residents at Mayuri Optimum since 2022',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    verified: true,
    rating: 5,
    purchasedProject: 'Mayuri Optimum',
    configuration: 'Luxury 3 BHK Penthouse',
    possessionDate: 'Aug 2022',
    city: 'Pune, MH',
    location: 'Wakad Central',
    occupation: 'Senior Surgeon & Business Founder',
    familySize: 'Family of 3',
    headlineQuote: 'After long hospital shifts, entering this calm space restores my energy.',
    storyParagraph1:
      'In my profession, peace of mind isn’t a luxury—it’s an absolute necessity. The sound insulation and acoustic privacy engineering at Mayuri Optimum exceeded every expectation.',
    storyParagraph2:
      'The engineering team delivered every single promised fixture three weeks ahead of schedule. The transparent handover process gave us total confidence from day one.',
    favoriteRoom: 'Master Zen Suite',
    bestMemory: 'Quiet Sunday morning coffee with unobstructed hill vistas.',
    builderExperience: '5.0 / 5.0',
    constructionQuality: 'Acoustic Precision',
    neighborhoodRating: '4.8 / 5.0',
    wouldRecommend: '100% Yes',
    hasVideo: false,
    heroMedia: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      {
        key: 'living',
        label: 'Lounge Sanctuary',
        img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'balcony',
        label: 'Sky Deck',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'family',
        label: 'Warm Celebrations',
        img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'construction',
        label: 'Structure Handover',
        img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 3,
    name: 'Suresh & Sunita Patil',
    signatureName: '— Suresh & Sunita Patil',
    signatureSub: 'Homeowners at Mayuri Residency since 2021',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    verified: true,
    rating: 5,
    purchasedProject: 'Mayuri Residency',
    configuration: '2.5 BHK Garden Home',
    possessionDate: 'Dec 2021',
    city: 'Pune, MH',
    location: 'Kothrud Green Zone',
    occupation: 'Retired Bank General Manager',
    familySize: 'Grandparents & Family',
    headlineQuote: 'I have lived in five cities. This is the first place that truly feels permanent.',
    storyParagraph1:
      'When retiring after 35 years of relocation, we wanted a community that felt safe, walkable, and surrounded by warm neighbors. Mayuri Residency provided exactly that sense of deep belonging.',
    storyParagraph2:
      'Our grandchildren run freely across the landscaped garden walkways every evening. It feels like the neighborhood communities we grew up in.',
    favoriteRoom: 'Private Courtyard Patio',
    bestMemory: 'Watching our grandson learn to ride a bicycle in the car-free green zone.',
    builderExperience: '5.0 / 5.0',
    constructionQuality: 'Solid Masonry',
    neighborhoodRating: '5.0 / 5.0',
    wouldRecommend: '100% Yes',
    hasVideo: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    heroMedia: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      {
        key: 'living',
        label: 'Family Room',
        img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'balcony',
        label: 'Garden Terrace',
        img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'family',
        label: 'Grandchildren Play',
        img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'construction',
        label: 'Quality Handover',
        img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 4,
    name: 'Anjali & Rohan Desai',
    signatureName: '— Anjali & Rohan Desai',
    signatureSub: 'Investors & Residents at Mayuri Infinity II since 2024',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    verified: true,
    rating: 5,
    purchasedProject: 'Mayuri Infinity II',
    configuration: '4 BHK Duplex Estate',
    possessionDate: 'Jan 2024',
    city: 'Pune, MH',
    location: 'Baner Hills View',
    occupation: 'Fintech Co-Founder & UX VP',
    familySize: 'Family of 4',
    headlineQuote: 'Investing here was the best decision we made for our family’s future.',
    storyParagraph1:
      'We evaluated luxury developments across Mumbai and Pune before choosing Mayuri Landmarks. The architectural detailing and transparent customer relation process stood in a class of its own.',
    storyParagraph2:
      'The layout allows our remote working lifestyle to coexist seamlessly with our kids’ creative play areas without feeling noisy or cramped.',
    favoriteRoom: 'Duplex Work Sanctuary',
    bestMemory: 'New Year sunset party with panoramic city views.',
    builderExperience: '5.0 / 5.0',
    constructionQuality: 'Ultra Luxury Finishes',
    neighborhoodRating: '4.9 / 5.0',
    wouldRecommend: '100% Yes',
    hasVideo: false,
    heroMedia: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      {
        key: 'living',
        label: 'Duplex Foyer',
        img: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'balcony',
        label: 'Sky Deck',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'family',
        label: 'Evening Lounge',
        img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'construction',
        label: 'Facade Elevation',
        img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 5,
    name: 'Vikram & Sunita Joshi',
    signatureName: '— Vikram & Sunita Joshi',
    signatureSub: 'Villa Owners at Mayuri Elite since 2024',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    verified: true,
    rating: 5,
    purchasedProject: 'Mayuri Elite',
    configuration: 'Bespoke Luxury Villa',
    possessionDate: 'Mar 2024',
    city: 'Pune, MH',
    location: 'Bavdhan Valley',
    occupation: 'Industrialist & Philanthropist',
    familySize: 'Multi-Generational Family',
    headlineQuote: 'The level of bespoke craftsmanship simply has no parallel in Pune.',
    storyParagraph1:
      'We wanted a multi-generational estate where three generations could live together with both privacy and shared connection. The custom courtyard and private elevator design exceeded our visions.',
    storyParagraph2:
      'From custom marble selection to landscaped private pools, Mayuri’s craftsmanship team treated our home like their own passion project.',
    favoriteRoom: 'Private Courtyard Pool',
    bestMemory: 'Family anniversary dinner surrounded by water reflections.',
    builderExperience: '5.0 / 5.0',
    constructionQuality: 'Bespoke Perfection',
    neighborhoodRating: '5.0 / 5.0',
    wouldRecommend: '100% Yes',
    hasVideo: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    heroMedia: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      {
        key: 'living',
        label: 'Villa Courtyard',
        img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'balcony',
        label: 'Poolside Lawn',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'family',
        label: 'Grand Dining',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      },
      {
        key: 'construction',
        label: 'Architectural Stone',
        img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop',
      },
    ],
  },
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMediaKey, setActiveMediaKey] = useState<'living' | 'balcony' | 'family' | 'construction'>('living');
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const activeStory = clientStories[activeIndex];

  const goTo = (idx: number) => {
    const next = (idx + clientStories.length) % clientStories.length;
    setActiveIndex(next);
    setActiveMediaKey('living');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (videoModalOpen) {
        if (e.key === 'Escape') setVideoModalOpen(false);
        return;
      }
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      else if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, videoModalOpen]);

  // GSAP Choreographed Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee Ticker Continuous Scroll
      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          xPercent: -50,
          duration: 38,
          ease: 'none',
          repeat: -1,
        });
      }

      // Section Headline Mask Reveal
      if (headlineRef.current) {
        const titleLines = headlineRef.current.querySelectorAll('.story-title-line');
        gsap.fromTo(
          titleLines,
          { y: '110%', opacity: 0, rotateX: -15 },
          {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            duration: 1.5,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 82%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Left Panel smooth transition on story change
  useEffect(() => {
    if (!leftPanelRef.current) return;
    gsap.fromTo(
      leftPanelRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [activeIndex]);

  const activeMediaObj =
    activeStory.gallery.find((g) => g.key === activeMediaKey) || activeStory.gallery[0];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F5F0] dark:bg-[#080808] transition-colors duration-1000 text-black dark:text-white overflow-hidden relative select-none"
    >
      {/* Soft Architectural Blueprint Grid & Paper Texture */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-25 dark:opacity-15">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(108,175,191,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(108,175,191,0.06) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── TICKER BAND ─────────────────────────────────────── */}
      <div className="relative z-10 w-full border-b border-black/8 dark:border-white/8 py-4 overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]">
        <div ref={tickerRef} className="flex gap-0 w-max">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="shrink-0 text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold pr-16 whitespace-nowrap flex items-center gap-3"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>5000+ Happy Families</span>
              <span className="text-black/30 dark:text-white/30">•</span>
              <span>Pune’s Premier Real Estate Legacy</span>
              <span className="text-black/30 dark:text-white/30">•</span>
              <span>100% On-Time Delivery</span>
              <span className="text-black/30 dark:text-white/30">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── EDITORIAL HEADER ───────────────────────────────── */}
      <div className="relative z-10 px-4 md:px-[6vw] pt-[12vh] pb-[6vh]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div ref={headlineRef} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6CAFBF]/10 text-[#6CAFBF] text-xs font-bold uppercase tracking-[0.25em] mb-6 border border-[#6CAFBF]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Homeowner Stories</span>
            </div>

            {/* Preserved Section Title */}
            <h2 className="font-[magtis] uppercase font-extrabold tracking-tighter leading-[0.9] text-[10vw] sm:text-[7vw] lg:text-[5.5vw] text-black dark:text-white">
              <span className="block overflow-hidden py-1">
                <span className="story-title-line block">WHAT THEY</span>
              </span>
              <span className="block overflow-hidden py-1 text-[#6CAFBF]">
                <span className="story-title-line block">SAY ABOUT US</span>
              </span>
            </h2>

            <p className="mt-6 text-black/70 dark:text-white/70 text-base md:text-lg font-light max-w-xl leading-relaxed">
              Real stories from families who found their sanctuary, built memories, and created a lifetime of happiness with Mayuri Landmarks.
            </p>
          </div>

          {/* Story Counter & Slide Navigation */}
          <div className="flex flex-col items-start lg:items-end gap-6 shrink-0">
            <div className="flex items-baseline gap-2 font-[magtis] font-extrabold leading-none text-black/15 dark:text-white/15 text-5xl lg:text-7xl">
              <span className="text-black dark:text-white">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-sans tracking-widest font-normal text-black/40 dark:text-white/40">
                / {String(clientStories.length).padStart(2, '0')} STORIES
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="w-13 h-13 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center text-black/70 dark:text-white/70 hover:border-[#6CAFBF] hover:bg-[#6CAFBF] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Previous Story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="w-13 h-13 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center text-black/70 dark:text-white/70 hover:border-[#6CAFBF] hover:bg-[#6CAFBF] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Next Story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full h-[2px] bg-black/10 dark:bg-white/10 mt-12 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-[#6CAFBF] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              width: `${((activeIndex + 1) / clientStories.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* ── MAIN CONTENT PANELS (LEFT STORY & RIGHT LIFESTYLE) ─── */}
      <div className="relative z-10 px-4 md:px-[6vw] pb-[12vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ══ LEFT PANEL: CLIENT STORY (7 Cols) ═════════════════ */}
          <div
            ref={leftPanelRef}
            className="lg:col-span-7 flex flex-col justify-between p-8 md:p-12 rounded-3xl bg-white/70 dark:bg-[#121212]/70 border border-black/5 dark:border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6CAFBF]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badges & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#6CAFBF]/10 text-[#6CAFBF] border border-[#6CAFBF]/30">
                    <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
                    Verified Homeowner
                  </span>
                  <span className="text-xs text-black/40 dark:text-white/40">
                    {activeStory.city}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {Array(activeStory.rating)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#6CAFBF] text-[#6CAFBF] transition-transform hover:scale-125 duration-300"
                      />
                    ))}
                </div>
              </div>

              {/* Large Quotation Mark & Headline Quote */}
              <div className="relative mb-8">
                <Quote className="w-12 h-12 text-[#6CAFBF]/30 absolute -top-4 -left-3 -z-0" />
                <h3 className="relative z-10 font-[magtis] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-[1.15] text-black dark:text-white tracking-tight">
                  "{activeStory.headlineQuote}"
                </h3>
              </div>

              {/* Editorial Story Paragraphs */}
              <div className="space-y-4 text-black/80 dark:text-white/80 text-base md:text-lg font-light leading-relaxed font-sans mb-10">
                <p>{activeStory.storyParagraph1}</p>
                <p>{activeStory.storyParagraph2}</p>
              </div>

              {/* Favorite Room & Best Memory Highlight Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 mb-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6CAFBF] block mb-1">
                    Favorite Corner
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-black dark:text-white">
                    {activeStory.favoriteRoom}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6CAFBF] block mb-1">
                    Cherished Memory
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-black dark:text-white">
                    {activeStory.bestMemory}
                  </p>
                </div>
              </div>

              {/* Handwritten Signature Effect */}
              <div className="border-t border-black/10 dark:border-white/10 pt-6 mb-10">
                <p className="font-[magtis] text-xl md:text-2xl font-bold uppercase tracking-wider text-black dark:text-white">
                  {activeStory.signatureName}
                </p>
                <p className="text-xs text-[#6CAFBF] font-semibold tracking-widest uppercase mt-1">
                  {activeStory.signatureSub}
                </p>
              </div>
            </div>

            {/* Real Estate Micro Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#6CAFBF] shrink-0" />
                <div>
                  <span className="block text-[9px] uppercase font-bold tracking-widest text-black/40 dark:text-white/40">
                    Project
                  </span>
                  <span className="text-xs font-semibold text-black dark:text-white">
                    {activeStory.purchasedProject}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#6CAFBF] shrink-0" />
                <div>
                  <span className="block text-[9px] uppercase font-bold tracking-widest text-black/40 dark:text-white/40">
                    Location
                  </span>
                  <span className="text-xs font-semibold text-black dark:text-white">
                    {activeStory.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#6CAFBF] shrink-0" />
                <div>
                  <span className="block text-[9px] uppercase font-bold tracking-widest text-black/40 dark:text-white/40">
                    Possession
                  </span>
                  <span className="text-xs font-semibold text-black dark:text-white">
                    {activeStory.possessionDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ThumbsUp className="w-4 h-4 text-[#6CAFBF] shrink-0" />
                <div>
                  <span className="block text-[9px] uppercase font-bold tracking-widest text-black/40 dark:text-white/40">
                    Recommend
                  </span>
                  <span className="text-xs font-semibold text-black dark:text-white">
                    {activeStory.wouldRecommend}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ══ RIGHT PANEL: LIFESTYLE MEDIA EXPERIENCE (5 Cols) ═══ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Hero Lifestyle Photo / Video Stack */}
            <div className="group relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-neutral-900">
              <img
                src={activeMediaObj.img}
                alt={activeStory.name}
                className="w-full h-full object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
              />

              {/* Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Video Play Button Overlay if Available */}
              {activeStory.hasVideo && (
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/25 backdrop-blur-xl border border-white/40 text-white flex items-center justify-center group/btn hover:scale-110 hover:bg-[#6CAFBF] transition-all duration-500 shadow-2xl cursor-pointer"
                  aria-label="Play Homeowner Video Walkthrough"
                >
                  <div className="absolute inset-0 rounded-full bg-[#6CAFBF]/30 animate-ping" />
                  <Play className="w-8 h-8 fill-current ml-1 relative z-10 transition-transform duration-300 group-hover/btn:scale-110" />
                </button>
              )}

              {/* Media Corner Label */}
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-black/50 backdrop-blur-md text-white border border-white/20">
                  {activeMediaObj.label}
                </span>
              </div>

              {/* Homeowner Badge Bottom Left */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <img
                    src={activeStory.avatar}
                    alt={activeStory.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#6CAFBF] shadow-lg"
                  />
                  <div>
                    <p className="font-bold text-sm leading-tight">
                      {activeStory.name}
                    </p>
                    <p className="text-[11px] text-[#6CAFBF] font-semibold uppercase tracking-wider">
                      {activeStory.configuration}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnail Tabs */}
            <div className="grid grid-cols-4 gap-3">
              {activeStory.gallery.map((g) => {
                const isSelected = activeMediaKey === g.key;
                return (
                  <button
                    key={g.key}
                    onClick={() => setActiveMediaKey(g.key)}
                    className={`group relative aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                      isSelected
                        ? 'border-[#6CAFBF] ring-2 ring-[#6CAFBF]/50 scale-[1.03]'
                        : 'border-black/10 dark:border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={g.img}
                      alt={g.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                    <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold uppercase tracking-widest text-white drop-shadow-md">
                      {g.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── ALL HOMEOWNER THUMBNAILS NAV & SOCIAL PROOF ────────── */}
      <div className="relative z-10 px-4 md:px-[6vw] pb-[10vh]">
        <div className="mb-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">
          <span>Explore All Homeowner Stories</span>
          <span>Click family to view chapter</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {clientStories.map((story, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={story.id}
                onClick={() => goTo(i)}
                className={`group relative p-4 rounded-2xl border transition-all duration-500 text-left cursor-pointer flex items-center gap-3.5 ${
                  isActive
                    ? 'bg-[#6CAFBF] text-white border-[#6CAFBF] shadow-xl shadow-[#6CAFBF]/25 scale-[1.03]'
                    : 'bg-white/50 dark:bg-[#121212]/50 border-black/10 dark:border-white/10 hover:border-[#6CAFBF]/50 text-black dark:text-white'
                }`}
              >
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 border border-white/30"
                />
                <div className="overflow-hidden">
                  <p className="font-bold text-xs leading-tight truncate">
                    {story.name}
                  </p>
                  <p
                    className={`text-[10px] font-semibold tracking-wider uppercase mt-0.5 truncate ${
                      isActive ? 'text-white/80' : 'text-[#6CAFBF]'
                    }`}
                  >
                    {story.purchasedProject}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── EMOTIONAL CTA STRIP ("YOUR NEXT CHAPTER BEGINS HERE") ── */}
      <div className="relative z-10 px-4 md:px-[6vw] pb-[14vh]">
        <div className="w-full p-8 md:p-14 rounded-3xl bg-gradient-to-r from-black via-[#111111] to-black text-white border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#6CAFBF] text-xs font-bold uppercase tracking-widest mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Begin Your Story</span>
            </div>
            <h3 className="font-[magtis] uppercase font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Your next chapter begins here.
            </h3>
            <p className="text-white/70 text-sm md:text-base font-light mt-3">
              Walk through the spaces where Pune's happiest families are creating lifelong memories.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('section-contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#6CAFBF] hover:bg-white text-black font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl hover:scale-105 shrink-0 cursor-pointer"
          >
            <span>Book Personal Walkthrough</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* ── CINEMATIC VIDEO MODAL ──────────────────────────────── */}
      {videoModalOpen && activeStory.videoUrl && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#6CAFBF] text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <iframe
              src={activeStory.videoUrl}
              title={`${activeStory.name} Video Story`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
