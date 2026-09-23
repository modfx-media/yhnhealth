import type { GlobalConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "@/lib/cms/access";

const linkFields = [
  { name: "label", type: "text" as const },
  { name: "href", type: "text" as const },
];

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: "quickLinks",
      type: "array",
      fields: linkFields,
    },
    {
      name: "serviceLinks",
      type: "array",
      fields: linkFields,
    },
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
    { name: "copyright", type: "text" },
  ],
  versions: {
    drafts: {
      schedulePublish: true,
    },
  },
};
