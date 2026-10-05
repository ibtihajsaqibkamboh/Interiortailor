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
        <h1>Rebar Calculator — Linear Footage, Weight &amp; Bar Count</h1>
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
            <p>
              For a standard two-way grid, bars run in both directions at regular spacing. The total
              linear footage is calculated as:
            </p>
            <p><span className="formula">Bars along length = (Width ÷ Spacing) + 1</span></p>
            <p><span className="formula">Bars along width = (Length ÷ Spacing) + 1</span></p>
            <p>
              Each bar length includes a lap splice allowance where bars overlap. The total weight
              equals total linear footage multiplied by the pounds-per-foot rating of the bar size.
              A 10% waste allowance covers cutting losses.
            </p>
          </article>

          <article className="seo-card">
            <h2>Rebar Sizes &amp; Common Applications</h2>
            <ul>
              <li><strong>#3 (3/8 in, 0.376 lb/ft):</strong> Small footings, masonry reinforcement, driveways</li>
              <li><strong>#4 (1/2 in, 0.668 lb/ft):</strong> Residential slabs, driveways, foundations</li>
              <li><strong>#5 (5/8 in, 1.043 lb/ft):</strong> Structural slabs, columns, beams</li>
              <li><strong>#6 (3/4 in, 1.502 lb/ft):</strong> Heavy structural work, retaining walls</li>
              <li><strong>#7 &amp; #8:</strong> Large commercial footings and structural elements</li>
            </ul>
            <p>
              #4 bar at 12 inches on center is the most common specification for residential
              concrete slabs. Always verify with your engineer or local building code.
            </p>
          </article>

          <article className="seo-card">
            <h2>Spacing &amp; Placement Guidelines</h2>
            <p>
              Correct placement is as important as quantity. Key rules for residential concrete:
            </p>
            <ul>
              <li>Rebar should have at least 1½ inches of concrete cover from edges and bottom</li>
              <li>Use chairs or bar supports to hold rebar at the correct depth in the slab</li>
              <li>Typical slab spacing: 12 in o.c. for driveways, 18 in for light patios</li>
              <li>Lap splices should be at least 40 bar diameters long (24 in for #5 bar)</li>
              <li>Tie intersections with wire ties to keep the grid aligned during the pour</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>Do I need rebar in a 4-inch concrete slab?</summary>
              <p>For most residential applications like driveways and patios, #4 rebar at 12–18 inches on center is recommended. A slab without rebar can crack and shift significantly under load.</p>
            </details>
            <details>
              <summary>What size rebar for a concrete driveway?</summary>
              <p>#4 (1/2-inch) rebar at 12 inches on center in both directions is a common specification for a 4-inch residential driveway slab.</p>
            </details>
            <details>
              <summary>Can I use wire mesh instead of rebar?</summary>
              <p>Wire mesh (welded wire reinforcement) controls shrinkage cracks in thin slabs but provides less structural strength than rebar. For driveways and structural slabs, rebar is preferred.</p>
            </details>
            <div className="related-links">
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/concrete-slab-calculator/">Concrete Slab Calculator</a>
              <a href="/cement-calculator/">Cement Calculator</a>
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
