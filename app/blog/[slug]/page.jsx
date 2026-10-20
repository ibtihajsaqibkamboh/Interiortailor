import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import BlogCards from '@/components/BlogCards';
import { blogPosts, blogPath, headingId, formatBlogDate, colorResources } from '@/lib/blog';
import { pageMetadata, siteName, siteUrl } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return {};
  const metadata = pageMetadata({ title: post.seoTitle, description: post.description, path: blogPath(post), type: 'article' });
  const image = { url: `/assets/blog/${post.slug}.jpg`, width: 1200, height: 630, alt: `${post.title} — Interior Tailor editorial cover` };
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [image], publishedTime: `${post.date}T00:00:00+05:00`, authors: [`${siteUrl}/about/`] },
    twitter: { card: 'summary_large_image', title: post.seoTitle, description: post.description, images: [image.url] },
  };
}

function LinkedText({ text, currentSlug }) {
  const links = [
    ['beige paint planning guide', '/blog/beige-paint/'],
    ['guide to beige paint colors', '/blog/beige-paint-colors/'],
    ['beige paint colors guide', '/blog/beige-paint-colors/'],
    ['gravel calculator guide', '/blog/gravel-calculator-guide/'],
    ['figuring gravel guide', '/blog/how-to-figure-gravel/'],
    ['gravel calculator', '/gravel-calculator/'],
    ['cubic yard calculator', '/cubic-yard-calculator/'],
    ['cubic feet calculator', '/cubic-feet-calculator/'],
    ['square footage calculator', '/square-footage-calculator/'],
    ['paver calculator', '/paver-calculator/'],
    ['topsoil calculator', '/topsoil-calculator/'],
    ['mulch calculator', '/mulch-calculator/'],
    ['sod calculator', '/sod-calculator/'],
    ['concrete calculator', '/concrete-calculator/'],
    ['color mixing lab', '/color-mixing/'],
    ['how much paint do I need', '/how-much-paint-do-i-need/'],
    ['paint calculator', '/paint-calculator/'],
    ['room color visualizer', '/room-color-visualizer/'],
  ].filter(([, href]) => href !== `/blog/${currentSlug}/`);
  const parts = [];
  let rest = text;
  while (rest) {
    const match = links.map(([phrase, href]) => ({ phrase, href, index: rest.toLowerCase().indexOf(phrase) }))
      .filter(m => m.index >= 0).sort((a, b) => a.index - b.index || b.phrase.length - a.phrase.length)[0];
    if (!match) { parts.push(rest); break; }
    parts.push(rest.slice(0, match.index));
    parts.push(<a key={parts.length} href={match.href}>{rest.slice(match.index, match.index + match.phrase.length)}</a>);
    rest = rest.slice(match.index + match.phrase.length);
  }
  return parts;
}

