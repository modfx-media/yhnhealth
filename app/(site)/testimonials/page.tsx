import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoData";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { GOOGLE_LOCATIONS } from "@/lib/reviews";
import { REVIEWS, type Review } from "@/lib/testimonialsData";
import TestimonialsClient from "./TestimonialsClient";

const PATH = "/testimonials";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, buildMetadata(PATH));
}

export default async function Page() {
  const { reviews } = await getDisplayedGoogleReviews();

  const liveReviews: Review[] = reviews.map((r) => ({
    text: r.quote,
    author: r.name,
    source: "Google",
    location: GOOGLE_LOCATIONS[r.location].label,
    stars: r.rating,
  }));

  const combined: Review[] = [...liveReviews, ...REVIEWS];

  return (
    <CMSRoute path={PATH}>
      <TestimonialsClient reviews={combined} />
    </CMSRoute>
  );
}
