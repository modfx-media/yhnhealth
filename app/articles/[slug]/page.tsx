import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleAuthor } from "@/lib/articlesData";
import { getPublishedBlogPosts, getPublishedBlogSlugs } from "@/lib/ranked/posts";
import { blogPostToArticle, relatedArticlesFor } from "@/lib/ranked/to-article";
import ArticlePostClient from "./ArticlePostClient";
import { SITE_URL } from "@/lib/siteUrl";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/schema";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPublishedBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found | Your Health Now" };
  const a = blogPostToArticle(post);
  const title = a.title;
  const description = a.excerpt;
  const url = `${SITE_URL}/articles/${a.slug}`;
  return {
    title: { absolute: `${title} | Your Health Now` },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: a.image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [a.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPublishedBlogPosts({ generateForSlug: slug });
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const all = posts.map(blogPostToArticle);
  const article = blogPostToArticle(post);
  const related = relatedArticlesFor(post, all);
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `${SITE_URL}/articles/${article.slug}`,
          image: article.image,
          datePublished: post.publishDate,
          author: getArticleAuthor(article),
        })}
      />
      <ArticlePostClient article={article} related={related} />
    </>
  );
}
