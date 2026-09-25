'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const THICKNESS_PRESETS_IMP = [
  { label: '3.5" (standard slab)', val: '3.5' },
  { label: '4" (driveway)',        val: '4'   },
  { label: '6" (heavy load)',      val: '6'   },
];
const THICKNESS_PRESETS_MET = [
  { label: '90 mm (standard)',  val: '90'  },
  { label: '100 mm (driveway)', val: '100' },
  { label: '150 mm (heavy)',    val: '150' },
];

export default function ConcreteSlabCalculator() {
  const [unit, setUnit]             = useState('imperial');
  const [length, setLength]         = useState('');
  const [width, setWidth]           = useState('');
  const [thickness, setThickness]   = useState('');
  const [wastePct, setWastePct]     = useState('10');
  const [errors, setErrors]         = useState({});
  const [result, setResult]         = useState(null);

  const isImp   = unit === 'imperial';
  const lenLbl  = isImp ? 'ft' : 'm';
  const thkLbl  = isImp ? 'in' : 'mm';
  const volLbl  = isImp ? 'yd³' : 'm³';

  function toFt(v) { const n = parseFloat(v); return isImp ? n : n * 3.28084; }
  function thkToFt(v) { const n = parseFloat(v); return isImp ? n / 12 : (n / 1000) * 3.28084; }

  function validate() {
    const e = {};
    if (!length    || parseFloat(length)    <= 0) e.length    = 'Enter a value greater than 0.';
    if (!width     || parseFloat(width)     <= 0) e.width     = 'Enter a value greater than 0.';
    if (!thickness || parseFloat(thickness) <= 0) e.thickness = 'Enter a value greater than 0.';
    const wp = parseFloat(wastePct);
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const lFt = toFt(length);
    const wFt = toFt(width);
    const tFt = thkToFt(thickness);

    const volFt3   = lFt * wFt * tFt;
    const volYd3   = volFt3 / 27;
    const wp       = parseFloat(wastePct);
    const totalYd3 = volYd3 * (1 + wp / 100);
    const totalM3  = totalYd3 / 1.30795;

    // bags: 1 × 80lb bag ≈ 0.6 ft³ → need (totalFt3 / 0.6) bags
    const totalFt3WithWaste = volFt3 * (1 + wp / 100);
    const bags80lb = Math.ceil(totalFt3WithWaste / 0.60);
    const bags60lb = Math.ceil(totalFt3WithWaste / 0.45);

    setResult({
      areaFt2: lFt * wFt,
      volDisplay:  isImp ? totalYd3 : totalM3,
      volBase:     isImp ? volYd3   : totalM3 / (1 + wp / 100),
      waste:       isImp ? totalYd3 - volYd3 : totalM3 - totalM3 / (1 + wp / 100),
      bags80lb, bags60lb, volLbl,
    });
  }

  function reset() {
    setLength(''); setWidth(''); setThickness(''); setWastePct('10');
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

  const presets = isImp ? THICKNESS_PRESETS_IMP : THICKNESS_PRESETS_MET;

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="units-toggle" role="radiogroup">
          {['imperial', 'metric'].map(u => (
            <button key={u} type="button" className={`unit-btn${unit === u ? ' is-active' : ''}`} aria-pressed={unit === u}
              onClick={() => { setUnit(u); reset(); }}>
              {u === 'imperial' ? 'Imperial · ft & in' : 'Metric · m & mm'}
            </button>
          ))}
        </div>

        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg>
                Slab dimensions
              </h2>
              <div className="field-row">
                <F id="cslength"    label={`Length (${lenLbl})`}       val={length}    set={setLength}    err={errors.length} />
                <F id="cswidth"     label={`Width (${lenLbl})`}        val={width}     set={setWidth}     err={errors.width} />
                <F id="csthickness" label={`Thickness (${thkLbl})`}   val={thickness} set={setThickness} err={errors.thickness}
                  placeholder={isImp ? 'e.g. 4' : 'e.g. 100'} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Common thicknesses
              </h2>
              <div className="calc-presets">
                {presets.map(p => (
                  <button key={p.label} type="button" className="preset-btn"
                    onClick={() => { setThickness(p.val); setErrors(ep => ({ ...ep, csthickness: undefined })); setResult(null); }}>
                    {p.label}
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
                <F id="cswaste" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} step="1" placeholder="10" />
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
              <span className="result-hero__label">Concrete to order</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.volDisplay) : '—'}</span>
                <span>{result ? result.volLbl : volLbl}</span>
              </div>
              <p className="result-hero__note">{result ? `Includes ${wastePct}% waste.` : 'Enter slab dimensions to calculate.'}</p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Slab area</dt><dd className="numeral">{fmt(result.areaFt2, 1)} ft²</dd></div>
                  <div className="breakdown-row"><dt>Net volume</dt><dd className="numeral">{fmt(result.volBase)} {result.volLbl}</dd></div>
                  <div className="breakdown-row"><dt>Waste allowance</dt><dd className="numeral">{fmt(result.waste)} {result.volLbl}</dd></div>
                  <div className="breakdown-row total"><dt>Total to order</dt><dd className="numeral">{fmt(result.volDisplay)} {result.volLbl}</dd></div>
                  <div className="breakdown-row"><dt>Equiv. 60 lb bags</dt><dd className="numeral">{result.bags60lb}</dd></div>
                  <div className="breakdown-row"><dt>Equiv. 80 lb bags</dt><dd className="numeral">{result.bags80lb}</dd></div>
                </dl>
                <p className="disclaimer">For slabs over 1 yd³ / 0.76 m³, ready-mix truck delivery is usually more practical. Always confirm slab thickness requirements with a structural engineer for load-bearing applications.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
