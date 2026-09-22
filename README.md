# Paint Planners — Next.js

This project migrates the supplied Paint Planners HTML website into a Next.js App Router project while preserving the original calculator, color mixing lab, room preview, styling, logo, and legal pages.

## Routes

- `/`
- `/calculator/`
- `/color-mixing/`
- `/about/`
- `/contact/`
- `/privacy-policy/`
- `/terms/`

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

Before publishing, replace `YOUR-DOMAIN.com` in `app/layout.jsx`, `app/robots.js`, and `app/sitemap.js` with the real domain.

The contact page still contains the original `contact@example.com` placeholder and should be replaced with the real contact address.
