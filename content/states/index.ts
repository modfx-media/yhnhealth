import type { HoStatePage } from "./types";
import { CATALOG_BY_SLUG, STATE_CATALOG } from "./catalog";
import california from "./california";
import florida from "./florida";
import newJersey from "./new-jersey";
import newYork from "./new-york";
import pennsylvania from "./pennsylvania";

/**
 * Batch 1 published guides.
 * To add a state: create content/states/{slug}.ts and append it here.
 * Routes, the map, and both sitemaps read this list. Unpublished catalog
 * entries stay on the map as "coming soon" and do not get a URL.
 */
export const PUBLISHED_STATE_PAGES: HoStatePage[] = [
  newYork,
  california,
  florida,
  newJersey,
  pennsylvania,
];

export const STATE_BY_SLUG: Record<string, HoStatePage> = Object.fromEntries(
  PUBLISHED_STATE_PAGES.map((state) => [state.slug, state]),
);

export function statePagePath(slug: string): string | null {
  return STATE_BY_SLUG[slug] ? `/health-optimization-programs/${slug}` : null;
}

export function catalogName(slug: string): string | undefined {
  return CATALOG_BY_SLUG[slug]?.name;
}

export { STATE_CATALOG };
