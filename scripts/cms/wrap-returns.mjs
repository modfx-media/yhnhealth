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

for (const file of walk(root)) {
  let src = fs.readFileSync(file, "utf8");
  if (!src.includes("CMSRoute") || src.includes("<CMSRoute")) continue;

  src = src.replace(
    /export default function (\w+)\(\) \{\r?\n  return ([\s\S]*?);\r?\n\}/,
    (_m, name, child) => {
      const inner = child.trim();
      return `export default function ${name}() {\n  return (\n    <CMSRoute path={PATH}>\n      ${inner}\n    </CMSRoute>\n  );\n}`;
    },
  );

  fs.writeFileSync(file, src);
  console.log("WRAPPED RETURN", path.relative(process.cwd(), file));
}
