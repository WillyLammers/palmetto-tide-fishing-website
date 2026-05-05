import { NextRequest, NextResponse } from "next/server";

// Called by quarterly Vercel cron — triggers a fresh Apify scrape of Palmetto Tide's Google reviews.
// Secured via CRON_SECRET so only Vercel's scheduler can invoke it.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.APIFY_TOKEN;
  const actorId = process.env.APIFY_ACTOR_ID ?? "compass~Google-Maps-Reviews-Scraper";
  const placeUrl = process.env.APIFY_PLACE_URL ?? "https://www.google.com/maps?cid=11335332628536409892";

  if (!token) {
    return NextResponse.json({ error: "APIFY_TOKEN not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/${actorId}/runs?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startUrls: [{ url: placeUrl }],
          maxReviews: 50,
          reviewsSort: "newest",
          language: "en",
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Apify returned ${res.status}`, detail: text }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ started: true, runId: data?.data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
