import PoolGallonCalculator from '@/components/PoolGallonCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Pool Gallon Calculator - How Many Gallons Is My Pool?',
  description: 'Calculate the volume of your swimming pool in US gallons and litres. Supports rectangular, oval, round and kidney-shaped pools with shallow and deep end depths.',
  path: '/pool-gallon-calculator/',
});

export default function PoolGallonCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">POOL GALLON CALCULATOR</span>
        <h1>Pool Gallon Calculator — How Many Gallons Is My Swimming Pool?</h1>
        <p>
          Find out how many gallons of water your swimming pool holds. Choose from rectangular,
          oval, round or kidney shapes, enter your pool&rsquo;s dimensions and depths, and get an
          instant volume in US gallons and litres — essential for accurate chemical dosing,
          pump sizing and fill time estimates.
        </p>
      </section>

      <PoolGallonCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Pool Volume Is Calculated</h2>
            <p>
              Pool volume is calculated by multiplying the surface area by the average water depth.
              For a rectangular pool with a sloped floor:
            </p>
            <p><span className="formula">Average Depth = (Shallow End + Deep End) ÷ 2</span></p>
            <p><span className="formula">Volume (ft³) = Length × Width × Average Depth</span></p>
            <p><span className="formula">Gallons = Volume (ft³) × 7.48052</span></p>
            <p>
              A typical 16×32 ft rectangular pool with a 3.5–6 ft depth range holds approximately
              24,000 gallons. Round and oval pools use a pi-based area formula; kidney pools use an
              approximation of 82% of the bounding rectangle.
            </p>
          </article>

          <article className="seo-card">
            <h2>Why Pool Volume Matters</h2>
            <ul>
              <li><strong>Chemical dosing:</strong> Every chemical dose (chlorine, pH adjusters, algaecides) is calculated per 10,000 gallons of pool water</li>
              <li><strong>Pump sizing:</strong> Pool pumps must turn over the full volume every 6–8 hours — a 24,000-gallon pool needs a pump rated at 3,000–4,000 GPH</li>
              <li><strong>Fill time:</strong> A standard garden hose flows ~9 GPM; filling 20,000 gallons takes about 37 hours</li>
              <li><strong>Heater sizing:</strong> Pool heater BTU requirements are based on volume and temperature rise</li>
              <li><strong>Salt systems:</strong> Salt cell chlorinators are sized by pool volume in gallons</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Typical Pool Sizes &amp; Volumes</h2>
            <ul>
              <li><strong>Small residential (12×24 ft, 3.5–5 ft):</strong> ~12,000–14,000 gallons</li>
              <li><strong>Medium residential (16×32 ft, 3.5–6 ft):</strong> ~22,000–25,000 gallons</li>
              <li><strong>Large residential (20×40 ft, 3.5–8 ft):</strong> ~35,000–40,000 gallons</li>
              <li><strong>Lap pool (9×45 ft, 4 ft uniform):</strong> ~12,000 gallons</li>
              <li><strong>Round pool (24 ft dia, 4 ft deep):</strong> ~13,600 gallons</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How accurate is the pool gallon calculator?</summary>
              <p>The calculator gives a close estimate for standard pool shapes. For the most accurate chemical dosing, measure the actual water used to fill the pool using a water meter.</p>
            </details>
            <details>
              <summary>How do I find the volume of an irregularly shaped pool?</summary>
              <p>Divide the pool into sections that approximate standard shapes (rectangles, circles), calculate each section separately, then add the volumes together.</p>
            </details>
            <details>
              <summary>How many gallons of water does it take to fill a pool?</summary>
              <p>Most residential in-ground pools range from 15,000 to 30,000 gallons. Above-ground pools typically hold 3,000 to 10,000 gallons depending on diameter and depth.</p>
            </details>
            <div className="related-links">
              <a href="/pool-chemical-calculator/">Pool Chemical Calculator</a>
              <a href="/pool-volume-calculator/">Pool Volume Calculator</a>
              <a href="/cubic-feet-calculator/">Cubic Feet Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
