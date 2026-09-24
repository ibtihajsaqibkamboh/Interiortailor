import GravelCalculator from '@/components/GravelCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Gravel Calculator - How Much Gravel Do I Need?',
  description:
    'Calculate how much gravel, crushed stone, pea gravel or decomposed granite you need by area and depth. Metric and imperial with weight and waste estimates.',
  path: '/gravel-calculator/',
});

export default function GravelCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">GRAVEL CALCULATOR</span>
        <h1>Gravel Calculator</h1>
        <p>
          Estimate the volume and weight of gravel, pea gravel, crushed stone or decomposed granite
          for driveways, paths, drainage layers and landscaping projects. Enter the area dimensions,
          depth and material type to get a quick estimate.
        </p>
      </section>

      <GravelCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Gravel Volume Is Calculated</h2>
            <p>
              The calculation multiplies the area by the required depth:
            </p>
            <p><span className="formula">Volume = Length × Width × Depth</span></p>
            <p>
              Weight is then estimated using the typical bulk density of the selected material.
              A waste allowance is added to account for compaction, uneven ground and spreading
              losses.
            </p>
          </article>

          <article className="seo-card">
            <h2>Common Depths and Applications</h2>
            <ul>
              <li><strong>Driveways:</strong> 8–10 cm (3–4 in) base layer</li>
              <li><strong>Pathways:</strong> 5–8 cm (2–3 in)</li>
              <li><strong>Drainage layers:</strong> 10–15 cm (4–6 in)</li>
              <li><strong>Decorative landscaping:</strong> 5–7 cm (2–3 in)</li>
            </ul>
            <p>
              Always confirm coverage rates and weight limits with your supplier before placing
              a bulk order.
            </p>
            <div className="related-links">
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/mulch-calculator/">Mulch Calculator</a>
              <a href="/paint-calculator/">Paint Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
