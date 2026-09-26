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
        <h1>Joist Span Calculator</h1>
        <p>
          Find the minimum joist size needed for your required span. Enter your span distance, joist
          spacing (12, 16 or 24 inches on center) and live load, and the calculator returns the
          smallest lumber size (2×6 through 2×14) that meets the span based on IRC prescriptive
          span tables.
        </p>
      </section>

      <JoistSpanCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Understanding Floor Joist Spans</h2>
            <p>
              A joist span is the unsupported horizontal distance between bearing points (beams,
              walls). Larger lumber spans farther; closer spacing also increases allowable span.
            </p>
            <ul>
              <li><strong>Residential floor (living area):</strong> 40 psf live load + 10 psf dead load</li>
              <li><strong>Bedroom / sleeping area:</strong> 30 psf live load</li>
              <li><strong>Deck:</strong> 40–60 psf live load depending on code</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Common Joist Spacing &amp; Rules of Thumb</h2>
            <ul>
              <li><strong>16&Prime; o.c.:</strong> Standard for most residential floor systems</li>
              <li><strong>12&Prime; o.c.:</strong> Stiffer floor feel; often used under tile</li>
              <li><strong>24&Prime; o.c.:</strong> Engineered lumber or I-joists; less material cost</li>
            </ul>
            <p>For engineered lumber (LVL, I-joists, PSL), consult the manufacturer span tables, as they differ significantly from dimensional lumber.</p>
            <div className="related-links">
              <a href="/deck-stair-calculator/">Deck Stair Calculator</a>
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
              <a href="/board-foot-calculator/">Board Foot Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
