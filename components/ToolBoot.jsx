'use client';

import { useEffect } from 'react';

export default function ToolBoot({ initialTool = 'calculator' }) {
  useEffect(() => {
    window.__PAINT_PLANNERS_INITIAL_TOOL = initialTool;

    const existing = document.getElementById('paint-planners-app-script');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = 'paint-planners-app-script';
    script.src = '/app.js';
    script.async = false;
    document.body.appendChild(script);

    return () => {
      script.remove();
      window.__PAINT_PLANNERS_INITIAL_TOOL = undefined;
    };
  }, [initialTool]);

  return null;
}
