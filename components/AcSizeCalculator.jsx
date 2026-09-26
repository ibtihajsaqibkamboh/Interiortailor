'use client';
import { useState } from 'react';

function fmt(n, d = 0) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString();
}

const CLIMATE_FACTORS = {
  hot:      { label: 'Hot / Humid (southern US, tropics)', btuPerSqFt: 25 },
  warm:     { label: 'Warm (mid-Atlantic, Pacific NW)',    btuPerSqFt: 20 },
  moderate: { label: 'Moderate (midwest, northeast)',      btuPerSqFt: 18 },
  cool:     { label: 'Cool (northern states, mountains)',  btuPerSqFt: 15 },
};

const SUNLIGHT = {
  sunny:  { label: 'Very sunny / south-facing', adj: 1.1 },
  normal: { label: 'Normal / mixed',            adj: 1.0 },
  shady:  { label: 'Mostly shaded',             adj: 0.9 },
};

export default function AcSizeCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [area, setArea]         = useState('');
  const [climate, setClimate]   = useState('moderate');
  const [sunlight, setSunlight] = useState('normal');
  const [occupants, setOccupants] = useState('2');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isM = unit === 'metric';
  const areaLbl = isM ? 'm²' : 'sq ft';

  function toSqFt(v) { const n = parseFloat(v); return isM ? n * 10.7639 : n; }

  function validate() {
    const e = {};
    if (!area      || parseFloat(area)      <= 0) e.area      = 'Enter a value greater than 0.';
    if (!occupants || parseFloat(occupants) < 0)  e.occupants = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const sqFt  = toSqFt(area);
    const cf    = CLIMATE_FACTORS[climate];
    const sf    = SUNLIGHT[sunlight];
    let btu     = sqFt * cf.btuPerSqFt * sf.adj;
    // Add 600 BTU per occupant above 2
    btu += Math.max(0, parseFloat(occupants) - 2) * 600;
    btu = Math.round(btu);
    const tons  = btu / 12000;

    // Standard AC sizes in BTU
    const sizes = [5000,6000,8000,10000,12000,14000,15000,18000,21000,24000,
                   27000,30000,33000,36000,42000,48000,60000];
    const recommended = sizes.find(s => s >= btu) || sizes[sizes.length - 1];
    const recTons = recommended / 12000;

    setResult({ sqFt, btu, tons, recommended, recTons });
  }

  function reset() {
    setArea(''); setOccupants('2'); setErrors({}); setResult(null);
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
          <section className="panel panel--inputs" aria-label="AC sizing details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Room / area
              </h2>
              <F id="area" label={`Floor area (${areaLbl})`} val={area} set={setArea} err={errors.area} placeholder={isM ? '50' : '500'} />
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>
                Climate &amp; sunlight
              </h2>
              <div className="field">
                <label htmlFor="climate">Climate zone</label>
                <select id="climate" className="calc-select" value={climate}
                  onChange={e => { setClimate(e.target.value); setResult(null); }}>
                  {Object.entries(CLIMATE_FACTORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div className="field" style={{ marginTop: 12 }}>
                <label htmlFor="sunlight">Sunlight exposure</label>
                <select id="sunlight" className="calc-select" value={sunlight}
                  onChange={e => { setSunlight(e.target.value); setResult(null); }}>
                  {Object.entries(SUNLIGHT).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="10" r="3"/><path d="M12 13v7"/></svg>
                Occupants
              </h2>
              <F id="occupants" label="Usual number of occupants" val={occupants} set={setOccupants} err={errors.occupants} placeholder="2" />
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Recommended AC size</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.recommended) : '—'}</span>
                <span>BTU/h</span>
              </div>
              <p className="result-hero__note">
                {result ? `${fmt(result.recTons, 1)} tons` : 'Enter room details to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Cooling area</dt><dd className="numeral">{fmt(result.sqFt, 0)} sq ft</dd></div>
                  <div className="breakdown-row"><dt>Calculated load</dt><dd className="numeral">{fmt(result.btu)} BTU/h</dd></div>
                  <div className="breakdown-row total"><dt>Recommended unit</dt><dd className="numeral">{fmt(result.recommended)} BTU/h</dd></div>
                  <div className="breakdown-row"><dt>Tonnage</dt><dd className="numeral">{fmt(result.recTons, 1)} tons</dd></div>
                </dl>
                <p className="disclaimer">Rule-of-thumb sizing only. Actual AC capacity should be determined with a Manual J load calculation by a licensed HVAC contractor. Oversizing and undersizing both reduce efficiency and comfort.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
