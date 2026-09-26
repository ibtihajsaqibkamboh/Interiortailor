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
        <h1>Voltage Drop Calculator</h1>
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
            <p>For single-phase circuits:</p>
            <p><span className="formula">VD = (2 × K × I × D) ÷ CM</span></p>
            <p>For three-phase circuits:</p>
            <p><span className="formula">VD = (√3 × K × I × D) ÷ CM</span></p>
            <p>Where K = wire resistivity (10.4 for copper, 17.0 for aluminum), I = current in amps, D = one-way distance in feet, and CM = circular mils of the conductor.</p>
          </article>
          <article className="seo-card">
            <h2>NEC Voltage Drop Guidelines</h2>
            <ul>
              <li><strong>Branch circuits:</strong> ≤3% recommended (NEC 210.19 fine print)</li>
              <li><strong>Feeders:</strong> ≤3% recommended</li>
              <li><strong>Combined (feeder + branch):</strong> ≤5% total recommended</li>
            </ul>
            <p>Excessive voltage drop causes lights to dim, motors to overheat and appliances to underperform. Always consult a licensed electrician for installation.</p>
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
