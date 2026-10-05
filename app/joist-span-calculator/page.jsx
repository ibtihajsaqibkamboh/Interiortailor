import JoistSpanCalculator from '@/components/JoistSpanCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Joist Span Calculator - Maximum Floor Joist Span Table',
  description: 'Calculate the maximum allowable span for floor joists by lumber size, spacing and live load. Based on IRC prescriptive span tables for Douglas Fir-Larch #2 lumber.',
  path: '/joist-span-calculator/',
});

export default function JoistSpanCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">JOIST SPAN CALCULATOR</span>
        <h1>Joist Span Calculator — Maximum Floor Joist Span by Lumber Size</h1>
        <p>
          Find the minimum joist size needed for your required span. Enter your span distance, joist
          spacing and live load, and the calculator returns the smallest lumber size (2×6 through
          2×14) that meets the span based on IRC prescriptive span tables.
        </p>
      </section>

      <JoistSpanCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Understanding Floor Joist Spans</h2>
            <p>
              A joist span is the unsupported horizontal distance a joist must bridge between
              bearing supports (beams, walls or foundations). The maximum allowable span depends on:
            </p>
            <ul>
              <li>Lumber species and grade — Douglas Fir-Larch #2 is the most common reference species</li>
              <li>Joist size (depth) — deeper joists span farther</li>
              <li>On-center spacing — closer spacing allows longer spans</li>
              <li>Live load — the expected weight of people and furniture on the floor</li>
              <li>Dead load — the weight of the floor structure itself</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Live Load Requirements by Application</h2>
            <ul>
              <li><strong>Sleeping rooms (bedrooms):</strong> 30 psf live load</li>
              <li><strong>Living areas, kitchens, dining rooms:</strong> 40 psf live load</li>
              <li><strong>Decks and exterior balconies:</strong> 40–60 psf live load</li>
              <li><strong>Stairs:</strong> 40 psf</li>
              <li><strong>Attic storage:</strong> 20 psf</li>
              <li><strong>Attic habitable space:</strong> 30 psf</li>
            </ul>
            <p>
              Always use the appropriate live load for the application. Using 40 psf for a bedroom
              is conservative and acceptable; 30 psf is the code minimum.
            </p>
          </article>

          <article className="seo-card">
            <h2>Joist Spacing Options &amp; Trade-offs</h2>
            <ul>
              <li><strong>12 in o.c.:</strong> Stiffest floor feel, least deflection, ideal under tile or stone. Requires more lumber.</li>
              <li><strong>16 in o.c.:</strong> Standard residential spacing, good balance of stiffness and material cost. Compatible with most subfloor panels.</li>
              <li><strong>24 in o.c.:</strong> Used with engineered lumber (I-joists, LVL). Reduces material cost but requires thicker subfloor (¾ in minimum).</li>
            </ul>
            <p>
              For ceramic tile or natural stone flooring, 12-inch spacing or engineered I-joists
              are recommended to minimize deflection and prevent grout cracking.
            </p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How far can a 2×10 joist span?</summary>
              <p>A 2×10 Douglas Fir-Larch #2 joist at 16 inches on center can span approximately 16.9 feet for a 40 psf live load. At 12 inches on center, it can span up to 18.6 feet.</p>
            </details>
            <details>
              <summary>Do I need an engineer for floor joist design?</summary>
              <p>For simple, code-compliant spans using dimensional lumber within the prescriptive tables, an engineer is not required. For unusually long spans, heavy loads, notched joists or engineered lumber, consult a structural engineer.</p>
            </details>
            <details>
              <summary>Can I use engineered lumber to span farther?</summary>
              <p>Yes. LVL beams, I-joists and PSL can span significantly farther than dimensional lumber for the same depth. Consult the manufacturer's span tables, which are specific to each product.</p>
            </details>
            <div className="related-links">
              <a href="/deck-stair-calculator/">Deck Stair Calculator</a>
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
              <a href="/board-foot-calculator/">Board Foot Calculator</a>
              <a href="/stair-calculator/">Stair Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
