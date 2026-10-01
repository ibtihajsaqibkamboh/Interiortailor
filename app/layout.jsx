import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { siteName, siteUrl } from '@/lib/site';

const GA_ID = 'G-NNVDRXJN21';

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
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body>
        <JsonLd data={structuredData} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
