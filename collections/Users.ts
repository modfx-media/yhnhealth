import type { CollectionConfig } from "payload";
import { authenticated, isLoggedIn } from "@/lib/cms/access";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: isLoggedIn,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
  timestamps: true,
};
