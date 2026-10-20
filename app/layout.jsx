import './globals.css';
import './blog.css';
import PrivacyPreferences from '@/components/PrivacyPreferences';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { siteName, siteUrl } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Paint Calculator - How Much Paint Do I Need? | Interior Tailor',
    template: '%s | Interior Tailor',
  },
  description:
    'Calculate how much paint you need for walls and ceilings, then explore paint colors with Interior Tailor.',
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
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="y0IVZw2NV6fDP3lkl58mXg" async />
      </head>
      <body>
        <JsonLd data={structuredData} />
        <Header />
        {children}
        <Footer />
        <PrivacyPreferences />
      </body>
    </html>
  );
}
