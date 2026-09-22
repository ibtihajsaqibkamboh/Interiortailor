'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname() || '/';
  const active = pathname === '/' ? 'home' :
    pathname.startsWith('/calculator') ? 'calculator' :
    pathname.startsWith('/color-mixing') ? 'mixer' :
    pathname.startsWith('/about') ? 'about' :
    pathname.startsWith('/contact') ? 'contact' : '';

  return (
    <header className="site-header">
      <nav className="site-nav">
        <a className="site-brand" href="/" aria-label="Paint Planners home">
          <img src="/assets/paint-planners-logo.png" alt="Paint Planners" className="site-logo" />
        </a>
        <div className="site-links">
          <a className={active === 'home' ? 'active' : ''} href="/">Home</a>
          <a className={active === 'calculator' ? 'active' : ''} href="/calculator/">Paint Calculator</a>
          <a className={active === 'mixer' ? 'active' : ''} href="/color-mixing/">Color Mixing Lab</a>
          <a className={active === 'about' ? 'active' : ''} href="/about/">About</a>
          <a className={active === 'contact' ? 'active' : ''} href="/contact/">Contact</a>
        </div>
      </nav>
    </header>
  );
}
