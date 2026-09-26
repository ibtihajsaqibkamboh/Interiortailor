import DeckStairCalculator from '@/components/DeckStairCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Deck Stair Calculator - Riser, Tread & Stringer Length',
  description: 'Calculate the number of risers, riser height, tread count, total run and stringer length for deck stairs. Checks against IRC 2021 code requirements automatically.',
  path: '/deck-stair-calculator/',
});

export default function DeckStairCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">DECK STAIR CALCULATOR</span>
        <h1>Deck Stair Calculator</h1>
        <p>
          Calculate the number of risers, individual riser height, number of treads, total
          horizontal run and diagonal stringer length for your deck stairs. Enter the total rise
          (deck height above ground), desired tread depth and stair width — the calculator checks
          your dimensions against IRC 2021 code requirements.
        </p>
      </section>

      <DeckStairCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Deck Stair Building Code Requirements (IRC 2021)</h2>
            <ul>
              <li><strong>Maximum riser height:</strong> 7¾ inches</li>
              <li><strong>Minimum tread depth:</strong> 10 inches</li>
              <li><strong>Minimum stair width:</strong> 36 inches</li>
              <li><strong>Handrail required:</strong> when 4 or more risers</li>
              <li><strong>Rise / run ratio:</strong> sum of riser + tread should be 17–18 in for comfort</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Stringer Length Formula</h2>
            <p>The stringer is the diagonal structural member supporting the treads. Its length is calculated with the Pythagorean theorem:</p>
            <p><span className="formula">Stringer = √(Total Rise² + Total Run²)</span></p>
            <p>For a 48&Prime; rise with 11&Prime; treads × 6 treads = 66&Prime; run: Stringer = √(48² + 66²) ≈ 81.6 in (6.8 ft). Buy 10–12 ft stringers for typical deck heights.</p>
            <div className="related-links">
              <a href="/stair-calculator/">Stair Calculator</a>
              <a href="/joist-span-calculator/">Joist Span Calculator</a>
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
