import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoData";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import ModulePageBySlug from "@/components/page/ModulePageBySlug";

const PATH = "/module-5";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, buildMetadata(PATH));
}

export default function Page() {
  return (
    <CMSRoute path={PATH}>
      <ModulePageBySlug slug="module-5" />
    </CMSRoute>
  );
}
