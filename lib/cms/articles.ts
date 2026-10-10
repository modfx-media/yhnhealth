import { ARTICLES, type Article } from "@/lib/articlesData";
import { isPublishDateLive } from "@/lib/ranked/dates";
import { getPublishedBlogPosts } from "@/lib/ranked/posts";
import { blogPostToArticle } from "@/lib/ranked/to-article";
import type { Post } from "@/payload-types";
import { postToArticle } from "./mapPage";
import { articlePublicPath } from "./paths";
import { getCMS } from "./payload";
import { withCMS } from "./safe";

const SHARED_DEFAULT_IMAGE = "/images/yhn-clone/your-health-now.jpg";

function normalizeKey(value: string | null | undefined): string {
  return (value || "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Local article with the same SEO title or excerpt and a different slug. */
export function canonicalSlugForCmsPost(post: {
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  meta?: { title?: string | null } | null;
}): string | null {
  const slug = post.slug || "";
  const seo = normalizeKey(post.meta?.title);
  const excerpt = normalizeKey(post.excerpt);
  const match = ARTICLES.find((article) => {
    if (article.slug === slug) return false;
    const articleSeo = normalizeKey(article.seoTitle);
    if (seo && articleSeo && seo === articleSeo) return true;
    const articleExcerpt = normalizeKey(article.excerpt);
    return excerpt.length >= 40 && articleExcerpt === excerpt;
  });
  return match?.slug ?? null;
}

export function mergeArticles(fallback: Article[], cms: Article[]): Article[] {
  const bySlug = new Map<string, Article>();
  for (const article of fallback) {
    if (article.slug) bySlug.set(article.slug, article);
  }
  for (const article of cms) {
    if (!article.slug) continue;
    const existing = bySlug.get(article.slug);
    if (existing) {
      const image =
        article.image && article.image !== SHARED_DEFAULT_IMAGE ? article.image : existing.image;
      bySlug.set(article.slug, {
        ...existing,
        ...article,
        image: image || existing.image,
        date: article.date || existing.date,
      });
      continue;
    }
    if (canonicalSlugForCmsPost({ slug: article.slug, title: article.title, excerpt: article.excerpt, meta: { title: article.seoTitle } })) {
      continue;
    }
    bySlug.set(article.slug, article);
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
  return (result.docs as Post[])
    .filter((doc) => isPublishDateLive(doc.publishDate))
    .map((doc) => postToArticle(doc));
}

/** Local articles plus published CMS posts. Same slug: CMS fields win, but a missing CMS image keeps the local file. A CMS copy of a local article is not listed twice. */
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
      select: { slug: true, path: true, meta: true, publishDate: true, title: true, excerpt: true },
    });
    const slugs: string[] = [];
    for (const doc of result.docs as Post[]) {
      if (doc.meta?.noIndex || doc.meta?.excludeFromSitemap) continue;
      if (!isPublishDateLive(doc.publishDate)) continue;
      if (canonicalSlugForCmsPost(doc)) continue;
      const path = articlePublicPath(doc);
      const slug = path?.startsWith("/articles/") ? path.slice("/articles/".length) : null;
      if (slug) slugs.push(slug);
    }
    return slugs;
  }, [] as string[]);
}
