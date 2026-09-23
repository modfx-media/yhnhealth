import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoData";
import { getPublishedBlogPosts } from "@/lib/ranked/posts";
import { blogPostToArticle } from "@/lib/ranked/to-article";
import ArticlesClient from "./ArticlesClient";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

export const revalidate = 3600;

const PATH = "/articles";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, buildMetadata(PATH));
}

export default async function Page() {
  const posts = await getPublishedBlogPosts();
  const articles = posts.map(blogPostToArticle);
  return (
    <CMSRoute path={PATH}>
      <ArticlesClient articles={articles} />
    </CMSRoute>
  );
}
