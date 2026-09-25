import StairCalculator from '@/components/StairCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Stair Calculator - Calculate Steps, Rise & Run',
  description: 'Calculate the number of steps, riser height, tread depth, total run and stringer length for your staircase. Metric and imperial with code guidance.',
  path: '/stair-calculator/',
});

export default function StairPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">STAIR CALCULATOR</span>
        <h1>Stair Calculator</h1>
        <p>
          Calculate stair dimensions including number of steps, actual riser height, total
          horizontal run and stringer length. Includes common presets for comfortable, standard
          and steep stairs, with building code guidance on rise and run limits.
        </p>
      </section>

      <StairCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Stair Design Formulas</h2>
            <p>The number of steps is the total rise divided by the riser height, rounded to the nearest whole number:</p>
            <p><span className="formula">Steps = Round(Total Rise ÷ Riser Height)</span></p>
            <p>The actual riser height is then adjusted so all steps are equal:</p>
            <p><span className="formula">Actual Rise = Total Rise ÷ Steps</span></p>
            <p>Stringer length uses the Pythagorean theorem:</p>
            <p><span className="formula">Stringer = √(Total Rise² + Total Run²)</span></p>
          </article>
          <article className="seo-card">
            <h2>Building Code Guidelines</h2>
            <p>Most residential building codes require:</p>
            <ul>
              <li><strong>Max riser height:</strong> 7¾ in (197 mm)</li>
              <li><strong>Min tread depth:</strong> 10 in (254 mm)</li>
              <li><strong>Consistent rise:</strong> all steps must be equal within 3/8 in (10 mm)</li>
              <li><strong>Min width:</strong> 36 in (914 mm) for residential</li>
            </ul>
            <p>Always verify with your local building authority before construction.</p>
            <div className="related-links">
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
