'use client';

import { useState, useCallback } from 'react';

const DENSITIES = {
  pea:       { label: 'Pea gravel',          kgM3: 1680 },
  crushed:   { label: 'Crushed stone',        kgM3: 1600 },
  decomposed:{ label: 'Decomposed granite',   kgM3: 1920 },
  river:     { label: 'River rock',           kgM3: 1500 },
  sand:      { label: 'Coarse sand',          kgM3: 1700 },
};

function formatNum(n, decimals = 2) {
  if (n === null || n === undefined || !isFinite(n)) return '—';
  return Number(n.toFixed(decimals)).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

function calcGravel({ length, width, depth, densityKgM3, wastePct }) {
  const volume       = length * width * depth;
  const waste        = volume * (wastePct / 100);
  const totalVolume  = volume + waste;
  const weightKg     = totalVolume * densityKgM3;
  const weightTonne  = weightKg / 1000;
  return { volume, waste, totalVolume, weightKg, weightTonne };
}

export default function GravelCalculator() {
  const [unit, setUnit]         = useState('metric');
  const [length, setLength]     = useState('');
  const [width, setWidth]       = useState('');
  const [depth, setDepth]       = useState('');
  const [type, setType]         = useState('crushed');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isImperial = unit === 'imperial';
  const lenLabel   = isImperial ? 'ft' : 'm';
  const depthLabel = isImperial ? 'in' : 'cm';
  const volLabel   = isImperial ? 'yd³' : 'm³';
  const weightLabel= isImperial ? 'lb'  : 'kg';
  const tonLabel   = isImperial ? 'short tons' : 'tonnes';

  function toMeters(v)   { const n = parseFloat(v); return isImperial ? n * 0.3048 : n; }
  function depthToM(v)   { const n = parseFloat(v); return isImperial ? n * 0.0254 : n / 100; }

  const validate = useCallback(() => {
    const e = {};
    if (!length   || parseFloat(length)   <= 0) e.length   = 'Enter a value greater than 0.';
    if (!width    || parseFloat(width)    <= 0) e.width    = 'Enter a value greater than 0.';
    if (!depth    || parseFloat(depth)    <= 0) e.depth    = 'Enter a value greater than 0.';
    const w = parseFloat(wastePct);
    if (wastePct === '' || isNaN(w) || w < 0)  e.wastePct = 'Enter 0 or more.';
    return e;
  }, [length, width, depth, wastePct]);

  function handleCalculate() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) { setResult(null); return; }

    const lM = toMeters(length);
    const wM = toMeters(width);
    const dM = depthToM(depth);
    const wp = parseFloat(wastePct);
    const density = DENSITIES[type].kgM3;

    const raw = calcGravel({ length: lM, width: wM, depth: dM, densityKgM3: density, wastePct: wp });

    const vFactor = isImperial ? 1.30795 : 1;
    const wFactor = isImperial ? 2.20462 : 1;
    const tFactor = isImperial ? 1.10231 : 1;   // metric tonne → short ton

    setResult({
      volume:      raw.volume      * vFactor,
      waste:       raw.waste       * vFactor,
      totalVolume: raw.totalVolume * vFactor,
      weightKg:    raw.weightKg    * wFactor,
      weightTonne: raw.weightTonne * tFactor,
      volLabel,
      weightLabel,
      tonLabel,
    });
  }

  function handleReset() {
    setLength(''); setWidth(''); setDepth('');
    setWastePct('10'); setErrors({}); setResult(null);
  }

  const Field = ({ id, label, value, onChange, error, placeholder = '0', step = 'any' }) => (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id} type="number" inputMode="decimal"
        min="0" step={step}
        value={value}
        placeholder={placeholder}
        onChange={e => { onChange(e.target.value); setErrors(prev => ({ ...prev, [id]: undefined })); setResult(null); }}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        {/* Unit toggle */}
        <div className="units-toggle" role="radiogroup" aria-label="Measurement units">
          {['metric', 'imperial'].map(u => (
            <button key={u} type="button"
              className={`unit-btn${unit === u ? ' is-active' : ''}`}
              aria-pressed={unit === u}
              onClick={() => { setUnit(u); setLength(''); setWidth(''); setDepth(''); setErrors({}); setResult(null); }}
            >
              {u === 'metric' ? 'Metric · m & cm' : 'Imperial · ft & in'}
            </button>
          ))}
        </div>

        <div className="layout">
          {/* ── Inputs ── */}
          <section className="panel panel--inputs" aria-label="Project details">

            {/* Gravel type */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>
                Gravel type
              </h2>
              <div className="field">
                <label htmlFor="gravelType">Material</label>
                <select
                  id="gravelType"
                  className="calc-select"
                  value={type}
                  onChange={e => { setType(e.target.value); setResult(null); }}
                >
                  {Object.entries(DENSITIES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Area */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Area dimensions
              </h2>
              <div className="field-row">
                <Field id="length" label={`Length (${lenLabel})`} value={length} onChange={setLength} error={errors.length} />
                <Field id="width"  label={`Width (${lenLabel})`}  value={width}  onChange={setWidth}  error={errors.width} />
              </div>
            </div>

            {/* Depth */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Depth
              </h2>
              <div className="field-row">
                <Field id="depth" label={`Depth (${depthLabel})`} value={depth} onChange={setDepth} error={errors.depth}
                  placeholder={isImperial ? 'e.g. 3' : 'e.g. 8'} />
              </div>
              <p className="group-hint">
                {isImperial ? 'Typical driveway: 3–4 in. Pathway: 2–3 in.' : 'Typical driveway: 8–10 cm. Pathway: 5–7 cm.'}
              </p>
            </div>

            {/* Waste */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <div className="field-row">
                <Field id="wastePct" label="Waste (%)" value={wastePct} onChange={setWastePct} error={errors.wastePct} placeholder="10" step="1" />
              </div>
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={handleReset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalculate}>Calculate</button>
            </div>
          </section>

          {/* ── Results ── */}
          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Total gravel needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? formatNum(result.totalVolume) : '—'}</span>
                <span>{result ? result.volLabel : volLabel}</span>
              </div>
              <p className="result-hero__note">
                {result
                  ? `${DENSITIES[type].label} · includes ${wastePct}% waste.`
                  : 'Fill in dimensions to see your estimate.'}
              </p>
            </div>

            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row">
                    <dt>Net volume</dt>
                    <dd className="numeral">{formatNum(result.volume)} {result.volLabel}</dd>
                  </div>
                  <div className="breakdown-row">
                    <dt>Waste allowance</dt>
                    <dd className="numeral">{formatNum(result.waste)} {result.volLabel}</dd>
                  </div>
                  <div className="breakdown-row total">
                    <dt>Total volume to order</dt>
                    <dd className="numeral">{formatNum(result.totalVolume)} {result.volLabel}</dd>
                  </div>
                  <div className="breakdown-row">
                    <dt>Estimated weight</dt>
                    <dd className="numeral">{formatNum(result.weightKg, 0)} {result.weightLabel}</dd>
                  </div>
                  <div className="breakdown-row">
                    <dt>Estimated weight (tons)</dt>
                    <dd className="numeral">{formatNum(result.weightTonne, 2)} {result.tonLabel}</dd>
                  </div>
                </dl>
                <p className="disclaimer">
                  Weight is an estimate based on typical bulk density for {DENSITIES[type].label.toLowerCase()}. Actual density varies by supplier and moisture content. Confirm with your supplier before ordering.
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
