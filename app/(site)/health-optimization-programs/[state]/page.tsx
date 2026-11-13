import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PUBLISHED_STATE_PAGES, STATE_BY_SLUG } from "@/content/states";
import HealthOptimizationStatePage from "@/components/page/HealthOptimizationStatePage";
import JsonLd from "@/components/JsonLd";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { hoStateJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/siteUrl";

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_STATE_PAGES.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = STATE_BY_SLUG[slug];
  if (!state) return {};
  const canonical = `${SITE_URL}/health-optimization-programs/${state.slug}`;
  return cmsMetadata(`/health-optimization-programs/${state.slug}`, {
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

export default async function HealthOptimizationStateRoute({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = STATE_BY_SLUG[slug];
  if (!state) notFound();
  const path = `/health-optimization-programs/${state.slug}`;
  return (
    <CMSRoute path={path}>
      <JsonLd data={hoStateJsonLd(state)} />
      <HealthOptimizationStatePage state={state} />
    </CMSRoute>
  );
}
