export type RichRun = string | { text: string; href: string };

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

const ALLOWED_HOSTS = new Set([
  "yhnhealth.com",
  "www.yhnhealth.com",
  "yourhealthnow.janeapp.com",
  "maps.app.goo.gl",
  "www.cdc.gov",
  "cdc.gov",
  "stacks.cdc.gov",
  "www2.census.gov",
]);

/** Internal paths and a short allow-list of hosts already used on the site. */
export function isAllowedHref(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  if (href.startsWith("tel:")) return true;
  try {
    const url = new URL(href);
    return url.protocol === "https:" && ALLOWED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function parseRich(text: string): RichRun[] {
  const runs: RichRun[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const index = match.index ?? 0;
    if (index > last) runs.push(text.slice(last, index));
    const href = match[2];
    runs.push(isAllowedHref(href) ? { text: match[1], href } : match[1]);
    last = index + match[0].length;
  }
  if (last < text.length) runs.push(text.slice(last));
  return runs.length ? runs : [text];
}

export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}

export function wordCount(parts: string[]): number {
  const text = parts.map(plainText).join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}
