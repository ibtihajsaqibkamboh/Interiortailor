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
        <h1>Pool Chemical Calculator — Chlorine, pH &amp; Alkalinity Dosing</h1>
        <p>
          Calculate the amount of chlorine, pH adjuster and alkalinity increaser needed to bring
          your pool water into balance. Enter your pool volume and current test results to get
          tailored chemical dose estimates for a safe, clear swimming pool.
        </p>
      </section>

      <PoolChemicalCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Ideal Pool Water Chemistry Ranges</h2>
            <p>
              Maintaining balanced pool water protects swimmers, extends equipment life and prevents
              algae growth. Target these ranges:
            </p>
            <ul>
              <li><strong>Free chlorine:</strong> 1–3 ppm (shock to 10 ppm after heavy use or rain)</li>
              <li><strong>pH:</strong> 7.2–7.6 (ideal 7.4 — below 7.2 corrodes equipment; above 7.8 reduces chlorine effectiveness)</li>
              <li><strong>Total alkalinity:</strong> 80–120 ppm (acts as a pH buffer)</li>
              <li><strong>Calcium hardness:</strong> 200–400 ppm (prevents corrosion and scaling)</li>
              <li><strong>Cyanuric acid (stabilizer):</strong> 30–50 ppm for outdoor pools</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Common Pool Chemicals &amp; Their Purpose</h2>
            <ul>
              <li><strong>Dichlor / Trichlor (chlorine tablets):</strong> Slow-dissolving sanitizer for ongoing chlorination</li>
              <li><strong>Calcium hypochlorite (shock):</strong> Fast-dissolving shock treatment, raises FC quickly</li>
              <li><strong>Soda ash (sodium carbonate):</strong> Raises pH without significantly raising alkalinity</li>
              <li><strong>Muriatic acid:</strong> Lowers pH and alkalinity</li>
              <li><strong>Baking soda (sodium bicarbonate):</strong> Raises total alkalinity with minimal pH change</li>
              <li><strong>Cyanuric acid:</strong> Stabilizes chlorine against UV degradation in outdoor pools</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Pool Chemical Safety Guidelines</h2>
            <ul>
              <li>Always add chemicals to water — never water to concentrated chemicals</li>
              <li>Add chemicals with the pump running to distribute them evenly</li>
              <li>Never mix different pool chemicals together — some combinations are explosive</li>
              <li>Adjust only one parameter at a time, then wait and retest before adding more</li>
              <li>Wait at least 4 hours (ideally overnight) after shocking before swimming</li>
              <li>Store chemicals in a cool, dry, well-ventilated area away from direct sunlight and heat</li>
              <li>Keep chemicals out of reach of children and pets</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How often should I test my pool water?</summary>
              <p>Test free chlorine and pH at least 2–3 times per week during swimming season, and after heavy rain or heavy bather load. Test alkalinity and calcium hardness weekly.</p>
            </details>
            <details>
              <summary>Why does my pool turn green after adding chlorine?</summary>
              <p>Green water after shocking usually means you have dead algae (killed but not yet filtered out), or metals like copper in the water that oxidize. Run the filter continuously and backwash regularly until clear.</p>
            </details>
            <details>
              <summary>How much chlorine do I add to a 10,000-gallon pool?</summary>
              <p>To raise free chlorine by 1 ppm in a 10,000-gallon pool, add approximately 0.1 lb of calcium hypochlorite (65%) or 0.13 lb of dichlor. Use this calculator for precise doses based on your actual readings.</p>
            </details>
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
