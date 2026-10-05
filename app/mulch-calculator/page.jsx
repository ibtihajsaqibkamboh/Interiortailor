import MulchCalculator from '@/components/MulchCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Mulch Calculator - How Much Mulch Do I Need?',
  description: 'Calculate how much mulch you need for garden beds, tree rings and landscaping. Choose from wood chip, straw, compost, rubber and more. Metric and imperial.',
  path: '/mulch-calculator/',
});

export default function MulchCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">MULCH CALCULATOR</span>
        <h1>Mulch Calculator — How Much Mulch Do I Need?</h1>
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
            <h2>How Much Mulch Do I Need?</h2>
            <p>Mulch volume is calculated from the area multiplied by the desired depth:</p>
            <p><span className="formula">Volume = Length × Width × Depth</span></p>
            <p>
              A 10% waste allowance is included for settling and uneven spreading. Bulk mulch is
              typically sold by the cubic yard in the US; bagged mulch in 2 cu ft bags. One cubic
              yard covers approximately 108 sq ft at 3 inches deep.
            </p>
          </article>

          <article className="seo-card">
            <h2>Recommended Mulch Depths by Application</h2>
            <ul>
              <li><strong>Flower beds:</strong> 5–8 cm (2–3 in) — enough to retain moisture and suppress weeds</li>
              <li><strong>Tree rings:</strong> 8–10 cm (3–4 in) — keep 15 cm (6 in) clear of the trunk to prevent rot</li>
              <li><strong>Vegetable gardens:</strong> 5–10 cm (2–4 in) of straw or untreated wood chip</li>
              <li><strong>Paths &amp; walkways:</strong> 8–10 cm (3–4 in) for cushioning and weed suppression</li>
              <li><strong>Playgrounds (safety):</strong> 15–30 cm (6–12 in) minimum for fall protection</li>
            </ul>
            <p>Do not exceed 10 cm in flower beds — thick mulch can suffocate plant roots and harbour pests.</p>
          </article>

          <article className="seo-card">
            <h2>Mulch Types &amp; Their Best Uses</h2>
            <ul>
              <li><strong>Shredded hardwood bark:</strong> Decomposes slowly, attractive appearance, best for ornamental beds</li>
              <li><strong>Wood chips:</strong> Decomposes faster, improves soil, good for paths and around trees</li>
              <li><strong>Straw:</strong> Lightweight, inexpensive, ideal for vegetable gardens — decomposes quickly</li>
              <li><strong>Compost:</strong> Improves soil structure as it breaks down, best tilled in or used as a thin topdressing</li>
              <li><strong>Rubber mulch:</strong> Does not decompose, excellent for playgrounds, poor for plant beds</li>
              <li><strong>Gravel / stone:</strong> Permanent, excellent drainage, no weed-feeding nutrients</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many bags of mulch do I need for a 10×10 garden bed?</summary>
              <p>A 10×10 ft bed at 3 inches deep requires (10 × 10 × 0.25) ÷ 27 = 0.93 cubic yards, or about 14 bags of 2 cu ft mulch.</p>
            </details>
            <details>
              <summary>Should I remove old mulch before adding new?</summary>
              <p>If the existing layer is less than 3 inches, top it up. If it is compacted and matted, rake it loose or remove partially before adding fresh mulch to allow water penetration.</p>
            </details>
            <details>
              <summary>Does mulch attract termites?</summary>
              <p>Wood mulch does not attract termites but can provide moisture and cover they prefer. Keep mulch 15–30 cm (6–12 in) away from the foundation of your house as a precaution.</p>
            </details>
            <div className="related-links">
              <a href="/topsoil-calculator/">Topsoil Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/sod-calculator/">Sod Calculator</a>
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
