import HvacBtuCalculator from '@/components/HvacBtuCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'HVAC BTU Calculator - Heating & Cooling Load Estimator',
  description: 'Calculate the BTU per hour heating or cooling load for any room or home. Accounts for floor area, climate zone, insulation quality, occupants and windows for a quick HVAC size estimate.',
  path: '/hvac-btu-calculator/',
});

export default function HvacBtuCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">HVAC BTU CALCULATOR</span>
        <h1>HVAC BTU Calculator</h1>
        <p>
          Estimate the heating or cooling load for a room, addition or whole home in BTU/h and
          tons. The calculator factors in floor area, ceiling height, climate zone, insulation
          level, number of occupants and windows to provide a quick sizing guide for furnaces,
          heat pumps and air conditioners.
        </p>
      </section>

      <HvacBtuCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>What Is BTU in HVAC?</h2>
            <p>
              BTU (British Thermal Unit) measures thermal energy. In HVAC, BTU/h (BTU per hour)
              describes how much heat a system can add or remove per hour. One ton of cooling equals
              12,000 BTU/h.
            </p>
            <p>A rough rule of thumb: 20–25 BTU/h per sq ft for cooling, 30–60 BTU/h per sq ft for
              heating depending on climate.</p>
          </article>
          <article className="seo-card">
            <h2>Factors That Affect HVAC Load</h2>
            <ul>
              <li><strong>Climate zone:</strong> Greater temperature swings require more capacity</li>
              <li><strong>Insulation:</strong> Well-insulated homes need 30–50% less HVAC capacity</li>
              <li><strong>Windows:</strong> Each large window can add 500–1,000 BTU/h of solar gain</li>
              <li><strong>Ceiling height:</strong> Higher ceilings increase the volume to condition</li>
              <li><strong>Occupants:</strong> Each person generates ~250 BTU/h of body heat</li>
            </ul>
            <div className="related-links">
              <a href="/ac-size-calculator/">AC Size Calculator</a>
              <a href="/insulation-calculator/">Insulation Calculator</a>
              <a href="/square-footage-calculator/">Square Footage Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
