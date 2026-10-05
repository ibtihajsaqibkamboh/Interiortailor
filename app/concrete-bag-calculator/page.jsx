import ConcreteBagCalculator from '@/components/ConcreteBagCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Concrete Bag Calculator - How Many Bags of Concrete Do I Need?',
  description: 'Calculate how many 40, 50, 60 or 80 lb concrete bags you need from a known volume. Enter cubic yards, cubic feet or cubic metres.',
  path: '/concrete-bag-calculator/',
});

export default function ConcreteBagPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">CONCRETE BAG CALCULATOR</span>
        <h1>Concrete Bag Calculator — How Many Bags Do I Need?</h1>
        <p>
          Already know your concrete volume? Enter it in cubic yards, cubic feet or cubic metres
          and see how many pre-mixed bags you need. Compares all common bag sizes — 40, 50, 60
          and 80 lb — so you can choose the most practical option for your project.
        </p>
      </section>

      <ConcreteBagCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Concrete Bag Yields at a Glance</h2>
            <ul>
              <li><strong>40 lb bag:</strong> ~0.30 ft³ (~8.5 L) — ideal for small repairs and posts</li>
              <li><strong>50 lb bag:</strong> ~0.375 ft³ (~10.6 L)</li>
              <li><strong>60 lb bag:</strong> ~0.45 ft³ (~12.7 L) — popular for medium jobs</li>
              <li><strong>80 lb bag:</strong> ~0.60 ft³ (~17 L) — most economical, fewest bags to mix</li>
            </ul>
            <p>
              Yields are approximate and vary slightly by brand. Always check the stated yield
              on the specific bag you purchase. One cubic yard requires approximately 45 bags of
              80 lb pre-mix or 60 bags of 60 lb.
            </p>
          </article>

          <article className="seo-card">
            <h2>When to Use Bags vs Ready-Mix Concrete</h2>
            <p>
              The break-even point is roughly 1 cubic yard (27 cubic feet). Below that, bags are
              convenient and flexible; above that, ready-mix is more economical and practical.
            </p>
            <ul>
              <li><strong>Use bags for:</strong> fence posts, small slabs under 40 sq ft, repairs, footings</li>
              <li><strong>Use ready-mix for:</strong> driveways, full-room slabs, foundations, pours over 1 yd³</li>
              <li>Mixing 45+ bags by hand takes 4–6 hours and results in inconsistent water ratios</li>
              <li>Ready-mix minimum load is usually 1 yard — some suppliers offer ½-yard "short loads" at a premium</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Tips for Mixing Concrete from Bags</h2>
            <ul>
              <li>Use a mechanical mixer for jobs over 10 bags — hand mixing is exhausting and inconsistent</li>
              <li>Add water gradually — too much water is the most common mistake and weakens concrete significantly</li>
              <li>Typical water: approximately 3 quarts (2.8 L) per 80 lb bag</li>
              <li>Mix until uniform with no dry pockets — about 3–5 minutes per batch in a mixer</li>
              <li>Do not mix more than you can place and finish in 30–45 minutes</li>
              <li>Work in shaded conditions in hot weather to extend working time</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many bags of concrete do I need for a 4×4 fence post?</summary>
              <p>A standard post hole (12 in diameter, 36 in deep) holds approximately 2.35 cu ft. That requires four 80 lb bags or five 60 lb bags. Most installers use two 80 lb bags per post as a quick estimate.</p>
            </details>
            <details>
              <summary>What is the difference between concrete mix and mortar mix?</summary>
              <p>Concrete mix contains Portland cement, sand and coarse aggregate (gravel). Mortar mix contains cement and sand only — no gravel. Concrete is used for structural pours; mortar is used for setting blocks, bricks and tiles.</p>
            </details>
            <details>
              <summary>Can I add too little water to concrete?</summary>
              <p>Yes. Too little water prevents complete hydration of the cement particles, resulting in crumbly, weak concrete. Follow the bag's water recommendation. Adding extra water to improve workability reduces strength — use a plasticizer additive instead if needed.</p>
            </details>
            <div className="related-links">
              <a href="/concrete-slab-calculator/">Concrete Slab Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
              <a href="/cubic-yard-calculator/">Cubic Yard Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
