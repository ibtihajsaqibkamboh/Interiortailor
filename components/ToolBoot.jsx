'use client';

import { useEffect } from 'react';

/**
 * Loads app.js only AFTER ToolMarkup has finished injecting tool-content.html.
 * ToolMarkup dispatches 'toolmarkup:ready' on window when its innerHTML is set,
 * so the tab elements (#tabCalculator, #tabMixer, etc.) exist before app.js runs.
 */
export default function ToolBoot({ initialTool = 'calculator' }) {
  useEffect(() => {
    function loadScript() {
      window.__PAINT_PLANNERS_INITIAL_TOOL = initialTool;

      const existing = document.getElementById('paint-planners-app-script');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.id = 'paint-planners-app-script';
      script.src = '/app.js';
      script.async = false;
      document.body.appendChild(script);
    }

    // If ToolMarkup already fired before this effect ran (e.g. fast cache hit),
    // the event is gone — check if the tab elements already exist in the DOM.
    if (document.getElementById('tabCalculator')) {
      loadScript();
    } else {
      // Wait for ToolMarkup to finish injecting the HTML
      window.addEventListener('toolmarkup:ready', loadScript, { once: true });
    }

    return () => {
      window.removeEventListener('toolmarkup:ready', loadScript);
      const script = document.getElementById('paint-planners-app-script');
      if (script) script.remove();
      window.__PAINT_PLANNERS_INITIAL_TOOL = undefined;
    };
  }, [initialTool]);

  return null;
}
