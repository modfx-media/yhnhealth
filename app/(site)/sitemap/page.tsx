import type { Metadata } from "next";
import SitemapClient from "./SitemapClient";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { SITE_URL } from "@/lib/siteUrl";

const PATH = "/sitemap";

const fallbackMetadata: Metadata = {
  title: { absolute: "Sitemap | Your Health Now" },
  description:
    "Browse every page on yhnhealth.com - chiropractic care, functional medicine, physiotherapy services, locations, and 1,081 local service pages across NJ & PA.",
  alternates: { canonical: `${SITE_URL}/sitemap` },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, fallbackMetadata);
}

export default function SitemapPage() {
  return (
    <CMSRoute path={PATH}>
      <SitemapClient />
    </CMSRoute>
  );
}
