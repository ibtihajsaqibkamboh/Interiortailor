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
        <h1>Cubic Yard Calculator — Volume in Yards³ for Any Shape</h1>
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
            <h2>How to Calculate Cubic Yards</h2>
            <p>
              A cubic yard is a cube measuring 3 feet on each side. There are 27 cubic feet in
              one cubic yard. For a rectangular area, the formula is:
            </p>
            <p><span className="formula">Volume (yd³) = (Length ft × Width ft × Depth ft) ÷ 27</span></p>
            <p>
              For example, a patio area 12 ft × 20 ft at 4 inches (0.33 ft) deep requires:
              (12 × 20 × 0.33) ÷ 27 = 2.96 cubic yards of concrete — round up to 3 yards.
              Always round up when ordering bulk materials.
            </p>
          </article>

          <article className="seo-card">
            <h2>Cubic Yards for Common Materials</h2>
            <p>
              Bulk materials are commonly sold by the cubic yard in the US. Here are typical
              weights per cubic yard to help you plan deliveries:
            </p>
            <ul>
              <li><strong>Concrete (wet):</strong> ~4,000 lb per yd³</li>
              <li><strong>Topsoil:</strong> ~2,000 lb per yd³</li>
              <li><strong>Gravel / crushed stone:</strong> ~2,800 lb per yd³</li>
              <li><strong>Sand:</strong> ~2,700 lb per yd³</li>
              <li><strong>Mulch (wood chip):</strong> ~800 lb per yd³</li>
              <li><strong>Compost:</strong> ~1,000 lb per yd³</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>How to Convert Between Volume Units</h2>
            <ul>
              <li>1 cubic yard = 27 cubic feet</li>
              <li>1 cubic yard = 0.7646 cubic meters</li>
              <li>1 cubic yard = 764.6 liters</li>
              <li>1 cubic yard = 201.97 US gallons</li>
              <li>1 cubic meter = 1.308 cubic yards</li>
            </ul>
            <p>
              When ordering ready-mix concrete, the minimum load is typically 1 yard. For smaller
              quantities, consider purchasing pre-mixed bags from a hardware store — one 80 lb bag
              yields roughly 0.6 cubic feet, so you need 45 bags per cubic yard.
            </p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many cubic yards of concrete do I need for a 10×10 slab?</summary>
              <p>A 10×10 ft slab at 4 inches thick requires (10 × 10 × 0.333) ÷ 27 = 1.23 cubic yards. Order 1.5 yards to allow for waste and uneven sub-base.</p>
            </details>
            <details>
              <summary>How many cubic yards of topsoil do I need to fill a raised bed?</summary>
              <p>A 4×8 ft raised bed 12 inches deep requires (4 × 8 × 1) ÷ 27 = 1.19 cubic yards of soil. Add 10% for settling.</p>
            </details>
            <details>
              <summary>How do I convert square feet to cubic yards?</summary>
              <p>You cannot directly convert square feet (area) to cubic yards (volume) without knowing the depth. Multiply the area in square feet by the depth in feet, then divide by 27.</p>
            </details>
            <div className="related-links">
              <a href="/cubic-feet-calculator/">Cubic Feet Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/topsoil-calculator/">Topsoil Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
