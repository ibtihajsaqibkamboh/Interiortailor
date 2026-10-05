import GravelCalculator from '@/components/GravelCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Gravel Calculator - How Much Gravel Do I Need?',
  description: 'Calculate how much gravel, crushed stone, pea gravel or decomposed granite you need by area and depth. Metric and imperial with weight and waste estimates.',
  path: '/gravel-calculator/',
});

export default function GravelCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">GRAVEL CALCULATOR</span>
        <h1>Gravel Calculator — How Much Gravel Do I Need?</h1>
        <p>
          Estimate the volume and weight of gravel, pea gravel, crushed stone or decomposed granite
          for driveways, paths, drainage layers and landscaping projects. Enter the area dimensions,
          depth and material type to get a quick estimate with waste allowance.
        </p>
      </section>

      <GravelCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Gravel Volume Is Calculated</h2>
            <p>The basic formula multiplies area by depth:</p>
            <p><span className="formula">Volume = Length × Width × Depth</span></p>
            <p>
              Weight is then estimated using the typical bulk density of the selected material.
              A waste allowance of 10% is added to account for compaction, uneven ground and
              spreading losses. Always round up to the nearest whole unit when ordering.
            </p>
          </article>

          <article className="seo-card">
            <h2>Gravel Depths by Application</h2>
            <ul>
              <li><strong>Driveways (base layer):</strong> 10–15 cm (4–6 in) compacted depth</li>
              <li><strong>Driveways (surface layer):</strong> 5–8 cm (2–3 in) of pea gravel or crushed stone</li>
              <li><strong>Pathways:</strong> 5–8 cm (2–3 in)</li>
              <li><strong>French drains / drainage:</strong> 10–15 cm (4–6 in)</li>
              <li><strong>Decorative landscaping:</strong> 5–7 cm (2–3 in)</li>
              <li><strong>Concrete sub-base:</strong> 10 cm (4 in) minimum compacted</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Gravel Material Types Compared</h2>
            <ul>
              <li><strong>Pea gravel:</strong> Rounded, smooth, 3/8–1/2 in. Comfortable underfoot, tends to scatter. Good for paths and play areas.</li>
              <li><strong>Crushed stone (#57):</strong> Angular, compacts well. Best for driveways, drainage and sub-base.</li>
              <li><strong>Decomposed granite:</strong> Fine-grained, packs into a firm surface. Popular for desert landscaping and paths.</li>
              <li><strong>River rock:</strong> Rounded, decorative. Used in dry stream beds and ornamental landscaping.</li>
              <li><strong>Coarse sand:</strong> Fine particles, packs tightly. Used as paver setting bed.</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many cubic yards of gravel do I need for a driveway?</summary>
              <p>A typical two-car driveway (20×40 ft) at 4 inches deep requires (20 × 40 × 0.333) ÷ 27 = 9.9 cubic yards. Round up to 11 yards with a 10% waste allowance.</p>
            </details>
            <details>
              <summary>How much does a cubic yard of gravel weigh?</summary>
              <p>Crushed stone weighs approximately 2,700–2,800 lbs per cubic yard. Pea gravel is slightly lighter at around 2,500 lbs per cubic yard. Decomposed granite is denser at around 2,900 lbs per cubic yard.</p>
            </details>
            <details>
              <summary>Do I need landscape fabric under gravel?</summary>
              <p>Landscape fabric under decorative gravel helps prevent weeds and stops the gravel from mixing into the soil over time. For driveways and drainage applications, use a geotextile fabric designed for those applications instead.</p>
            </details>
            <div className="related-links">
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/mulch-calculator/">Mulch Calculator</a>
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
              <a href="/topsoil-calculator/">Topsoil Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
