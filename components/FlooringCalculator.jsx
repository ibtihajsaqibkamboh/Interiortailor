'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

const FLOORING_TYPES = {
  hardwood:   { label: 'Hardwood flooring',            costPerSqFt: 8  },
  laminate:   { label: 'Laminate flooring',            costPerSqFt: 3  },
  vinyl_plank:{ label: 'Luxury vinyl plank (LVP)',     costPerSqFt: 4  },
  carpet:     { label: 'Carpet',                       costPerSqFt: 3.5},
  tile:       { label: 'Ceramic / porcelain tile',     costPerSqFt: 5  },
  engineered: { label: 'Engineered hardwood',          costPerSqFt: 6  },
};

export default function FlooringCalculator() {
  const [unit, setUnit]         = useState('imperial');
  const [rooms, setRooms]       = useState([{ id: 1, l: '', w: '' }]);
  const [flooringType, setFlooringType] = useState('laminate');
  const [wastePct, setWastePct] = useState('10');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);
  const nextId = () => Date.now();

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';
  const areaLbl = isM ? 'm²' : 'sq ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function addRoom() {
    setRooms(r => [...r, { id: nextId(), l: '', w: '' }]);
    setResult(null);
  }
  function removeRoom(id) {
    setRooms(r => r.filter(x => x.id !== id));
    setResult(null);
  }
  function updateRoom(id, field, val) {
    setRooms(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));
    setErrors(p => ({ ...p, [`${id}_${field}`]: undefined }));
    setResult(null);
  }

  function validate() {
    const e = {};
    rooms.forEach(r => {
      if (!r.l || parseFloat(r.l) <= 0) e[`${r.id}_l`] = 'Enter > 0.';
      if (!r.w || parseFloat(r.w) <= 0) e[`${r.id}_w`] = 'Enter > 0.';
    });
    const wp = parseFloat(wastePct);
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const totalFt2 = rooms.reduce((sum, r) => sum + toFt(r.l) * toFt(r.w), 0);
    const wp = parseFloat(wastePct);
    const withWaste = totalFt2 * (1 + wp / 100);
    const mat = FLOORING_TYPES[flooringType];
    const materialCost = withWaste * mat.costPerSqFt;
    const laborCost = withWaste * 2.5; // ~$2.50/sqft install average
    const totalCost = materialCost + laborCost;
    const areaDisplay = isM ? totalFt2 / 10.7639 : totalFt2;
    const boxes = Math.ceil(withWaste / 20); // ~20 sqft per box common for LVP/laminate

    setResult({ areaDisplay, areaLbl, withWaste: isM ? withWaste / 10.7639 : withWaste,
      materialCost, laborCost, totalCost, boxes, matLabel: mat.label });
  }

  function reset() {
    setRooms([{ id: 1, l: '', w: '' }]); setWastePct('10');
    setErrors({}); setResult(null);
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
                Rooms / areas
              </h2>
              <p className="group-hint">Add each room separately for a combined total.</p>
              {rooms.map((room, idx) => (
                <div key={room.id} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginTop: '12px' }}>
                  <div className="field-row" style={{ flex: 1, marginTop: 0 }}>
                    <div className={`field${errors[`${room.id}_l`] ? ' has-error' : ''}`}>
                      <label htmlFor={`rl${room.id}`}>Room {idx + 1} Length ({lenLbl})</label>
                      <input id={`rl${room.id}`} type="number" inputMode="decimal" min="0" step="any" value={room.l}
                        onChange={ev => updateRoom(room.id, 'l', ev.target.value)} />
                      {errors[`${room.id}_l`] && <span className="field-error">{errors[`${room.id}_l`]}</span>}
                    </div>
                    <div className={`field${errors[`${room.id}_w`] ? ' has-error' : ''}`}>
                      <label htmlFor={`rw${room.id}`}>Room {idx + 1} Width ({lenLbl})</label>
                      <input id={`rw${room.id}`} type="number" inputMode="decimal" min="0" step="any" value={room.w}
                        onChange={ev => updateRoom(room.id, 'w', ev.target.value)} />
                      {errors[`${room.id}_w`] && <span className="field-error">{errors[`${room.id}_w`]}</span>}
                    </div>
                  </div>
                  {rooms.length > 1 && (
                    <button type="button" onClick={() => removeRoom(room.id)} title="Remove room"
                      style={{ marginTop: '22px', flexShrink: 0, background: 'var(--bg)', border: '1.5px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: '9px 10px', cursor: 'pointer', color: 'var(--ink-soft)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="preset-btn" style={{ marginTop: '12px' }} onClick={addRoom}>
                + Add room
              </button>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>
                Flooring type
              </h2>
              <div className="field">
                <label htmlFor="flooringType">Material</label>
                <select id="flooringType" className="calc-select" value={flooringType}
                  onChange={e => { setFlooringType(e.target.value); setResult(null); }}>
                  {Object.entries(FLOORING_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Waste allowance
              </h2>
              <div className="field-row">
                <div className={`field${errors.wastePct ? ' has-error' : ''}`}>
                  <label htmlFor="fwaste">Waste (%)</label>
                  <input id="fwaste" type="number" inputMode="numeric" min="0" step="1" value={wastePct}
                    onChange={ev => { setWastePct(ev.target.value); setErrors(p => ({ ...p, wastePct: undefined })); setResult(null); }} />
                  {errors.wastePct && <span className="field-error">{errors.wastePct}</span>}
                </div>
              </div>
              <p className="group-hint">Recommend 10% for straight runs, 15% for diagonal patterns.</p>
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Total flooring needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.withWaste) : '—'}</span>
                <span>{result ? result.areaLbl : areaLbl}</span>
              </div>
              <p className="result-hero__note">
                {result ? `${result.matLabel} · ${rooms.length} room${rooms.length > 1 ? 's' : ''}` : 'Enter room dimensions to see estimate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Net area ({rooms.length} room{rooms.length > 1 ? 's' : ''})</dt><dd className="numeral">{fmt(result.areaDisplay, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row total"><dt>With waste ({wastePct}%)</dt><dd className="numeral">{fmt(result.withWaste, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row"><dt>Approx. boxes (20 sq ft)</dt><dd className="numeral">{result.boxes}</dd></div>
                  <div className="breakdown-row"><dt>Material cost (est.)</dt><dd className="numeral">${fmt(result.materialCost, 0)}</dd></div>
                  <div className="breakdown-row"><dt>Installation (est.)</dt><dd className="numeral">${fmt(result.laborCost, 0)}</dd></div>
                  <div className="breakdown-row total"><dt>Total cost estimate</dt><dd className="numeral">${fmt(result.totalCost, 0)}</dd></div>
                </dl>
                <p className="disclaimer">Box count assumes ~20 sq ft per box (common for LVP/laminate). Actual boxes per pack vary. Cost rates are indicative North American averages.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
