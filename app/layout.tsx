import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { getOrganizationSchema } from '@/lib/jsonLd';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const magtis = localFont({
  src: '../public/Fonts/Magtis.otf',
  variable: '--font-magtis',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#8BC7D8',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mayurilandmarks.com'),
  title: {
    default: 'Mayuri Landmarks | Luxury Real Estate & Residential Townships',
    template: '%s | Mayuri Landmarks',
  },
  description:
    'Discover luxury residential townships, commercial towers, bespoke villas, and interior design solutions by Mayuri Landmarks in Pune, Maharashtra.',
  keywords: [
    'Mayuri Landmarks',
    'Real Estate Pune',
    'Luxury Apartments Pune',
    'Commercial Towers Pune',
    'Residential Townships',
    'Villas in Pune',
    'Interior Design Pune',
  ],
  authors: [{ name: 'Mayuri Landmarks' }],
  creator: 'Mayuri Landmarks',
  publisher: 'Mayuri Landmarks',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Mayuri Landmarks | Luxury Real Estate Developer',
    description:
      'Elevating modern living with iconic architectural developments, townships, and interior design solutions.',
    url: 'https://www.mayurilandmarks.com',
    siteName: 'Mayuri Landmarks',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/BG_Images/building_1.png',
        width: 1200,
        height: 630,
        alt: 'Mayuri Landmarks Skyline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mayuri Landmarks | Luxury Real Estate Developer',
    description:
      'Discover premier residential townships, commercial hubs, and luxury villas.',
    images: ['/assets/BG_Images/building_1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.mayurilandmarks.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} ${magtis.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#F5F5F3] dark:bg-[#111111] text-black dark:text-white transition-colors duration-500">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#6CAFBF] focus:text-black focus:font-bold focus:rounded-sm focus:shadow-2xl"
        >
          Skip to Main Content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
