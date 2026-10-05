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
        <h1>AC Size Calculator — What Size Air Conditioner Do I Need?</h1>
        <p>
          Determine the right air conditioner size for a room or whole home. Enter your floor area,
          climate zone, sunlight exposure and typical occupancy to get a recommended BTU rating
          matched to the nearest standard AC unit size — so you can shop with confidence.
        </p>
      </section>

      <AcSizeCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How to Size an Air Conditioner</h2>
            <p>
              AC sizing starts with the cooling load — the amount of heat the unit must remove per
              hour. A commonly used starting point:
            </p>
            <p><span className="formula">BTU/h ≈ Floor Area (sq ft) × 20 BTU/h</span></p>
            <p>
              Then adjust upward for hot climates, sunny exposures and high occupancy, or downward
              for well-shaded, well-insulated spaces. The calculator returns the nearest standard
              AC size so you can match to available equipment.
            </p>
          </article>

          <article className="seo-card">
            <h2>Standard AC Unit Sizes (BTU/h)</h2>
            <ul>
              <li><strong>5,000–8,000 BTU:</strong> Small rooms up to 350 sq ft (window units)</li>
              <li><strong>10,000–12,000 BTU:</strong> Medium rooms 350–550 sq ft</li>
              <li><strong>14,000–18,000 BTU:</strong> Large rooms 550–900 sq ft</li>
              <li><strong>24,000 BTU (2 tons):</strong> Up to 1,200 sq ft</li>
              <li><strong>36,000 BTU (3 tons):</strong> Up to 1,800 sq ft</li>
              <li><strong>48,000 BTU (4 tons):</strong> Up to 2,400 sq ft</li>
              <li><strong>60,000 BTU (5 tons):</strong> Up to 3,000 sq ft</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Window Unit vs. Central AC vs. Mini-Split</h2>
            <ul>
              <li><strong>Window AC:</strong> Single-room cooling, 5,000–25,000 BTU, easy DIY installation, lower upfront cost</li>
              <li><strong>Central AC:</strong> Whole-home cooling via ductwork, most efficient for large homes, requires professional installation</li>
              <li><strong>Mini-split (ductless):</strong> Zone-based cooling without ducts, highly efficient (SEER 20+), ideal for additions and homes without existing ductwork</li>
              <li><strong>Portable AC:</strong> No installation required, least efficient, good for temporary use only</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>What happens if I buy an AC unit that is too large?</summary>
              <p>An oversized AC unit cools the space quickly then shuts off before completing a full cycle. This short-cycling prevents proper dehumidification, leaving the air feeling cold and clammy, and causes excessive wear on the compressor.</p>
            </details>
            <details>
              <summary>What is a good SEER rating for an air conditioner?</summary>
              <p>The minimum federal efficiency standard is SEER 14. Energy Star certified units start at SEER 15. High-efficiency mini-splits can reach SEER 20–30+. Higher SEER means lower operating costs.</p>
            </details>
            <details>
              <summary>Do I need a bigger AC if I have high ceilings?</summary>
              <p>Yes. Vaulted or high ceilings increase the air volume and often add more heat gain through skylights. Increase your BTU estimate by 15–25% for rooms with ceilings above 9 feet.</p>
            </details>
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
