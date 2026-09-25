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
        <h1>Pool Volume Calculator</h1>
        <p>
          Calculate your swimming pool volume in litres or gallons. Supports rectangular, circular
          and L-shaped pools. Enter the surface dimensions and shallow and deep end depths to get
          an accurate volume estimate for chemical dosing and pump sizing.
        </p>
      </section>

      <PoolVolumeCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Pool Volume Is Calculated</h2>
            <p>For a pool with a sloped floor, average depth is used:</p>
            <p><span className="formula">Average Depth = (Shallow End + Deep End) ÷ 2</span></p>
            <p><span className="formula">Volume = Surface Area × Average Depth</span></p>
            <p>For L-shaped pools, the two rectangular sections are calculated separately and added together before multiplying by average depth.</p>
          </article>
          <article className="seo-card">
            <h2>Why Pool Volume Matters</h2>
            <ul>
              <li><strong>Chemical dosing</strong> — chlorine, pH adjusters and algaecides are dosed by volume</li>
              <li><strong>Pump sizing</strong> — the pump should turn over the full pool volume every 8 hours</li>
              <li><strong>Heating cost</strong> — larger volumes cost more to heat and maintain temperature</li>
              <li><strong>Water cost</strong> — knowing volume helps estimate fill and top-up costs</li>
            </ul>
            <p className="disclaimer" style={{ marginTop: '12px' }}>Always consult a pool professional for chemical dosing. Incorrect chemical levels can be hazardous.</p>
          </article>
        </div>
      </section>
    </>
  );
}
