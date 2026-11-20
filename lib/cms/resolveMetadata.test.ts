import assert from "node:assert/strict";
import test from "node:test";
import type { Metadata } from "next";
import { TELEHEALTH_STATE_BY_SLUG } from "@/data/telehealth-states";
import { buildMetadata } from "@/lib/seoData";
import { SITE_URL } from "@/lib/siteUrl";
import { mediaUrl, publicImageSrc } from "./mediaUrl";
import { resolveCmsMetadata, type CmsMetadataSource } from "./resolveMetadata";

const DEFAULT_OG = "/images/yhn-clone/your-health-now.jpg";

/** Previous resolver: appends " | Your Health Now" when the chosen title has no pipe. */
function legacyResolve(doc: CmsMetadataSource | null | undefined, fallback: Metadata, path: string): Metadata {
  if (!doc) return fallback;
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

const homeFallback: Metadata = {
  title: {
    absolute: "Chiropractor in Chalfont, PA & Merchantville, NJ | Your Health Now",
  },
  description:
    "Your Health Now is a chiropractic and functional medicine clinic in Chalfont, PA and Merchantville, NJ. Doctor-led care for back pain, neck pain, sciatica, and root-cause health. Same-week appointments.",
  keywords: ["chiropractor chalfont pa", "chiropractor merchantville nj"],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Chiropractor in Chalfont, PA & Merchantville, NJ | Your Health Now",
    description: "Chiropractic and functional medicine under one roof in Chalfont, PA and Merchantville, NJ. Book a visit.",
    url: `${SITE_URL}/`,
    type: "website",
    siteName: "Your Health Now",
    images: [{ url: "/images/yhn-clone/your-health-now.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chiropractor in Chalfont, PA & Merchantville, NJ | Your Health Now",
    description: "Doctor-led chiropractic and functional medicine in Chalfont, PA and Merchantville, NJ.",
    images: ["/images/yhn-clone/your-health-now.jpg"],
  },
  robots: { index: true, follow: true },
};

const nj = TELEHEALTH_STATE_BY_SLUG["new-jersey"];
const locationCanonical = `${SITE_URL}/functional-medicine/${nj.slug}`;
const locationFallback: Metadata = {
  title: { absolute: nj.title },
  description: nj.metaDescription,
  alternates: { canonical: locationCanonical },
  openGraph: {
    title: nj.title,
    description: nj.metaDescription,
    url: locationCanonical,
    type: "website",
    images: [{ url: "/images/yhn-clone/hero-telehealth.webp", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: nj.title, description: nj.metaDescription },
};

const postTitle = "Reclaim Your Energy This Fall in Haverford, PA";
const postExcerpt = "An integrative medicine doctor looks at the whole picture.";
const postCanonical = `${SITE_URL}/articles/reclaim-your-energy`;
const blogFallback: Metadata = {
  title: { absolute: `${postTitle} | Your Health Now` },
  description: postExcerpt,
  alternates: { canonical: postCanonical },
  openGraph: {
    title: postTitle,
    description: postExcerpt,
    url: postCanonical,
    type: "article",
    images: [{ url: "/images/articles/example.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: postTitle,
    description: postExcerpt,
    images: ["/images/articles/example.jpg"],
  },
};

const pages: Array<{ name: string; path: string; fallback: Metadata; docTitle: string }> = [
  { name: "home", path: "/", fallback: homeFallback, docTitle: "Home" },
  { name: "normal page", path: "/about-us", fallback: buildMetadata("/about-us"), docTitle: "About Us" },
  {
    name: "location page",
    path: `/functional-medicine/${nj.slug}`,
    fallback: locationFallback,
    docTitle: "Functional Medicine in New Jersey",
  },
  {
    name: "blog post",
    path: "/articles/reclaim-your-energy",
    fallback: blogFallback,
    docTitle: postTitle,
  },
];

function absoluteTitle(title: Metadata["title"]): string | undefined {
  if (!title) return undefined;
  if (typeof title === "string") return title;
  if ("absolute" in title && typeof title.absolute === "string") return title.absolute;
  return undefined;
}

function socialTitle(metadata: Metadata, key: "openGraph" | "twitter"): string | undefined {
  const block = metadata[key];
  if (!block || typeof block !== "object" || !("title" in block)) return undefined;
  const title = block.title;
  return typeof title === "string" ? title : undefined;
}

function socialDescription(metadata: Metadata, key: "openGraph" | "twitter"): string | undefined {
  const block = metadata[key];
  if (!block || typeof block !== "object" || !("description" in block)) return undefined;
  const description = block.description;
  return typeof description === "string" ? description : undefined;
}

for (const page of pages) {
  test(`${page.name}: no published doc keeps the fallback object`, () => {
    assert.equal(resolveCmsMetadata(null, page.fallback, page.path), page.fallback);
    assert.equal(resolveCmsMetadata(undefined, page.fallback, page.path), page.fallback);
  });

  test(`${page.name}: empty CMS title and description stay byte-identical to the current fallback`, () => {
    const doc: CmsMetadataSource = {
      title: page.docTitle,
      excerpt: "Doc excerpt that must not replace an empty SEO description when we compare the suffix path.",
      intro: "Doc intro",
      imageSrc: "/images/yhn-clone/your-health-now.jpg",
      meta: { title: "", description: null, canonicalUrl: "", noIndex: false, noFollow: false },
    };
    const next = resolveCmsMetadata(doc, page.fallback, page.path);
    const previous = legacyResolve(doc, page.fallback, page.path);
    assert.deepEqual(next, previous);
    assert.equal(absoluteTitle(next.title), `${page.docTitle} | Your Health Now`);
    assert.equal(socialTitle(next, "openGraph"), page.docTitle);
    assert.equal(socialTitle(next, "twitter"), page.docTitle);
  });

  test(`${page.name}: published doc with no title or description returns the page fallback`, () => {
    const doc: CmsMetadataSource = { meta: { title: "", description: "" } };
    assert.equal(resolveCmsMetadata(doc, page.fallback, page.path), page.fallback);
  });

  test(`${page.name}: CMS title without a pipe is the absolute title and social title`, () => {
    const cmsTitle = "Our Story";
    const cmsDescription = "Drug-free pain relief, written by the editor, with no length clamp applied to this sentence.";
    const doc: CmsMetadataSource = {
      title: page.docTitle,
      excerpt: "This excerpt must not replace the CMS description.",
      intro: "This intro must not replace the CMS description.",
      meta: {
        title: cmsTitle,
        description: cmsDescription,
        canonicalUrl: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
      },
    };
    const next = resolveCmsMetadata(doc, page.fallback, page.path);
    const previous = legacyResolve(doc, page.fallback, page.path);

    assert.equal(absoluteTitle(next.title), cmsTitle);
    assert.equal(socialTitle(next, "openGraph"), cmsTitle);
    assert.equal(socialTitle(next, "twitter"), cmsTitle);
    assert.equal(next.description, cmsDescription);
    assert.equal(socialDescription(next, "openGraph"), cmsDescription);
    assert.equal(socialDescription(next, "twitter"), cmsDescription);
    assert.notEqual(absoluteTitle(previous.title), cmsTitle);
    assert.equal(absoluteTitle(previous.title), `${cmsTitle} | Your Health Now`);
    assert.deepEqual({ ...next, title: previous.title }, previous);
  });
}

test("CMS title that already contains a pipe is unchanged", () => {
  const cmsTitle = "Our Story | Drug-Free Pain Relief in Saint Louis Park";
  const doc: CmsMetadataSource = {
    title: "Our Story",
    meta: { title: cmsTitle, description: "A description that already matches the editor." },
  };
  const fallback = buildMetadata("/about-us");
  assert.deepEqual(resolveCmsMetadata(doc, fallback, "/about-us"), legacyResolve(doc, fallback, "/about-us"));
  assert.equal(absoluteTitle(resolveCmsMetadata(doc, fallback, "/about-us").title), cmsTitle);
});

test("CMS description is verbatim when the title is empty", () => {
  const description = "x".repeat(400);
  const doc: CmsMetadataSource = {
    title: "Locations",
    excerpt: "Short excerpt",
    meta: { title: "", description },
  };
  const fallback = buildMetadata("/locations");
  const next = resolveCmsMetadata(doc, fallback, "/locations");
  const previous = legacyResolve(doc, fallback, "/locations");
  assert.deepEqual(next, previous);
  assert.equal(next.description, description);
  assert.equal(socialDescription(next, "openGraph"), description);
  assert.equal(socialDescription(next, "twitter"), description);
  assert.equal(absoluteTitle(next.title), "Locations | Your Health Now");
});

test("empty CMS description keeps the excerpt, then the page fallback", () => {
  const fallback = buildMetadata("/contact-us");
  const withExcerpt: CmsMetadataSource = {
    title: "Contact",
    excerpt: "Call the Merchantville or Chalfont clinic.",
    intro: "Intro should lose to the excerpt.",
    meta: { description: "" },
  };
  const excerptResult = resolveCmsMetadata(withExcerpt, fallback, "/contact-us");
  assert.deepEqual(excerptResult, legacyResolve(withExcerpt, fallback, "/contact-us"));
  assert.equal(excerptResult.description, "Call the Merchantville or Chalfont clinic.");

  const withIntro: CmsMetadataSource = {
    title: "Contact",
    intro: "Intro used when excerpt is missing.",
    meta: {},
  };
  const introResult = resolveCmsMetadata(withIntro, fallback, "/contact-us");
  assert.deepEqual(introResult, legacyResolve(withIntro, fallback, "/contact-us"));
  assert.equal(introResult.description, "Intro used when excerpt is missing.");

  const titleOnly: CmsMetadataSource = { title: "Contact", meta: {} };
  const titleResult = resolveCmsMetadata(titleOnly, fallback, "/contact-us");
  assert.deepEqual(titleResult, legacyResolve(titleOnly, fallback, "/contact-us"));
  assert.equal(titleResult.description, fallback.description);
});
