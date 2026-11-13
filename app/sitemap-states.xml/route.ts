import { PUBLISHED_STATE_PAGES } from "@/content/states";
import { HO_CONTENT_UPDATED } from "@/content/states/updated";
import { SITE_URL } from "@/lib/siteUrl";

/** Published state guides only. Coming-soon states are not listed. */
export function GET() {
  const urls = [
    { loc: `${SITE_URL}/states`, priority: "0.8" },
    ...PUBLISHED_STATE_PAGES.map((state) => ({
      loc: `${SITE_URL}/health-optimization-programs/${state.slug}`,
      priority: "0.7",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${HO_CONTENT_UPDATED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
