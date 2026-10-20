import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const posts = JSON.parse(await fs.readFile(new URL('../lib/blog-content.json', import.meta.url), 'utf8'));
const output = new URL('../public/assets/blog/', import.meta.url);
await fs.mkdir(output, { recursive: true });
for (const post of posts) {
  const [light, mid, deep, dark] = post.palette;
  const label = post.slug === 'best-paint-colors-for-living-room' ? 'Living room' : `${post.slug.split('-')[0][0].toUpperCase()}${post.slug.split('-')[0].slice(1)}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs><linearGradient id="wall" x2="1" y2="1"><stop stop-color="${light}"/><stop offset="1" stop-color="${mid}"/></linearGradient><linearGradient id="sun" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <rect width="1200" height="630" fill="#f6f3ed"/>
    <rect width="820" height="470" fill="url(#wall)"/>
    <path d="M0 470h820v160H0z" fill="#c5af95"/><path d="M0 478h820" stroke="#ece3d7" stroke-width="12"/>
    <path d="M140 470l-110 160m280-160l-60 160m260-160l10 160m180-160l80 160M0 535h820M0 595h820" fill="none" stroke="#a88c70" stroke-opacity=".3" stroke-width="2"/>
    <rect x="74" y="54" width="170" height="260" fill="#f5f0e5" rx="70"/>
    <path d="M86 142a73 73 0 01146 0v158H86z" fill="#dee6df"/><path d="M159 70v230m-73-107h146" stroke="#f5f0e5" stroke-width="10"/>
    <path d="M85 301h147l300 171H85z" fill="url(#sun)"/>
    <rect x="356" y="78" width="160" height="190" rx="3" fill="#faf6ed" stroke="#a48a70" stroke-width="7"/>
    <path d="M372 250V158a63 63 0 01126 0v92" fill="${deep}"/><circle cx="435" cy="147" r="35" fill="${light}"/><path d="M372 225q65-90 126 0v25H372z" fill="${dark}"/>
    <ellipse cx="435" cy="542" rx="260" ry="44" fill="#ede6d9"/>
    <rect x="226" y="338" width="356" height="144" rx="30" fill="#e9dfcd"/>
    <rect x="203" y="387" width="402" height="105" rx="24" fill="#d6c7b2"/>
    <rect x="235" y="403" width="160" height="64" rx="17" fill="#ede3d3"/><rect x="402" y="403" width="170" height="64" rx="17" fill="#ede3d3"/>
    <rect x="248" y="353" width="76" height="71" rx="12" fill="${deep}" transform="rotate(-9 286 389)"/>
    <rect x="477" y="350" width="76" height="74" rx="12" fill="${light}" transform="rotate(9 515 389)"/>
    <path d="M232 487v24m345-24v24" stroke="#665440" stroke-width="12"/>
    <ellipse cx="438" cy="521" rx="116" ry="30" fill="#8e7359"/><path d="M345 526v47m183-47v47" stroke="#705b46" stroke-width="9"/>
    <rect x="412" y="507" width="45" height="8" rx="2" fill="${dark}"/><rect x="416" y="498" width="44" height="8" rx="2" fill="#e4d9c7"/>
    <path d="M690 416V254m0 95q-60-23-51-68 58 5 51 68m0-47q55-14 59-57-57-10-59 57m0-40q-45-31-30-70 43 12 30 70m0 122q58-2 68-44-58-16-68 44" fill="#66735a" stroke="#596449" stroke-width="4"/>
    <path d="M650 410h83l-12 80h-57z" fill="#b28b6c"/>
    <rect x="820" width="380" height="630" fill="#f6f3ed"/>
    <text x="860" y="73" font-family="Arial,sans-serif" font-size="14" letter-spacing="3" fill="#5c6055">INTERIOR TAILOR</text>
    <text x="860" y="151" font-family="Georgia,serif" font-size="42" fill="#292d27">${label}</text>
    <text x="860" y="195" font-family="Georgia,serif" font-size="32" fill="#292d27">color notes.</text>
    <text x="860" y="235" font-family="Arial,sans-serif" font-size="15" fill="#666b60">UNDERTONE · LIGHT · TEXTURE</text>
    ${post.palette.map((color, i) => `<rect x="860" y="${280 + i * 61}" width="${230 - i * 19}" height="47" rx="3" fill="${color}"/>`).join('')}
    <path d="M860 555h290" stroke="#d6d9ce"/><text x="860" y="585" font-family="Arial,sans-serif" font-size="13" fill="#63665d">A practical guide to feeling at home.</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toFile(fileURLToPath(new URL(`${post.slug}.jpg`, output)));
}
console.log(`Generated ${posts.length} original blog illustrations.`);
