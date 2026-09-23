import fs from "node:fs";
import path from "node:path";
import { SITE_PATHS } from "@/lib/navigation";
import { CITIES, SERVICES } from "@/lib/pseoData";
import { getLocalBlogPosts } from "@/lib/ranked/local-posts";

const exportPath = path.resolve(process.argv[2] || "data/content-export.json");
if (!fs.existsSync(exportPath)) {
  console.error(`Missing export file: ${exportPath}`);
  process.exit(1);
}

const doc = JSON.parse(fs.readFileSync(exportPath, "utf8")) as {
  version: number;
  records: { path?: string; sourceUrl?: string }[];
};

const required = new Set<string>([
  ...SITE_PATHS,
  "/areas-we-serve",
  "/functional-medicine-special-offer",
  "/functional-medicine-special-offer/thank-you",
]);

for (const city of CITIES) {
  required.add(`/areas-we-serve/${city.slug}`);
  for (const service of SERVICES) {
    required.add(`/areas-we-serve/${city.slug}/${service.slug}`);
  }
}
for (const post of getLocalBlogPosts()) {
  required.add(`/articles/${post.slug}`);
}

const exported = new Set(
  doc.records.map((record) => record.path).filter((value): value is string => Boolean(value)),
);

const missing = [...required].filter((pagePath) => !exported.has(pagePath));
if (missing.length) {
  console.error(`Export is missing ${missing.length} sitemap paths:`);
  for (const pagePath of missing.slice(0, 40)) console.error(`  ${pagePath}`);
  if (missing.length > 40) console.error(`  ...and ${missing.length - 40} more`);
  process.exit(1);
}

console.log(`Export covers all ${required.size} required sitemap paths (${doc.records.length} records).`);
