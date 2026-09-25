'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Pitch multipliers: flat area × multiplier = sloped area
// multiplier = √(1 + (rise/12)²) for 12" run
function pitchMultiplier(rise) {
  return Math.sqrt(1 + (rise / 12) ** 2);
}

const ROOFING_TYPES = {
  shingles3tab:  { label: '3-Tab Asphalt Shingles',    costPerSq: 90  },
  shinglesArch:  { label: 'Architectural Shingles',    costPerSq: 130 },
  metalStanding: { label: 'Standing-seam Metal',       costPerSq: 400 },
  metalPanel:    { label: 'Metal Panels',              costPerSq: 250 },
  tile:          { label: 'Concrete / Clay Tile',      costPerSq: 350 },
  slate:         { label: 'Slate',                     costPerSq: 700 },
  tpo:           { label: 'TPO (flat roof)',            costPerSq: 200 },
};

export default function RoofingCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [length, setLength]     = useState('');
  const [width, setWidth]       = useState('');
  const [pitch, setPitch]       = useState('6');
  const [material, setMaterial] = useState('shinglesArch');
  const [wastePct, setWastePct] = useState('15');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter a value greater than 0.';
    const p = parseFloat(pitch), wp = parseFloat(wastePct);
    if (isNaN(p) || p < 0 || p > 24) e.pitch = 'Enter a pitch from 0 to 24.';
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const lFt = toFt(length), wFt = toFt(width);
    const flatAreaFt2 = lFt * wFt;
    const pm = pitchMultiplier(parseFloat(pitch));
    const slopedAreaFt2 = flatAreaFt2 * pm;
    const wasteF = 1 + parseFloat(wastePct) / 100;
    const totalAreaFt2 = slopedAreaFt2 * wasteF;
    const squares = totalAreaFt2 / 100; // 1 roofing square = 100 sq ft
    const bundlesNeeded = Math.ceil(squares * 3); // ~3 bundles per square
    const mat = ROOFING_TYPES[material];
    const materialCost = squares * mat.costPerSq;

    setResult({
      flatAreaFt2, slopedAreaFt2, totalAreaFt2,
      squares, bundlesNeeded, materialCost,
      pitchRise: parseFloat(pitch), pm,
      matLabel: mat.label,
    });
  }

  function reset() {
    setLength(''); setWidth(''); setPitch('6'); setWastePct('15');
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

  const pitchPresets = [2,4,6,8,10,12];

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
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l9-9 9 9M5 10v9h14V10"/></svg>
                Roof footprint (ground-level)
              </h2>
              <div className="field-row">
                <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length}/>
                <F id="width"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width}/>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 20l9-16 9 16"/></svg>
                Roof pitch (rise per 12&quot; run)
              </h2>
              <div className="field-row">
                <F id="pitch" label="Pitch (rise)" val={pitch} set={setPitch} err={errors.pitch} step="0.5" placeholder="6"/>
              </div>
              <div className="calc-presets">
                {pitchPresets.map(p => (
                  <button key={p} type="button" className="preset-btn"
                    onClick={() => { setPitch(String(p)); setErrors(ep => ({ ...ep, pitch: undefined })); setResult(null); }}>
                    {p}/12
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                Roofing material
              </h2>
              <div className="field">
                <label htmlFor="roofMat">Material</label>
                <select id="roofMat" className="calc-select" value={material}
                  onChange={e => { setMaterial(e.target.value); setResult(null); }}>
                  {Object.entries(ROOFING_TYPES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste / cut allowance
              </h2>
              <div className="field-row">
                <F id="wastePct" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} step="1" placeholder="15"/>
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
              <span className="result-hero__label">Roofing squares needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.squares, 1) : '—'}</span>
                <span>sq</span>
              </div>
              <p className="result-hero__note">{result ? `${result.matLabel} · pitch ${result.pitchRise}/12` : 'Enter dimensions to see estimate.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Flat footprint area</dt><dd className="numeral">{fmt(result.flatAreaFt2, 0)} sq ft</dd></div>
                  <div className="breakdown-row"><dt>Pitch multiplier</dt><dd className="numeral">×{fmt(result.pm, 3)}</dd></div>
                  <div className="breakdown-row"><dt>Sloped roof area</dt><dd className="numeral">{fmt(result.slopedAreaFt2, 0)} sq ft</dd></div>
                  <div className="breakdown-row"><dt>With waste</dt><dd className="numeral">{fmt(result.totalAreaFt2, 0)} sq ft</dd></div>
                  <div className="breakdown-row total"><dt>Roofing squares</dt><dd className="numeral">{fmt(result.squares, 1)}</dd></div>
                  <div className="breakdown-row"><dt>Shingle bundles (est.)</dt><dd className="numeral">{result.bundlesNeeded}</dd></div>
                  <div className="breakdown-row"><dt>Material cost estimate</dt><dd className="numeral">${fmt(result.materialCost, 0)}</dd></div>
                </dl>
                <p className="disclaimer">1 roofing square = 100 sq ft. Bundle count assumes 3 bundles per square for standard shingles. Material costs are indicative — confirm with your supplier.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
