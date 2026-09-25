'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const MATERIALS = {
  pressure_treated: { label: 'Pressure-treated wood',  costPerSqFt: 15 },
  cedar:            { label: 'Cedar',                   costPerSqFt: 22 },
  composite:        { label: 'Composite decking',       costPerSqFt: 35 },
  pvc:              { label: 'PVC / vinyl decking',     costPerSqFt: 40 },
  hardwood:         { label: 'Tropical hardwood (Ipe)', costPerSqFt: 55 },
};

export default function DeckCostCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [length, setLength]     = useState('');
  const [width, setWidth]       = useState('');
  const [material, setMaterial] = useState('pressure_treated');
  const [laborPct, setLaborPct] = useState('50');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';
  const areaLbl = isM ? 'm²' : 'sq ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter a value greater than 0.';
    const lp = parseFloat(laborPct), wp = parseFloat(wastePct);
    if (isNaN(lp) || lp < 0) e.laborPct = 'Enter 0 or more.';
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const lFt = toFt(length), wFt = toFt(width);
    const areaFt2 = lFt * wFt;
    const areaDisplay = isM ? areaFt2 / 10.7639 : areaFt2;
    const mat = MATERIALS[material];
    const costPerFt2 = mat.costPerSqFt;
    const wasteF = 1 + parseFloat(wastePct) / 100;
    const materialCost = areaFt2 * costPerFt2 * wasteF;
    const laborCost = materialCost * (parseFloat(laborPct) / 100);
    const totalCost = materialCost + laborCost;
    const boardFt = areaFt2 * 1.1;  // approx board feet at 1×6

    setResult({ areaDisplay, areaLbl, materialCost, laborCost, totalCost, boardFt,
      matLabel: mat.label, costPerFt2 });
  }

  function reset() {
    setLength(''); setWidth(''); setLaborPct('50'); setWastePct('10');
    setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, step='any', placeholder='0' }) {
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
                Deck dimensions
              </h2>
              <div className="field-row">
                <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length}/>
                <F id="width"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width}/>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l9-9 9 9M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9"/></svg>
                Decking material
              </h2>
              <div className="field">
                <label htmlFor="deckMat">Material type</label>
                <select id="deckMat" className="calc-select" value={material}
                  onChange={e => { setMaterial(e.target.value); setResult(null); }}>
                  {Object.entries(MATERIALS).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg>
                Cost factors
              </h2>
              <div className="field-row">
                <F id="wastePct" label="Material waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} step="1" placeholder="10"/>
                <F id="laborPct" label="Labor (% of material)" val={laborPct} set={setLaborPct} err={errors.laborPct} step="1" placeholder="50"/>
              </div>
              <p className="group-hint">Labor % is relative to material cost. Adjust to match your local rates.</p>
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
              <p className="result-hero__note">{result ? `${result.matLabel} · ${fmt(result.areaDisplay, 1)} ${result.areaLbl}` : 'Enter dimensions to see estimate.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Deck area</dt><dd className="numeral">{fmt(result.areaDisplay, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row"><dt>Material rate</dt><dd className="numeral">${fmt(result.costPerFt2)}/sq ft</dd></div>
                  <div className="breakdown-row"><dt>Material cost (inc. waste)</dt><dd className="numeral">${fmt(result.materialCost, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Estimated labor</dt><dd className="numeral">${fmt(result.laborCost, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Total estimate</dt><dd className="numeral">${fmt(result.totalCost, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Approx. board feet</dt><dd className="numeral">{fmt(result.boardFt, 0)} bf</dd></div>
                </dl>
                <p className="disclaimer">Material rates are indicative averages for North America. Actual costs vary significantly by region, supplier and project complexity. Always get contractor quotes before starting.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
