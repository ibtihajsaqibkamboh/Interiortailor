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
        <h1>Sod Calculator</h1>
        <p>
          Calculate how many sod rolls or slabs you need for a new lawn, repair or landscaping
          project. Enter the area dimensions and a waste allowance to get roll count, pallet
          estimate and an indicative cost.
        </p>
      </section>

      <SodCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Sod Installation Tips</h2>
            <ul>
              <li>Prepare soil by tilling 4–6 in (10–15 cm) deep and incorporating topsoil or compost</li>
              <li>Lay sod in a brick-like staggered pattern for best root establishment</li>
              <li>Avoid placing seams on slopes or high-traffic areas</li>
              <li>Water immediately after laying and daily for the first 2 weeks</li>
              <li>Avoid mowing until sod is rooted — typically 2–3 weeks after installation</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Sod vs Seeding</h2>
            <p>Sod provides an instant lawn but costs more than seeding. Seeding is less expensive but takes 4–8 weeks to establish and requires careful watering.</p>
            <p>Sod is best for erosion-prone areas, sloped sites and where an immediately usable lawn is needed.</p>
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
