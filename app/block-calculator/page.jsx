import BlockCalculator from '@/components/BlockCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Block Calculator - How Many Concrete Blocks Do I Need?',
  description: 'Calculate how many concrete masonry units (CMU) you need for a wall. Enter wall dimensions, choose block size and get an instant block count with mortar bag estimate.',
  path: '/block-calculator/',
});

export default function BlockCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">BLOCK CALCULATOR</span>
        <h1>Concrete Block Calculator</h1>
        <p>
          Estimate how many concrete masonry units (CMU) you need for a foundation wall, retaining
          wall, garden wall or any block masonry project. Choose the block size, enter your wall
          dimensions and the calculator returns a block count and approximate mortar requirement.
        </p>
      </section>

      <BlockCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Many Concrete Blocks Do I Need?</h2>
            <p>The standard calculation is:</p>
            <p><span className="formula">Blocks = Wall Area ÷ Block Face Area (inc. mortar joint)</span></p>
            <p>
              A standard 16×8 in CMU with a 3/8&Prime; mortar joint covers about 0.89 sq ft per block,
              giving roughly 1.12 blocks per sq ft. Add 5% waste for typical straight walls.
            </p>
          </article>
          <article className="seo-card">
            <h2>CMU Block Size Reference</h2>
            <ul>
              <li><strong>Standard 8 in CMU (16×8×8 in):</strong> ~1.1 blocks/sq ft</li>
              <li><strong>Half block (8×8×8 in):</strong> used at corners and openings</li>
              <li><strong>4 in solid block:</strong> partition and veneer walls</li>
              <li><strong>Split-face block:</strong> decorative exterior walls</li>
            </ul>
            <div className="related-links">
              <a href="/brick-calculator/">Brick Calculator</a>
              <a href="/mortar-calculator/">Mortar Calculator</a>
              <a href="/retaining-wall-calculator/">Retaining Wall Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
