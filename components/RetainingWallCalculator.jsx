'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const MATERIAL_TYPES = {
  concrete_block: { label: 'Concrete retaining blocks',    blockFt2: 0.67, weightLbFt2: 55 },
  natural_stone:  { label: 'Natural stone (dry-stack)',     blockFt2: 1.0,  weightLbFt2: 65 },
  timber:         { label: 'Landscape timber (6×6)',        blockFt2: 0.5,  weightLbFt2: 20 },
  poured:         { label: 'Poured concrete',               blockFt2: 0,    weightLbFt2: 150 },
};

export default function RetainingWallCalculator() {
  const [unit, setUnit]       = useState('imperial');
  const [length, setLength]   = useState('');
  const [height, setHeight]   = useState('');
  const [material, setMaterial] = useState('concrete_block');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]   = useState({});
  const [result, setResult]   = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (!length  || parseFloat(length)  <= 0) e.length  = 'Enter a value greater than 0.';
    if (!height  || parseFloat(height)  <= 0) e.height  = 'Enter a value greater than 0.';
    const w = parseFloat(wastePct);
    if (isNaN(w) || w < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const lFt   = toFt(length);
    const hFt   = toFt(height);
    const wp    = parseFloat(wastePct);
    const wasteF = 1 + wp / 100;
    const mt    = MATERIAL_TYPES[material];

    const wallAreaFt2 = lFt * hFt;
    // Gravel backfill: roughly 1/3 wall height wide, full length
    const gravelCuYd = (lFt * hFt * (hFt / 3)) / 27;

    let blocks = 0;
    if (mt.blockFt2 > 0) {
      // blocks per sq ft (each block covers blockFt2 sq ft of face)
      blocks = Math.ceil((wallAreaFt2 / mt.blockFt2) * wasteF);
    }

    // Base footing: concrete volume (1 ft deep × 1.5× wall height wide × length)
    const footingCuYd = (1 * (hFt * 1.5) * lFt) / 27;
    const totalWeightLb = wallAreaFt2 * mt.weightLbFt2;

    setResult({ wallAreaFt2, blocks, gravelCuYd: Math.ceil(gravelCuYd * wasteF * 10) / 10, footingCuYd: Math.ceil(footingCuYd * 10) / 10, totalWeightLb, hFt });
  }

  function reset() {
    setLength(''); setHeight(''); setWastePct('10'); setErrors({}); setResult(null);
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
          <section className="panel panel--inputs" aria-label="Wall details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Wall dimensions
              </h2>
              <div className="field-row">
                <F id="length" label={`Wall length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="height" label={`Wall height (${lenLbl})`} val={height} set={setHeight} err={errors.height} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Material
              </h2>
              <div className="field">
                <label htmlFor="material">Wall material</label>
                <select id="material" className="calc-select" value={material}
                  onChange={e => { setMaterial(e.target.value); setResult(null); }}>
                  {Object.entries(MATERIAL_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <F id="wastePct" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="10" />
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Wall face area</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.wallAreaFt2, 0) : '—'}</span>
                <span>sq ft</span>
              </div>
              <p className="result-hero__note">
                {result ? `${MATERIAL_TYPES[material].label}` : 'Enter wall dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Wall face area</dt><dd className="numeral">{fmt(result.wallAreaFt2, 0)} sq ft</dd></div>
                  {result.blocks > 0 && <div className="breakdown-row total"><dt>Blocks / units needed</dt><dd className="numeral">{fmt(result.blocks, 0)}</dd></div>}
                  <div className="breakdown-row"><dt>Gravel backfill</dt><dd className="numeral">~{fmt(result.gravelCuYd, 1)} yd³</dd></div>
                  <div className="breakdown-row"><dt>Footing concrete</dt><dd className="numeral">~{fmt(result.footingCuYd, 1)} yd³</dd></div>
                  <div className="breakdown-row"><dt>Est. wall weight</dt><dd className="numeral">{fmt(result.totalWeightLb / 2000, 1)} tons</dd></div>
                </dl>
                {result.hFt > 4 && (
                  <p className="disclaimer" style={{ color: 'var(--c-warning, #b45309)' }}>⚠ Walls over 4 ft tall typically require a building permit and engineering review. Consult a licensed structural engineer.</p>
                )}
                <p className="disclaimer">Estimates only. Footing depth, drainage, soil bearing capacity and local codes all affect actual design requirements.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
