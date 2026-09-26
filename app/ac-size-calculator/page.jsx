import AcSizeCalculator from '@/components/AcSizeCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'AC Size Calculator - What Size Air Conditioner Do I Need?',
  description: 'Calculate the right air conditioner size in BTU and tons for any room or home. Factors in floor area, climate zone, sunlight exposure and occupancy for quick AC sizing.',
  path: '/ac-size-calculator/',
});

export default function AcSizeCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">AC SIZE CALCULATOR</span>
        <h1>AC Size Calculator</h1>
        <p>
          Determine the right air conditioner size for a room or whole home. Enter your floor area,
          climate zone, sunlight exposure and typical occupancy. The calculator returns a
          recommended BTU rating and tonnage matched to the nearest standard AC unit size — so
          you can shop with confidence.
        </p>
      </section>

      <AcSizeCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How to Size an Air Conditioner</h2>
            <p>A common starting point: <span className="formula">BTU/h ≈ Floor Area (sq ft) × 20 BTU/h</span></p>
            <p>
              Then adjust for climate, sun exposure and occupancy. Hotter climates and sunnier rooms
              need more capacity; shaded and well-insulated spaces need less.
            </p>
            <p>For whole-home systems, a Manual J load calculation by a licensed HVAC contractor is the correct method.</p>
          </article>
          <article className="seo-card">
            <h2>Consequences of Wrong AC Size</h2>
            <ul>
              <li><strong>Undersized:</strong> Can't reach set temperature, runs constantly, high energy bills</li>
              <li><strong>Oversized:</strong> Short-cycles, doesn't dehumidify properly, uncomfortable swings</li>
              <li><strong>Correct size:</strong> Runs in long cycles, maintains humidity, efficient and comfortable</li>
            </ul>
            <p>Window units are typically sized by room (6,000–12,000 BTU), while central systems are sized by zone or whole house (1.5–5 tons).</p>
            <div className="related-links">
              <a href="/hvac-btu-calculator/">HVAC BTU Calculator</a>
              <a href="/insulation-calculator/">Insulation Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
