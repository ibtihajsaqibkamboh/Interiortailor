'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const SHAPES = [
  { val: 'rectangle', label: 'Rectangle / Square' },
  { val: 'circle',    label: 'Circle / Oval' },
  { val: 'lshape',   label: 'L-Shape' },
];

export default function PoolVolumeCalculator() {
  const [unit, setUnit]     = useState('metric');
  const [shape, setShape]   = useState('rectangle');
  // rectangle
  const [length, setLength] = useState('');
  const [width, setWidth]   = useState('');
  // circle
  const [diam, setDiam]     = useState('');
  // l-shape
  const [l1, setL1] = useState(''); const [w1, setW1] = useState('');
  const [l2, setL2] = useState(''); const [w2, setW2] = useState('');
  // common
  const [shallowEnd, setShallowEnd] = useState('');
  const [deepEnd, setDeepEnd]       = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const isImp = unit === 'imperial';
  const lenLbl = isImp ? 'ft' : 'm';
  const volLbl = isImp ? 'gallons' : 'litres';

  function toM(v) { const n = parseFloat(v); return isImp ? n * 0.3048 : n; }

  function validate() {
    const e = {};
    if (shape === 'rectangle') {
      if (!length || parseFloat(length) <= 0) e.length = 'Enter > 0.';
      if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter > 0.';
    } else if (shape === 'circle') {
      if (!diam || parseFloat(diam) <= 0) e.diam = 'Enter > 0.';
    } else {
      if (!l1||parseFloat(l1)<=0) e.l1='Enter > 0.'; if (!w1||parseFloat(w1)<=0) e.w1='Enter > 0.';
      if (!l2||parseFloat(l2)<=0) e.l2='Enter > 0.'; if (!w2||parseFloat(w2)<=0) e.w2='Enter > 0.';
    }
    if (!shallowEnd || parseFloat(shallowEnd) <= 0) e.shallowEnd = 'Enter > 0.';
    if (!deepEnd    || parseFloat(deepEnd)    <= 0) e.deepEnd    = 'Enter > 0.';
    if (parseFloat(deepEnd) < parseFloat(shallowEnd)) e.deepEnd = 'Deep end must be ≥ shallow end.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    let surfaceM2 = 0;
    if (shape === 'rectangle') surfaceM2 = toM(length) * toM(width);
    else if (shape === 'circle') { const r = toM(diam) / 2; surfaceM2 = Math.PI * r * r; }
    else surfaceM2 = toM(l1)*toM(w1) + toM(l2)*toM(w2);

    const avgDepthM = (toM(shallowEnd) + toM(deepEnd)) / 2;
    const volM3 = surfaceM2 * avgDepthM;
    const litres = volM3 * 1000;
    const gallons = litres * 0.264172;

    setResult({
      surfaceM2, avgDepthM, volM3,
      display: isImp ? gallons : litres,
      volLbl,
      altDisplay: isImp ? litres : gallons,
      altLbl: isImp ? 'litres' : 'gallons',
      pumpHrs: Math.ceil((volM3 * 1000) / 1500), // typical 1,500 L/hr pump turnover time
    });
  }

  function reset() {
    setLength(''); setWidth(''); setDiam('');
    setL1(''); setW1(''); setL2(''); setW2('');
    setShallowEnd(''); setDeepEnd('');
    setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, step='any', placeholder='' }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="number" inputMode="decimal" min="0" step={step} value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {err && <span className="field-error">{err}</span>}
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="units-toggle" role="radiogroup">
          {['metric','imperial'].map(u => (
            <button key={u} type="button" className={`unit-btn${unit===u?' is-active':''}`} aria-pressed={unit===u}
              onClick={() => { setUnit(u); reset(); }}>
              {u === 'metric' ? 'Metric · m & litres' : 'Imperial · ft & gallons'}
            </button>
          ))}
        </div>

        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3h-3a2 2 0 0 0-2 2v2"/></svg>
                Pool shape
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
                {shape === 'rectangle' && <><F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length}/><F id="width" label={`Width (${lenLbl})`} val={width} set={setWidth} err={errors.width}/></>}
                {shape === 'circle'    && <F id="diam" label={`Diameter (${lenLbl})`} val={diam} set={setDiam} err={errors.diam}/>}
                {shape === 'lshape'   && <><F id="l1" label={`Section 1 Length`} val={l1} set={setL1} err={errors.l1}/><F id="w1" label={`Section 1 Width`} val={w1} set={setW1} err={errors.w1}/><F id="l2" label={`Section 2 Length`} val={l2} set={setL2} err={errors.l2}/><F id="w2" label={`Section 2 Width`} val={w2} set={setW2} err={errors.w2}/></>}
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Depth ({lenLbl})
              </h2>
              <div className="field-row">
                <F id="shallowEnd" label={`Shallow end (${lenLbl})`} val={shallowEnd} set={setShallowEnd} err={errors.shallowEnd} placeholder={isImp ? '3.5' : '1.1'}/>
                <F id="deepEnd"    label={`Deep end (${lenLbl})`}    val={deepEnd}    set={setDeepEnd}    err={errors.deepEnd}    placeholder={isImp ? '8'   : '2.4'}/>
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
              <span className="result-hero__label">Pool volume</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.display, 0) : '—'}</span>
                <span>{result ? result.volLbl : volLbl}</span>
              </div>
              <p className="result-hero__note">{result ? `Also: ${fmt(result.altDisplay, 0)} ${result.altLbl}` : 'Enter pool dimensions to calculate volume.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Surface area</dt><dd className="numeral">{fmt(result.surfaceM2, 1)} m²</dd></div>
                  <div className="breakdown-row"><dt>Average depth</dt><dd className="numeral">{fmt(result.avgDepthM, 2)} m</dd></div>
                  <div className="breakdown-row"><dt>Volume (m³)</dt><dd className="numeral">{fmt(result.volM3, 2)}</dd></div>
                  <div className="breakdown-row total"><dt>Volume ({result.volLbl})</dt><dd className="numeral">{fmt(result.display, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Est. pump turnover (1,500 L/hr)</dt><dd className="numeral">{result.pumpHrs} hrs</dd></div>
                </dl>
                <p className="disclaimer">Volume is based on average depth using shallow and deep ends. Actual volume may vary with slope shape. Chemical dosing should be calculated by a pool professional.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
