import PaverCalculator from '@/components/PaverCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Paver Calculator - How Many Pavers Do I Need?',
  description: 'Calculate how many pavers you need for a patio, driveway or path. Choose from common paver sizes or enter custom dimensions. Includes waste allowance.',
  path: '/paver-calculator/',
});

export default function PaverPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">PAVER CALCULATOR</span>
        <h1>Paver Calculator</h1>
        <p>
          Estimate how many pavers you need for a patio, walkway, driveway or other paved area.
          Select from common paver sizes or enter your own, set the joint gap and waste allowance
          to get an accurate count.
        </p>
      </section>

      <PaverCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Paver Count Is Calculated</h2>
            <p>Each paver covers an area equal to its face dimensions plus the joint gap on two sides. The number of pavers is:</p>
            <p><span className="formula">Pavers = Total Area ÷ (Paver Area + Joint Gap)</span></p>
            <p>A waste allowance of 5–10% is recommended for straight patterns. Add 10–15% for diagonal or herringbone layouts where more cuts are needed.</p>
          </article>
          <article className="seo-card">
            <h2>Paver Installation Tips</h2>
            <ul>
              <li>Prepare a compacted gravel base (typically 4–6 in / 10–15 cm)</li>
              <li>Add a 1 in (2.5 cm) sand setting bed on top of the base</li>
              <li>Use edge restraints to prevent lateral movement</li>
              <li>Fill joints with polymeric sand and compact after installation</li>
            </ul>
            <div className="related-links">
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
              <a href="/gravel-calculator/">Gravel Calculator</a>
              <a href="/concrete-slab-calculator/">Concrete Slab Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
