import type { Metadata } from "next";
import { PUBLISHED_STATE_PAGES } from "@/content/states";
import hub from "@/content/states/hub";
import StatesHubPage from "@/components/page/StatesHubPage";
import JsonLd from "@/components/JsonLd";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { hoHubJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/siteUrl";

const PATH = "/states";

export async function generateMetadata(): Promise<Metadata> {
  const canonical = `${SITE_URL}${PATH}`;
  return cmsMetadata(PATH, {
    title: { absolute: hub.title },
    description: hub.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: hub.title,
      description: hub.metaDescription,
      url: canonical,
      type: "website",
      images: [{ url: "/images/yhn-clone/hero-telehealth.webp", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: hub.title, description: hub.metaDescription },
  });
}

export default function StatesIndexPage() {
  const live = PUBLISHED_STATE_PAGES.map((state) => ({
    slug: state.slug,
    name: state.name,
    href: `/health-optimization-programs/${state.slug}`,
  }));
  return (
    <CMSRoute path={PATH}>
      <JsonLd data={hoHubJsonLd(hub, live)} />
      <StatesHubPage hub={hub} live={live} />
    </CMSRoute>
  );
}
