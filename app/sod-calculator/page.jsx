import SodCalculator from '@/components/SodCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Sod Calculator - How Much Sod Do I Need?',
  description: 'Calculate how much sod you need in rolls or square feet for a new lawn or patch repair. Includes pallet estimate and material cost.',
  path: '/sod-calculator/',
});

export default function SodPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">SOD CALCULATOR</span>
        <h1>Sod Calculator — How Much Sod Do I Need?</h1>
        <p>
          Calculate how many sod rolls or slabs you need for a new lawn, repair or landscaping
          project. Enter the area dimensions and a waste allowance to get roll count, pallet
          estimate and an indicative material cost.
        </p>
      </section>

      <SodCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Much Sod Do I Need?</h2>
            <p>
              Sod is sold by the square foot, square yard or pallet. A standard sod roll covers
              approximately 9 sq ft (0.84 m²). Most pallets hold 450–504 sq ft depending on the
              supplier. The formula is:
            </p>
            <p><span className="formula">Rolls = (Area × Waste Factor) ÷ Coverage per Roll</span></p>
            <p>
              Always add 5–10% waste for cuts around edges, curves and obstacles. Add an extra
              5% for slopes, where sod is more difficult to lay without gaps.
            </p>
          </article>

          <article className="seo-card">
            <h2>Sod Installation Step-by-Step</h2>
            <ol>
              <li>Remove existing grass and weeds — rent a sod cutter for large areas</li>
              <li>Till 4–6 inches of soil and incorporate topsoil or compost</li>
              <li>Level the area and ensure it slopes away from structures (1–2% grade)</li>
              <li>Lay sod in a brick-pattern stagger, starting along a straight edge</li>
              <li>Butt edges tightly — no gaps or overlaps</li>
              <li>Roll the sod with a lawn roller to ensure good soil contact</li>
              <li>Water immediately and daily for 2–3 weeks until roots establish</li>
              <li>Wait 2–3 weeks before mowing — check rooting by gently tugging</li>
            </ol>
          </article>

          <article className="seo-card">
            <h2>Sod vs Seeding: Which Is Right for You?</h2>
            <ul>
              <li><strong>Sod advantages:</strong> Instant results, usable in 3–4 weeks, works on slopes where seed washes away, less weeding during establishment</li>
              <li><strong>Sod disadvantages:</strong> 5–10× the cost of seed, narrow species selection, heavy to install, perishable — must be laid within 24–48 hours of delivery</li>
              <li><strong>Seeding advantages:</strong> Much lower cost, wider grass species options, better long-term root depth</li>
              <li><strong>Seeding disadvantages:</strong> 6–8 weeks to establish, needs careful watering, bare soil prone to erosion and weed invasion during germination</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many pallets of sod do I need for 1,000 sq ft?</summary>
              <p>At 450 sq ft per pallet with 10% waste, 1,000 sq ft requires approximately 2.4 pallets — order 3 pallets to have enough coverage and allow for cuts.</p>
            </details>
            <details>
              <summary>What is the best time of year to lay sod?</summary>
              <p>Cool-season grasses (fescue, bluegrass) are best laid in early fall or spring. Warm-season grasses (Bermuda, zoysia, St. Augustine) establish best in late spring through early summer when soil temperatures exceed 65°F.</p>
            </details>
            <details>
              <summary>How long before I can walk on new sod?</summary>
              <p>Limit foot traffic for the first 2–3 weeks. Once you cannot easily pull up a corner of sod (roots are anchoring it), light foot traffic is acceptable. Full use typically takes 4–6 weeks.</p>
            </details>
            <div className="related-links">
              <a href="/topsoil-calculator/">Topsoil Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/mulch-calculator/">Mulch Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
