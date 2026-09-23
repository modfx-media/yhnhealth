import fs from "node:fs";
import path from "node:path";

const root = path.resolve("app/(site)");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === "page.tsx") acc.push(full);
  }
  return acc;
}

function toPosix(file) {
  return file.split(path.sep).join("/");
}

const skip = new Set([
  "app/(site)/page.tsx",
  "app/(site)/articles/page.tsx",
  "app/(site)/articles/[slug]/page.tsx",
  "app/(site)/areas-we-serve/page.tsx",
  "app/(site)/areas-we-serve/[city]/page.tsx",
  "app/(site)/areas-we-serve/[city]/[service]/page.tsx",
  "app/(site)/privacy-policy/page.tsx",
  "app/(site)/medical-disclaimer/page.tsx",
  "app/(site)/functional-medicine-special-offer/page.tsx",
  "app/(site)/functional-medicine-special-offer/thank-you/page.tsx",
  "app/(site)/sitemap/page.tsx",
]);

for (const file of walk(root)) {
  const rel = toPosix(path.relative(process.cwd(), file));
  if (skip.has(rel)) continue;
  let src = fs.readFileSync(file, "utf8");
  if (src.includes("CMSRoute")) continue;

  const buildMeta = src.match(/buildMetadata\("(\/[^"]+)"\)/);
  if (!buildMeta) {
    console.log("SKIP no buildMetadata", rel);
    continue;
  }
  const pagePath = buildMeta[1];

  if (!src.includes('from "next"') && !src.includes("from 'next'")) {
    src = `import type { Metadata } from "next";\n${src}`;
  }
  if (!src.includes("CMSRoute")) {
    src = src.replace(
      'from "@/lib/seoData";',
      'from "@/lib/seoData";\nimport { CMSRoute } from "@/components/cms/CMSRoute";\nimport { cmsMetadata } from "@/lib/cms/metadata";',
    );
  }

  src = src.replace(
    /export const metadata(?:: Metadata)? = buildMetadata\("(\/[^"]+)"\);/,
    `const PATH = "$1";\n\nexport async function generateMetadata(): Promise<Metadata> {\n  return cmsMetadata(PATH, buildMetadata(PATH));\n}`,
  );

  src = src.replace(
    /export default function \w+\(\) \{\n  return ([\s\S]*?);\n\}/,
    (match, child) => {
      const inner = child.trim();
      return `export default function Page() {\n  return (\n    <CMSRoute path={PATH}>\n      ${inner}\n    </CMSRoute>\n  );\n}`;
    },
  );

  fs.writeFileSync(file, src);
  console.log("WRAPPED", rel, pagePath);
}
