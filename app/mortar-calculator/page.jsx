import MortarCalculator from '@/components/MortarCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Mortar Calculator - How Much Mortar Do I Need?',
  description: 'Calculate how many bags of mortar mix you need for bricklaying, block laying, tile setting or stucco. Enter your project details for a quick mortar volume estimate.',
  path: '/mortar-calculator/',
});

export default function MortarCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">MORTAR CALCULATOR</span>
        <h1>Mortar Calculator</h1>
        <p>
          Estimate how much mortar you need for bricklaying, concrete block laying, tile setting
          or stucco applications. Select your application type, enter the number of units or the
          surface area, and get an instant estimate of cubic feet and 80 lb mortar bags needed.
        </p>
      </section>

      <MortarCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How to Calculate Mortar Quantity</h2>
            <p>Mortar volume depends on the application:</p>
            <ul>
              <li><strong>Bricklaying:</strong> approximately 0.0035 cu ft per standard brick</li>
              <li><strong>Block (CMU) laying:</strong> approximately 0.012 cu ft per block</li>
              <li><strong>Tile setting:</strong> approximately 1 cu ft per 15 sq ft of tile</li>
            </ul>
            <p>A standard 80 lb bag of mortar mix yields approximately 0.5 cu ft of mixed mortar.</p>
          </article>
          <article className="seo-card">
            <h2>Types of Mortar Mix</h2>
            <ul>
              <li><strong>Type S:</strong> High-strength, below-grade masonry and retaining walls</li>
              <li><strong>Type N:</strong> General-purpose exterior and above-grade masonry</li>
              <li><strong>Type M:</strong> Foundations and hardscaping in contact with earth</li>
              <li><strong>Tile mortar:</strong> Modified thin-set for floor and wall tile</li>
            </ul>
            <div className="related-links">
              <a href="/brick-calculator/">Brick Calculator</a>
              <a href="/block-calculator/">Block Calculator</a>
              <a href="/cement-calculator/">Cement Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
