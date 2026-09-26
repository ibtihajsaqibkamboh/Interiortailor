'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// IRC 2021: riser max 7¾ in, tread min 10 in, min 36 in stair width
const MAX_RISER_IN = 7.75;
const MIN_TREAD_IN = 10;

export default function DeckStairCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [totalRise, setTotalRise] = useState('');
  const [stairWidth, setStairWidth] = useState('36');
  const [treadDepth, setTreadDepth] = useState('11');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'mm' : 'in';
  const mainLbl = isM ? 'm' : 'in';

  function toIn(v) { const n = parseFloat(v); return isM ? n * 39.3701 : n; }
  function mmToIn(v){ const n = parseFloat(v); return isM ? n / 25.4 : n; }

  function validate() {
    const e = {};
    if (!totalRise  || parseFloat(totalRise)  <= 0) e.totalRise  = 'Enter a value greater than 0.';
    if (!stairWidth || parseFloat(stairWidth) <= 0) e.stairWidth = 'Enter a value greater than 0.';
    if (!treadDepth || parseFloat(treadDepth) <= 0) e.treadDepth = 'Enter a value greater than 0.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const totalRiseIn = toIn(totalRise);
    const tdIn = parseFloat(treadDepth); // always entered in inches for both systems simplicity
    const swIn = parseFloat(stairWidth);

    // Number of risers = ceil(total rise / max riser height)
    const numRisers = Math.ceil(totalRiseIn / MAX_RISER_IN);
    const riserHeight = totalRiseIn / numRisers;
    const numTreads = numRisers - 1; // bottom "tread" is the ground
    const totalRun = numTreads * tdIn;
    // Stringer length (hypotenuse)
    const stringerIn = Math.sqrt(totalRiseIn ** 2 + totalRun ** 2);

    const warnings = [];
    if (riserHeight > MAX_RISER_IN) warnings.push(`Riser height ${fmt(riserHeight,2)}" exceeds IRC max of ${MAX_RISER_IN}".`);
    if (tdIn < MIN_TREAD_IN) warnings.push(`Tread depth ${tdIn}" is below IRC min of ${MIN_TREAD_IN}".`);
    if (swIn < 36) warnings.push('Stair width is below the IRC minimum of 36".');

    setResult({ numRisers, riserHeight, numTreads, tdIn, totalRun, stringerIn, swIn, warnings });
  }

  function reset() {
    setTotalRise(''); setStairWidth('36'); setTreadDepth('11'); setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, placeholder = '0', note }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="number" inputMode="decimal" min="0" step="any" value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {note && <span className="field-hint">{note}</span>}
        {err  && <span className="field-error">{err}</span>}
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="layout">
          <section className="panel panel--inputs" aria-label="Stair details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M3 21V9l6-6 6 6v12"/></svg>
                Total rise
              </h2>
              <F id="totalRise" label="Total vertical rise (in)" val={totalRise} set={setTotalRise} err={errors.totalRise} placeholder="48" note="Deck height above ground" />
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Step dimensions
              </h2>
              <div className="field-row">
                <F id="treadDepth" label="Tread depth (in)"  val={treadDepth} set={setTreadDepth} err={errors.treadDepth} placeholder="11" note="Min 10 in per IRC" />
                <F id="stairWidth" label="Stair width (in)"  val={stairWidth} set={setStairWidth} err={errors.stairWidth} placeholder="36" note="Min 36 in per IRC" />
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
                <span className="numeral">{result ? fmt(result.numRisers, 0) : '—'}</span>
                <span>risers</span>
              </div>
              <p className="result-hero__note">
                {result ? `${fmt(result.riserHeight, 2)}" rise · ${fmt(result.tdIn, 1)}" tread` : 'Enter rise and tread dimensions.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Number of risers</dt><dd className="numeral">{fmt(result.numRisers, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Riser height</dt><dd className="numeral">{fmt(result.riserHeight, 3)}"</dd></div>
                  <div className="breakdown-row"><dt>Number of treads</dt><dd className="numeral">{fmt(result.numTreads, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Total run (horizontal)</dt><dd className="numeral">{fmt(result.totalRun / 12, 2)} ft</dd></div>
                  <div className="breakdown-row"><dt>Stringer length</dt><dd className="numeral">{fmt(result.stringerIn / 12, 2)} ft</dd></div>
                </dl>
                {result.warnings.length > 0 && (
                  <ul className="disclaimer" style={{ paddingLeft: '1rem' }}>
                    {result.warnings.map((w, i) => <li key={i}>⚠ {w}</li>)}
                  </ul>
                )}
                <p className="disclaimer">IRC 2021 maximums: riser ≤7¾ in, tread ≥10 in, width ≥36 in. Verify with your local building department and obtain required permits.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
