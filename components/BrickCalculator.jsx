'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const BRICK_TYPES = {
  standard:   { label: 'Standard (7⅝×3⅝×2¼ in)',  lIn: 7.625, hIn: 2.25,  mortar: 0.375 },
  modular:    { label: 'Modular (7⅝×3⅝×2¼ in)',   lIn: 7.625, hIn: 2.25,  mortar: 0.375 },
  queen:      { label: 'Queen (9⅝×3⅛×2¾ in)',      lIn: 9.625, hIn: 2.75,  mortar: 0.375 },
  king:       { label: 'King (9⅝×2¾×2¾ in)',        lIn: 9.625, hIn: 2.75,  mortar: 0.5   },
  engineer:   { label: 'Engineer (7⅝×3⅝×2¾ in)',   lIn: 7.625, hIn: 2.75,  mortar: 0.375 },
};

export default function BrickCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [length, setLength]     = useState('');
  const [height, setHeight]     = useState('');
  const [brickType, setBrickType] = useState('standard');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (!length  || parseFloat(length)  <= 0) e.length  = 'Enter a value greater than 0.';
    if (!height  || parseFloat(height)  <= 0) e.height  = 'Enter a value greater than 0.';
    const w = parseFloat(wastePct);
    if (isNaN(w) || w < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const bt = BRICK_TYPES[brickType];
    const wallAreaFt2 = toFt(length) * toFt(height);
    // brick face area in sq ft including mortar joint
    const brickFaceInch2 = (bt.lIn + bt.mortar) * (bt.hIn + bt.mortar);
    const brickFaceFt2 = brickFaceInch2 / 144;
    const baseBricks = wallAreaFt2 / brickFaceFt2;
    const wasteF = 1 + parseFloat(wastePct) / 100;
    const totalBricks = Math.ceil(baseBricks * wasteF);
    const areaDisplay = isM ? wallAreaFt2 / 10.7639 : wallAreaFt2;

    setResult({ areaDisplay, baseBricks: Math.ceil(baseBricks), totalBricks });
  }

  function reset() {
    setLength(''); setHeight(''); setWastePct('10'); setErrors({}); setResult(null);
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
              {u === 'imperial' ? 'Imperial · ft' : 'Metric · m'}
            </button>
          ))}
        </div>

        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="7" width="18" height="4" rx="1"/><rect x="3" y="13" width="18" height="4" rx="1"/></svg>
                Wall dimensions
              </h2>
              <div className="field-row">
                <F id="length" label={`Wall length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="height" label={`Wall height (${lenLbl})`} val={height} set={setHeight} err={errors.height} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Brick type
              </h2>
              <div className="field">
                <label htmlFor="brickType">Brick size</label>
                <select id="brickType" className="calc-select" value={brickType}
                  onChange={e => { setBrickType(e.target.value); setResult(null); }}>
                  {Object.entries(BRICK_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
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
              <span className="result-hero__label">Bricks needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalBricks, 0) : '—'}</span>
                <span>bricks</span>
              </div>
              <p className="result-hero__note">
                {result ? `Includes ${wastePct}% waste allowance` : 'Enter wall dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Wall area</dt><dd className="numeral">{fmt(result.areaDisplay, 1)} {isM ? 'm²' : 'sq ft'}</dd></div>
                  <div className="breakdown-row"><dt>Bricks (no waste)</dt><dd className="numeral">{fmt(result.baseBricks, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Bricks incl. waste</dt><dd className="numeral">{fmt(result.totalBricks, 0)}</dd></div>
                </dl>
                <p className="disclaimer">Estimate assumes a single-wythe wall. For double-wythe or cavity walls, multiply accordingly. Deduct openings manually.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
