'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Grout formula (lbs per sq ft):
// (TileWidth + TileHeight) / (TileWidth × TileHeight) × JointWidth × DepthFactor × 1.5
// Where DepthFactor ≈ tile thickness × 0.9 (accounts for 90% fill)
// We use a simplified industry formula
function calcGrout({ areaFt2, tileW, tileH, jointW, tileThick, groutDensity }) {
  // All in inches
  const coverage = (tileW + tileH) / (tileW * tileH) * jointW * tileThick * 0.9 * groutDensity;
  const lbsPerSqFt = coverage / 144; // 144 sq in per sq ft
  return lbsPerSqFt * areaFt2;
}

const GROUT_TYPES = {
  sanded:    { label: 'Sanded grout',          density: 105, minJoint: 0.125 },
  unsanded:  { label: 'Unsanded grout',         density: 90,  minJoint: 0    },
  epoxy:     { label: 'Epoxy grout',            density: 110, minJoint: 0    },
};

export default function GroutCalculator() {
  const [unit, setUnit]           = useState('imperial');
  const [length, setLength]       = useState('');
  const [width, setWidth]         = useState('');
  const [tileW, setTileW]         = useState('12');
  const [tileH, setTileH]         = useState('12');
  const [tileThick, setTileThick] = useState('0.375');
  const [jointW, setJointW]       = useState('0.125');
  const [groutType, setGroutType] = useState('sanded');
  const [wastePct, setWastePct]   = useState('10');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

  const isM    = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter > 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter > 0.';
    if (!tileW  || parseFloat(tileW)  <= 0) e.tileW  = 'Enter > 0.';
    if (!tileH  || parseFloat(tileH)  <= 0) e.tileH  = 'Enter > 0.';
    if (!tileThick || parseFloat(tileThick) <= 0) e.tileThick = 'Enter > 0.';
    if (!jointW || parseFloat(jointW) <= 0) e.jointW = 'Enter > 0.';
    const wp = parseFloat(wastePct);
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const areaFt2 = toFt(length) * toFt(width);
    const wp = parseFloat(wastePct);
    const gt = GROUT_TYPES[groutType];
    const lbs = calcGrout({
      areaFt2, tileW: parseFloat(tileW), tileH: parseFloat(tileH),
      jointW: parseFloat(jointW), tileThick: parseFloat(tileThick),
      groutDensity: gt.density,
    });
    const totalLbs = lbs * (1 + wp / 100);
    const bags10lb = Math.ceil(totalLbs / 10);
    const bags25lb = Math.ceil(totalLbs / 25);
    const areaDisp = isM ? areaFt2 / 10.7639 : areaFt2;

    setResult({ areaDisp, areaLbl: isM ? 'm²' : 'sq ft', totalLbs, bags10lb, bags25lb, typeLbl: gt.label });
  }

  function reset() {
    setLength(''); setWidth(''); setTileW('12'); setTileH('12');
    setTileThick('0.375'); setJointW('0.125'); setWastePct('10');
    setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, step = 'any', placeholder = '0' }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" inputMode="decimal" value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {err && <span className="field-error">{err}</span>}
      </div>
    );
  }

  const jointPresets = [['1/16"','0.0625'],['1/8"','0.125'],['3/16"','0.1875'],['1/4"','0.25'],['3/8"','0.375']];

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="units-toggle" role="radiogroup">
          {['imperial', 'metric'].map(u => (
            <button key={u} type="button" className={`unit-btn${unit === u ? ' is-active' : ''}`} aria-pressed={unit === u}
              onClick={() => { setUnit(u); reset(); }}>
              {u === 'imperial' ? 'Imperial · ft (tiles in inches)' : 'Metric · m (tiles in inches)'}
            </button>
          ))}
        </div>

        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Tiled area
              </h2>
              <div className="field-row">
                <F id="glength" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="gwidth"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                Tile dimensions (all in inches)
              </h2>
              <div className="field-row">
                <F id="gtileW"     label="Tile width (in)"    val={tileW}     set={setTileW}     err={errors.tileW}     placeholder="12" />
                <F id="gtileH"     label="Tile height (in)"   val={tileH}     set={setTileH}     err={errors.tileH}     placeholder="12" />
                <F id="gtileThick" label="Tile thickness (in)" val={tileThick} set={setTileThick} err={errors.tileThick} placeholder="0.375" />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Grout joint &amp; type
              </h2>
              <div className="field-row">
                <F id="gjointW" label="Joint width (in)" val={jointW} set={setJointW} err={errors.jointW} placeholder="0.125" />
              </div>
              <div className="calc-presets">
                {jointPresets.map(([l, v]) => (
                  <button key={l} type="button" className="preset-btn"
                    onClick={() => { setJointW(v); setErrors(p => ({ ...p, gjointW: undefined })); setResult(null); }}>
                    {l}
                  </button>
                ))}
              </div>
              <div className="field" style={{ marginTop: '14px' }}>
                <label htmlFor="groutType">Grout type</label>
                <select id="groutType" className="calc-select" value={groutType}
                  onChange={ev => { setGroutType(ev.target.value); setResult(null); }}>
                  {Object.entries(GROUT_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <div className="field-row">
                <F id="gwaste" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="10" />
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
              <span className="result-hero__label">Grout needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalLbs, 1) : '—'}</span>
                <span>lb</span>
              </div>
              <p className="result-hero__note">{result ? `${result.typeLbl} · inc. ${wastePct}% waste` : 'Enter tile dimensions to calculate grout.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Tiled area</dt><dd className="numeral">{fmt(result.areaDisp, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row total"><dt>Grout needed</dt><dd className="numeral">{fmt(result.totalLbs, 1)} lb</dd></div>
                  <div className="breakdown-row"><dt>10 lb bags</dt><dd className="numeral">{result.bags10lb}</dd></div>
                  <div className="breakdown-row"><dt>25 lb bags</dt><dd className="numeral">{result.bags25lb}</dd></div>
                </dl>
                <p className="disclaimer">Formula based on standard TCNA/industry grout coverage calculation. Actual usage varies with grout brand, mixing ratio and application technique. Add 10–15% for complex patterns.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
