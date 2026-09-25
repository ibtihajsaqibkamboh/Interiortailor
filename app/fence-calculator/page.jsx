import FenceCalculator from '@/components/FenceCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Fence Calculator - Estimate Fence Materials & Cost',
  description: 'Calculate fence posts, rails and estimated cost for wood, vinyl, chain-link and other fence types. Enter total fence length and post spacing.',
  path: '/fence-calculator/',
});

export default function FencePage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">FENCE CALCULATOR</span>
        <h1>Fence Calculator</h1>
        <p>
          Estimate the posts, rails, linear footage and total project cost for your fencing project.
          Choose from common fence types, enter the total fence length and post spacing to get a
          material and cost estimate.
        </p>
      </section>

      <FenceCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Fence Materials Are Calculated</h2>
            <p>Posts are spaced at regular intervals along the fence line. The number of posts is:</p>
            <p><span className="formula">Posts = (Length ÷ Spacing) + 1 + Gate Posts</span></p>
            <p>Rails typically run between posts — two rails per span is standard for most fence styles. Linear footage is the total fence length used to estimate panel or picket material.</p>
          </article>
          <article className="seo-card">
            <h2>Fence Type Guide</h2>
            <ul>
              <li><strong>Wood privacy</strong> — Most common, 6 ft height, needs periodic sealing</li>
              <li><strong>Vinyl</strong> — Low maintenance, good longevity, higher cost</li>
              <li><strong>Chain-link</strong> — Most economical, good for large areas</li>
              <li><strong>Aluminum</strong> — Decorative, rust-free, mid-range cost</li>
              <li><strong>Split-rail</strong> — Rustic look, low cost, open design</li>
            </ul>
            <div className="related-links">
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
