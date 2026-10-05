import RoofingCalculator from '@/components/RoofingCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Roofing Calculator - How Many Squares of Roofing Do I Need?',
  description: 'Calculate roofing squares, shingle bundles and material cost. Accounts for roof pitch, waste allowance and seven common roofing materials.',
  path: '/roofing-calculator/',
});

export default function RoofingPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">ROOFING CALCULATOR</span>
        <h1>Roofing Calculator — Squares, Bundles &amp; Material Cost</h1>
        <p>
          Estimate roofing material for your project. Enter the footprint dimensions and pitch,
          select your material and the calculator converts flat area to sloped roof area, then
          calculates squares, bundles and an indicative material cost.
        </p>
      </section>

      <RoofingCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Understanding Roofing Squares</h2>
            <p>
              A roofing square equals 100 square feet of roof surface area. Most asphalt shingles
              are sold in bundles of approximately 33 sq ft, so 3 bundles = 1 square.
            </p>
            <p>The pitch multiplier converts your flat (plan) area to actual sloped surface area:</p>
            <p><span className="formula">Sloped Area = Flat Area × Pitch Multiplier</span></p>
            <p>
              A 6/12 pitch has a multiplier of 1.118, meaning a 1,000 sq ft footprint produces
              approximately 1,118 sq ft of actual roof surface — about 11.2 squares.
            </p>
          </article>

          <article className="seo-card">
            <h2>Roofing Material Comparison</h2>
            <ul>
              <li><strong>Asphalt 3-tab shingles:</strong> Most economical, 15–20 year lifespan, widely available</li>
              <li><strong>Architectural shingles:</strong> Dimensional appearance, 25–30 year lifespan, better wind rating</li>
              <li><strong>Metal roofing (standing seam):</strong> 40–70 year lifespan, recyclable, premium cost</li>
              <li><strong>Cedar shake:</strong> Natural beauty, 25–30 years with maintenance, fire-rating concerns in some areas</li>
              <li><strong>Concrete tile:</strong> Very durable (50+ years), heavy — requires structural assessment</li>
              <li><strong>EPDM (flat roofs):</strong> Rubber membrane, low-slope applications only</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Pitch Multiplier Reference Table</h2>
            <ul>
              <li><strong>3/12</strong> — 14.0° — multiplier 1.031 — low slope</li>
              <li><strong>4/12</strong> — 18.4° — multiplier 1.054</li>
              <li><strong>5/12</strong> — 22.6° — multiplier 1.083</li>
              <li><strong>6/12</strong> — 26.6° — multiplier 1.118 — common residential</li>
              <li><strong>8/12</strong> — 33.7° — multiplier 1.202</li>
              <li><strong>10/12</strong> — 39.8° — multiplier 1.302</li>
              <li><strong>12/12</strong> — 45.0° — multiplier 1.414 — steep</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many bundles of shingles do I need for 1,000 sq ft?</summary>
              <p>At 3 bundles per square and a 6/12 pitch (multiplier 1.118): 1,000 × 1.118 = 1,118 sq ft ÷ 100 = 11.18 squares × 3 bundles = 34 bundles. Add 10% waste to order 38 bundles.</p>
            </details>
            <details>
              <summary>How much does a new roof cost?</summary>
              <p>Asphalt shingle replacement typically costs $3.50–$6.00 per sq ft installed (materials + labor) in the US, or $8,000–$16,000 for an average 2,000 sq ft home. Metal roofing runs $8–$14 per sq ft installed.</p>
            </details>
            <details>
              <summary>Do I need to replace the decking when reroofing?</summary>
              <p>Only if the existing plywood or OSB decking is soft, rotted or delaminated. A reputable contractor will inspect decking after removing the old shingles and replace damaged sections before installing new roofing.</p>
            </details>
            <div className="related-links">
              <a href="/roof-pitch-calculator/">Roof Pitch Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/insulation-calculator/">Insulation Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
