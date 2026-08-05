export interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
  scope: string[];
  benefit: string;
  executionType: string;
  chips: string[];
}

export const services: ServiceItem[] = [
  {
    number: '01',
    title: 'Tiling & Painting',
    subtitle: 'Surface Excellence',
    desc: 'Tiling is an effective way to add elegance & style to any bath or kitchen. Mayuri Landmarks LLP specializes in tile installation and works directly with each homeowner to deliver flawless, lasting results.',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop',
    scope: ['Precision Tile Installation', 'Custom Surface Finishes', 'Moisture & Water Proofing'],
    benefit: 'Flawless surface alignment with long-lasting structural durability.',
    executionType: 'Turnkey Execution • 2-4 Weeks',
    chips: ['Interior', 'Exterior', 'Surface Finishing', 'Tile Installation'],
  },
  {
    number: '02',
    title: 'Renovations',
    subtitle: 'Reinvented Spaces',
    desc: 'Mayuri Landmarks LLP has full-service renovation expertise. Equipped with the right tools and people, we handle projects of all sizes and provide the highest quality of craftsmanship imaginable.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1800&auto=format&fit=crop',
    scope: ['Full Interior Remodeling', 'Structural Space Optimization', 'Electrical & Plumbing Overhaul'],
    benefit: 'Breathe new life into aging structures with modern luxury design.',
    executionType: 'Custom Timeline • 4-8 Weeks',
    chips: ['Remodeling', 'Space Optimization', 'Structural Upgrade'],
  },
  {
    number: '03',
    title: 'Design & Build',
    subtitle: 'Vision to Reality',
    desc: 'Mayuri Landmarks LLP eliminates the task of dividing your project between separate architecture and construction firms. We offer unified design and build services under one roof for a seamless journey.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1800&auto=format&fit=crop',
    scope: ['3D Architectural Visualization', 'Turnkey Construction', 'Material & Quality Control'],
    benefit: 'Single point of accountability from initial sketch to keys in hand.',
    executionType: 'End-to-End Contract',
    chips: ['Architecture', 'Turnkey', 'Construction', '3D Design'],
  },
  {
    number: '04',
    title: 'Consulting',
    subtitle: 'Expert Guidance',
    desc: 'Whether you know exactly what you want or are simply looking for fresh ideas, Mayuri Landmarks LLP is ready to offer you priceless expert consulting to make the right decisions for your dream project.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop',
    scope: ['Project Feasibility Studies', 'Cost & Material Optimization', 'Regulatory & RERA Compliance'],
    benefit: 'Avoid costly construction pitfalls with expert real estate insights.',
    executionType: 'Advisory Consultation',
    chips: ['Planning', 'Feasibility', 'Budgeting', 'RERA Advisory'],
  },
];
