import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mayuri Landmarks - Luxury Real Estate Developer',
    short_name: 'Mayuri Landmarks',
    description: 'Explore premier residential townships, commercial hubs, and luxury villas by Mayuri Landmarks.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111111',
    theme_color: '#8BC7D8',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
