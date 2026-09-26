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
        <h1>Pool Gallon Calculator</h1>
        <p>
          Find out how many gallons of water your swimming pool holds. Choose from rectangular,
          oval, round or kidney shapes, enter your pool&rsquo;s length, width and depth measurements,
          and get an instant volume in US gallons and litres — essential for accurate chemical
          dosing, pump sizing and fill time estimates.
        </p>
      </section>

      <PoolGallonCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Pool Volume Is Calculated</h2>
            <p>For a rectangular pool with variable depth:</p>
            <p><span className="formula">Volume (ft³) = Length × Width × Average Depth</span></p>
            <p><span className="formula">Gallons = Volume (ft³) × 7.48</span></p>
            <p>Average depth = (Shallow End + Deep End) ÷ 2. A 12×24 ft pool with 3.5–6 ft depths holds approximately 12,700 gallons.</p>
          </article>
          <article className="seo-card">
            <h2>Why Pool Volume Matters</h2>
            <ul>
              <li><strong>Chemical dosing:</strong> All pool chemical doses are based on water volume</li>
              <li><strong>Pump sizing:</strong> Pool pumps are rated to turn over the volume in 6–8 hours</li>
              <li><strong>Fill time:</strong> A standard garden hose flows ~9 GPM; a 15,000 gal pool takes ~28 hours</li>
              <li><strong>Heating:</strong> Pool heater BTU sizing depends on volume and temperature rise</li>
            </ul>
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
