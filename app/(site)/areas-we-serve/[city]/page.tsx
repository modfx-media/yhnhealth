import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, CITY_BY_SLUG } from "@/lib/pseoData";
import AreaCityPage from "@/components/page/AreaCityPage";
import { SITE_URL } from "@/lib/siteUrl";
import JsonLd from "@/components/JsonLd";
import { areaCityJsonLd } from "@/lib/schema";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ city: string }> }
): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = CITY_BY_SLUG[citySlug];
  if (!city) return {};
  const title = `Chiropractor in ${city.name}, ${city.state} | Your Health Now`;
  const description = `Chiropractic and functional medicine for ${city.name}, ${city.state} (${city.zips[0]}) and ${city.county} County. Doctor-led care, same-week appointments.`;
  const canonical = `${SITE_URL}/areas-we-serve/${city.slug}`;
  return cmsMetadata(`/areas-we-serve/${city.slug}`, {
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

export default async function CityPage(
  { params }: { params: Promise<{ city: string }> }
) {
  const { city: citySlug } = await params;
  const city = CITY_BY_SLUG[citySlug];
  if (!city) notFound();
  const path = `/areas-we-serve/${city.slug}`;
  return (
    <CMSRoute path={path}>
      <JsonLd data={areaCityJsonLd(city)} />
      <AreaCityPage city={city} />
    </CMSRoute>
  );
}
