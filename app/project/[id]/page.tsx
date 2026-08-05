import React from 'react';
import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/projects/ProjectDetails';
import { allProjectsData } from '@/lib/projectsData';
import { getProjectSchema, getBreadcrumbSchema } from '@/lib/jsonLd';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return allProjectsData.map((project) => ({
    id: String(project.id),
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = allProjectsData.find((p) => String(p.id) === id);

  if (!project) {
    return {
      title: 'Project Not Found | Mayuri Landmarks LLP',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.name} | ${project.type} | Mayuri Landmarks LLP`,
    description: project.desc || `${project.name} by Mayuri Landmarks LLP in Pune.`,
    openGraph: {
      title: `${project.name} | Mayuri Landmarks LLP`,
      description: project.desc || `${project.name} in Pune.`,
      images: [
        {
          url: project.img,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = allProjectsData.find((p) => String(p.id) === id);

  if (!project) {
    notFound();
  }

  const projectSchema = getProjectSchema({
    id: project.id,
    name: project.name,
    type: project.type,
    location: project.location,
    desc: project.desc,
    img: project.img,
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.mayurilandmarks.com/' },
    { name: 'Projects', url: 'https://www.mayurilandmarks.com/#section-projects' },
    { name: project.name, url: `https://www.mayurilandmarks.com/project/${project.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <ProjectDetails id={id} />
    </>
  );
}
