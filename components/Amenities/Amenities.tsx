'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const amenities = [
  {
    id: 1,
    category: 'Nature & Greenery',
    name: 'Biophilic Landscaped Podium',
    desc: 'Native flora, shaded seating pergolas, and walking trails designed for peaceful mornings.',
    img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 0-7.07 17.07A10 10 0 0 0 12 22a10 10 0 0 0 7.07-2.93A10 10 0 0 0 12 2z" />
        <path d="M12 6v12M8 10l4-4 4 4" />
      </svg>
    ),
  },
  {
    id: 2,
    category: 'Fitness & Sports',
    name: 'Horizon Swimming Pool',
    desc: 'Temperature-controlled lap pool with dedicated kids splash area and sun-lounger deck.',
    img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" />
        <path d="M2 16c2 0 3-1 5-1s3 1 5 1 3-1 5-1 3 1 5 1" />
        <path d="M15 5a3 3 0 1 0-6 0 3 3 0 0 0 6 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    category: 'Fitness & Sports',
    name: 'State-of-the-Art Fitness Club',
    desc: 'Fully equipped TechnoGym strength machines, cardio zone, and dedicated yoga pavilion.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 17.5h11M4 9v6M20 9v6M9 4v16M15 4v16" />
      </svg>
    ),
  },
  {
    id: 4,
    category: 'Convenience',
    name: 'Luxury Clubhouse & Banquet',
    desc: 'Air-conditioned multi-purpose hall for private family celebrations, townhalls, and community galas.',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 5,
    category: 'Nature & Greenery',
    name: 'Zen Reflexology Pathway',
    desc: 'Acupressure pebble walkway nestled among fragrant jasmine and bamboo groves.',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    id: 6,
    category: 'Convenience',
    name: "Children's Play Kingdom",
    desc: 'EPDM cushioned rubberized floor, multi-play climbing towers, slides, and swing sets.',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
  },
  {
    id: 7,
    category: 'Safety & Backup',
    name: '24/7 CCTV & EV Charging Stations',
    desc: '3-tier digital surveillance with dedicated fast-charging bays for electric vehicle owners.',
    img: 'https://images.unsplash.com/photo-1558441719-67450807e989?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
  },
  {
    id: 8,
    category: 'Safety & Backup',
    name: 'Security Cabin',
    desc: 'Round-the-clock security personnel stationed at all entry and exit points.',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const proximity = [
  {
    category: 'Kids Education',
    emoji: '🏫',
    items: [
      { name: 'Euro School', time: '4 Min' },
      { name: 'Dhruv Global School', time: '5 Min' },
      { name: 'Bishop School', time: '5 Min' },
    ],
  },
  {
    category: 'Leisure & Daily Needs',
    emoji: '🏬',
    items: [
      { name: 'Reliance Mart & Tata Star Bazar', time: '4 Min' },
      { name: 'Dmart / Dorabjee Paradise Mall', time: '10 Min' },
    ],
  },
  {
    category: 'Travel & Transport',
    emoji: '🚌',
    items: [
      { name: 'Bus Stand', time: '2 Min' },
      { name: 'Railway Station', time: '30 Min' },
      { name: 'Airport', time: '40 Min' },
    ],
  },
  {
    category: 'Medical Emergency',
    emoji: '🏥',
    items: [
      { name: 'Nixi Hospital', time: '5 Min' },
      { name: 'Multi Speciality Hospital', time: '8 Min' },
      { name: 'Ruby Hall Clinic Wanowarie', time: '15 Min' },
    ],
  },
  {
    category: 'Business Centers',
    emoji: '🏢',
    items: [
      { name: 'Magarpatta City', time: '25 Min' },
      { name: 'SP Infocity', time: '25 Min' },
      { name: 'MG Road', time: '25 Min' },
    ],
  },
];

const categories = [
  'All',
  'Nature & Greenery',
  'Fitness & Sports',
  'Safety & Backup',
  'Convenience',
];

const Amenities: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const titleLines = useRef<(HTMLSpanElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgImgRef = useRef<HTMLImageElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  // -1 indicates 'ALL' proximity tab
  const [activeProxTab, setActiveProxTab] = useState<number>(-1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  titleLines.current = [];
  cardRefs.current = [];

  const addTitle = (el: HTMLSpanElement | HTMLDivElement | null) => {
    if (el && !titleLines.current.includes(el as any)) {
      titleLines.current.push(el as any);
    }
  };
  const addCard = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const filteredAmenities =
    activeCategory === 'All'
      ? amenities
      : amenities.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleLines.current,
        { y: 140, rotateX: -35, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        bgImgRef.current,
        { y: -60 },
        {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: bgImgRef.current?.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!cardRefs.current.length) return;
    gsap.fromTo(
      cardRefs.current,
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
      }
    );
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F5F0] dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-1000 overflow-hidden"
    >
      {/* HEADER */}
      <div className="px-4 md:px-[6vw] pt-[14vh] pb-[6vh]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div ref={headlineRef} style={{ perspective: '1200px' }}>
            <p className="text-[#6CAFBF] text-xs tracking-[0.3em] uppercase font-bold mb-4">
              Live Better · Every Day
            </p>
            {['World-Class', 'Amenities'].map((word, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <span
                  ref={addTitle}
                  className="block font-[magtis] uppercase font-extrabold tracking-tighter leading-[0.88]"
                  style={{
                    fontSize: 'clamp(2.8rem, 8.5vw, 8.5rem)',
                    color: i === 1 ? '#6CAFBF' : 'black',
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>

          <div ref={addTitle} className="w-full md:w-[32%] self-end">
            <p className="text-black/60 dark:text-white/60 text-base md:text-lg font-medium leading-relaxed">
              Every amenity at Mayuri Landmarks is thoughtfully designed to elevate everyday life — from morning light to peaceful evening walks.
            </p>
          </div>
        </div>

        {/* Category Chips Bar for Progressive Disclosure */}
        <div className="flex flex-wrap items-center gap-2 mt-[6vh] border-b border-black/10 dark:border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                  : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* AMENITIES GRID */}
      <div ref={gridRef} className="px-4 md:px-[6vw] pb-[12vh]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {filteredAmenities.map((amenity, index) => (
            <div
              key={amenity.id}
              ref={addCard}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
              style={{ height: index % 3 === 0 ? '38vh' : '32vh' }}
              onMouseEnter={() => setHoveredId(amenity.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={amenity.img}
                alt={amenity.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div
                className={`absolute inset-0 bg-[#6CAFBF]/15 transition-opacity duration-500 ${
                  hoveredId === amenity.id ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div
                className={`absolute top-4 left-4 w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  hoveredId === amenity.id
                    ? 'bg-[#6CAFBF] border-[#6CAFBF] text-black'
                    : 'bg-white/10 border-white/25 text-white backdrop-blur-sm'
                }`}
              >
                {amenity.icon}
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 flex flex-col gap-1.5">
                <span className="text-[#6CAFBF] text-[10px] tracking-widest uppercase font-bold">
                  {amenity.category}
                </span>
                <h3
                  className={`font-[magtis] uppercase font-extrabold leading-tight transition-colors duration-400 ${
                    hoveredId === amenity.id ? 'text-[#6CAFBF]' : 'text-white'
                  }`}
                  style={{ fontSize: 'clamp(0.9rem, 2vw, 1.4rem)' }}
                >
                  {amenity.name}
                </h3>
                <p
                  className={`text-white/70 text-xs md:text-sm font-medium leading-relaxed transition-all duration-500 overflow-hidden ${
                    hoveredId === amenity.id
                      ? 'opacity-100 max-h-16'
                      : 'opacity-0 max-h-0'
                  }`}
                >
                  {amenity.desc}
                </p>
                <div
                  className={`h-[2px] bg-[#6CAFBF] transition-all duration-700 ease-out ${
                    hoveredId === amenity.id ? 'w-10 md:w-14' : 'w-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
