'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// ─── All tools listed in the dropdown ────────────────────────────────────────
const toolsLinks = [
  // ── Paint & colour ──
  { href: '/paint-calculator/',        label: 'Paint Calculator',           group: 'Paint & Colour' },
  { href: '/room-color-visualizer/',   label: 'Room Color Visualizer',      group: 'Paint & Colour' },
  { href: '/color-mixing/',            label: 'Color Mixing Lab',           group: 'Paint & Colour' },
  { href: '/wallpaper-calculator/',    label: 'Wallpaper Calculator',       group: 'Paint & Colour' },
  // ── Concrete & masonry ──
  { href: '/concrete-calculator/',     label: 'Concrete Calculator',        group: 'Concrete & Masonry' },
  { href: '/concrete-slab-calculator/', label: 'Concrete Slab Calculator',  group: 'Concrete & Masonry' },
  { href: '/concrete-bag-calculator/', label: 'Concrete Bag Calculator',    group: 'Concrete & Masonry' },
  { href: '/tile-calculator/',         label: 'Tile Calculator',            group: 'Concrete & Masonry' },
  { href: '/paver-calculator/',        label: 'Paver Calculator',           group: 'Concrete & Masonry' },
  { href: '/grout-calculator/',        label: 'Grout Calculator',           group: 'Concrete & Masonry' },
  // ── Landscaping ──
  { href: '/gravel-calculator/',       label: 'Gravel Calculator',          group: 'Landscaping' },
  { href: '/mulch-calculator/',        label: 'Mulch Calculator',           group: 'Landscaping' },
  { href: '/topsoil-calculator/',      label: 'Topsoil Calculator',         group: 'Landscaping' },
  { href: '/sod-calculator/',          label: 'Sod Calculator',             group: 'Landscaping' },
  { href: '/pool-volume-calculator/',  label: 'Pool Volume Calculator',     group: 'Landscaping' },
  // ── Building & structure ──
  { href: '/square-footage-calculator/', label: 'Square Footage Calculator', group: 'Building & Structure' },
  { href: '/roofing-calculator/',      label: 'Roofing Calculator',         group: 'Building & Structure' },
  { href: '/roof-pitch-calculator/',   label: 'Roof Pitch Calculator',      group: 'Building & Structure' },
  { href: '/insulation-calculator/',   label: 'Insulation Calculator',      group: 'Building & Structure' },
  { href: '/stair-calculator/',        label: 'Stair Calculator',           group: 'Building & Structure' },
  { href: '/fence-calculator/',        label: 'Fence Calculator',           group: 'Building & Structure' },
  { href: '/deck-cost-calculator/',    label: 'Deck Cost Calculator',       group: 'Building & Structure' },
  // ── Flooring & interior ──
  { href: '/flooring-calculator/',     label: 'Flooring Calculator',        group: 'Flooring & Interior' },
  // ── Masonry & concrete (new) ──
  { href: '/brick-calculator/',        label: 'Brick Calculator',           group: 'Masonry & Materials' },
  { href: '/block-calculator/',        label: 'Block Calculator',           group: 'Masonry & Materials' },
  { href: '/mortar-calculator/',       label: 'Mortar Calculator',          group: 'Masonry & Materials' },
  { href: '/cement-calculator/',       label: 'Cement Calculator',          group: 'Masonry & Materials' },
  { href: '/rebar-calculator/',        label: 'Rebar Calculator',           group: 'Masonry & Materials' },
  // ── Volume & lumber ──
  { href: '/board-foot-calculator/',   label: 'Board Foot Calculator',      group: 'Volume & Lumber' },
  { href: '/cubic-yard-calculator/',   label: 'Cubic Yard Calculator',      group: 'Volume & Lumber' },
  { href: '/cubic-feet-calculator/',   label: 'Cubic Feet Calculator',      group: 'Volume & Lumber' },
  // ── Electrical & solar ──
  { href: '/voltage-drop-calculator/', label: 'Voltage Drop Calculator',    group: 'Electrical & Solar' },
  { href: '/wire-size-calculator/',    label: 'Wire Size Calculator',       group: 'Electrical & Solar' },
  { href: '/solar-panel-calculator/',  label: 'Solar Panel Calculator',     group: 'Electrical & Solar' },
  // ── Pool ──
  { href: '/pool-gallon-calculator/',  label: 'Pool Gallon Calculator',     group: 'Pool' },
  { href: '/pool-chemical-calculator/',label: 'Pool Chemical Calculator',   group: 'Pool' },
  // ── HVAC ──
  { href: '/hvac-btu-calculator/',     label: 'HVAC BTU Calculator',        group: 'HVAC' },
  { href: '/ac-size-calculator/',      label: 'AC Size Calculator',         group: 'HVAC' },
  // ── Structural ──
  { href: '/joist-span-calculator/',   label: 'Joist Span Calculator',      group: 'Structural' },
  { href: '/deck-stair-calculator/',   label: 'Deck Stair Calculator',      group: 'Structural' },
  { href: '/retaining-wall-calculator/',label: 'Retaining Wall Calculator', group: 'Structural' },
];

