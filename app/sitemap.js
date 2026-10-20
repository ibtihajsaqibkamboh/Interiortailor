import { publicRoutes, siteUrl } from '@/lib/site';
import { blogPosts, blogPath } from '@/lib/blog';

export default function sitemap() {
  return publicRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: blogPosts.find(post => blogPath(post) === path)?.date || new Date(),
    changeFrequency,
    priority,
  }));
}
