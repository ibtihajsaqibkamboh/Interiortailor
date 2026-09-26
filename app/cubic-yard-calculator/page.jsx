import CubicYardCalculator from '@/components/CubicYardCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Cubic Yard Calculator - Convert to Cubic Yards Easily',
  description: 'Calculate cubic yards for any project area and depth. Supports rectangular, circular and triangular shapes. Instantly convert between cubic yards, cubic feet and cubic meters.',
  path: '/cubic-yard-calculator/',
});

export default function CubicYardCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">CUBIC YARD CALCULATOR</span>
        <h1>Cubic Yard Calculator</h1>
        <p>
          Calculate cubic yards of concrete, soil, gravel, mulch or any bulk material for
          rectangular, circular or triangular areas. Enter the area dimensions and depth, then
          get the volume in cubic yards, cubic feet and cubic meters instantly.
        </p>
      </section>

      <CubicYardCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How to Convert to Cubic Yards</h2>
            <p>The formula for a rectangular area is:</p>
            <p><span className="formula">Volume (yd³) = (Length ft × Width ft × Depth ft) ÷ 27</span></p>
            <p>There are 27 cubic feet in a cubic yard. Concrete, topsoil, gravel and mulch are all commonly ordered by the cubic yard (yard) in the US.</p>
          </article>
          <article className="seo-card">
            <h2>Quick Cubic Yard Reference</h2>
            <ul>
              <li>1 cubic yard = 27 cubic feet</li>
              <li>1 cubic yard = 0.765 cubic meters</li>
              <li>1 cubic yard of concrete ≈ 3,700 lb (wet)</li>
              <li>1 cubic yard of topsoil ≈ 2,000 lb</li>
              <li>1 cubic yard of gravel ≈ 2,800 lb</li>
              <li>1 cubic yard of mulch ≈ 800 lb</li>
            </ul>
            <div className="related-links">
              <a href="/cubic-feet-calculator/">Cubic Feet Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
