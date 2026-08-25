import { NextResponse } from "next/server";
import { getReviews, isLive, type Review } from "@/lib/reviews";

export type { Review };

/**
 * The page itself reads reviews on the server via `getReviews()`, so nothing in
 * the UI depends on this route. It stays as a stable JSON view of the same
 * data — handy for checking whether the Apify scrape is still feeding live
 * numbers without having to read the rendered HTML.
 */
export async function GET() {
  const data = await getReviews();

  return NextResponse.json(
    { ...data, isLive: isLive(data) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
