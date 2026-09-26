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
        <h1>Cement Calculator</h1>
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
            <p>The dry volume method is used to account for voids in the mix:</p>
            <p><span className="formula">Dry Volume = Wet Volume × 1.54</span></p>
            <p><span className="formula">Cement (bags) = (Dry Volume × Cement Parts / Total Parts) × Density ÷ 50 kg</span></p>
            <p>The factor 1.54 accounts for material compaction during mixing and placement.</p>
          </article>
          <article className="seo-card">
            <h2>Concrete Mix Grade Guide</h2>
            <ul>
              <li><strong>M10 (1:3:6):</strong> Lean mix, blinding and non-structural fills</li>
              <li><strong>M15 (1:2:4):</strong> Light footings and paths</li>
              <li><strong>M20 (1:1.5:3):</strong> Standard residential slabs and beams</li>
              <li><strong>M25 (1:1:2):</strong> High-strength columns and structural elements</li>
            </ul>
            <div className="related-links">
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/rebar-calculator/">Rebar Calculator</a>
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
