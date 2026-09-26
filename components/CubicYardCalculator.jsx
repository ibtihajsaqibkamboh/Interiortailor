'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const SHAPES = {
  rectangular: 'Rectangular / Square',
  circular:    'Circular',
  triangular:  'Triangular',
};

export default function CubicYardCalculator() {
  const [unit, setUnit]     = useState('imperial');
  const [shape, setShape]   = useState('rectangular');
  const [dim1, setDim1]     = useState('');
  const [dim2, setDim2]     = useState('');
  const [depth, setDepth]   = useState('');
  const [wastePct, setWastePct] = useState('0');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const isM = unit === 'metric';
  const lenLbl   = isM ? 'm'  : 'ft';
  const depthLbl = isM ? 'cm' : 'in';

  function toFt(v)     { const n = parseFloat(v); return isM ? n * 3.28084 : n; }
  function depToFt(v)  { const n = parseFloat(v); return isM ? n / 30.48 : n / 12; }

  function validate() {
    const e = {};
    if (!dim1  || parseFloat(dim1)  <= 0) e.dim1  = 'Enter a value greater than 0.';
    if (shape !== 'circular' && (!dim2 || parseFloat(dim2) <= 0)) e.dim2 = 'Enter a value greater than 0.';
    if (!depth || parseFloat(depth) <= 0) e.depth = 'Enter a value greater than 0.';
    const w = parseFloat(wastePct);
    if (isNaN(w) || w < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const d1 = toFt(dim1);
    const d2 = shape !== 'circular' ? toFt(dim2) : 0;
    const dp = depToFt(depth);
    let areaFt2 = 0;

    if (shape === 'rectangular') areaFt2 = d1 * d2;
    else if (shape === 'circular') areaFt2 = Math.PI * (d1 / 2) ** 2;   // dim1 = diameter
    else if (shape === 'triangular') areaFt2 = 0.5 * d1 * d2;

    const volFt3  = areaFt2 * dp;
    const volYd3  = volFt3 / 27;
    const wasteF  = 1 + parseFloat(wastePct) / 100;
    const totalYd3 = volYd3 * wasteF;
    const totalM3  = totalYd3 * 0.764555;

    setResult({ areaFt2, volFt3, volYd3, totalYd3, totalM3 });
  }

  function reset() {
    setDim1(''); setDim2(''); setDepth(''); setWastePct('0'); setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, placeholder = '0' }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" inputMode="decimal" value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {err && <span className="field-error">{err}</span>}
      </div>
    );
  }

  const dim1Label = shape === 'circular' ? `Diameter (${lenLbl})` : `Length (${lenLbl})`;
  const dim2Label = shape === 'triangular' ? `Height of triangle (${lenLbl})` : `Width (${lenLbl})`;

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
                Shape
              </h2>
              <div className="field">
                <label htmlFor="shape">Area shape</label>
                <select id="shape" className="calc-select" value={shape}
                  onChange={e => { setShape(e.target.value); setDim1(''); setDim2(''); setErrors({}); setResult(null); }}>
                  {Object.entries(SHAPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Dimensions
              </h2>
              <div className="field-row">
                <F id="dim1" label={dim1Label} val={dim1} set={setDim1} err={errors.dim1} />
                {shape !== 'circular' && <F id="dim2" label={dim2Label} val={dim2} set={setDim2} err={errors.dim2} />}
              </div>
              <div className="field-row" style={{ marginTop: 12 }}>
                <F id="depth" label={`Depth / thickness (${depthLbl})`} val={depth} set={setDepth} err={errors.depth} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <F id="wastePct" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="0" />
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Volume</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalYd3) : '—'}</span>
                <span>yd³</span>
              </div>
              <p className="result-hero__note">
                {result ? `${fmt(result.totalM3)} m³` : 'Enter dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Area</dt><dd className="numeral">{fmt(result.areaFt2, 1)} sq ft</dd></div>
                  <div className="breakdown-row"><dt>Volume (cu ft)</dt><dd className="numeral">{fmt(result.volFt3, 2)} ft³</dd></div>
                  <div className="breakdown-row total"><dt>Volume (cubic yards)</dt><dd className="numeral">{fmt(result.totalYd3, 2)} yd³</dd></div>
                  <div className="breakdown-row"><dt>Volume (cubic meters)</dt><dd className="numeral">{fmt(result.totalM3, 2)} m³</dd></div>
                </dl>
                <p className="disclaimer">27 cubic feet = 1 cubic yard. Concrete, soil, gravel and mulch are commonly sold by the cubic yard.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
