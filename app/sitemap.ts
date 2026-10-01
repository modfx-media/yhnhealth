import type { MetadataRoute } from "next";
import { SITE_PATHS } from "@/lib/navigation";
import { TELEHEALTH_STATES } from "@/data/telehealth-states";
import { getPublishedBlogSlugs } from "@/lib/ranked/posts";
import { SITE_URL } from "@/lib/siteUrl";
import { queryPublishedPagesForSitemap, queryPublishedPostsForSitemap } from "@/lib/cms/query";

const BASE = SITE_URL;

function cmsSkip(meta?: { noIndex?: boolean | null; excludeFromSitemap?: boolean | null } | null) {
  return Boolean(meta?.noIndex || meta?.excludeFromSitemap);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-09-02T12:00:00.000Z");
  const [cmsPages, cmsPosts] = await Promise.all([
    queryPublishedPagesForSitemap(),
    queryPublishedPostsForSitemap(),
  ]);

  const skip = new Set<string>();
  const cmsDates = new Map<string, Date>();
  for (const page of cmsPages) {
    if (!page.path) continue;
    if (cmsSkip(page.meta)) skip.add(page.path);
    const stamp = page.sourceUpdatedAt || page.updatedAt;
    if (stamp) cmsDates.set(page.path, new Date(stamp));
  }
  for (const post of cmsPosts) {
    if (!post.path) continue;
    if (cmsSkip(post.meta)) skip.add(post.path);
    if (post.updatedAt) cmsDates.set(post.path, new Date(post.updatedAt));
  }

  const entry = (path: string, extras: Omit<MetadataRoute.Sitemap[number], "url">) => {
    if (skip.has(path)) return null;
    return {
      url: `${BASE}${path === "/" ? "" : path}`,
      lastModified: cmsDates.get(path) || extras.lastModified,
      changeFrequency: extras.changeFrequency,
      priority: extras.priority,
    };
  };

  const core = SITE_PATHS.map((path) =>
    entry(path, {
      lastModified,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1.0 : 0.7,
    }),
  ).filter(Boolean) as MetadataRoute.Sitemap;

  const telehealthStates = TELEHEALTH_STATES.map((s) =>
    entry(`/functional-medicine/${s.slug}`, { lastModified, changeFrequency: "monthly", priority: 0.7 }),
  ).filter(Boolean) as MetadataRoute.Sitemap;

  const slugs = await getPublishedBlogSlugs().catch(() => []);
  const articles = slugs
    .map((slug) =>
      entry(`/articles/${slug}`, { lastModified, changeFrequency: "weekly", priority: 0.6 }),
    )
    .filter(Boolean) as MetadataRoute.Sitemap;

  const landingPages = [
    entry("/functional-medicine-special-offer", {
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  ].filter(Boolean) as MetadataRoute.Sitemap;

  return [...core, ...telehealthStates, ...articles, ...landingPages];
}
