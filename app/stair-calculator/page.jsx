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
        <h1>Stair Calculator — Steps, Rise, Run &amp; Stringer Length</h1>
        <p>
          Calculate stair dimensions including number of steps, actual riser height, total
          horizontal run and stringer length. Enter your total rise and preferred riser height to
          get a complete stair layout that meets building code requirements.
        </p>
      </section>

      <StairCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>Stair Design Formulas</h2>
            <p>The number of steps is the total rise divided by the riser height:</p>
            <p><span className="formula">Steps = Round(Total Rise ÷ Riser Height)</span></p>
            <p>The actual riser height is adjusted so all steps are equal:</p>
            <p><span className="formula">Actual Rise = Total Rise ÷ Number of Steps</span></p>
            <p>Stringer length is calculated using the Pythagorean theorem:</p>
            <p><span className="formula">Stringer = √(Total Rise² + Total Run²)</span></p>
          </article>

          <article className="seo-card">
            <h2>Building Code Requirements (IRC 2021)</h2>
            <ul>
              <li><strong>Maximum riser height:</strong> 7¾ in (197 mm)</li>
              <li><strong>Minimum tread depth:</strong> 10 in (254 mm)</li>
              <li><strong>Riser consistency:</strong> No step may vary from others by more than 3/8 in (10 mm)</li>
              <li><strong>Minimum stair width:</strong> 36 in (914 mm) clear</li>
              <li><strong>Handrail required:</strong> when 4 or more risers</li>
              <li><strong>Handrail height:</strong> 34–38 in above tread nosings</li>
            </ul>
            <p>Always verify requirements with your local building authority — some jurisdictions are stricter than IRC minimums.</p>
          </article>

          <article className="seo-card">
            <h2>Designing Comfortable Stairs</h2>
            <p>
              Code compliance is a minimum — comfortable stairs go a step further. The classic
              ergonomic formula for residential stairs is:
            </p>
            <p><span className="formula">2 × Riser + Tread = 24–25 inches</span></p>
            <ul>
              <li>A 7-inch riser with an 11-inch tread: 2(7) + 11 = 25 — comfortable</li>
              <li>A 7.5-inch riser with a 10-inch tread: 2(7.5) + 10 = 25 — acceptable but steep</li>
              <li>Aim for riser heights between 6.5 and 7.5 inches for the most natural climbing motion</li>
              <li>Nosings (overhanging tread edges) of 3/4–1.25 in allow comfortable foot placement</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many steps for an 8-foot ceiling?</summary>
              <p>An 8-ft floor-to-floor height is 96 inches. Using a 7-inch riser: 96 ÷ 7 = 13.7 — round to 14 risers. Actual riser = 96 ÷ 14 = 6.86 inches. With 11-inch treads, total run = 13 treads × 11 = 143 inches (11.9 ft) of horizontal space needed.</p>
            </details>
            <details>
              <summary>What size lumber do I need for stair stringers?</summary>
              <p>Stair stringers are typically cut from 2×12 lumber (1.5×11.25 in actual). The minimum net section (solid wood remaining after notching) must be at least 3.5 inches at every cut point to maintain structural strength.</p>
            </details>
            <details>
              <summary>Do I need a permit to build interior stairs?</summary>
              <p>In most jurisdictions, yes. New stairs in existing homes require a permit in most US states. Replacement of existing stairs in-kind sometimes does not, but always check with your local building department before starting.</p>
            </details>
            <div className="related-links">
              <a href="/deck-stair-calculator/">Deck Stair Calculator</a>
              <a href="/deck-cost-calculator/">Deck Cost Calculator</a>
              <a href="/concrete-calculator/">Concrete Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
