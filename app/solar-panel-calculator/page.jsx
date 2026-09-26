import SolarPanelCalculator from '@/components/SolarPanelCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Solar Panel Calculator - How Many Solar Panels Do I Need?',
  description: 'Calculate how many solar panels you need to power your home. Enter monthly energy usage, peak sun hours, panel wattage and system efficiency for an accurate solar system size estimate.',
  path: '/solar-panel-calculator/',
});

export default function SolarPanelCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">SOLAR PANEL CALCULATOR</span>
        <h1>Solar Panel Calculator</h1>
        <p>
          Estimate how many solar panels you need to meet your home&rsquo;s electricity demand. Enter
          your average monthly energy usage in kWh, your location&rsquo;s peak sun hours, the wattage
          of your chosen panels and system efficiency to get a panel count, system size and
          estimated annual production.
        </p>
      </section>

      <SolarPanelCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Solar Panel Count Is Calculated</h2>
            <p>The formula for sizing a solar system:</p>
            <p><span className="formula">System Size (kW) = Daily Usage (kWh) ÷ (Peak Sun Hours × System Efficiency)</span></p>
            <p><span className="formula">Panels = System Size (W) ÷ Panel Wattage</span></p>
            <p>Daily usage is your monthly kWh bill divided by 30. System efficiency of 75–85% accounts for inverter losses, wiring and temperature derating.</p>
          </article>
          <article className="seo-card">
            <h2>Peak Sun Hours by Region (US)</h2>
            <ul>
              <li><strong>Southwest (AZ, CA, NV):</strong> 5.5–7 hours/day</li>
              <li><strong>Southeast (TX, FL, GA):</strong> 4.5–5.5 hours/day</li>
              <li><strong>Midwest &amp; Northeast:</strong> 3.5–4.5 hours/day</li>
              <li><strong>Pacific Northwest:</strong> 3–4 hours/day</li>
            </ul>
            <p>Peak sun hours measure the equivalent hours per day the sun shines at 1,000 W/m², not just daylight hours.</p>
            <div className="related-links">
              <a href="/wire-size-calculator/">Wire Size Calculator</a>
              <a href="/voltage-drop-calculator/">Voltage Drop Calculator</a>
              <a href="/roof-pitch-calculator/">Roof Pitch Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
