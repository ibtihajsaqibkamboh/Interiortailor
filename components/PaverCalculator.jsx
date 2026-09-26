'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const PAVER_SIZES = {
  '4x8':   { label: '4×8 in (standard brick)',      wIn: 4,  lIn: 8  },
  '6x6':   { label: '6×6 in (square)',              wIn: 6,  lIn: 6  },
  '6x9':   { label: '6×9 in (cobblestone)',         wIn: 6,  lIn: 9  },
  '12x12': { label: '12×12 in (large square)',      wIn: 12, lIn: 12 },
  '12x24': { label: '12×24 in (rectangular slab)',  wIn: 12, lIn: 24 },
  custom:  { label: 'Custom size',                  wIn: 0,  lIn: 0  },
};

export default function PaverCalculator() {
  const [unit, setUnit]       = useState('imperial');
  const [length, setLength]   = useState('');
  const [width, setWidth]     = useState('');
  const [paverSize, setPaverSize] = useState('12x12');
  const [custW, setCustW]     = useState('');
  const [custL, setCustL]     = useState('');
  const [gapIn, setGapIn]     = useState('0.25');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]   = useState({});
  const [result, setResult]   = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }
  // paver sizes always in inches
  function paverWIn() { return paverSize === 'custom' ? parseFloat(custW) || 0 : PAVER_SIZES[paverSize].wIn; }
  function paverLIn() { return paverSize === 'custom' ? parseFloat(custL) || 0 : PAVER_SIZES[paverSize].lIn; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter a value greater than 0.';
    if (paverSize === 'custom') {
      if (!custW || parseFloat(custW) <= 0) e.custW = 'Enter paver width > 0.';
      if (!custL || parseFloat(custL) <= 0) e.custL = 'Enter paver length > 0.';
    }
    const g = parseFloat(gapIn), wp = parseFloat(wastePct);
    if (isNaN(g) || g < 0) e.gapIn = 'Enter 0 or more.';
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const areaFt2 = toFt(length) * toFt(width);
    const gap = parseFloat(gapIn);
    const pw = (paverWIn() + gap) / 12; // ft
    const pl = (paverLIn() + gap) / 12; // ft
    const paverAreaFt2 = pw * pl;
    const basePavers = areaFt2 / paverAreaFt2;
    const wasteF = 1 + parseFloat(wastePct) / 100;
    const totalPavers = Math.ceil(basePavers * wasteF);

    const areaDisplay = isM ? areaFt2 / 10.7639 : areaFt2;
    setResult({
      areaDisplay, areaLbl: isM ? 'm²' : 'sq ft',
      basePavers: Math.ceil(basePavers), totalPavers,
      paverLabel: PAVER_SIZES[paverSize]?.label ?? 'Custom',
    });
  }

  function reset() {
    setLength(''); setWidth(''); setCustW(''); setCustL('');
    setGapIn('0.25'); setWastePct('10'); setErrors({}); setResult(null);
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
                Area to pave
              </h2>
              <div className="field-row">
                <F id="length" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="width"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                Paver size
              </h2>
              <div className="field">
                <label htmlFor="paverSize">Paver size</label>
                <select id="paverSize" className="calc-select" value={paverSize}
                  onChange={e => { setPaverSize(e.target.value); setErrors({}); setResult(null); }}>
                  {Object.entries(PAVER_SIZES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              {paverSize === 'custom' && (
                <div className="field-row" style={{ marginTop: '12px' }}>
                  <F id="custW" label="Paver width (in)" val={custW} set={setCustW} err={errors.custW} placeholder="12" />
                  <F id="custL" label="Paver length (in)" val={custL} set={setCustL} err={errors.custL} placeholder="12" />
                </div>
              )}
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Gap &amp; waste
              </h2>
              <div className="field-row">
                <F id="gapIn"   label="Joint gap (in)"  val={gapIn}   set={setGapIn}   err={errors.gapIn}   placeholder="0.25" />
                <F id="wastePct" label="Waste (%)"      val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="10" />
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
              <span className="result-hero__label">Pavers needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalPavers, 0) : '—'}</span>
                <span>pavers</span>
              </div>
              <p className="result-hero__note">
                {result ? `${result.paverLabel} · inc. ${wastePct}% waste` : 'Enter area and paver size to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Area</dt><dd className="numeral">{fmt(result.areaDisplay, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row"><dt>Pavers (no waste)</dt><dd className="numeral">{fmt(result.basePavers, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Pavers incl. waste</dt><dd className="numeral">{fmt(result.totalPavers, 0)}</dd></div>
                </dl>
                <p className="disclaimer">Paver count includes joint gap in coverage calculation. Always confirm count with your supplier as paver sizes vary by manufacturer.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
