const APEX = "https://yhnhealth.com";
const WWW = "https://www.yhnhealth.com";

function stripSlash(value: string): string {
  return value.replace(/\/$/, "");
}

export function getPublicSiteURL(): string {
  return stripSlash(process.env.NEXT_PUBLIC_SITE_URL || APEX);
}

export function getServerURL(): string {
  const site = getPublicSiteURL();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  if (process.env.VERCEL) {
    if (server && !/localhost|127\.0\.0\.1/i.test(server)) {
      return stripSlash(server);
    }
    return site;
  }

  if (server) return stripSlash(server);
  return site || "http://localhost:3000";
}

export function getCorsOrigins(): string[] {
  const extra = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    "http://localhost:3000",
  ]
    .filter(Boolean)
    .map((value) => stripSlash(value as string));

  return Array.from(new Set([APEX, WWW, getPublicSiteURL(), getServerURL(), ...extra]));
}

export function normalizePath(path: string): string {
  if (!path) return path;
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash === "/") return "/";
  return withSlash.replace(/\/+$/, "");
}
