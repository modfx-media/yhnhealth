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
          name: "groups",
          type: "array",
          admin: { description: "Dropdown groups. Named groups so nested arrays do not collide in Postgres." },
          fields: [
            ...navLinkFields,
            {
              name: "links",
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
