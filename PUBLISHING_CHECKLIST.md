# Publishing and AdSense preparation

The four supplied PDF articles are now full HTML pages under `/blog/`, with descriptive titles and summaries, canonical URLs, original illustrations, social previews, visible publication dates, a publisher byline, structured data, table-of-contents anchors and related articles. They are linked from the homepage, shared navigation and sitemap. No ad inventory or publisher identifiers have been invented.

## Before applying

- Deploy the final site to your domain, set `NEXT_PUBLIC_SITE_URL` to its actual canonical HTTPS origin, and confirm it is accessible without authentication. The default is `https://www.interiortailor.com`.
- Verify the supplied article content is yours to publish and keep it accurate and useful. No independent plagiarism or rights audit has been performed.
- Confirm the real contact inbox `interiortailor@gmail.com` is monitored. The site opens the visitor's email application; it does not claim to deliver a web form submission.
- Review About, Privacy Policy and Terms against the actual operator, hosting, data practices, vendors and retention settings. The privacy update describes the current analytics opt-in and prospective Google advertising; it is not a certification of legal compliance.
- Set up the site's real AdSense account and verification method. Add only the publisher ID and ads.txt entry supplied by that account. Do not put ads on empty, error, consent or navigation-only pages, and keep ads visually distinct from tools and navigation.
- Before enabling ads, configure Google's required consent solution for the regions you serve. The current analytics preference UI is not a Google-certified advertising CMP. Update vendor disclosures to match the enabled advertising configuration.
- Resolve the existing dependency security advisories and the calculator correctness issues recorded in `PROJECT_REVIEW.md`. This blog work does not repair or certify all existing tools.
- Check the deployed pages in Search Console and Google's Rich Results Test; verify sitemap discovery, mobile readability, canonical domain and real-world performance. Local structured-data checks cannot guarantee indexing or rich results.

There is no promised article count or guaranteed route to AdSense approval. Google evaluates the site and its content. These changes follow the general guidance on useful original content, accessible navigation and truthful disclosures.

## Official references checked October 20, 2026

- https://support.google.com/adsense/answer/7299563
- https://support.google.com/adsense/answer/1348695
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/article
