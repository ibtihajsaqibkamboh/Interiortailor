# Interior Tailor project review

Reviewed October 20, 2026.

## Project structure

- Next.js 16.3.3 App Router, React / React DOM 19.2.0, JavaScript and global CSS.
- 50 page routes, 38 dedicated React calculator components, plus the legacy paint calculator and color mixer in `public/app.js`.
- Static articles and legal/contact content, shared header/footer, JSON-LD, sitemap and robots metadata.
- No database, API routes, authentication, or backend contact delivery found. No environment variables are required for local startup. `NEXT_PUBLIC_SITE_URL` controls the canonical origin.
- Paint/mixer markup is fetched client-side from a 1.04 MB HTML file. A second copy exists at the repository root.

## Verification

- Installed the locked dependencies with `npm ci`.
- `npm run build`: passed; all 54 generated outputs completed. The first sandboxed attempt failed on generated-file permissions; the unrestricted retry succeeded.
- Started the production server using `npm start -- --hostname 127.0.0.1` at http://127.0.0.1:3000.
- HTTP checks: all 50 pages plus `/robots.txt`, `/sitemap.xml`, `/app.js`, and `/tool-content.html` returned 200.
- `node --check public/app.js`: passed.
- `npm run lint`: failed because `next lint` is treated as a directory by the installed Next.js CLI. There is no working lint configuration or test script.
- Online `npm audit`: three affected packages, one critical and two high. The offline audit returned no findings and is not a valid substitute for the online result.
- In-app browser navigation timed out while the server was sandboxed. HTTP verification passed after restarting the server outside the sandbox. Visual layout, browser interactions, and exhaustive formula correctness have not been verified.

## Findings, in priority order

1. **Wire-size results can recommend a wire that fails the requested requirements.** `components/WireSizeCalculator.jsx:69` falls back to the largest entry whenever no wire qualifies. For example, a 300 A input still produces a recommendation from a table whose maximum capacity is 195 A. Return an explicit out-of-range result instead. The aluminum option also reuses the table labeled as copper ampacity; only resistivity changes.
2. **Locked dependencies have security advisories.** Online npm audit flags Next.js 16.3.3 (critical), sharp (high), and source-map-js (high). All report fixes available. The Next.js advisory list includes GHSA-vcvr-r3jv-pc5j and advisories fixed in 16.3.8. Applicability depends on feature usage; no `next/og` ImageResponse use was found in the inspected application files. Update dependencies and rebuild before deployment.
3. **Invalid numeric text can pass validation.** The `!value || parseFloat(value) <= 0` pattern occurs in 37 calculator components. Nonempty text such as `abc` produces NaN, for which the comparison is false; partial text such as `12abc` becomes 12. Use strict, finite numeric validation before calculations. Examples: `components/BlockCalculator.jsx:33` and `components/WireSizeCalculator.jsx:42`.
4. **Joist species selection has no effect.** `components/JoistSpanCalculator.jsx:29` stores the selected species, but `handleCalc` uses a single span table regardless of the choice. Remove unsupported choices or implement verified tables for each option.
5. **Contact form is a placeholder.** `contact-content.html:1` submits to `mailto:contact@example.com`; it needs a real destination and depends on a configured mail client. There is no server delivery workflow.
6. **Broken lint workflow and no automated test suite.** `package.json` invokes `next lint`, which fails. Configure an actual lint tool and add meaningful calculator tests, especially invalid input, unit conversions and out-of-range results.
7. **Fragile paint-tool loading.** `components/ToolMarkup.jsx` does not check `response.ok`, silently swallows fetch failures, and signals readiness even on failure. `components/ToolBoot.jsx` then loads a script that assumes all required nodes exist. Add an error/retry UI and only boot on successful markup load. Fetching all tool markup also delays the interactive UI and adds a large payload.
8. **Conflicting SEO configuration.** Both `app/robots.js` and `public/robots.txt` define robots output. The static file points to the non-www domain while `lib/site.js` defaults to www. Consolidate them and align the README. `public/app.js:32` also overwrites route-specific page titles, including the room visualizer title.
9. **Maintenance and accessibility gaps.** Calculator validation/field code and tool catalogs are duplicated. Numerous calculators use radio-group roles with pressed buttons rather than radio semantics; check keyboard behavior and accessible error associations. Native anchors cause full page reloads across navigation.

## Local commands

```powershell
npm ci
npm run build
npm start -- --hostname 127.0.0.1
```

For development, stop the production server before running `npm run dev` on the same port. Dependencies are installed; application source was left unchanged during this review.
