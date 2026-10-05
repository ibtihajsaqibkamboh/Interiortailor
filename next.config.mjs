/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  async redirects() {
    return [
      // Enforce non-www canonical domain.
      // Any request to www.interiortailor.com is permanently redirected to
      // interiortailor.com so the sitemap, pages and crawlers all resolve to
      // the same origin — eliminating the "redirect" sitemap errors in SEMrush.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.interiortailor.com' }],
        destination: 'https://interiortailor.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
