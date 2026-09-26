'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Mix ratios: cement : sand : aggregate (by volume parts)
const MIX_TYPES = {
  m10:  { label: 'M10 (1:3:6)',   cement: 1, sand: 3, agg: 6 },
  m15:  { label: 'M15 (1:2:4)',   cement: 1, sand: 2, agg: 4 },
  m20:  { label: 'M20 (1:1.5:3)', cement: 1, sand: 1.5, agg: 3 },
  m25:  { label: 'M25 (1:1:2)',   cement: 1, sand: 1, agg: 2 },
};

// Cement density ~1500 kg/m³ bulk
const CEMENT_DENSITY_KG_M3 = 1500;

export default function CementCalculator() {
  const [unit, setUnit]       = useState('imperial');
  const [length, setLength]   = useState('');
  const [width, setWidth]     = useState('');
  const [depth, setDepth]     = useState('');
  const [mix, setMix]         = useState('m20');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]   = useState({});
  const [result, setResult]   = useState(null);

  const isM = unit === 'metric';
  const lenLbl   = isM ? 'm' : 'ft';
  const depthLbl = isM ? 'cm' : 'in';

  function toM(v)      { const n = parseFloat(v); return isM ? n : n * 0.3048; }
  function depthToM(v) { const n = parseFloat(v); return isM ? n / 100 : n * 0.0254; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter a value greater than 0.';
    if (!depth  || parseFloat(depth)  <= 0) e.depth  = 'Enter a value greater than 0.';
    const w = parseFloat(wastePct);
    if (isNaN(w) || w < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const volM3 = toM(length) * toM(width) * depthToM(depth);
    const m = MIX_TYPES[mix];
    const totalParts = m.cement + m.sand + m.agg;
    // Dry volume ≈ wet volume × 1.54 (for compaction/voids)
    const dryVol = volM3 * 1.54 * (1 + parseFloat(wastePct) / 100);
    const cementVol = dryVol * (m.cement / totalParts);
    const sandVol   = dryVol * (m.sand   / totalParts);
    const aggVol    = dryVol * (m.agg    / totalParts);
    const cementKg  = cementVol * CEMENT_DENSITY_KG_M3;
    // 1 bag = 50 kg
    const bags50    = Math.ceil(cementKg / 50);

    setResult({ volM3, cementVol, sandVol, aggVol, cementKg, bags50 });
  }

  function reset() {
    setLength(''); setWidth(''); setDepth(''); setWastePct('10'); setErrors({}); setResult(null);
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
              {u === 'imperial' ? 'Imperial · ft & in' : 'Metric · m & cm'}
            </button>
          ))}
        </div>

        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Slab / pour dimensions
              </h2>
              <div className="field-row">
                <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="width"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width} />
              </div>
              <div className="field-row" style={{ marginTop: 12 }}>
                <F id="depth" label={`Depth / thickness (${depthLbl})`} val={depth} set={setDepth} err={errors.depth} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Concrete mix grade
              </h2>
              <div className="field">
                <label htmlFor="mix">Mix grade</label>
                <select id="mix" className="calc-select" value={mix}
                  onChange={e => { setMix(e.target.value); setResult(null); }}>
                  {Object.entries(MIX_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
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
              <span className="result-hero__label">Cement bags needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.bags50, 0) : '—'}</span>
                <span>bags (50 kg)</span>
              </div>
              <p className="result-hero__note">
                {result ? `Mix ${MIX_TYPES[mix].label} · includes ${wastePct}% waste` : 'Enter dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Pour volume</dt><dd className="numeral">{fmt(result.volM3, 3)} m³</dd></div>
                  <div className="breakdown-row"><dt>Cement required</dt><dd className="numeral">{fmt(result.cementKg, 0)} kg</dd></div>
                  <div className="breakdown-row total"><dt>50 kg bags</dt><dd className="numeral">{fmt(result.bags50, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Sand needed</dt><dd className="numeral">{fmt(result.sandVol, 3)} m³</dd></div>
                  <div className="breakdown-row"><dt>Aggregate needed</dt><dd className="numeral">{fmt(result.aggVol, 3)} m³</dd></div>
                </dl>
                <p className="disclaimer">Dry volume factor of 1.54 applied to account for void filling. Actual requirements vary with aggregate grading, moisture content and placement method.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
