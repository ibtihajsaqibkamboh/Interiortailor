// Server component — no 'use client' needed
const CATEGORIES = [
  {
    name: 'Paint & Colour',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 3l7 7-8.5 8.5a3 3 0 0 1-4.24 0l-2.76-2.76a3 3 0 0 1 0-4.24L14 3z"/>
        <path d="M6 18c0 1.1-.9 2-2 2s-2-.9-2-2 2-4 2-4 2 2.9 2 4z"/>
      </svg>
    ),
    color: '#6F5AF5',
    bg: '#EEEAFE',
    tools: [
      { href: '/paint-calculator/',      label: 'Paint Calculator',      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3l7 7-8.5 8.5a3 3 0 0 1-4.24 0l-2.76-2.76a3 3 0 0 1 0-4.24L14 3z"/></svg> },
      { href: '/room-color-visualizer/', label: 'Room Color Visualizer', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 17h18"/></svg> },
      { href: '/color-mixing/',          label: 'Color Mixing Lab',      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2h6v6.2c0 .6.2 1.3.5 1.8l3.7 5.7c1 1.6-.1 3.8-2.2 3.8H7c-2.1 0-3.2-2.2-2.2-3.8L8.5 10c.3-.5.5-1.2.5-1.8V2z"/></svg> },
      { href: '/wallpaper-calculator/',  label: 'Wallpaper Calculator',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg> },
    ],
  },
  {
    name: 'Concrete & Masonry',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 9v12"/>
      </svg>
    ),
    color: '#8B5A2B',
    bg: '#F5EDE4',
    tools: [
      { href: '/concrete-calculator/',      label: 'Concrete Calculator',      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg> },
      { href: '/concrete-slab-calculator/', label: 'Concrete Slab Calculator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="10" rx="1"/><path d="M6 8V6h12v2"/></svg> },
      { href: '/concrete-bag-calculator/',  label: 'Concrete Bag Calculator',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2h12l2 6H4L6 2z"/><rect x="3" y="8" width="18" height="14" rx="1"/></svg> },
      { href: '/tile-calculator/',          label: 'Tile Calculator',          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg> },
      { href: '/paver-calculator/',         label: 'Paver Calculator',         icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="9" height="6" rx="1"/><rect x="13" y="2" width="9" height="6" rx="1"/><rect x="2" y="10" width="9" height="6" rx="1"/><rect x="13" y="10" width="9" height="6" rx="1"/></svg> },
      { href: '/grout-calculator/',         label: 'Grout Calculator',         icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3z"/><path d="M3 12h18M12 3v18"/></svg> },
    ],
  },
  {
    name: 'Masonry & Materials',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="4" rx="1"/>
        <rect x="2" y="13" width="20" height="4" rx="1"/>
      </svg>
    ),
    color: '#B45309',
    bg: '#FEF3C7',
    tools: [
      { href: '/brick-calculator/',    label: 'Brick Calculator',    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="4" rx="1"/><rect x="2" y="13" width="20" height="4" rx="1"/></svg> },
      { href: '/block-calculator/',    label: 'Block Calculator',    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="6" rx="1"/><rect x="2" y="13" width="20" height="6" rx="1"/></svg> },
      { href: '/mortar-calculator/',   label: 'Mortar Calculator',   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg> },
      { href: '/cement-calculator/',   label: 'Cement Calculator',   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2h12l2 6H4L6 2z"/><rect x="3" y="8" width="18" height="13" rx="1"/></svg> },
      { href: '/rebar-calculator/',    label: 'Rebar Calculator',    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg> },
    ],
  },
  {
    name: 'Landscaping',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2c-4 6-6 10-6 13a6 6 0 0 0 12 0c0-3-2-7-6-13z"/>
      </svg>
    ),
    color: '#3FB673',
    bg: '#DCFCE7',
    tools: [
      { href: '/gravel-calculator/',      label: 'Gravel Calculator',      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg> },
      { href: '/mulch-calculator/',       label: 'Mulch Calculator',       icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c-4 6-6 10-6 13a6 6 0 0 0 12 0c0-3-2-7-6-13z"/></svg> },
      { href: '/topsoil-calculator/',     label: 'Topsoil Calculator',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18c4-4 14-4 18 0"/><path d="M3 14c4-4 14-4 18 0"/></svg> },
      { href: '/sod-calculator/',         label: 'Sod Calculator',         icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="14" width="20" height="6" rx="1"/><path d="M6 14V8m4-2v8m4-5v5m4-3v3"/></svg> },
      { href: '/pool-volume-calculator/', label: 'Pool Volume Calculator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 7V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"/></svg> },
    ],
  },
  {
    name: 'Building & Structure',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12l9-9 9 9M5 10v9h14V10"/>
      </svg>
    ),
    color: '#4C82F7',
    bg: '#DBEAFE',
    tools: [
      { href: '/square-footage-calculator/', label: 'Square Footage Calculator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg> },
      { href: '/roofing-calculator/',        label: 'Roofing Calculator',        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l9-9 9 9M5 10v9h14V10"/></svg> },
      { href: '/roof-pitch-calculator/',     label: 'Roof Pitch Calculator',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 20l9-16 9 16"/></svg> },
      { href: '/insulation-calculator/',     label: 'Insulation Calculator',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 10h18M3 14h18M3 18h18"/></svg> },
      { href: '/stair-calculator/',          label: 'Stair Calculator',          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18h4v-4h4v-4h4v-4h4"/></svg> },
      { href: '/fence-calculator/',          label: 'Fence Calculator',          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M6 4v16M10 4v16M14 4v16M18 4v16"/></svg> },
      { href: '/deck-cost-calculator/',      label: 'Deck Cost Calculator',      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="12" width="20" height="8" rx="1"/><path d="M5 12V6m4-2v8m4-5v7m4-3v5"/></svg> },
    ],
  },
  {
    name: 'Structural',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 8h20M2 16h20M6 8v8M12 8v8M18 8v8"/>
      </svg>
    ),
    color: '#0891B2',
    bg: '#CFFAFE',
    tools: [
      { href: '/joist-span-calculator/',    label: 'Joist Span Calculator',    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 8h20M2 16h20M6 8v8M12 8v8M18 8v8"/></svg> },
      { href: '/deck-stair-calculator/',    label: 'Deck Stair Calculator',    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 20h4v-4h4v-4h4v-4h4v-4"/></svg> },
      { href: '/retaining-wall-calculator/',label: 'Retaining Wall Calculator',icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="4" rx="1"/><rect x="2" y="12" width="20" height="4" rx="1"/><rect x="2" y="18" width="20" height="3" rx="1"/></svg> },
    ],
  },
  {
    name: 'Volume & Lumber',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3L3 8v8l9 5 9-5V8L12 3z"/>
        <path d="M3 8l9 5m0 0v8m0-8l9-5"/>
      </svg>
    ),
    color: '#7C3AED',
    bg: '#EDE9FE',
    tools: [
      { href: '/board-foot-calculator/', label: 'Board Foot Calculator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="1"/><path d="M7 8V5m10 3V5"/></svg> },
      { href: '/cubic-yard-calculator/', label: 'Cubic Yard Calculator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3L3 8v8l9 5 9-5V8L12 3z"/><path d="M3 8l9 5m0 0v8m0-8l9-5"/></svg> },
      { href: '/cubic-feet-calculator/', label: 'Cubic Feet Calculator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg> },
    ],
  },
  {
    name: 'Flooring & Interior',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="6" width="20" height="14" rx="1"/>
        <path d="M2 11h20M2 16h20M8 6v14M14 6v14"/>
      </svg>
    ),
    color: '#DB2777',
    bg: '#FCE7F3',
    tools: [
      { href: '/flooring-calculator/',   label: 'Flooring Calculator',   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="14" rx="1"/><path d="M2 11h20M2 16h20M8 6v14M14 6v14"/></svg> },
      { href: '/wallpaper-calculator/',  label: 'Wallpaper Calculator',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg> },
    ],
  },
  {
    name: 'Pool',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0"/>
        <path d="M2 12c2-8 16-8 20 0v8H2v-8z"/>
      </svg>
    ),
    color: '#0369A1',
    bg: '#E0F2FE',
    tools: [
      { href: '/pool-volume-calculator/',  label: 'Pool Volume Calculator',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 7V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"/></svg> },
      { href: '/pool-gallon-calculator/',  label: 'Pool Gallon Calculator',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0"/><path d="M2 12c2-8 16-8 20 0v8H2v-8z"/></svg> },
      { href: '/pool-chemical-calculator/',label: 'Pool Chemical Calculator',icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2h6v7l4 5a4 4 0 0 1-3.2 6.4H8.2A4 4 0 0 1 5 15l4-6V2z"/></svg> },
    ],
  },
  {
    name: 'HVAC',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/>
      </svg>
    ),
    color: '#0D9488',
    bg: '#CCFBF1',
    tools: [
      { href: '/hvac-btu-calculator/', label: 'HVAC BTU Calculator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg> },
      { href: '/ac-size-calculator/',  label: 'AC Size Calculator',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 11h.01M10 11h.01M14 11h.01"/><path d="M2 13h20"/></svg> },
    ],
  },
  {
    name: 'Electrical & Solar',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    color: '#D97706',
    bg: '#FEF3C7',
    tools: [
      { href: '/voltage-drop-calculator/', label: 'Voltage Drop Calculator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
      { href: '/wire-size-calculator/',    label: 'Wire Size Calculator',    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 7h18M3 17h18"/></svg> },
      { href: '/solar-panel-calculator/',  label: 'Solar Panel Calculator',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/></svg> },
    ],
  },
];

export default function ToolsGrid() {
  return (
    <section className="tools-grid-section" aria-label="All calculator tools">
      <div className="tools-grid-header">
        <span className="eyebrow">ALL TOOLS</span>
        <h2 className="tools-grid-title">Every Calculator, Organized</h2>
        <p className="tools-grid-subtitle">
          Pick a category below to find the right estimator for your project.
        </p>
      </div>

      <div className="tools-categories">
        {CATEGORIES.map(cat => (
          <div key={cat.name} className="tools-category">
            <div className="tools-category__header">
              <span className="tools-category__icon" style={{ color: cat.color, background: cat.bg }}>
                {cat.icon}
              </span>
              <h3 className="tools-category__name">{cat.name}</h3>
            </div>
            <div className="tools-category__grid">
              {cat.tools.map(tool => (
                <a key={tool.href} href={tool.href} className="tool-card">
                  <span className="tool-card__icon" style={{ color: cat.color, background: cat.bg }}>
                    {tool.icon}
                  </span>
                  <span className="tool-card__label">{tool.label}</span>
                  <svg className="tool-card__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
