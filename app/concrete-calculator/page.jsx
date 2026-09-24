import ConcreteCalculator from '@/components/ConcreteCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Concrete Calculator - How Much Concrete Do I Need?',
  description:
    'Estimate how much concrete you need for slabs, footings, driveways and circular pads. Supports metric and imperial with waste allowance and bag count.',
  path: '/concrete-calculator/',
});

export default function ConcreteCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">CONCRETE CALCULATOR</span>
        <h1>Concrete Calculator</h1>
        <p>
          Estimate how much concrete you need for your project. Enter the length, width and thickness
          of a rectangular slab, or the diameter and thickness of a circular pad, and the calculator
          will give you the volume to order plus an equivalent bag count.
        </p>
      </section>

      <ConcreteCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Is Concrete Volume Calculated?</h2>
            <p>
              For a rectangular slab the formula is:
            </p>
            <p><span className="formula">Volume = Length × Width × Thickness</span></p>
            <p>
              For a circular pad:
            </p>
            <p><span className="formula">Volume = π × (Diameter ÷ 2)² × Thickness</span></p>
            <p>
              A waste allowance of 5–15% is normally added to account for uneven sub-grades,
              spillage and minor measurement differences.
            </p>
          </article>

          <article className="seo-card">
            <h2>Ordering vs Mixing Your Own</h2>
            <p>
              For large pours (generally above 1 m³ or 1.3 yd³) ready-mix concrete delivered by
              truck is usually more practical and economical. For small jobs you can mix your own
              from pre-mixed bags.
            </p>
            <p>
              The calculator shows both the total volume for a ready-mix order and the approximate
              number of standard 60 lb and 80 lb bags required if you choose to mix on-site.
            </p>
            <div className="related-links">
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/mulch-calculator/">Mulch Calculator</a>
              <a href="/paint-calculator/">Paint Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
