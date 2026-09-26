'use client';
import { useState } from 'react';

function fmt(n, d = 2) {
  if (!isFinite(n)) return '—';
  return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: d });
}

// Chlorine shock: 1 lb dichlor per 10,000 gal raises FC ~10 ppm
// Ideal FC: 1–3 ppm; shock target: 10 ppm
// pH: ideal 7.2–7.6; raise with soda ash (6 oz raises 0.2 pH per 10k gal)
//            lower with muriatic acid (10 oz lowers 0.2 per 10k gal)
// Alkalinity ideal: 80–120 ppm; raise with baking soda (1.5 lb raises 10 ppm per 10k gal)

export default function PoolChemicalCalculator() {
  const [volume, setVolume]     = useState('');
  const [currentCl, setCurrentCl] = useState('');
  const [targetCl, setTargetCl] = useState('3');
  const [currentPh, setCurrentPh] = useState('');
  const [targetPh, setTargetPh] = useState('7.4');
  const [currentAlk, setCurrentAlk] = useState('');
  const [targetAlk, setTargetAlk]   = useState('100');
  const [errors, setErrors]     = useState({});
  const [result, setResult]     = useState(null);

  function validate() {
    const e = {};
    if (!volume     || parseFloat(volume)     <= 0)    e.volume     = 'Enter pool volume in gallons.';
    if (!currentCl  || parseFloat(currentCl)  < 0)     e.currentCl  = 'Enter current chlorine level.';
    if (!currentPh  || parseFloat(currentPh)  <= 0)    e.currentPh  = 'Enter current pH.';
    if (!currentAlk || parseFloat(currentAlk) < 0)     e.currentAlk = 'Enter current alkalinity.';
    return e;
  }

  function handleCalc() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setResult(null); return; }

    const vol     = parseFloat(volume);
    const units   = vol / 10000; // per 10k gallons factor

    // --- Chlorine ---
    const clDelta = parseFloat(targetCl) - parseFloat(currentCl);
    let chlorineLb = 0;
    if (clDelta > 0) {
      // dichlor: 1 lb per 10k gal raises ~10 ppm; so lb = delta * (vol/10000) / 10
      chlorineLb = Math.max(0, clDelta * units / 10);
    }

    // --- pH ---
    const phDelta = parseFloat(targetPh) - parseFloat(currentPh);
    // soda ash raises pH: 6 oz per 0.2 pH per 10k gal
    // muriatic acid lowers: 10 oz per 0.2 pH per 10k gal
    let sodaAshOz = 0, acidOz = 0;
    if (phDelta > 0) {
      sodaAshOz = (phDelta / 0.2) * 6 * units;
    } else if (phDelta < 0) {
      acidOz = (Math.abs(phDelta) / 0.2) * 10 * units;
    }

    // --- Alkalinity ---
    const alkDelta = parseFloat(targetAlk) - parseFloat(currentAlk);
    // baking soda: 1.5 lb raises 10 ppm per 10k gal
    let bakingSodaLb = 0;
    if (alkDelta > 0) {
      bakingSodaLb = (alkDelta / 10) * 1.5 * units;
    }

    setResult({ chlorineLb, sodaAshOz, acidOz, bakingSodaLb,
      phDir: phDelta > 0 ? 'raise' : phDelta < 0 ? 'lower' : 'ok',
      clDir: clDelta > 0 ? 'add' : clDelta < 0 ? 'ok (reduce exposure)' : 'ok',
    });
  }

  function reset() {
    setVolume(''); setCurrentCl(''); setTargetCl('3'); setCurrentPh('');
    setTargetPh('7.4'); setCurrentAlk(''); setTargetAlk('100');
    setErrors({}); setResult(null);
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
          <section className="panel panel--inputs" aria-label="Pool chemical details">
            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="4"/></svg>
                Pool volume
              </h2>
              <F id="volume" label="Pool volume (US gallons)" val={volume} set={setVolume} err={errors.volume} placeholder="15000" />
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2c3 4 6 7.5 6 11.5A6 6 0 0 1 6 13.5C6 9.5 9 6 12 2z"/></svg>
                Chlorine (Free Cl, ppm)
              </h2>
              <div className="field-row">
                <F id="currentCl" label="Current free Cl (ppm)" val={currentCl} set={setCurrentCl} err={errors.currentCl} placeholder="1.0" />
                <F id="targetCl"  label="Target free Cl (ppm)"  val={targetCl}  set={setTargetCl}  err={errors.targetCl}  placeholder="3.0" />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg>
                pH
              </h2>
              <div className="field-row">
                <F id="currentPh" label="Current pH" val={currentPh} set={setCurrentPh} err={errors.currentPh} placeholder="7.2" />
                <F id="targetPh"  label="Target pH"  val={targetPh}  set={setTargetPh}  err={errors.targetPh}  placeholder="7.4" />
              </div>
            </div>

            <div className="field-group">
              <h2 className="group-title">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                Total Alkalinity (ppm)
              </h2>
              <div className="field-row">
                <F id="currentAlk" label="Current alkalinity" val={currentAlk} set={setCurrentAlk} err={errors.currentAlk} placeholder="80" />
                <F id="targetAlk"  label="Target alkalinity"  val={targetAlk}  set={setTargetAlk}  err={errors.targetAlk}  placeholder="100" />
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
              <span className="result-hero__label">Chlorine to add</span>
              <div className="result-hero__value">
                <span className="numeral">{result ? fmt(result.chlorineLb, 2) : '—'}</span>
                <span>lb dichlor</span>
              </div>
              <p className="result-hero__note">
                {result ? `pH: ${result.phDir} · Alkalinity: ${parseFloat(targetAlk) > parseFloat(currentAlk || 0) ? 'raise' : 'ok'}` : 'Enter pool data to calculate.'}
              </p>
            </div>
            {result && (
              <>
                <dl className="breakdown">
                  <div className="breakdown-row"><dt>Dichlor to add</dt><dd className="numeral">{result.chlorineLb > 0 ? `${fmt(result.chlorineLb, 2)} lb` : 'None needed'}</dd></div>
                  {result.sodaAshOz > 0 && <div className="breakdown-row"><dt>Soda ash (raise pH)</dt><dd className="numeral">{fmt(result.sodaAshOz, 1)} oz</dd></div>}
                  {result.acidOz    > 0 && <div className="breakdown-row"><dt>Muriatic acid (lower pH)</dt><dd className="numeral">{fmt(result.acidOz, 1)} oz</dd></div>}
                  {result.sodaAshOz === 0 && result.acidOz === 0 && <div className="breakdown-row"><dt>pH adjustment</dt><dd>None needed</dd></div>}
                  <div className="breakdown-row total"><dt>Baking soda (raise alk.)</dt><dd className="numeral">{result.bakingSodaLb > 0 ? `${fmt(result.bakingSodaLb, 2)} lb` : 'None needed'}</dd></div>
                </dl>
                <p className="disclaimer">Estimates based on generic dosing guidelines. Pool chemistry is complex. Always test water before adding chemicals, add chemicals to water (not water to chemicals) and follow all product safety instructions.</p>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
