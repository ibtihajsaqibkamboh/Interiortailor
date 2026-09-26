'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// AWG amp capacity (copper, 60°C, NEC 310.15) and circular mils
const AWG_TABLE = [
  { awg: '14',  label: '#14 AWG', amps60: 15,  cmils: 4110   },
  { awg: '12',  label: '#12 AWG', amps60: 20,  cmils: 6530   },
  { awg: '10',  label: '#10 AWG', amps60: 30,  cmils: 10380  },
  { awg: '8',   label: '#8 AWG',  amps60: 40,  cmils: 16510  },
  { awg: '6',   label: '#6 AWG',  amps60: 55,  cmils: 26240  },
  { awg: '4',   label: '#4 AWG',  amps60: 70,  cmils: 41740  },
  { awg: '2',   label: '#2 AWG',  amps60: 95,  cmils: 66360  },
  { awg: '1',   label: '#1 AWG',  amps60: 110, cmils: 83690  },
  { awg: '1/0', label: '#1/0 AWG',amps60: 125, cmils: 105600 },
  { awg: '2/0', label: '#2/0 AWG',amps60: 145, cmils: 133100 },
  { awg: '3/0', label: '#3/0 AWG',amps60: 165, cmils: 167800 },
  { awg: '4/0', label: '#4/0 AWG',amps60: 195, cmils: 211600 },
];

const MATERIALS = {
  copper:   { label: 'Copper',   rho: 10.4 },
  aluminum: { label: 'Aluminum', rho: 17.0 },
};

export default function WireSizeCalculator() {
  const [system, setSystem]     = useState('single');
  const [voltage, setVoltage]   = useState('120');
  const [current, setCurrent]   = useState('');
  const [distance, setDistance] = useState('');
  const [material, setMaterial] = useState('copper');
  const [maxDrop, setMaxDrop]   = useState('3');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  function validate() {
    const e = {};
    if (!voltage  || parseFloat(voltage)  <= 0) e.voltage  = 'Enter a value greater than 0.';
    if (!current  || parseFloat(current)  <= 0) e.current  = 'Enter a value greater than 0.';
    if (!distance || parseFloat(distance) <= 0) e.distance = 'Enter a value greater than 0.';
    const d = parseFloat(maxDrop);
    if (isNaN(d) || d <= 0 || d > 10) e.maxDrop = 'Enter a percentage between 0.1 and 10.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const V   = parseFloat(voltage);
    const I   = parseFloat(current);
    const D   = parseFloat(distance);
    const rho = MATERIALS[material].rho;
    const k   = system === 'three' ? Math.sqrt(3) : 2;
    const maxVDrop = V * parseFloat(maxDrop) / 100;

    // Required circular mils: cmils = (k * rho * D * I) / maxVDrop
    const reqCmils = (k * rho * D * I) / maxVDrop;

    // Find smallest AWG that meets both ampacity AND voltage drop
    let byAmps = AWG_TABLE.filter(r => r.amps60 >= I);
    let recommended = AWG_TABLE.find(r => r.cmils >= reqCmils && r.amps60 >= I);

    if (!recommended) recommended = AWG_TABLE[AWG_TABLE.length - 1];

    // What drop does recommended wire actually give?
    const actualDrop = (k * rho * D * I) / recommended.cmils;
    const actualPct  = (actualDrop / V) * 100;

    setResult({ recommended, reqCmils, actualDrop, actualPct, byAmps });
  }

  function reset() {
    setVoltage('120'); setCurrent(''); setDistance(''); setMaxDrop('3'); setErrors({}); setResult(null);
  }

  function F({ id, label, val, set, err, placeholder = '0' }) {
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
          <section className="panel panel--inputs" aria-label="Circuit details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                System type
              </h2>
              <div className="units-toggle" role="radiogroup" style={{ marginBottom: 0 }}>
                {[['single','Single Phase'],['three','Three Phase']].map(([k,l]) => (
                  <button key={k} type="button" className={`unit-btn${system === k ? ' is-active' : ''}`} aria-pressed={system === k}
                    onClick={() => { setSystem(k); setResult(null); }}>{l}</button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/></svg>
                Circuit parameters
              </h2>
              <div className="field-row">
                <F id="voltage"  label="Source voltage (V)"   val={voltage}  set={setVoltage}  err={errors.voltage}  placeholder="120" />
                <F id="current"  label="Load current (A)"     val={current}  set={setCurrent}  err={errors.current}  placeholder="20" />
              </div>
              <div className="field-row" style={{ marginTop: 12 }}>
                <F id="distance" label="One-way run (ft)"     val={distance} set={setDistance} err={errors.distance} placeholder="50" />
                <F id="maxDrop"  label="Max voltage drop (%)" val={maxDrop}  set={setMaxDrop}  err={errors.maxDrop}  placeholder="3" />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h18"/></svg>
                Conductor material
              </h2>
              <div className="field">
                <label htmlFor="material">Material</label>
                <select id="material" className="calc-select" value={material}
                  onChange={e => { setMaterial(e.target.value); setResult(null); }}>
                  {Object.entries(MATERIALS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
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
              <span className="result-hero__label">Recommended wire size</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? result.recommended.awg : '—'}</span>
                <span>AWG</span>
              </div>
              <p className="result-hero__note">
                {result ? `${result.recommended.amps60} A capacity · ${material}` : 'Enter circuit details to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Recommended gauge</dt><dd className="numeral">{result.recommended.label}</dd></div>
                  <div className="breakdown-row"><dt>Ampacity (60°C)</dt><dd className="numeral">{result.recommended.amps60} A</dd></div>
                  <div className="breakdown-row total"><dt>Actual voltage drop</dt><dd className="numeral">{fmt(result.actualDrop, 2)} V ({fmt(result.actualPct, 2)}%)</dd></div>
                </dl>
                <p className="disclaimer">Based on NEC 310.15 ampacity tables. Always consult a licensed electrician and local codes before wiring. Conduit fill, temperature corrections and other factors may change the required wire size.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
