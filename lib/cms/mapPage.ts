import type { ServiceConfig } from "@/components/page/ServicePage";
import type { ModuleConfig } from "@/lib/moduleContent";
import { SERVICE_CONTENT } from "@/lib/serviceContent";
import { MODULES } from "@/lib/moduleContent";
import { CITY_BY_SLUG, SERVICE_BY_SLUG } from "@/lib/pseoData";
import type { Article, ArticleBlock, ArticleCategory } from "@/lib/articlesData";
import type { Page, Post } from "@/payload-types";
import { iconFromName } from "./icons";

export function pageToServiceConfig(doc: Page): ServiceConfig | null {
  const slug = doc.slug || doc.path?.replace(/^\//, "") || "";
  const fallback = SERVICE_CONTENT[slug];
  if (!doc.title && !fallback) return fallback ?? null;

  const sections =
    doc.sections?.filter((section) => section.body).map((section) => ({
      heading: section.heading || undefined,
      body: section.body || "",
    })) ?? fallback?.sections ?? [];

  return {
    slug: slug || fallback?.slug || "service",
    title: doc.title || fallback?.title || "Service",
    eyebrow: doc.eyebrow || fallback?.eyebrow,
    intro: doc.intro || fallback?.intro || "",
    imageSrc: doc.imageSrc || fallback?.imageSrc || "/images/yhn-clone/your-health-now.jpg",
    imageAlt: doc.imageAlt || fallback?.imageAlt || doc.title || "Service",
    sections: sections.length ? sections : fallback?.sections ?? [],
    benefits:
      doc.benefitItems?.length
        ? {
            eyebrow: doc.benefitsEyebrow || fallback?.benefits?.eyebrow,
            title: doc.benefitsTitle || fallback?.benefits?.title || "",
            items: doc.benefitItems.map((item) => ({
              icon: iconFromName(item.icon),
              title: item.title,
              body: item.body || undefined,
            })),
          }
        : fallback?.benefits,
    related:
      doc.related?.filter((item) => item.slug && item.label).map((item) => ({
        slug: item.slug as string,
        label: item.label as string,
      })) ?? fallback?.related ?? [],
  };
}

export function pageToModuleConfig(doc: Page): ModuleConfig | null {
  const slug = doc.slug || doc.path?.replace(/^\//, "") || "";
  const fallback = MODULES[slug];
  return {
    slug: slug || fallback?.slug || "module-1",
    number: doc.moduleNumber || fallback?.number || "",
    title: doc.title || fallback?.title || "Module",
    subtitle: doc.subtitle || fallback?.subtitle || "",
    overview: doc.intro || fallback?.overview || "",
    outcomes: doc.outcomes?.map((item) => item.text).filter(Boolean) ?? fallback?.outcomes ?? [],
    imageSrc: doc.imageSrc || fallback?.imageSrc || "/images/modules/module-1.webp",
  };
}

export function pageCityService(doc: Page) {
  const citySlug = doc.citySlug || doc.path?.split("/")[2] || "";
  const serviceSlug = doc.serviceSlug || doc.path?.split("/")[3] || "";
  return {
    city: CITY_BY_SLUG[citySlug],
    service: serviceSlug ? SERVICE_BY_SLUG[serviceSlug] : undefined,
  };
}

function htmlToBlocks(html: string): ArticleBlock[] {
  const stripped = html
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<h2[^>]*>/gi, "\n## ")
    .replace(/<\/h2>/gi, "\n")
    .replace(/<h3[^>]*>/gi, "\n### ")
    .replace(/<\/h3>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
  const blocks: ArticleBlock[] = [];
  for (const part of stripped.split(/\n{2,}/)) {
    const text = part.trim();
    if (!text) continue;
    if (text.startsWith("## ")) blocks.push({ type: "h2", text: text.slice(3) });
    else if (text.startsWith("### ")) blocks.push({ type: "h3", text: text.slice(4) });
    else blocks.push({ type: "p", text });
  }
  return blocks;
}

export function postToArticle(doc: Post): Article {
  const slug = doc.slug || doc.path?.replace("/articles/", "") || "article";
  const body: ArticleBlock[] = [];
  if (doc.intro) body.push({ type: "p", text: doc.intro });
  if (doc.sections?.length) {
    for (const section of doc.sections) {
      if (section.heading) body.push({ type: "h2", text: section.heading });
      if (section.body) {
        for (const para of section.body.split("\n\n")) {
          if (para.trim()) body.push({ type: "p", text: para.trim() });
        }
      }
    }
  } else if (doc.bodyHtml) {
    body.push(...htmlToBlocks(doc.bodyHtml));
  }

  const date = doc.publishDate
    ? new Date(doc.publishDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

  return {
    slug,
    title: doc.h1 || doc.title,
    seoTitle: doc.meta?.title || doc.title,
    excerpt: doc.excerpt || doc.intro || "",
    category: (doc.category as ArticleCategory) || "Health & Wellness",
    date,
    readTime: Math.max(3, Math.round(body.reduce((n, block) => n + ("text" in block ? block.text.split(/\s+/).length : 0), 0) / 220)),
    image: doc.imageSrc || "/images/yhn-clone/your-health-now.jpg",
    imageAlt: doc.imageAlt || doc.title,
    body,
    related: doc.related?.map((item) => item.slug).filter((slug): slug is string => Boolean(slug)),
    author: doc.author || undefined,
  };
}
