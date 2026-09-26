'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const REBAR_SIZES = {
  '#3': { label: '#3 (3/8 in)', lbPerFt: 0.376, mmDia: 9.5  },
  '#4': { label: '#4 (1/2 in)', lbPerFt: 0.668, mmDia: 12.7 },
  '#5': { label: '#5 (5/8 in)', lbPerFt: 1.043, mmDia: 15.9 },
  '#6': { label: '#6 (3/4 in)', lbPerFt: 1.502, mmDia: 19.1 },
  '#7': { label: '#7 (7/8 in)', lbPerFt: 2.044, mmDia: 22.2 },
  '#8': { label: '#8 (1 in)',   lbPerFt: 2.670, mmDia: 25.4 },
};

export default function RebarCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [length, setLength]     = useState('');
  const [width, setWidth]       = useState('');
  const [spacing, setSpacing]   = useState('12');
  const [overlap, setOverlap]   = useState('6');
  const [size, setSize]         = useState('#4');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isM = unit === 'metric';
  const lenLbl  = isM ? 'm'  : 'ft';
  const spaceLbl = isM ? 'cm' : 'in';

  function toFt(v)     { const n = parseFloat(v); return isM ? n * 3.28084 : n; }
  function spaceToFt(v){ const n = parseFloat(v); return isM ? n / 30.48 : n / 12; }

  function validate() {
    const e = {};
    if (!length  || parseFloat(length)  <= 0) e.length  = 'Enter a value greater than 0.';
    if (!width   || parseFloat(width)   <= 0) e.width   = 'Enter a value greater than 0.';
    if (!spacing || parseFloat(spacing) <= 0) e.spacing = 'Enter a value greater than 0.';
    if (!overlap || parseFloat(overlap) < 0)  e.overlap = 'Enter 0 or more.';
    const w = parseFloat(wastePct);
    if (isNaN(w) || w < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const lFt = toFt(length);
    const wFt = toFt(width);
    const sFt = spaceToFt(spacing);
    const oFt = spaceToFt(overlap);

    // bars running in length direction (spaced along width)
    const barsAlongW = Math.ceil(wFt / sFt) + 1;
    const lengthBarsLF = barsAlongW * (lFt + oFt);
    // bars running in width direction
    const barsAlongL = Math.ceil(lFt / sFt) + 1;
    const widthBarsLF = barsAlongL * (wFt + oFt);

    const totalLF = (lengthBarsLF + widthBarsLF) * (1 + parseFloat(wastePct) / 100);
    const rb = REBAR_SIZES[size];
    const weightLb = totalLF * rb.lbPerFt;
    const weightKg = weightLb * 0.453592;
    // standard 20-ft bar
    const bars20ft = Math.ceil(totalLF / 20);

    setResult({ totalLF, weightLb, weightKg, bars20ft, barsAlongW, barsAlongL });
  }

  function reset() {
    setLength(''); setWidth(''); setSpacing('12'); setOverlap('6'); setWastePct('10'); setErrors({}); setResult(null);
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
                Slab / pour area
              </h2>
              <div className="field-row">
                <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="width"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Rebar layout
              </h2>
              <div className="field-row">
                <F id="spacing" label={`Bar spacing (${spaceLbl})`} val={spacing} set={setSpacing} err={errors.spacing} placeholder={isM ? '30' : '12'} />
                <F id="overlap" label={`Lap splice (${spaceLbl})`}  val={overlap}  set={setOverlap}  err={errors.overlap}  placeholder={isM ? '15' : '6'} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/></svg>
                Rebar size
              </h2>
              <div className="field">
                <label htmlFor="size">Bar size</label>
                <select id="size" className="calc-select" value={size}
                  onChange={e => { setSize(e.target.value); setResult(null); }}>
                  {Object.entries(REBAR_SIZES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
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
              <span className="result-hero__label">Total rebar length</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalLF, 0) : '—'}</span>
                <span>linear ft</span>
              </div>
              <p className="result-hero__note">
                {result ? `${size} bar · includes ${wastePct}% waste` : 'Enter slab dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Bars along length</dt><dd className="numeral">{fmt(result.barsAlongL, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Bars along width</dt><dd className="numeral">{fmt(result.barsAlongW, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Total linear ft</dt><dd className="numeral">{fmt(result.totalLF, 0)} ft</dd></div>
                  <div className="breakdown-row"><dt>20 ft bars needed</dt><dd className="numeral">{fmt(result.bars20ft, 0)} bars</dd></div>
                  <div className="breakdown-row"><dt>Estimated weight</dt><dd className="numeral">{fmt(result.weightLb, 0)} lb / {fmt(result.weightKg, 0)} kg</dd></div>
                </dl>
                <p className="disclaimer">Grid pattern assumed with equal spacing both ways. Consult a structural engineer for actual rebar specifications and required lap lengths.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
