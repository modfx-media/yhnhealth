import type { GlobalConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/lib/cms/access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    { name: "siteName", type: "text" },
    { name: "defaultOgImage", type: "text" },
    {
      name: "locations",
      type: "array",
      fields: [
        { name: "name", type: "text" },
        { name: "address", type: "text" },
        { name: "phone", type: "text" },
        { name: "tel", type: "text" },
      ],
    },
  ],
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
};
