const ARTICLE_PREFIX = "/articles/";
const BLOG_PREFIX = "/blog/";

function cleanSlug(value: string | null | undefined): string | null {
  if (!value) return null;
  const slug = value.trim();
  if (!slug || slug.includes("/") || slug === "null" || slug === "undefined") return null;
  return slug;
}

/** Slug from a stored `/articles/<slug>` or legacy `/blog/<slug>` path. */
export function slugFromArticlePath(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith(ARTICLE_PREFIX)) return cleanSlug(path.slice(ARTICLE_PREFIX.length));
  if (path.startsWith(BLOG_PREFIX)) return cleanSlug(path.slice(BLOG_PREFIX.length));
  return null;
}

/** Public article URL. CMS posts always resolve at `/articles/<slug>`. */
export function articlePublicPath(doc: { slug?: string | null; path?: string | null }): string | null {
  const slug = cleanSlug(doc.slug) || slugFromArticlePath(doc.path);
  if (!slug) return null;
  return `${ARTICLE_PREFIX}${slug}`;
}

/** Rewrite a legacy `/blog/<slug>` path onto `/articles/<slug>` when an editor saves. */
export function normalizeArticlePath(data: { slug?: unknown; path?: unknown }): void {
  if (typeof data.path === "string" && data.path.startsWith(BLOG_PREFIX)) {
    const slug = cleanSlug(data.path.slice(BLOG_PREFIX.length));
    if (slug) data.path = `${ARTICLE_PREFIX}${slug}`;
  }
  if ((!data.path || data.path === "") && typeof data.slug === "string") {
    const slug = cleanSlug(data.slug);
    if (slug) data.path = `${ARTICLE_PREFIX}${slug}`;
  }
}
