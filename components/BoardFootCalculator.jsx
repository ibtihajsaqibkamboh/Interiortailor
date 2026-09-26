'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

export default function BoardFootCalculator() {
  const [thickness, setThickness] = useState('');
  const [width, setWidth]         = useState('');
  const [length, setLength]       = useState('');
  const [qty, setQty]             = useState('1');
  const [pricePerBF, setPricePerBF] = useState('');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

  function validate() {
    const e = {};
    if (!thickness || parseFloat(thickness) <= 0) e.thickness = 'Enter a value greater than 0.';
    if (!width     || parseFloat(width)     <= 0) e.width     = 'Enter a value greater than 0.';
    if (!length    || parseFloat(length)    <= 0) e.length    = 'Enter a value greater than 0.';
    if (!qty       || parseFloat(qty)       <= 0) e.qty       = 'Enter a value greater than 0.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    // Board feet = (Thickness in × Width in × Length ft) / 12
    const t = parseFloat(thickness);
    const w = parseFloat(width);
    const l = parseFloat(length);
    const q = parseFloat(qty);
    const bfPerBoard = (t * w * l) / 12;
    const totalBF = bfPerBoard * q;
    const price = parseFloat(pricePerBF);
    const totalCost = (!isNaN(price) && price > 0) ? totalBF * price : null;

    setResult({ bfPerBoard, totalBF, totalCost });
  }

  function reset() {
    setThickness(''); setWidth(''); setLength(''); setQty('1'); setPricePerBF(''); setErrors({}); setResult(null);
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
          <section className="panel panel--inputs" aria-label="Board details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="8" width="20" height="8" rx="1"/></svg>
                Board dimensions
              </h2>
              <div className="field-row">
                <F id="thickness" label="Thickness (in)" val={thickness} set={setThickness} err={errors.thickness} placeholder="1" note="Nominal or actual" />
                <F id="width"     label="Width (in)"     val={width}     set={setWidth}     err={errors.width}     placeholder="6" />
              </div>
              <div className="field-row" style={{ marginTop: 12 }}>
                <F id="length" label="Length (ft)" val={length} set={setLength} err={errors.length} placeholder="8" />
                <F id="qty"    label="Quantity (boards)" val={qty} set={setQty} err={errors.qty} placeholder="1" />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M2 12h20"/></svg>
                Cost estimate (optional)
              </h2>
              <F id="pricePerBF" label="Price per board foot ($)" val={pricePerBF} set={setPricePerBF} err={errors.pricePerBF} placeholder="4.50" />
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Total board feet</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.totalBF, 2) : '—'}</span>
                <span>BF</span>
              </div>
              <p className="result-hero__note">
                {result ? `${fmt(result.bfPerBoard, 2)} BF per board` : 'Enter board dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Board feet per board</dt><dd className="numeral">{fmt(result.bfPerBoard, 2)} BF</dd></div>
                  <div className="breakdown-row total"><dt>Total board feet</dt><dd className="numeral">{fmt(result.totalBF, 2)} BF</dd></div>
                  {result.totalCost !== null && (
                    <div className="breakdown-row"><dt>Estimated cost</dt><dd className="numeral">${fmt(result.totalCost, 2)}</dd></div>
                  )}
                </dl>
                <p className="disclaimer">Board feet formula: (Thickness × Width × Length) ÷ 12. Uses nominal dimensions as entered. Actual lumber dimensions may differ from nominal sizes.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
