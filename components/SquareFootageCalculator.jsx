'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const SHAPES = [
  { val: 'rectangle', label: 'Rectangle' },
  { val: 'circle',    label: 'Circle' },
  { val: 'triangle',  label: 'Triangle' },
  { val: 'trapezoid', label: 'Trapezoid' },
];

function calcArea(shape, vals) {
  const { l, w, r, b, h, a, b2 } = vals;
  switch (shape) {
    case 'rectangle':  return l * w;
    case 'circle':     return Math.PI * r * r;
    case 'triangle':   return 0.5 * b * h;
    case 'trapezoid':  return 0.5 * (a + b2) * h;
    default:           return 0;
  }
}

export default function SquareFootageCalculator() {
  const [unit, setUnit]   = useState('imperial'); // ft by default (sq footage)
  const [shape, setShape] = useState('rectangle');
  const [l, setL]   = useState('');
  const [w, setW]   = useState('');
  const [r, setR]   = useState('');
  const [b, setB]   = useState('');
  const [h, setH]   = useState('');
  const [a, setA]   = useState('');
  const [b2, setB2] = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';
  const areaLbl = isM ? 'm²' : 'sq ft';

  function toBase(v) { return parseFloat(v) || 0; }

  function validate() {
    const e = {};
    if (shape === 'rectangle') {
      if (!l || parseFloat(l) <= 0) e.l = 'Enter a value greater than 0.';
      if (!w || parseFloat(w) <= 0) e.w = 'Enter a value greater than 0.';
    } else if (shape === 'circle') {
      if (!r || parseFloat(r) <= 0) e.r = 'Enter a value greater than 0.';
    } else if (shape === 'triangle') {
      if (!b || parseFloat(b) <= 0) e.b = 'Enter a value greater than 0.';
      if (!h || parseFloat(h) <= 0) e.h = 'Enter a value greater than 0.';
    } else if (shape === 'trapezoid') {
      if (!a  || parseFloat(a)  <= 0) e.a  = 'Enter a value greater than 0.';
      if (!b2 || parseFloat(b2) <= 0) e.b2 = 'Enter a value greater than 0.';
      if (!h  || parseFloat(h)  <= 0) e.h  = 'Enter a value greater than 0.';
    }
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }
    const area = calcArea(shape, {
      l: toBase(l), w: toBase(w), r: toBase(r),
      b: toBase(b), h: toBase(h), a: toBase(a), b2: toBase(b2),
    });
    const areaAlt = isM ? area * 10.7639 : area / 10.7639;
    setResult({ area, areaAlt, areaLbl, altLbl: isM ? 'sq ft' : 'm²' });
  }

  function reset() {
    setL(''); setW(''); setR(''); setB(''); setH(''); setA(''); setB2('');
    setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="number" inputMode="decimal" min="0" step="any" value={val}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {err && <span className="field-error">{err}</span>}
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="units-toggle" role="radiogroup">
          {['imperial','metric'].map(u => (
            <button key={u} type="button" className={`unit-btn${unit===u?' is-active':''}`} aria-pressed={unit===u}
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
                Shape
              </h2>
              <div className="calc-shape-toggle" style={{ flexWrap:'wrap' }}>
                {SHAPES.map(s => (
                  <button key={s.val} type="button" className={`shape-btn${shape===s.val?' is-active':''}`}
                    onClick={() => { setShape(s.val); setErrors({}); setResult(null); }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9h18M9 21V9"/><rect x="3" y="3" width="18" height="18" rx="1.5"/></svg>
                Dimensions ({lenLbl})
              </h2>
              <div className="field-row">
                {shape === 'rectangle'  && <><F id="l" label={`Length (${lenLbl})`} val={l} set={setL} err={errors.l}/><F id="w" label={`Width (${lenLbl})`} val={w} set={setW} err={errors.w}/></>}
                {shape === 'circle'     && <F id="r" label={`Radius (${lenLbl})`} val={r} set={setR} err={errors.r}/>}
                {shape === 'triangle'   && <><F id="b" label={`Base (${lenLbl})`} val={b} set={setB} err={errors.b}/><F id="h" label={`Height (${lenLbl})`} val={h} set={setH} err={errors.h}/></>}
                {shape === 'trapezoid'  && <><F id="a" label={`Side A (${lenLbl})`} val={a} set={setA} err={errors.a}/><F id="b2" label={`Side B (${lenLbl})`} val={b2} set={setB2} err={errors.b2}/><F id="h" label={`Height (${lenLbl})`} val={h} set={setH} err={errors.h}/></>}
              </div>
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob"/>
              <span className="result-hero__label">Total area</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.area) : '—'}</span>
                <span>{result ? result.areaLbl : areaLbl}</span>
              </div>
              <p className="result-hero__note">{result ? `Also: ${fmt(result.areaAlt)} ${result.altLbl}` : 'Enter dimensions to calculate area.'}</p>
            </div>
            {result && (
              <dl className="breakdown">
                <div className="breakdown-row"><dt>Area ({result.areaLbl})</dt><dd className="numeral">{fmt(result.area)}</dd></div>
                <div className="breakdown-row total"><dt>Area ({result.altLbl})</dt><dd className="numeral">{fmt(result.areaAlt)}</dd></div>
              </dl>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
