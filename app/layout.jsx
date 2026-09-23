import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { siteName, siteUrl } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Paint Calculator - How Much Paint Do I Need? | Paint Planners',
    template: '%s | Paint Planners',
  },
  description:
    'Calculate how much paint you need for walls and ceilings, then explore paint colors with Paint Planners.',
  icons: {
    icon: '/assets/paint-planners-icon.png',
  },
};

export default function RootLayout({ children }) {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/assets/paint-planners-logo.png`,
    },
  ];

  return (
    <html lang="en">
      <body>
        <JsonLd data={structuredData} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
