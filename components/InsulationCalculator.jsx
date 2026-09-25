'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const INSULATION_TYPES = {
  batt_r13:    { label: 'Batt — R-13 (2×4 wall)',          rValue: 13,  costPerSqFt: 0.45, thkIn: 3.5  },
  batt_r19:    { label: 'Batt — R-19 (2×6 wall)',          rValue: 19,  costPerSqFt: 0.60, thkIn: 5.5  },
  batt_r30:    { label: 'Batt — R-30 (attic)',             rValue: 30,  costPerSqFt: 0.90, thkIn: 9.5  },
  batt_r38:    { label: 'Batt — R-38 (attic)',             rValue: 38,  costPerSqFt: 1.20, thkIn: 12   },
  blown_r30:   { label: 'Blown-in — R-30',                 rValue: 30,  costPerSqFt: 1.00, thkIn: 8    },
  blown_r38:   { label: 'Blown-in — R-38',                 rValue: 38,  costPerSqFt: 1.30, thkIn: 10   },
  rigid_r10:   { label: 'Rigid foam — R-10',               rValue: 10,  costPerSqFt: 0.80, thkIn: 2    },
  spray_r21:   { label: 'Spray foam — R-21',               rValue: 21,  costPerSqFt: 2.00, thkIn: 3.5  },
};

const CLIMATE_ZONES = [
  { label: 'Zone 1–2 (hot)',                 wallR: 13, atticR: 30 },
  { label: 'Zone 3 (warm)',                  wallR: 13, atticR: 38 },
  { label: 'Zone 4 (mixed)',                 wallR: 19, atticR: 38 },
  { label: 'Zone 5–6 (cold)',                wallR: 20, atticR: 49 },
  { label: 'Zone 7–8 (very cold / arctic)',  wallR: 21, atticR: 60 },
];

export default function InsulationCalculator() {
  const [unit, setUnit]           = useState('imperial');
  const [length, setLength]       = useState('');
  const [width, setWidth]         = useState('');
  const [insType, setInsType]     = useState('batt_r19');
  const [wastePct, setWastePct]   = useState('10');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';
  const areaLbl = isM ? 'm²' : 'sq ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function validate() {
    const e = {};
    if (!length || parseFloat(length) <= 0) e.length = 'Enter a value greater than 0.';
    if (!width  || parseFloat(width)  <= 0) e.width  = 'Enter a value greater than 0.';
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
    const totalFt2 = areaFt2 * (1 + wp / 100);
    const ins = INSULATION_TYPES[insType];
    const materialCost = totalFt2 * ins.costPerSqFt;
    const laborCost = totalFt2 * 0.50; // avg $0.50/sqft install
    const totalCost = materialCost + laborCost;
    const bags = ins.label.toLowerCase().includes('blown') ? Math.ceil(totalFt2 / 40) : null;
    const batts = !ins.label.toLowerCase().includes('blown') && !ins.label.toLowerCase().includes('spray')
      ? Math.ceil(totalFt2 / 40) : null; // standard batt covers ~40 sqft/bag

    const areaDisp = isM ? areaFt2 / 10.7639 : areaFt2;
    setResult({ areaDisp, areaLbl, totalFt2, materialCost, laborCost, totalCost,
      rValue: ins.rValue, thkIn: ins.thkIn, bags, batts, insLabel: ins.label });
  }

  function reset() {
    setLength(''); setWidth(''); setWastePct('10');
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
                Area to insulate
              </h2>
              <div className="field-row">
                <F id="ilength" label={`Length (${lenLbl})`} val={length} set={setLength} err={errors.length} />
                <F id="iwidth"  label={`Width (${lenLbl})`}  val={width}  set={setWidth}  err={errors.width} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l9-9 9 9M5 10v9h14V10"/></svg>
                Insulation type
              </h2>
              <div className="field">
                <label htmlFor="insType">Material &amp; R-value</label>
                <select id="insType" className="calc-select" value={insType}
                  onChange={ev => { setInsType(ev.target.value); setResult(null); }}>
                  {Object.entries(INSULATION_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <p className="group-hint" style={{ marginTop: '10px' }}>DOE recommended R-values by climate zone:</p>
              <div className="calc-presets">
                {CLIMATE_ZONES.map(z => (
                  <button key={z.label} type="button" className="preset-btn" title={`Wall R-${z.wallR}, Attic R-${z.atticR}`}>
                    {z.label.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <div className="field-row">
                <F id="iwaste" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} step="1" placeholder="10" />
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
              <span className="result-hero__label">Insulation needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalFt2, 0) : '—'}</span>
                <span>sq ft</span>
              </div>
              <p className="result-hero__note">{result ? `${result.insLabel}` : 'Enter area to calculate insulation needs.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Area</dt><dd className="numeral">{fmt(result.areaDisp, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row"><dt>R-value</dt><dd className="numeral">R-{result.rValue}</dd></div>
                  <div className="breakdown-row"><dt>Thickness</dt><dd className="numeral">{result.thkIn} in</dd></div>
                  <div className="breakdown-row total"><dt>Total area (with waste)</dt><dd className="numeral">{fmt(result.totalFt2, 0)} sq ft</dd></div>
                  {result.bags  && <div className="breakdown-row"><dt>Bags (blown-in, ~40 sq ft/bag)</dt><dd className="numeral">{result.bags}</dd></div>}
                  {result.batts && <div className="breakdown-row"><dt>Batt bundles (~40 sq ft)</dt><dd className="numeral">{result.batts}</dd></div>}
                  <div className="breakdown-row"><dt>Material cost (est.)</dt><dd className="numeral">${fmt(result.materialCost, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Installation (est.)</dt><dd className="numeral">${fmt(result.laborCost, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Total estimate</dt><dd className="numeral">${fmt(result.totalCost, 0)}</dd></div>
                </dl>
                <p className="disclaimer">R-value requirements vary by climate zone and application (wall, attic, floor). Consult DOE guidelines and local building codes. Cost rates are indicative averages.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
