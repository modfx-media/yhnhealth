import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TELEHEALTH_STATES, TELEHEALTH_STATE_BY_SLUG } from "@/data/telehealth-states";
import StateTelehealthPage, { STATE_PAGE_REVIEWED_DATE } from "@/components/page/StateTelehealthPage";
import { SITE_URL } from "@/lib/siteUrl";
import JsonLd from "@/components/JsonLd";
import { stateTelehealthJsonLd } from "@/lib/schema";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return TELEHEALTH_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ state: string }> }
): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = TELEHEALTH_STATE_BY_SLUG[stateSlug];
  if (!state) return {};
  const canonical = `${SITE_URL}/functional-medicine/${state.slug}`;
  return cmsMetadata(`/functional-medicine/${state.slug}`, {
    title: { absolute: state.title },
    description: state.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: state.title,
      description: state.metaDescription,
      url: canonical,
      type: "website",
      images: [{ url: "/images/yhn-clone/hero-telehealth.webp", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: state.title, description: state.metaDescription },
  });
}

export default async function StateTelehealthRoute(
  { params }: { params: Promise<{ state: string }> }
) {
  const { state: stateSlug } = await params;
  const state = TELEHEALTH_STATE_BY_SLUG[stateSlug];
  if (!state) notFound();
  const path = `/functional-medicine/${state.slug}`;
  return (
    <CMSRoute path={path}>
      <JsonLd data={stateTelehealthJsonLd(state, STATE_PAGE_REVIEWED_DATE)} />
      <StateTelehealthPage state={state} />
    </CMSRoute>
  );
}
