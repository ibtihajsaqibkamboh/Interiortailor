'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

export default function TopsoilCalculator() {
  const [unit, setUnit]         = useState('metric');
  const [length, setLength]     = useState('');
  const [width, setWidth]       = useState('');
  const [depth, setDepth]       = useState('');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isImp = unit === 'imperial';
  const lenLbl   = isImp ? 'ft'  : 'm';
  const depthLbl = isImp ? 'in'  : 'cm';
  const volLbl   = isImp ? 'yd³' : 'm³';
  const weightLbl= isImp ? 'lb'  : 'kg';

  function toM(v)   { const n = parseFloat(v); return isImp ? n * 0.3048  : n; }
  function dToM(v)  { const n = parseFloat(v); return isImp ? n * 0.0254  : n / 100; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter a value greater than 0.';
    if (!depth  || parseFloat(depth)  <= 0) e.depth  = 'Enter a value greater than 0.';
    const wp = parseFloat(wastePct);
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const lM = toM(length), wM = toM(width), dM = dToM(depth);
    const volM3 = lM * wM * dM;
    const wp = parseFloat(wastePct);
    const totalM3 = volM3 * (1 + wp / 100);
    const weightKg = totalM3 * 1200; // ~1200 kg/m³ typical topsoil
    const bags40L = Math.ceil((totalM3 * 1000) / 40);

    const vF = isImp ? 1.30795 : 1;
    const wF = isImp ? 2.20462 : 1;
    setResult({
      vol: volM3 * vF, total: totalM3 * vF, weight: weightKg * wF,
      bags40L, volLbl, weightLbl,
    });
  }

  function reset() {
    setLength(''); setWidth(''); setDepth(''); setWastePct('10');
    setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, step='any', placeholder='0' }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" inputMode="decimal" value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {err && <span className="field-error">{err}</span>}
      </div>
    );
  }

  const depthPresets = isImp
    ? [{ l: '2 in',  v: '2' }, { l: '4 in', v: '4' }, { l: '6 in', v: '6' }]
    : [{ l: '5 cm',  v: '5' }, { l: '10 cm', v: '10' }, { l: '15 cm', v: '15' }];

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="units-toggle" role="radiogroup">
          {['metric','imperial'].map(u => (
            <button key={u} type="button" className={`unit-btn${unit===u?' is-active':''}`} aria-pressed={unit===u}
              onClick={() => { setUnit(u); reset(); }}>
              {u === 'metric' ? 'Metric · m & cm' : 'Imperial · ft & in'}
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
                <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length}/>
                <F id="width"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width}/>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Depth
              </h2>
              <div className="field-row">
                <F id="depth" label={`Depth (${depthLbl})`} val={depth} set={setDepth} err={errors.depth} placeholder={isImp ? 'e.g. 4' : 'e.g. 10'}/>
              </div>
              <div className="calc-presets">
                {depthPresets.map(p => (
                  <button key={p.l} type="button" className="preset-btn"
                    onClick={() => { setDepth(p.v); setErrors(ep => ({ ...ep, depth: undefined })); setResult(null); }}>
                    {p.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <div className="field-row">
                <F id="wastePct" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="10"/>
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
              <span className="result-hero__label">Total topsoil needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.total) : '—'}</span>
                <span>{result ? result.volLbl : volLbl}</span>
              </div>
              <p className="result-hero__note">{result ? `Includes ${wastePct}% waste.` : 'Enter dimensions to see estimate.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Net volume</dt><dd className="numeral">{fmt(result.vol)} {result.volLbl}</dd></div>
                  <div className="breakdown-row total"><dt>Total to order</dt><dd className="numeral">{fmt(result.total)} {result.volLbl}</dd></div>
                  <div className="breakdown-row"><dt>Estimated weight</dt><dd className="numeral">{fmt(result.weight, 0)} {result.weightLbl}</dd></div>
                  <div className="breakdown-row"><dt>Approx. 40 L bags</dt><dd className="numeral">{result.bags40L}</dd></div>
                </dl>
                <p className="disclaimer">Weight based on ~1,200 kg/m³ typical bulk topsoil density. Actual density varies by composition and moisture. Confirm with your supplier.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
