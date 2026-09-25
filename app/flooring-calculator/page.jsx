import FlooringCalculator from '@/components/FlooringCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Flooring Calculator - How Much Flooring Do I Need?',
  description: 'Calculate flooring for multiple rooms with material and installation cost estimate. Covers hardwood, laminate, LVP, carpet, tile and engineered wood.',
  path: '/flooring-calculator/',
});

export default function FlooringPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">FLOORING CALCULATOR</span>
        <h1>Flooring Calculator</h1>
        <p>
          Estimate the total flooring needed for one or more rooms along with material and
          installation cost. Add multiple rooms, choose your flooring type and set a waste
          allowance to get a combined estimate.
        </p>
      </section>

      <FlooringCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Much Flooring Do I Need?</h2>
            <p>Total flooring is the sum of all room areas plus a waste allowance:</p>
            <p><span className="formula">Total = (Sum of Room Areas) × (1 + Waste %)</span></p>
            <p>Recommended waste allowances:</p>
            <ul>
              <li><strong>10%</strong> — straight/parallel installation</li>
              <li><strong>15%</strong> — diagonal or 45° pattern</li>
              <li><strong>15–20%</strong> — herringbone or complex patterns</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Flooring Material Guide</h2>
            <ul>
              <li><strong>Hardwood</strong> — premium look, refinishable, moisture-sensitive</li>
              <li><strong>Laminate</strong> — affordable, durable, not refinishable</li>
              <li><strong>Luxury vinyl plank</strong> — waterproof, easy install, mid-range cost</li>
              <li><strong>Carpet</strong> — warm underfoot, low cost, harder to clean</li>
              <li><strong>Tile</strong> — durable, water-resistant, cold underfoot</li>
            </ul>
            <div className="related-links">
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/tile-calculator/">Tile Calculator</a>
              <a href="/paint-calculator/">Paint Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
