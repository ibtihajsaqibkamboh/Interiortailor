# Interior Tailor - Next.js

This project is a Next.js App Router website for Interior Tailor. It includes a paint calculator, color mixing lab, room color visualizer, SEO content pages, legal pages, branding assets, and responsive styling.

## Routes

- `/`
- `/paint-calculator/`
- `/room-color-visualizer/`
- `/color-mixing/`
- `/how-much-paint-do-i-need/`
- `/how-to-calculate-wall-area-for-painting/`
- `/how-many-coats-of-paint-do-i-need/`
- `/about/`
- `/contact/`
- `/privacy-policy/`
- `/terms/`

The legacy `/calculator/` route still renders the calculator for compatibility.

## Run locally

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the production domain when deploying. If it is not set, metadata, sitemap, and robots use `https://www.interiortailor.com`.

The contact email is `interiortailor@gmail.com`. The Contact page uses a direct email link, not a backend form.

## Blog

`/blog/` lists four complete paint guides. Article content lives in `lib/blog-content.json`; the static article template, metadata and BlogPosting/BreadcrumbList structured data live in `app/blog/[slug]/page.jsx`. Edit publication dates only when accurate. Original cover illustrations are generated with `node scripts/generate-blog-images.mjs`.

Google Analytics loads only after an opt-in through the cookie preferences. This controls analytics only; AdSense and an advertising consent platform are not configured. See `PUBLISHING_CHECKLIST.md` before deploying or applying for AdSense.

With the production server running, use `npm run check:blog` to verify full article rendering, metadata, structured data, sitemap entries, images, navigation and 404 behavior. Set `TEST_SITE_URL` to check another origin.
