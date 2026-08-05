export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Mayuri Landmarks',
    url: 'https://www.mayurilandmarks.com',
    logo: 'https://www.mayurilandmarks.com/assets/images/logo.png',
    description:
      'Mayuri Landmarks is a premier real estate developer in Pune, Maharashtra, crafting luxury residential townships, commercial towers, and bespoke villas.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '18.5204',
      longitude: '73.8567',
    },
    telephone: '+91-9876543210',
    sameAs: [
      'https://www.facebook.com/mayurilandmarks',
      'https://www.instagram.com/mayurilandmarks',
      'https://www.linkedin.com/company/mayurilandmarks',
    ],
  };
}

export function getProjectSchema(project: {
  name: string;
  type: string;
  location: string;
  desc: string;
  img: string;
  id: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: `Mayuri ${project.name}`,
    description: project.desc,
    image: project.img,
    url: `https://www.mayurilandmarks.com/project/${project.id}`,
    category: project.type,
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
