import { blogPath, formatBlogDate } from '@/lib/blog';

export default function BlogCards({ posts }) {
  return (
    <div className="blog-cards">
      {posts.map(post => (
        <article className="blog-card" key={post.slug}>
          <a className="blog-card__image" href={blogPath(post)} tabIndex={-1} aria-hidden="true">
            <img src={`/assets/blog/${post.slug}.jpg`} alt="" width="1200" height="630" loading="lazy" />
          </a>
          <div className="blog-card__body">
            <span className="blog-kicker">{post.category}</span>
            <h3><a href={blogPath(post)}>{post.title}</a></h3>
            <p>{post.description}</p>
            <div className="blog-card__meta"><time dateTime={post.date}>{formatBlogDate(post.date)}</time><span>{post.readingMinutes} min read</span></div>
            <a className="blog-text-link" href={blogPath(post)}>Read the guide <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      ))}
    </div>
  );
}
