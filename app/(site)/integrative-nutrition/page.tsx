import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoData";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import ServicePageBySlug from "@/components/page/ServicePageBySlug";

const PATH = "/integrative-nutrition";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, buildMetadata(PATH));
}

export default function Page() {
  return (
    <CMSRoute path={PATH}>
      <ServicePageBySlug slug="integrative-nutrition" />
    </CMSRoute>
  );
}
