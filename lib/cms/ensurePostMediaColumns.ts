import type { Payload } from "payload";

const STATEMENTS = [
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "featured_image_id" integer`,
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "content" jsonb`,
  `ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_featured_image_id" integer`,
  `ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_content" jsonb`,
];

/**
 * Additive columns for the featured image and rich text body.
 * Schema push is off on Vercel, and Payload's migrate prompt can exit when a
 * dev-mode migration row exists, so these statements run directly instead.
 */
export async function ensurePostMediaColumns(payload: Payload): Promise<void> {
  if (!process.env.VERCEL) return;

  for (const raw of STATEMENTS) {
    try {
      await payload.db.execute({
        drizzle: payload.db.drizzle,
        raw,
      });
    } catch (error) {
      payload.logger.error({ err: error, msg: "Could not add posts media column" });
    }
  }
}
