import { MetadataRoute } from 'next';
import { allProjectsData } from '@/lib/projectsData';
import { services } from '@/lib/servicesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mayurilandmarks.com';

  const projectUrls = allProjectsData.map((project) => ({
    url: `${baseUrl}/project/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/service/${service.number}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/interiors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectUrls,
    ...serviceUrls,
  ];
}
