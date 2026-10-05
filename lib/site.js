export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.interiortailor.com').replace(/\/$/, '');

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
  // ── Home ──
  { path: '/',                                    priority: 1.0,  changeFrequency: 'weekly'  },

  // ── Paint & colour ──
  { path: '/paint-calculator/',                   priority: 0.9,  changeFrequency: 'monthly' },
  { path: '/room-color-visualizer/',              priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/color-mixing/',                       priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/wallpaper-calculator/',               priority: 0.7,  changeFrequency: 'monthly' },

  // ── Concrete & masonry ──
  { path: '/concrete-calculator/',                priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/concrete-slab-calculator/',           priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/concrete-bag-calculator/',            priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/tile-calculator/',                    priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/paver-calculator/',                   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/grout-calculator/',                   priority: 0.7,  changeFrequency: 'monthly' },

  // ── Masonry & materials ──
  { path: '/brick-calculator/',                   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/block-calculator/',                   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/mortar-calculator/',                  priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/cement-calculator/',                  priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/rebar-calculator/',                   priority: 0.7,  changeFrequency: 'monthly' },

  // ── Landscaping ──
  { path: '/gravel-calculator/',                  priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/mulch-calculator/',                   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/topsoil-calculator/',                 priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/sod-calculator/',                     priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/pool-volume-calculator/',             priority: 0.7,  changeFrequency: 'monthly' },

  // ── Building & structure ──
  { path: '/square-footage-calculator/',          priority: 0.8,  changeFrequency: 'monthly' },
  { path: '/roofing-calculator/',                 priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/roof-pitch-calculator/',              priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/insulation-calculator/',              priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/stair-calculator/',                   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/fence-calculator/',                   priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/deck-cost-calculator/',               priority: 0.7,  changeFrequency: 'monthly' },

  // ── Structural ──
  { path: '/joist-span-calculator/',              priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/deck-stair-calculator/',              priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/retaining-wall-calculator/',          priority: 0.7,  changeFrequency: 'monthly' },

  // ── Volume & lumber ──
  { path: '/board-foot-calculator/',              priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/cubic-yard-calculator/',              priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/cubic-feet-calculator/',              priority: 0.7,  changeFrequency: 'monthly' },

  // ── Flooring & interior ──
  { path: '/flooring-calculator/',                priority: 0.7,  changeFrequency: 'monthly' },

  // ── Pool ──
  { path: '/pool-gallon-calculator/',             priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/pool-chemical-calculator/',           priority: 0.7,  changeFrequency: 'monthly' },

  // ── HVAC ──
  { path: '/hvac-btu-calculator/',                priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/ac-size-calculator/',                 priority: 0.7,  changeFrequency: 'monthly' },

  // ── Electrical & solar ──
  { path: '/voltage-drop-calculator/',            priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/wire-size-calculator/',               priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/solar-panel-calculator/',             priority: 0.7,  changeFrequency: 'monthly' },

  // ── Articles ──
  { path: '/how-much-paint-do-i-need/',           priority: 0.6,  changeFrequency: 'monthly' },
  { path: '/how-to-calculate-wall-area-for-painting/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/how-many-coats-of-paint-do-i-need/', priority: 0.6,  changeFrequency: 'monthly' },

  // ── Static pages ──
  { path: '/about/',                              priority: 0.5,  changeFrequency: 'yearly'  },
  { path: '/contact/',                            priority: 0.5,  changeFrequency: 'yearly'  },
  { path: '/privacy-policy/',                     priority: 0.3,  changeFrequency: 'yearly'  },
  { path: '/terms/',                              priority: 0.3,  changeFrequency: 'yearly'  },
];
