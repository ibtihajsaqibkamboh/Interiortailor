'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const SHAPES = {
  rectangular: 'Rectangular',
  oval:        'Oval / Elliptical',
  circular:    'Round / Circular',
  kidney:      'Kidney (approximate)',
};

// 1 cu ft = 7.48052 US gallons
const CUFT_TO_GAL = 7.48052;

export default function PoolGallonCalculator() {
  const [unit, setUnit]     = useState('imperial');
  const [shape, setShape]   = useState('rectangular');
  const [dim1, setDim1]     = useState('');
  const [dim2, setDim2]     = useState('');
  const [shallowD, setShallowD] = useState('');
  const [deepD, setDeepD]   = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const isM = unit === 'metric';
  const lenLbl   = isM ? 'm' : 'ft';
  const depthLbl = isM ? 'm' : 'ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (!dim1    || parseFloat(dim1)    <= 0) e.dim1    = 'Enter a value greater than 0.';
    if (shape !== 'circular' && (!dim2 || parseFloat(dim2) <= 0)) e.dim2 = 'Enter a value greater than 0.';
    if (!shallowD || parseFloat(shallowD) <= 0) e.shallowD = 'Enter a value greater than 0.';
    if (!deepD    || parseFloat(deepD)    <= 0) e.deepD    = 'Enter a value greater than 0.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const d1  = toFt(dim1);
    const d2  = shape !== 'circular' ? toFt(dim2) : 0;
    const sd  = toFt(shallowD);
    const dd  = toFt(deepD);
    const avgD = (sd + dd) / 2;

    let areaFt2 = 0;
    if (shape === 'rectangular') areaFt2 = d1 * d2;
    else if (shape === 'oval')   areaFt2 = Math.PI * (d1 / 2) * (d2 / 2);
    else if (shape === 'circular') areaFt2 = Math.PI * (d1 / 2) ** 2;
    else if (shape === 'kidney')   areaFt2 = d1 * d2 * 0.82; // kidney ≈ 82% of bounding rect

    const volCuFt = areaFt2 * avgD;
    const gallons = volCuFt * CUFT_TO_GAL;
    const litres  = gallons * 3.78541;

    setResult({ areaFt2, volCuFt, gallons, litres });
  }

  function reset() {
    setDim1(''); setDim2(''); setShallowD(''); setDeepD(''); setErrors({}); setResult(null);
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
    rectangular: ['Length', 'Width'],
    oval:        ['Long axis (diameter)', 'Short axis (diameter)'],
    circular:    ['Diameter', null],
    kidney:      ['Longest dimension', 'Widest dimension'],
  };
  const [l1, l2] = labels[shape];

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
          <section className="panel panel--inputs" aria-label="Pool details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Pool shape
              </h2>
              <div className="field">
                <label htmlFor="shape">Shape</label>
                <select id="shape" className="calc-select" value={shape}
                  onChange={e => { setShape(e.target.value); setDim1(''); setDim2(''); setErrors({}); setResult(null); }}>
                  {Object.entries(SHAPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Pool dimensions ({lenLbl})
              </h2>
              <div className="field-row">
                <F id="dim1" label={`${l1} (${lenLbl})`} val={dim1} set={setDim1} err={errors.dim1} />
                {l2 && <F id="dim2" label={`${l2} (${lenLbl})`} val={dim2} set={setDim2} err={errors.dim2} />}
              </div>
              <div className="field-row" style={{ marginTop: 12 }}>
                <F id="shallowD" label={`Shallow end depth (${depthLbl})`} val={shallowD} set={setShallowD} err={errors.shallowD} placeholder={isM ? '1.0' : '3.5'} />
                <F id="deepD"    label={`Deep end depth (${depthLbl})`}    val={deepD}    set={setDeepD}    err={errors.deepD}    placeholder={isM ? '1.8' : '6.0'} />
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
              <span className="result-hero__label">Pool volume</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.gallons, 0) : '—'}</span>
                <span>US gallons</span>
              </div>
              <p className="result-hero__note">
                {result ? `${fmt(result.litres, 0)} litres` : 'Enter pool dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Surface area</dt><dd className="numeral">{fmt(result.areaFt2, 0)} sq ft</dd></div>
                  <div className="breakdown-row"><dt>Volume</dt><dd className="numeral">{fmt(result.volCuFt, 0)} cu ft</dd></div>
                  <div className="breakdown-row total"><dt>US gallons</dt><dd className="numeral">{fmt(result.gallons, 0)} gal</dd></div>
                  <div className="breakdown-row"><dt>Litres</dt><dd className="numeral">{fmt(result.litres, 0)} L</dd></div>
                </dl>
                <p className="disclaimer">Kidney shape estimate uses an 82% bounding rectangle factor. Actual volume may vary. Use an accurate water meter when filling for chemical dosing precision.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