// ── Icon map keyed by href ────────────────────────────────────────────────────
const ICONS = {
  '/paint-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3l7 7-8.5 8.5a3 3 0 0 1-4.24 0l-2.76-2.76a3 3 0 0 1 0-4.24L14 3z"/></svg>,
  '/room-color-visualizer/':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 17h18"/></svg>,
  '/color-mixing/':              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2h6v6.2c0 .6.2 1.3.5 1.8l3.7 5.7c1 1.6-.1 3.8-2.2 3.8H7c-2.1 0-3.2-2.2-2.2-3.8L8.5 10c.3-.5.5-1.2.5-1.8V2z"/></svg>,
  '/wallpaper-calculator/':      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>,
  '/concrete-calculator/':       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg>,
  '/concrete-slab-calculator/':  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="10" rx="1"/><path d="M6 8V6h12v2"/></svg>,
  '/concrete-bag-calculator/':   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2h12l2 6H4L6 2z"/><rect x="3" y="8" width="18" height="14" rx="1"/></svg>,
  '/tile-calculator/':           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>,
  '/paver-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="9" height="6" rx="1"/><rect x="13" y="2" width="9" height="6" rx="1"/><rect x="2" y="10" width="9" height="6" rx="1"/><rect x="13" y="10" width="9" height="6" rx="1"/><rect x="2" y="18" width="9" height="4" rx="1"/><rect x="13" y="18" width="9" height="4" rx="1"/></svg>,
  '/grout-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3z"/><path d="M3 12h18M12 3v18"/></svg>,
  '/gravel-calculator/':         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>,
  '/mulch-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c-4 6-6 10-6 13a6 6 0 0 0 12 0c0-3-2-7-6-13z"/></svg>,
  '/topsoil-calculator/':        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18c4-4 14-4 18 0"/><path d="M3 14c4-4 14-4 18 0"/></svg>,
  '/sod-calculator/':            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="14" width="20" height="6" rx="1"/><path d="M6 14V8m4-2v8m4-5v5m4-3v3"/></svg>,
  '/pool-volume-calculator/':    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M7 7V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"/></svg>,
  '/square-footage-calculator/': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>,
  '/roofing-calculator/':        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l9-9 9 9M5 10v9h14V10"/></svg>,
  '/roof-pitch-calculator/':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 20l9-16 9 16"/></svg>,
  '/insulation-calculator/':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 10h18M3 14h18M3 18h18"/></svg>,
  '/stair-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18h4v-4h4v-4h4v-4h4"/></svg>,
  '/fence-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M6 4v16M10 4v16M14 4v16M18 4v16M4 8h2M8 8h2M12 8h2M16 8h2"/></svg>,
  '/deck-cost-calculator/':      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="12" width="20" height="8" rx="1"/><path d="M5 12V6m4-2v8m4-5v7m4-3v5"/></svg>,
  '/flooring-calculator/':       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="14" rx="1"/><path d="M2 11h20M2 16h20M8 6v14M14 6v14"/></svg>,
  // Masonry & Materials
  '/brick-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="4" rx="1"/><rect x="2" y="13" width="20" height="4" rx="1"/></svg>,
  '/block-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="6" rx="1"/><rect x="2" y="13" width="20" height="6" rx="1"/></svg>,
  '/mortar-calculator/':         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>,
  '/cement-calculator/':         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2h12l2 6H4L6 2z"/><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M9 8v13"/></svg>,
  '/rebar-calculator/':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  // Volume & Lumber
  '/board-foot-calculator/':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="1"/><path d="M7 8V5m10 3V5"/></svg>,
  '/cubic-yard-calculator/':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3L3 8v8l9 5 9-5V8L12 3z"/><path d="M3 8l9 5m0 0v8m0-8l9-5"/></svg>,
  '/cubic-feet-calculator/':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>,
  // Electrical & Solar
  '/voltage-drop-calculator/':   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  '/wire-size-calculator/':      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 7h18M3 17h18"/></svg>,
  '/solar-panel-calculator/':    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/></svg>,
  // Pool
  '/pool-gallon-calculator/':    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0"/><path d="M2 12c2-8 16-8 20 0v8H2v-8z"/></svg>,
  '/pool-chemical-calculator/':  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2h6v7l4 5a4 4 0 0 1-3.2 6.4H8.2A4 4 0 0 1 5 15l4-6V2z"/></svg>,
  // HVAC
  '/hvac-btu-calculator/':       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>,
  '/ac-size-calculator/':        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 11h.01M10 11h.01M14 11h.01"/><path d="M2 13h20"/></svg>,
  // Structural
  '/joist-span-calculator/':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 8h20M2 16h20M6 8v8M12 8v8M18 8v8"/></svg>,
  '/deck-stair-calculator/':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 20h4v-4h4v-4h4v-4h4v-4"/></svg>,
  '/retaining-wall-calculator/': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="4" rx="1"/><rect x="2" y="12" width="20" height="4" rx="1"/><rect x="2" y="18" width="20" height="3" rx="1"/></svg>,
};

