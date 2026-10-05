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
        <h1>Concrete Block Calculator — How Many CMU Blocks Do I Need?</h1>
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
            <p>
              The standard calculation divides wall area by the face area of a single block
              including its mortar joint:
            </p>
            <p><span className="formula">Blocks = Wall Area ÷ Block Face Area (inc. mortar joint)</span></p>
            <p>
              A standard 16×8 in CMU with a 3/8-inch mortar joint covers approximately 0.89 sq ft
              per block, giving roughly 1.12 blocks per square foot. For most straight walls a 5%
              waste allowance is sufficient; increase to 10% for walls with many openings or cuts.
            </p>
            <p>
              Always measure openings such as doors and windows and subtract their area before
              calculating your block order.
            </p>
          </article>

          <article className="seo-card">
            <h2>CMU Block Sizes &amp; Applications</h2>
            <ul>
              <li><strong>Standard 8 in CMU (16×8×8 in):</strong> ~1.12 blocks/sq ft — general walls</li>
              <li><strong>Half block (8×8×8 in):</strong> corners, openings, course adjustment</li>
              <li><strong>4 in solid block (16×4×8 in):</strong> partition and veneer walls</li>
              <li><strong>6 in CMU (16×6×8 in):</strong> lighter retaining walls and partitions</li>
              <li><strong>Split-face block:</strong> decorative exterior walls</li>
            </ul>
            <p>
              Hollow CMU blocks are used for most structural applications and allow rebar and grout
              to be placed in the cores for reinforced masonry walls.
            </p>
          </article>

          <article className="seo-card">
            <h2>Mortar &amp; Grout Estimates for Block Walls</h2>
            <p>
              In addition to blocks, a CMU wall requires mortar for the bed and head joints and,
              if reinforced, grout for the cores.
            </p>
            <ul>
              <li>Approximately 1 bag of mortar mix per 3–4 standard CMU blocks</li>
              <li>Core fill grout: roughly 0.045 cu ft per block for 8×8×16 hollow CMU</li>
              <li>Rebar is typically placed vertically at 32–48 in on center in reinforced walls</li>
            </ul>
            <p>
              Use our <a href="/mortar-calculator/">Mortar Calculator</a> and{' '}
              <a href="/rebar-calculator/">Rebar Calculator</a> alongside this tool for a complete
              materials list.
            </p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many CMU blocks are in a standard pallet?</summary>
              <p>A standard pallet holds approximately 72–90 standard 8×8×16 blocks, though pallet quantities vary by supplier.</p>
            </details>
            <details>
              <summary>What is the weight of a standard CMU block?</summary>
              <p>A standard 8×8×16 hollow CMU weighs approximately 28–36 lbs depending on aggregate type. Lightweight CMU blocks use expanded shale and weigh around 22–28 lbs.</p>
            </details>
            <details>
              <summary>Do I need permits to build a block wall?</summary>
              <p>Most jurisdictions require permits for block walls over a certain height (typically 3–4 ft) or retaining walls. Check your local building department before starting.</p>
            </details>
            <div className="related-links">
              <a href="/brick-calculator/">Brick Calculator</a>
              <a href="/mortar-calculator/">Mortar Calculator</a>
              <a href="/rebar-calculator/">Rebar Calculator</a>
              <a href="/retaining-wall-calculator/">Retaining Wall Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
