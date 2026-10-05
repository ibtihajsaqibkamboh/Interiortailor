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
        <h1>Solar Panel Calculator — How Many Panels Do I Need?</h1>
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
            <h2>How to Size a Solar System</h2>
            <p>Solar system sizing starts with your daily energy consumption and local sun availability:</p>
            <p><span className="formula">System Size (kW) = Daily kWh ÷ (Peak Sun Hours × System Efficiency)</span></p>
            <p><span className="formula">Panels = System Size (W) ÷ Panel Wattage</span></p>
            <p>
              Daily usage = monthly kWh bill ÷ 30. System efficiency of 75–85% accounts for
              inverter losses, wiring resistance, soiling, temperature derating and mismatch losses.
              A 400W panel in a location with 5 peak sun hours produces roughly 1.6–1.7 kWh per day.
            </p>
          </article>

          <article className="seo-card">
            <h2>Peak Sun Hours by US Region</h2>
            <ul>
              <li><strong>Southwest (AZ, NV, NM, CA desert):</strong> 5.5–7.5 hours/day</li>
              <li><strong>Southeast (FL, TX, GA, SC):</strong> 4.5–5.5 hours/day</li>
              <li><strong>Midwest &amp; Mid-Atlantic:</strong> 3.5–4.5 hours/day</li>
              <li><strong>Pacific Northwest (WA, OR):</strong> 3.0–4.0 hours/day</li>
              <li><strong>Northeast (NY, MA, ME):</strong> 3.5–4.5 hours/day</li>
            </ul>
            <p>
              Peak sun hours are not total daylight hours — they represent equivalent hours at
              1,000 W/m² solar irradiance. Cloudy, overcast regions have fewer peak sun hours
              even though daylight lasts the same amount of time.
            </p>
          </article>

          <article className="seo-card">
            <h2>Factors That Affect Solar System Output</h2>
            <ul>
              <li><strong>Roof orientation:</strong> South-facing roofs (in the Northern Hemisphere) produce the most power; east/west orientations reduce output by 15–25%</li>
              <li><strong>Tilt angle:</strong> Optimal tilt equals your latitude in degrees</li>
              <li><strong>Shading:</strong> Even partial shading from trees or chimneys can cut output significantly with string inverters</li>
              <li><strong>Temperature:</strong> Solar panels lose about 0.3–0.5% efficiency per °C above 25°C</li>
              <li><strong>Soiling:</strong> Dust, pollen and bird droppings reduce output by 1–5% — regular cleaning helps</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>How many solar panels do I need for a 2,000 sq ft house?</summary>
              <p>A typical 2,000 sq ft home uses about 900–1,200 kWh per month. At 5 peak sun hours with 400W panels and 80% system efficiency, that requires approximately 18–24 panels (7.2–9.6 kW system).</p>
            </details>
            <details>
              <summary>How much roof space do I need?</summary>
              <p>A standard 400W residential solar panel is approximately 17.5 sq ft. A 20-panel system requires roughly 350 sq ft of unshaded south-facing roof area.</p>
            </details>
            <details>
              <summary>What is a good system efficiency to use?</summary>
              <p>Use 80% for a standard string inverter system with typical wiring losses. Use 85% for a microinverter or power optimizer system. Use 75% for older or lower-quality equipment.</p>
            </details>
            <div className="related-links">
              <a href="/wire-size-calculator/">Wire Size Calculator</a>
              <a href="/voltage-drop-calculator/">Voltage Drop Calculator</a>
              <a href="/roof-pitch-calculator/">Roof Pitch Calculator</a>
              <a href="/roofing-calculator/">Roofing Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
