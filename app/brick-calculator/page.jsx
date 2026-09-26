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
        <h1>Brick Calculator</h1>
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
            <p>The basic formula for a single-wythe (one brick thick) wall is:</p>
            <p><span className="formula">Bricks = Wall Area ÷ (Brick Face Area incl. mortar joint)</span></p>
            <p>
              A standard brick with a 3/8&Prime; mortar joint covers approximately 0.44 sq ft of face
              area. Adding a 10% waste allowance accounts for cuts and breakage.
            </p>
          </article>
          <article className="seo-card">
            <h2>Common Brick Sizes &amp; Coverage</h2>
            <ul>
              <li><strong>Standard / Modular:</strong> ~6.75 bricks per sq ft of wall</li>
              <li><strong>Queen:</strong> ~5.5 bricks per sq ft</li>
              <li><strong>King:</strong> ~4.8 bricks per sq ft</li>
              <li><strong>Engineer:</strong> ~5.9 bricks per sq ft</li>
            </ul>
            <p>Always order 10–15% extra to cover cuts, chipped edges and future repairs.</p>
            <div className="related-links">
              <a href="/block-calculator/">Block Calculator</a>
              <a href="/mortar-calculator/">Mortar Calculator</a>
              <a href="/cement-calculator/">Cement Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
