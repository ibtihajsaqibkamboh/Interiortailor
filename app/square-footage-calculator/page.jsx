import SquareFootageCalculator from '@/components/SquareFootageCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Square Footage Calculator - Calculate Area',
  description: 'Calculate square footage or square metres for rectangles, circles, triangles and trapezoids. Instant unit conversion between sq ft and m².',
  path: '/square-footage-calculator/',
});

export default function SquareFootagePage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">SQUARE FOOTAGE CALCULATOR</span>
        <h1>Square Footage Calculator</h1>
        <p>
          Calculate the area of any space in square feet or square metres. Choose your shape —
          rectangle, circle, triangle or trapezoid — enter the dimensions and get an instant result
          with automatic unit conversion.
        </p>
      </section>

      <SquareFootageCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Area Formulas by Shape</h2>
            <ul>
              <li><strong>Rectangle:</strong> <span className="formula">Area = Length × Width</span></li>
              <li><strong>Circle:</strong> <span className="formula">Area = π × Radius²</span></li>
              <li><strong>Triangle:</strong> <span className="formula">Area = ½ × Base × Height</span></li>
              <li><strong>Trapezoid:</strong> <span className="formula">Area = ½ × (Side A + Side B) × Height</span></li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Common Uses</h2>
            <ul>
              <li>Room area for flooring, carpet or paint</li>
              <li>Lawn or garden area for sod, seed or mulch</li>
              <li>Deck, patio or driveway surface area</li>
              <li>Real estate and property measurements</li>
            </ul>
            <div className="related-links">
              <a href="/flooring-calculator/">Flooring Calculator</a>
              <a href="/tile-calculator/">Tile Calculator</a>
              <a href="/paint-calculator/">Paint Calculator</a>
              <a href="/sod-calculator/">Sod Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
