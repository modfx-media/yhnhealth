export function previewFromPath(path?: string | null): string | null {
  if (!path) return null;
  if (!path.startsWith("/")) return null;
  const segments = path.split("/");
  if (segments.some((segment) => segment === "null" || segment === "undefined")) {
    return null;
  }
  if (path !== "/" && path.endsWith("/")) return null;
  if (path !== "/" && segments.slice(1).some((segment) => segment.length === 0)) {
    return null;
  }

  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;

  const params = new URLSearchParams({
    path,
    previewSecret: secret,
  });
  return `/next/preview?${params.toString()}`;
}

export function isValidPublicPath(path: string): boolean {
  return previewFromPath(path) !== null || (path === "/" && Boolean(process.env.PREVIEW_SECRET));
}
