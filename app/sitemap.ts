import type { MetadataRoute } from "next";
import { SITE_PATHS } from "@/lib/navigation";
import { CITIES, SERVICES } from "@/lib/pseoData";
import { getPublishedBlogSlugs } from "@/lib/ranked/posts";
import { SITE_URL } from "@/lib/siteUrl";

const BASE = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-09-02T12:00:00.000Z");
  const core: MetadataRoute.Sitemap = SITE_PATHS.map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }));

  const areasIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/areas-we-serve`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const cityHubs: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${BASE}/areas-we-serve/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const cityServices: MetadataRoute.Sitemap = [];
  for (const c of CITIES) {
    for (const s of SERVICES) {
      cityServices.push({
        url: `${BASE}/areas-we-serve/${c.slug}/${s.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  const slugs = await getPublishedBlogSlugs().catch(() => []);
  const articles: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/articles/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const landingPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/functional-medicine-special-offer`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [...core, ...areasIndex, ...cityHubs, ...cityServices, ...articles, ...landingPages];
}
