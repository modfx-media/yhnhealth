import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoData";
import { getArticlesForIndex } from "@/lib/cms/articles";
import ArticlesClient from "./ArticlesClient";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

export const revalidate = 3600;

const PATH = "/articles";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, buildMetadata(PATH));
}

export default async function Page() {
  const articles = await getArticlesForIndex();
  return (
    <CMSRoute path={PATH}>
      <ArticlesClient articles={articles} />
    </CMSRoute>
  );
}
