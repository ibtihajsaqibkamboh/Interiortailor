import MulchCalculator from '@/components/MulchCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Mulch Calculator - How Much Mulch Do I Need?',
  description:
    'Calculate how much mulch you need for garden beds, tree rings and landscaping. Choose from wood chip, straw, compost, rubber and more. Metric and imperial.',
  path: '/mulch-calculator/',
});

export default function MulchCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">MULCH CALCULATOR</span>
        <h1>Mulch Calculator</h1>
        <p>
          Estimate how much mulch you need for garden beds, tree rings, vegetable gardens and
          landscaping areas. Select your mulch type, enter the dimensions and depth, and get a
          volume estimate plus an approximate bag count.
        </p>
      </section>

      <MulchCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Mulch Volume Is Calculated</h2>
            <p>
              The calculator multiplies the area by the required depth:
            </p>
            <p><span className="formula">Volume = Length × Width × Depth</span></p>
            <p>
              A waste allowance is included for settling, uneven ground and spreading losses.
              Weight is estimated using the typical bulk density of the selected material.
            </p>
          </article>

          <article className="seo-card">
            <h2>Recommended Mulch Depths</h2>
            <ul>
              <li><strong>Flower beds:</strong> 5–8 cm (2–3 in)</li>
              <li><strong>Tree rings:</strong> 8–10 cm (3–4 in) — keep away from trunk</li>
              <li><strong>Vegetable gardens:</strong> 5–10 cm (2–4 in)</li>
              <li><strong>Weed suppression:</strong> 8–10 cm (3–4 in)</li>
              <li><strong>Playgrounds:</strong> 15+ cm (6+ in) for safety cushioning</li>
            </ul>
            <p>
              Deeper mulch suppresses weeds more effectively but can retain excess moisture.
              Check the manufacturer or supplier guidance for the specific product you are using.
            </p>
            <div className="related-links">
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/paint-calculator/">Paint Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