function ArticleBody({ post }) {
  const rendered = [];
  for (let i = 0; i < post.blocks.length; i++) {
    const block = post.blocks[i];
    if (block.type === 'li') {
      const items = [block];
      while (post.blocks[i + 1]?.type === 'li' && Boolean(post.blocks[i + 1].ordered) === Boolean(block.ordered)) items.push(post.blocks[++i]);
      const List = block.ordered ? 'ol' : 'ul';
      rendered.push(<List key={i}>{items.map((item, j) => <li key={j}><LinkedText text={item.text} currentSlug={post.slug} /></li>)}</List>);
    } else if (block.type === 'table') {
      const caption = post.blocks.slice(0, i).filter(b => b.type === 'h2').at(-1)?.text || 'Paint color comparison';
      rendered.push(<div className="blog-table-wrap" key={i} role="region" aria-label={caption} tabIndex={0}><table><caption>{caption}</caption><thead><tr>{block.rows[0].map((cell, j) => <th scope="col" key={j}>{cell}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, j) => <tr key={j}>{row.map((cell, k) => k === 0 ? <th scope="row" key={k}>{cell}</th> : <td key={k}>{cell}</td>)}</tr>)}</tbody></table></div>);
    } else if (block.type === 'h2') {
      rendered.push(<h2 id={headingId(block.text)} key={i}>{block.text}<a className="blog-heading-anchor" href={`#${headingId(block.text)}`} aria-label={`Link to ${block.text}`}>#</a></h2>);
    } else if (block.type === 'h3') {
      rendered.push(<h3 key={i}>{block.text}</h3>);
    } else {
      rendered.push(<p key={i} className={i === 0 ? 'blog-lead' : undefined}><LinkedText text={block.text} currentSlug={post.slug} /></p>);
    }
  }
  return rendered;
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();
  const url = `${siteUrl}${blogPath(post)}`;
  const headings = post.blocks.filter(b => b.type === 'h2');
  const landscaping = post.category === 'LANDSCAPING';
  const toolPath = landscaping ? '/gravel-calculator/' : '/paint-calculator/';
  const related = blogPosts.filter(p => p.slug !== post.slug).sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 3);
  const schema = [
    { '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title, description: post.description, mainEntityOfPage: { '@type': 'WebPage', '@id': url }, url, image: [`${siteUrl}/assets/blog/${post.slug}.jpg`], datePublished: `${post.date}T00:00:00+05:00`, inLanguage: 'en', articleSection: post.category, author: { '@type': 'Organization', name: siteName, url: `${siteUrl}/about/` }, publisher: { '@type': 'Organization', name: siteName, url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/interior-tailor-logo.png` } } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ] },
  ];
  return (
    <main className="blog-article-page">
      <JsonLd data={schema} />
      <nav className="blog-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span aria-current="page">{post.category.toLowerCase()}</span></nav>
      <article>
        <header className="blog-article-header">
          <span className="blog-kicker">{post.category}</span><h1>{post.title}</h1>
          <p className="blog-article-deck">{post.description}</p>
          <div className="blog-byline"><a href="/about/">By Interior Tailor</a><span>Published <time dateTime={post.date}>{formatBlogDate(post.date)}</time></span><span>{post.readingMinutes} min read</span></div>
        </header>
        <figure className="blog-hero-image"><img src={`/assets/blog/${post.slug}.jpg`} width="1200" height="630" alt={`${post.title} — purple Interior Tailor cover with ${landscaping ? 'gravel and measurement graphics' : 'paint swatches and a roller'}`} fetchPriority="high" /><figcaption>Cover design by Interior Tailor. {landscaping ? 'Material illustrations are for inspiration; confirm the actual stone, density and specification with your supplier.' : 'These are not manufacturer color swatches; test physical paint samples in your room.'}</figcaption></figure>
        <div className="blog-reading-layout">
          <aside className="blog-toc"><nav aria-label="On this page"><h2>In this guide</h2><ol>{headings.map(h => <li key={h.text}><a href={`#${headingId(h.text)}`}>{h.text}</a></li>)}</ol></nav><a className="blog-text-link" href={toolPath}>Estimate your {landscaping ? 'gravel' : 'paint'} ↗</a></aside>
          <div className="blog-prose">
            <ArticleBody post={post} />
            <aside className="blog-editor-note"><h2 id="article-references">{landscaping ? 'References & material estimates' : 'Color references & sampling notes'}</h2><p>{landscaping ? 'Gravel quantities and weights are planning estimates. Confirm material density, compaction, layer depths and delivery quantities with your local supplier. Drainage and driveway construction need a design suited to the site.' : 'Use the manufacturer’s current color library to confirm names, codes and product availability. Color impressions are subjective, and screen colors cannot reproduce a painted finish. Directional-light examples describe typical Northern Hemisphere conditions; local climate, obstructions and hemisphere can change them.'}</p><ul>{[...(post.sources || []), ...(landscaping ? [] : colorResources)].map(resource => <li key={resource.url}><a href={resource.url}>{resource.label}</a></li>)}</ul>{post.slug === 'beige-paint-colors' && <p>Manufacturer reference: <a href="https://www.benjaminmoore.com/en-us/paint-colors/color/oc-12/muslin">Muslin OC-12 has an LRV of 66.54</a>. Other LRV figures in this guide are approximate; confirm the current value before purchase.</p>}<p>This article contains no affiliate links. For a correction or a question, <a href="/contact/">contact Interior Tailor</a>.</p></aside>
            <aside className="blog-tool-callout"><div><h2>{landscaping ? 'Turn your measurements into a material estimate.' : 'Make your color choice a project plan.'}</h2><p>{landscaping ? 'Calculate volume and approximate weight, then confirm your order with your supplier.' : 'Explore a digital preview, then estimate paint using the coverage on your chosen product.'}</p><div className="blog-tool-links">{landscaping ? <><a href="/gravel-calculator/">Calculate gravel quantity ↗</a><a href={post.slug === 'how-to-figure-gravel' ? '/blog/gravel-calculator-guide/' : '/blog/how-to-figure-gravel/'}>Read the companion gravel guide ↗</a></> : <><a href="/room-color-visualizer/">Try the room visualizer ↗</a><a href="/paint-calculator/">Calculate paint quantity ↗</a></>}</div></div></aside>
          </div>
        </div>
      </article>
      <section className="blog-related" aria-labelledby="related-guides"><h2 id="related-guides" className="blog-section-title">Keep exploring <a href="/blog/">All project guides ↗</a></h2><BlogCards posts={related} /></section>
    </main>
  );
}
