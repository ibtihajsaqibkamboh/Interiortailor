'use client';

import { useEffect, useRef } from 'react';

/**
 * Fetches tool-content.html on the CLIENT after mount and injects it into
 * the DOM. Dispatches a custom 'toolmarkup:ready' event on window once the
 * HTML is injected so ToolBoot knows it is safe to load app.js.
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
          // Signal ToolBoot that the DOM nodes (tabs, pages) are ready
          window.dispatchEvent(new CustomEvent('toolmarkup:ready'));
        }
      })
      .catch(() => {
        // Even on failure, fire the event so ToolBoot doesn't wait forever
        if (!cancelled) {
          window.dispatchEvent(new CustomEvent('toolmarkup:ready'));
        }
      });

    return () => { cancelled = true; };
  }, []);

  return <div ref={ref} />;
}
