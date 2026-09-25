/**
 * Per-location Google Business Profile config and a verified fallback snapshot.
 * Live data is fetched via lib/google-reviews.ts; this file is only the source
 * of truth for place IDs and the offline fallback used if that call fails.
 */
export type LocationKey = "merchantville" | "chalfont";

export const GOOGLE_LOCATIONS: Record<
  LocationKey,
  { placeId: string; label: string; reviewsUrl: string }
> = {
  merchantville: {
    placeId: "ChIJKTtE51r9w4kRQYD3ybP962w",
    label: "Merchantville, NJ",
    reviewsUrl: "https://maps.app.goo.gl/eZph1e6LanqehCXF8",
  },
  chalfont: {
    placeId: "ChIJP6NRKQynxokR0MQSN6lH-6s",
    label: "Chalfont, PA",
    reviewsUrl: "https://maps.app.goo.gl/XZTDgRGTwdgtHUgS6",
  },
};

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
  location: LocationKey;
};

export type LocationMeta = {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  byLocation: Record<LocationKey, LocationMeta>;
};

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return review.rating === 5 && review.quote.trim().length > 0 && review.name.trim().length > 0;
}

/**
 * Real 5-star Google reviews captured at integration time (2026-09-25).
 * Used only when the live Places API call is unavailable.
 */
export const googleReviewsFallback: GoogleReview[] = [
  {
    location: "merchantville",
    name: "Jennifer Krasnopolski",
    rating: 5,
    relativeTime: "2 months ago",
    quote:
      "I can't recommend Dr. Lillee enough! I'd been dealing with shoulder pain for months and had no improvement with physical therapy. Dr. Lillee took the time to really understand what was going on and put together a treatment plan that actually helped. I've had such noticeable improvement, and now my shoulder pain is almost completely gone. What stands out the most is how attentive and knowledgeable she is, and she explains the \u201cwhy\u201d behind each adjustment. I'm so grateful to Dr. Lillee for taking the time to investigate my issue and provide the help I needed!",
  },
  {
    location: "merchantville",
    name: "Megan Kenny",
    rating: 5,
    relativeTime: "6 months ago",
    quote:
      "I've had a really great experience with Dr. Lillee. I originally came in hoping to improve my posture and overall mobility, and the difference has been noticeable. The adjustments are gentle but very effective, and Dr. Lillee always explains what's going on with my spine and alignment. I move better and feel more balanced day to day. The office is clean, the staff is friendly, and appointments are always easy.",
  },
  {
    location: "merchantville",
    name: "Mykal Wells",
    rating: 5,
    relativeTime: "9 months ago",
    quote:
      "I've been dealing with frozen shoulder for almost 3 years now. A dozen PT appointments, 4 separate Dr visits for shots that provided only temporary relief. 2 sessions in Dr. Lillee Chianese and I went from having 40% normal range of motion to about 90%. I went in unable to lift my arm above shoulder height to being able to touch my shoulder blade. It was insane! So glad I did.",
  },
  {
    location: "merchantville",
    name: "Edwin Fisher",
    rating: 5,
    relativeTime: "4 months ago",
    quote:
      "Dr Lilly is amazing! I've had lower and upper back issue for years. I've tried many different options with not too much success. Dr Lilly walked me through the process of how she will be able to tackle the issue in back and I can say I'm on my way to being pain free!",
  },
  {
    location: "merchantville",
    name: "MM C",
    rating: 5,
    relativeTime: "4 months ago",
    quote:
      "Dr. Chris has been extremely helpful in getting to the root of my health issues. He listens, researches and assesses the problems with great knowledge and care. Dr. Chris offered a very detailed, concise plan to get me started and I have quickly seen improvements. I highly recommend Dr. Chris. He will dig until he finds the cause and then set you on a plan for full healing and wellness.",
  },
  {
    location: "chalfont",
    name: "Jennifer Devine",
    rating: 5,
    relativeTime: "recently",
    quote:
      "For years, I've dealt with chronic neck and spine issues, significant muscle scarring, and a rare cold-induced condition that requires extra care during treatment. What sets Marc apart is that he treats the person, not just the pain. His knowledge and technique are exceptional. He combines chiropractic adjustments with Graston, Active Release Technique (ART), soft tissue work, rehabilitation, and other therapies based on what my body actually needs that day. I recommend him without hesitation to anyone dealing with chronic pain, injuries, mobility issues, or simply wanting to function and feel better.",
  },
  {
    location: "chalfont",
    name: "Justin Stottlar",
    rating: 5,
    relativeTime: "recently",
    quote:
      "I was in worse shape than I thought. My PCP told me I was healthy as an ox and the symptoms I was dealing with were age. Just a few weeks into my regimen of functional medical care after meeting with Dr Chris I felt results and it only got better from there. I am 43 and have not felt like I do now since I was a young teen. This is true healthcare!",
  },
  {
    location: "chalfont",
    name: "Jill Ciseck",
    rating: 5,
    relativeTime: "recently",
    quote:
      "The chiropractic care that I receive from Dr. Marc has been an absolute game-changer for me. After being told by a rheumatologist that the arthritis in my hips, and my daily back pain was here to stay, I wanted to give up. Chiropractic care stepped in! Thankful the Lord crossed my path with Dr. Marc because I can now do all of the things I enjoy and not suffer in extreme pain. I would absolutely recommend Dr. Marc.",
  },
  {
    location: "chalfont",
    name: "Edwin Fisher",
    rating: 5,
    relativeTime: "recently",
    quote:
      "Dr Chris is great to work with. He really understands the body. He is very thorough the way he goes about addressing specific health issues. I've recommended him to family and friends.",
  },
  {
    location: "chalfont",
    name: "Robin Downs",
    rating: 5,
    relativeTime: "recently",
    quote:
      "Professional, effective chiropractic treatment. Highly recommend the whole team, and now Dr Chris for functional medicine and not just chiropractic!",
  },
];

export const googleReviewsMetaFallback: Record<LocationKey, LocationMeta> = {
  merchantville: { rating: 5, reviewCount: 47, reviewsUrl: GOOGLE_LOCATIONS.merchantville.reviewsUrl },
  chalfont: { rating: 5, reviewCount: 23, reviewsUrl: GOOGLE_LOCATIONS.chalfont.reviewsUrl },
};
