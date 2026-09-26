'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const FENCE_TYPES = {
  wood_privacy: { label: 'Wood privacy fence (6 ft)',   costPerLf: 28 },
  wood_picket:  { label: 'Wood picket fence (4 ft)',    costPerLf: 18 },
  chain_link:   { label: 'Chain-link fence',             costPerLf: 14 },
  vinyl:        { label: 'Vinyl fence',                  costPerLf: 35 },
  aluminum:     { label: 'Aluminum fence',               costPerLf: 30 },
  split_rail:   { label: 'Split-rail (2-rail)',          costPerLf: 12 },
};

export default function FenceCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [perimeter, setPerimeter] = useState('');
  const [gateCount, setGateCount] = useState('1');
  const [postSpacing, setPostSpacing] = useState('8');
  const [fenceType, setFenceType] = useState('wood_privacy');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (!perimeter || parseFloat(perimeter) <= 0) e.perimeter = 'Enter a value greater than 0.';
    const gc = parseFloat(gateCount), ps = parseFloat(postSpacing);
    if (isNaN(gc) || gc < 0) e.gateCount = 'Enter 0 or more.';
    if (isNaN(ps) || ps <= 0) e.postSpacing = 'Enter a value greater than 0.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const lf = toFt(perimeter);
    const ps = toFt(postSpacing);
    const gc = parseInt(gateCount) || 0;
    const posts = Math.ceil(lf / ps) + 1 + gc;
    const linearFt = lf;
    const rails = Math.ceil(lf / ps) * 2; // 2 rails per span
    const mat = FENCE_TYPES[fenceType];
    const materialCost = linearFt * mat.costPerLf;
    const laborCost = materialCost * 0.4;
    const totalCost = materialCost + laborCost;
    const gateCost = gc * 150; // avg gate ~$150

    setResult({ linearFt: isM ? lf / 3.28084 : lf, lenLbl: isM ? 'm' : 'ft',
      posts, rails, materialCost, laborCost, gateCost, totalCost: totalCost + gateCost, matLabel: mat.label });
  }

  function reset() {
    setPerimeter(''); setGateCount('1'); setPostSpacing('8');
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
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                Fence line
              </h2>
              <div className="field-row">
                <F id="perimeter"   label={`Total fence length (${lenLbl})`} val={perimeter}   set={setPerimeter}   err={errors.perimeter}/>
                <F id="postSpacing" label={`Post spacing (${lenLbl})`}       val={postSpacing} set={setPostSpacing} err={errors.postSpacing} placeholder={isM ? '2.4' : '8'}/>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
                Gates & material
              </h2>
              <div className="field-row">
                <F id="gateCount" label="Number of gates" val={gateCount} set={setGateCount} err={errors.gateCount} placeholder="1"/>
              </div>
              <div className="field" style={{ marginTop: '12px' }}>
                <label htmlFor="fenceType">Fence type</label>
                <select id="fenceType" className="calc-select" value={fenceType}
                  onChange={e => { setFenceType(e.target.value); setResult(null); }}>
                  {Object.entries(FENCE_TYPES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
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
              <span className="result-hero__label">Estimated total cost</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? `$${fmt(result.totalCost, 0)}` : '—'}</span>
              </div>
              <p className="result-hero__note">{result ? `${result.matLabel} · ${fmt(result.linearFt, 1)} ${result.lenLbl}` : 'Enter fence dimensions to see estimate.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Fence length</dt><dd className="numeral">{fmt(result.linearFt, 1)} {result.lenLbl}</dd></div>
                  <div className="breakdown-row"><dt>Posts needed</dt><dd className="numeral">{result.posts}</dd></div>
                  <div className="breakdown-row"><dt>Rails needed</dt><dd className="numeral">{result.rails}</dd></div>
                  <div className="breakdown-row"><dt>Material cost</dt><dd className="numeral">${fmt(result.materialCost, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Labor (est. 40%)</dt><dd className="numeral">${fmt(result.laborCost, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Gates (est.)</dt><dd className="numeral">${fmt(result.gateCost, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Total estimate</dt><dd className="numeral">${fmt(result.totalCost, 0)}</dd></div>
                </dl>
                <p className="disclaimer">Cost rates are North American averages. Labor at 40% of material cost is an estimate — actual rates vary widely by region and contractor. Gate cost assumes ~$150 per gate installed.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
