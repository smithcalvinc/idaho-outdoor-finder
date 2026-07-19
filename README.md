# Idaho Outdoor Finder — Phase 5 Node Build

This build keeps the working Phase 4 interface and moves the data and live-service functions into a Next.js server.

## What is active

- Next.js server and API routes
- Separate destination/source/condition JSON files
- Server-side National Weather Service proxy with short caching
- Server health and admin status endpoints
- Community-report validation
- Optional MySQL storage for community reports
- PWA shell caching that never caches `/api/*` as current conditions
- Conservative readiness rules: weather alone never turns a destination green

## Local test

```bash
npm install
npm run validate
npm run dev
```

Open `http://localhost:3000` and test `/api/health`.

## Wasmer deployment

This is intentionally a JavaScript-framework deployment. Wasmer should detect `package.json`, `next.config.mjs`, and the `build`/`dev` scripts and enter its Node/Next.js build process. That is correct for this version.

Deploy the entire project folder or connect the project through Git. Do not upload only `index.html`.

Required first deployment secrets: none. Recommended:

- `NWS_USER_AGENT`
- `ADMIN_TOKEN`

Optional database secrets are shown in `.env.example`. If no database is attached, community reports fall back to clearly labeled browser-only drafts.

## Important

The current data set still contains only two reviewed coordinate records. Live weather checks for starter coordinates are shown as weather information only and do not validate navigation, access, or readiness.
