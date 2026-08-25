import { fallbackReviews, type Review } from "@/data/fallbackReviews";

export type { Review };

type ApifyReview = {
  reviewerName?: string;
  name?: string;
  reviewerPhotoUrl?: string;
  reviewImageUrls?: string[];
  reviewUrl?: string;
  text?: string;
  textTranslated?: string | null;
  stars?: number;
  publishedAtDate?: string;
  publishAt?: string;
  // The flat reviews actor carries the place each review belongs to, which
  // lets us reject reviews scraped for a different business.
  title?: string;
  url?: string;
};

type ApifyDatasetItem = {
  title?: string;
  url?: string;
  totalScore?: number;
  reviewsCount?: number;
  reviews?: ApifyReview[];
};

export type ReviewsData = {
  reviews: Review[];
  /** Live Google average, or null when we could not confirm it. */
  aggregateRating: number | null;
  /** Live Google review count, or null when we could not confirm it. */
  totalReviewCount: number | null;
};

/**
 * Whether these numbers came from Google rather than the bundled fallback.
 * Anything user-facing may fall back to a sensible default, but structured
 * data must never publish a rating we have not actually confirmed.
 */
export const isLive = (data: ReviewsData): boolean =>
  data.aggregateRating !== null && data.totalReviewCount !== null;

const formatDate = (iso?: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

/** Bundled reviews are real, but their count and average are not Google's. */
const offline: ReviewsData = {
  reviews: fallbackReviews,
  aggregateRating: null,
  totalReviewCount: null,
};

/**
 * Single source of truth for review data.
 *
 * Fetched once per revalidation window on the server and shared by every
 * consumer, so the rating in the About stats, the Testimonials header and the
 * schema.org markup can never drift apart. Always resolves — upstream failures
 * degrade to the bundled reviews rather than throwing into the render.
 */
export async function getReviews(): Promise<ReviewsData> {
  const token = process.env.APIFY_TOKEN;
  // Read from the dedicated palmetto-tide-reviews task so its latest run only
  // ever contains Palmetto's place. The old bare-actor "runs/last" returned
  // whichever business scraped most recently across the shared account.
  const taskId = process.env.APIFY_TASK_ID ?? "gX8coQZ8sJlP54hVI";
  const actorId = process.env.APIFY_ACTOR_ID ?? "compass~Google-Maps-Reviews-Scraper";
  // Safety net: only ever surface reviews for Palmetto Tide Charters' place.
  const placeId = process.env.APIFY_PLACE_ID ?? "ChIJUQT50xpOVGoRJL_O7vcwT50";

  if (!token) return offline;

  try {
    const base = taskId
      ? `https://api.apify.com/v2/actor-tasks/${taskId}/runs/last/dataset/items`
      : `https://api.apify.com/v2/acts/${actorId}/runs/last/dataset/items`;
    const url = `${base}?token=${token}&status=SUCCEEDED&clean=true`;
    const apifyRes = await fetch(url, { next: { revalidate: 86400 } });

    if (!apifyRes.ok) return offline;

    const items = (await apifyRes.json()) as (ApifyDatasetItem | ApifyReview)[];

    let rawReviews: ApifyReview[] = [];
    let aggregateRating: number | null = null;
    let totalReviewCount: number | null = null;

    const isOurPlace = (placeUrl?: string): boolean =>
      !placeId || (placeUrl ?? "").includes(placeId);

    if (items.length > 0 && "reviews" in items[0] && Array.isArray((items[0] as ApifyDatasetItem).reviews)) {
      const places = (items as ApifyDatasetItem[]).filter((p) => isOurPlace(p.url));
      const place = places[0];
      rawReviews = place?.reviews ?? [];
      aggregateRating = typeof place?.totalScore === "number" ? place.totalScore : null;
      totalReviewCount = typeof place?.reviewsCount === "number" ? place.reviewsCount : null;
    } else {
      rawReviews = (items as ApifyReview[]).filter((r) => isOurPlace(r.url));
      totalReviewCount = rawReviews.length;
      if (rawReviews.length > 0) {
        const sum = rawReviews.reduce((acc, r) => acc + (r.stars ?? 0), 0);
        aggregateRating = Math.round((sum / rawReviews.length) * 10) / 10;
      }
    }

    const reviews: Review[] = rawReviews
      .filter((r) => typeof r.stars === "number" && r.stars >= 4 && (r.text ?? "").trim().length > 0)
      .sort((a, b) => {
        // Reviews with photos first, then by recency
        const aHasImg = (a.reviewImageUrls?.length ?? 0) > 0 ? 1 : 0;
        const bHasImg = (b.reviewImageUrls?.length ?? 0) > 0 ? 1 : 0;
        if (bHasImg !== aHasImg) return bHasImg - aHasImg;
        const ad = a.publishedAtDate ? new Date(a.publishedAtDate).getTime() : 0;
        const bd = b.publishedAtDate ? new Date(b.publishedAtDate).getTime() : 0;
        return bd - ad;
      })
      .slice(0, 20)
      .map((r) => ({
        name: r.reviewerName ?? r.name ?? "Google Reviewer",
        rating: r.stars ?? 5,
        date: formatDate(r.publishedAtDate) || r.publishAt || "",
        review: (r.textTranslated ?? r.text ?? "").trim(),
        avatarUrl: r.reviewerPhotoUrl,
        images: r.reviewImageUrls ?? [],
        sourceUrl: r.reviewUrl,
      }));

    // A successful call that yielded nothing usable is not live data.
    if (reviews.length === 0) return offline;

    return { reviews, aggregateRating, totalReviewCount };
  } catch {
    return offline;
  }
}
