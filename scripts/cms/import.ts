import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "@payload-config";

type ImportRecord = {
  collection: "pages" | "posts";
  legacyId?: string;
  sourceUrl?: string;
  path?: string;
  data: Record<string, unknown>;
};

const PAGE_FIELDS = new Set([
  "title",
  "path",
  "slug",
  "template",
  "legacyId",
  "sourceUrl",
  "sourceUpdatedAt",
  "eyebrow",
  "intro",
  "imageSrc",
  "imageAlt",
  "subtitle",
  "body",
  "sections",
  "benefitsEyebrow",
  "benefitsTitle",
  "benefitItems",
  "related",
  "moduleNumber",
  "outcomes",
  "citySlug",
  "serviceSlug",
  "extra",
  "meta",
]);

const POST_FIELDS = new Set([
  "title",
  "slug",
  "path",
  "legacyId",
  "sourceUrl",
  "excerpt",
  "category",
  "author",
  "publishDate",
  "imageSrc",
  "imageAlt",
  "h1",
  "intro",
  "bodyHtml",
  "sections",
  "related",
  "meta",
]);

function hasApplyFlag() {
  const args = process.argv.filter((arg) => arg !== "--");
  return args.includes("--apply") && process.env.CMS_IMPORT_APPLY === "1";
}

function skipRefs(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(skipRefs).filter((item) => item !== undefined);
  if (value && typeof value === "object") {
    if ("$ref" in value) return undefined;
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .map(([key, nested]) => [key, skipRefs(nested)])
        .filter(([, nested]) => nested !== undefined),
    );
  }
  return value;
}

function pickFields(collection: "pages" | "posts", data: Record<string, unknown>) {
  const allowed = collection === "pages" ? PAGE_FIELDS : POST_FIELDS;
  return Object.fromEntries(Object.entries(data).filter(([key]) => allowed.has(key)));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransient(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /ETIMEDOUT|cannot connect|connection terminated|ECONNRESET|fetch failed|socket hang up|und_err/i.test(
    message,
  );
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      last = error;
      if (!isTransient(error) || attempt === 3) throw error;
      await sleep(1000 * (attempt + 1));
    }
  }
  throw last;
}

async function findExisting(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "pages" | "posts",
  record: ImportRecord,
) {
  if (record.legacyId) {
    const byLegacy = await payload.find({
      collection,
      where: { legacyId: { equals: record.legacyId } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    });
    if (byLegacy.docs[0]) return byLegacy.docs[0];
  }
  if (record.sourceUrl) {
    const bySource = await payload.find({
      collection,
      where: { sourceUrl: { equals: record.sourceUrl } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    });
    if (bySource.docs[0]) return bySource.docs[0];
  }
  return null;
}

async function main() {
  const file = path.resolve(
    process.argv.find((arg) => arg.endsWith(".json")) || "data/content-export.json",
  );
  if (!fs.existsSync(file)) {
    throw new Error(`Export file not found: ${file}`);
  }
  const doc = JSON.parse(fs.readFileSync(file, "utf8")) as {
    version: number;
    records: ImportRecord[];
    globals?: Record<string, Record<string, unknown>>;
  };

  const apply = hasApplyFlag();
  const globalsOnly = process.argv.includes("--globals-only");
  console.log(`${apply ? "APPLY" : "DRY RUN"} ${globalsOnly ? "globals" : `${doc.records.length} records`} from ${file}`);

  if (!apply) {
    console.log("Re-run with CMS_IMPORT_APPLY=1 and --apply to write drafts.");
    return;
  }

  if (process.env.CMS_IMPORT_PUBLISH === "1") {
    throw new Error("Bulk publish is disabled. Import stays in draft until a page is reviewed.");
  }

  let payload = await getPayload({ config });
  const report = {
    created: 0,
    updated: 0,
    skipped: [] as { collection: string; path?: string; error: string }[],
    globals: [] as string[],
  };

  if (doc.globals) {
    for (const [slug, data] of Object.entries(doc.globals)) {
      try {
        await withRetry(() =>
          payload.updateGlobal({
            slug: slug as "header" | "footer" | "site-settings",
            data,
            draft: true,
            overrideAccess: true,
          }),
        );
        report.globals.push(slug);
        console.log(`global ${slug} saved as draft`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        report.skipped.push({ collection: slug, error: message });
        console.error(`[cms] skip global ${slug}`, message);
      }
    }
  }

  if (globalsOnly) {
    const reportPath = path.resolve("migration-data/import-report.json");
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Globals import complete. saved=${report.globals.join(", ") || "none"} skipped=${report.skipped.length}`);
    process.exit(report.skipped.length ? 1 : 0);
  }

  let cursor = 0;
  const workers = Array.from({ length: 6 }, async () => {
    while (cursor < doc.records.length) {
      const record = doc.records[cursor];
      cursor += 1;
      const cleaned = pickFields(record.collection, skipRefs(record.data) as Record<string, unknown>);
      if (typeof cleaned.path === "string") {
        cleaned.path = cleaned.path === "/" ? "/" : cleaned.path.replace(/\/+$/, "");
      }
      try {
        const existing = await withRetry(() => findExisting(payload, record.collection, record));
        if (existing) {
          await withRetry(() =>
            payload.update({
              collection: record.collection,
              id: existing.id,
              data: cleaned,
              draft: true,
              overrideAccess: true,
            }),
          );
          report.updated += 1;
        } else {
          await withRetry(() =>
            payload.create({
              collection: record.collection,
              data: cleaned,
              draft: true,
              overrideAccess: true,
            }),
          );
          report.created += 1;
        }
        const done = report.created + report.updated + report.skipped.length;
        if (done % 100 === 0) console.log(`progress ${done}/${doc.records.length}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        report.skipped.push({
          collection: record.collection,
          path: record.path,
          error: message,
        });
        console.error(`[cms] skip ${record.collection} ${record.path || record.legacyId}`, message);
      }
    }
  });

  await Promise.all(workers);

  const reportPath = path.resolve("migration-data/import-report.json");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(
    `Import complete. created=${report.created} updated=${report.updated} skipped=${report.skipped.length}. Documents remain drafts.`,
  );
  process.exit(report.skipped.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
