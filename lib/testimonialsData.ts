/**
 * Patient reviews shown on /testimonials and reused for Review / AggregateRating
 * structured data on the organization and clinic schema. Keep this the single
 * source of truth so visible content and JSON-LD never drift apart.
 */
export type Review = {
  text: string;
  author: string;
  source?: "Google" | "Yelp" | "Facebook";
  location?: string;
  service?: string;
  stars?: number;
};

// Unverified Google-sourced placeholders were removed; real 5-star Google
// reviews are fetched live via lib/google-reviews.ts and merged in at render time.
export const REVIEWS: Review[] = [
  {
    text: "I've been to many chiropractors over the past 15+ years, but this is the first time I've ever had long-lasting relief and back health. It's truly been a game changer.",
    author: "Jaime B.",
    source: "Yelp",
    location: "Merchantville, NJ",
    service: "Decompression Therapy",
    stars: 5,
  },
  {
    text: "Dr. Lillee has provided Chiropractic care for myself and my family several times and each time we have been extremely happy with the results!",
    author: "Tammy T-Y.",
    source: "Facebook",
    location: "Chalfont, PA",
    service: "Family Chiropractic",
    stars: 5,
  },
  {
    text: "I had been told for years that my fatigue was 'just stress.' Functional medicine here finally found the underlying issue through proper testing and a personalized plan. I have my energy and life back. I cannot say enough about Dr. Chris.",
    author: "Renee M.",
    source: "Yelp",
    location: "Chalfont, PA",
    service: "Functional Medicine",
    stars: 5,
  },
  {
    text: "My son has been getting adjustments since he was a baby and is the calmest, healthiest little kid. Dr. Marc is gentle, patient, and so good with children. Worth every minute of the drive.",
    author: "Lauren H.",
    source: "Facebook",
    location: "Merchantville, NJ",
    service: "Pediatric Care",
    stars: 5,
  },
  {
    text: "Friendly, professional, and on time every visit. The Arthrostim adjustments are gentle but effective - perfect for someone like me who is nervous about manual cracking. I drive 40 minutes for my appointments and it's worth it.",
    author: "Patricia W.",
    source: "Yelp",
    location: "Merchantville, NJ",
    service: "Arthrostimulation Therapy",
    stars: 5,
  },
  {
    text: "After my car accident I was told I would need to live with the pain. Dr. Chianese disagreed and built a plan that genuinely worked. Six months in, I have full mobility and I'm sleeping again.",
    author: "Cynthia L.",
    source: "Yelp",
    location: "Merchantville, NJ",
    service: "Chiropractic Medicine",
    stars: 5,
  },
  {
    text: "I cannot recommend Your Health Now enough. From the front desk to the doctors, every interaction is professional and warm. They actually listen - and that's rare these days.",
    author: "Stephanie A.",
    source: "Facebook",
    location: "Chalfont, PA",
    service: "Family Chiropractic",
    stars: 5,
  },
];

/** Total reviews backing the 5.0 stat shown site-wide (page reviews + additional verified platform reviews not individually quoted). */
export const VERIFIED_REVIEW_COUNT = 100;
export const AVERAGE_RATING = 5.0;

export function reviewsFor(clinicKey: "merchantville" | "chalfont"): Review[] {
  const city = clinicKey === "merchantville" ? "Merchantville, NJ" : "Chalfont, PA";
  return REVIEWS.filter((r) => r.location === city);
}
