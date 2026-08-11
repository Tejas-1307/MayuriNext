export interface ProjectItem {
  id: number;
  status: 'completed' | 'ongoing' | 'upcoming';
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
  mapUrl?: string;
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
    mapUrl: 'https://share.google/rFcOlEVYlAqw38F4f',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Mayuri Infinity represents the zenith of contemporary residential design, offering residents an unparalleled panoramic living experience in the heart of Pune. Meticulously crafted with a focus on biophilic elements, natural light, and cross-ventilation, each residence is a sanctuary of peace. The project integrates state-of-the-art home automation with lush, expansive terrace gardens, creating a seamless transition between indoor luxury and the vibrant natural landscape surrounding the premises.',
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
    mapUrl: 'https://share.google/1B1ipVeSLLXqhjj5d',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Setting a rigorous new benchmark for corporate architecture, Mayuri Optimum integrates sustainable energy practices with bold, geometric facade design to empower modern businesses. The striking low-e glass skin ensures maximum thermal efficiency while bathing the premium office suites in diffuse natural sunlight. Featuring double-height statement lobbies and intelligent building management systems.',
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
    mapUrl: 'https://share.google/awsbUAQbGBkWBkRwN',
    images: [
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'An intimate enclave of boutique luxury apartments tailored strictly for families seeking an oasis of calm without compromising urban connectivity. Mayuri Residency features a bespoke collection of limited homes, designed with sweeping ergonomic layouts, private foyer entrances, and premium imported material finishes.',
  },
  {
    id: 4,
    status: 'ongoing',
    name: 'Adhinathpuram',
    label: 'ADHINATHPURAM',
    location: 'Pune, Maharashtra',
    type: 'Residential Township',
    year: '2025 (Est.)',
    units: '300+ Units',
    video: 'https://www.mayurilandmarks.com/images/sliders/FlatNew1.mp4',
    img: 'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
    thumb: 'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
    mapUrl: 'https://maps.google.com/?q=Mayuri+Adhinathpuram+Pune',
    images: [
      'https://www.mayurilandmarks.com/images/sliders/slide3.jpg',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'Our flagship modern township combining visionary architecture with self-sustaining community micro-ecosystems. Spanning acres of lush landscapes with integrated jogging trails, smart parking arrays, and world-class sports amenities, Mayuri Adhinathpuram establishes a new standard for holistic residential living.',
  },
  {
    id: 5,
    status: 'completed',
    name: 'Adhinathpuram Sapphire',
    label: 'ADHINATHPURAM SAPPHIRE',
    location: 'Pune, Maharashtra',
    type: 'Residential Premium Apartments',
    year: '2024',
    units: '150+ Units',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'An elegant residential address crafted with contemporary architecture, expansive open spaces, premium lifestyle amenities, and thoughtfully designed homes that redefine everyday living.',
  },
  {
    id: 6,
    status: 'upcoming',
    name: 'Mayuri Vrindha',
    label: 'MAYURI VRINDHA',
    location: 'Hadapsar, Pune',
    type: 'Residential Development',
    year: '2027 (Est.)',
    units: '200+ Units',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
    thumb: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop',
    ],
    desc: 'A thoughtfully planned upcoming residential community in Hadapsar designed to deliver modern living with exceptional connectivity, elegant architecture, and future-ready amenities.',
  },
];
