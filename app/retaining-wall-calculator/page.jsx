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
        <h1>Retaining Wall Calculator — Blocks, Backfill &amp; Footing Estimate</h1>
        <p>
          Estimate the materials needed to build a retaining wall — including wall blocks or units,
          gravel backfill and concrete footing volume. Enter your wall length and height, choose
          the material type and set a waste allowance for a complete material estimate.
        </p>
      </section>

      <RetainingWallCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Retaining Wall Design Basics</h2>
            <p>
              A retaining wall must resist the lateral pressure of the soil it holds back. Proper
              construction requires:
            </p>
            <ul>
              <li><strong>Footing:</strong> Concrete base below frost line, typically 1 ft deep × 1.5× wall height wide, buried 1 inch for each foot of wall height</li>
              <li><strong>Gravel base:</strong> 4–6 inch compacted gravel layer under the first course for drainage</li>
              <li><strong>Gravel backfill:</strong> Crushed stone drainage layer (12 in wide) directly behind the wall face</li>
              <li><strong>Drainage pipe:</strong> 4-inch perforated pipe at the base of the wall to relieve hydrostatic pressure</li>
              <li><strong>Batter:</strong> Walls should lean back 1 inch per foot of height for dry-stack construction</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Retaining Wall Material Comparison</h2>
            <ul>
              <li><strong>Segmental concrete block:</strong> Most common for DIY, interlocking, no mortar needed for walls under 4 ft, durable and consistent</li>
              <li><strong>Natural stone (dry-stack):</strong> Attractive, requires more skill, irregular sizing makes estimation harder</li>
              <li><strong>Landscape timber:</strong> Easy to work with, least expensive, but timber eventually rots (10–20 year lifespan)</li>
              <li><strong>Poured concrete:</strong> Strongest option, requires formwork, rebar and professional work for walls over 4 ft</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>When You Need an Engineer or Permit</h2>
            <p>
              Most jurisdictions require permits and engineering review for retaining walls in
              these situations:
            </p>
            <ul>
              <li>Walls taller than 4 feet (3 feet in some areas)</li>
              <li>Walls supporting a structure, driveway or surcharge load above them</li>
              <li>Walls on slopes greater than 2:1 (horizontal:vertical)</li>
              <li>Walls near property lines or public roads</li>
              <li>Walls in areas with expansive or unstable soils</li>
            </ul>
            <p>Always check with your local building department before starting construction.</p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many retaining wall blocks do I need per square foot?</summary>
              <p>Standard segmental retaining wall blocks (12×6×8 in face) cover approximately 0.5 sq ft each, requiring about 2 blocks per square foot of wall face. Larger blocks cover more area per unit.</p>
            </details>
            <details>
              <summary>How deep should a retaining wall footing be?</summary>
              <p>The footing should be buried at least 6 inches below grade, and 1 inch deeper for every foot of wall height. In cold climates, the footing must be below the frost line to prevent heaving.</p>
            </details>
            <details>
              <summary>Do I need drainage behind a retaining wall?</summary>
              <p>Yes — drainage is essential. Without proper drainage, hydrostatic pressure from water-saturated soil can be 3–4 times greater than dry soil pressure, which is the leading cause of retaining wall failure.</p>
            </details>
            <div className="related-links">
              <a href="/block-calculator/">Block Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/rebar-calculator/">Rebar Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
