import { publicRoutes, siteUrl } from '@/lib/site';

export default function sitemap() {
  return publicRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
