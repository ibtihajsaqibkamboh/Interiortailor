'use client';

import { useState, useCallback } from 'react';

const PRESETS = [
  { label: 'Slab / patio',    thickness: 0.1  },
  { label: 'Footing / beam',  thickness: 0.3  },
  { label: 'Wall (100 mm)',   thickness: 0.1  },
  { label: 'Driveway',        thickness: 0.15 },
];

function clamp(v, min = 0) { return isNaN(v) || v < min ? '' : v; }

function formatNum(n, decimals = 2) {
  if (n === null || n === undefined || !isFinite(n)) return '—';
  return Number(n.toFixed(decimals)).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

function calcConcrete({ shape, length, width, diameter, thickness, wastePct }) {
  let baseVolume = 0;
  if (shape === 'rectangular') {
    baseVolume = length * width * thickness;
  } else {
    const r = diameter / 2;
    baseVolume = Math.PI * r * r * thickness;
  }
  const waste = baseVolume * (wastePct / 100);
  const total = baseVolume + waste;
  const bags60lb  = Math.ceil(total / 0.014);   // 1 x 60lb bag ≈ 0.014 m³
  const bags80lb  = Math.ceil(total / 0.019);   // 1 x 80lb bag ≈ 0.019 m³
  return { baseVolume, waste, total, bags60lb, bags80lb };
}

export default function ConcreteCalculator() {
  const [unit, setUnit]           = useState('metric');
  const [shape, setShape]         = useState('rectangular');
  const [length, setLength]       = useState('');
  const [width, setWidth]         = useState('');
  const [diameter, setDiameter]   = useState('');
  const [thickness, setThickness] = useState('');
  const [wastePct, setWastePct]   = useState('10');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

  const isImperial = unit === 'imperial';

  // unit labels
  const lenLabel  = isImperial ? 'ft' : 'm';
  const volLabel  = isImperial ? 'yd³' : 'm³';

  function toMeters(v) {
    const n = parseFloat(v);
    return isImperial ? n * 0.3048 : n;
  }

  const validate = useCallback(() => {
    const e = {};
    if (shape === 'rectangular') {
      if (!length || parseFloat(length) <= 0)   e.length    = 'Enter a value greater than 0.';
      if (!width  || parseFloat(width)  <= 0)   e.width     = 'Enter a value greater than 0.';
    } else {
      if (!diameter || parseFloat(diameter) <= 0) e.diameter = 'Enter a value greater than 0.';
    }
    if (!thickness || parseFloat(thickness) <= 0) e.thickness = 'Enter a value greater than 0.';
    const w = parseFloat(wastePct);
    if (wastePct === '' || isNaN(w) || w < 0)     e.wastePct  = 'Enter 0 or more.';
    return e;
  }, [shape, length, width, diameter, thickness, wastePct]);

  function handleCalculate(e) {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) { setResult(null); return; }

    const lM  = toMeters(length);
    const wM  = toMeters(width);
    const dM  = toMeters(diameter);
    const tM  = toMeters(thickness);
    const wp  = parseFloat(wastePct);

    const raw = calcConcrete({
      shape,
      length: lM, width: wM, diameter: dM,
      thickness: tM, wastePct: wp,
    });

    // convert back for display
    const factor = isImperial ? 1.30795 : 1; // m³ → yd³
    setResult({
      baseVolume: raw.baseVolume * factor,
      waste:      raw.waste      * factor,
      total:      raw.total      * factor,
      bags60lb:   raw.bags60lb,
      bags80lb:   raw.bags80lb,
      volLabel,
    });
  }

  function handleReset() {
    setLength(''); setWidth(''); setDiameter('');
    setThickness(''); setWastePct('10');
    setErrors({}); setResult(null);
  }

  function applyPreset(p) {
    const v = isImperial ? (p.thickness / 0.3048).toFixed(2) : p.thickness.toString();
    setThickness(v);
    setErrors({});
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
            <button
              key={u}
              type="button"
              className={`unit-btn${unit === u ? ' is-active' : ''}`}
              aria-pressed={unit === u}
              onClick={() => { setUnit(u); setLength(''); setWidth(''); setDiameter(''); setThickness(''); setErrors({}); setResult(null); }}
            >
              {u === 'metric' ? 'Metric · m & m³' : 'Imperial · ft & yd³'}
            </button>
          ))}
        </div>

        <div className="layout">
          {/* ── Inputs ── */}
          <section className="panel panel--inputs" aria-label="Project details">
            {/* Shape */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                Shape
              </h2>
              <div className="calc-shape-toggle">
                {[
                  { val: 'rectangular', label: 'Rectangular / Square' },
                  { val: 'circular',    label: 'Circular' },
                ].map(s => (
                  <button
                    key={s.val}
                    type="button"
                    className={`shape-btn${shape === s.val ? ' is-active' : ''}`}
                    onClick={() => { setShape(s.val); setErrors({}); setResult(null); }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9h18M9 21V9"/><rect x="3" y="3" width="18" height="18" rx="1.5"/></svg>
                Dimensions
              </h2>
              {shape === 'rectangular' ? (
                <div className="field-row">
                  <Field id="length"    label={`Length (${lenLabel})`}    value={length}    onChange={setLength}    error={errors.length} />
                  <Field id="width"     label={`Width (${lenLabel})`}     value={width}     onChange={setWidth}     error={errors.width} />
                  <Field id="thickness" label={`Thickness (${lenLabel})`} value={thickness} onChange={setThickness} error={errors.thickness} placeholder="e.g. 0.1" />
                </div>
              ) : (
                <div className="field-row">
                  <Field id="diameter"  label={`Diameter (${lenLabel})`}  value={diameter}  onChange={setDiameter}  error={errors.diameter} />
                  <Field id="thickness" label={`Thickness (${lenLabel})`} value={thickness} onChange={setThickness} error={errors.thickness} placeholder="e.g. 0.1" />
                </div>
              )}
            </div>

            {/* Presets */}
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Common thicknesses
              </h2>
              <div className="calc-presets">
                {PRESETS.map(p => (
                  <button key={p.label} type="button" className="preset-btn" onClick={() => applyPreset(p)}>
                    {p.label}
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
              <span className="result-hero__label">Total concrete needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? formatNum(result.total) : '—'}</span>
                <span>{result ? result.volLabel : volLabel}</span>
              </div>
              <p className="result-hero__note">
                {result ? `Includes ${wastePct}% waste allowance.` : 'Fill in dimensions to see your estimate.'}
              </p>
            </div>

            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row">
                    <dt>Net volume</dt>
                    <dd className="numeral">{formatNum(result.baseVolume)} {result.volLabel}</dd>
                  </div>
                  <div className="breakdown-row">
                    <dt>Waste allowance</dt>
                    <dd className="numeral">{formatNum(result.waste)} {result.volLabel}</dd>
                  </div>
                  <div className="breakdown-row total">
                    <dt>Total to order</dt>
                    <dd className="numeral">{formatNum(result.total)} {result.volLabel}</dd>
                  </div>
                  <div className="breakdown-row">
                    <dt>Approx. 60 lb bags (if mixing)</dt>
                    <dd className="numeral">{result.bags60lb}</dd>
                  </div>
                  <div className="breakdown-row">
                    <dt>Approx. 80 lb bags (if mixing)</dt>
                    <dd className="numeral">{result.bags80lb}</dd>
                  </div>
                </dl>
                <p className="disclaimer">
                  Bag counts assume standard 60 lb (≈0.45 ft³) and 80 lb (≈0.60 ft³) bags. Always confirm with your supplier. Actual yield varies by mix and application.
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
