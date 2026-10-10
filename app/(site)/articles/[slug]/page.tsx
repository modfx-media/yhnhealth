import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getArticleAuthor } from "@/lib/articlesData";
import { canonicalSlugForCmsPost, getPublishedCmsArticleSlugs } from "@/lib/cms/articles";
import { queryRoutedContentByPath } from "@/lib/cms/query";
import { getPublishedBlogPosts, getPublishedBlogSlugs } from "@/lib/ranked/posts";
import { blogPostToArticle, relatedArticlesFor } from "@/lib/ranked/to-article";
import ArticlePostClient from "./ArticlePostClient";
import { SITE_URL } from "@/lib/siteUrl";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/schema";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const [local, cms] = await Promise.all([
    getPublishedBlogSlugs().catch(() => [] as string[]),
    getPublishedCmsArticleSlugs(),
  ]);
  return [...new Set([...local, ...cms])].map((slug) => ({ slug }));
}

function ArticleNotFound() {
  notFound();
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPublishedBlogPosts().catch(() => []);
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    const routed = await queryRoutedContentByPath(`/articles/${slug}`);
    if (routed?.collection === "posts") {
      const canonical = canonicalSlugForCmsPost(routed.doc);
      if (canonical) {
        return {
          alternates: { canonical: `${SITE_URL}/articles/${canonical}` },
          robots: { index: false, follow: true },
        };
      }
    }
    return cmsMetadata(`/articles/${slug}`, {
      title: { absolute: "Article Not Found | Your Health Now" },
      robots: { index: false, follow: true },
    });
  }
  const a = blogPostToArticle(post);
  const title = a.seoTitle ?? a.title;
  const description = a.excerpt;
  const url = `${SITE_URL}/articles/${a.slug}`;
  return cmsMetadata(`/articles/${a.slug}`, {
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
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = `/articles/${slug}`;
  const posts = await getPublishedBlogPosts({ generateForSlug: slug }).catch(() => []);
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    const routed = await queryRoutedContentByPath(path);
    if (routed?.collection === "posts") {
      const canonical = canonicalSlugForCmsPost(routed.doc);
      if (canonical) permanentRedirect(`/articles/${canonical}`);
    }
    return (
      <CMSRoute path={path}>
        <ArticleNotFound />
      </CMSRoute>
    );
  }
  const all = posts.map(blogPostToArticle);
  const article = blogPostToArticle(post);
  const related = relatedArticlesFor(post, all);
  return (
    <CMSRoute path={path}>
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
    </CMSRoute>
  );
}
