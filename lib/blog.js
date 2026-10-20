import articles from './blog-content.json';

export const blogPosts = articles;
export const blogPath = (post) => `/blog/${post.slug}/`;
export const headingId = (text) => text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
export const formatBlogDate = (date) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

export const colorResources = [
  { label: 'Benjamin Moore color library', url: 'https://www.benjaminmoore.com/en-us/paint-colors' },
  { label: 'Sherwin-Williams color library', url: 'https://www.sherwin-williams.com/en-us/color' },
  { label: 'Behr color library', url: 'https://www.behr.com/consumer/colors/paint/' },
];
