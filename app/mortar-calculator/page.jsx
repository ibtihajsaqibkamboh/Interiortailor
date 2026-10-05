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
        <h1>Mortar Calculator — How Much Mortar Mix Do I Need?</h1>
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
            <p>
              Mortar volume depends on the application type and the joint size. The general approach
              is to estimate the volume of all joints in the assembly:
            </p>
            <ul>
              <li><strong>Bricklaying:</strong> ~0.0035 cubic feet of mortar per standard brick</li>
              <li><strong>CMU block laying:</strong> ~0.012 cubic feet of mortar per standard block</li>
              <li><strong>Tile setting:</strong> ~1 cubic foot per 15 square feet of tile</li>
              <li><strong>Stucco / parging:</strong> ~1 cubic foot per 12 square feet</li>
            </ul>
            <p>
              One standard 80 lb bag of mortar mix yields approximately 0.5 cubic feet of mixed
              mortar. Always add a 15% waste allowance to account for waste during mixing and
              application.
            </p>
          </article>

          <article className="seo-card">
            <h2>Mortar Mix Types &amp; When to Use Each</h2>
            <ul>
              <li><strong>Type S:</strong> High strength (1,800 psi). Below-grade masonry, retaining walls, in-ground work.</li>
              <li><strong>Type N:</strong> Medium strength (750 psi). General-purpose above-grade exterior masonry.</li>
              <li><strong>Type M:</strong> Very high strength (2,500 psi). Foundations, driveways, hardscaping in contact with earth.</li>
              <li><strong>Type O:</strong> Low strength (350 psi). Interior, non-load-bearing walls and repointing.</li>
              <li><strong>Modified thin-set:</strong> For floor and wall tile over concrete or cement board.</li>
            </ul>
            <p>
              Always use the mortar type recommended by the block, brick or tile manufacturer.
              Using a mortar that is too strong for the masonry unit can cause cracking.
            </p>
          </article>

          <article className="seo-card">
            <h2>Mixing &amp; Application Tips</h2>
            <p>
              Properly mixed mortar is critical for a durable installation. Follow these guidelines:
            </p>
            <ul>
              <li>Mix mortar to a stiff, workable consistency — it should hold its shape when squeezed</li>
              <li>Use clean, potable water and clean mixing equipment</li>
              <li>Do not re-temper mortar that has started to set; discard and mix a fresh batch</li>
              <li>Hot or windy weather accelerates drying — mist new work and cover overnight</li>
              <li>Cold weather (below 40°F / 4°C) requires heated materials and cold-weather protection</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many bricks does one bag of mortar cover?</summary>
              <p>One 80 lb bag of mortar mix covers approximately 40–50 standard bricks for a single-wythe wall with a standard 3/8-inch joint.</p>
            </details>
            <details>
              <summary>What is the difference between mortar and grout?</summary>
              <p>Mortar bonds masonry units together and fills joints between bricks and blocks. Grout is a fluid mixture used to fill voids in masonry cores or between tiles after setting.</p>
            </details>
            <details>
              <summary>Can I use pre-mixed mortar for large jobs?</summary>
              <p>Pre-mixed mortar in tubs is convenient for small repairs but expensive for large jobs. Dry bag mortar mixed on site is more economical for any project over 50 sq ft.</p>
            </details>
            <div className="related-links">
              <a href="/brick-calculator/">Brick Calculator</a>
              <a href="/block-calculator/">Block Calculator</a>
              <a href="/cement-calculator/">Cement Calculator</a>
              <a href="/grout-calculator/">Grout Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
