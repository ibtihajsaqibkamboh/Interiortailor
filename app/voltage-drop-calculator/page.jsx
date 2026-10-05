import VoltageDropCalculator from '@/components/VoltageDropCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Voltage Drop Calculator - NEC Wire Voltage Drop Estimator',
  description: 'Calculate voltage drop for single-phase and three-phase circuits. Enter wire gauge, conductor material, distance and current to check NEC compliance and voltage at the load.',
  path: '/voltage-drop-calculator/',
});

export default function VoltageDropCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">VOLTAGE DROP CALCULATOR</span>
        <h1>Voltage Drop Calculator — Check NEC Compliance for Any Circuit</h1>
        <p>
          Calculate the voltage drop and percentage drop for single-phase and three-phase electrical
          circuits. Enter your wire gauge, conductor material (copper or aluminum), one-way run
          distance and load current to instantly check against NEC recommendations.
        </p>
      </section>

      <VoltageDropCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Voltage Drop Is Calculated</h2>
            <p>
              Voltage drop occurs because every conductor has electrical resistance. The longer
              the wire and the higher the current, the more voltage is lost as heat.
            </p>
            <p>For single-phase circuits:</p>
            <p><span className="formula">VD = (2 × K × I × D) ÷ CM</span></p>
            <p>For three-phase circuits:</p>
            <p><span className="formula">VD = (√3 × K × I × D) ÷ CM</span></p>
            <p>
              Where K = resistivity (10.4 for copper, 17.0 for aluminum), I = current in amps,
              D = one-way distance in feet, and CM = circular mils of the conductor.
            </p>
          </article>

          <article className="seo-card">
            <h2>NEC Voltage Drop Recommendations</h2>
            <p>
              The National Electrical Code (NEC) provides recommended (not mandatory) limits for
              voltage drop to ensure equipment operates efficiently:
            </p>
            <ul>
              <li><strong>Branch circuits:</strong> ≤3% recommended (NEC 210.19 informational note)</li>
              <li><strong>Feeders:</strong> ≤3% recommended (NEC 215.2 informational note)</li>
              <li><strong>Combined feeder + branch:</strong> ≤5% total recommended</li>
            </ul>
            <p>
              Excessive voltage drop causes lights to dim and flicker, motors to run hot and fail
              prematurely, and sensitive electronics to malfunction or produce errors.
            </p>
          </article>

          <article className="seo-card">
            <h2>When to Upsize Wire to Reduce Voltage Drop</h2>
            <p>
              If calculated voltage drop exceeds 3%, increase the wire gauge one or two sizes.
              Common scenarios where upsize is needed:
            </p>
            <ul>
              <li>Sub-panels located far from the main panel (over 100 ft)</li>
              <li>Outbuildings, detached garages and shops</li>
              <li>EV chargers and large motor loads on long runs</li>
              <li>Outdoor lighting circuits running hundreds of feet</li>
              <li>Sensitive audio, medical or laboratory equipment</li>
            </ul>
            <p>Always consult a licensed electrician. NEC compliance is a minimum — good design aims for less than 2% drop on critical circuits.</p>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>What is an acceptable voltage drop for a house?</summary>
              <p>The NEC recommends no more than 3% on branch circuits and 5% combined from service to load. Most electricians aim for 2% or less on critical runs.</p>
            </details>
            <details>
              <summary>Does voltage drop affect energy efficiency?</summary>
              <p>Yes. Voltage drop wastes energy as heat in the wire. While the wasted amount is usually small, consistently high voltage drop indicates undersized wiring that should be corrected.</p>
            </details>
            <details>
              <summary>Is aluminum wire safe to use?</summary>
              <p>Aluminum wiring is code-compliant for feeders and service entrance conductors size #8 and larger. It requires special connectors rated for aluminum and anti-oxidant compound. It should not be used for branch circuit wiring smaller than #8.</p>
            </details>
            <div className="related-links">
              <a href="/wire-size-calculator/">Wire Size Calculator</a>
              <a href="/solar-panel-calculator/">Solar Panel Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
