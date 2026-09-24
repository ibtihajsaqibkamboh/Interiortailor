'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const toolsLinks = [
  { href: '/concrete-calculator/', label: 'Concrete Calculator',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg> },
  { href: '/gravel-calculator/',   label: 'Gravel Calculator',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg> },
  { href: '/mulch-calculator/',    label: 'Mulch Calculator',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2c-4 6-6 10-6 13a6 6 0 0 0 12 0c0-3-2-7-6-13z"/></svg> },
];

export default function Header() {
  const pathname = usePathname() || '/';
  const [menuOpen, setMenuOpen]     = useState(false);
  const [toolsOpen, setToolsOpen]   = useState(false);
  const [mounted, setMounted]       = useState(false);
  const hamburgerRef  = useRef(null);
  const drawerRef     = useRef(null);
  const toolsBtnRef   = useRef(null);
  const toolsMenuRef  = useRef(null);

  const isTools = toolsLinks.some(t => pathname.startsWith(t.href));

  const active =
    pathname === '/'                                                           ? 'home'       :
    (pathname.startsWith('/paint-calculator') || pathname.startsWith('/calculator')) ? 'calculator' :
    pathname.startsWith('/room-color-visualizer')                              ? 'visualizer' :
    pathname.startsWith('/color-mixing')                                       ? 'mixer'      :
    pathname.startsWith('/about')                                              ? 'about'      :
    pathname.startsWith('/contact')                                            ? 'contact'    : '';

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMenuOpen(false); setToolsOpen(false); }, [pathname]);

  /* Lock body scroll when mobile drawer open */
  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  /* Close mobile drawer on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    function handle(e) {
      if (drawerRef.current?.contains(e.target)) return;
      if (hamburgerRef.current?.contains(e.target)) return;
      setMenuOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [menuOpen]);

  /* Close mobile drawer on Escape */
  useEffect(() => {
    if (!menuOpen) return;
    function handle(e) { if (e.key === 'Escape') { setMenuOpen(false); hamburgerRef.current?.focus(); } }
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [menuOpen]);

  /* Close Tools dropdown on outside click */
  useEffect(() => {
    if (!toolsOpen) return;
    function handle(e) {
      if (toolsBtnRef.current?.contains(e.target)) return;
      if (toolsMenuRef.current?.contains(e.target)) return;
      setToolsOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [toolsOpen]);

  /* Close Tools dropdown on Escape */
  useEffect(() => {
    if (!toolsOpen) return;
    function handle(e) { if (e.key === 'Escape') { setToolsOpen(false); toolsBtnRef.current?.focus(); } }
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [toolsOpen]);

  const mainLinks = [
    { id: 'home',       href: '/',                       label: 'Home' },
    { id: 'calculator', href: '/paint-calculator/',      label: 'Paint Calculator' },
    { id: 'visualizer', href: '/room-color-visualizer/', label: 'Room Visualizer' },
    { id: 'mixer',      href: '/color-mixing/',          label: 'Color Mixing Lab' },
    { id: 'about',      href: '/about/',                 label: 'About' },
    { id: 'contact',    href: '/contact/',               label: 'Contact' },
  ];

  /* ── Portal: mobile drawer + backdrop ── */
  const drawer = (
    <>
      <div
        className={`nav-overlay${menuOpen ? ' is-visible' : ''}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />
      <div
        id="mobile-nav"
        ref={drawerRef}
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        {/* Drawer header */}
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

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="mobile-nav__body">
          {mainLinks.map(({ id, href, label }) => (
            <a key={id} className={`mobile-nav__link${active === id ? ' active' : ''}`} href={href} onClick={() => setMenuOpen(false)}>
              {label}
              {active === id && (
                <svg className="mobile-nav__tick" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </a>
          ))}

          {/* Tools section in mobile drawer */}
          <div className="mobile-nav__section-label">More Tools</div>
          {toolsLinks.map(({ href, label, icon }) => (
            <a key={href} className={`mobile-nav__link mobile-nav__link--tool${pathname.startsWith(href) ? ' active' : ''}`} href={href} onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav__link-icon">{icon}</span>
              {label}
              {pathname.startsWith(href) && (
                <svg className="mobile-nav__tick" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </a>
          ))}
        </nav>

        <div className="mobile-nav__foot">
          <p>© 2026 Interior Tailor</p>
        </div>
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
              <a key={id} className={active === id ? 'active' : ''} href={href} role="listitem">
                {label}
              </a>
            ))}

            {/* ── Tools dropdown ── */}
            <div className="nav-dropdown" role="listitem">
              <button
                ref={toolsBtnRef}
                className={`nav-dropdown__trigger${isTools ? ' active' : ''}${toolsOpen ? ' is-open' : ''}`}
                aria-haspopup="true"
                aria-expanded={toolsOpen}
                onClick={() => setToolsOpen(v => !v)}
                type="button"
              >
                Tools
                <svg className="nav-dropdown__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              <div
                ref={toolsMenuRef}
                className={`nav-dropdown__menu${toolsOpen ? ' is-open' : ''}`}
                role="menu"
              >
                {toolsLinks.map(({ href, label, icon }) => (
                  <a
                    key={href}
                    href={href}
                    className={`nav-dropdown__item${pathname.startsWith(href) ? ' active' : ''}`}
                    role="menuitem"
                    onClick={() => setToolsOpen(false)}
                  >
                    <span className="nav-dropdown__item-icon">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <button
            ref={hamburgerRef}
            className={`hamburger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(v => !v)}
            type="button"
          >
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
