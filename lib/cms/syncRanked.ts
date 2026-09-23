import { getPublishedBlogPosts } from "@/lib/ranked/posts";
import { getCMS } from "./payload";
import { withCMS } from "./safe";
import { SITE_URL } from "@/lib/siteUrl";

export async function upsertRankedPostsAsDrafts() {
  return withCMS(async () => {
    const payload = await getCMS();
    const posts = await getPublishedBlogPosts();
    let count = 0;
    for (const post of posts) {
      const pagePath = `/articles/${post.slug}`;
      const existing = await payload.find({
        collection: "posts",
        where: {
          or: [{ slug: { equals: post.slug } }, { legacyId: { equals: `post:${post.slug}` } }],
        },
        limit: 1,
        depth: 0,
        draft: true,
        overrideAccess: true,
      });
      const data = {
        title: post.title,
        slug: post.slug,
        path: pagePath,
        legacyId: `post:${post.slug}`,
        sourceUrl: `${SITE_URL}${pagePath}`,
        excerpt: post.metaDescription,
        h1: post.h1,
        intro: post.intro,
        imageSrc: post.coverImage,
        imageAlt: post.coverAlt,
        publishDate: post.publishDate,
        sections: post.sections.map((section) => ({
          heading: section.heading,
          body: section.body.join("\n\n"),
        })),
        related: post.relatedPosts,
        _status: "draft" as const,
      };
      if (existing.docs[0]) {
        await payload.update({
          collection: "posts",
          id: existing.docs[0].id,
          data,
          draft: true,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "posts",
          data,
          draft: true,
          overrideAccess: true,
        });
      }
      count += 1;
    }
    return count;
  }, 0);
}
