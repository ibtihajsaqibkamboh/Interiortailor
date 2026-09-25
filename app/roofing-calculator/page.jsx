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
        <h1>Roofing Calculator</h1>
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
            <p>A roofing square equals 100 square feet of roof surface. Most shingles are sold in bundles of approximately 33 sq ft, so <strong>3 bundles cover 1 square</strong>.</p>
            <p>The pitch multiplier converts your flat (plan) area to the actual sloped surface area:</p>
            <p><span className="formula">Sloped Area = Flat Area × Pitch Multiplier</span></p>
            <p>A 6/12 pitch has a multiplier of ~1.118, meaning a 1,000 sq ft footprint produces about 1,118 sq ft of actual roof surface.</p>
          </article>
          <article className="seo-card">
            <h2>Common Roof Pitches</h2>
            <ul>
              <li><strong>2/12 – 4/12</strong> — Low slope, limited material options</li>
              <li><strong>4/12 – 6/12</strong> — Moderate slope, most materials suitable</li>
              <li><strong>6/12 – 9/12</strong> — Standard residential pitch</li>
              <li><strong>9/12 – 12/12</strong> — Steep, may require special fastening</li>
            </ul>
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
