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
        <h1>Concrete Slab Calculator — Volume for Any Slab or Patio</h1>
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
            <p>
              Add 5–10% waste allowance for uneven sub-grades, spillage and minor form variations.
              For large pours over 1 yd³, ready-mix truck delivery is typically more cost-effective
              than bag mixing and produces a more consistent result.
            </p>
          </article>

          <article className="seo-card">
            <h2>Standard Slab Thicknesses by Use</h2>
            <ul>
              <li><strong>3.5–4 in (90–100 mm):</strong> Residential floor slabs, patios, sidewalks</li>
              <li><strong>4–5 in (100–125 mm):</strong> Driveways and garage floors — handle vehicle loads</li>
              <li><strong>5–6 in (125–150 mm):</strong> Heavy equipment pads, commercial floors</li>
              <li><strong>8 in (200 mm):</strong> Foundation walls and load-bearing structural slabs</li>
            </ul>
            <p>
              Residential driveways should be at least 4 inches thick and reinforced with rebar or
              wire mesh to resist cracking under vehicle weight and frost heave.
            </p>
          </article>

          <article className="seo-card">
            <h2>Sub-Base Preparation</h2>
            <p>
              A properly prepared sub-base is as important as the concrete itself. Poor sub-base
              preparation is the leading cause of slab cracking and settlement:
            </p>
            <ul>
              <li>Remove all organic material (topsoil, roots, vegetation) — minimum 6 inches</li>
              <li>Compact sub-grade soil to at least 95% Proctor density</li>
              <li>Add 4–6 inches of compacted crushed stone base (gravel)</li>
              <li>Install a 6-mil polyethylene vapor barrier for interior slabs</li>
              <li>Place rebar chairs to hold reinforcement at the correct height (mid-slab)</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How much concrete does a 20×20 ft slab at 4 inches require?</summary>
              <p>20 × 20 × 0.333 = 133.2 cu ft ÷ 27 = 4.93 cubic yards. Order 5.5 yards with a 10% waste allowance. That is approximately 247 bags of 80 lb pre-mix if mixing by hand.</p>
            </details>
            <details>
              <summary>When should I use control joints in a slab?</summary>
              <p>Control joints should be cut into the slab within 4–12 hours of pouring, at intervals no more than 2–3 times the slab thickness in feet (e.g., every 8–12 ft for a 4-inch slab). They guide cracking to controlled locations.</p>
            </details>
            <details>
              <summary>How long before I can drive on a new concrete slab?</summary>
              <p>Passenger vehicles can typically use a residential driveway slab after 7 days. Heavy vehicles and loaded trucks should wait 28 days for full design strength.</p>
            </details>
            <div className="related-links">
              <a href="/concrete-bag-calculator/">Concrete Bag Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/rebar-calculator/">Rebar Calculator</a>
              <a href="/gravel-calculator/">Gravel Sub-Base Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
