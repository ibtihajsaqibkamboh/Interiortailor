export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://YOUR-DOMAIN.com/sitemap.xml',
  };
}
