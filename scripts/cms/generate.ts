import configPromise from "@payload-config";
import { generateImportMap } from "../../node_modules/payload/dist/bin/generateImportMap/index.js";
import { generateTypes } from "../../node_modules/payload/dist/bin/generateTypes.js";

async function main() {
  const mode = process.argv[2] || "all";
  const config = await configPromise;

  if (mode === "all" || mode === "importmap") {
    await generateImportMap(config);
  }
  if (mode === "all" || mode === "types") {
    await generateTypes(config);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
