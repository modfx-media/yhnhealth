import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  const allowAll = { allow: "/" as const };
  return {
    rules: [
      { userAgent: "*", ...allowAll, disallow: ["/admin", "/admin/"] },
      { userAgent: "Googlebot", ...allowAll, disallow: ["/admin", "/admin/"] },
      { userAgent: "Google-Extended", ...allowAll, disallow: ["/admin", "/admin/"] },
      { userAgent: "OAI-SearchBot", ...allowAll, disallow: ["/admin", "/admin/"] },
      { userAgent: "ChatGPT-User", ...allowAll, disallow: ["/admin", "/admin/"] },
      { userAgent: "PerplexityBot", ...allowAll, disallow: ["/admin", "/admin/"] },
      { userAgent: "Perplexity-User", ...allowAll, disallow: ["/admin", "/admin/"] },
      { userAgent: "Claude-User", ...allowAll, disallow: ["/admin", "/admin/"] },
      { userAgent: "Claude-SearchBot", ...allowAll, disallow: ["/admin", "/admin/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
