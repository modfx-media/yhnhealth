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

function hasApplyFlag() {
  return process.argv.includes("--apply") && process.env.CMS_IMPORT_APPLY === "1";
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
  const file = path.resolve(process.argv.find((arg) => arg.endsWith(".json")) || "data/content-export.json");
  if (!fs.existsSync(file)) {
    throw new Error(`Export file not found: ${file}`);
  }
  const doc = JSON.parse(fs.readFileSync(file, "utf8")) as {
    version: number;
    records: ImportRecord[];
    globals?: Record<string, Record<string, unknown>>;
  };

  const apply = hasApplyFlag();
  console.log(`${apply ? "APPLY" : "DRY RUN"} ${doc.records.length} records from ${file}`);

  if (!apply) {
    console.log("Re-run with CMS_IMPORT_APPLY=1 and --apply to write drafts.");
    return;
  }

  const payload = await getPayload({ config });

  if (doc.globals) {
    for (const [slug, data] of Object.entries(doc.globals)) {
      try {
        await payload.updateGlobal({
          slug: slug as "header" | "footer" | "site-settings",
          data: { ...data, _status: "draft" },
          draft: true,
          overrideAccess: true,
        });
        console.log(`global ${slug} saved as draft`);
      } catch (error) {
        console.error(`[cms] skip global ${slug}`, error);
      }
    }
  }

  for (const record of doc.records) {
    const data = {
      ...(skipRefs(record.data) as Record<string, unknown>),
      _status: "draft" as const,
    };
    if (typeof data.path === "string") {
      data.path = data.path === "/" ? "/" : data.path.replace(/\/+$/, "");
    }
    try {
      const existing = await findExisting(payload, record.collection, record);
      if (existing) {
        await payload.update({
          collection: record.collection,
          id: existing.id,
          data,
          draft: true,
          overrideAccess: true,
        });
        console.log(`updated ${record.collection} ${record.path}`);
      } else {
        await payload.create({
          collection: record.collection,
          data,
          draft: true,
          overrideAccess: true,
        });
        console.log(`created ${record.collection} ${record.path}`);
      }
    } catch (error) {
      console.error(`[cms] skip ${record.collection} ${record.path || record.legacyId}`, error);
    }
  }

  console.log("Import complete. Documents remain drafts until reviewed in /admin.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
