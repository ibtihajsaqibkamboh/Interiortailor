'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const APPLICATIONS = {
  brick:    { label: 'Brick laying',         cuFtPerBrick: 0.0035 },
  block:    { label: 'Block (CMU) laying',   cuFtPerBrick: 0.012  },
  tile:     { label: 'Tile setting',         sqFtPerCuFt: 15      },
  stucco:   { label: 'Stucco / parging',     sqFtPerCuFt: 12      },
};

export default function MortarCalculator() {
  const [unit, setUnit]       = useState('imperial');
  const [appType, setAppType] = useState('brick');
  const [length, setLength]   = useState('');
  const [height, setHeight]   = useState('');
  const [units, setUnits]     = useState(''); // number of bricks/blocks
  const [wastePct, setWastePct] = useState('15');
  const [errors, setErrors]   = useState({});
  const [result, setResult]   = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';
  const isByUnit = appType === 'brick' || appType === 'block';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (isByUnit) {
      if (!units || parseFloat(units) <= 0) e.units = 'Enter a value greater than 0.';
    } else {
      if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
      if (!height || parseFloat(height) <= 0) e.height = 'Enter a value greater than 0.';
    }
    const w = parseFloat(wastePct);
    if (isNaN(w) || w < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const wp = parseFloat(wastePct);
    const app = APPLICATIONS[appType];
    let cuFt = 0;

    if (isByUnit) {
      cuFt = parseFloat(units) * app.cuFtPerBrick;
    } else {
      const areaFt2 = toFt(length) * toFt(height);
      cuFt = areaFt2 / app.sqFtPerCuFt;
    }

    const totalCuFt = cuFt * (1 + wp / 100);
    // 1 bag of mortar mix = ~0.5 cu ft mixed
    const bags = Math.ceil(totalCuFt / 0.5);
    const cuM = totalCuFt * 0.0283168;

    setResult({ cuFt, totalCuFt, bags, cuM });
  }

  function reset() {
    setLength(''); setHeight(''); setUnits(''); setWastePct('15'); setErrors({}); setResult(null);
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
              {u === 'imperial' ? 'Imperial · ft' : 'Metric · m'}
            </button>
          ))}
        </div>

        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Application type
              </h2>
              <div className="field">
                <label htmlFor="appType">Application</label>
                <select id="appType" className="calc-select" value={appType}
                  onChange={e => { setAppType(e.target.value); reset(); }}>
                  {Object.entries(APPLICATIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="7" width="18" height="10" rx="1"/></svg>
                {isByUnit ? 'Number of units' : 'Area dimensions'}
              </h2>
              {isByUnit
                ? <F id="units" label={appType === 'brick' ? 'Number of bricks' : 'Number of blocks'} val={units} set={setUnits} err={errors.units} placeholder="100" />
                : (
                  <div className="field-row">
                    <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                    <F id="height" label={`Height (${lenLbl})`} val={height} set={setHeight} err={errors.height} />
                  </div>
                )
              }
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <F id="wastePct" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="15" />
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Mortar bags needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.bags, 0) : '—'}</span>
                <span>bags</span>
              </div>
              <p className="result-hero__note">
                {result ? `80 lb bags · includes ${wastePct}% waste` : 'Enter project details to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Net mortar volume</dt><dd className="numeral">{fmt(result.cuFt, 2)} cu ft</dd></div>
                  <div className="breakdown-row total"><dt>Total incl. waste</dt><dd className="numeral">{fmt(result.totalCuFt, 2)} cu ft</dd></div>
                  <div className="breakdown-row"><dt>In cubic meters</dt><dd className="numeral">{fmt(result.cuM, 3)} m³</dd></div>
                  <div className="breakdown-row"><dt>80 lb bags (est.)</dt><dd className="numeral">{fmt(result.bags, 0)}</dd></div>
                </dl>
                <p className="disclaimer">Based on ~0.5 cu ft of mixed mortar per 80 lb bag. Actual yield varies by mix ratio and water content.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
