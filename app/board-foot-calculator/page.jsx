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
        <h1>Board Foot Calculator</h1>
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
            <p>A board foot (BF) is a unit of lumber volume equal to a piece 1 inch thick, 12 inches wide and 12 inches long.</p>
            <p><span className="formula">Board Feet = (Thickness in × Width in × Length ft) ÷ 12</span></p>
            <p>For example, a 1×6×8 ft board = (1 × 6 × 8) ÷ 12 = 4 board feet.</p>
          </article>
          <article className="seo-card">
            <h2>Nominal vs. Actual Lumber Dimensions</h2>
            <p>Lumber is sold by nominal dimensions, but actual dressed sizes are smaller:</p>
            <ul>
              <li><strong>1×4 nominal:</strong> 3/4&Prime; × 3.5&Prime; actual</li>
              <li><strong>2×4 nominal:</strong> 1.5&Prime; × 3.5&Prime; actual</li>
              <li><strong>2×6 nominal:</strong> 1.5&Prime; × 5.5&Prime; actual</li>
              <li><strong>4×4 nominal:</strong> 3.5&Prime; × 3.5&Prime; actual</li>
            </ul>
            <p>Board foot pricing typically uses nominal dimensions. Use nominal dimensions in this calculator unless your supplier specifies otherwise.</p>
            <div className="related-links">
              <a href="/cubic-feet-calculator/">Cubic Feet Calculator</a>
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
              <a href="/joist-span-calculator/">Joist Span Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
