import WireSizeCalculator from '@/components/WireSizeCalculator';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Wire Size Calculator - Find the Right AWG Wire Gauge',
  description: 'Calculate the correct wire size (AWG) for any electrical circuit based on current load, run length and maximum allowable voltage drop. Copper and aluminum conductors supported.',
  path: '/wire-size-calculator/',
});

export default function WireSizeCalculatorPage() {
  return (
    <>
      <section className="seo-hero">
        <span className="eyebrow">WIRE SIZE CALCULATOR</span>
        <h1>Wire Size Calculator</h1>
        <p>
          Find the minimum AWG wire gauge for single-phase and three-phase circuits based on load
          current, one-way run length, voltage and maximum allowable voltage drop. Results comply
          with NEC 310.15 ampacity tables for copper and aluminum conductors.
        </p>
      </section>

      <WireSizeCalculator />

      <section className="seo-band">
        <div className="seo-grid">
          <article className="seo-card">
            <h2>How Wire Size Is Determined</h2>
            <p>Two criteria must both be met when selecting wire:</p>
            <ol>
              <li><strong>Ampacity:</strong> The wire must safely carry the load current without overheating.</li>
              <li><strong>Voltage drop:</strong> The wire must be large enough to keep voltage drop within acceptable limits (typically ≤3%).</li>
            </ol>
            <p>The larger wire required by either criterion is the minimum acceptable size. The NEC sets minimum ampacity requirements; voltage drop limits are recommendations.</p>
          </article>
          <article className="seo-card">
            <h2>AWG Wire Size Quick Reference</h2>
            <ul>
              <li><strong>#14 AWG:</strong> 15 A — lighting circuits</li>
              <li><strong>#12 AWG:</strong> 20 A — standard outlets</li>
              <li><strong>#10 AWG:</strong> 30 A — dryers, water heaters</li>
              <li><strong>#8 AWG:</strong> 40 A — ranges, large AC units</li>
              <li><strong>#6 AWG:</strong> 55 A — subpanels, EV chargers</li>
            </ul>
            <p>Aluminum wire requires one size larger than copper for the same ampacity. Never use aluminum for wire gauges smaller than #8.</p>
            <div className="related-links">
              <a href="/voltage-drop-calculator/">Voltage Drop Calculator</a>
              <a href="/solar-panel-calculator/">Solar Panel Calculator</a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
