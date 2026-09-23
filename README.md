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

Set `NEXT_PUBLIC_SITE_URL` to the production domain when deploying. If it is not set, metadata, sitemap, and robots use `https://interiortailor.com`.

The contact page still contains the placeholder `contact@example.com` and should be replaced with the real contact address before publishing.
