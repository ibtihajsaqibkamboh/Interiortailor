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
        <h1>HVAC BTU Calculator — Heating &amp; Cooling Load Estimator</h1>
        <p>
          Estimate the heating or cooling load for a room, addition or whole home in BTU/h and
          tons. The calculator factors in floor area, ceiling height, climate zone, insulation
          level, occupants and windows to provide a quick sizing guide for furnaces, heat pumps
          and air conditioners.
        </p>
      </section>

      <HvacBtuCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>What Is BTU in HVAC?</h2>
            <p>
              BTU stands for British Thermal Unit — the amount of energy needed to raise one pound
              of water by one degree Fahrenheit. In HVAC, BTU/h (BTU per hour) describes how much
              heat a system can add or remove per hour.
            </p>
            <p>
              One ton of heating or cooling equals 12,000 BTU/h. A typical 3-ton residential
              central air conditioner is rated at 36,000 BTU/h. A common rule of thumb is 20–25
              BTU/h per square foot for cooling and 30–60 BTU/h per square foot for heating,
              depending on climate zone.
            </p>
          </article>

          <article className="seo-card">
            <h2>Factors That Affect HVAC Load</h2>
            <ul>
              <li><strong>Climate zone:</strong> Cold climates require dramatically more heating capacity — 50–60 BTU/sq ft vs. 20–30 BTU/sq ft in mild climates</li>
              <li><strong>Insulation quality:</strong> A well-insulated home may need 30–50% less HVAC capacity than a poorly insulated one</li>
              <li><strong>Ceiling height:</strong> Higher ceilings increase the air volume to condition — vaulted ceilings add 20–30% to the load</li>
              <li><strong>Windows:</strong> Each large south-facing window can add 1,000+ BTU/h of solar heat gain</li>
              <li><strong>Occupancy:</strong> Each person generates approximately 250 BTU/h of body heat</li>
              <li><strong>Internal heat gains:</strong> Kitchens, server rooms and other heat-generating spaces require additional cooling capacity</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Why Accurate Sizing Matters</h2>
            <p>
              Oversized HVAC equipment is one of the most common and costly mistakes in home
              construction and renovation:
            </p>
            <ul>
              <li><strong>Oversized cooling:</strong> Short-cycles rapidly, does not dehumidify properly, causes uncomfortable temperature swings and wears out faster</li>
              <li><strong>Undersized cooling:</strong> Cannot reach the thermostat setpoint on hot days, runs constantly and drives up energy bills</li>
              <li><strong>Oversized heating:</strong> Causes rapid temperature swings and increases cycling wear on the heat exchanger</li>
            </ul>
            <p>A proper Manual J load calculation by a certified HVAC contractor is the correct method for new installations. This calculator provides a planning estimate only.</p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many BTUs do I need per square foot?</summary>
              <p>A commonly used rule of thumb is 20 BTU per square foot for cooling in an average climate. For heating, the range is 30–60 BTU per square foot depending on how cold your winters are.</p>
            </details>
            <details>
              <summary>What does 1 ton of air conditioning mean?</summary>
              <p>One ton equals 12,000 BTU/h of cooling capacity. The term originated from the amount of heat needed to melt one ton of ice over 24 hours.</p>
            </details>
            <details>
              <summary>Should I oversize my HVAC for comfort?</summary>
              <p>No. Oversizing causes more problems than it solves. A properly sized system maintains comfort more efficiently than an oversized one that short-cycles.</p>
            </details>
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
