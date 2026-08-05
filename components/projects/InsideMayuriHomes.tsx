'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import {
  Sparkles,
  Sun,
  Heart,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  ArrowRight,
  Maximize2,
  Home,
  CheckCircle2,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface InteriorItem {
  id: number;
  src: string;
  category: 'living' | 'bedroom' | 'kitchen' | 'dining' | 'balcony' | 'bathroom';
  categoryLabel: string;
  roomName: string;
  quote: string;
  story: string;
  aspect: string;
}

const interiorCollection: InteriorItem[] = [
  {
    id: 1,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.18 AM.jpeg',
    category: 'living',
    categoryLabel: 'Living Room',
    roomName: 'Grand Living Sanctuary',
    quote: 'Where conversations become memories.',
    story: 'Designed with expansive windows that flood the lounge with golden natural light, creating an inviting space for family gatherings and evening quiet.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 2,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.19 AM (1).jpeg',
    category: 'bedroom',
    categoryLabel: 'Master Suite',
    roomName: 'Master Bedroom Suite',
    quote: 'Designed for peaceful endings.',
    story: 'Soft ambient light and muted neutral tones wrap around you, ensuring every stressful day dissolves into restful silence.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 3,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.19 AM.jpeg',
    category: 'kitchen',
    categoryLabel: 'Culinary Heart',
    roomName: 'Artisan Kitchen',
    quote: 'Every celebration begins here.',
    story: 'Crafted for effortless culinary experiences with seamless counter surfaces, warm wood accents, and intuitive storage.',
    aspect: 'aspect-[16/11]',
  },
  {
    id: 4,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.20 AM (1).jpeg',
    category: 'dining',
    categoryLabel: 'Dining Room',
    roomName: 'Family Dining Hall',
    quote: 'Where families gather together.',
    story: 'Intimate lighting and generous proportions invite slow dinners, shared laughter, and lingering conversations past twilight.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 5,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.20 AM.jpeg',
    category: 'balcony',
    categoryLabel: 'Sun Balcony',
    roomName: 'Sunrise Deck',
    quote: 'Morning begins with sunlight.',
    story: 'Unobstructed views over lush green horizon lines provide the perfect vantage point for your morning tea.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 6,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.21 AM (1).jpeg',
    category: 'bathroom',
    categoryLabel: 'Private Sanctuary',
    roomName: 'Wellness Bath Suite',
    quote: 'A quiet moment before the day starts.',
    story: 'Inspired by luxury resort spas, featuring brushed metallic fixtures, continuous marble flooring, and soothing warmth.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 7,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.21 AM.jpeg',
    category: 'living',
    categoryLabel: 'Living Room',
    roomName: 'Sunlit Lounge',
    quote: 'A space that welcomes every sunrise.',
    story: 'Double-height ceilings and soft drapery frame the landscape outside, filling the room with continuous organic tranquility.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 8,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.22 AM (1).jpeg',
    category: 'bedroom',
    categoryLabel: 'Master Suite',
    roomName: 'Serenity Guest Bedroom',
    quote: 'Restful spaces tailored for warmth.',
    story: 'Gentle wall finishes and plush flooring provide an instant feeling of security and deep restful sleep.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 9,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.22 AM.jpeg',
    category: 'kitchen',
    categoryLabel: 'Culinary Heart',
    roomName: 'Gourmet Island Kitchen',
    quote: 'Where warmth and flavor embrace.',
    story: 'An open layout that keeps you connected to your guests while preparing meals for life’s special milestones.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 10,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.23 AM.jpeg',
    category: 'dining',
    categoryLabel: 'Dining Room',
    roomName: 'Breakfast Nook',
    quote: 'Designed for slow mornings.',
    story: 'Bask in early light over warm coffee as gentle breezes carry the promise of a peaceful day.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 11,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.24 AM (1).jpeg',
    category: 'balcony',
    categoryLabel: 'Sun Balcony',
    roomName: 'Evening Sky Terrace',
    quote: 'Every evening begins with comfort.',
    story: 'Watch sunset hues fade across Pune’s skyline while relaxing on custom weather-resistant lounge seating.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 12,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.24 AM.jpeg',
    category: 'bathroom',
    categoryLabel: 'Private Sanctuary',
    roomName: 'En-suite Rain Shower',
    quote: 'Renew your spirit daily.',
    story: 'Frameless glass partitions and thermostatic rainfall showers make every morning feeling like a revitalizing reset.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 13,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.25 AM (1).jpeg',
    category: 'living',
    categoryLabel: 'Living Room',
    roomName: 'Formal Drawing Lounge',
    quote: 'Where laughter echoes naturally.',
    story: 'Generous couch configurations allow easy hostings for family get-togethers and celebrations.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 14,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.25 AM.jpeg',
    category: 'bedroom',
    categoryLabel: 'Master Suite',
    roomName: 'Executive Suite & Walk-in Closet',
    quote: 'Tailored comfort for every morning.',
    story: 'Thoughtfully designed storage solutions ensure clutter-free living and calm mindsets.',
    aspect: 'aspect-[16/11]',
  },
  {
    id: 15,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.26 AM.jpeg',
    category: 'kitchen',
    categoryLabel: 'Culinary Heart',
    roomName: 'Contemporary Prep Pantry',
    quote: 'Simplicity meets refined utility.',
    story: 'Smooth pull-out drawers and soft-close cabinets elevate daily cooking into a delightful ritual.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 16,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.27 AM (1).jpeg',
    category: 'dining',
    categoryLabel: 'Dining Room',
    roomName: 'Al Fresco Terrace Dining',
    quote: 'Dine under open skies.',
    story: 'Fluid indoor-outdoor flow extends your dinner conversations directly into the fresh evening breeze.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 17,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.27 AM (2).jpeg',
    category: 'living',
    categoryLabel: 'Living Room',
    roomName: 'Refined Foyer & Sitting Corner',
    quote: 'The warmth of home starts here.',
    story: 'An architectural foyer crafted to welcome you home with quiet dignity and serene illumination.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 18,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.27 AM.jpeg',
    category: 'bedroom',
    categoryLabel: 'Master Suite',
    roomName: 'Kids Luxury Suite',
    quote: 'A haven for imagination and growth.',
    story: 'Bright, airy, and safe environment designed for study focus, joyful play, and soothing sleep.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 19,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.28 AM.jpeg',
    category: 'balcony',
    categoryLabel: 'Sun Balcony',
    roomName: 'Private Garden Deck',
    quote: 'Your private green retreat.',
    story: 'Lush potted greenery and tactile wooden decking create your personal oasis high above the bustling city.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 20,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.29 AM (1).jpeg',
    category: 'bathroom',
    categoryLabel: 'Private Sanctuary',
    roomName: 'Freestanding Soaking Corner',
    quote: 'Immerse in pure tranquility.',
    story: 'Deep soaking tub positioned alongside private frosted glass for total relaxation under ambient warmth.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 21,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.29 AM (2).jpeg',
    category: 'living',
    categoryLabel: 'Living Room',
    roomName: 'Media & Fireplace Lounge',
    quote: 'Cozy evenings with loved ones.',
    story: 'A comfortable corner designed for immersive sound, warm light, and quiet family movie nights.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 22,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.29 AM.jpeg',
    category: 'bedroom',
    categoryLabel: 'Master Suite',
    roomName: 'Penthouse View Bedroom',
    quote: 'Rise above the noise.',
    story: 'Floor-to-ceiling glass offers endless vistas of dawn breaking across green hills.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 23,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.30 AM (1).jpeg',
    category: 'kitchen',
    categoryLabel: 'Culinary Heart',
    roomName: 'Chef’s Breakfast Bar',
    quote: 'Where morning energy begins.',
    story: 'Convenient island seating makes quick morning breakfasts enjoyable for the entire family.',
    aspect: 'aspect-[1/1]',
  },
  {
    id: 24,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.30 AM.jpeg',
    category: 'dining',
    categoryLabel: 'Dining Room',
    roomName: 'Bespoke Wine & Dine Alcove',
    quote: 'Raise a glass to life’s moments.',
    story: 'Integrated wine displays and warm spotlights set an intimate mood for special anniversaries.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 25,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.31 AM (1).jpeg',
    category: 'living',
    categoryLabel: 'Living Room',
    roomName: 'Sunken Seating Pit',
    quote: 'Architectural intimacy for deep talk.',
    story: 'Architecturally distinguished sunken seating brings family members closer together.',
    aspect: 'aspect-[16/11]',
  },
  {
    id: 26,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.31 AM.jpeg',
    category: 'bedroom',
    categoryLabel: 'Master Suite',
    roomName: 'Reading Nook & Bedroom',
    quote: 'Lost in comfort and quiet thoughts.',
    story: 'A cozy window bench designed for reading your favorite book while gentle breezes pass through.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 27,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.32 AM (1).jpeg',
    category: 'balcony',
    categoryLabel: 'Sun Balcony',
    roomName: 'Sunset Tea Terrace',
    quote: 'Savoring evening tranquility.',
    story: 'Shaded wooden pergolas protect from mid-day heat while welcoming twilight calm.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 28,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.32 AM.jpeg',
    category: 'bathroom',
    categoryLabel: 'Private Sanctuary',
    roomName: 'Double Vanity Master Bath',
    quote: 'Harmony in routine.',
    story: 'Twin vanity sinks with LED backlighting ensure smooth, effortless morning preparations for couples.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 29,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.33 AM.jpeg',
    category: 'living',
    categoryLabel: 'Living Room',
    roomName: 'Panoramic View Gallery',
    quote: 'Frames that showcase nature.',
    story: 'Clean architectural lines ensure that nature remains the central artwork of your home.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 30,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.34 AM.jpeg',
    category: 'bedroom',
    categoryLabel: 'Master Suite',
    roomName: 'Zen Minimalist Bedroom',
    quote: 'Clutter-free peace of mind.',
    story: 'Pure minimalist design principles curate an environment where stress cannot stay.',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 31,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.35 AM (1).jpeg',
    category: 'kitchen',
    categoryLabel: 'Culinary Heart',
    roomName: 'Quartz Counter Kitchen',
    quote: 'Elegance built for daily life.',
    story: 'Stain-resistant quartz surfaces combine high luxury beauty with low-maintenance durability.',
    aspect: 'aspect-[16/10]',
  },
  {
    id: 32,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.35 AM.jpeg',
    category: 'dining',
    categoryLabel: 'Dining Room',
    roomName: 'Open Concept Family Table',
    quote: 'The heart of family gatherings.',
    story: 'Connected directly to the terrace so meals flow naturally into outdoor relaxation.',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 33,
    src: '/assets/Flats_Img/WhatsApp Image 2026-06-02 at 11.38.36 AM.jpeg',
    category: 'balcony',
    categoryLabel: 'Sun Balcony',
    roomName: 'Moonlight Lounge Balcony',
    quote: 'Under starry night skies.',
    story: 'Soft ambient floor lighting illuminates your private terrace for quiet nighttime conversations.',
    aspect: 'aspect-[3/4]',
  },
];

