import PoolVolumeCalculator from '@/components/PoolVolumeCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Pool Volume Calculator - Calculate Pool Water Volume',
  description: 'Calculate swimming pool volume in litres or gallons for rectangular, circular and L-shaped pools. Includes pump turnover time estimate.',
  path: '/pool-volume-calculator/',
});

export default function PoolVolumePage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">POOL VOLUME CALCULATOR</span>
        <h1>Pool Volume Calculator — Gallons &amp; Litres for Any Pool Shape</h1>
        <p>
          Calculate your swimming pool volume in litres or gallons. Supports rectangular, circular
          and L-shaped pools. Enter the surface dimensions and shallow and deep end depths to get
          an accurate volume estimate for chemical dosing, pump sizing and fill time planning.
        </p>
      </section>

      <PoolVolumeCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Pool Volume Is Calculated</h2>
            <p>For a pool with a sloped floor, average depth is used:</p>
            <p><span className="formula">Average Depth = (Shallow End + Deep End) ÷ 2</span></p>
            <p><span className="formula">Volume (ft³) = Surface Area × Average Depth</span></p>
            <p><span className="formula">Volume (gallons) = ft³ × 7.48052</span></p>
            <p>
              For L-shaped pools, calculate the two rectangular sections separately and add their
              volumes together before multiplying by the average depth. For oval and kidney pools,
              use the appropriate area formula — this calculator handles them automatically.
            </p>
          </article>

          <article className="seo-card">
            <h2>Why Knowing Your Pool Volume Matters</h2>
            <ul>
              <li><strong>Chemical dosing:</strong> Chlorine, shock, algaecide, pH adjusters and stabilizer are all dosed per 10,000 gallons — an incorrect volume leads to over- or under-dosing</li>
              <li><strong>Pump sizing:</strong> Your pump and filter should turn over the entire pool volume every 6–8 hours. A 20,000-gallon pool needs a pump rated at 2,500–3,300 GPH minimum.</li>
              <li><strong>Heating cost:</strong> It takes approximately 1 BTU to raise 1 pound of water (8.34 lb/gal) by 1°F. A 20,000-gallon pool requires about 1,668,000 BTU to raise temperature by 10°F.</li>
              <li><strong>Salt chlorine systems:</strong> Salt chlorinators are sized by pool volume — use the correct cell size for your pool</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Pool Volume Quick Reference</h2>
            <ul>
              <li><strong>12×24 ft rectangular, 3.5–5 ft depth:</strong> ~12,000–14,000 gallons</li>
              <li><strong>16×32 ft rectangular, 3.5–6 ft depth:</strong> ~22,000–25,000 gallons</li>
              <li><strong>18×36 ft rectangular, 3.5–8 ft depth:</strong> ~32,000–38,000 gallons</li>
              <li><strong>24 ft round, 4 ft depth:</strong> ~13,600 gallons</li>
              <li><strong>27 ft round, 4 ft depth:</strong> ~17,200 gallons</li>
              <li><strong>15×30 ft oval, 4 ft depth:</strong> ~10,600 gallons</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How long does it take to fill a pool?</summary>
              <p>A standard garden hose flows approximately 9 gallons per minute. A 20,000-gallon pool takes about 2,222 minutes (37 hours) to fill at that rate. A faster ¾-inch hose at 15 GPM takes about 22 hours.</p>
            </details>
            <details>
              <summary>How accurate is an estimated pool volume?</summary>
              <p>Calculated volumes are estimates. For precise chemical dosing, measure actual water used during the fill with a water meter. Kidney and freeform pools are particularly difficult to estimate accurately.</p>
            </details>
            <details>
              <summary>How much does it cost to fill a pool?</summary>
              <p>At an average US water rate of $0.005 per gallon, a 20,000-gallon pool costs approximately $100 to fill from municipal water. Rates vary significantly — check your utility bill for your actual rate per 1,000 gallons.</p>
            </details>
            <div className="related-links">
              <a href="/pool-gallon-calculator/">Pool Gallon Calculator</a>
              <a href="/pool-chemical-calculator/">Pool Chemical Calculator</a>
              <a href="/cubic-feet-calculator/">Cubic Feet Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
