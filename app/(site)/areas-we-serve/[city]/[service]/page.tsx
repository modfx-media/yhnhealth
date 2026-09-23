import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CITIES,
  CITY_BY_SLUG,
  SERVICES,
  SERVICE_BY_SLUG,
  CLINICS,
} from "@/lib/pseoData";
import AreaServicePage from "@/components/page/AreaServicePage";
import { SITE_URL } from "@/lib/siteUrl";
import JsonLd from "@/components/JsonLd";
import { areaServiceJsonLd } from "@/lib/schema";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  const out: { city: string; service: string }[] = [];
  for (const c of CITIES) for (const s of SERVICES) out.push({ city: c.slug, service: s.slug });
  return out;
}

export async function generateMetadata(
  { params }: { params: Promise<{ city: string; service: string }> }
): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = CITY_BY_SLUG[citySlug];
  const service = SERVICE_BY_SLUG[serviceSlug];
  if (!city || !service) return {};

  const title = `${service.name} in ${city.name}, ${city.state} | Your Health Now`;
  const clinic = CLINICS[city.clinic];
  const drive =
    city.driveMin === 0
      ? `Our clinic is in ${city.name}`
      : `About ${city.driveMin} minutes from ${city.name}`;
  const description = `${service.name} in ${city.name}, ${city.state} (${city.zips[0]}). ${drive} at ${clinic.address}. Same-week appointments. ${service.summary.split(".")[0]}.`;
  const canonical = `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}`;
  return cmsMetadata(`/areas-we-serve/${city.slug}/${service.slug}`, {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [{ url: "/images/yhn-clone/your-health-now.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  });
}

export default async function CityServicePage(
  { params }: { params: Promise<{ city: string; service: string }> }
) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = CITY_BY_SLUG[citySlug];
  const service = SERVICE_BY_SLUG[serviceSlug];
  if (!city || !service) notFound();
  const path = `/areas-we-serve/${city.slug}/${service.slug}`;
  return (
    <CMSRoute path={path}>
      <JsonLd data={areaServiceJsonLd(city, service)} />
      <AreaServicePage city={city} service={service} />
    </CMSRoute>
  );
}
