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
        <h1>Insulation Calculator</h1>
        <p>
          Calculate how much insulation you need for walls, attics, floors or crawl spaces.
          Choose from batt, blown-in, rigid foam or spray foam insulation and get a material
          quantity, bag or bundle count and estimated cost.
        </p>
      </section>

      <InsulationCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Understanding R-Values</h2>
            <p>R-value measures thermal resistance — higher R-values mean better insulation. The DOE recommends different R-values by climate zone and application:</p>
            <ul>
              <li><strong>Zone 1–2 (hot):</strong> Wall R-13, Attic R-30</li>
              <li><strong>Zone 3–4 (mixed):</strong> Wall R-13–19, Attic R-38</li>
              <li><strong>Zone 5–6 (cold):</strong> Wall R-20, Attic R-49</li>
              <li><strong>Zone 7–8 (very cold):</strong> Wall R-21, Attic R-49–60</li>
            </ul>
          </article>
          <article className="seo-card">
            <h2>Insulation Type Comparison</h2>
            <ul>
              <li><strong>Fiberglass batt</strong> — most common, easy to install, fits standard stud bays</li>
              <li><strong>Blown-in</strong> — ideal for attics and irregular cavities, good for retrofits</li>
              <li><strong>Rigid foam</strong> — high R-value per inch, used for continuous insulation</li>
              <li><strong>Spray foam</strong> — highest R-value per inch, air seal included, most expensive</li>
            </ul>
            <div className="related-links">
              <a href="/roofing-calculator/">Roofing Calculator</a>
              <a href="/wallpaper-calculator/">Wallpaper Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
