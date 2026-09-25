import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { GOOGLE_LOCATIONS } from "@/lib/reviews";
import { TESTIMONIALS } from "@/lib/siteData";
import TestimonialsSectionClient, { type Testimonial } from "./TestimonialsSectionClient";

export default async function TestimonialsSection() {
  const { reviews, meta } = await getDisplayedGoogleReviews();

  const liveTestimonials: Testimonial[] = reviews.map((r) => ({
    quote: r.quote,
    author: r.name,
    location: GOOGLE_LOCATIONS[r.location].label,
    source: "Google",
    stars: r.rating,
  }));

  const testimonials: Testimonial[] = [
    ...liveTestimonials,
    ...TESTIMONIALS.map((t) => ({ ...t, source: t.source as Testimonial["source"] })),
  ];

  return (
    <TestimonialsSectionClient
      testimonials={testimonials}
      rating={meta.rating}
      reviewCount={meta.reviewCount}
    />
  );
}
