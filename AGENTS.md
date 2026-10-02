<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Palmetto Tide Charters site: what an agent working here needs to know

One-page site for Captain Joseph Christy's Charleston inshore charters, deployed
by Vercel from `main`. Bookings happen by phone and text, so every design
decision serves "get them to call or text."

## Where things live

- `src/data/site.ts` is the only place the phone number, email and outbound
  links are written. `src/data/trips.ts` drives the trip cards, the booking
  planner AND the schema.org offers: a price change is one edit.
- `src/data/faq.ts` renders the visible FAQ and the FAQPage markup. Google
  requires structured data to match visible content; keep them one list.
- `src/data/gallery.ts` is the photo gallery in display order, newest first.
- Reviews come from Apify via `src/lib/reviews.ts`; tides from NOAA via
  `src/lib/tides.ts`. Both fail soft to fallbacks and never break the page.

## Adding photos

The owner drops new photos into a Google Drive folder and asks for them to be
added. Drive files in that folder are publicly downloadable:
`curl -sSL -o NAME "https://drive.google.com/uc?export=download&id=FILE_ID"`
(list the folder with the Drive connector to get IDs; only take files newer
than the last batch). Then:

    pip install pillow pillow-heif
    python3 scripts/add-photos.py photo1.HEIC photo2.HEIC ...

It converts to sRGB (iPhone HEICs are Display P3 and look washed out
otherwise), strips all metadata including GPS (boat photos give away the
captain's spots), skips near-duplicates, numbers them and puts them at the top
of `gallery.ts`. View the photos and add a species tag only where certain.

- Never overwrite an existing `fishing-NN.jpg` or video: `/images/*` and
  `/videos/*` are served immutable for a year, so a replaced file never reaches
  returning visitors. New file, new name.
- A standout photo can also replace a trip card photo in `trips.ts`
  (`photoPosition` sets the 4:3 crop).

## Rules that are easy to break

- Copy is plain and verifiable. Do not invent claims about Joseph, the boat,
  policies or results. Earlier sessions spent many commits cutting filler.
- No aggregateRating/review schema: self-hosted reviews are ineligible for
  stars and only produce invalid markup (see `StructuredData.tsx`).
- `.reveal` hides content only under `@media (scripting: enabled)`; never hide
  content in a way that depends on JavaScript running.
- The hero headline must not fade in from opacity 0 (LCP), and the hero video
  is attached after `load` and skipped for reduced-motion/Data Saver.
- Gallery thumbnails mount in batches with plain `<img>` from
  `getImageProps`; rendering 100+ `next/image` components cost ~500ms of
  main-thread time on a phone.
- Check before shipping: `npx tsc --noEmit`, `npm run lint`, `npm run build`,
  and look at it at 360px, 390px, 820px and 1440px wide.
