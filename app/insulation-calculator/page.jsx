import InsulationCalculator from '@/components/InsulationCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Insulation Calculator - How Much Insulation Do I Need?',
  description: 'Calculate insulation quantity and estimated cost for walls, attics and floors. Covers batt, blown-in, rigid foam and spray foam with R-value guide.',
  path: '/insulation-calculator/',
});

export default function InsulationPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">INSULATION CALCULATOR</span>
        <h1>Insulation Calculator — How Much Insulation Do I Need?</h1>
        <p>
          Calculate how much insulation you need for walls, attics, floors or crawl spaces.
          Choose from batt, blown-in, rigid foam or spray foam insulation and get a material
          quantity, bag or bundle count and estimated cost based on your target R-value.
        </p>
      </section>

      <InsulationCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Understanding R-Values</h2>
            <p>
              R-value measures a material's resistance to heat flow — the higher the R-value, the
              better the insulating performance. The US Department of Energy recommends different
              R-values by climate zone and location in the building:
            </p>
            <ul>
              <li><strong>Zone 1–2 (hot/humid, south FL, HI):</strong> Attic R-30, Wall R-13</li>
              <li><strong>Zone 3–4 (mixed, mid-Atlantic):</strong> Attic R-38, Wall R-13–19</li>
              <li><strong>Zone 5–6 (cold, upper Midwest, New England):</strong> Attic R-49, Wall R-20</li>
              <li><strong>Zone 7–8 (very cold, AK, northern MN):</strong> Attic R-49–60, Wall R-21</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Insulation Type Comparison</h2>
            <ul>
              <li><strong>Fiberglass batt:</strong> R-3.1 per inch. Most common, fits standard stud bays, easy DIY installation. Available in faced and unfaced.</li>
              <li><strong>Blown-in cellulose:</strong> R-3.5 per inch. Made from recycled paper. Ideal for attics and for retrofitting existing walls via small holes.</li>
              <li><strong>Blown-in fiberglass:</strong> R-2.2 per inch. Settles less than cellulose. Good for attics.</li>
              <li><strong>Rigid foam (EPS, XPS):</strong> R-3.8–5 per inch. Continuous insulation over studs, excellent for basement walls and exterior applications.</li>
              <li><strong>Spray foam (open-cell):</strong> R-3.5–3.7 per inch. Also serves as air seal. Ideal for sealing irregular cavities.</li>
              <li><strong>Spray foam (closed-cell):</strong> R-6–7 per inch. Highest R-value per inch, moisture barrier, structurally strengthens walls. Most expensive.</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Where Insulation Matters Most</h2>
            <p>
              Heat moves through the path of least resistance. The areas that give the highest
              return on insulation investment are:
            </p>
            <ul>
              <li><strong>Attic floor:</strong> Up to 25% of heat loss in an under-insulated home — highest priority</li>
              <li><strong>Exterior walls:</strong> 15–20% of total heat loss</li>
              <li><strong>Basement and crawl space:</strong> 10–15% of heat loss — often overlooked</li>
              <li><strong>Windows and doors:</strong> Replace single-pane windows with double or triple-pane</li>
              <li><strong>Air sealing:</strong> Plugging air leaks with foam and caulk should be done before insulating for best results</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many bags of blown-in insulation do I need for a 1,000 sq ft attic?</summary>
              <p>For R-49 with fiberglass blown-in (requires about 22 inches depth at R-2.2 per inch): approximately 30–35 bags depending on the product. Most bags specify sq ft coverage at target R-values on the packaging.</p>
            </details>
            <details>
              <summary>Can I add new insulation on top of old?</summary>
              <p>Yes, in most cases. In attics, you can add unfaced batts perpendicular to existing batts or blow in additional cellulose or fiberglass. Do not use faced batts as the top layer — moisture can get trapped between the two vapor retarders.</p>
            </details>
            <details>
              <summary>What is the difference between vapor barrier and vapor retarder?</summary>
              <p>A vapor barrier (Class I, 0.1 perms or less) is a sheet plastic like 6-mil poly used in crawl spaces and some walls. A vapor retarder (Class II, 0.1–1.0 perm) like kraft-faced batt is used on the warm-in-winter side of walls in cold climates.</p>
            </details>
            <div className="related-links">
              <a href="/roofing-calculator/">Roofing Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/hvac-btu-calculator/">HVAC BTU Calculator</a>
              <a href="/ac-size-calculator/">AC Size Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
