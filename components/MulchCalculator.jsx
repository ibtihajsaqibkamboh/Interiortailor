'use client';

import { useState, useCallback } from 'react';

const MULCH_TYPES = {
  wood:       { label: 'Wood chip / bark mulch',  kgM3: 320  },
  straw:      { label: 'Straw mulch',             kgM3: 130  },
  compost:    { label: 'Compost / organic',        kgM3: 600  },
  rubber:     { label: 'Rubber mulch',            kgM3: 700  },
  cocoa:      { label: 'Cocoa hull mulch',        kgM3: 480  },
  gravel_m:   { label: 'Decorative gravel',       kgM3: 1600 },
};

const COVERAGE_GUIDE = [
  { label: 'Flower beds (2–3 in / 5–8 cm)',        depthCm: 6.5,  depthIn: 2.5 },
  { label: 'Tree rings (3–4 in / 8–10 cm)',        depthCm: 9,    depthIn: 3.5 },
  { label: 'Vegetable garden (2–4 in / 5–10 cm)',  depthCm: 7.5,  depthIn: 3 },
  { label: 'Playground (6 in / 15 cm)',            depthCm: 15,   depthIn: 6 },
  { label: 'Weed suppression (4 in / 10 cm)',      depthCm: 10,   depthIn: 4 },
];

function formatNum(n, decimals = 2) {
  if (n === null || n === undefined || !isFinite(n)) return '—';
  return Number(n.toFixed(decimals)).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

function calcMulch({ area, depth, densityKgM3, wastePct }) {
  const volume      = area * depth;               // m³
  const waste       = volume * (wastePct / 100);
  const totalVolume = volume + waste;
  const weightKg    = totalVolume * densityKgM3;
  const bags50L     = Math.ceil((totalVolume * 1000) / 50); // 50 L bags
  return { volume, waste, totalVolume, weightKg, bags50L };
}

export default function MulchCalculator() {
  const [unit, setUnit]         = useState('metric');
  const [length, setLength]     = useState('');
  const [width, setWidth]       = useState('');
  const [depth, setDepth]       = useState('');
  const [type, setType]         = useState('wood');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  const isImperial = unit === 'imperial';
  const lenLabel   = isImperial ? 'ft'  : 'm';
  const depthLabel = isImperial ? 'in'  : 'cm';
  const volLabel   = isImperial ? 'yd³' : 'm³';
  const weightLabel= isImperial ? 'lb'  : 'kg';

  function toM(v)      { const n = parseFloat(v); return isImperial ? n * 0.3048 : n; }
  function depthToM(v) { const n = parseFloat(v); return isImperial ? n * 0.0254 : n / 100; }

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

    const areaM2  = toM(length) * toM(width);
    const depthM  = depthToM(depth);
    const wp      = parseFloat(wastePct);
    const density = MULCH_TYPES[type].kgM3;

    const raw = calcMulch({ area: areaM2, depth: depthM, densityKgM3: density, wastePct: wp });

    const vFactor = isImperial ? 1.30795 : 1;
    const wFactor = isImperial ? 2.20462 : 1;

    setResult({
      volume:      raw.volume      * vFactor,
      waste:       raw.waste       * vFactor,
      totalVolume: raw.totalVolume * vFactor,
      weightKg:    raw.weightKg    * wFactor,
      bags50L:     raw.bags50L,
      volLabel,
      weightLabel,
    });
  }

  function handleReset() {
    setLength(''); setWidth(''); setDepth('');
    setWastePct('10'); setErrors({}); setResult(null);
  }

  function applyGuide(g) {
    const d = isImperial ? g.depthIn.toString() : g.depthCm.toString();
    setDepth(d);
    setErrors(prev => ({ ...prev, depth: undefined }));
    setResult(null);
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

            {/* Mulch type */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2C8 8 4 12 4 15a8 8 0 0 0 16 0c0-3-4-7-8-13z"/></svg>
                Mulch type
              </h2>
              <div className="field">
                <label htmlFor="mulchType">Material</label>
                <select
                  id="mulchType"
                  className="calc-select"
                  value={type}
                  onChange={e => { setType(e.target.value); setResult(null); }}
                >
                  {Object.entries(MULCH_TYPES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Area */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Area to cover
              </h2>
              <div className="field-row">
                <Field id="mlength" label={`Length (${lenLabel})`} value={length} onChange={setLength} error={errors.length} />
                <Field id="mwidth"  label={`Width (${lenLabel})`}  value={width}  onChange={setWidth}  error={errors.width} />
              </div>
            </div>

            {/* Depth */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Depth
              </h2>
              <div className="field-row">
                <Field id="mdepth" label={`Depth (${depthLabel})`} value={depth} onChange={setDepth} error={errors.depth}
                  placeholder={isImperial ? 'e.g. 3' : 'e.g. 8'} />
              </div>
              <p className="group-hint" style={{ marginTop: '10px' }}>Quick-fill common depths:</p>
              <div className="calc-presets">
                {COVERAGE_GUIDE.map(g => (
                  <button key={g.label} type="button" className="preset-btn" onClick={() => applyGuide(g)}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Waste */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <div className="field-row">
                <Field id="mwastePct" label="Waste (%)" value={wastePct} onChange={setWastePct} error={errors.wastePct} placeholder="10" step="1" />
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
              <span className="result-hero__label">Total mulch needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? formatNum(result.totalVolume) : '—'}</span>
                <span>{result ? result.volLabel : volLabel}</span>
              </div>
              <p className="result-hero__note">
                {result
                  ? `${MULCH_TYPES[type].label} · includes ${wastePct}% waste.`
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
                    <dt>Approx. 50 L bags</dt>
                    <dd className="numeral">{result.bags50L}</dd>
                  </div>
                </dl>
                <p className="disclaimer">
                  Bag count is based on standard 50 L bags. Mulch weight is an estimate using typical bulk density for {MULCH_TYPES[type].label.toLowerCase()}. Verify coverage rate with your supplier.
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