const categoryFilters = [
  { key: 'all', label: 'All Spaces', title: 'The Complete Journey' },
  { key: 'living', label: 'Living Room', title: 'Where conversations become memories' },
  { key: 'bedroom', label: 'Master Suite', title: 'Designed for peaceful endings' },
  { key: 'kitchen', label: 'Culinary Heart', title: 'Every celebration begins here' },
  { key: 'dining', label: 'Dining Room', title: 'Where families gather together' },
  { key: 'balcony', label: 'Sun Balcony', title: 'Morning begins with sunlight' },
  { key: 'bathroom', label: 'Private Sanctuary', title: 'A quiet moment before the day starts' },
];

const emotionalPillars = [
  {
    icon: Home,
    title: 'Real Homes',
    tagline: 'Crafted for everyday memories.',
    desc: 'Spaces designed not for show, but for shared laughter, quiet morning tea, and living fully together.',
  },
  {
    icon: Sun,
    title: 'Morning Light',
    tagline: 'Wake up to warmth every day.',
    desc: 'Architecture aligned with the sun’s path, filling your rooms with natural light and positive energy.',
  },
  {
    icon: ShieldCheck,
    title: 'Elegant Comfort',
    tagline: 'Spaces that calm the mind.',
    desc: 'Harmonious proportions, sound insulation, and gentle tactile textures engineered to restore peace.',
  },
  {
    icon: Heart,
    title: 'Built for Families',
    tagline: 'Every room welcomes connection.',
    desc: 'Expansive living spaces and seamless transitions that invite conversation and togetherness.',
  },
];

