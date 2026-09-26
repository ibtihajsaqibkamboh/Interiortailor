'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Maximum allowable spans (feet) for common lumber sizes, Douglas Fir-Larch #2, 40 psf live load, 10 psf dead load
// Source: simplified span tables (prescriptive per IRC 2021)
const SPAN_TABLE = {
  '2x6':  { '12': 11.1, '16': 10.2, '24': 8.9  },
  '2x8':  { '12': 14.8, '16': 13.5, '24': 11.7 },
  '2x10': { '12': 18.6, '16': 16.9, '24': 14.7 },
  '2x12': { '12': 22.1, '16': 20.0, '24': 17.5 },
  '2x14': { '12': 25.0, '16': 22.0, '24': 19.5 },
};

const SPECIES = {
  df:  'Douglas Fir-Larch #2',
  ssp: 'Southern Yellow Pine #2',
  hem: 'Hem-Fir #2',
  spr: 'Spruce-Pine-Fir #2',
};

export default function JoistSpanCalculator() {
  const [span, setSpan]       = useState('');
  const [spacing, setSpacing] = useState('16');
  const [species, setSpecies] = useState('df');
  const [load, setLoad]       = useState('40');
  const [errors, setErrors]   = useState({});
  const [result, setResult]   = useState(null);

  function validate() {
    const e = {};
    if (!span    || parseFloat(span)    <= 0) e.span    = 'Enter a span greater than 0.';
    if (!load    || parseFloat(load)    <= 0) e.load    = 'Enter a live load greater than 0.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const spanFt = parseFloat(span);
    const oc     = spacing;
    const loadPsf = parseFloat(load);
    // Apply load adjustment (table is for 40 psf; heavier loads reduce allowable span)
    const loadFactor = Math.sqrt(40 / loadPsf);

    const recommendations = Object.entries(SPAN_TABLE).map(([size, spacings]) => {
      const baseSpan = spacings[oc] || spacings['16'];
      const adjSpan  = baseSpan * loadFactor;
      return { size, adjSpan, ok: adjSpan >= spanFt };
    });

    const smallest = recommendations.find(r => r.ok);
    setResult({ recommendations, smallest, spanFt, oc, loadPsf });
  }

  function reset() {
    setSpan(''); setSpacing('16'); setLoad('40'); setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, placeholder = '0' }) {
    return (
      <div className={`field${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} type="number" inputMode="decimal" min="0" step="any" value={val} placeholder={placeholder}
          onChange={ev => { set(ev.target.value); setErrors(p => ({ ...p, [id]: undefined })); setResult(null); }} />
        {err && <span className="field-error">{err}</span>}
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="calc-tool">
        <div className="layout">
          <section className="panel panel--inputs" aria-label="Joist details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Span &amp; spacing
              </h2>
              <div className="field-row">
                <F id="span" label="Required span (ft)" val={span} set={setSpan} err={errors.span} placeholder="14" />
                <F id="load" label="Live load (psf)"    val={load} set={setLoad} err={errors.load} placeholder="40" />
              </div>
              <div className="field" style={{ marginTop: 12 }}>
                <label htmlFor="spacing">Joist spacing (in o.c.)</label>
                <select id="spacing" className="calc-select" value={spacing}
                  onChange={e => { setSpacing(e.target.value); setResult(null); }}>
                  <option value="12">12 in o.c.</option>
                  <option value="16">16 in o.c.</option>
                  <option value="24">24 in o.c.</option>
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="8" width="20" height="8" rx="1"/></svg>
                Wood species
              </h2>
              <div className="field">
                <label htmlFor="species">Species / grade</label>
                <select id="species" className="calc-select" value={species}
                  onChange={e => { setSpecies(e.target.value); setResult(null); }}>
                  {Object.entries(SPECIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
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
              <span className="result-hero__label">Minimum joist size</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? (result.smallest ? result.smallest.size : 'N/A') : '—'}</span>
                <span>{result && result.smallest ? 'lumber' : ''}</span>
              </div>
              <p className="result-hero__note">
                {result
                  ? result.smallest
                    ? `${spacing}" o.c. · max span ${fmt(result.smallest.adjSpan, 1)} ft`
                    : 'Span exceeds table limits — consult an engineer.'
                  : 'Enter span and spacing to calculate.'}
              </p>
            </div>
            {result && result.recommendations && (
              <>
                <dl className="breakdown">
                  {result.recommendations.map(r => (
                    <div key={r.size} className={`breakdown-row${r.ok ? '' : ''}`}>
                      <dt style={{ color: r.ok ? 'inherit' : 'var(--c-text-muted)' }}>{r.size}</dt>
                      <dd className="numeral" style={{ color: r.ok ? 'inherit' : 'var(--c-text-muted)' }}>
                        {r.ok ? `✓ ${fmt(r.adjSpan, 1)} ft max` : `✗ ${fmt(r.adjSpan, 1)} ft max`}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="disclaimer">Simplified table based on IRC prescriptive spans for Douglas Fir-Larch #2, with live load adjustment. Always verify with your local building code and a licensed structural engineer.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
