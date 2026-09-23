import type { GlobalConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/lib/cms/access";

const navLinkFields = [
  { name: "label", type: "text" as const },
  { name: "href", type: "text" as const },
];

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    { name: "logoSrc", type: "text" },
    { name: "logoAlt", type: "text" },
    {
      name: "nav",
      type: "array",
      fields: [
        ...navLinkFields,
        {
          name: "children",
          type: "array",
          fields: [
            ...navLinkFields,
            {
              name: "children",
              type: "array",
              fields: navLinkFields,
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
};
