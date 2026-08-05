import React from 'react';
import { notFound } from 'next/navigation';
import ServiceDetails from '@/components/services/ServiceDetails';
import { services } from '@/lib/servicesData';
import { getBreadcrumbSchema } from '@/lib/jsonLd';

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.number,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { id } = await params;
  const service = services.find((s) => s.number === id);

  if (!service) {
    return {
      title: 'Service Not Found | Mayuri Landmarks LLP',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.title} - ${service.subtitle} | Mayuri Landmarks LLP`,
    description: service.desc,
    openGraph: {
      title: `${service.title} | Mayuri Landmarks LLP`,
      description: service.desc,
      images: [
        {
          url: service.img,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = services.find((s) => s.number === id);

  if (!service) {
    notFound();
  }

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.mayurilandmarks.com/' },
    { name: 'Services', url: 'https://www.mayurilandmarks.com/#section-services' },
    { name: service.title, url: `https://www.mayurilandmarks.com/service/${service.number}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <ServiceDetails id={id} />
    </>
  );
}
