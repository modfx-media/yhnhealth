import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import { mediaUrl, publicImageSrc } from "./mediaUrl";

const DEFAULT_OG = "/images/yhn-clone/your-health-now.jpg";

/** Fields read from a published page or post when resolving head tags. */
export type CmsMetadataSource = {
  title?: string | null;
  excerpt?: string | null;
  intro?: string | null;
  featuredImage?: unknown;
  imageSrc?: unknown;
  meta?: {
    title?: string | null;
    description?: string | null;
    canonicalUrl?: string | null;
    noIndex?: boolean | null;
    noFollow?: boolean | null;
    image?: unknown;
  } | null;
};

function metaText(
  meta: CmsMetadataSource["meta"],
  key: "title" | "description" | "canonicalUrl",
): string | undefined {
  if (!meta || typeof meta !== "object" || !(key in meta)) return undefined;
  const value = meta[key];
  return typeof value === "string" && value ? value : undefined;
}

/**
 * Resolve head tags for a published CMS document.
 * A set `meta.title` / `meta.description` is used verbatim.
 * When those fields are empty, document titles keep the existing
 * doc-title brand suffix and page fallbacks.
 */
export function resolveCmsMetadata(
  doc: CmsMetadataSource | null | undefined,
  fallback: Metadata,
  path: string,
): Metadata {
  if (!doc) return fallback;

  const meta = "meta" in doc ? doc.meta : undefined;
  const metaTitle = metaText(meta, "title");
  const metaDescription = metaText(meta, "description");
  const title =
    metaTitle || ("title" in doc && typeof doc.title === "string" ? doc.title : undefined);
  const description =
    metaDescription ||
    ("excerpt" in doc && typeof doc.excerpt === "string" ? doc.excerpt : undefined) ||
    ("intro" in doc && typeof doc.intro === "string" ? doc.intro : undefined);

  const canonical = metaText(meta, "canonicalUrl") || `${SITE_URL}${path === "/" ? "" : path}`;

  const noIndex = Boolean(meta && typeof meta === "object" && "noIndex" in meta && meta.noIndex);
  const noFollow = Boolean(meta && typeof meta === "object" && "noFollow" in meta && meta.noFollow);
  const image =
    ("featuredImage" in doc ? mediaUrl(doc.featuredImage) : undefined) ||
    mediaUrl(meta && typeof meta === "object" && "image" in meta ? meta.image : undefined) ||
    ("imageSrc" in doc ? publicImageSrc(typeof doc.imageSrc === "string" ? doc.imageSrc : undefined) : undefined) ||
    DEFAULT_OG;

  if (!title && !description) return fallback;

  // SEO meta.title is the absolute document title. doc.title still gets the
  // historical brand suffix when the editor left meta.title empty.
  const documentTitle = metaTitle
    ? metaTitle
    : title
      ? title.includes("|")
        ? title
        : `${title} | Your Health Now`
      : undefined;

  return {
    ...fallback,
    title: documentTitle ? { absolute: documentTitle } : fallback.title,
    description: description || fallback.description,
    alternates: { canonical },
    robots: { index: !noIndex, follow: !noFollow },
    openGraph: {
      ...(typeof fallback.openGraph === "object" ? fallback.openGraph : {}),
      title: title || undefined,
      description: description || undefined,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || undefined,
      description: description || undefined,
      images: [image],
    },
  };
}
