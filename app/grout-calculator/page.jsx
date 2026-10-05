import GroutCalculator from '@/components/GroutCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Grout Calculator - How Much Grout Do I Need?',
  description: 'Calculate grout needed for any tile job by area, tile size, tile thickness and joint width. Supports sanded, unsanded and epoxy grout.',
  path: '/grout-calculator/',
});

export default function GroutPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">GROUT CALCULATOR</span>
        <h1>Grout Calculator — How Much Grout Do I Need?</h1>
        <p>
          Calculate how much grout you need for a tiling project. Enter the tiled area, tile
          dimensions, thickness and grout joint width to get an accurate estimate in pounds with
          bag count for 10 lb and 25 lb bags.
        </p>
      </section>

      <GroutCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Grout Quantity Is Calculated</h2>
            <p>
              Grout fills all the joints between tiles. The volume of grout required depends on
              the total joint length, joint width and tile thickness. The industry formula is:
            </p>
            <p><span className="formula">Grout (lbs) = (L + W) ÷ (L × W) × D × J × 1.5 × (1/CF)</span></p>
            <p>
              Where L and W are tile dimensions, D is tile thickness, J is joint width and CF is
              the compacted factor (typically 0.07 for standard grout). In practice, plan on
              roughly 1 lb of grout per 10–15 sq ft for average-size tiles with standard joints,
              and always buy 10% extra.
            </p>
          </article>

          <article className="seo-card">
            <h2>Sanded vs Unsanded vs Epoxy Grout</h2>
            <ul>
              <li><strong>Unsanded grout:</strong> For joints up to 1/8 in (3 mm). Required for glass, polished stone and marble to prevent scratching. Smooth finish.</li>
              <li><strong>Sanded grout:</strong> For joints 1/8 in (3 mm) and wider. Sand prevents shrinkage cracking. More durable and economical.</li>
              <li><strong>Epoxy grout:</strong> Two-part formula (resin + hardener). Highly stain, chemical and moisture resistant. Suitable for any joint width but more difficult to apply and more expensive. Best for countertops and commercial kitchens.</li>
              <li><strong>Furan grout:</strong> Industrial use only — chemical plants and laboratories.</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Grouting Tips for a Professional Finish</h2>
            <ul>
              <li>Wait at least 24 hours after setting tile before grouting — longer in humid conditions</li>
              <li>Remove all tile spacers before grouting</li>
              <li>Mix grout to a peanut butter consistency — slightly stiffer for wall tile, slightly looser for floors</li>
              <li>Work in small sections (4–6 sq ft) and pack joints diagonally across the tile surface</li>
              <li>Wash the haze with a damp sponge within 20–30 minutes — don't let it fully cure on the face</li>
              <li>Seal grout joints after 72 hours with a penetrating silicone sealer for stain resistance</li>
              <li>Use caulk, not grout, at inside corners and where tile meets another surface</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How long does grout take to dry?</summary>
              <p>Grout is typically firm enough to clean haze after 20–30 minutes and reaches initial set in 24 hours. Full cure takes 72 hours before sealing and 28 days for maximum strength. Avoid heavy water exposure for the first 72 hours.</p>
            </details>
            <details>
              <summary>Can I grout over old grout?</summary>
              <p>Not reliably. Old grout should be removed to at least 2/3 of the joint depth with a grout saw or oscillating tool before re-grouting, to ensure adhesion and prevent the old layer from breaking away.</p>
            </details>
            <details>
              <summary>Why is my grout cracking?</summary>
              <p>Common causes: adding too much water to the mix, insufficient curing time, substrate movement (inadequate sub-floor stiffness), or grouting in joints that should be caulked (inside corners, expansion joints).</p>
            </details>
            <div className="related-links">
              <a href="/tile-calculator/">Tile Calculator</a>
              <a href="/flooring-calculator/">Flooring Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
