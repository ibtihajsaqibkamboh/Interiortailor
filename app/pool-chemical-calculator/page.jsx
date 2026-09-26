import PoolChemicalCalculator from '@/components/PoolChemicalCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Pool Chemical Calculator - Chlorine, pH & Alkalinity Dosing',
  description: 'Calculate how much chlorine, pH adjuster and alkalinity increaser to add to your pool. Enter pool volume and current test levels for accurate chemical dosing guidance.',
  path: '/pool-chemical-calculator/',
});

export default function PoolChemicalCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">POOL CHEMICAL CALCULATOR</span>
        <h1>Pool Chemical Calculator</h1>
        <p>
          Calculate the amount of chlorine (dichlor), pH adjuster (soda ash or muriatic acid) and
          alkalinity increaser (baking soda) needed to bring your pool water into balance. Enter
          your pool volume and current test results to get tailored chemical dose estimates.
        </p>
      </section>

      <PoolChemicalCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Ideal Pool Water Chemistry Ranges</h2>
            <ul>
              <li><strong>Free chlorine:</strong> 1–3 ppm (shock to 10 ppm)</li>
              <li><strong>pH:</strong> 7.2–7.6 (ideal 7.4)</li>
              <li><strong>Total alkalinity:</strong> 80–120 ppm</li>
              <li><strong>Calcium hardness:</strong> 200–400 ppm</li>
              <li><strong>Cyanuric acid (stabilizer):</strong> 30–50 ppm</li>
            </ul>
            <p>Test your pool water at least once a week and after heavy rain or heavy bather load.</p>
          </article>
          <article className="seo-card">
            <h2>Pool Chemical Safety Tips</h2>
            <ul>
              <li>Always add chemicals to water, never water to concentrated chemicals</li>
              <li>Add chemicals with the pump running for even distribution</li>
              <li>Never mix different chemicals together</li>
              <li>Adjust only one parameter at a time, then retest</li>
              <li>Store chemicals in a cool, dry place away from direct sunlight</li>
            </ul>
            <div className="related-links">
              <a href="/pool-gallon-calculator/">Pool Gallon Calculator</a>
              <a href="/pool-volume-calculator/">Pool Volume Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
