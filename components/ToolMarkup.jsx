'use client';

import { useEffect, useRef } from 'react';

/**
 * Fetches tool-content.html on the CLIENT after mount and injects it into
 * the DOM. This keeps it out of the server-rendered HTML so the initial page
 * size stays small (fixes SEMrush "too large HTML" warnings).
 */
export default function ToolMarkup() {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/tool-content.html')
      .then(r => r.text())
      .then(html => {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = html;
        }
      })
      .catch(() => {
        // silently fail — ToolBoot will handle missing elements gracefully
      });

    return () => { cancelled = true; };
  }, []);

  return <div ref={ref} />;
}
