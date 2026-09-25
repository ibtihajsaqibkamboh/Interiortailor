import TileCalculator from '@/components/TileCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Tile Calculator - How Many Tiles Do I Need?',
  description: 'Calculate how many tiles you need for floors, walls or backsplashes. Choose tile size, set grout gap and waste allowance. Includes grout estimate.',
  path: '/tile-calculator/',
});

export default function TilePage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">TILE CALCULATOR</span>
        <h1>Tile Calculator</h1>
        <p>
          Calculate how many tiles you need for a floor, wall, backsplash or any tiled surface.
          Choose from common tile sizes or enter custom dimensions. The calculator accounts for
          grout joints and a waste allowance, and provides an estimated grout quantity.
        </p>
      </section>

      <TileCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Tile Count Is Calculated</h2>
            <p>Each tile occupies its face area plus half a grout joint on all sides. The formula is:</p>
            <p><span className="formula">Tiles = Area ÷ ((Tile W + Gap) × (Tile H + Gap))</span></p>
            <p>A 10% waste allowance is standard for rectangular layouts. Add 15% for diagonal cuts or complex patterns.</p>
          </article>
          <article className="seo-card">
            <h2>Tile Size & Grout Joint Guide</h2>
            <ul>
              <li><strong>Small tiles (≤6 in):</strong> 1/16"–1/8" grout joint</li>
              <li><strong>Medium tiles (6–12 in):</strong> 1/8"–3/16" grout joint</li>
              <li><strong>Large tiles (12–24 in):</strong> 3/16"–1/4" grout joint</li>
              <li><strong>Large format (24 in+):</strong> 1/4"–3/8" grout joint</li>
            </ul>
            <div className="related-links">
              <a href="/grout-calculator/">Grout Calculator</a>
              <a href="/flooring-calculator/">Flooring Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
