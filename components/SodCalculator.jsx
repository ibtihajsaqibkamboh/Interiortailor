'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Standard sod roll: 2 ft × 5 ft = 10 sq ft (imperial)
// Metric slab: 0.6 m × 1.5 m = 0.9 m²
const SOD_ROLL_FT2 = 10;
const SOD_ROLL_M2  = 0.9;

export default function SodCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [length, setLength]     = useState('');
  const [width, setWidth]       = useState('');
  const [wastePct, setWastePct] = useState('5');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isImp = unit === 'imperial';
  const lenLbl  = isImp ? 'ft'   : 'm';
  const areaLbl = isImp ? 'sq ft' : 'm²';

  function toUnit(v) { return parseFloat(v) || 0; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter a value greater than 0.';
    const wp = parseFloat(wastePct);
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const area = toUnit(length) * toUnit(width);
    const wp = parseFloat(wastePct);
    const totalArea = area * (1 + wp / 100);
    const rollSize = isImp ? SOD_ROLL_FT2 : SOD_ROLL_M2;
    const rolls = Math.ceil(totalArea / rollSize);
    const pallets = Math.ceil(rolls / (isImp ? 50 : 50)); // ~50 rolls per pallet
    const costEstimate = isImp ? totalArea * 0.35 : totalArea * 3.76; // ~$0.35/sqft or $3.50/m²

    setResult({ area, totalArea, rolls, pallets, costEstimate, areaLbl,
      rollLbl: isImp ? '10 sq ft rolls' : '0.9 m² slabs' });
  }

  function reset() {
    setLength(''); setWidth(''); setWastePct('5');
    setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, step = 'any', placeholder = '0' }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" inputMode="decimal" value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {err && <span className="field-error">{err}</span>}
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="units-toggle" role="radiogroup">
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
                Area dimensions
              </h2>
              <div className="field-row">
                <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="width"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste &amp; offcuts
              </h2>
              <div className="field-row">
                <F id="wastePct" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="5" />
              </div>
              <p className="group-hint">5% for simple rectangular areas; 10–15% for irregular shapes or curves.</p>
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Sod rolls needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.rolls, 0) : '—'}</span>
                <span>rolls</span>
              </div>
              <p className="result-hero__note">
                {result ? `Based on ${result.rollLbl} · inc. ${wastePct}% waste` : 'Enter area dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Net area</dt><dd className="numeral">{fmt(result.area, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row"><dt>With waste</dt><dd className="numeral">{fmt(result.totalArea, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row total"><dt>Rolls / slabs</dt><dd className="numeral">{fmt(result.rolls, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Pallets (est. 50 rolls)</dt><dd className="numeral">{result.pallets}</dd></div>
                  <div className="breakdown-row"><dt>Material cost estimate</dt><dd className="numeral">${fmt(result.costEstimate, 0)}</dd></div>
                </dl>
                <p className="disclaimer">
                  Roll size: {isImp ? '2 ft × 5 ft (10 sq ft)' : '0.6 m × 1.5 m (0.9 m²)'} — confirm with your supplier as sizes vary. Cost estimate based on typical retail sod pricing.
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
