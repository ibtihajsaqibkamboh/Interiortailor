export default function sitemap() {
  const base = 'https://YOUR-DOMAIN.com';
  return ['', '/calculator/', '/color-mixing/', '/about/', '/contact/', '/privacy-policy/', '/terms/'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
