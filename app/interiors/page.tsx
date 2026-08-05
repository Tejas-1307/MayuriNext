import React from 'react';
import InsideMayuriHomes from '@/components/projects/InsideMayuriHomes';
import { getBreadcrumbSchema } from '@/lib/jsonLd';

export const metadata = {
  title: 'Step Inside Your Future Home | Interiors Gallery | Mayuri Landmarks LLP',
  description:
    'Explore thoughtfully designed interiors crafted for comfort, elegance, and modern living at Mayuri Landmarks LLP.',
  openGraph: {
    title: 'Interiors Gallery | Mayuri Landmarks LLP',
    description:
      'Explore thoughtfully designed interiors crafted for comfort, elegance, and modern living.',
  },
};

export default function InteriorsPage() {
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.mayurilandmarks.com/' },
    { name: 'Interiors', url: 'https://www.mayurilandmarks.com/interiors' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <InsideMayuriHomes />
    </>
  );
}
