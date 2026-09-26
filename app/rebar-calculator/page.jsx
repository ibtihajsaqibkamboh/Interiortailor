import RebarCalculator from '@/components/RebarCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Rebar Calculator - How Much Rebar Do I Need?',
  description: 'Calculate total rebar length, weight and number of bars needed for a concrete slab or footing. Enter area dimensions, bar spacing, overlap and bar size for an instant estimate.',
  path: '/rebar-calculator/',
});

export default function RebarCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">REBAR CALCULATOR</span>
        <h1>Rebar Calculator</h1>
        <p>
          Estimate total rebar (reinforcing bar) length, weight and number of 20-foot bars needed
          for a concrete slab, driveway, footing or structural pour. Enter your slab dimensions,
          bar spacing, lap splice length and bar size to get a complete material list.
        </p>
      </section>

      <RebarCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Rebar Is Calculated</h2>
            <p>For a two-way grid pattern, the total linear footage is:</p>
            <p><span className="formula">Bars (long direction) = (Width ÷ Spacing) + 1</span></p>
            <p><span className="formula">Bars (short direction) = (Length ÷ Spacing) + 1</span></p>
            <p>Lap splices are added per bar where bars join. Total weight = total LF × lb per foot for the bar size selected.</p>
          </article>
          <article className="seo-card">
            <h2>Common Rebar Sizes &amp; Uses</h2>
            <ul>
              <li><strong>#3 (3/8&Prime;):</strong> Footings, small slabs, masonry reinforcement</li>
              <li><strong>#4 (1/2&Prime;):</strong> Residential slabs, driveways, walls</li>
              <li><strong>#5 (5/8&Prime;):</strong> Structural slabs, columns, beams</li>
              <li><strong>#6 (3/4&Prime;):</strong> Heavy structural work, retaining walls</li>
            </ul>
            <p>Typical spacing: 12&Prime; o.c. for light slabs, 18&Prime; for pads, 6–8&Prime; for high-load structures.</p>
            <div className="related-links">
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/cement-calculator/">Cement Calculator</a>
              <a href="/concrete-slab-calculator/">Concrete Slab Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