// Build unique groups in insertion order
function getGroups() {
  const seen = new Set();
  const groups = [];
  for (const t of toolsLinks) {
    if (!seen.has(t.group)) { seen.add(t.group); groups.push(t.group); }
  }
  return groups;
}

export default function Header() {
  const pathname = usePathname() || '/';
  const [menuOpen, setMenuOpen]   = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mounted, setMounted]     = useState(false);
  const hamburgerRef = useRef(null);
  const drawerRef    = useRef(null);
  const toolsBtnRef  = useRef(null);
  const toolsMenuRef = useRef(null);

  const isTools = toolsLinks.some(t => pathname.startsWith(t.href));

  const active =
    pathname === '/'                                                                   ? 'home'       :
    (pathname.startsWith('/paint-calculator') || pathname.startsWith('/calculator'))   ? 'calculator' :
    pathname.startsWith('/room-color-visualizer')                                      ? 'visualizer' :
    pathname.startsWith('/color-mixing')                                               ? 'mixer'      :
    pathname.startsWith('/about')                                                      ? 'about'      :
    pathname.startsWith('/contact')                                                    ? 'contact'    : '';

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMenuOpen(false); setToolsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const h = e => {
      if (!drawerRef.current?.contains(e.target) && !hamburgerRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const h = e => { if (e.key === 'Escape') { setMenuOpen(false); hamburgerRef.current?.focus(); } };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [menuOpen]);

  useEffect(() => {
    if (!toolsOpen) return;
    const h = e => {
      if (!toolsBtnRef.current?.contains(e.target) && !toolsMenuRef.current?.contains(e.target)) setToolsOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [toolsOpen]);

  useEffect(() => {
    if (!toolsOpen) return;
    const h = e => { if (e.key === 'Escape') { setToolsOpen(false); toolsBtnRef.current?.focus(); } };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [toolsOpen]);

  const mainLinks = [
    { id: 'home',       href: '/',                       label: 'Home' },
    { id: 'about',      href: '/about/',                 label: 'About' },
    { id: 'contact',    href: '/contact/',               label: 'Contact' },
  ];

  const groups = getGroups();

  // ── Mobile drawer ─────────────────────────────────────────────────────────
  const drawer = (
    <>
      <div className={`nav-overlay${menuOpen ? ' is-visible' : ''}`} aria-hidden="true" onClick={() => setMenuOpen(false)} />
      <div id="mobile-nav" ref={drawerRef}
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Site navigation">

        <div className="mobile-nav__head">
          <a href="/" className="mobile-nav__brand" onClick={() => setMenuOpen(false)}>
            <img src="/assets/interior-tailor-logo.png" alt="Interior Tailor" className="mobile-nav__logo" />
          </a>
          <button className="mobile-nav__close" aria-label="Close menu" onClick={() => setMenuOpen(false)} type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="mobile-nav__body">
          {mainLinks.map(({ id, href, label }) => (
            <a key={id} href={href} onClick={() => setMenuOpen(false)}
              className={`mobile-nav__link${active === id ? ' active' : ''}`}>
              {label}
              {active === id && (
                <svg className="mobile-nav__tick" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </a>
          ))}

          {groups.map(group => (
            <div key={group}>
              <div className="mobile-nav__section-label">{group}</div>
              {toolsLinks.filter(t => t.group === group).map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}
                  className={`mobile-nav__link mobile-nav__link--tool${pathname.startsWith(href) ? ' active' : ''}`}>
                  <span className="mobile-nav__link-icon">{ICONS[href]}</span>
                  {label}
                  {pathname.startsWith(href) && (
                    <svg className="mobile-nav__tick" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="mobile-nav__foot"><p>© 2026 Interior Tailor</p></div>
      </div>
    </>
  );

  return (
    <>
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="site-brand" href="/" aria-label="Interior Tailor home">
            <img src="/assets/interior-tailor-logo.png" alt="Interior Tailor" className="site-logo" />
          </a>

          <div className="site-links" role="list">
            {mainLinks.map(({ id, href, label }) => (
              <a key={id} href={href} role="listitem" className={active === id ? 'active' : ''}>
                {label}
              </a>
            ))}

            {/* ── Tools mega-dropdown ── */}
            <div className="nav-dropdown" role="listitem">
              <button ref={toolsBtnRef} type="button"
                className={`nav-dropdown__trigger${isTools ? ' active' : ''}${toolsOpen ? ' is-open' : ''}`}
                aria-haspopup="true" aria-expanded={toolsOpen}
                onClick={() => setToolsOpen(v => !v)}>
                Tools
                <svg className="nav-dropdown__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <div ref={toolsMenuRef} role="menu"
                className={`nav-dropdown__menu nav-dropdown__menu--wide${toolsOpen ? ' is-open' : ''}`}>
                {groups.map(group => (
                  <div key={group} className="nav-dropdown__group">
                    <div className="nav-dropdown__group-label">{group}</div>
                    {toolsLinks.filter(t => t.group === group).map(({ href, label }) => (
                      <a key={href} href={href} role="menuitem"
                        className={`nav-dropdown__item${pathname.startsWith(href) ? ' active' : ''}`}
                        onClick={() => setToolsOpen(false)}>
                        <span className="nav-dropdown__item-icon">{ICONS[href]}</span>
                        {label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button ref={hamburgerRef} type="button"
            className={`hamburger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen} aria-controls="mobile-nav"
            onClick={() => setMenuOpen(v => !v)}>
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
          </button>
        </nav>
      </header>

      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
