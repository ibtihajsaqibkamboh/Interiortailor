'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Header() {
  const pathname = usePathname() || '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hamburgerRef = useRef(null);
  const drawerRef = useRef(null);

  const active =
    pathname === '/' ? 'home' :
    (pathname.startsWith('/paint-calculator') || pathname.startsWith('/calculator')) ? 'calculator' :
    pathname.startsWith('/room-color-visualizer') ? 'visualizer' :
    pathname.startsWith('/color-mixing') ? 'mixer' :
    pathname.startsWith('/about') ? 'about' :
    pathname.startsWith('/contact') ? 'contact' : '';

  /* Mount guard for portal */
  useEffect(() => { setMounted(true); }, []);

  /* Close on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Close on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (
        drawerRef.current && !drawerRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const links = [
    { id: 'home',       href: '/',                       label: 'Home' },
    { id: 'calculator', href: '/paint-calculator/',      label: 'Paint Calculator' },
    { id: 'visualizer', href: '/room-color-visualizer/', label: 'Room Visualizer' },
    { id: 'mixer',      href: '/color-mixing/',          label: 'Color Mixing Lab' },
    { id: 'about',      href: '/about/',                 label: 'About' },
    { id: 'contact',    href: '/contact/',               label: 'Contact' },
  ];

  /* Drawer + overlay rendered via portal so position:fixed anchors to viewport */
  const drawer = (
    <>
      {/* Backdrop */}
      <div
        className={`nav-overlay${menuOpen ? ' is-visible' : ''}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}
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
            <img
              src="/assets/interior-tailor-logo.png"
              alt="Interior Tailor"
              className="mobile-nav__logo"
            />
          </a>
          <button
            className="mobile-nav__close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="mobile-nav__body">
          {links.map(({ id, href, label }) => (
            <a
              key={id}
              className={`mobile-nav__link${active === id ? ' active' : ''}`}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              {active === id && (
                <svg className="mobile-nav__tick" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </a>
          ))}
        </nav>

        {/* Drawer footer */}
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
            <img
              src="/assets/interior-tailor-logo.png"
              alt="Interior Tailor"
              className="site-logo"
            />
          </a>

          <div className="site-links" role="list">
            {links.map(({ id, href, label }) => (
              <a
                key={id}
                className={active === id ? 'active' : ''}
                href={href}
                role="listitem"
              >
                {label}
              </a>
            ))}
          </div>

          <button
            ref={hamburgerRef}
            className={`hamburger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
          </button>
        </nav>
      </header>

      {/* Portal: drawer + overlay render directly under <body> */}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
