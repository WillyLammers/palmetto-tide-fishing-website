# Palmetto Tide Charters

Website for Palmetto Tide Charters, Captain Joseph Christy's inshore fishing
charters in Charleston, SC: https://www.palmettotidecharters.com

Next.js 16 (App Router) + Tailwind CSS 4, deployed on Vercel. Pushing to
`main` deploys.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

- Contact details and links: `src/data/site.ts`
- Trips and prices: `src/data/trips.ts`
- FAQ: `src/data/faq.ts`
- Gallery order: `src/data/gallery.ts`
- Add new photos: `python3 scripts/add-photos.py <files>` (see `AGENTS.md`)

Environment (Vercel): `APIFY_TOKEN` enables live Google reviews; without it
the site shows the bundled reviews in `src/data/fallbackReviews.ts`.
