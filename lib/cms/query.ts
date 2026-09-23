import { draftMode } from "next/headers";
import type { Page, Post } from "@/payload-types";
import { getCMS } from "./payload";
import { withCMS } from "./safe";

export type RoutedContent =
  | { collection: "pages"; doc: Page }
  | { collection: "posts"; doc: Post };

async function draftEnabled(): Promise<boolean> {
  try {
    const draft = await draftMode();
    return draft.isEnabled;
  } catch {
    return false;
  }
}

export async function queryRoutedContentByPath(path: string): Promise<RoutedContent | null> {
  return withCMS(async () => {
    const payload = await getCMS();
    const isDraft = await draftEnabled();

    const pages = await payload.find({
      collection: "pages",
      where: { path: { equals: path } },
      limit: 1,
      depth: 1,
      draft: isDraft,
      overrideAccess: isDraft,
    });

    const page = pages.docs[0];
    if (page && (isDraft || page._status === "published")) {
      return { collection: "pages", doc: page as Page };
    }

    const posts = await payload.find({
      collection: "posts",
      where: { path: { equals: path } },
      limit: 1,
      depth: 1,
      draft: isDraft,
      overrideAccess: isDraft,
    });

    const post = posts.docs[0];
    if (post && (isDraft || post._status === "published")) {
      return { collection: "posts", doc: post as Post };
    }

    return null;
  }, null);
}

export async function queryPublishedPagesForSitemap() {
  return withCMS(async () => {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "pages",
      where: {
        _status: { equals: "published" },
      },
      limit: 5000,
      depth: 0,
      draft: false,
      overrideAccess: false,
      pagination: false,
    });
    return result.docs as Page[];
  }, [] as Page[]);
}

export async function queryPublishedPostsForSitemap() {
  return withCMS(async () => {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "posts",
      where: {
        _status: { equals: "published" },
      },
      limit: 2000,
      depth: 0,
      draft: false,
      overrideAccess: false,
      pagination: false,
    });
    return result.docs as Post[];
  }, [] as Post[]);
}

export async function getPublishedGlobal<T>(slug: "header" | "footer" | "site-settings"): Promise<T | null> {
  return withCMS(async () => {
    const payload = await getCMS();
    const isDraft = await draftEnabled();
    const doc = await payload.findGlobal({
      slug,
      draft: isDraft,
      overrideAccess: isDraft,
      depth: 1,
    });
    if (!isDraft && doc && "_status" in doc && doc._status !== "published") {
      return null;
    }
    return doc as T;
  }, null);
}
