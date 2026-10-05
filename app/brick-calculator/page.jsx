import BrickCalculator from '@/components/BrickCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Brick Calculator - How Many Bricks Do I Need?',
  description: 'Calculate how many bricks you need for a wall, patio or project. Choose brick size, enter wall dimensions and set a waste allowance for an accurate brick count estimate.',
  path: '/brick-calculator/',
});

export default function BrickCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">BRICK CALCULATOR</span>
        <h1>Brick Calculator — How Many Bricks Do I Need?</h1>
        <p>
          Estimate how many bricks you need for a single-wythe wall, garden wall, patio or any brick
          masonry project. Select your brick type, enter the wall length and height, and add a waste
          allowance to get a reliable brick count before you order.
        </p>
      </section>

      <BrickCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How to Calculate Bricks for a Wall</h2>
            <p>
              The number of bricks needed depends on the wall area and the face size of each brick
              including its mortar joint. The basic formula for a single-wythe (one brick thick) wall is:
            </p>
            <p><span className="formula">Bricks = Wall Area ÷ (Brick Face Area incl. mortar joint)</span></p>
            <p>
              A standard modular brick measures 7⅝ × 2¼ inches face, and with a standard 3/8-inch
              mortar joint it covers approximately 0.148 sq ft. That works out to roughly 6.75 bricks
              per square foot of single-wythe wall.
            </p>
            <p>
              Always add a waste allowance of at least 10% to cover cuts at corners, window and door
              openings, and any breakage during handling. For complex patterns like herringbone or
              diagonal layouts, increase the waste allowance to 15–20%.
            </p>
          </article>

          <article className="seo-card">
            <h2>Common Brick Sizes &amp; Coverage Rates</h2>
            <ul>
              <li><strong>Standard / Modular (7⅝×2¼ in):</strong> ~6.75 bricks per sq ft</li>
              <li><strong>Queen (9⅝×2¾ in):</strong> ~5.5 bricks per sq ft</li>
              <li><strong>King (9⅝×2¾ in):</strong> ~4.8 bricks per sq ft</li>
              <li><strong>Engineer (7⅝×2¾ in):</strong> ~5.9 bricks per sq ft</li>
            </ul>
            <p>
              Brick sizes vary by manufacturer and region. Always confirm the actual face dimensions
              with your supplier before placing a large order.
            </p>
          </article>

          <article className="seo-card">
            <h2>Mortar and Material Estimating Tips</h2>
            <p>
              Bricks alone are not enough — you also need to estimate mortar, ties and any
              reinforcement. A rough guide for mortar:
            </p>
            <ul>
              <li>Standard bricklaying uses approximately 0.0035 cubic feet of mortar per brick</li>
              <li>One 80 lb bag of mortar mix yields about 0.5 cubic feet of mixed mortar</li>
              <li>A 1,000-brick job requires roughly 7 bags of mortar</li>
            </ul>
            <p>
              For double-wythe or cavity walls, multiply the single-wythe brick count by the number
              of wythes. Deduct the area of all doors and windows before calculating.
            </p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many bricks do I need per square foot?</summary>
              <p>A standard modular brick requires approximately 6.75 bricks per square foot of wall face. Queen-size bricks cover more area at around 5.5 per square foot.</p>
            </details>
            <details>
              <summary>Should I include a waste allowance?</summary>
              <p>Yes. A 10% waste allowance is standard for straight walls. Increase to 15–20% for diagonal cuts, arches or complex patterns.</p>
            </details>
            <details>
              <summary>How do I calculate bricks for a curved wall?</summary>
              <p>Measure the arc length of the wall face and multiply by the height to get the area, then apply the same bricks-per-square-foot formula.</p>
            </details>
            <div className="related-links">
              <a href="/block-calculator/">Block Calculator</a>
              <a href="/mortar-calculator/">Mortar Calculator</a>
              <a href="/cement-calculator/">Cement Calculator</a>
              <a href="/retaining-wall-calculator/">Retaining Wall Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
