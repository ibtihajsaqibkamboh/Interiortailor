'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Standard roll: 27 in wide × 27 ft long = ~56 sq ft usable (after trim)
// European roll: 20.5 in × 33 ft ≈ 57 sq ft usable
const ROLL_TYPES = {
  american:  { label: 'US standard (27" × 27 ft)',    usableSqFt: 56  },
  european:  { label: 'European (20.5" × 33 ft)',     usableSqFt: 57  },
  double:    { label: 'Double roll (27" × 54 ft)',    usableSqFt: 112 },
  custom:    { label: 'Custom roll size',              usableSqFt: 0   },
};

export default function WallpaperCalculator() {
  const [unit, setUnit]           = useState('imperial');
  const [roomL, setRoomL]         = useState('');
  const [roomW, setRoomW]         = useState('');
  const [wallH, setWallH]         = useState('');
  const [doors, setDoors]         = useState('1');
  const [windows, setWindows]     = useState('2');
  const [rollType, setRollType]   = useState('american');
  const [custSqFt, setCustSqFt]   = useState('');
  const [patternR, setPatternR]   = useState('0');
  const [wastePct, setWastePct]   = useState('15');
  const [errors, setErrors]       = useState({});
  const [result, setResult]       = useState(null);

  const isM = unit === 'metric';
  const lenLbl = isM ? 'm' : 'ft';

  function toFt(v) { const n = parseFloat(v); return isM ? n * 3.28084 : n; }

  function rollSqFt() {
    if (rollType === 'custom') return parseFloat(custSqFt) || 0;
    return ROLL_TYPES[rollType].usableSqFt;
  }

  function validate() {
    const e = {};
    if (!roomL || parseFloat(roomL) <= 0) e.roomL = 'Enter > 0.';
    if (!roomW || parseFloat(roomW) <= 0) e.roomW = 'Enter > 0.';
    if (!wallH || parseFloat(wallH) <= 0) e.wallH = 'Enter > 0.';
    if (rollType === 'custom' && (!custSqFt || parseFloat(custSqFt) <= 0)) e.custSqFt = 'Enter roll sq ft > 0.';
    const d = parseFloat(doors), w = parseFloat(windows), pr = parseFloat(patternR), wp = parseFloat(wastePct);
    if (isNaN(d) || d < 0) e.doors = 'Enter 0 or more.';
    if (isNaN(w) || w < 0) e.windows = 'Enter 0 or more.';
    if (isNaN(pr) || pr < 0) e.patternR = 'Enter 0 or more.';
    if (isNaN(wp) || wp < 0) e.wastePct = 'Enter 0 or more.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const lFt = toFt(roomL), wFt = toFt(roomW), hFt = toFt(wallH);
    const perimFt = 2 * (lFt + wFt);
    const wallFt2 = perimFt * hFt;
    const doorFt2 = parseFloat(doors) * 21;    // avg door ~3×7 ft = 21 sq ft
    const winFt2  = parseFloat(windows) * 15;   // avg window ~3×5 ft = 15 sq ft
    const netFt2  = Math.max(0, wallFt2 - doorFt2 - winFt2);
    const patternLoss = netFt2 * (parseFloat(patternR) / 100);
    const adjustedFt2 = netFt2 + patternLoss;
    const wp = parseFloat(wastePct);
    const totalFt2 = adjustedFt2 * (1 + wp / 100);
    const rollSize = rollSqFt();
    const rolls = rollSize > 0 ? Math.ceil(totalFt2 / rollSize) : 0;
    const areaDisp = isM ? wallFt2 / 10.7639 : wallFt2;
    const netDisp  = isM ? netFt2  / 10.7639 : netFt2;

    setResult({ areaDisp, netDisp, areaLbl: isM ? 'm²' : 'sq ft',
      doorFt2, winFt2, totalFt2, rolls, rollSqFt: rollSize,
      rollLabel: ROLL_TYPES[rollType]?.label ?? 'Custom' });
  }

  function reset() {
    setRoomL(''); setRoomW(''); setWallH('');
    setDoors('1'); setWindows('2'); setCustSqFt('');
    setPatternR('0'); setWastePct('15'); setErrors({}); setResult(null);
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
                Room dimensions
              </h2>
              <div className="field-row">
                <F id="wroomL" label={`Room length (${lenLbl})`} val={roomL} set={setRoomL} err={errors.roomL} />
                <F id="wroomW" label={`Room width (${lenLbl})`}  val={roomW} set={setRoomW} err={errors.roomW} />
                <F id="wwallH" label={`Wall height (${lenLbl})`} val={wallH} set={setWallH} err={errors.wallH} placeholder={isM ? '2.4' : '8'} />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="1"/><path d="M15 12h.01"/></svg>
                Openings to deduct
              </h2>
              <div className="field-row">
                <F id="wdoors"   label="Number of doors"   val={doors}   set={setDoors}   err={errors.doors} placeholder="1" />
                <F id="wwindows" label="Number of windows" val={windows} set={setWindows} err={errors.windows} placeholder="2" />
              </div>
              <p className="group-hint">Assumes avg door 3×7 ft (21 sq ft) and window 3×5 ft (15 sq ft).</p>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l9-9 9 9M5 10v9h14V10"/></svg>
                Wallpaper roll &amp; pattern
              </h2>
              <div className="field">
                <label htmlFor="wrollType">Roll type</label>
                <select id="wrollType" className="calc-select" value={rollType}
                  onChange={ev => { setRollType(ev.target.value); setErrors({}); setResult(null); }}>
                  {Object.entries(ROLL_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              {rollType === 'custom' && (
                <div style={{ marginTop: '12px' }}>
                  <F id="wcustSqFt" label="Roll usable area (sq ft)" val={custSqFt} set={setCustSqFt} err={errors.custSqFt} placeholder="56" />
                </div>
              )}
              <div className="field-row" style={{ marginTop: '12px' }}>
                <F id="wpatternR" label="Pattern repeat loss (%)" val={patternR} set={setPatternR} err={errors.patternR} placeholder="0" />
                <F id="wwaste"    label="Waste (%)"               val={wastePct} set={setWastePct} err={errors.wastePct} placeholder="15" />
              </div>
              <p className="group-hint">Pattern repeat adds extra waste: 0% for plain, ~15–25% for large repeating patterns.</p>
            </div>

            <div className="actions panel--form-actions">
              <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
              <button type="button" className="btn btn--primary" onClick={handleCalc}>Calculate</button>
            </div>
          </section>

          <section className="panel panel--results panel--sticky" aria-label="Results">
            <div className="result-hero">
              <div aria-hidden="true" className="result-hero__blob" />
              <span className="result-hero__label">Rolls needed</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.rolls, 0) : '—'}</span>
                <span>rolls</span>
              </div>
              <p className="result-hero__note">
                {result ? `${result.rollLabel} · ${fmt(result.rollSqFt, 0)} sq ft per roll` : 'Enter room dimensions to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Total wall area</dt><dd className="numeral">{fmt(result.areaDisp, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row"><dt>Doors deducted</dt><dd className="numeral">−{fmt(result.doorFt2, 0)} sq ft</dd></div>
                  <div className="breakdown-row"><dt>Windows deducted</dt><dd className="numeral">−{fmt(result.winFt2, 0)} sq ft</dd></div>
                  <div className="breakdown-row"><dt>Net wallpaper area</dt><dd className="numeral">{fmt(result.netDisp, 1)} {result.areaLbl}</dd></div>
                  <div className="breakdown-row"><dt>With pattern & waste</dt><dd className="numeral">{fmt(result.totalFt2, 1)} sq ft</dd></div>
                  <div className="breakdown-row total"><dt>Rolls needed</dt><dd className="numeral">{fmt(result.rolls, 0)}</dd></div>
                </dl>
                <p className="disclaimer">Door and window deductions use average sizes. Always measure actual openings. Buy 1 extra roll for repairs and touch-ups after installation.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
