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
        <h1>Topsoil Calculator</h1>
        <p>
          Estimate how much topsoil you need for lawn preparation, raised beds, garden borders
          or landscaping. Enter the area and desired depth to get volume, weight and an estimated
          bag count.
        </p>
      </section>

      <TopsoilCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Much Topsoil Do I Need?</h2>
            <p>Volume is calculated as:</p>
            <p><span className="formula">Volume = Length × Width × Depth</span></p>
            <p>Typical depths by application:</p>
            <ul>
              <li><strong>Lawn topdressing:</strong> 2–4 cm (1–2 in)</li>
              <li><strong>New lawn establishment:</strong> 10–15 cm (4–6 in)</li>
              <li><strong>Raised beds / vegetable gardens:</strong> 20–30 cm (8–12 in)</li>
              <li><strong>Filling low spots:</strong> 5–10 cm (2–4 in)</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Bulk vs Bagged Topsoil</h2>
            <p>For projects over 1 m³ / 1.3 yd³, bulk delivery is usually more economical. Bagged topsoil is convenient for small areas and topdressing.</p>
            <p>Always check whether your supplier's "topsoil" is screened and whether it contains compost or amendments suited to your intended use.</p>
            <div className="related-links">
              <a href="/mulch-calculator/">Mulch Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/sod-calculator/">Sod Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
