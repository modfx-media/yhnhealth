import { buildMetadata } from "@/lib/seoData";
import { getPublishedBlogPosts } from "@/lib/ranked/posts";
import { blogPostToArticle } from "@/lib/ranked/to-article";
import ArticlesClient from "./ArticlesClient";

export const revalidate = 3600;

export const metadata = buildMetadata("/articles");

export default async function Page() {
  const posts = await getPublishedBlogPosts();
  const articles = posts.map(blogPostToArticle);
  return <ArticlesClient articles={articles} />;
}
