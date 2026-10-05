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
        <h1>Deck Stair Calculator — Risers, Treads &amp; Stringer Length</h1>
        <p>
          Calculate the number of risers, individual riser height, number of treads, total
          horizontal run and stringer length for your deck stairs. Enter the total rise (deck
          height above ground), tread depth and stair width — the calculator checks your design
          against IRC 2021 code requirements automatically.
        </p>
      </section>

      <DeckStairCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Deck Stair Code Requirements (IRC 2021)</h2>
            <p>
              The International Residential Code (IRC) sets minimum requirements for residential
              deck stairs that most US jurisdictions adopt:
            </p>
            <ul>
              <li><strong>Maximum riser height:</strong> 7¾ inches</li>
              <li><strong>Minimum tread depth:</strong> 10 inches (measured from nosing to nosing)</li>
              <li><strong>Minimum stair width:</strong> 36 inches (clear of handrails)</li>
              <li><strong>Handrail required:</strong> when 4 or more risers</li>
              <li><strong>Handrail height:</strong> 34–38 inches above tread nosings</li>
              <li><strong>Riser/tread consistency:</strong> No single riser may differ from others by more than 3/8 inch</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Calculating Stringer Length</h2>
            <p>
              The stringer is the diagonal board that supports the treads and risers. Its length
              is calculated using the Pythagorean theorem:
            </p>
            <p><span className="formula">Stringer Length = √(Total Rise² + Total Run²)</span></p>
            <p>
              For a deck 48 inches (4 ft) above grade with 7 treads at 11 inches each (Total
              Run = 77 in): Stringer = √(48² + 77²) = √(2304 + 5929) = √8233 ≈ 90.7 inches
              (7.56 ft). Purchase 10 ft stringers to allow for cuts and a beveled top.
            </p>
          </article>

          <article className="seo-card">
            <h2>Comfortable Stair Proportions</h2>
            <p>
              Beyond code compliance, comfortable stairs follow an ergonomic formula:
            </p>
            <p><span className="formula">2 × Riser + Tread = 24–25 inches</span></p>
            <p>
              A 7-inch riser with an 11-inch tread: 2(7) + 11 = 25 ✓ — comfortable.
              A 7¾-inch riser with a 10-inch tread: 2(7.75) + 10 = 25.5 — slightly steep
              but still code-compliant. Aim for risers between 6.5 and 7.5 inches for the
              most comfortable climb.
            </p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many steps do I need for a deck that is 3 feet high?</summary>
              <p>A 36-inch rise divided by a 7-inch riser height = 5.14, rounded up to 6 risers (5 treads). Each riser would be 36 ÷ 6 = 6 inches — comfortable and well within code.</p>
            </details>
            <details>
              <summary>What size lumber do I need for deck stair stringers?</summary>
              <p>Deck stringers are typically cut from 2×12 dimensional lumber (1.5×11.25 in actual). The notched stringer must retain at least 3.5 inches of solid wood at every cut.</p>
            </details>
            <details>
              <summary>Do deck stairs need footings?</summary>
              <p>Yes. Most codes require footings at the base of deck stairs that extend below the frost line. A concrete pad or post footing prevents movement that could cause the stairs to pull away from the deck.</p>
            </details>
            <div className="related-links">
              <a href="/stair-calculator/">Stair Calculator</a>
              <a href="/joist-span-calculator/">Joist Span Calculator</a>
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
              <a href="/board-foot-calculator/">Board Foot Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
