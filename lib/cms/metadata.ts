import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import { mediaUrl, publicImageSrc } from "./mediaUrl";
import { queryRoutedContentByPath } from "./query";

const DEFAULT_OG = "/images/yhn-clone/your-health-now.jpg";

export async function cmsMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  const routed = await queryRoutedContentByPath(path);
  if (!routed) return fallback;

  const doc = routed.doc;
  const meta = "meta" in doc ? doc.meta : undefined;
  const title =
    (meta && typeof meta === "object" && "title" in meta && typeof meta.title === "string" && meta.title) ||
    ("title" in doc && typeof doc.title === "string" ? doc.title : undefined);
  const description =
    (meta && typeof meta === "object" && "description" in meta && typeof meta.description === "string" && meta.description) ||
    ("excerpt" in doc && typeof doc.excerpt === "string" ? doc.excerpt : undefined) ||
    ("intro" in doc && typeof doc.intro === "string" ? doc.intro : undefined);

  const canonical =
    (meta && typeof meta === "object" && "canonicalUrl" in meta && typeof meta.canonicalUrl === "string" && meta.canonicalUrl) ||
    `${SITE_URL}${path === "/" ? "" : path}`;

  const noIndex = Boolean(meta && typeof meta === "object" && "noIndex" in meta && meta.noIndex);
  const noFollow = Boolean(meta && typeof meta === "object" && "noFollow" in meta && meta.noFollow);
  const image =
    ("featuredImage" in doc ? mediaUrl(doc.featuredImage) : undefined) ||
    mediaUrl(meta && typeof meta === "object" && "image" in meta ? meta.image : undefined) ||
    ("imageSrc" in doc ? publicImageSrc(typeof doc.imageSrc === "string" ? doc.imageSrc : undefined) : undefined) ||
    DEFAULT_OG;

  if (!title && !description) return fallback;

  return {
    ...fallback,
    title: title ? { absolute: title.includes("|") ? title : `${title} | Your Health Now` } : fallback.title,
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
