import type { Metadata } from "next";
import { queryRoutedContentByPath } from "./query";
import { resolveCmsMetadata } from "./resolveMetadata";

export async function cmsMetadata(path: string, fallback: Metadata): Promise<Metadata> {
  const routed = await queryRoutedContentByPath(path);
  if (!routed) return fallback;
  return resolveCmsMetadata(routed.doc, fallback, path);
}
