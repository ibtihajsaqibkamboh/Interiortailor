'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const PITCH_CATEGORIES = [
  { max: 2,  label: 'Low pitch — flat/low-slope membranes recommended' },
  { max: 4,  label: 'Low pitch — some shingles acceptable' },
  { max: 9,  label: 'Normal pitch — suitable for most roofing materials' },
  { max: 12, label: 'Steep pitch — may require special installation methods' },
  { max: 24, label: 'Very steep — consult a specialist' },
];

function pitchCategory(rise) {
  return PITCH_CATEGORIES.find(c => rise <= c.max)?.label ?? 'Extreme pitch';
}

const INPUT_MODES = [
  { val: 'rise_run',   label: 'Rise & Run' },
  { val: 'angle',      label: 'Angle (degrees)' },
  { val: 'multiplier', label: 'Multiplier' },
];

export default function RoofPitchCalculator() {
  const [mode, setMode]       = useState('rise_run');
  const [rise, setRise]       = useState('');
  const [run, setRun]         = useState('12');
  const [angle, setAngle]     = useState('');
  const [multi, setMulti]     = useState('');
  const [errors, setErrors]   = useState({});
  const [result, setResult]   = useState(null);

  function validate() {
    const e = {};
    if (mode === 'rise_run') {
      if (!rise || parseFloat(rise) <= 0) e.rise = 'Enter a value greater than 0.';
      if (!run  || parseFloat(run)  <= 0) e.run  = 'Enter a value greater than 0.';
    } else if (mode === 'angle') {
      const a = parseFloat(angle);
      if (!angle || a <= 0 || a >= 90) e.angle = 'Enter an angle between 0 and 90.';
    } else {
      const m = parseFloat(multi);
      if (!multi || m <= 0) e.multi = 'Enter a value greater than 0.';
    }
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    let riseVal, runVal, angleDeg, pitchStr, multiplier;

    if (mode === 'rise_run') {
      riseVal  = parseFloat(rise);
      runVal   = parseFloat(run);
      angleDeg = Math.atan(riseVal / runVal) * (180 / Math.PI);
      multiplier = Math.sqrt(1 + (riseVal / runVal) ** 2);
      pitchStr = `${fmt(riseVal, 2)}/${fmt(runVal, 0)}`;
    } else if (mode === 'angle') {
      angleDeg   = parseFloat(angle);
      const rad  = angleDeg * (Math.PI / 180);
      riseVal    = Math.tan(rad) * 12;
      runVal     = 12;
      multiplier = 1 / Math.cos(rad);
      pitchStr   = `${fmt(riseVal, 2)}/12`;
    } else {
      multiplier = parseFloat(multi);
      angleDeg   = Math.acos(1 / multiplier) * (180 / Math.PI);
      riseVal    = Math.tan(angleDeg * (Math.PI / 180)) * 12;
      runVal     = 12;
      pitchStr   = `${fmt(riseVal, 2)}/12`;
    }

    // Normalized to x/12
    const riseNorm = (riseVal / runVal) * 12;
    const category = pitchCategory(riseNorm);

    setResult({ riseNorm, runNorm: 12, angleDeg, multiplier, pitchStr: `${fmt(riseNorm,2)}/12`, category });
  }

  function reset() {
    setRise(''); setRun('12'); setAngle(''); setMulti('');
    setErrors({}); setResult(null);
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

  const commonPitches = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 20l9-16 9 16"/></svg>
                Input method
              </h2>
              <div className="calc-shape-toggle" style={{ flexWrap: 'wrap' }}>
                {INPUT_MODES.map(m => (
                  <button key={m.val} type="button" className={`shape-btn${mode === m.val ? ' is-active' : ''}`}
                    onClick={() => { setMode(m.val); setErrors({}); setResult(null); }}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                Values
              </h2>
              {mode === 'rise_run' && (
                <>
                  <div className="field-row">
                    <F id="rprise" label="Rise (in)" val={rise} set={setRise} err={errors.rise} placeholder="e.g. 6" />
                    <F id="rprun"  label="Run (in)"  val={run}  set={setRun}  err={errors.run}  placeholder="12" />
                  </div>
                  <p className="group-hint">Standard run = 12 in. Rise = vertical inches per 12 in of horizontal run.</p>
                  <p className="group-hint">Common pitches:</p>
                  <div className="calc-presets">
                    {commonPitches.map(p => (
                      <button key={p} type="button" className="preset-btn"
                        onClick={() => { setRise(String(p)); setRun('12'); setErrors({}); setResult(null); }}>
                        {p}/12
                      </button>
                    ))}
                  </div>
                </>
              )}
              {mode === 'angle' && (
                <div className="field-row">
                  <F id="rpangle" label="Angle (°)" val={angle} set={setAngle} err={errors.angle} placeholder="e.g. 26.6" />
                </div>
              )}
              {mode === 'multiplier' && (
                <div className="field-row">
                  <F id="rpmulti" label="Pitch multiplier" val={multi} set={setMulti} err={errors.multi} placeholder="e.g. 1.118" />
                </div>
              )}
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Roof pitch</span>
              <div className="result-hero__value">
                <span className="numeral" style={{ fontSize: 'clamp(1.8rem,5vw,2.6rem)' }}>
                  {result ? result.pitchStr : '—'}
                </span>
              </div>
              <p className="result-hero__note">{result ? result.category : 'Enter pitch details to calculate.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Pitch (x/12)</dt><dd className="numeral">{result.pitchStr}</dd></div>
                  <div className="breakdown-row"><dt>Angle</dt><dd className="numeral">{fmt(result.angleDeg, 1)}°</dd></div>
                  <div className="breakdown-row total"><dt>Pitch multiplier</dt><dd className="numeral">{fmt(result.multiplier, 4)}</dd></div>
                  <div className="breakdown-row"><dt>Category</dt><dd style={{ textAlign: 'right', fontSize: '.85rem' }}>{result.category.split(' — ')[0]}</dd></div>
                </dl>
                <p className="disclaimer">The pitch multiplier converts flat (plan) area to actual sloped roof area: multiply floor plan area × multiplier to get roofing surface area.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
