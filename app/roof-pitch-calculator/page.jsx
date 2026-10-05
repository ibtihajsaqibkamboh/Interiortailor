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
        <h1>Roof Pitch Calculator — Pitch, Angle &amp; Multiplier Converter</h1>
        <p>
          Convert between roof pitch (rise over run), angle in degrees and pitch multiplier.
          Enter any one value to calculate the other two. Common pitch presets help you quickly
          check standard residential roof slopes and rafter lengths.
        </p>
      </section>

      <RoofPitchCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Understanding Roof Pitch</h2>
            <p>
              Roof pitch is expressed as rise over run, where the run is always 12 inches in the
              US system. A 6/12 pitch rises 6 inches for every 12 inches of horizontal distance.
            </p>
            <p>The pitch multiplier converts ground-level footprint area to actual sloped roof area:</p>
            <p><span className="formula">Multiplier = √(1 + (Rise ÷ Run)²)</span></p>
            <p>
              Multiply your footprint area by the pitch multiplier to get the actual roofing
              surface area needed for material calculations. A 6/12 pitch multiplier of 1.118
              means a 1,000 sq ft footprint has 1,118 sq ft of actual roof surface.
            </p>
          </article>

          <article className="seo-card">
            <h2>Roof Pitch Reference Table</h2>
            <ul>
              <li><strong>2/12:</strong> 9.5° — multiplier 1.014 — flat to low slope</li>
              <li><strong>3/12:</strong> 14.0° — multiplier 1.031</li>
              <li><strong>4/12:</strong> 18.4° — multiplier 1.054</li>
              <li><strong>5/12:</strong> 22.6° — multiplier 1.083</li>
              <li><strong>6/12:</strong> 26.6° — multiplier 1.118 — most common residential</li>
              <li><strong>7/12:</strong> 30.3° — multiplier 1.158</li>
              <li><strong>8/12:</strong> 33.7° — multiplier 1.202</li>
              <li><strong>12/12:</strong> 45.0° — multiplier 1.414 — steep pitch</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>How Pitch Affects Your Roof</h2>
            <ul>
              <li><strong>Drainage:</strong> Steeper pitch sheds rain and snow faster — essential in high-rainfall and snow regions</li>
              <li><strong>Material options:</strong> Pitches below 2/12 require membrane roofing (EPDM, TPO); pitches 2/12–4/12 need ice-and-water barrier; pitches 4/12+ allow standard shingles</li>
              <li><strong>Attic space:</strong> Higher pitch creates more usable attic space</li>
              <li><strong>Wind resistance:</strong> Very steep roofs (12/12+) can catch wind like a sail — moderate pitch (4/12–8/12) performs best in high-wind areas</li>
              <li><strong>Installation cost:</strong> Steeper roofs require safety equipment, slow installation and increase labor cost significantly</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>What is a normal roof pitch for a house?</summary>
              <p>Most residential homes in the US have a pitch between 4/12 and 9/12. A 6/12 pitch (26.6°) is the most common. Steeper pitches (10/12–12/12) are found in steep-rainfall regions or for aesthetic reasons.</p>
            </details>
            <details>
              <summary>How do I measure my existing roof pitch?</summary>
              <p>Place a level horizontally against the roof surface with one end at the roof. Measure 12 inches along the level from that point, then measure the vertical distance from the end of the level down to the roof surface. That vertical measurement in inches is your pitch (e.g., 6 inches = 6/12).</p>
            </details>
            <details>
              <summary>What is the minimum pitch for asphalt shingles?</summary>
              <p>Most shingle manufacturers require a minimum 2/12 pitch with double underlayment, or 4/12 with standard installation. Always check your specific product's installation requirements.</p>
            </details>
            <div className="related-links">
              <a href="/roofing-calculator/">Roofing Calculator</a>
              <a href="/solar-panel-calculator/">Solar Panel Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
