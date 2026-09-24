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

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "path", "_status", "updatedAt"],
    livePreview: {
      url: ({ data }) => previewFromPath(typeof data?.path === "string" ? data.path : null),
    },
    preview: (data) => previewFromPath(typeof data?.path === "string" ? data.path : null),
    useAsTitle: "title",
  },
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
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
      name: "path",
      type: "text",
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [emptyStringToNull],
      },
      validate: (value: unknown) => {
        if (value == null || value === "") return true;
        if (typeof value !== "string") return "Path must be a string";
        if (!value.startsWith("/")) return "Path must start with /";
        if (value.endsWith("/")) return "Path must not have a trailing slash";
        if (value.split("/").some((segment) => segment === "null" || segment === "undefined")) {
          return "Path cannot contain null or undefined segments";
        }
        return true;
      },
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
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "category",
      type: "text",
    },
    {
      name: "author",
      type: "text",
    },
    {
      name: "publishDate",
      type: "date",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    { name: "imageSrc", type: "text" },
    { name: "imageAlt", type: "text" },
    { name: "h1", type: "text" },
    { name: "intro", type: "textarea" },
    { name: "bodyHtml", type: "textarea" },
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
      ],
    },
    {
      name: "related",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "slug", type: "text" },
      ],
    },
    {
      type: "tabs",
      tabs: [
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
            {
              name: "schemaType",
              type: "select",
              options: ["Article", "MedicalWebPage", "WebPage"],
            },
            { name: "breadcrumbLabel", type: "text" },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      emptyUniqueToNull,
      ({ data }) => {
        if (!data) return data;
        if (!data.path && data.slug) {
          data.path = `/articles/${data.slug}`;
        }
        return data;
      },
    ],
  },
  timestamps: true,
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
