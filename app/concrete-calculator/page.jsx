import ConcreteCalculator from '@/components/ConcreteCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Concrete Calculator - How Much Concrete Do I Need?',
  description: 'Estimate how much concrete you need for slabs, footings, driveways and circular pads. Supports metric and imperial with waste allowance and bag count.',
  path: '/concrete-calculator/',
});

export default function ConcreteCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">CONCRETE CALCULATOR</span>
        <h1>Concrete Calculator — How Much Concrete Do I Need?</h1>
        <p>
          Estimate how much concrete you need for your project. Enter the length, width and thickness
          of a rectangular slab, or the diameter and thickness of a circular pad, and the calculator
          gives you the volume to order plus an equivalent bag count for on-site mixing.
        </p>
      </section>

      <ConcreteCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Concrete Volume Is Calculated</h2>
            <p>For a rectangular slab the formula is:</p>
            <p><span className="formula">Volume = Length × Width × Thickness</span></p>
            <p>For a circular pad:</p>
            <p><span className="formula">Volume = π × (Diameter ÷ 2)² × Thickness</span></p>
            <p>
              Convert the result from cubic feet to cubic yards by dividing by 27.
              Always add 5–15% waste to account for uneven sub-grades, spillage and minor
              measurement differences — most contractors add 10% as a standard allowance.
            </p>
          </article>

          <article className="seo-card">
            <h2>Standard Concrete Thicknesses</h2>
            <ul>
              <li><strong>3–4 in (75–100 mm):</strong> Residential patios, walkways, light-traffic slabs</li>
              <li><strong>4–5 in (100–125 mm):</strong> Driveways and garage floors</li>
              <li><strong>6 in (150 mm):</strong> Heavy equipment pads and light commercial floors</li>
              <li><strong>8 in (200 mm):</strong> Foundation walls and structural slabs</li>
              <li><strong>10–12 in (250–300 mm):</strong> Heavy-duty industrial slabs</li>
            </ul>
            <p>For driveways, a minimum of 4 inches with #4 rebar at 12 in o.c. is recommended.</p>
          </article>

          <article className="seo-card">
            <h2>Bags vs Ready-Mix Concrete</h2>
            <p>
              For pours under 1 cubic yard (27 cubic feet), mixing from bags is practical.
              For anything larger, a ready-mix truck is almost always more economical and
              produces better results:
            </p>
            <ul>
              <li><strong>80 lb bag:</strong> ~0.60 cu ft yield — need ~45 bags per cubic yard</li>
              <li><strong>60 lb bag:</strong> ~0.45 cu ft yield — need ~60 bags per cubic yard</li>
              <li><strong>Ready-mix minimum load:</strong> typically 1 yard — suits most residential pours</li>
            </ul>
            <p>Ready-mix quality is more consistent and avoids the variability that comes from hand-mixing bags at different water ratios.</p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How much concrete do I need for a 10×10 slab?</summary>
              <p>A 10×10 ft slab at 4 inches (0.333 ft) thick requires 10 × 10 × 0.333 = 33.3 cu ft ÷ 27 = 1.23 cubic yards. Order 1.5 yards to allow for waste and sub-grade variations.</p>
            </details>
            <details>
              <summary>How long does concrete take to cure?</summary>
              <p>Concrete reaches about 70% of its strength at 7 days and full design strength at 28 days. You can typically walk on it after 24–48 hours and drive on it after 7 days for residential applications.</p>
            </details>
            <details>
              <summary>Do I need rebar in a concrete slab?</summary>
              <p>For structural slabs, driveways and any slab that may experience load or ground movement, yes. A 4-inch residential slab typically uses #4 rebar at 12–18 inches on center in both directions.</p>
            </details>
            <div className="related-links">
              <a href="/concrete-slab-calculator/">Concrete Slab Calculator</a>
              <a href="/concrete-bag-calculator/">Concrete Bag Calculator</a>
              <a href="/rebar-calculator/">Rebar Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
