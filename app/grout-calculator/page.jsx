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
        <h1>Grout Calculator</h1>
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
            <h2>Sanded vs Unsanded Grout</h2>
            <ul>
              <li><strong>Unsanded grout</strong> — for joints up to 1/8 in (3 mm). Used on polished stone, glass and delicate surfaces to avoid scratching.</li>
              <li><strong>Sanded grout</strong> — for joints 1/8 in (3 mm) and wider. More durable, resists cracking in wider joints.</li>
              <li><strong>Epoxy grout</strong> — highly stain and chemical resistant, suitable for any joint width. More difficult to apply and more expensive.</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Grout Coverage Tips</h2>
            <p>Grout usage increases with:</p>
            <ul>
              <li>Smaller tile size (more joints per sq ft)</li>
              <li>Wider grout joints</li>
              <li>Thicker tiles</li>
            </ul>
            <p>Always add 10% waste to the calculated amount. Mix grout per the manufacturer's instructions and work in small sections to avoid premature hardening.</p>
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
