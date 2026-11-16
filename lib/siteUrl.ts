const FALLBACK_SITE_URL = "https://yhnhealth.com";

/**
 * Absolute http(s) URL for metadata, sitemaps, and JSON-LD.
 * `next build` evaluates `new URL(SITE_URL)` while collecting page data.
 * An empty value must not win over the fallback (`??` would keep it), and a
 * host with no scheme is not a valid URL.
 */
export function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim().replace(/\/$/, "") ?? "";
  if (!value) return FALLBACK_SITE_URL;

  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return FALLBACK_SITE_URL;
    if (!url.hostname) return FALLBACK_SITE_URL;
    return candidate === value ? value : url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
