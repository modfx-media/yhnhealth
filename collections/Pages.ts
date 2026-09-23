import type { CollectionConfig } from "payload";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { authenticated, authenticatedOrPublished } from "@/lib/cms/access";
import { emptyStringToNull, emptyUniqueToNull } from "@/lib/cms/emptyToNull";
import { previewFromPath } from "@/lib/cms/preview";
import { PAGE_TEMPLATES } from "@/lib/cms/templates";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "path", "template", "_status", "updatedAt"],
    livePreview: {
      url: ({ data }) => previewFromPath(typeof data?.path === "string" ? data.path : null),
    },
    preview: (data) => previewFromPath(typeof data?.path === "string" ? data.path : null),
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
    path: true,
    slug: true,
    template: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description: "Public URL path. Starts with /, no trailing slash.",
      },
      hooks: {
        beforeValidate: [emptyStringToNull],
      },
      validate: (value: unknown) => {
        if (value == null || value === "") return true;
        if (typeof value !== "string") return "Path must be a string";
        if (!value.startsWith("/")) return "Path must start with /";
        if (value !== "/" && value.endsWith("/")) return "Path must not have a trailing slash";
        if (value.split("/").some((segment) => segment === "null" || segment === "undefined")) {
          return "Path cannot contain null or undefined segments";
        }
        return true;
      },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [emptyStringToNull],
      },
    },
    {
      name: "template",
      type: "select",
      required: true,
      defaultValue: "custom",
      options: PAGE_TEMPLATES.map((value) => ({ label: value, value })),
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar" },
      hooks: {
        beforeValidate: [emptyStringToNull],
      },
    },
    {
      name: "sourceUrl",
      type: "text",
      admin: { position: "sidebar" },
    },
    {
      name: "sourceUpdatedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            { name: "eyebrow", type: "text" },
            { name: "intro", type: "textarea" },
            { name: "imageSrc", type: "text" },
            { name: "imageAlt", type: "text" },
            { name: "subtitle", type: "text" },
            { name: "body", type: "textarea" },
            {
              name: "sections",
              type: "array",
              fields: [
                { name: "heading", type: "text" },
                { name: "body", type: "textarea" },
              ],
            },
            { name: "benefitsEyebrow", type: "text" },
            { name: "benefitsTitle", type: "text" },
            {
              name: "benefitItems",
              type: "array",
              fields: [
                { name: "icon", type: "text" },
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea" },
              ],
            },
            {
              name: "related",
              type: "array",
              fields: [
                { name: "slug", type: "text" },
                { name: "label", type: "text" },
              ],
            },
            { name: "moduleNumber", type: "text" },
            {
              name: "outcomes",
              type: "array",
              fields: [{ name: "text", type: "textarea", required: true }],
            },
            { name: "citySlug", type: "text" },
            { name: "serviceSlug", type: "text" },
            {
              name: "extra",
              type: "json",
              admin: {
                description: "Template-specific extras (city vibe, FAQs, process steps).",
              },
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: "media" }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
            { name: "canonicalUrl", type: "text" },
            { name: "noIndex", type: "checkbox", defaultValue: false },
            { name: "noFollow", type: "checkbox", defaultValue: false },
            { name: "excludeFromSitemap", type: "checkbox", defaultValue: false },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [emptyUniqueToNull],
  },
  timestamps: true,
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
