import { publicRoutes, siteUrl } from '@/lib/site';

export default function sitemap() {
  return publicRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
