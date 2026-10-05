import BoardFootCalculator from '@/components/BoardFootCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Board Foot Calculator - Lumber Volume & Cost Estimator',
  description: 'Calculate board feet of lumber for any project. Enter thickness, width, length and quantity to get total board footage and optional cost estimate. Essential for woodworking and framing.',
  path: '/board-foot-calculator/',
});

export default function BoardFootCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">BOARD FOOT CALCULATOR</span>
        <h1>Board Foot Calculator — Lumber Volume &amp; Cost Estimator</h1>
        <p>
          Calculate the total board feet of lumber for woodworking, framing or any construction
          project. Enter the thickness, width and length of your boards, specify the quantity,
          and optionally add a price per board foot to get a material cost estimate.
        </p>
      </section>

      <BoardFootCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>What Is a Board Foot?</h2>
            <p>
              A board foot (BF or FBM) is the standard unit of lumber volume in North America. One
              board foot equals a piece of wood 1 inch thick, 12 inches wide and 12 inches long.
            </p>
            <p><span className="formula">Board Feet = (Thickness in × Width in × Length ft) ÷ 12</span></p>
            <p>
              For example, a 2×6 board that is 10 feet long contains:
              (2 × 6 × 10) ÷ 12 = 10 board feet. Board feet measure volume, not
              surface area, so thicker boards have more board feet for the same face area.
            </p>
          </article>

          <article className="seo-card">
            <h2>Nominal vs. Actual Lumber Dimensions</h2>
            <p>
              Lumber is sold by nominal dimensions but arrives at a smaller actual (dressed) size:
            </p>
            <ul>
              <li><strong>1×4 nominal:</strong> ¾ × 3½ in actual</li>
              <li><strong>1×6 nominal:</strong> ¾ × 5½ in actual</li>
              <li><strong>2×4 nominal:</strong> 1½ × 3½ in actual</li>
              <li><strong>2×6 nominal:</strong> 1½ × 5½ in actual</li>
              <li><strong>4×4 nominal:</strong> 3½ × 3½ in actual</li>
            </ul>
            <p>
              Board foot pricing is based on nominal dimensions. Enter the nominal size into this
              calculator unless your supplier specifies actual dimensions. Hardwood lumber at
              lumber yards is sometimes sold by actual thickness in quarter-inch increments (4/4 = 1 in, 6/4 = 1.5 in).
            </p>
          </article>

          <article className="seo-card">
            <h2>Board Foot Pricing &amp; Buying Tips</h2>
            <p>
              Lumber prices are quoted per board foot for hardwoods and per linear foot or per piece
              for dimensional framing lumber. Typical hardwood prices range from $3–$20+ per board
              foot depending on species, grade and availability.
            </p>
            <ul>
              <li>Always add 10–15% for waste, defects and cutting</li>
              <li>Buy from a single lot where possible to ensure consistent color and grain</li>
              <li>Air-dried lumber is cheaper; kiln-dried is more stable for interior work</li>
              <li>Check moisture content with a moisture meter before purchase for critical work</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many board feet are in a 2×4×8?</summary>
              <p>A 2×4 that is 8 feet long contains (2 × 4 × 8) ÷ 12 = 5.33 board feet. At $1 per board foot, this board costs about $5.33.</p>
            </details>
            <details>
              <summary>How do I calculate board feet for a deck?</summary>
              <p>Measure the total surface area of your deck, then divide by the width of your decking boards (in feet). Multiply by the board thickness in inches, divide by 12 to get board feet. Add 15% for waste and end cuts.</p>
            </details>
            <details>
              <summary>What species of wood gives the most board feet per dollar?</summary>
              <p>Pine, fir and spruce (framing lumber) offer the most board feet per dollar. Hardwoods like oak, maple and walnut cost significantly more but offer greater durability and appearance.</p>
            </details>
            <div className="related-links">
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
              <a href="/cubic-feet-calculator/">Cubic Feet Calculator</a>
              <a href="/joist-span-calculator/">Joist Span Calculator</a>
              <a href="/flooring-calculator/">Flooring Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
