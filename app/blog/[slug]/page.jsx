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
  const image = { url: `/assets/blog/${post.slug}.jpg`, width: 1200, height: 630, alt: `${post.category}: an illustrated room and a coordinated color palette` };
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [image], publishedTime: `${post.date}T00:00:00+05:00`, authors: [`${siteUrl}/about/`] },
    twitter: { card: 'summary_large_image', title: post.seoTitle, description: post.description, images: [image.url] },
  };
}

function LinkedText({ text, currentSlug }) {
  const links = [
    ['guide to beige paint colors', '/blog/beige-paint-colors/'],
    ['paint calculator', '/paint-calculator/'],
    ['room color visualizer', '/room-color-visualizer/'],
  ].filter(([, href]) => href !== `/blog/${currentSlug}/`);
  const match = links.map(([phrase, href]) => ({ phrase, href, index: text.toLowerCase().indexOf(phrase) })).find(m => m.index >= 0);
  if (!match) return text;
  return <>{text.slice(0, match.index)}<a href={match.href}>{text.slice(match.index, match.index + match.phrase.length)}</a>{text.slice(match.index + match.phrase.length)}</>;
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
  const schema = [
    { '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title, description: post.description, mainEntityOfPage: { '@type': 'WebPage', '@id': url }, url, image: [`${siteUrl}/assets/blog/${post.slug}.jpg`], datePublished: `${post.date}T00:00:00+05:00`, inLanguage: 'en', articleSection: 'Paint color guides', author: { '@type': 'Organization', name: siteName, url: `${siteUrl}/about/` }, publisher: { '@type': 'Organization', name: siteName, url: siteUrl, logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/interior-tailor-logo.png` } } },
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
        <figure className="blog-hero-image"><img src={`/assets/blog/${post.slug}.jpg`} width="1200" height="630" alt={`Illustrated living room with ${post.slug === 'best-paint-colors-for-living-room' ? 'neutral, green and blue' : post.slug.split('-')[0]} tones and four coordinating color swatches`} fetchPriority="high" /><figcaption>Illustrative color inspiration by Interior Tailor. These are not manufacturer color swatches; test physical paint samples in your room.</figcaption></figure>
        <div className="blog-reading-layout">
          <aside className="blog-toc"><nav aria-label="On this page"><h2>In this guide</h2><ol>{headings.map(h => <li key={h.text}><a href={`#${headingId(h.text)}`}>{h.text}</a></li>)}</ol></nav><a className="blog-text-link" href="/paint-calculator/">Estimate your paint ↗</a></aside>
          <div className="blog-prose">
            <ArticleBody post={post} />
            <aside className="blog-editor-note"><h2 id="color-references">Color references &amp; sampling notes</h2><p>Use the manufacturer’s current color library to confirm names, codes and product availability. Color impressions are subjective, and screen colors cannot reproduce a painted finish. Directional-light examples describe typical Northern Hemisphere conditions; local climate, obstructions and hemisphere can change them.</p><ul>{[...(post.sources || []), ...colorResources].map(resource => <li key={resource.url}><a href={resource.url}>{resource.label}</a></li>)}</ul>{post.slug === 'beige-paint-colors' && <p>Manufacturer reference: <a href="https://www.benjaminmoore.com/en-us/paint-colors/color/oc-12/muslin">Muslin OC-12 has an LRV of 66.54</a>. Other LRV figures in this guide are approximate; confirm the current value before purchase.</p>}<p>Brand names identify paint examples. This article contains no affiliate links. For a correction or a question, <a href="/contact/">contact Interior Tailor</a>.</p></aside>
            <aside className="blog-tool-callout"><div><h2>Make your color choice a project plan.</h2><p>Explore a digital preview, then estimate paint using the coverage on your chosen product.</p><div className="blog-tool-links"><a href="/room-color-visualizer/">Try the room visualizer ↗</a><a href="/paint-calculator/">Calculate paint quantity ↗</a></div></div></aside>
          </div>
        </div>
      </article>
      <section className="blog-related" aria-labelledby="related-guides"><h2 id="related-guides" className="blog-section-title">Keep exploring <a href="/blog/">All paint guides ↗</a></h2><BlogCards posts={blogPosts.filter(p => p.slug !== post.slug)} /></section>
    </main>
  );
}
