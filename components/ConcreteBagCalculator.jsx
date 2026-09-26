'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Yields per bag in cubic feet (approximate)
const BAG_SIZES = {
  '40lb':  { label: '40 lb bag',  yieldFt3: 0.30, yieldL: 8.5  },
  '50lb':  { label: '50 lb bag',  yieldFt3: 0.375, yieldL: 10.6 },
  '60lb':  { label: '60 lb bag',  yieldFt3: 0.45,  yieldL: 12.7 },
  '80lb':  { label: '80 lb bag',  yieldFt3: 0.60,  yieldL: 17.0 },
};

export default function ConcreteBagCalculator() {
  const [unit, setUnit]           = useState('imperial');
  const [volume, setVolume]       = useState('');
  const [volUnit, setVolUnit]     = useState('yd3');  // yd3 | ft3 | m3
  const [bagSize, setBagSize]     = useState('80lb');
  const [wastePct, setWastePct]   = useState('5');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

  function toFt3(v) {
    const n = parseFloat(v);
    if (volUnit === 'yd3') return n * 27;
    if (volUnit === 'm3')  return n * 35.3147;
    return n; // ft3
  }

  function validate() {
    const e = {};
    if (!volume || parseFloat(volume) <= 0) e.volume = 'Enter a volume greater than 0.';
    const wp = parseFloat(wastePct);
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const ft3 = toFt3(volume);
    const wp  = parseFloat(wastePct);
    const ft3WithWaste = ft3 * (1 + wp / 100);
    const bag  = BAG_SIZES[bagSize];
    const bags = Math.ceil(ft3WithWaste / bag.yieldFt3);

    // also compute all bag sizes
    const allBags = Object.entries(BAG_SIZES).map(([k, v]) => ({
      label: v.label,
      bags: Math.ceil(ft3WithWaste / v.yieldFt3),
    }));

    setResult({ ft3WithWaste, yd3: ft3WithWaste / 27, bags, bagLabel: bag.label, allBags });
  }

  function reset() {
    setVolume(''); setWastePct('5'); setErrors({}); setResult(null);
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
        <div className="layout">
          <section className="panel panel--inputs" aria-label="Project details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></svg>
                Concrete volume needed
              </h2>
              <div className="field-row">
                <F id="cbvolume" label="Volume" val={volume} set={setVolume} err={errors.volume} placeholder="e.g. 2" />
                <div className="field">
                  <label htmlFor="cbvolunit">Unit</label>
                  <select id="cbvolunit" className="calc-select" value={volUnit}
                    onChange={e => { setVolUnit(e.target.value); setResult(null); }}>
                    <option value="yd3">Cubic yards (yd³)</option>
                    <option value="ft3">Cubic feet (ft³)</option>
                    <option value="m3">Cubic metres (m³)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg>
                Bag size
              </h2>
              <div className="field">
                <label htmlFor="cbBagSize">Bag weight</label>
                <select id="cbBagSize" className="calc-select" value={bagSize}
                  onChange={e => { setBagSize(e.target.value); setResult(null); }}>
                  {Object.entries(BAG_SIZES).map(([k, v]) => (
                    <option key={k} value={k}>{v.label} — yields ~{v.yieldFt3} ft³ / {v.yieldL} L</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <div className="field-row">
                <F id="cbwaste" label="Waste (%)" val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="5" />
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
              <span className="result-hero__label">Bags needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.bags, 0) : '—'}</span>
                <span>{result ? result.bagLabel.replace(' bag','') : ''}</span>
              </div>
              <p className="result-hero__note">
                {result ? `${fmt(result.ft3WithWaste, 2)} ft³ total incl. ${wastePct}% waste` : 'Enter volume to calculate bag count.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Volume incl. waste</dt><dd className="numeral">{fmt(result.ft3WithWaste, 2)} ft³</dd></div>
                  <div className="breakdown-row"><dt>Volume (yd³)</dt><dd className="numeral">{fmt(result.yd3, 2)}</dd></div>
                  <div className="breakdown-row total"><dt>{result.bagLabel}s needed</dt><dd className="numeral">{fmt(result.bags, 0)}</dd></div>
                </dl>
                <div style={{ marginTop: '18px' }}>
                  <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: '.88rem' }}>All bag sizes comparison:</p>
                  <dl className="breakdown">
                    {result.allBags.map(b => (
                      <div key={b.label} className={`breakdown-row${b.label === result.bagLabel ? ' total' : ''}`}>
                        <dt>{b.label}s</dt>
                        <dd className="numeral">{fmt(b.bags, 0)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <p className="disclaimer">Yields are approximate. Actual yield depends on mix, water ratio and ambient conditions. Always check the manufacturer's stated yield on the bag.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
