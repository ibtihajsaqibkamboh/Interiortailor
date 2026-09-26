'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

export default function SolarPanelCalculator() {
  const [monthlyKwh, setMonthlyKwh]   = useState('');
  const [peakSunHours, setPeakSunHours] = useState('5');
  const [panelWatts, setPanelWatts]   = useState('400');
  const [systemEff, setSystemEff]     = useState('80');
  const [errors, setErrors]           = useState({});
  const [result, setResult]           = useState(null);

  function validate() {
    const e = {};
    if (!monthlyKwh   || parseFloat(monthlyKwh)   <= 0) e.monthlyKwh   = 'Enter a value greater than 0.';
    if (!peakSunHours || parseFloat(peakSunHours) <= 0) e.peakSunHours = 'Enter a value greater than 0.';
    if (!panelWatts   || parseFloat(panelWatts)   <= 0) e.panelWatts   = 'Enter a value greater than 0.';
    const se = parseFloat(systemEff);
    if (isNaN(se) || se <= 0 || se > 100) e.systemEff = 'Enter a percentage between 1 and 100.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const daily = parseFloat(monthlyKwh) / 30;
    const psh   = parseFloat(peakSunHours);
    const pw    = parseFloat(panelWatts);
    const eff   = parseFloat(systemEff) / 100;

    // System size needed (kW)
    const systemKw = daily / (psh * eff);
    // Number of panels
    const panels = Math.ceil((systemKw * 1000) / pw);
    // Annual production estimate
    const annualKwh = panels * pw * psh * eff * 365 / 1000;
    // Approximate roof area (1 panel ≈ 17.5 sq ft)
    const roofAreaSqFt = panels * 17.5;

    setResult({ daily, systemKw, panels, annualKwh, roofAreaSqFt });
  }

  function reset() {
    setMonthlyKwh(''); setPeakSunHours('5'); setPanelWatts('400'); setSystemEff('80');
    setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, placeholder = '0', note }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" inputMode="decimal" value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {note && <span className="field-hint">{note}</span>}
        {err  && <span className="field-error">{err}</span>}
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="layout">
          <section className="panel panel--inputs" aria-label="Solar details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>
                Energy usage
              </h2>
              <F id="monthlyKwh" label="Monthly electricity usage (kWh)" val={monthlyKwh} set={setMonthlyKwh} err={errors.monthlyKwh} placeholder="900" note="Check your utility bill" />
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h18M12 3l7 9H5l7-9z"/></svg>
                Solar resource &amp; system
              </h2>
              <div className="field-row">
                <F id="peakSunHours" label="Peak sun hours / day" val={peakSunHours} set={setPeakSunHours} err={errors.peakSunHours} placeholder="5" note="4–6 typical US average" />
                <F id="panelWatts"   label="Panel wattage (W)"    val={panelWatts}   set={setPanelWatts}   err={errors.panelWatts}   placeholder="400" />
              </div>
              <div className="field-row" style={{ marginTop: 12 }}>
                <F id="systemEff" label="System efficiency (%)" val={systemEff} set={setSystemEff} err={errors.systemEff} placeholder="80" note="Inverter + wiring losses" />
              </div>
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Solar panels needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.panels, 0) : '—'}</span>
                <span>panels</span>
              </div>
              <p className="result-hero__note">
                {result ? `${panelWatts} W panels · ${fmt(result.systemKw, 2)} kW system` : 'Enter your energy usage to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Daily usage</dt><dd className="numeral">{fmt(result.daily, 1)} kWh</dd></div>
                  <div className="breakdown-row"><dt>System size needed</dt><dd className="numeral">{fmt(result.systemKw, 2)} kW</dd></div>
                  <div className="breakdown-row total"><dt>Panels required</dt><dd className="numeral">{fmt(result.panels, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Est. annual production</dt><dd className="numeral">{fmt(result.annualKwh, 0)} kWh</dd></div>
                  <div className="breakdown-row"><dt>Approx. roof area needed</dt><dd className="numeral">{fmt(result.roofAreaSqFt, 0)} sq ft</dd></div>
                </dl>
                <p className="disclaimer">Estimates only. Actual production depends on local solar irradiance, shading, roof angle, panel temperature and system losses. Consult a certified solar installer for a site-specific design.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
