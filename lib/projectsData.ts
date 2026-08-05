export interface ProjectItem {
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
  size?: 'large' | string;
  video?: string;
  images: string[];
  desc: string;
}

export const allProjectsData: ProjectItem[] = [
  {
    id: 1,
    status: 'completed',
    name: 'Infinity',
    label: 'INFINITY',
    location: 'Pune, Maharashtra',
    type: 'Residential Complex',
    year: '2023',
    units: '120+ Units',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format&fit=crop',
    size: 'large',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Mayuri Infinity represents the zenith of contemporary residential design, offering residents an unparalleled panoramic living experience in the heart of Pune. Meticulously crafted with a focus on biophilic elements, natural light, and cross-ventilation, each residence is a sanctuary of peace. The project integrates state-of-the-art home automation with lush, expansive terrace gardens, creating a seamless transition between indoor luxury and the vibrant natural landscape surrounding the premises. Delivering not just a physical home, but a truly elevated and mindful lifestyle.'
  },
  {
    id: 2,
    status: 'completed',
    name: 'Optimum',
    label: 'OPTIMUM',
    location: 'Pune, Maharashtra',
    type: 'Commercial Tower',
    year: '2022',
    units: '200+ Units',
    video: '/assets/Flats_Img/Mayuri Optimum Walkthrough.mp4',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Setting a rigorous new benchmark for corporate architecture, Mayuri Optimum integrates sustainable energy practices with bold, geometric facade design to empower modern businesses. The striking low-e glass skin ensures maximum thermal efficiency while bathing the premium office suites in diffuse natural sunlight. Featuring double-height statement lobbies, intelligent building management systems, and high-speed transit elevators, Optimum provides a world-class environment explicitly designed to foster corporate productivity, high-level networking, and undeniable prestige.'
  },
  {
    id: 3,
    status: 'completed',
    name: 'Residency',
    label: 'RESIDENCY',
    location: 'Pune, Maharashtra',
    type: 'Luxury Apartments',
    year: '2021',
    units: '80+ Units',
    img: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'An intimate enclave of boutique luxury apartments tailored strictly for families seeking an oasis of calm without compromising urban connectivity. Mayuri Residency features a bespoke collection of limited homes, designed with sweeping ergonomic layouts, private foyer entrances, and premium imported material finishes. The property boasts a fully equipped clubhouse, temperature-controlled leisure pools, and secure children’s zones, making it the ultimate destination for refined community living where every architectural decision revolves around the residents’ holistic well-being.'
  },
  {
    id: 4,
    status: 'ongoing',
    name: 'Adhinathpuram',
    label: ' Adhinathpuram',
    location: 'Pune, Maharashtra',
    type: 'Residential Township',
    year: '2025 (Est.)',
    units: '300+ Units',
    video: 'https://www.mayurilandmarks.com/images/sliders/FlatNew1.mp4',
    img: 'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
    thumb: 'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
    images: [
      'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'The highly anticipated sequel to our flagship development. Infinity II promises to redefine the expansive township footprint by combining visionary architecture with self-sustaining community micro-ecosystems. Spanning acres of lush landscapes, the project features integrated jogging trails, multiple professional sports arenas, and boutique retail pavilions right at your doorstep. Crafted for the future of urban dwelling, every tower incorporates rainwater harvesting loops, active solar integration, and smart parking arrays, establishing a sustainable, ultra-modern generational home.'
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
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Expanding the Optimum footprint, Phase 2 brings world-class lifestyle zones bridging the gap between rigorous work routines, domestic life, and exquisite leisure. Conceived as a high-street commercial hub, the development introduces a curated mix of luxury retail fronts, gourmet dining terraces, and agile office suites. It acts as an economic and cultural catalyst for the neighborhood, boasting expansive pedestrian promenades, interactive water features, and shaded outdoor seating zones that fluidly connect commercial energy with a relaxed, engaging pedestrian experience.'
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
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'An ultra-exclusive collection of signature bespoke villas meticulously designed for the few. Featuring private plunge pools, expansive terraced sky-gardens, and bespoke interior finish palettes, Mayuri Elite represents the ultimate pinnacle of private urban living. The architectural language speaks loudly of timeless minimalism, utilizing native indigenous stone, vast unbroken panoramic glass panels, and rare timber highlights to craft homes that age like fine art. Supported with a 3-tier matrix security system and 24/7 personalized concierge services, Elite offers total seclusion wrapped in ultimate luxury.'
  },
];
