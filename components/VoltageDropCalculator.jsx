'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Resistivity (ohms·circular mils / foot) for copper and aluminum
const MATERIALS = {
  copper:    { label: 'Copper',    resistivity: 10.4 },
  aluminum:  { label: 'Aluminum',  resistivity: 17.0 },
};

// AWG wire sizes: circular mils area
const WIRE_GAUGES = {
  '14': { label: '#14 AWG', cmils: 4110  },
  '12': { label: '#12 AWG', cmils: 6530  },
  '10': { label: '#10 AWG', cmils: 10380 },
  '8':  { label: '#8 AWG',  cmils: 16510 },
  '6':  { label: '#6 AWG',  cmils: 26240 },
  '4':  { label: '#4 AWG',  cmils: 41740 },
  '2':  { label: '#2 AWG',  cmils: 66360 },
  '1':  { label: '#1 AWG',  cmils: 83690 },
  '1/0':{ label: '#1/0 AWG',cmils: 105600},
  '2/0':{ label: '#2/0 AWG',cmils: 133100},
  '3/0':{ label: '#3/0 AWG',cmils: 167800},
  '4/0':{ label: '#4/0 AWG',cmils: 211600},
};

export default function VoltageDropCalculator() {
  const [system, setSystem]     = useState('single');  // single or three phase
  const [voltage, setVoltage]   = useState('120');
  const [current, setCurrent]   = useState('');
  const [distance, setDistance] = useState('');
  const [gauge, setGauge]       = useState('12');
  const [material, setMaterial] = useState('copper');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  function validate() {
    const e = {};
    if (!voltage  || parseFloat(voltage)  <= 0) e.voltage  = 'Enter a value greater than 0.';
    if (!current  || parseFloat(current)  <= 0) e.current  = 'Enter a value greater than 0.';
    if (!distance || parseFloat(distance) <= 0) e.distance = 'Enter a value greater than 0.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const V  = parseFloat(voltage);
    const I  = parseFloat(current);
    const D  = parseFloat(distance); // one-way feet
    const rho = MATERIALS[material].resistivity;
    const cmils = WIRE_GAUGES[gauge].cmils;
    // resistance per foot = resistivity / cmils; total = 2 * one-way (round trip)
    const k = system === 'three' ? Math.sqrt(3) : 2;
    const vDrop = (k * rho * D * I) / cmils;
    const pct   = (vDrop / V) * 100;
    const vAtLoad = V - vDrop;

    setResult({ vDrop, pct, vAtLoad });
  }

  function reset() {
    setVoltage('120'); setCurrent(''); setDistance(''); setErrors({}); setResult(null);
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

  const dropStatus = result
    ? result.pct <= 3 ? 'Acceptable (≤3%)' : result.pct <= 5 ? 'Marginal (3–5%)' : 'Excessive (>5%)'
    : null;

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
                <F id="current"  label="Load current (A)"     val={current}  set={setCurrent}  err={errors.current}  placeholder="15" />
              </div>
              <div className="field-row" style={{ marginTop: 12 }}>
                <F id="distance" label="One-way distance (ft)" val={distance} set={setDistance} err={errors.distance} placeholder="50" />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                Wire specification
              </h2>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="gauge">Wire gauge (AWG)</label>
                  <select id="gauge" className="calc-select" value={gauge}
                    onChange={e => { setGauge(e.target.value); setResult(null); }}>
                    {Object.entries(WIRE_GAUGES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="material">Conductor material</label>
                  <select id="material" className="calc-select" value={material}
                    onChange={e => { setMaterial(e.target.value); setResult(null); }}>
                    {Object.entries(MATERIALS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
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
              <span className="result-hero__label">Voltage drop</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.vDrop, 2) : '—'}</span>
                <span>V</span>
              </div>
              <p className="result-hero__note">
                {result ? dropStatus : 'Enter circuit details to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Voltage drop</dt><dd className="numeral">{fmt(result.vDrop, 2)} V</dd></div>
                  <div className="breakdown-row"><dt>Drop percentage</dt><dd className="numeral">{fmt(result.pct, 2)} %</dd></div>
                  <div className="breakdown-row total"><dt>Voltage at load</dt><dd className="numeral">{fmt(result.vAtLoad, 2)} V</dd></div>
                </dl>
                <p className="disclaimer">NEC recommends ≤3% drop on branch circuits and ≤5% total from service to load. Consult a licensed electrician for all wiring work.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
