import BlogCards from '@/components/BlogCards';
import JsonLd from '@/components/JsonLd';
import { blogPosts, blogPath } from '@/lib/blog';
import { pageMetadata, siteUrl } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Paint Color Blog - Practical Guides for Your Home',
  description: 'Explore practical guides to gray, green, beige and living room paint colors. Understand undertones, compare finishes, and test colors in your own light.',
  path: '/blog/',
});

export default function BlogPage() {
  return (
    <main className="blog-index">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Interior Tailor Paint Color Blog', url: `${siteUrl}/blog/`, mainEntity: {
        '@type': 'ItemList', itemListElement: blogPosts.map((post, i) => ({ '@type': 'ListItem', position: i + 1, url: `${siteUrl}${blogPath(post)}`, name: post.title })),
      } }} />
      <nav className="blog-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav>
      <header className="blog-index__header">
        <span className="blog-kicker">THE INTERIOR TAILOR JOURNAL</span>
        <h1>A little color knowledge.<br />A home that feels like you.</h1>
        <p>Practical paint guides for real rooms. Find your undertone, make sense of the light, and choose a shade you’ll enjoy living with.</p>
      </header>
      <section aria-labelledby="color-guides"><h2 id="color-guides" className="blog-section-title">Explore our paint color guides <span>04 articles</span></h2><BlogCards posts={blogPosts} /></section>
      <aside className="blog-tool-callout"><div><span className="blog-kicker">FROM INSPIRATION TO A PLAN</span><h2>Found your color? Work out how much to buy.</h2><p>Use your room measurements, coats and coverage rate to estimate paint quantity.</p></div><a className="btn btn--primary" href="/paint-calculator/">Open paint calculator</a></aside>
    </main>
  );
}
