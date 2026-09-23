import type { CollectionConfig } from "payload";
import path from "path";
import { anyone, authenticated } from "@/lib/cms/access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  upload: {
    staticDir: path.resolve(process.cwd(), "public/media"),
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 300 },
      { name: "og", width: 1200, height: 630, crop: "center" },
    ],
  },
};
