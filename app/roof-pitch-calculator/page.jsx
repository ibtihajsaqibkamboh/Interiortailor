import RoofPitchCalculator from '@/components/RoofPitchCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Roof Pitch Calculator - Calculate Pitch, Angle & Multiplier',
  description: 'Convert between roof pitch (x/12), angle in degrees and pitch multiplier. Enter rise and run, angle or multiplier and get all three values instantly.',
  path: '/roof-pitch-calculator/',
});

export default function RoofPitchPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">ROOF PITCH CALCULATOR</span>
        <h1>Roof Pitch Calculator</h1>
        <p>
          Convert between roof pitch (rise over run), angle in degrees and pitch multiplier.
          Enter any one value to calculate the other two. Common pitch presets help you quickly
          check standard residential roof slopes.
        </p>
      </section>

      <RoofPitchCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Understanding Roof Pitch</h2>
            <p>Roof pitch is expressed as <strong>rise over run</strong>, where the run is always 12 inches in the US system. A 6/12 pitch rises 6 inches for every 12 inches of horizontal distance.</p>
            <p>The <strong>pitch multiplier</strong> converts ground-level (plan) area to actual sloped roof surface area:</p>
            <p><span className="formula">Multiplier = √(1 + (Rise ÷ Run)²)</span></p>
            <p>Multiply your footprint area by the pitch multiplier to get the actual roofing surface area.</p>
          </article>
          <article className="seo-card">
            <h2>Common Pitch Reference</h2>
            <ul>
              <li><strong>3/12</strong> — 14.0° · multiplier 1.031 · low pitch</li>
              <li><strong>4/12</strong> — 18.4° · multiplier 1.054</li>
              <li><strong>5/12</strong> — 22.6° · multiplier 1.083</li>
              <li><strong>6/12</strong> — 26.6° · multiplier 1.118 · common residential</li>
              <li><strong>8/12</strong> — 33.7° · multiplier 1.202</li>
              <li><strong>12/12</strong> — 45.0° · multiplier 1.414 · steep</li>
            </ul>
            <div className="related-links">
              <a href="/roofing-calculator/">Roofing Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
