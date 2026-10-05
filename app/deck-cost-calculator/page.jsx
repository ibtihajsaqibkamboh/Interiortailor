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
        <h1>Deck Cost Calculator — Materials &amp; Project Cost Estimator</h1>
        <p>
          Estimate the material and total project cost for your deck. Enter the deck dimensions,
          choose your decking material and adjust the labor percentage to match your local market
          and get a comprehensive cost breakdown.
        </p>
      </section>

      <DeckCostCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Decking Material Comparison</h2>
            <ul>
              <li><strong>Pressure-treated wood:</strong> Most economical ($2–$5/sq ft material). Requires staining and sealing every 2–3 years. Typical lifespan 15–20 years with maintenance.</li>
              <li><strong>Cedar:</strong> Natural rot resistance, attractive appearance ($4–$8/sq ft). Moderate maintenance. 20–25 year lifespan.</li>
              <li><strong>Composite (Trex, TimberTech):</strong> Low maintenance, no painting ($7–$15/sq ft). Stain and fade resistant. 25–30 year warranty on premium products.</li>
              <li><strong>PVC / vinyl:</strong> Fully synthetic, moisture-proof ($8–$16/sq ft). No maintenance beyond washing. Good in wet climates.</li>
              <li><strong>Tropical hardwood (Ipe, Tigerwood):</strong> Premium appearance and hardness ($15–$25/sq ft). Extremely durable (40+ years) with minimal maintenance.</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>What Affects Deck Cost</h2>
            <ul>
              <li><strong>Deck height:</strong> Ground-level decks are simpler and cheaper than elevated decks requiring posts, beams and ledger attachment</li>
              <li><strong>Railings:</strong> Add $25–$80 per linear foot depending on material (wood, composite, cable, glass)</li>
              <li><strong>Stairs:</strong> Each flight adds $300–$1,500 depending on height and materials</li>
              <li><strong>Footings:</strong> Concrete footings (required in most areas) add $100–$300 each</li>
              <li><strong>Permits and inspections:</strong> Typically $200–$800 depending on municipality</li>
              <li><strong>Site preparation:</strong> Clearing, grading and drainage can add significant cost</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Deck Building Code Basics</h2>
            <p>Most residential decks require a permit and inspection. Key requirements vary by jurisdiction but typically include:</p>
            <ul>
              <li>Ledger board properly flashed and attached to house framing (not just siding)</li>
              <li>Post footings below frost depth and sized for load</li>
              <li>Railing required when deck surface is 30 in or more above grade</li>
              <li>Railing height minimum 36 in (42 in for commercial)</li>
              <li>Baluster spacing: 4 in maximum opening (to prevent a 4-in sphere from passing through)</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How much does it cost to build a 12×16 deck?</summary>
              <p>A 12×16 ft (192 sq ft) deck in pressure-treated lumber typically costs $3,000–$6,000 for DIY materials or $6,000–$12,000 installed by a contractor. Composite decking adds 50–100% to material costs.</p>
            </details>
            <details>
              <summary>Does a deck add value to a home?</summary>
              <p>Yes. A well-built deck typically returns 60–80% of its cost at resale according to Remodeling Magazine's Cost vs. Value reports. Composite decks generally return more value than wood due to lower perceived maintenance.</p>
            </details>
            <details>
              <summary>How long does it take to build a deck?</summary>
              <p>A typical 12×16 ft deck takes a two-person crew 2–4 days to build. DIY builders should budget 1–2 weekends for the same size, depending on experience and access to tools.</p>
            </details>
            <div className="related-links">
              <a href="/deck-stair-calculator/">Deck Stair Calculator</a>
              <a href="/joist-span-calculator/">Joist Span Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/fence-calculator/">Fence Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
