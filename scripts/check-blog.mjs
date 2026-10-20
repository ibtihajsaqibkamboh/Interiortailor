import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.env.TEST_SITE_URL || 'http://127.0.0.1:3000';
const posts = JSON.parse(await fs.readFile(new URL('../lib/blog-content.json', import.meta.url), 'utf8'));
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const headings = new Set(), descriptions = new Set();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();

for (const post of posts) {
  const route = `/blog/${post.slug}/`;
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '');
  assert(title.includes(post.seoTitle), `Missing SEO title: ${route}`);
  assert.equal(description, post.description);
  assert(!headings.has(title), 'Duplicate title'); headings.add(title);
  assert(!descriptions.has(description), 'Duplicate description'); descriptions.add(description);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `One H1 required: ${route}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  assert(canonical?.endsWith(route), `Canonical mismatch: ${route}`);
  assert(sitemap.includes(canonical), `Missing sitemap URL: ${route}`);
  assert(html.includes('summary_large_image'), `Missing social card: ${route}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m => JSON.parse(m[1]));
  const article = schemas.find(s => s['@type'] === 'BlogPosting');
  const crumbs = schemas.find(s => s['@type'] === 'BreadcrumbList');
  assert.equal(article?.headline, post.title);
  assert.equal(article?.mainEntityOfPage?.['@id'], canonical);
  assert.equal(crumbs?.itemListElement.at(-1)?.item, canonical);
  assert.equal(article?.author?.name, 'Interior Tailor');
  const ids = new Set([...html.matchAll(/\bid="([^"]*)"/g)].map(m => m[1]));
  const anchors = [...html.matchAll(/href="#([^"]*)"/g)].map(m => m[1]);
  for (const anchor of anchors) assert(ids.has(anchor), `Broken contents anchor #${anchor}`);
  const visibleHTML = decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ''));
  for (const block of post.blocks) if (block.text) assert(visibleHTML.includes(block.text), `Missing SSR article content: ${block.text.slice(0, 60)}`);
  assert(!/Page \d+ of \d+/.test(visibleHTML), 'PDF page furniture leaked into article');
  const image = await fetch(`${base}/assets/blog/${post.slug}.jpg`);
  assert.equal(image.status, 200); assert(image.headers.get('content-type')?.includes('image/jpeg'));
  console.log(`PASS ${route}: full server-rendered content, metadata, schema, TOC, image and sitemap`);
}

for (const route of ['/', '/blog/', '/about/', '/contact/', '/privacy-policy/', '/terms/', '/paint-calculator/']) {
  const response = await fetch(`${base}${route}`);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert(html.includes('href="/blog/"'), `Missing blog navigation: ${route}`);
  assert(!html.includes('contact@example.com'), `Contact placeholder: ${route}`);
  assert(!/<script[^>]+src="https:\/\/www\.googletagmanager\.com/.test(html), 'Analytics loaded before opt-in');
}
assert.equal((await fetch(`${base}/blog/missing-article/`)).status, 404, 'Unknown article must return 404');
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert(robots.includes('Sitemap: '));
console.log('PASS shared navigation, contact, default analytics gating, unknown-slug 404 and robots metadata');
