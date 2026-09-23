import ToolMarkup from '@/components/ToolMarkup';
import ToolBoot from '@/components/ToolBoot';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Paint Quantity Calculator - How Much Paint Do I Need?',
  description:
    'Use our paint quantity calculator to estimate paint for walls and ceilings. Enter room dimensions, doors, windows, coats and coverage to calculate your paint needs.',
  path: '/paint-calculator/',
});

export default function PaintCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">PAINT CALCULATOR</span>
        <h1>Paint Quantity Calculator</h1>
        <p>
          Use the Interior Tailor paint quantity calculator to estimate how much paint you may need
          for your next painting project.
        </p>
        <p>
          Enter your room dimensions, doors, windows, ceiling measurements, number of coats and
          expected paint coverage. The calculator uses these details to estimate the paintable area
          and the amount of paint required.
        </p>
        <p>Start by entering your measurements below.</p>
      </section>

      <ToolMarkup />
      <ToolBoot initialTool="calculator" />

      <section className="seo-band">
        <article className="seo-card">
          <h2>Understanding Your Paint Estimate</h2>
          <p>
            Your result is based on the measurements and paint information you provide. The
            calculation can account for wall area, openings such as doors and windows, ceiling area,
            number of coats, coverage and waste allowance.
          </p>
          <p>
            For the most useful result, use the coverage information provided on the label or
            technical documentation of the paint you intend to purchase. Actual paint consumption may
            differ because surfaces can absorb paint differently and application methods can affect
            coverage.
          </p>
          <div className="related-links">
            <a href="/how-much-paint-do-i-need/">Read how much paint you need</a>
            <a href="/how-to-calculate-wall-area-for-painting/">Learn wall area calculations</a>
            <a href="/how-many-coats-of-paint-do-i-need/">Plan paint coats</a>
            <a href="/room-color-visualizer/">Preview paint colors</a>
          </div>
        </article>
      </section>
    </>
  );
}
