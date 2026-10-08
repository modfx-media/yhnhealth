import type { Article } from "@/lib/articlesData";
import { getPublishedBlogPosts } from "@/lib/ranked/posts";
import { blogPostToArticle } from "@/lib/ranked/to-article";
import type { Post } from "@/payload-types";
import { postToArticle } from "./mapPage";
import { articlePublicPath } from "./paths";
import { getCMS } from "./payload";
import { withCMS } from "./safe";

export function mergeArticles(fallback: Article[], cms: Article[]): Article[] {
  const bySlug = new Map<string, Article>();
  for (const article of fallback) {
    if (article.slug) bySlug.set(article.slug, article);
  }
  for (const article of cms) {
    if (article.slug) bySlug.set(article.slug, article);
  }
  return [...bySlug.values()].sort((a, b) => {
    const left = Date.parse(a.date);
    const right = Date.parse(b.date);
    return (Number.isNaN(right) ? 0 : right) - (Number.isNaN(left) ? 0 : left);
  });
}

async function publishedCmsArticles(): Promise<Article[]> {
  const payload = await getCMS();
  const result = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishDate",
    limit: 1000,
    depth: 2,
    draft: false,
    overrideAccess: false,
    pagination: false,
  });
  return (result.docs as Post[]).map((doc) => postToArticle(doc));
}

/** Hardcoded articles, plus published CMS posts, deduped by slug. CMS wins. */
export async function getArticlesForIndex(): Promise<Article[]> {
  const fallback = (await getPublishedBlogPosts().catch(() => [])).map(blogPostToArticle);
  return withCMS(() => publishedCmsArticles().then((cms) => mergeArticles(fallback, cms)), fallback);
}

export async function getPublishedCmsArticleSlugs(): Promise<string[]> {
  return withCMS(async () => {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      limit: 1000,
      depth: 0,
      draft: false,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, path: true, meta: true },
    });
    const slugs: string[] = [];
    for (const doc of result.docs as Post[]) {
      if (doc.meta?.noIndex || doc.meta?.excludeFromSitemap) continue;
      const path = articlePublicPath(doc);
      const slug = path?.startsWith("/articles/") ? path.slice("/articles/".length) : null;
      if (slug) slugs.push(slug);
    }
    return slugs;
  }, [] as string[]);
}
