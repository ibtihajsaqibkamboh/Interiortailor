export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://interiortailor.com').replace(/\/$/, '');

export const siteName = 'Interior Tailor';

export function pageMetadata({ title, description, path = '/', type = 'website' }) {
  const canonical = path === '/' ? '/' : path;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonical}`,
      siteName,
      type,
    },
  };
}

export const publicRoutes = [
  '/',
  '/paint-calculator/',
  '/room-color-visualizer/',
  '/color-mixing/',
  '/concrete-calculator/',
  '/gravel-calculator/',
  '/mulch-calculator/',
  '/how-much-paint-do-i-need/',
  '/how-to-calculate-wall-area-for-painting/',
  '/how-many-coats-of-paint-do-i-need/',
  '/about/',
  '/contact/',
  '/privacy-policy/',
  '/terms/',
];
