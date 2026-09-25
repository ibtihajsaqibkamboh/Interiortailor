'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const TILE_SIZES = {
  '4x4':   { label: '4×4 in',   wIn: 4,  lIn: 4  },
  '6x6':   { label: '6×6 in',   wIn: 6,  lIn: 6  },
  '12x12': { label: '12×12 in', wIn: 12, lIn: 12 },
  '12x24': { label: '12×24 in', wIn: 12, lIn: 24 },
  '18x18': { label: '18×18 in', wIn: 18, lIn: 18 },
  '24x24': { label: '24×24 in', wIn: 24, lIn: 24 },
  custom:  { label: 'Custom',   wIn: 0,  lIn: 0  },
};

export default function TileCalculator() {
  const [unit, setUnit]           = useState('imperial');
  const [length, setLength]       = useState('');
  const [width, setWidth]         = useState('');
  const [tileSize, setTileSize]   = useState('12x12');
  const [custTW, setCustTW]       = useState('');
  const [custTL, setCustTL]       = useState('');
  const [groutGap, setGroutGap]   = useState('0.125'); // 1/8 inch default
  const [wastePct, setWastePct]   = useState('10');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

  const isM = unit === 'metric';
  const lenLbl  = isM ? 'm' : 'ft';
  const areaLbl = isM ? 'm²' : 'sq ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }
  function tileWIn() { return tileSize === 'custom' ? parseFloat(custTW) || 0 : TILE_SIZES[tileSize].wIn; }
  function tileLIn() { return tileSize === 'custom' ? parseFloat(custTL) || 0 : TILE_SIZES[tileSize].lIn; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter a value greater than 0.';
    if (tileSize === 'custom') {
      if (!custTW || parseFloat(custTW) <= 0) e.custTW = 'Enter tile width > 0.';
      if (!custTL || parseFloat(custTL) <= 0) e.custTL = 'Enter tile length > 0.';
    }
    const g = parseFloat(groutGap), wp = parseFloat(wastePct);
    if (isNaN(g) || g < 0) e.groutGap = 'Enter 0 or more.';
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const areaFt2 = toFt(length) * toFt(width);
    const gap = parseFloat(groutGap);
    const twFt = (tileWIn() + gap) / 12;
    const tlFt = (tileLIn() + gap) / 12;
    const tileAreaFt2 = twFt * tlFt;
    const baseTiles = areaFt2 / tileAreaFt2;
    const wasteF = 1 + parseFloat(wastePct) / 100;
    const totalTiles = Math.ceil(baseTiles * wasteF);

    // grout estimate: ~1 lb per 15 sq ft for 1/8" joint on 12×12
    const groutLbs = Math.ceil(areaFt2 * wasteF / 15);

    const areaDisplay = isM ? areaFt2 / 10.7639 : areaFt2;
    setResult({
      areaDisplay, areaLbl,
      baseTiles: Math.ceil(baseTiles), totalTiles, groutLbs,
      tileLabel: TILE_SIZES[tileSize]?.label ?? 'Custom',
    });
  }

  function reset() {
    setLength(''); setWidth(''); setCustTW(''); setCustTL('');
    setGroutGap('0.125'); setWastePct('10'); setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, step = 'any', placeholder = '0' }) {
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
                Area to tile
              </h2>
              <div className="field-row">
                <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="width"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                Tile size
              </h2>
              <div className="field">
                <label htmlFor="tileSize">Tile size</label>
                <select id="tileSize" className="calc-select" value={tileSize}
                  onChange={e => { setTileSize(e.target.value); setErrors({}); setResult(null); }}>
                  {Object.entries(TILE_SIZES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              {tileSize === 'custom' && (
                <div className="field-row" style={{ marginTop: '12px' }}>
                  <F id="custTW" label="Tile width (in)" val={custTW} set={setCustTW} err={errors.custTW} placeholder="12" />
                  <F id="custTL" label="Tile length (in)" val={custTL} set={setCustTL} err={errors.custTL} placeholder="12" />
                </div>
              )}
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Grout gap &amp; waste
              </h2>
              <div className="field-row">
                <F id="groutGap" label="Grout gap (in)"   val={groutGap} set={setGroutGap} err={errors.groutGap} placeholder="0.125" />
                <F id="wastePct" label="Waste (%)"        val={wastePct} set={setWastePct} err={errors.wastePct} step="1" placeholder="10" />
              </div>
              <div className="calc-presets">
                {[['1/16"','0.0625'],['1/8"','0.125'],['3/16"','0.1875'],['1/4"','0.25']].map(([l, v]) => (
                  <button key={l} type="button" className="preset-btn"
                    onClick={() => { setGroutGap(v); setErrors(p => ({ ...p, groutGap: undefined })); setResult(null); }}>
                    {l}
                  </button>
                ))}
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
              <span className="result-hero__label">Tiles needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalTiles, 0) : '—'}</span>
                <span>tiles</span>
              </div>
              <p className="result-hero__note">
                {result ? `${result.tileLabel} · inc. ${wastePct}% waste` : 'Enter area and tile size to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Area</dt><dd className="numeral">{fmt(result.areaDisplay, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row"><dt>Tiles (no waste)</dt><dd className="numeral">{fmt(result.baseTiles, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Tiles incl. waste</dt><dd className="numeral">{fmt(result.totalTiles, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Grout estimate</dt><dd className="numeral">~{result.groutLbs} lb</dd></div>
                </dl>
                <p className="disclaimer">Grout estimate is approximate based on 1/8" joint on 12×12 tile as a baseline. Actual grout needed varies with tile size, joint width and grout type.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
