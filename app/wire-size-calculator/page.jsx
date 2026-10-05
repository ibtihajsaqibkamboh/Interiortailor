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
        <h1>Wire Size Calculator — Find the Right AWG Gauge for Any Circuit</h1>
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
            <p>
              Selecting the correct wire size involves satisfying two independent criteria — the
              larger wire required by either criterion must be used:
            </p>
            <ol>
              <li><strong>Ampacity:</strong> The wire must carry the load current without overheating. Set by NEC 310.15 tables based on conductor type, insulation rating and installation method.</li>
              <li><strong>Voltage drop:</strong> The wire must be large enough to keep voltage drop within acceptable limits (typically ≤3% for branch circuits).</li>
            </ol>
            <p>
              Long runs almost always require a larger wire for voltage drop reasons even when the
              ampacity requirement is met by a smaller gauge.
            </p>
          </article>

          <article className="seo-card">
            <h2>AWG Wire Size Quick Reference (Copper, 60°C)</h2>
            <ul>
              <li><strong>#14 AWG:</strong> 15 A — lighting and receptacle branch circuits</li>
              <li><strong>#12 AWG:</strong> 20 A — kitchen, bathroom and general outlets</li>
              <li><strong>#10 AWG:</strong> 30 A — dryers, water heaters, A/C units</li>
              <li><strong>#8 AWG:</strong> 40 A — ranges, large air conditioners</li>
              <li><strong>#6 AWG:</strong> 55 A — sub-panels, EV chargers (Level 2)</li>
              <li><strong>#4 AWG:</strong> 70 A — large sub-panels and motors</li>
              <li><strong>#2 AWG:</strong> 95 A — service entrance, large sub-panels</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Copper vs Aluminum Wire</h2>
            <p>
              Both copper and aluminum are code-compliant conductors, but they have important
              differences to understand before specifying:
            </p>
            <ul>
              <li>Aluminum has about 61% the conductivity of copper, so requires one size larger for the same ampacity</li>
              <li>Aluminum expands and contracts more with temperature — requires anti-oxidant compound and AL-rated connectors</li>
              <li>Aluminum is significantly cheaper and lighter, making it the standard choice for service entrance and large feeder conductors</li>
              <li>Copper is preferred for branch circuit wiring due to ease of termination and reliability</li>
            </ul>
          </article>

          <article className="seo-card">
            <h2>Frequently Asked Questions</h2>
            <details>
              <summary>What wire size do I need for a 20-amp circuit?</summary>
              <p>#12 AWG copper wire is required for a 20-amp branch circuit. #14 AWG is only rated for 15-amp circuits and cannot be used on a 20-amp breaker.</p>
            </details>
            <details>
              <summary>What size wire for a 100-amp sub-panel 150 feet away?</summary>
              <p>For a 100-amp feeder at 150 ft with 240V single-phase, #1 AWG copper or #2/0 AWG aluminum is typically required to keep voltage drop under 3%. Always verify with a licensed electrician.</p>
            </details>
            <details>
              <summary>Does conduit fill affect wire ampacity?</summary>
              <p>Yes. When more than 3 current-carrying conductors share a conduit, ampacity must be derated per NEC 310.15(C). This calculator does not apply conduit fill derating — consult an electrician for multi-conductor installations.</p>
            </details>
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
