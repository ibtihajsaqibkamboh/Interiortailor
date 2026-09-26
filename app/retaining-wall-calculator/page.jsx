import RetainingWallCalculator from '@/components/RetainingWallCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Retaining Wall Calculator - Blocks, Gravel & Concrete Estimate',
  description: 'Calculate how many retaining wall blocks, cubic yards of gravel backfill and concrete footing you need. Supports concrete block, natural stone, timber and poured concrete walls.',
  path: '/retaining-wall-calculator/',
});

export default function RetainingWallCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">RETAINING WALL CALCULATOR</span>
        <h1>Retaining Wall Calculator</h1>
        <p>
          Estimate the materials needed to build a retaining wall — including wall blocks or units,
          gravel backfill and concrete footing volume. Enter your wall length and height, choose
          the material type and set a waste allowance to get a complete material estimate for
          concrete block, natural stone, landscape timber or poured concrete walls.
        </p>
      </section>

      <RetainingWallCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Retaining Wall Design Basics</h2>
            <p>A properly built retaining wall requires:</p>
            <ul>
              <li><strong>Footing:</strong> Concrete base at or below frost line, typically 1 ft deep × 1.5× wall height wide</li>
              <li><strong>Gravel backfill:</strong> Crushed stone drainage layer behind the wall</li>
              <li><strong>Drainage pipe:</strong> Perforated pipe to relieve hydrostatic pressure</li>
              <li><strong>Batter (lean-back):</strong> 1 in per foot of height for dry-stack walls</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>When to Hire an Engineer</h2>
            <p>
              Most jurisdictions require permits and engineering review for retaining walls over
              4 feet tall, walls supporting structures or surcharges, and any wall on a slope or
              near property lines.
            </p>
            <p>Even for walls under 4 ft, proper drainage is essential. A failed retaining wall can cause significant property damage.</p>
            <div className="related-links">
              <a href="/block-calculator/">Block Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
