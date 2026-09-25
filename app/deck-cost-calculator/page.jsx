import DeckCostCalculator from '@/components/DeckCostCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Deck Cost Calculator - Estimate Deck Materials & Cost',
  description: 'Estimate deck material costs and total project cost for pressure-treated wood, cedar, composite and other decking materials. Metric and imperial.',
  path: '/deck-cost-calculator/',
});

export default function DeckCostPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">DECK COST CALCULATOR</span>
        <h1>Deck Cost Calculator</h1>
        <p>
          Estimate the material and total project cost for your deck. Enter the dimensions,
          choose your decking material and adjust the labor percentage to match your local rates.
        </p>
      </section>

      <DeckCostCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Decking Material Comparison</h2>
            <ul>
              <li><strong>Pressure-treated wood</strong> — lowest upfront cost, requires maintenance</li>
              <li><strong>Cedar</strong> — natural appearance, moderate cost, good durability</li>
              <li><strong>Composite</strong> — low maintenance, mid-to-high cost, long lifespan</li>
              <li><strong>PVC / vinyl</strong> — moisture resistant, higher cost, no painting needed</li>
              <li><strong>Tropical hardwood</strong> — premium appearance, highest cost, very durable</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Cost Factors to Consider</h2>
            <ul>
              <li>Deck height and whether footings or posts are needed</li>
              <li>Railing, stairs and built-in features</li>
              <li>Permits and inspections in your area</li>
              <li>Site preparation and access</li>
            </ul>
            <p>Always obtain multiple contractor quotes before committing to a project.</p>
            <div className="related-links">
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/fence-calculator/">Fence Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
