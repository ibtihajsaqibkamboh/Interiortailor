
(function(){
  "use strict";
  const $ = (id) => document.getElementById(id);

  /* =========================================================
     PAGE SWITCHING
     ========================================================= */
  const pages = { calculator: $('page-calculator'), mixer: $('page-mixer') };
  const tabs = { calculator: $('tabCalculator'), mixer: $('tabMixer') };

  function showPage(name){
    Object.keys(pages).forEach(key => {
      const active = key === name;
      pages[key].hidden = !active;
      tabs[key].classList.toggle('is-active', active);
      tabs[key].setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.body.classList.toggle('page-mixer-active', name === 'mixer');
    document.title = name === 'mixer' ? 'Color Mixing Lab — Interior Tailor' : 'Paint Calculator — Interior Tailor';
    try{ localStorage.setItem('paint-tools-active-page', name); }catch(e){}
    if (location.hash.slice(1) !== name) history.replaceState(null, '', '#' + name);
  }

  tabs.calculator.addEventListener('click', () => showPage('calculator'));
  tabs.mixer.addEventListener('click', () => showPage('mixer'));

  /* =========================================================================================
     ============================  MODULE 1: PAINT QUANTITY CALCULATOR  ======================
     ========================================================================================= */
  const PaintCalc = {
    wallArea(count, width, height){ return Math.max(0, count) * Math.max(0, width) * Math.max(0, height); },
    openingArea(count, width, height){ return Math.max(0, count) * Math.max(0, width) * Math.max(0, height); },
    ceilingArea(length, width, included){ return included ? Math.max(0, length) * Math.max(0, width) : 0; },
    paintableArea(wallArea, ceilingArea, openingsArea){ return Math.max(0, wallArea + ceilingArea - openingsArea); },
    paintRequired(area, coats, coveragePerUnit){
      if (!coveragePerUnit || coveragePerUnit <= 0) return 0;
      return (area * Math.max(1, coats)) / coveragePerUnit;
    },
    wasteAmount(baseAmount, wastePercent){ return baseAmount * (Math.max(0, wastePercent) / 100); },
    totalPaint(baseAmount, waste){ return baseAmount + waste; },
    roundUpToWhole(amount){ return Math.ceil(Math.round(amount * 100) / 100 - 1e-9); },
    estimatedCost(recommendedUnits, pricePerUnit){
      if (pricePerUnit === null || isNaN(pricePerUnit) || pricePerUnit <= 0) return null;
      return recommendedUnits * pricePerUnit;
    },
    calculate(i){
      const wallArea = this.wallArea(i.wallCount, i.wallWidth, i.wallHeight);
      const doorArea = this.openingArea(i.doorCount, i.doorWidth, i.doorHeight);
      const windowArea = this.openingArea(i.windowCount, i.windowWidth, i.windowHeight);
      const openingsArea = doorArea + windowArea;
      const ceilingArea = this.ceilingArea(i.ceilingLength, i.ceilingWidth, i.includeCeiling);
      const paintableArea = this.paintableArea(wallArea, ceilingArea, openingsArea);
      const paintRequired = this.paintRequired(paintableArea, i.coats, i.coverage);
      const waste = this.wasteAmount(paintRequired, i.waste);
      const total = this.totalPaint(paintRequired, waste);
      const recommended = this.roundUpToWhole(total);
      const cost = this.estimatedCost(recommended, i.price);
      return { wallArea, doorArea, windowArea, openingsArea, ceilingArea, paintableArea, paintRequired, waste, total, recommended, cost };
    },
    _selfTest(){
      const r = this.calculate({ wallCount:4, wallWidth:4, wallHeight:2.5, includeCeiling:true, ceilingLength:4, ceilingWidth:4,
        doorCount:1, doorWidth:0.9, doorHeight:2.1, windowCount:2, windowWidth:1.2, windowHeight:1.2, coats:2, coverage:10, waste:10, price:18.5 });
      console.assert(r.wallArea === 40, 'wallArea', r.wallArea);
      console.assert(r.ceilingArea === 16, 'ceilingArea', r.ceilingArea);
      console.assert(r.recommended >= r.total, 'rounding', r.recommended, r.total);
      console.log('PaintCalc self-test complete', r);
      return r;
    }
  };
  window.PaintCalc = PaintCalc;

  const M_TO_FT = 3.28084;
  const L_TO_GAL = 0.264172;
  const M2L_TO_FT2GAL = M_TO_FT * M_TO_FT / L_TO_GAL;

  const UNITS = {
    metric: { lengthLabel:'(m)', coverageLabel:'(m²/L)', priceLabel:'(per L)', volumeUnit:'L',
      defaults:{ wallCount:4, wallWidth:4, wallHeight:2.5, includeCeiling:false, ceilingLength:4, ceilingWidth:4,
        doorCount:1, doorWidth:0.9, doorHeight:2.1, windowCount:2, windowWidth:1.2, windowHeight:1.2, coats:2, coverage:10, waste:10, price:'' } },
    imperial: { lengthLabel:'(ft)', coverageLabel:'(ft²/gal)', priceLabel:'(per gal)', volumeUnit:'gal',
      defaults:{ wallCount:4, wallWidth:13, wallHeight:8, includeCeiling:false, ceilingLength:13, ceilingWidth:13,
        doorCount:1, doorWidth:3, doorHeight:7, windowCount:2, windowWidth:4, windowHeight:4, coats:2, coverage:350, waste:10, price:'' } }
  };
  const LENGTH_FIELDS = ['wallWidth','wallHeight','ceilingLength','ceilingWidth','doorWidth','doorHeight','windowWidth','windowHeight'];
  const AREA_FIELDS_LABEL = { metric:'m²', imperial:'ft²' };

  let unit = 'metric';
  const fieldIds = ['wallCount','wallWidth','wallHeight','ceilingLength','ceilingWidth','doorCount','doorWidth','doorHeight',
    'windowCount','windowWidth','windowHeight','coats','coverage','waste','price'];
  const els = {}; fieldIds.forEach(id => els[id] = $(id));
  const includeCeilingEl = $('includeCeiling');
  const ceilingFieldsEl = $('ceilingFields');

  function fmt(n, decimals){
    if (n === null || n === undefined || !isFinite(n)) return '—';
    const d = decimals === undefined ? 2 : decimals;
    return Number(n.toFixed(d)).toLocaleString(undefined, { minimumFractionDigits:0, maximumFractionDigits:d });
  }

  function applyUnitLabels(){
    const u = UNITS[unit];
    document.querySelectorAll('[data-unit-label="length"]').forEach(el => el.textContent = u.lengthLabel);
    document.querySelectorAll('[data-unit-label="coverage"]').forEach(el => el.textContent = u.coverageLabel);
    document.querySelectorAll('[data-unit-label="price"]').forEach(el => el.textContent = u.priceLabel);
    $('heroUnit').textContent = u.volumeUnit;
    if ($('mobileUnit')) $('mobileUnit').textContent = u.volumeUnit;
  }

  function round2(n){ return Math.round(n * 100) / 100; }
  function convertValues(fromUnit, toUnit){
    if (fromUnit === toUnit) return;
    const lengthFactor = toUnit === 'imperial' ? M_TO_FT : (1/M_TO_FT);
    const coverageFactor = toUnit === 'imperial' ? M2L_TO_FT2GAL : (1/M2L_TO_FT2GAL);
    const priceFactor = toUnit === 'imperial' ? 3.78541 : (1/3.78541);
    LENGTH_FIELDS.forEach(id => { const v = parseFloat(els[id].value); if (!isNaN(v)) els[id].value = round2(v * lengthFactor); });
    const cov = parseFloat(els.coverage.value); if (!isNaN(cov)) els.coverage.value = round2(cov * coverageFactor);
    const price = parseFloat(els.price.value); if (!isNaN(price) && els.price.value !== '') els.price.value = round2(price * priceFactor);
  }

  const CALC_STORAGE_KEY = 'paint-calc-state-v2';
  function applyDefaults(u){
    const d = UNITS[u].defaults;
    fieldIds.forEach(id => { if (id in d) els[id].value = d[id]; });
    els.price.value = d.price;
    includeCeilingEl.checked = d.includeCeiling;
  }
  function saveCalcState(){
    try{
      const data = { unit }; fieldIds.forEach(id => data[id] = els[id].value); data.includeCeiling = includeCeilingEl.checked;
      localStorage.setItem(CALC_STORAGE_KEY, JSON.stringify(data));
    }catch(e){}
  }
  function loadCalcState(){
    try{
      const raw = localStorage.getItem(CALC_STORAGE_KEY); if (!raw) return false;
      const data = JSON.parse(raw);
      if (data.unit && UNITS[data.unit]) unit = data.unit;
      fieldIds.forEach(id => { if (data[id] !== undefined) els[id].value = data[id]; });
      if (typeof data.includeCeiling === 'boolean') includeCeilingEl.checked = data.includeCeiling;
      return true;
    }catch(e){ return false; }
  }

  const REQUIRED_POSITIVE = ['wallWidth','wallHeight','doorWidth','doorHeight','windowWidth','windowHeight','coverage'];
  const REQUIRED_NONNEGATIVE_INT = ['wallCount','doorCount','windowCount'];
  const REQUIRED_MIN1 = ['coats'];
  const REQUIRED_NONNEGATIVE = ['waste'];
  const OPTIONAL_NONNEGATIVE = ['price'];

  function validateField(id){
    const raw = els[id].value.trim(); const val = parseFloat(raw);
    const fieldEl = els[id].closest('.field'); let ok = true;
    if (OPTIONAL_NONNEGATIVE.includes(id)) ok = raw === '' || (!isNaN(val) && val >= 0);
    else if (REQUIRED_POSITIVE.includes(id)) ok = raw !== '' && !isNaN(val) && val > 0;
    else if (REQUIRED_MIN1.includes(id)) ok = raw !== '' && !isNaN(val) && val >= 1;
    else if (REQUIRED_NONNEGATIVE_INT.includes(id) || REQUIRED_NONNEGATIVE.includes(id)) ok = raw !== '' && !isNaN(val) && val >= 0;
    if (id === 'ceilingLength' || id === 'ceilingWidth'){
      if (!includeCeilingEl.checked){ ok = true; fieldEl.classList.remove('has-error'); return true; }
      ok = raw !== '' && !isNaN(val) && val > 0;
    }
    fieldEl.classList.toggle('has-error', !ok);
    return ok;
  }
  function validateAll(){
    let allOk = true; fieldIds.forEach(id => { if (!validateField(id)) allOk = false; });
    $('errorBanner').classList.toggle('is-visible', !allOk);
    return allOk;
  }

  function readInputs(){
    const num = (id, fallback) => { const v = parseFloat(els[id].value); return isNaN(v) ? fallback : v; };
    return {
      wallCount:num('wallCount',0), wallWidth:num('wallWidth',0), wallHeight:num('wallHeight',0),
      includeCeiling:includeCeilingEl.checked, ceilingLength:num('ceilingLength',0), ceilingWidth:num('ceilingWidth',0),
      doorCount:num('doorCount',0), doorWidth:num('doorWidth',0), doorHeight:num('doorHeight',0),
      windowCount:num('windowCount',0), windowWidth:num('windowWidth',0), windowHeight:num('windowHeight',0),
      coats:num('coats',1), coverage:num('coverage',0), waste:num('waste',0),
      price: els.price.value.trim() === '' ? null : num('price', null)
    };
  }

  function renderCalc(){
    const valid = validateAll();
    const areaUnit = AREA_FIELDS_LABEL[unit]; const volUnit = UNITS[unit].volumeUnit;
    if (!valid){
      $('heroValue').textContent = '—'; $('heroNote').textContent = 'Check your inputs above — some fields need a valid value.';
      if ($('mobileValue')) $('mobileValue').textContent = '—';
      ['outWallArea','outOpeningsArea','outCeilingArea','outPaintableArea','outPaintRequired','outWaste','outRecommended','outCost'].forEach(id => $(id).textContent = '—');
      $('explainText').textContent = 'Once every field above is valid, the formula and your numbers will appear here.';
      $('costRow').style.display = 'none'; saveCalcState(); return;
    }
    const inputs = readInputs(); const r = PaintCalc.calculate(inputs);
    $('heroValue').textContent = fmt(r.recommended, 0);
    if ($('mobileValue')) $('mobileValue').textContent = fmt(r.recommended, 0);
    $('heroNote').textContent = `Enough for ${inputs.coats} coat${inputs.coats == 1 ? '' : 's'} over ${fmt(r.paintableArea,1)} ${areaUnit}, plus ${inputs.waste}% waste.`;
    $('outWallArea').textContent = `${fmt(r.wallArea,1)} ${areaUnit}`;
    $('outOpeningsArea').textContent = `${fmt(r.openingsArea,1)} ${areaUnit}`;
    $('outCeilingArea').textContent = inputs.includeCeiling ? `${fmt(r.ceilingArea,1)} ${areaUnit}` : 'Not included';
    $('outPaintableArea').textContent = `${fmt(r.paintableArea,1)} ${areaUnit}`;
    $('outPaintRequired').textContent = `${fmt(r.paintRequired,2)} ${volUnit}`;
    $('outWaste').textContent = `${fmt(r.waste,2)} ${volUnit}`;
    $('outRecommended').textContent = `${fmt(r.recommended,0)} ${volUnit}`;
    if (r.cost !== null){ $('costRow').style.display = 'flex'; $('outCost').textContent = `$${fmt(r.cost,2)}`; }
    else { $('costRow').style.display = 'none'; }
    $('explainText').textContent =
      `Wall area (${inputs.wallCount} × ${fmt(inputs.wallWidth)} × ${fmt(inputs.wallHeight)}) = ${fmt(r.wallArea,1)} ${areaUnit}` +
      (inputs.includeCeiling ? ` + ceiling (${fmt(inputs.ceilingLength)} × ${fmt(inputs.ceilingWidth)}) = ${fmt(r.ceilingArea,1)} ${areaUnit}` : '') +
      ` − openings ${fmt(r.openingsArea,1)} ${areaUnit} = ${fmt(r.paintableArea,1)} ${areaUnit} to paint. ` +
      `× ${inputs.coats} coat(s) ÷ ${fmt(inputs.coverage)} ${UNITS[unit].coverageLabel} coverage = ${fmt(r.paintRequired,2)} ${volUnit}. ` +
      `+ ${inputs.waste}% waste (${fmt(r.waste,2)} ${volUnit}) = ${fmt(r.total,2)} ${volUnit}, rounded up to ${fmt(r.recommended,0)} ${volUnit} to buy.`;
    const items = [
      `Units: ${unit === 'metric' ? 'Metric (m, L)' : 'Imperial (ft, gal)'}`,
      `Walls: ${inputs.wallCount} × ${fmt(inputs.wallWidth)} × ${fmt(inputs.wallHeight)} ${UNITS[unit].lengthLabel}`,
      inputs.includeCeiling ? `Ceiling: ${fmt(inputs.ceilingLength)} × ${fmt(inputs.ceilingWidth)} ${UNITS[unit].lengthLabel}` : 'Ceiling: not included',
      `Doors: ${inputs.doorCount} (${fmt(inputs.doorWidth)} × ${fmt(inputs.doorHeight)} ${UNITS[unit].lengthLabel})`,
      `Windows: ${inputs.windowCount} (${fmt(inputs.windowWidth)} × ${fmt(inputs.windowHeight)} ${UNITS[unit].lengthLabel})`,
      `Coats: ${inputs.coats}, Coverage: ${fmt(inputs.coverage)} ${UNITS[unit].coverageLabel}, Waste: ${inputs.waste}%`
    ];
    $('printSummaryList').innerHTML = items.map(t => `<li>${t}</li>`).join('');
    saveCalcState();
  }

  let calcDebounce;
  function scheduleCalcRender(){ clearTimeout(calcDebounce); calcDebounce = setTimeout(renderCalc, 120); }

  fieldIds.forEach(id => {
    els[id].addEventListener('input', () => { validateField(id); scheduleCalcRender(); });
    els[id].addEventListener('blur', () => validateField(id));
  });
  includeCeilingEl.addEventListener('change', () => {
    ceilingFieldsEl.classList.toggle('is-open', includeCeilingEl.checked);
    validateField('ceilingLength'); validateField('ceilingWidth'); scheduleCalcRender();
  });
  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newUnit = btn.getAttribute('data-unit'); if (newUnit === unit) return;
      convertValues(unit, newUnit); unit = newUnit;
      document.querySelectorAll('.unit-btn').forEach(b => { const active = b === btn; b.classList.toggle('is-active', active); b.setAttribute('aria-pressed', active ? 'true':'false'); });
      applyUnitLabels(); renderCalc();
    });
  });
  $('resetBtn').addEventListener('click', () => {
    applyDefaults(unit); ceilingFieldsEl.classList.toggle('is-open', includeCeilingEl.checked);
    fieldIds.forEach(id => { const f = els[id].closest('.field'); if (f) f.classList.remove('has-error'); });
    $('errorBanner').classList.remove('is-visible'); renderCalc();
  });
  $('printBtn').addEventListener('click', () => window.print());
  if ($('mobileJump')) $('mobileJump').addEventListener('click', () => $('results').scrollIntoView({ behavior:'smooth' }));

  function initCalculator(){
    const restored = loadCalcState(); if (!restored) applyDefaults(unit);
    document.querySelectorAll('.unit-btn').forEach(b => { const active = b.getAttribute('data-unit') === unit; b.classList.toggle('is-active', active); b.setAttribute('aria-pressed', active?'true':'false'); });
    ceilingFieldsEl.classList.toggle('is-open', includeCeilingEl.checked);
    applyUnitLabels(); renderCalc();
  }

  /* =========================================================================================
     ============================  MODULE 2: COLOR MIXING LAB  ================================
     ========================================================================================= */
  const ColorMix = {
    hexToRgb(hex){
      hex = hex.replace('#','');
      if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
      const int = parseInt(hex, 16);
      return { r:(int>>16)&255, g:(int>>8)&255, b:int&255 };
    },
    rgbToHex(r,g,b){
      return '#' + [r,g,b].map(v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('').toUpperCase();
    },
    rgbToHsl(r,g,b){
      r/=255; g/=255; b/=255;
      const max=Math.max(r,g,b), min=Math.min(r,g,b);
      let h=0, s=0; const l=(max+min)/2;
      const d = max-min;
      if (d !== 0){
        s = l > 0.5 ? d/(2-max-min) : d/(max+min);
        switch(max){
          case r: h = (g-b)/d + (g<b?6:0); break;
          case g: h = (b-r)/d + 2; break;
          case b: h = (r-g)/d + 4; break;
        }
        h *= 60;
      }
      return { h, s, l };
    },
    isValidHex(hex){ return /^#?[0-9A-Fa-f]{6}$/.test(hex) || /^#?[0-9A-Fa-f]{3}$/.test(hex); },
    normalizeHex(hex){
      hex = hex.trim(); if (!hex.startsWith('#')) hex = '#' + hex;
      if (hex.length === 4) hex = '#' + hex.slice(1).split('').map(c=>c+c).join('');
      return hex.toUpperCase();
    },
    hueDist(a,b){ const d = Math.abs(a-b) % 360; return d > 180 ? 360-d : d; },

    ANCHORS: [
      { name:'Red', hue:5, color:'#E4574C' },
      { name:'Orange', hue:32, color:'#F0973F' },
      { name:'Yellow', hue:52, color:'#F0C239' },
      { name:'Green', hue:135, color:'#3FB673' },
      { name:'Blue', hue:215, color:'#4C82F7' },
      { name:'Purple', hue:275, color:'#8B5CF6' }
    ],
    BROWN: { name:'Brown', hue:32, color:'#8B5A2B' },

    colorName(h,s,l){
      if (s < 0.12){
        if (l > 0.85) return 'Off White';
        if (l > 0.6) return 'Light Gray';
        if (l > 0.32) return 'Gray';
        return 'Charcoal';
      }
      let family;
      if (h < 14 || h >= 345) family = 'Red';
      else if (h < 40){
        if (s < 0.55 && l < 0.85 && l > 0.15) family = l > 0.6 ? 'Tan' : (l > 0.4 ? 'Terracotta' : 'Brown');
        else family = 'Orange';
      }
      else if (h < 65){
        if (s < 0.5 && l < 0.85) family = l > 0.65 ? 'Beige' : (l > 0.4 ? 'Khaki' : 'Olive Brown');
        else family = 'Yellow';
      }
      else if (h < 165) family = 'Green';
      else if (h < 200) family = 'Teal';
      else if (h < 255) family = 'Blue';
      else if (h < 290) family = 'Purple';
      else if (h < 330) family = 'Magenta';
      else family = 'Pink';

      let prefix = '';
      if (l > 0.85) prefix = 'Pale ';
      else if (l > 0.68) prefix = 'Soft ';
      else if (l < 0.18) prefix = 'Deep ';
      else if (l < 0.34) prefix = 'Dark ';
      else if (h < 65) prefix = 'Warm ';
      else if (h > 195 && h < 255) prefix = 'Cool ';

      return (prefix + family).trim();
    },

    /** Returns percentage composition (sums to 100). Pure — no ml/batch involved. */
    composition(hex){
      const { r, g, b } = this.hexToRgb(hex);
      const { h, s, l } = this.rgbToHsl(r, g, b);

      let white = Math.round(l*90 - s*15);
      white = Math.max(3, Math.min(90, white));
      let black = Math.round((1-l)*20 + (s>0.7 ? 4 : 0));
      black = Math.max(1, Math.min(40, black));

      if (white + black > 96){
        const scale = 96 / (white + black);
        white = Math.round(white*scale); black = Math.round(black*scale);
      }
      let remaining = 100 - white - black;
      let adjustment = remaining > 4 ? 4 : Math.max(0, remaining);
      let chromaticBudget = Math.max(0, remaining - adjustment);

      const useBrown = s < 0.55 && (h <= 50 || h >= 340) && l < 0.8 && l > 0.15;
      const pool = this.ANCHORS.map(a => (useBrown && a.name === 'Orange') ? this.BROWN : a);
      const sorted = pool.slice().sort((a,b2) => this.hueDist(a.hue,h) - this.hueDist(b2.hue,h));
      const primary = sorted[0], secondary = sorted[1];
      const dP = this.hueDist(primary.hue,h) + 8, dS = this.hueDist(secondary.hue,h) + 8;
      const wP = 1/dP, wS = 1/dS, totalW = wP+wS;
      let primaryPct = Math.round(chromaticBudget * (wP/totalW));
      let secondaryPct = chromaticBudget - primaryPct;

      const components = [{ name:'White', pct:white, color:'#DEDCEC' }];
      if (black > 0) components.push({ name:'Black', pct:black, color:'#15141F' });
      if (primaryPct > 0) components.push({ name:primary.name, pct:primaryPct, color:primary.color });
      if (secondaryPct >= 3) components.push({ name:secondary.name, pct:secondaryPct, color:secondary.color });
      else adjustment += secondaryPct;
      if (adjustment > 0) components.push({ name:'Adjustment', pct:adjustment, color:'#8B5CF6' });

      const sum = components.reduce((a,c) => a+c.pct, 0);
      components[0].pct += (100 - sum);

      const adj = components.find(c => c.name === 'Adjustment');
      const rest = components.filter(c => c.name !== 'Adjustment').sort((a,b2) => b2.pct - a.pct);
      const ordered = adj ? [...rest, adj] : rest;

      return { components: ordered, name: this.colorName(h,s,l), h, s, l };
    },

    /** Converts a fixed percentage composition into rounded ml for a given batch size. */
    toMl(components, batchMl){
      const withMl = components.map(c => ({ ...c, ml: Math.round((c.pct/100*batchMl)/10)*10 }));
      const sum = withMl.reduce((a,c) => a+c.ml, 0);
      const diff = batchMl - sum;
      let maxIdx = 0;
      withMl.forEach((c,i) => { if (c.ml > withMl[maxIdx].ml) maxIdx = i; });
      withMl[maxIdx].ml = Math.max(0, withMl[maxIdx].ml + diff);
      return withMl;
    },

    _selfTest(){
      const comp = this.composition('#D8A36A');
      const sum = comp.components.reduce((a,c) => a+c.pct, 0);
      console.assert(sum === 100, 'composition should sum to 100', sum, comp);
      const ml = this.toMl(comp.components, 5000);
      const mlSum = ml.reduce((a,c) => a+c.ml, 0);
      console.assert(mlSum === 5000, 'ml should sum to batch size', mlSum);
      console.log('ColorMix self-test complete', comp, ml);
      return { comp, ml };
    }
  };
  window.ColorMix = ColorMix;

  const BASE_SWATCHES = [
    { name:'White', hex:'#FFFFFF' }, { name:'Black', hex:'#15141F' }, { name:'Red', hex:'#E4574C' },
    { name:'Yellow', hex:'#F0C239' }, { name:'Blue', hex:'#4C82F7' }, { name:'Green', hex:'#3FB673' },
    { name:'Orange', hex:'#F0973F' }, { name:'Purple', hex:'#8B5CF6' }, { name:'Brown', hex:'#8B5A2B' },
    { name:'Gray', hex:'#9CA0AE' }
  ];

  const colorPickerEl = $('colorPicker');
  const hexInputEl = $('hexInput');
  const hexFieldEl = hexInputEl.closest('.field');
  const swatchPreviewEl = $('swatchPreview');
  const swatchHexLabelEl = $('swatchHexLabel');
  const baseGridEl = $('baseGrid');
  const batchSizeEl = $('batchSize');
  const ingredientsListEl = $('ingredientsList');
  const recipeNameEl = $('recipeName');
  const recipeSubEl = $('recipeSub');

  const MIX_STORAGE_KEY = 'color-mix-state-v1';
  let currentHex = '#D8A36A';
  let lastComposition = null;

  function buildBaseGrid(){
    baseGridEl.innerHTML = '';
    BASE_SWATCHES.forEach(b => {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'base-swatch'; btn.style.background = b.hex;
      btn.title = b.name; btn.setAttribute('aria-label', 'Use ' + b.name + ' as target color');
      if (b.hex.toUpperCase() === '#FFFFFF') btn.style.borderColor = 'var(--line)';
      btn.addEventListener('click', () => setTargetColor(b.hex));
      baseGridEl.appendChild(btn);
    });
  }

  function setTargetColor(hex){
    hex = ColorMix.normalizeHex(hex);
    currentHex = hex;
    colorPickerEl.value = hex;
    hexInputEl.value = hex;
    hexFieldEl.classList.remove('has-error');
    renderMixer();
  }

  /* =========================================================
     ROOM PREVIEW
     currentHex is the single source of truth: RoomPreview.setColor()
     is called from renderMixer() below, so the wall can never fall
     out of sync with the target swatch, the hex field or the base
     swatches — they all funnel through setTargetColor -> renderMixer.
     ========================================================= */
  const RoomPreview = (function(){
    const stage = $('roomStage');
    const paint = $('roomPaint');
    const chip = $('roomChipHex');
    if (!stage) return { setColor(){}, };
    const scenes = {
      interior: stage.querySelector('[data-room-scene="interior"]'),
      exterior: stage.querySelector('[data-room-scene="exterior"]')
    };
    function setColor(hex){
      stage.style.setProperty('--room-wall', hex);
      paint.style.background = hex;
      if (chip) chip.textContent = 'Preview of ' + hex.toUpperCase();
    }
    function setView(v){
      scenes.interior.hidden = v !== 'interior';
      scenes.exterior.hidden = v !== 'exterior';
    }
    function setTime(t){ stage.dataset.time = t; }

    stage.parentElement.querySelectorAll('.room-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.room-pill-group');
        group.querySelectorAll('.room-pill').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
        if (btn.dataset.roomView) setView(btn.dataset.roomView);
        else if (btn.dataset.roomTime) setTime(btn.dataset.roomTime);
      });
    });
    return { setColor, setView, setTime };
  })();

  function renderMixer(){
    swatchPreviewEl.style.background = currentHex;
    swatchHexLabelEl.textContent = currentHex;
    swatchHexLabelEl.style.color = '#15141F';
    RoomPreview.setColor(currentHex);

    const comp = ColorMix.composition(currentHex);
    lastComposition = comp;
    recipeNameEl.textContent = comp.name;
    recipeSubEl.textContent = 'digital approximation';

    const batchMl = parseInt(batchSizeEl.value, 10);
    const withMl = ColorMix.toMl(comp.components, batchMl);

    ingredientsListEl.innerHTML = withMl.map(c => {
      const mlLabel = c.ml >= 1000 ? (c.ml/1000).toFixed(c.ml % 1000 === 0 ? 0 : 1) + ' L' : c.ml + ' mL';
      return `
        <div class="ingredient">
          <div class="ingredient-top">
            <span class="ingredient-name">${c.name}</span>
            <span class="ingredient-amt numeral">${c.pct}% · ${mlLabel}</span>
          </div>
          <div class="ingredient-track"><div class="ingredient-fill" style="width:${c.pct}%; background:${c.color};"></div></div>
        </div>`;
    }).join('');

    saveMixState();
  }

  function saveMixState(){
    try{ localStorage.setItem(MIX_STORAGE_KEY, JSON.stringify({ hex: currentHex, batch: batchSizeEl.value })); }catch(e){}
  }
  function loadMixState(){
    try{
      const raw = localStorage.getItem(MIX_STORAGE_KEY); if (!raw) return false;
      const data = JSON.parse(raw);
      if (data.hex && ColorMix.isValidHex(data.hex)) currentHex = ColorMix.normalizeHex(data.hex);
      if (data.batch) batchSizeEl.value = data.batch;
      return true;
    }catch(e){ return false; }
  }

  colorPickerEl.addEventListener('input', () => setTargetColor(colorPickerEl.value));
  hexInputEl.addEventListener('input', () => {
    const raw = hexInputEl.value.trim();
    if (ColorMix.isValidHex(raw)){
      hexFieldEl.classList.remove('has-error');
      currentHex = ColorMix.normalizeHex(raw);
      colorPickerEl.value = currentHex;
      renderMixer();
    } else {
      hexFieldEl.classList.toggle('has-error', raw.length > 0);
    }
  });
  hexInputEl.addEventListener('blur', () => {
    if (!ColorMix.isValidHex(hexInputEl.value.trim())){ hexInputEl.value = currentHex; hexFieldEl.classList.remove('has-error'); }
  });
  batchSizeEl.addEventListener('change', renderMixer);

  function initMixer(){
    buildBaseGrid();
    loadMixState();
    colorPickerEl.value = currentHex;
    hexInputEl.value = currentHex;
    renderMixer();
  }

  /* =========================================================
     BOOT
     ========================================================= */
  initCalculator();
  initMixer();

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#','');
    if (h === 'mixer' || h === 'calculator') showPage(h);
  });

  let startPage = (window.__PAINT_PLANNERS_INITIAL_TOOL === 'mixer') ? 'mixer' : 'calculator';
  const hashPage = location.hash.replace('#','');
  if (hashPage === 'mixer' || hashPage === 'calculator') startPage = hashPage;
  else { try{ const saved = localStorage.getItem('paint-tools-active-page'); if (saved === 'mixer' || saved === 'calculator') startPage = saved; }catch(e){} }
  showPage(startPage);
})();
