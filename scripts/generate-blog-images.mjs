import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const posts = JSON.parse(await fs.readFile(new URL('../lib/blog-content.json', import.meta.url), 'utf8'));
const output = new URL('../public/assets/blog/', import.meta.url);
await fs.mkdir(output, { recursive: true });

const covers = {
  'how-to-figure-out-how-much-mulch-you-need': { lines: ['How Much Mulch', 'Do You Need?', 'Measure. Plan. Grow.'], tag: 'LANDSCAPING KNOW-HOW', number: '08', glow: '#d0b18b' },
  'how-to-figure-gravel': { lines: ['Figuring Gravel', 'Calculate Yards,', 'Tons & Bags'], tag: 'LANDSCAPING KNOW-HOW', number: '05', glow: '#c5c7b2' },
  'beige-paint': { lines: ['Beige Paint in 2026', 'Warm Neutrals.', 'A Fresh Perspective.'], tag: 'PAINT & COLOUR', number: '06', glow: '#ead4b4' },
  'gravel-calculator-guide': { lines: ['How Much Gravel', 'Do You Need?', 'Plan Your Project.'], tag: 'THE GRAVEL CALCULATOR GUIDE', number: '07', glow: '#afc7b7' },
  'gray-paint-colors': { lines: ['Gray Paint Colors', 'How to Choose a Shade', 'That Works at Home'], tag: 'GRAY & GREIGE', number: '01', glow: '#b2afdd' },
  'green-paint-colors': { lines: ['Green Paint Colors', 'The Right Shade for', 'Every Room'], tag: 'GREENS & NATURAL TONES', number: '02', glow: '#a9c9ae' },
  'best-paint-colors-for-living-room': { lines: ['Living Room Colors', 'Find the Right Shade', 'for Your Space'], tag: 'ROOM-BY-ROOM GUIDES', number: '03', glow: '#beb6ed' },
  'beige-paint-colors': { lines: ['Beige Paint Colors', 'Beautifully Warm.', 'Never Dull.'], tag: 'BEIGE & WARM NEUTRALS', number: '04', glow: '#ead4b4' },
};
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

for (const post of posts) {
  const cover = covers[post.slug];
  const landscaping = post.category === 'LANDSCAPING';
  const mulch = post.slug === 'how-to-figure-out-how-much-mulch-you-need';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9275fb"/><stop offset=".42" stop-color="#7155e4"/><stop offset="1" stop-color="#28204f"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="${cover.glow}" stop-opacity=".3"/><stop offset="1" stop-color="${cover.glow}" stop-opacity="0"/></radialGradient>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".34"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient>
      <filter id="shadow" x="-.5" y="-.4" width="2" height="2"><feDropShadow dx="0" dy="20" stdDeviation="20" flood-color="#17102f" flood-opacity=".25"/></filter>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <circle cx="305" cy="12" r="260" fill="#fff" opacity=".065"/>
    <circle cx="1110" cy="480" r="390" fill="url(#glow)"/>
    <circle cx="1150" cy="70" r="215" fill="none" stroke="#fff" stroke-opacity=".09" stroke-width="1.5"/>
    <circle cx="1150" cy="70" r="260" fill="none" stroke="#fff" stroke-opacity=".06" stroke-width="1.5"/>
    <path d="M0 520Q310 420 570 630H0z" fill="#fff" opacity=".025"/>
    <rect x="66" y="70" width="5" height="34" rx="2.5" fill="#d4c9ff"/>
    <text x="86" y="94" font-family="Arial,sans-serif" font-size="17" font-weight="700" letter-spacing="2.3" fill="#e8e0ff">${escape(cover.tag)}</text>
    ${cover.lines.map((line, i) => `<text x="66" y="${222 + i * 74}" font-family="Arial,sans-serif" font-size="58" font-weight="800" letter-spacing="-1.8" fill="#fff">${escape(line)}</text>`).join('')}
    <path d="M68 420h61" stroke="#d7cbff" stroke-width="3" stroke-linecap="round"/>
    <text x="66" y="457" font-family="Arial,sans-serif" font-size="18" fill="#e3dafb">${landscaping ? 'MEASURE. CALCULATE. BUILD WITH CONFIDENCE.' : 'UNDERTONE. LIGHT. A HOME THAT FEELS LIKE YOU.'}</text>
    ${landscaping ? `<g transform="translate(866 274)" filter="url(#shadow)">
      <rect x="0" y="5" width="227" height="225" rx="24" fill="url(#card)" stroke="#fff" stroke-opacity=".25"/>
      <path d="M22 180h183M22 180v-30m45 30v-15m46 15v-15m46 15v-15m46 15v-30" stroke="#eee6ff" stroke-width="3" stroke-linecap="round"/>
      ${[[45,105,30,22,0],[100,108,32,25,1],[161,110,35,23,2],[79,60,30,25,2],[142,60,29,22,0]].map(([x,y,rx,ry,c]) => mulch ? `<path d="M${x-rx} ${y-8}l${rx+9} -13 ${rx-9} 13 -13 19 -${rx} -4z" fill="${post.palette[c+1]}" transform="rotate(-12 ${x} ${y})"/>` : `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${post.palette[c+1]}" transform="rotate(-12 ${x} ${y})"/>`).join('')}
      <text x="114" y="209" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="13" letter-spacing="2" fill="#eee6ff">${mulch ? 'BEDS / YARDS / BAGS' : 'YARDS / TONS / BAGS'}</text>
    </g>` : `<g transform="translate(875 285)" filter="url(#shadow)">
      ${[-24, 0, 24].map((rotation, i) => `<g transform="rotate(${rotation} 89 225)">
        <rect x="19" y="0" width="140" height="248" rx="18" fill="url(#card)" stroke="#fff" stroke-opacity=".25"/>
        <rect x="32" y="15" width="114" height="163" rx="10" fill="${post.palette[i + 1]}"/>
        <path d="M40 197h96m-96 12h63" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
        <circle cx="89" cy="230" r="6" fill="#fff" fill-opacity=".75"/>
      </g>`).join('')}
    </g>
    <g transform="translate(1033 228) rotate(18)"><rect x="0" y="0" width="70" height="29" rx="8" fill="#fff" fill-opacity=".8"/><path d="M70 14h12v28H37v30" fill="none" stroke="#e4dafa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="30" y="67" width="14" height="40" rx="6" fill="#c2b0f4"/></g>`}
    <path d="M66 535h1068" stroke="#fff" stroke-opacity=".16"/>
    <g transform="translate(67 560)" fill="none" stroke="#f0eaff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M0 13l12-10 12 10M4 11v16h16V11m-12 16V17h8v10"/></g>
    <text x="107" y="582" font-family="Arial,sans-serif" font-size="20" font-weight="700" letter-spacing="-.3" fill="#fff">Interior Tailor</text>
    <text x="1133" y="581" text-anchor="end" font-family="Arial,sans-serif" font-size="13" font-weight="600" letter-spacing="2" fill="#d7cbf5">${landscaping ? 'THE PROJECT JOURNAL' : 'THE COLOR JOURNAL'} / ${cover.number}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 93, mozjpeg: true }).toFile(fileURLToPath(new URL(`${post.slug}.jpg`, output)));
}
console.log(`Generated ${posts.length} purple editorial blog covers.`);
