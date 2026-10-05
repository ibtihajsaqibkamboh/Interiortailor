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
        <h1>Flooring Calculator — How Much Flooring Do I Need?</h1>
        <p>
          Estimate the total flooring needed for one or more rooms along with material and
          installation cost. Add multiple rooms, choose your flooring type and set a waste
          allowance to get a combined estimate for your entire project.
        </p>
      </section>

      <FlooringCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How to Calculate Flooring</h2>
            <p>Total flooring is the sum of all room areas plus a waste allowance:</p>
            <p><span className="formula">Total = (Sum of Room Areas) × (1 + Waste %)</span></p>
            <p>Recommended waste allowances by installation pattern:</p>
            <ul>
              <li><strong>Straight / parallel lay:</strong> 10% — planks run parallel to the longest wall</li>
              <li><strong>Diagonal (45°):</strong> 15% — more edge cuts at room perimeter</li>
              <li><strong>Herringbone:</strong> 15–20% — complex V-pattern, many short cuts</li>
              <li><strong>Chevron:</strong> 20%+ — angled ends require significant waste</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Flooring Material Comparison</h2>
            <ul>
              <li><strong>Solid hardwood:</strong> Refinishable 3–5 times, premium look. Sensitive to humidity. $5–$12/sq ft material.</li>
              <li><strong>Engineered hardwood:</strong> Real wood veneer over plywood core. More stable than solid. $4–$10/sq ft.</li>
              <li><strong>Laminate:</strong> Photographically printed wood image. Durable, scratch-resistant. $1.50–$5/sq ft. Cannot be refinished.</li>
              <li><strong>Luxury Vinyl Plank (LVP):</strong> 100% waterproof, comfortable, easy DIY click install. $2–$7/sq ft. Cannot be refinished.</li>
              <li><strong>Carpet:</strong> Warm, soft, excellent sound absorption. $1.50–$8/sq ft. Needs replacement every 10–15 years.</li>
              <li><strong>Ceramic / porcelain tile:</strong> Most durable, fully waterproof. $1–$10/sq ft. Cold and hard underfoot.</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Choosing the Right Flooring for Each Room</h2>
            <ul>
              <li><strong>Living room / bedroom:</strong> Hardwood, engineered wood, LVP or carpet — all suitable</li>
              <li><strong>Kitchen:</strong> LVP, tile or engineered wood — easy to clean, handles spills</li>
              <li><strong>Bathroom:</strong> Porcelain tile or LVP only — must be 100% waterproof</li>
              <li><strong>Basement:</strong> LVP or tile — moisture-resistant; avoid solid hardwood and carpet over concrete</li>
              <li><strong>Hallways / high traffic:</strong> Tile, LVP or hardwood with an aluminum oxide finish — avoid soft woods</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many square feet of flooring do I need for a 12×14 room?</summary>
              <p>12×14 = 168 sq ft. With a 10% waste allowance, order 185 sq ft. Most flooring is sold in cartons covering 20–25 sq ft each — you would need 8 cartons at 25 sq ft per carton.</p>
            </details>
            <details>
              <summary>Can I install hardwood over concrete?</summary>
              <p>Solid hardwood cannot be glued or nailed to concrete and is not recommended. Engineered hardwood can be glued or floated over concrete. LVP can be floated over concrete. Always check for moisture before installing any wood product over concrete.</p>
            </details>
            <details>
              <summary>What direction should I lay flooring planks?</summary>
              <p>Run planks parallel to the longest wall or the main light source for the most visually appealing result. Always run planks perpendicular to floor joists when nailing or stapling solid hardwood for structural reasons.</p>
            </details>
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
