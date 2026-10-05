import SquareFootageCalculator from '@/components/SquareFootageCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Square Footage Calculator - Calculate Area in Sq Ft or m²',
  description: 'Calculate square footage or square metres for rectangles, circles, triangles and trapezoids. Instant unit conversion between sq ft and m².',
  path: '/square-footage-calculator/',
});

export default function SquareFootagePage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">SQUARE FOOTAGE CALCULATOR</span>
        <h1>Square Footage Calculator — Area for Any Shape</h1>
        <p>
          Calculate the area of any space in square feet or square metres. Choose your shape —
          rectangle, circle, triangle or trapezoid — enter the dimensions and get an instant result
          with automatic unit conversion between sq ft and m².
        </p>
      </section>

      <SquareFootageCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Area Formulas by Shape</h2>
            <ul>
              <li><strong>Rectangle / Square:</strong> <span className="formula">Area = Length × Width</span></li>
              <li><strong>Circle:</strong> <span className="formula">Area = π × Radius² = π × (Diameter ÷ 2)²</span></li>
              <li><strong>Triangle:</strong> <span className="formula">Area = ½ × Base × Height</span></li>
              <li><strong>Trapezoid:</strong> <span className="formula">Area = ½ × (Side A + Side B) × Height</span></li>
            </ul>
            <p>
              For irregular rooms, divide the space into sections (rectangles, triangles, etc.),
              calculate each area separately and add them together.
            </p>
          </article>

          <article className="seo-card">
            <h2>Common Uses for Square Footage</h2>
            <ul>
              <li><strong>Flooring &amp; carpet:</strong> Room area for material ordering with waste allowance</li>
              <li><strong>Paint:</strong> Wall area for estimating paint quantity — measure height × perimeter, subtract doors and windows</li>
              <li><strong>Tile:</strong> Floor or wall area for tile and grout calculation</li>
              <li><strong>Lawn &amp; landscaping:</strong> Garden bed, lawn or patio area for sod, mulch or pavers</li>
              <li><strong>Real estate:</strong> Living area for property listings — typically excludes garages, unfinished basements and patios</li>
              <li><strong>HVAC:</strong> Floor area as an input to heating and cooling load calculations</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Unit Conversion Reference</h2>
            <ul>
              <li>1 sq ft = 0.0929 m²</li>
              <li>1 m² = 10.7639 sq ft</li>
              <li>1 sq yd = 9 sq ft = 0.836 m²</li>
              <li>1 acre = 43,560 sq ft = 4,047 m²</li>
              <li>1 sq in = 0.00694 sq ft</li>
            </ul>
            <p>
              To convert a room measured in feet and inches, first convert to decimal feet
              (e.g., 12 ft 6 in = 12.5 ft) before multiplying length by width.
            </p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How do I measure square footage of a room?</summary>
              <p>Measure the length and width of the room in feet (include any alcoves or closets within the space). Multiply length × width for the area in square feet. For L-shaped rooms, split into two rectangles, calculate each and add together.</p>
            </details>
            <details>
              <summary>How do I calculate square footage for flooring?</summary>
              <p>Measure each room and add the areas together. Add 10% for straight lay, 15% for diagonal. Round up to the nearest full box or roll when ordering — most flooring is sold in fixed pack sizes.</p>
            </details>
            <details>
              <summary>How many square feet is a 10×10 room?</summary>
              <p>A 10×10 room is exactly 100 square feet. This is a common reference point — a 10×10 room requires approximately 1 gallon of paint per coat, around 110 sq ft of flooring with waste, and about 12 bundles of shingles if it were a roof section.</p>
            </details>
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
