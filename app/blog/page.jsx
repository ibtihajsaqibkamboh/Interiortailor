import BlogCards from '@/components/BlogCards';
import JsonLd from '@/components/JsonLd';
import { blogPosts, blogPath } from '@/lib/blog';
import { pageMetadata, siteUrl } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Home Improvement Blog - Paint & Landscaping Guides',
  description: 'Plan your next project with paint color and landscaping guides. Explore warm neutrals, calculate gravel quantities, and turn measurements into a practical plan.',
  path: '/blog/',
});

export default function BlogPage() {
  return (
    <main className="blog-index">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Interior Tailor Home Improvement Blog', url: `${siteUrl}/blog/`, mainEntity: {
        '@type': 'ItemList', itemListElement: blogPosts.map((post, i) => ({ '@type': 'ListItem', position: i + 1, url: `${siteUrl}${blogPath(post)}`, name: post.title })),
      } }} />
      <nav className="blog-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav>
      <header className="blog-index__header">
        <span className="blog-kicker">THE INTERIOR TAILOR JOURNAL</span>
        <h1>A little know-how.<br />A home that feels like you.</h1>
        <p>Practical guides for projects inside and out. Find your color, understand your materials, and turn your next home idea into a clear plan.</p>
      </header>
      <section aria-labelledby="project-guides"><h2 id="project-guides" className="blog-section-title">Explore our project guides <span>{String(blogPosts.length).padStart(2, '0')} articles</span></h2><BlogCards posts={blogPosts} /></section>
      <aside className="blog-tool-callout"><div><span className="blog-kicker">FROM INSPIRATION TO A PLAN</span><h2>Found your color? Work out how much to buy.</h2><p>Use your room measurements, coats and coverage rate to estimate paint quantity.</p></div><a className="btn btn--primary" href="/paint-calculator/">Open paint calculator</a></aside>
    </main>
  );
}
