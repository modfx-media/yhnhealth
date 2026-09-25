import { cache } from "react";
import {
  GOOGLE_LOCATIONS,
  googleReviewsFallback,
  googleReviewsMetaFallback,
  isFiveStarReview,
  type GoogleReview,
  type GoogleReviewsMeta,
  type LocationKey,
  type LocationMeta,
} from "./reviews";

const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const PLACES_FIELD_MASK = "id,rating,userRatingCount,googleMapsUri,reviews";

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type PlacesDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  error?: { message?: string; status?: string };
};

function mapPlaceReview(review: PlacesReview, location: LocationKey): GoogleReview | null {
  const quote = (review.text?.text ?? review.originalText?.text ?? "").trim();
  const name = review.authorAttribution?.displayName?.trim() ?? "";
  const rating = review.rating ?? 0;

  // Exact 5 only. Drop 4, 4.5, empty text, and nameless authors here.
  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relativePublishTimeDescription,
    location,
  };
}

async function fetchLocationReviews(
  key: LocationKey,
): Promise<{ reviews: GoogleReview[]; meta: LocationMeta } | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim();
  const config = GOOGLE_LOCATIONS[key];
  const placeId = process.env[`GOOGLE_PLACE_ID_${key.toUpperCase()}`]?.trim() || config.placeId;

  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": PLACES_FIELD_MASK,
        },
        next: {
          revalidate: REVIEWS_REVALIDATE_SECONDS,
          tags: ["google-reviews"],
        },
      },
    );

    const data = (await response.json()) as PlacesDetailsResponse;

    if (!response.ok || data.error) {
      console.error(
        `Google Places reviews request failed for ${key}:`,
        data.error?.message ?? response.statusText,
      );
      return null;
    }

    const reviews = (data.reviews ?? [])
      .map((r) => mapPlaceReview(r, key))
      .filter((r): r is GoogleReview => r !== null)
      .filter(isFiveStarReview);

    return {
      reviews,
      meta: {
        rating: data.rating ?? googleReviewsMetaFallback[key].rating,
        reviewCount: data.userRatingCount ?? googleReviewsMetaFallback[key].reviewCount,
        reviewsUrl: data.googleMapsUri ?? config.reviewsUrl,
      },
    };
  } catch (error) {
    console.error(`Google Places reviews fetch error for ${key}:`, error);
    return null;
  }
}

/**
 * Live 5-star Google reviews across both clinic locations, combined.
 * Place Details returns at most 5 most-relevant reviews per location - that
 * is Google's ceiling, not a bug, so up to 10 total is the maximum here.
 * Falls back to a saved verified snapshot per location if the live call fails.
 */
export const getDisplayedGoogleReviews = cache(async (): Promise<GoogleReviewsPayload> => {
  const keys = Object.keys(GOOGLE_LOCATIONS) as LocationKey[];
  const results = await Promise.all(keys.map((key) => fetchLocationReviews(key)));

  const reviews: GoogleReview[] = [];
  const byLocation = {} as GoogleReviewsMeta["byLocation"];

  keys.forEach((key, i) => {
    const result = results[i];
    if (result && result.reviews.length > 0) {
      reviews.push(...result.reviews);
      byLocation[key] = result.meta;
    } else {
      reviews.push(...googleReviewsFallback.filter((r) => r.location === key));
      byLocation[key] = googleReviewsMetaFallback[key];
    }
  });

  const reviewCount = keys.reduce((sum, key) => sum + byLocation[key].reviewCount, 0);
  const weightedRating = reviewCount > 0
    ? keys.reduce((sum, key) => sum + byLocation[key].rating * byLocation[key].reviewCount, 0) / reviewCount
    : 0;

  return {
    reviews,
    meta: {
      rating: Math.round(weightedRating * 10) / 10,
      reviewCount,
      fiveStarCount: reviews.length,
      byLocation,
    },
  };
});

export function reviewsForLocation(payload: GoogleReviewsPayload, key: LocationKey): GoogleReview[] {
  return payload.reviews.filter((r) => r.location === key);
}