const InsideMayuriHomes: React.FC = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<InteriorItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [tourSubmitted, setTourSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '' });
  const [, startTransition] = useTransition();

  const pageRef = useRef<HTMLDivElement>(null);
  const heroHeaderRef = useRef<HTMLDivElement>(null);
  const heroLinesRef = useRef<HTMLHeadingElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Touch Swipe for Mobile Lightbox
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Filtered Collection
  const filteredItems =
    activeCategory === 'all'
      ? interiorCollection
      : interiorCollection.filter((item) => item.category === activeCategory);

  const handleCategoryChange = (key: string) => {
    startTransition(() => {
      setActiveCategory(key);
    });
  };

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
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

  // Body Scroll Lock for Lightbox / Modal
  useEffect(() => {
    if (selectedImage || bookingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage, bookingModalOpen]);

  // Keyboard Lightbox Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (bookingModalOpen) {
        if (e.key === 'Escape') setBookingModalOpen(false);
        return;
      }
      if (!selectedImage) return;

      const currentIdx = filteredItems.findIndex((item) => item.id === selectedImage.id);

      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIdx + 1) % filteredItems.length;
        setSelectedImage(filteredItems[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
        setSelectedImage(filteredItems[prevIdx]);
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredItems, bookingModalOpen]);

  // Entrance GSAP Masking & Stagger Animations
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      // Headline Mask Reveal
      if (heroLinesRef.current) {
        const lineSpans = heroLinesRef.current.querySelectorAll('.hero-line-inner');
        gsap.fromTo(
          lineSpans,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 1.6,
            stagger: 0.15,
            ease: 'power4.out',
            delay: 0.1,
          }
        );
      }

      // Hero Subtitle & Tag Reveal
      if (heroHeaderRef.current) {
        const heroExtras = heroHeaderRef.current.querySelectorAll('.hero-extra');
        gsap.fromTo(
          heroExtras,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.6,
          }
        );
      }

      // Emotional Pillars Reveal
      if (pillarsRef.current) {
        const cards = pillarsRef.current.querySelectorAll('.pillar-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Re-trigger GSAP reveal when filter changes
  useEffect(() => {
    if (!gridContainerRef.current) return;
    const cards = gridContainerRef.current.querySelectorAll('.gallery-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 35, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
      }
    );
  }, [activeCategory]);

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIdx = filteredItems.findIndex((item) => item.id === selectedImage.id);
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIdx]);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIdx = filteredItems.findIndex((item) => item.id === selectedImage.id);
    const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIdx]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNextImage();
      else handlePrevImage();
    }
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourSubmitted(true);
    setTimeout(() => {
      setTourSubmitted(false);
      setBookingModalOpen(false);
      setFormData({ name: '', phone: '', email: '', date: '' });
    }, 2800);
  };

  return (
    <div
      ref={pageRef}
      className="w-full min-h-screen bg-[#F5F5F0] dark:bg-[#080808] text-black dark:text-white transition-colors duration-1000 select-none overflow-x-hidden relative"
    >
      {/* Ambient Soft Lighting Orbs & Organic Grain */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-30">
        <div className="absolute -top-[20vw] -left-[10vw] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#6CAFBF]/20 via-[#D4AF37]/10 to-transparent blur-[120px] animate-pulse" />
        <div className="absolute top-[40vh] -right-[15vw] w-[45vw] h-[45vw] rounded-full bg-gradient-to-bl from-[#6CAFBF]/15 via-amber-200/10 to-transparent blur-[140px]" />
        <div className="absolute bottom-[10vh] left-[20vw] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#6CAFBF]/10 via-[#D4AF37]/10 to-transparent blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── HEADER NAVIGATION ─────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
        <div className="font-[magtis] text-xl md:text-2xl font-bold uppercase tracking-widest pointer-events-auto">
          Mayuri <span className="text-[#6CAFBF]">LLP</span>
        </div>
        <button
          onClick={() => router.push('/')}
          className="group flex items-center gap-3 pointer-events-auto hover:text-[#6CAFBF] transition-colors duration-300 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowRight className="w-4 h-4 rotate-180 transition-transform duration-500 group-hover:-translate-x-1" />
          <span className="text-xs uppercase font-bold tracking-[0.25em]">
            Back to Overview
          </span>
        </button>
      </header>

      {/* ── HERO SECTION ───────────────────────────────────────── */}
      <section className="relative z-10 pt-[22vh] pb-[12vh] px-4 md:px-[6vw] flex flex-col items-center text-center">
        <div ref={heroHeaderRef} className="max-w-5xl flex flex-col items-center">
          {/* Subtle Emotional Tag */}
          <div className="hero-extra inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6CAFBF]/10 border border-[#6CAFBF]/30 text-[#6CAFBF] text-xs font-semibold uppercase tracking-[0.25em] mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#6CAFBF] animate-ping" />
            <span>Crafted for Emotional Connection • Pune</span>
          </div>

          {/* Line-Masked Preserved Headline */}
          <h1
            ref={heroLinesRef}
            className="font-[magtis] uppercase font-extrabold text-[10vw] sm:text-[8vw] lg:text-[6.5vw] leading-[0.92] tracking-tighter mb-8 text-black dark:text-white"
          >
            <span className="block overflow-hidden py-1">
              <span className="hero-line-inner block">STEP INSIDE YOUR</span>
            </span>
            <span className="block overflow-hidden py-1 text-[#6CAFBF]">
              <span className="hero-line-inner block">FUTURE HOME</span>
            </span>
          </h1>

          {/* Subtitle Focus on Comfort, Morning Light & Peace */}
          <p className="hero-extra text-black/75 dark:text-white/75 text-base sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed font-sans mb-12">
            Where every morning begins with gentle sunlight, and every evening welcomes your family home to peace, warmth, and enduring connection.
          </p>

          {/* Subtle Ambient Cue */}
          <div className="hero-extra flex items-center gap-4 text-xs tracking-widest uppercase text-black/50 dark:text-white/50 font-medium">
            <span className="h-[1px] w-12 bg-black/20 dark:bg-white/20" />
            <span>Scroll to explore rooms</span>
            <span className="h-[1px] w-12 bg-black/20 dark:bg-white/20" />
          </div>
        </div>
      </section>

      {/* ── EMOTIONAL PILLARS (REPLACING CARDS) ─────────────────── */}
      <section ref={pillarsRef} className="relative z-10 px-4 md:px-[6vw] mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {emotionalPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="pillar-card group relative p-8 rounded-2xl bg-white/60 dark:bg-[#121212]/60 border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-[#6CAFBF]/40 transition-all duration-700 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6CAFBF]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#6CAFBF]/10 text-[#6CAFBF] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#6CAFBF] group-hover:text-white transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-[magtis] text-xl font-bold uppercase tracking-wider mb-2 text-black dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6CAFBF] mb-4">
                    {pillar.tagline}
                  </p>
                  <p className="text-sm text-black/65 dark:text-white/65 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── INTERIOR FILTERS (TACTILE SEGMENTED NAVIGATION) ────── */}
      <section className="relative z-20 px-4 md:px-[6vw] mb-16">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 p-2 rounded-full bg-white/70 dark:bg-[#141414]/70 border border-black/10 dark:border-white/10 backdrop-blur-2xl shadow-xl">
            {categoryFilters.map((filter) => {
              const isActive = activeCategory === filter.key;
              const count =
                filter.key === 'all'
                  ? interiorCollection.length
                  : interiorCollection.filter((i) => i.category === filter.key).length;

              return (
                <button
                  key={filter.key}
                  onClick={() => handleCategoryChange(filter.key)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-500 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#6CAFBF] shadow-lg shadow-[#6CAFBF]/25 scale-[1.02]'
                      : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-black/10 dark:bg-white/10 text-black/60 dark:text-white/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Story Title */}
          <div className="mt-6 text-center h-8">
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-[#6CAFBF] animate-fade-in">
              {categoryFilters.find((f) => f.key === activeCategory)?.title}
            </p>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL MASONRY GALLERY GRID ─────────────────────── */}
      <section className="relative z-10 px-4 md:px-[6vw] mb-32">
        <div
          ref={gridContainerRef}
          className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="gallery-card group relative break-inside-avoid overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 shadow-xl cursor-pointer transition-all duration-700 hover:shadow-2xl hover:shadow-[#6CAFBF]/20 border border-black/5 dark:border-white/10"
            >
              {/* Image with Micro Zoom */}
              <div className={`relative w-full ${item.aspect} overflow-hidden bg-neutral-900`}>
                <img
                  src={item.src}
                  alt={item.roomName}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                />

                {/* Ambient Warm Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-40 group-hover:opacity-95 transition-opacity duration-700" />

                {/* Top Corner Room Badge */}
                <div className="absolute top-4 left-4 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md text-white border border-white/15">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Top Right Expand Icon */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#6CAFBF] transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content Revealing Room Title & Emotional Copy */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-[magtis] text-xl md:text-2xl font-bold uppercase text-white tracking-wide mb-1 drop-shadow-md">
                    {item.roomName}
                  </h3>
                  <p className="text-xs md:text-sm text-white/90 font-light italic leading-relaxed transform opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-75">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOUNDLESS CINEMA FULLSCREEN LIGHTBOX ───────────────── */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#080808]/96 backdrop-blur-3xl transition-all duration-700 overflow-hidden ${
          selectedImage
            ? 'opacity-100 pointer-events-auto scale-100'
            : 'opacity-0 pointer-events-none scale-95'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Light Mesh */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-[#6CAFBF] blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-amber-400 blur-[180px]" />
        </div>

        {/* Top Header Bar */}
        <div className="relative z-20 w-full p-6 md:p-8 flex items-center justify-between mix-blend-difference text-white">
          <div className="flex items-center gap-4">
            <span className="font-[magtis] text-sm md:text-base font-bold uppercase tracking-widest text-[#6CAFBF]">
              {selectedImage?.categoryLabel}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs tracking-widest uppercase text-white/70">
              {filteredItems.findIndex((i) => i.id === selectedImage?.id) + 1} / {filteredItems.length}
            </span>
          </div>

          <button
            onClick={() => setSelectedImage(null)}
            className="group flex items-center gap-2 p-3 rounded-full bg-white/10 hover:bg-[#6CAFBF] transition-colors duration-300 text-white"
          >
            <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            <span className="text-xs uppercase font-bold tracking-widest hidden md:inline px-1">
              Close
            </span>
          </button>
        </div>

        {/* Central Display Area */}
        <div className="relative z-10 flex-1 w-full flex items-center justify-center p-4 md:p-12 overflow-hidden">
          {/* Previous Arrow */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 md:left-10 z-30 p-4 rounded-full bg-white/10 hover:bg-[#6CAFBF] text-white backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNextImage}
            className="absolute right-4 md:right-10 z-30 p-4 rounded-full bg-white/10 hover:bg-[#6CAFBF] text-white backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image */}
          {selectedImage && (
            <div className="relative max-w-5xl max-h-[70vh] flex items-center justify-center shadow-2xl rounded-lg overflow-hidden border border-white/10">
              <img
                key={selectedImage.id}
                src={selectedImage.src}
                alt={selectedImage.roomName}
                className="max-w-full max-h-[70vh] object-contain transition-all duration-700 animate-fade-in"
              />
            </div>
          )}
        </div>

        {/* Bottom Story Floating Bar */}
        {selectedImage && (
          <div className="relative z-20 w-full p-6 md:p-10 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-[magtis] text-2xl md:text-3xl font-bold uppercase text-white tracking-tight mb-2">
                {selectedImage.roomName}
              </h2>
              <p className="text-[#6CAFBF] text-sm md:text-base font-medium italic mb-2">
                "{selectedImage.quote}"
              </p>
              <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed">
                {selectedImage.story}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedImage(null);
                setBookingModalOpen(true);
              }}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#6CAFBF] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all duration-500 shadow-xl hover:shadow-[#6CAFBF]/30"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Personal Tour</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>

      {/* ── BOTTOM EXPERIENCE & CTA ("IMAGINE YOUR LIFE HERE") ───── */}
      <section className="relative z-10 py-32 px-4 md:px-[6vw] bg-white/80 dark:bg-[#0c0c0c]/80 border-t border-black/5 dark:border-white/10 backdrop-blur-2xl text-center flex flex-col items-center">
        <div className="max-w-3xl flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#6CAFBF]/10 text-[#6CAFBF] flex items-center justify-center mb-8 shadow-sm">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="font-[magtis] text-4xl sm:text-5xl md:text-6xl uppercase font-extrabold tracking-tight mb-6 text-black dark:text-white">
            Imagine your life here.
          </h2>

          <p className="text-black/70 dark:text-white/70 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12">
            The right home isn't chosen with logic alone.
            <br />
            It's the place where you can already picture tomorrow.
          </p>

          <button
            onClick={() => setBookingModalOpen(true)}
            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs sm:text-sm uppercase tracking-[0.25em] overflow-hidden shadow-2xl hover:shadow-[#6CAFBF]/40 transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10">Book Personal Tour</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
            <div className="absolute inset-0 bg-[#6CAFBF] transition-transform duration-500 translate-y-full group-hover:translate-y-0" />
          </button>
        </div>
      </section>

      {/* ── BOOKING PERSONAL TOUR MODAL ───────────────────────── */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg p-8 md:p-10 rounded-3xl bg-[#F5F5F0] dark:bg-[#121212] border border-black/10 dark:border-white/10 shadow-2xl text-black dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-[#6CAFBF] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {tourSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-[#6CAFBF] mb-4 animate-bounce" />
                <h3 className="font-[magtis] text-2xl font-bold uppercase tracking-wider mb-2">
                  Tour Requested
                </h3>
                <p className="text-sm text-black/70 dark:text-white/70 max-w-xs">
                  Our private advisor will connect with you shortly to confirm your exclusive walkthrough.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#6CAFBF] font-bold">
                    Exclusive Access
                  </span>
                  <h3 className="font-[magtis] text-2xl md:text-3xl font-bold uppercase tracking-tight mt-1">
                    Book Personal Tour
                  </h3>
                  <p className="text-xs text-black/60 dark:text-white/60 mt-2 font-light">
                    Walk through the physical sanctuary and experience every detail in person.
                  </p>
                </div>

                <form onSubmit={handleTourSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 text-black/70 dark:text-white/70">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-[#6CAFBF] outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 text-black/70 dark:text-white/70">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-[#6CAFBF] outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest mb-1.5 text-black/70 dark:text-white/70">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-[#6CAFBF] outline-none text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-4 rounded-xl bg-[#6CAFBF] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl"
                  >
                    Confirm Tour Booking
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsideMayuriHomes;
