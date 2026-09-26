'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const SHAPES = {
  rectangular: 'Rectangular / Square',
  cylinder:    'Cylinder',
  triangular:  'Triangular prism',
};

export default function CubicFeetCalculator() {
  const [shape, setShape]   = useState('rectangular');
  const [dim1, setDim1]     = useState('');
  const [dim2, setDim2]     = useState('');
  const [dim3, setDim3]     = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  function validate() {
    const e = {};
    if (!dim1 || parseFloat(dim1) <= 0) e.dim1 = 'Enter a value greater than 0.';
    if (shape !== 'cylinder' && (!dim2 || parseFloat(dim2) <= 0)) e.dim2 = 'Enter a value greater than 0.';
    if (!dim3 || parseFloat(dim3) <= 0) e.dim3 = 'Enter a value greater than 0.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const d1 = parseFloat(dim1);
    const d2 = shape !== 'cylinder' ? parseFloat(dim2) : 0;
    const d3 = parseFloat(dim3);
    let cuFt = 0;

    if (shape === 'rectangular') cuFt = d1 * d2 * d3;
    else if (shape === 'cylinder') cuFt = Math.PI * (d1 / 2) ** 2 * d3;   // d1 = diameter in ft
    else if (shape === 'triangular') cuFt = 0.5 * d1 * d2 * d3;

    const cuYd = cuFt / 27;
    const cuM  = cuFt * 0.0283168;
    const litres = cuFt * 28.3168;
    const gallons = cuFt * 7.48052;

    setResult({ cuFt, cuYd, cuM, litres, gallons });
  }

  function reset() {
    setDim1(''); setDim2(''); setDim3(''); setErrors({}); setResult(null);
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

  const labels = {
    rectangular: ['Length (ft)', 'Width (ft)', 'Height / Depth (ft)'],
    cylinder:    ['Diameter (ft)', null, 'Height / Length (ft)'],
    triangular:  ['Base (ft)', 'Triangle height (ft)', 'Length / Depth (ft)'],
  };

  const [l1, l2, l3] = labels[shape];

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Shape
              </h2>
              <div className="field">
                <label htmlFor="shape">Volume shape</label>
                <select id="shape" className="calc-select" value={shape}
                  onChange={e => { setShape(e.target.value); setDim1(''); setDim2(''); setDim3(''); setErrors({}); setResult(null); }}>
                  {Object.entries(SHAPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Dimensions (all in feet)
              </h2>
              <div className="field-row">
                <F id="dim1" label={l1} val={dim1} set={setDim1} err={errors.dim1} />
                {l2 && <F id="dim2" label={l2} val={dim2} set={setDim2} err={errors.dim2} />}
              </div>
              <div className="field-row" style={{ marginTop: 12 }}>
                <F id="dim3" label={l3} val={dim3} set={setDim3} err={errors.dim3} />
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
              <span className="result-hero__label">Volume</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.cuFt) : '—'}</span>
                <span>ft³</span>
              </div>
              <p className="result-hero__note">
                {result ? `${fmt(result.cuYd, 3)} yd³ · ${fmt(result.cuM, 3)} m³` : 'Enter dimensions in feet to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row total"><dt>Cubic feet</dt><dd className="numeral">{fmt(result.cuFt, 3)} ft³</dd></div>
                  <div className="breakdown-row"><dt>Cubic yards</dt><dd className="numeral">{fmt(result.cuYd, 3)} yd³</dd></div>
                  <div className="breakdown-row"><dt>Cubic meters</dt><dd className="numeral">{fmt(result.cuM, 3)} m³</dd></div>
                  <div className="breakdown-row"><dt>Litres</dt><dd className="numeral">{fmt(result.litres, 1)} L</dd></div>
                  <div className="breakdown-row"><dt>US Gallons</dt><dd className="numeral">{fmt(result.gallons, 1)} gal</dd></div>
                </dl>
                <p className="disclaimer">All dimensions must be entered in feet. Convert inches to feet by dividing by 12 before entering.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
