'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const BLOCK_TYPES = {
  standard:  { label: 'Standard CMU (16×8×8 in)',   lIn: 16, hIn: 8,  mortar: 0.375 },
  half:      { label: 'Half CMU (8×8×8 in)',         lIn: 8,  hIn: 8,  mortar: 0.375 },
  solid4:    { label: 'Solid block 4 in (16×4×8 in)',lIn: 16, hIn: 4,  mortar: 0.375 },
  split6:    { label: 'Split-face (16×6×8 in)',      lIn: 16, hIn: 6,  mortar: 0.375 },
  solid6:    { label: 'Solid block 6 in (16×6×8 in)',lIn: 16, hIn: 6,  mortar: 0.375 },
};

export default function BlockCalculator() {
  const [unit, setUnit]           = useState('imperial');
  const [length, setLength]       = useState('');
  const [height, setHeight]       = useState('');
  const [blockType, setBlockType] = useState('standard');
  const [wastePct, setWastePct]   = useState('5');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

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

    const bt = BLOCK_TYPES[blockType];
    const wallAreaFt2 = toFt(length) * toFt(height);
    const blockFaceInch2 = (bt.lIn + bt.mortar) * (bt.hIn + bt.mortar);
    const blockFaceFt2 = blockFaceInch2 / 144;
    const baseBlocks = wallAreaFt2 / blockFaceFt2;
    const wasteF = 1 + parseFloat(wastePct) / 100;
    const totalBlocks = Math.ceil(baseBlocks * wasteF);
    const areaDisplay = isM ? wallAreaFt2 / 10.7639 : wallAreaFt2;
    // bags of mortar: roughly 1 bag per 3-4 blocks for CMU
    const mortarBags = Math.ceil(totalBlocks / 3.5);

    setResult({ areaDisplay, baseBlocks: Math.ceil(baseBlocks), totalBlocks, mortarBags });
  }

  function reset() {
    setLength(''); setHeight(''); setWastePct('5'); setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, placeholder = '0' }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="number" inputMode="decimal" min="0" step="any" value={val} placeholder={placeholder}
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
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Wall dimensions
              </h2>
              <div className="field-row">
                <F id="length" label={`Wall length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="height" label={`Wall height (${lenLbl})`} val={height} set={setHeight} err={errors.height} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="5" rx="1"/><rect x="2" y="14" width="20" height="5" rx="1"/></svg>
                Block type
              </h2>
              <div className="field">
                <label htmlFor="blockType">Block size</label>
                <select id="blockType" className="calc-select" value={blockType}
                  onChange={e => { setBlockType(e.target.value); setResult(null); }}>
                  {Object.entries(BLOCK_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <F id="wastePct" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="5" />
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Blocks needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalBlocks, 0) : '—'}</span>
                <span>blocks</span>
              </div>
              <p className="result-hero__note">
                {result ? `Includes ${wastePct}% waste allowance` : 'Enter wall dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Wall area</dt><dd className="numeral">{fmt(result.areaDisplay, 1)} {isM ? 'm²' : 'sq ft'}</dd></div>
                  <div className="breakdown-row"><dt>Blocks (no waste)</dt><dd className="numeral">{fmt(result.baseBlocks, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Blocks incl. waste</dt><dd className="numeral">{fmt(result.totalBlocks, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Mortar bags (est.)</dt><dd className="numeral">~{result.mortarBags} bags</dd></div>
                </dl>
                <p className="disclaimer">Mortar estimate is approximate (1 bag per ~3.5 blocks). Deduct openings (doors, windows) manually before ordering.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
