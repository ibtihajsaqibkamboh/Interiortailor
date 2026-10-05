import PaverCalculator from '@/components/PaverCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Paver Calculator - How Many Pavers Do I Need?',
  description: 'Calculate how many pavers you need for a patio, driveway or path. Choose from common paver sizes or enter custom dimensions. Includes waste allowance.',
  path: '/paver-calculator/',
});

export default function PaverPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">PAVER CALCULATOR</span>
        <h1>Paver Calculator — How Many Pavers Do I Need?</h1>
        <p>
          Estimate how many pavers you need for a patio, walkway, driveway or other paved area.
          Select from common paver sizes or enter your own, set the joint gap and waste allowance
          to get an accurate count with sand and base material estimates.
        </p>
      </section>

      <PaverCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Paver Count Is Calculated</h2>
            <p>
              Each paver occupies its face area plus the joint gap on two adjacent sides. The
              total paver count is:
            </p>
            <p><span className="formula">Pavers = Total Area ÷ ((Paver L + Gap) × (Paver W + Gap))</span></p>
            <p>
              A waste allowance of 5–10% is standard for straight running-bond or stack patterns.
              Increase to 10–15% for diagonal (45°) layouts and 15–20% for herringbone and
              basket-weave patterns, which generate more edge cuts.
            </p>
          </article>

          <article className="seo-card">
            <h2>Paver Base &amp; Sand Requirements</h2>
            <p>A properly built paver installation requires a compacted base and a sand setting bed:</p>
            <ul>
              <li><strong>Gravel base:</strong> 4–6 in (10–15 cm) compacted crushed stone — provides drainage and structural support</li>
              <li><strong>Sand setting bed:</strong> 1 in (2.5 cm) of coarse concrete sand — levels the surface for laying</li>
              <li><strong>Joint sand:</strong> Polymeric sand swept into joints after installation — prevents weed growth and ant infiltration</li>
              <li><strong>Edge restraints:</strong> Aluminum or plastic edging spiked into the base to prevent lateral movement</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Paver Pattern Guide</h2>
            <ul>
              <li><strong>Running bond:</strong> Bricks offset by half, like a brick wall. Most common, easy to cut, 5–10% waste.</li>
              <li><strong>Stack bond:</strong> All joints aligned in a grid. Clean modern look, requires precision. 5% waste.</li>
              <li><strong>Herringbone (90°):</strong> Strongest pattern for driveways, resists shifting under traffic. 15–20% waste.</li>
              <li><strong>Herringbone (45°):</strong> Diagonal version creates interesting visual effect. Most cuts at edges. 15–25% waste.</li>
              <li><strong>Basket-weave:</strong> Pairs of bricks alternating direction. Decorative, medium waste.</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many pavers do I need per square foot?</summary>
              <p>A standard 4×8 inch paver covers 0.222 sq ft (32 sq in) plus joint gap. With a 1/8-inch joint, each paver covers about 0.239 sq ft — approximately 4.2 pavers per square foot. A 12×12 paver requires about 1 paver per square foot.</p>
            </details>
            <details>
              <summary>Do I need to seal pavers?</summary>
              <p>Sealing is optional but recommended. It enhances color, makes cleaning easier, prevents efflorescence (white salt deposits) and helps lock joint sand in place. Seal within the first year and re-seal every 3–5 years.</p>
            </details>
            <details>
              <summary>Can I install pavers over an existing concrete slab?</summary>
              <p>Yes, if the slab is in good condition without significant cracks or settlement. Set pavers directly in a thin mortar bed or use 1/2-inch plastic pedestal clips designed for overlay installations. The surface height will be raised by the paver and mortar thickness.</p>
            </details>
            <div className="related-links">
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/concrete-slab-calculator/">Concrete Slab Calculator</a>
              <a href="/tile-calculator/">Tile Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
