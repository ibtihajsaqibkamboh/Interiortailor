import TopsoilCalculator from '@/components/TopsoilCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Topsoil Calculator - How Much Topsoil Do I Need?',
  description: 'Calculate how much topsoil you need by area and depth. Get volume in cubic yards or cubic metres, estimated weight and bag count.',
  path: '/topsoil-calculator/',
});

export default function TopsoilPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">TOPSOIL CALCULATOR</span>
        <h1>Topsoil Calculator — How Much Topsoil Do I Need?</h1>
        <p>
          Estimate how much topsoil you need for lawn preparation, raised beds, garden borders
          or landscaping. Enter the area and desired depth to get volume, weight and an estimated
          bag count for both bagged and bulk delivery options.
        </p>
      </section>

      <TopsoilCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Much Topsoil Do I Need?</h2>
            <p>Volume is calculated by multiplying area by the required depth:</p>
            <p><span className="formula">Volume = Length × Width × Depth</span></p>
            <p>
              One cubic yard of topsoil covers approximately 100 sq ft at 3 inches deep or
              81 sq ft at 4 inches deep. Topsoil weighs approximately 2,000 lb (900 kg) per
              cubic yard. Always add 10–15% for settling — topsoil compacts once watered in.
            </p>
          </article>

          <article className="seo-card">
            <h2>Topsoil Depth by Application</h2>
            <ul>
              <li><strong>Lawn topdressing:</strong> 2–4 cm (1–2 in) — just enough to level and improve drainage</li>
              <li><strong>New lawn establishment:</strong> 10–15 cm (4–6 in) — minimum depth for healthy root establishment</li>
              <li><strong>Raised vegetable beds:</strong> 20–30 cm (8–12 in) — deeper promotes better yields</li>
              <li><strong>Filling low spots:</strong> 5–10 cm (2–4 in)</li>
              <li><strong>Landscaping borders:</strong> 15–20 cm (6–8 in)</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Bulk vs Bagged Topsoil</h2>
            <p>
              For projects over 1 m³ / 1.3 yd³, bulk topsoil delivered by truck is much more
              economical. Bagged topsoil (typically 0.75–1 cu ft per bag) is convenient for small
              areas, topdressing and raised beds.
            </p>
            <ul>
              <li><strong>Screened topsoil:</strong> Fine-sieved to remove stones and debris. Best for lawns.</li>
              <li><strong>Triple mix:</strong> Topsoil + compost + peat moss. Premium blend for gardens and raised beds.</li>
              <li><strong>Garden mix:</strong> Topsoil blended with compost. Good general-purpose growing medium.</li>
            </ul>
            <p>Always confirm your supplier's topsoil composition before ordering — quality varies widely.</p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many cubic yards of topsoil do I need for a new lawn?</summary>
              <p>For a 1,000 sq ft lawn at 4 inches of topsoil: (1000 × 0.333) ÷ 27 = 12.3 cubic yards. Add 15% for settling and buy at least 14 yards.</p>
            </details>
            <details>
              <summary>Can I use topsoil to fill raised beds?</summary>
              <p>Yes, but straight topsoil can become compacted in raised beds. A 60/30/10 blend of topsoil, compost and perlite or coarse sand produces better drainage and root development.</p>
            </details>
            <details>
              <summary>Is topsoil the same as garden soil?</summary>
              <p>No. Topsoil is the natural upper layer of soil, which varies widely in quality. Bagged "garden soil" is typically a blend enriched with compost and other amendments — suitable for in-ground planting but too dense for raised beds without mixing.</p>
            </details>
            <div className="related-links">
              <a href="/mulch-calculator/">Mulch Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/sod-calculator/">Sod Calculator</a>
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
