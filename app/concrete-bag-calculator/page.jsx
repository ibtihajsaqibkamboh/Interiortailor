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
        <h1>Concrete Bag Calculator</h1>
        <p>
          Already know your concrete volume? Enter it in cubic yards, cubic feet or cubic metres
          and see how many pre-mixed bags you need. Compares all common bag sizes — 40, 50, 60
          and 80 lb — so you can choose the most practical option.
        </p>
      </section>

      <ConcreteBagCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Bag Yields at a Glance</h2>
            <ul>
              <li><strong>40 lb bag</strong> — ~0.30 ft³ (~8.5 L) per bag</li>
              <li><strong>50 lb bag</strong> — ~0.375 ft³ (~10.6 L) per bag</li>
              <li><strong>60 lb bag</strong> — ~0.45 ft³ (~12.7 L) per bag</li>
              <li><strong>80 lb bag</strong> — ~0.60 ft³ (~17 L) per bag</li>
            </ul>
            <p>Yields are approximate. Always check the stated yield on the bag you purchase.</p>
          </article>
          <article className="seo-card">
            <h2>When to Use Bags vs Ready-Mix</h2>
            <p>Pre-mixed bags are practical for small jobs under about 1 yd³ (0.76 m³). For larger pours, ready-mix concrete delivered by truck is more economical and produces a more consistent mix.</p>
            <p>Using too many bags can also increase labour time significantly — factor this in when deciding which option to use.</p>
            <div className="related-links">
              <a href="/concrete-slab-calculator/">Concrete Slab Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
