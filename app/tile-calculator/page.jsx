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
        <h1>Tile Calculator — How Many Tiles Do I Need?</h1>
        <p>
          Calculate how many tiles you need for a floor, wall, backsplash or any tiled surface.
          Choose from common tile sizes or enter custom dimensions, set your grout joint width
          and waste allowance, and get an instant tile count with an estimated grout quantity.
        </p>
      </section>

      <TileCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Tile Count Is Calculated</h2>
            <p>
              Each tile occupies its face area plus half a grout joint on all sides. The effective
              area per tile is:
            </p>
            <p><span className="formula">Tile Area = (Tile W + Gap) × (Tile H + Gap)</span></p>
            <p><span className="formula">Tiles = Total Area ÷ Tile Area × (1 + Waste %)</span></p>
            <p>
              A 10% waste allowance is standard for straight layouts. Increase to 15% for diagonal
              installations and up to 20% for complex patterns such as herringbone, which generate
              more offcuts at the edges.
            </p>
          </article>

          <article className="seo-card">
            <h2>Tile Size &amp; Grout Joint Guide</h2>
            <ul>
              <li><strong>Small tiles (≤6 in):</strong> 1/16–1/8 in grout joint — mosaic, penny round, subway</li>
              <li><strong>Medium tiles (6–12 in):</strong> 1/8–3/16 in joint — standard floor and wall tile</li>
              <li><strong>Large tiles (12–24 in):</strong> 3/16–1/4 in joint — large format floor tile</li>
              <li><strong>Large format (24 in+):</strong> 1/4–3/8 in joint — rectified porcelain slabs</li>
            </ul>
            <p>
              Rectified tiles (precision-cut to exact dimensions) allow tighter joints of 1/16 in
              or less. Non-rectified tiles need wider joints to hide size variations.
            </p>
          </article>

          <article className="seo-card">
            <h2>Choosing the Right Tile for Each Area</h2>
            <ul>
              <li><strong>Floors:</strong> Use tiles rated for floor use (PEI 3+). Larger formats make small rooms look bigger.</li>
              <li><strong>Wet areas (showers, tub surrounds):</strong> Glazed porcelain or ceramic with low water absorption (&lt;0.5%). Include a linear or point drain slope.</li>
              <li><strong>Kitchen backsplash:</strong> Subway tile (3×6), mosaic or large format. Grout should be sealed to resist staining.</li>
              <li><strong>Outdoor use:</strong> Frost-resistant, slip-rated (R11 or higher) tiles only. Standard indoor tile can crack in freeze-thaw cycles.</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many 12×12 tiles do I need for 100 sq ft?</summary>
              <p>A 12×12 inch tile covers 1 sq ft. For 100 sq ft you need 100 tiles plus waste — order at least 110 tiles (10% waste) for a straight lay, or 115–120 for a diagonal pattern.</p>
            </details>
            <details>
              <summary>How much grout do I need for a tile job?</summary>
              <p>A rough estimate is 1 lb of grout per 15 sq ft for 12×12 tile with a 1/8 in joint. Smaller tiles and wider joints require more grout. Always buy 10% extra.</p>
            </details>
            <details>
              <summary>What is the best tile size for a small bathroom?</summary>
              <p>Larger tiles (12×24 or 24×24) with tight grout lines create fewer visual breaks and can make a small bathroom appear larger. Avoid very small mosaic tiles which emphasize the small size.</p>
            </details>
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
