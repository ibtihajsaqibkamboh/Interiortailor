import FenceCalculator from '@/components/FenceCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Fence Calculator - Estimate Fence Posts, Rails & Cost',
  description: 'Calculate fence posts, rails and estimated cost for wood, vinyl, chain-link and other fence types. Enter total fence length and post spacing.',
  path: '/fence-calculator/',
});

export default function FencePage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">FENCE CALCULATOR</span>
        <h1>Fence Calculator — Posts, Rails &amp; Material Cost Estimator</h1>
        <p>
          Estimate the posts, rails, panels, linear footage and total project cost for your
          fencing project. Choose from common fence types, enter the total fence length and post
          spacing to get a complete material and cost estimate.
        </p>
      </section>

      <FenceCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Fence Materials Are Calculated</h2>
            <p>Posts are spaced at regular intervals along the fence line. The number of posts is:</p>
            <p><span className="formula">Posts = (Fence Length ÷ Post Spacing) + 1 + Gate Posts</span></p>
            <p>
              Rails run horizontally between posts — two rails per span is standard for most
              styles, three rails for fences over 6 ft. Linear footage equals the total fence
              length and is used to estimate panel, picket or mesh quantities.
            </p>
          </article>

          <article className="seo-card">
            <h2>Fence Type Guide</h2>
            <ul>
              <li><strong>Wood privacy (6 ft):</strong> Most popular residential fence. Cedar or pressure-treated pine. Needs staining or sealing every 2–3 years. $15–$30/linear ft installed.</li>
              <li><strong>Vinyl / PVC:</strong> No painting or staining, excellent longevity (30+ years), higher upfront cost. $25–$40/linear ft installed.</li>
              <li><strong>Chain-link:</strong> Most economical for large areas. Galvanized or vinyl-coated. $10–$20/linear ft installed.</li>
              <li><strong>Aluminum:</strong> Decorative, rust-free, low maintenance. $25–$35/linear ft installed.</li>
              <li><strong>Split-rail:</strong> Rustic, open design, economical. Good for defining boundaries without enclosing. $10–$20/linear ft installed.</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Fence Post Sizing &amp; Depth Guide</h2>
            <p>Post depth and size depends on fence height and type:</p>
            <ul>
              <li><strong>4 ft fence:</strong> 4×4 posts, set 2 ft deep (below frost line in cold climates)</li>
              <li><strong>6 ft fence:</strong> 4×4 or 4×6 posts, set 2.5–3 ft deep</li>
              <li><strong>8 ft fence:</strong> 4×6 or 6×6 posts, set 3+ ft deep</li>
            </ul>
            <p>
              General rule: set posts 1/3 to 1/2 of total post length in the ground.
              Use concrete (2–4 bags per post hole) for permanent installations. Gravel-set posts
              allow drainage but are less stable.
            </p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many fence posts do I need for 100 feet of fence?</summary>
              <p>With 8-foot spacing: (100 ÷ 8) + 1 = 13.5, rounded to 14 posts. Add 2 posts per gate opening. With 6-foot spacing you need 18 posts.</p>
            </details>
            <details>
              <summary>Do I need a permit to build a fence?</summary>
              <p>Most municipalities require permits for fences over 6 ft, fences in front yards, and fences near property lines. Always check setback requirements with your local planning department before digging posts.</p>
            </details>
            <details>
              <summary>What is the best wood for a fence?</summary>
              <p>Western red cedar and redwood are naturally rot-resistant and are the premium choices for wood fencing. Pressure-treated pine (ground-contact rated) is less expensive and highly durable. Untreated pine should not be used in ground contact.</p>
            </details>
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
