/** Public image URL from a populated Media doc. Local `/media` paths 404 on Vercel. */
export function mediaUrl(image: unknown): string | undefined {
  if (!image || typeof image !== "object" || !("url" in image)) return undefined;
  return publicImageSrc(typeof image.url === "string" ? image.url : undefined);
}

/** Keep designed `/images` paths and remote Blob URLs. Drop ephemeral `/media` uploads. */
export function publicImageSrc(src: string | null | undefined): string | undefined {
  if (!src) return undefined;
  const trimmed = src.trim();
  if (!trimmed || trimmed.startsWith("/media/") || trimmed.startsWith("media/")) return undefined;
  return trimmed;
}
