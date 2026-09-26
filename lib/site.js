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
  // concrete & masonry
  '/concrete-calculator/',
  '/concrete-slab-calculator/',
  '/concrete-bag-calculator/',
  '/tile-calculator/',
  '/paver-calculator/',
  '/grout-calculator/',
  // landscaping
  '/gravel-calculator/',
  '/mulch-calculator/',
  '/topsoil-calculator/',
  '/sod-calculator/',
  '/pool-volume-calculator/',
  // building & structure
  '/square-footage-calculator/',
  '/roofing-calculator/',
  '/roof-pitch-calculator/',
  '/insulation-calculator/',
  '/stair-calculator/',
  '/fence-calculator/',
  '/deck-cost-calculator/',
  // masonry & concrete
  '/brick-calculator/',
  '/block-calculator/',
  '/mortar-calculator/',
  '/cement-calculator/',
  '/rebar-calculator/',
  // volume & lumber
  '/board-foot-calculator/',
  '/cubic-yard-calculator/',
  '/cubic-feet-calculator/',
  // electrical & solar
  '/voltage-drop-calculator/',
  '/wire-size-calculator/',
  '/solar-panel-calculator/',
  // pool
  '/pool-gallon-calculator/',
  '/pool-chemical-calculator/',
  // HVAC
  '/hvac-btu-calculator/',
  '/ac-size-calculator/',
  // structural
  '/joist-span-calculator/',
  '/deck-stair-calculator/',
  '/retaining-wall-calculator/',
  // flooring & interior
  '/flooring-calculator/',
  '/wallpaper-calculator/',
  // articles
  '/how-much-paint-do-i-need/',
  '/how-to-calculate-wall-area-for-painting/',
  '/how-many-coats-of-paint-do-i-need/',
  '/about/',
  '/contact/',
  '/privacy-policy/',
  '/terms/',
];
