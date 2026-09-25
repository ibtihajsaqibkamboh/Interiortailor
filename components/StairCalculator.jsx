'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// IBC comfortable stair guidelines (imperial): rise 7–7.75 in, run 10–11 in
// Metric: rise 175–195 mm, run 250–280 mm
const PRESETS_IMP = [
  { label: 'Comfortable (7" rise, 11" run)', rise: 7, run: 11 },
  { label: 'Standard (7.5" rise, 10" run)',  rise: 7.5, run: 10 },
  { label: 'Steep (8" rise, 9" run)',        rise: 8, run: 9 },
];
const PRESETS_MET = [
  { label: 'Comfortable (175mm rise, 280mm run)', rise: 175, run: 280 },
  { label: 'Standard (190mm rise, 260mm run)',    rise: 190, run: 260 },
  { label: 'Steep (210mm rise, 240mm run)',       rise: 210, run: 240 },
];

export default function StairCalculator() {
  const [unit, setUnit]           = useState('imperial');
  const [totalRise, setTotalRise] = useState('');
  const [riserH, setRiserH]       = useState('7');
  const [treadD, setTreadD]       = useState('11');
  const [stairW, setStairW]       = useState('3');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

  const isImp = unit === 'imperial';
  const lenLbl   = isImp ? 'in' : 'mm';
  const heightLbl = isImp ? 'in' : 'mm';

  function validate() {
    const e = {};
    const tr = parseFloat(totalRise), rh = parseFloat(riserH),
          td = parseFloat(treadD),    sw = parseFloat(stairW);
    if (!totalRise || tr <= 0) e.totalRise = 'Enter a value greater than 0.';
    if (!riserH || rh <= 0)   e.riserH    = 'Enter a value greater than 0.';
    if (!treadD || td <= 0)   e.treadD    = 'Enter a value greater than 0.';
    if (!stairW || sw <= 0)   e.stairW    = 'Enter a value greater than 0.';
    if (rh > 0 && (isImp ? rh > 8.25 : rh > 210))
      e.riserH = isImp ? 'Max recommended: 8.25 in.' : 'Max recommended: 210 mm.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const tr = parseFloat(totalRise);
    const rh = parseFloat(riserH);
    const td = parseFloat(treadD);
    const sw = parseFloat(stairW);

    const steps     = Math.round(tr / rh);
    const actualRise = tr / steps;           // adjusted per step
    const totalRun  = steps * td;
    const stringer  = Math.sqrt(tr ** 2 + totalRun ** 2); // length of stringer
    const unit2 = isImp ? 'in' : 'mm';

    // lumber for treads: each tread = width × depth (2×10 or 2×12 typical)
    const treadLf = steps * (sw / (isImp ? 12 : 1000)); // convert to ft / m
    const treadBoardFt = isImp ? steps * (sw / 12) * (td / 12) * (2 / 12) : null;

    setResult({ steps, actualRise, rh, td, sw, totalRun, stringer, unit2, treadLf,
      riseOk: isImp ? actualRise <= 8.25 : actualRise <= 210,
      runOk:  isImp ? td >= 10 : td >= 250 });
  }

  function reset() {
    setTotalRise(''); setRiserH('7'); setTreadD('11'); setStairW('3');
    setErrors({}); setResult(null);
  }

  function applyPreset(p) {
    setRiserH(String(p.rise)); setTreadD(String(p.run));
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

  const presets = isImp ? PRESETS_IMP : PRESETS_MET;

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="units-toggle" role="radiogroup">
          {['imperial', 'metric'].map(u => (
            <button key={u} type="button" className={`unit-btn${unit === u ? ' is-active' : ''}`} aria-pressed={unit === u}
              onClick={() => { setUnit(u); setRiserH(u === 'imperial' ? '7' : '175'); setTreadD(u === 'imperial' ? '11' : '280'); setTotalRise(''); setStairW(u === 'imperial' ? '3' : '900'); setErrors({}); setResult(null); }}>
              {u === 'imperial' ? 'Imperial · inches' : 'Metric · mm'}
            </button>
          ))}
        </div>

        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 18h4v-4h4v-4h4v-4h4"/></svg>
                Total rise &amp; width
              </h2>
              <div className="field-row">
                <F id="totalRise" label={`Total rise (${lenLbl})`}   val={totalRise} set={setTotalRise} err={errors.totalRise} placeholder={isImp ? 'e.g. 84' : 'e.g. 2100'} />
                <F id="stairW"    label={`Stair width (${lenLbl})`}  val={stairW}    set={setStairW}    err={errors.stairW}    placeholder={isImp ? 'e.g. 36' : 'e.g. 900'} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Rise &amp; run per step
              </h2>
              <div className="field-row">
                <F id="riserH" label={`Riser height (${lenLbl})`} val={riserH} set={setRiserH} err={errors.riserH} placeholder={isImp ? '7' : '175'} />
                <F id="treadD" label={`Tread depth (${lenLbl})`}  val={treadD} set={setTreadD} err={errors.treadD} placeholder={isImp ? '11' : '280'} />
              </div>
              <p className="group-hint">Common presets:</p>
              <div className="calc-presets">
                {presets.map(p => (
                  <button key={p.label} type="button" className="preset-btn" onClick={() => applyPreset(p)}>
                    {p.label}
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
              <span className="result-hero__label">Number of steps</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? result.steps : '—'}</span>
                <span>steps</span>
              </div>
              <p className="result-hero__note">
                {result
                  ? `Actual rise: ${fmt(result.actualRise, 1)} ${result.unit2} per step`
                  : 'Enter total rise to calculate steps.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Number of steps</dt><dd className="numeral">{result.steps}</dd></div>
                  <div className="breakdown-row"><dt>Actual rise per step</dt><dd className="numeral">{fmt(result.actualRise, 1)} {result.unit2}</dd></div>
                  <div className="breakdown-row"><dt>Tread depth</dt><dd className="numeral">{fmt(result.td)} {result.unit2}</dd></div>
                  <div className="breakdown-row"><dt>Total horizontal run</dt><dd className="numeral">{fmt(result.totalRun, 0)} {result.unit2}</dd></div>
                  <div className="breakdown-row total"><dt>Stringer length</dt><dd className="numeral">{fmt(result.stringer, 0)} {result.unit2}</dd></div>
                </dl>
                {(!result.riseOk || !result.runOk) && (
                  <div className="warning-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span>
                      {!result.riseOk ? 'Riser height exceeds recommended maximum. ' : ''}
                      {!result.runOk  ? 'Tread depth is below recommended minimum.' : ''}
                    </span>
                  </div>
                )}
                <p className="disclaimer">Always verify stair dimensions against your local building code before construction. This calculator provides estimates only.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
