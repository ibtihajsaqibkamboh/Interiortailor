import CementCalculator from '@/components/CementCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Cement Calculator - How Much Cement Do I Need?',
  description: 'Calculate how many bags of cement, sand and aggregate you need for a concrete pour. Choose your mix grade, enter slab dimensions and get material quantities in seconds.',
  path: '/cement-calculator/',
});

export default function CementCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">CEMENT CALCULATOR</span>
        <h1>Cement Calculator — Bags, Sand &amp; Aggregate for Any Mix</h1>
        <p>
          Calculate how much cement, sand and aggregate you need for a concrete slab, footing or
          pour. Choose your concrete mix grade (M10 through M25), enter the pour dimensions, and
          get the number of 50 kg cement bags along with sand and aggregate volumes.
        </p>
      </section>

      <CementCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How to Calculate Cement Quantity</h2>
            <p>
              Cement calculation uses the dry volume method to account for the compaction of voids
              when materials are mixed with water:
            </p>
            <p><span className="formula">Dry Volume = Wet Volume × 1.54</span></p>
            <p><span className="formula">Cement (bags) = (Dry Vol × Cement Parts ÷ Total Parts) × Density ÷ 50 kg</span></p>
            <p>
              The factor 1.54 accounts for the 54% increase in volume when dry ingredients fill
              voids that were not present in the mixed concrete. The bulk density of cement is
              approximately 1,500 kg/m³.
            </p>
          </article>

          <article className="seo-card">
            <h2>Concrete Mix Grade Guide</h2>
            <ul>
              <li><strong>M10 (1:3:6):</strong> Lean mix, blinding layers and non-structural fills</li>
              <li><strong>M15 (1:2:4):</strong> Light footings, paths and low-load slabs</li>
              <li><strong>M20 (1:1.5:3):</strong> Standard residential slabs, beams and columns</li>
              <li><strong>M25 (1:1:2):</strong> High-strength structural elements and commercial work</li>
            </ul>
            <p>
              The numbers refer to the characteristic compressive strength in N/mm² at 28 days.
              M20 is the most common grade for residential construction in most countries.
            </p>
          </article>

          <article className="seo-card">
            <h2>Sand &amp; Aggregate Quantities</h2>
            <p>
              Concrete is a mixture of cement, fine aggregate (sand) and coarse aggregate (gravel
              or crushed stone). For an M20 mix (1:1.5:3), every 1 part cement requires:
            </p>
            <ul>
              <li>1.5 parts sand (fine aggregate)</li>
              <li>3 parts coarse aggregate</li>
              <li>Approximately 0.45–0.55 water-cement ratio by weight</li>
            </ul>
            <p>
              Always use clean, well-graded aggregates free from clay, organic matter and excessive
              fines. Impurities reduce concrete strength significantly.
            </p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>What is the difference between cement and concrete?</summary>
              <p>Cement is the binding agent — a fine powder of calcium silicates. Concrete is cement mixed with sand, aggregate and water. You cannot pour "cement" — you pour concrete.</p>
            </details>
            <details>
              <summary>How many 50 kg bags of cement do I need for 1 cubic metre of M20 concrete?</summary>
              <p>Approximately 8 bags (400 kg) of cement per cubic metre of M20 concrete, plus roughly 600 kg of sand and 1,200 kg of coarse aggregate.</p>
            </details>
            <details>
              <summary>How long does concrete take to cure?</summary>
              <p>Concrete achieves about 70% of its design strength at 7 days and full strength at 28 days. Keep it moist during curing to prevent cracking.</p>
            </details>
            <div className="related-links">
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/concrete-slab-calculator/">Concrete Slab Calculator</a>
              <a href="/rebar-calculator/">Rebar Calculator</a>
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
