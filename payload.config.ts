import path from "path";
import { buildConfig } from "payload";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import { SiteSettings } from "./globals/SiteSettings";
import { getCorsOrigins, getPublicSiteURL, getServerURL } from "./lib/cms/urls";
import { previewFromPath } from "./lib/cms/preview";

const dirname = process.cwd();
const isVercel = Boolean(process.env.VERCEL);
const isImport = process.env.CMS_IMPORT_APPLY === "1" || process.argv.some((arg) => arg.includes("cms/import"));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Pages, Posts],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: getServerURL(),
  cors: getCorsOrigins(),
  csrf: getCorsOrigins(),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    forceUseVercelPostgres: true,
    push: !(isVercel || isImport),
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || "",
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      generateTitle: ({ doc }) => {
        const title = typeof doc?.title === "string" ? doc.title : "";
        return title ? `${title} | Your Health Now` : "Your Health Now";
      },
      generateDescription: ({ doc }) =>
        typeof doc?.intro === "string"
          ? doc.intro
          : typeof doc?.excerpt === "string"
            ? doc.excerpt
            : "",
      generateURL: ({ doc }) => {
        const pathValue = typeof doc?.path === "string" ? doc.path : "";
        if (!pathValue || previewFromPath(pathValue) === null) return getPublicSiteURL();
        return `${getPublicSiteURL()}${pathValue === "/" ? "" : pathValue}`;
      },
    }),
  ],
});
