import ConcreteSlabCalculator from '@/components/ConcreteSlabCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Concrete Slab Calculator - How Much Concrete for a Slab?',
  description: 'Calculate concrete volume for a slab in cubic yards or cubic metres. Enter length, width and thickness with preset common slab thicknesses.',
  path: '/concrete-slab-calculator/',
});

export default function ConcreteSlabPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">CONCRETE SLAB CALCULATOR</span>
        <h1>Concrete Slab Calculator</h1>
        <p>
          Calculate the volume of concrete needed for a slab, patio, driveway or floor.
          Enter the length, width and thickness to get the volume in cubic yards or cubic metres,
          plus an equivalent bag count if you plan to mix on-site.
        </p>
      </section>

      <ConcreteSlabCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Concrete Slab Volume Formula</h2>
            <p><span className="formula">Volume (ft³) = Length × Width × Thickness</span></p>
            <p><span className="formula">Volume (yd³) = Volume (ft³) ÷ 27</span></p>
            <p>Add 5–10% waste for uneven sub-grades, spillage and minor form variations. For large pours over 1 yd³, ready-mix truck delivery is typically more cost-effective than bag mixing.</p>
          </article>
          <article className="seo-card">
            <h2>Standard Slab Thicknesses</h2>
            <ul>
              <li><strong>3.5–4 in (90–100 mm)</strong> — Residential floor slabs and patios</li>
              <li><strong>4–5 in (100–125 mm)</strong> — Driveways and garage floors</li>
              <li><strong>6 in (150 mm)</strong> — Heavy equipment pads and commercial use</li>
              <li><strong>8 in (200 mm)</strong> — Foundation walls and structural slabs</li>
            </ul>
            <div className="related-links">
              <a href="/concrete-bag-calculator/">Concrete Bag Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/gravel-calculator/">Gravel Base Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
