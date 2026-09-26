'use client';
import { useState } from 'react';

function fmt(n, d = 0) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString();
}

const INSULATION = {
  poor:     { label: 'Poor (older home, minimal insulation)',  factor: 1.3 },
  average:  { label: 'Average (standard insulation)',          factor: 1.0 },
  good:     { label: 'Good (well-insulated)',                  factor: 0.8 },
  excellent:{ label: 'Excellent (high-performance)',           factor: 0.65 },
};

const CLIMATES = {
  mild:    { label: 'Mild (50°F–70°F)',     btuPerSqFt: 30 },
  moderate:{ label: 'Moderate (30°F–50°F)', btuPerSqFt: 40 },
  cold:    { label: 'Cold (10°F–30°F)',     btuPerSqFt: 50 },
  extreme: { label: 'Extreme (<10°F)',      btuPerSqFt: 60 },
};

export default function HvacBtuCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [area, setArea]         = useState('');
  const [ceilingH, setCeilingH] = useState('9');
  const [insulation, setInsulation] = useState('average');
  const [climate, setClimate]   = useState('moderate');
  const [occupants, setOccupants] = useState('2');
  const [windows, setWindows]   = useState('4');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isM = unit === 'metric';
  const areaLbl = isM ? 'm²' : 'sq ft';
  const heightLbl = isM ? 'm' : 'ft';

  function toSqFt(v) { const n = parseFloat(v); return isM ? n * 10.7639 : n; }

  function validate() {
    const e = {};
    if (!area      || parseFloat(area)      <= 0) e.area      = 'Enter a value greater than 0.';
    if (!ceilingH  || parseFloat(ceilingH)  <= 0) e.ceilingH  = 'Enter a value greater than 0.';
    if (!occupants || parseFloat(occupants) < 0)  e.occupants = 'Enter 0 or more.';
    if (!windows   || parseFloat(windows)   < 0)  e.windows   = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const sqFt = toSqFt(area);
    const base = sqFt * CLIMATES[climate].btuPerSqFt;
    const adjusted = base * INSULATION[insulation].factor;
    // Each additional occupant adds 600 BTU/h; each window adds 1000 BTU/h
    const occBtu  = Math.max(0, parseFloat(occupants) - 2) * 600;
    const winBtu  = parseFloat(windows) * 1000;
    const totalBtu = Math.round(adjusted + occBtu + winBtu);
    const tons     = totalBtu / 12000;
    const kw       = totalBtu * 0.000293071;

    setResult({ sqFt, base: Math.round(base), totalBtu, tons, kw });
  }

  function reset() {
    setArea(''); setCeilingH('9'); setOccupants('2'); setWindows('4'); setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, placeholder = '0' }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="number" inputMode="decimal" min="0" step="any" value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {err && <span className="field-error">{err}</span>}
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="units-toggle" role="radiogroup" aria-label="Measurement units">
          {['imperial', 'metric'].map(u => (
            <button key={u} type="button" className={`unit-btn${unit === u ? ' is-active' : ''}`} aria-pressed={unit === u}
              onClick={() => { setUnit(u); reset(); }}>
              {u === 'imperial' ? 'Imperial · sq ft' : 'Metric · m²'}
            </button>
          ))}
        </div>

        <div className="layout">
          <section className="panel panel--inputs" aria-label="HVAC details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Space dimensions
              </h2>
              <div className="field-row">
                <F id="area"    label={`Floor area (${areaLbl})`}   val={area}    set={setArea}    err={errors.area}    placeholder={isM ? '100' : '1000'} />
                <F id="ceilingH" label={`Ceiling height (${heightLbl})`} val={ceilingH} set={setCeilingH} err={errors.ceilingH} placeholder={isM ? '2.7' : '9'} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Climate &amp; insulation
              </h2>
              <div className="field">
                <label htmlFor="climate">Outdoor climate</label>
                <select id="climate" className="calc-select" value={climate}
                  onChange={e => { setClimate(e.target.value); setResult(null); }}>
                  {Object.entries(CLIMATES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div className="field" style={{ marginTop: 12 }}>
                <label htmlFor="insulation">Insulation quality</label>
                <select id="insulation" className="calc-select" value={insulation}
                  onChange={e => { setInsulation(e.target.value); setResult(null); }}>
                  {Object.entries(INSULATION).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="10" r="3"/><path d="M12 13v7"/></svg>
                Occupancy &amp; windows
              </h2>
              <div className="field-row">
                <F id="occupants" label="Number of occupants" val={occupants} set={setOccupants} err={errors.occupants} placeholder="2" />
                <F id="windows"   label="Number of windows"   val={windows}   set={setWindows}   err={errors.windows}   placeholder="4" />
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
              <span className="result-hero__label">Heating / cooling load</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalBtu) : '—'}</span>
                <span>BTU/h</span>
              </div>
              <p className="result-hero__note">
                {result ? `${fmt(result.tons, 1)} tons · ${fmt(result.kw, 1)} kW` : 'Enter space details to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Floor area</dt><dd className="numeral">{fmt(result.sqFt, 0)} sq ft</dd></div>
                  <div className="breakdown-row"><dt>Base BTU load</dt><dd className="numeral">{fmt(result.base)} BTU/h</dd></div>
                  <div className="breakdown-row total"><dt>Total adjusted BTU/h</dt><dd className="numeral">{fmt(result.totalBtu)} BTU/h</dd></div>
                  <div className="breakdown-row"><dt>Cooling tons</dt><dd className="numeral">{fmt(result.tons, 2)} tons</dd></div>
                  <div className="breakdown-row"><dt>Kilowatts</dt><dd className="numeral">{fmt(result.kw, 1)} kW</dd></div>
                </dl>
                <p className="disclaimer">Rule-of-thumb estimate. A proper Manual J load calculation is required for accurate HVAC sizing. Consult a licensed HVAC professional.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
