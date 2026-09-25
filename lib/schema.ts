import { SITE_URL } from "@/lib/siteUrl";
import { CLINICS, type City, type ServiceData } from "@/lib/pseoData";
import { AVERAGE_RATING, VERIFIED_REVIEW_COUNT, reviewsFor } from "@/lib/testimonialsData";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const CLINIC_GEO = {
  merchantville: { lat: 39.9476, lng: -75.0577 },
  chalfont: { lat: 40.2887, lng: -75.2096 },
} as const;

async function reviewNodes(key: "merchantville" | "chalfont") {
  const { reviews: liveReviews } = await getDisplayedGoogleReviews();
  const googleNodes = liveReviews
    .filter((r) => r.location === key)
    .map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
      reviewBody: r.quote,
      publisher: { "@type": "Organization", name: "Google" },
    }));

  const curatedNodes = reviewsFor(key).map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.stars ?? 5,
      bestRating: 5,
    },
    reviewBody: r.text,
    publisher: r.source ? { "@type": "Organization", name: r.source } : undefined,
  }));

  return [...googleNodes, ...curatedNodes];
}

async function clinicNode(key: "merchantville" | "chalfont") {
  const c = CLINICS[key];
  const geo = CLINIC_GEO[key];
  const isNj = key === "merchantville";
  const { meta } = await getDisplayedGoogleReviews();
  const locationMeta = meta.byLocation[key];
  return {
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${SITE_URL}/locations#${key}`,
    name: `Your Health Now - ${c.name}`,
    url: `${SITE_URL}/areas-we-serve/${isNj ? "merchantville-nj" : "chalfont-pa"}/chiropractic-care`,
    telephone: isNj ? "+1-856-532-2063" : "+1-609-651-7436",
    image: `${SITE_URL}/images/yhn-clone/your-health-now.jpg`,
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: isNj ? "5 W Chestnut Ave" : "350 N Main St #201",
      addressLocality: isNj ? "Merchantville" : "Chalfont",
      addressRegion: c.state,
      postalCode: c.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "20:00",
      },
    ],
    medicalSpecialty: ["Chiropractic", "FunctionalMedicine"],
    areaServed: isNj
      ? [
          { "@type": "AdministrativeArea", name: "Camden County" },
          { "@type": "City", name: "Merchantville" },
          { "@type": "City", name: "Pennsauken" },
          { "@type": "City", name: "Cherry Hill" },
        ]
      : [
          { "@type": "AdministrativeArea", name: "Bucks County" },
          { "@type": "City", name: "Chalfont" },
          { "@type": "City", name: "Doylestown" },
          { "@type": "City", name: "Warrington" },
        ],
    hasMap: isNj
      ? "https://maps.app.goo.gl/eZph1e6LanqehCXF8"
      : "https://maps.app.goo.gl/XZTDgRGTwdgtHUgS6",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: locationMeta.rating,
      bestRating: 5,
      reviewCount: locationMeta.reviewCount,
    },
    review: await reviewNodes(key),
  };
}

const PEOPLE = [
  {
    "@type": "Person",
    "@id": `${SITE_URL}/meet-the-doctor#dr-chris`,
    name: "Dr. Chris Chianese",
    honorificPrefix: "Dr.",
    jobTitle: "Functional Medicine Physician and Chiropractic Physician",
    hasCredential: ["MS", "DC", "CPSC", "FMCP"],
    worksFor: { "@id": ORG_ID },
    url: `${SITE_URL}/meet-the-doctor#dr-chris`,
    image: `${SITE_URL}/images/team/chris.webp`,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Sherman College of Chiropractic" },
      { "@type": "CollegeOrUniversity", name: "Canisius College" },
    ],
    memberOf: {
      "@type": "Organization",
      name: "Institute for Functional Medicine",
      url: "https://www.ifm.org/",
    },
  },
  {
    "@type": "Person",
    "@id": `${SITE_URL}/meet-the-doctor#dr-marc`,
    name: "Dr. Marc Chianese",
    honorificPrefix: "Dr.",
    jobTitle: "Chiropractic Physician",
    hasCredential: ["MS", "DC", "CPSC"],
    worksFor: { "@id": ORG_ID },
    url: `${SITE_URL}/meet-the-doctor#dr-marc`,
    image: `${SITE_URL}/images/team/marc.webp`,
  },
  {
    "@type": "Person",
    "@id": `${SITE_URL}/meet-the-doctor#dr-lillee`,
    name: "Dr. Lillee Chianese",
    honorificPrefix: "Dr.",
    jobTitle: "Chiropractic Physician",
    hasCredential: ["DC", "ART", "CPSC", "NRCME"],
    worksFor: { "@id": ORG_ID },
    url: `${SITE_URL}/meet-the-doctor#dr-lillee`,
    image: `${SITE_URL}/images/team/lillee.webp`,
  },
];

export async function organizationGraph() {
  const [merchantvilleClinic, chalfontClinic] = await Promise.all([
    clinicNode("merchantville"),
    clinicNode("chalfont"),
  ]);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": ORG_ID,
        name: "Your Health Now",
        legalName: "Your Health Now LLC",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.webp`,
        image: `${SITE_URL}/images/yhn-clone/your-health-now.jpg`,
        description:
          "Chiropractic and functional medicine clinics in Chalfont, Pennsylvania and Merchantville, New Jersey. Doctor-led care for back pain, neck pain, sciatica, and root-cause health concerns.",
        medicalSpecialty: ["Chiropractic", "FunctionalMedicine"],
        priceRange: "$$",
        email: "info@yhnhealth.com",
        sameAs: [
          "https://www.facebook.com/yhnhealth/",
          "https://www.linkedin.com/company/your-health-now-llc",
          "https://www.yelp.com/biz/your-health-now-chalfont",
        ],
        employee: PEOPLE.map((p) => ({ "@id": p["@id"] })),
        department: [
          { "@id": `${SITE_URL}/locations#merchantville` },
          { "@id": `${SITE_URL}/locations#chalfont` },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: AVERAGE_RATING,
          bestRating: 5,
          reviewCount: VERIFIED_REVIEW_COUNT,
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "Your Health Now",
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
      merchantvilleClinic,
      chalfontClinic,
      ...PEOPLE,
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function areaServiceJsonLd(city: City, service: ServiceData) {
  const clinic = CLINICS[city.clinic];
  const cityFull = `${city.name}, ${city.state}`;
  const pageUrl = `${SITE_URL}/areas-we-serve/${city.slug}/${service.slug}`;
  const clinicId = `${SITE_URL}/locations#${city.clinic}`;
  const faq = service.faq.map((f) => ({
    q: f.q.replace(/\{city\}/g, cityFull),
    a: f.a.replace(/\{city\}/g, cityFull),
  }));

  return [
    breadcrumbJsonLd([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Areas We Serve", url: `${SITE_URL}/areas-we-serve` },
      { name: cityFull, url: `${SITE_URL}/areas-we-serve/${city.slug}` },
      { name: service.name, url: pageUrl },
    ]),
    faqJsonLd(faq),
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: `${service.name} in ${cityFull}`,
      url: pageUrl,
      description: `${service.name} for ${cityFull} patients at Your Health Now, ${clinic.address}.`,
      lastReviewed: "2026-09-02",
      reviewedBy: { "@id": `${SITE_URL}/meet-the-doctor#dr-chris` },
      about: {
        "@type": "Service",
        name: service.name,
        serviceType: service.category,
        areaServed: { "@type": "City", name: city.name },
        provider: { "@id": clinicId },
      },
      publisher: { "@id": ORG_ID },
    },
  ];
}

export function areaCityJsonLd(city: City) {
  const cityFull = `${city.name}, ${city.state}`;
  const pageUrl = `${SITE_URL}/areas-we-serve/${city.slug}`;
  const clinicId = `${SITE_URL}/locations#${city.clinic}`;
  return [
    breadcrumbJsonLd([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Areas We Serve", url: `${SITE_URL}/areas-we-serve` },
      { name: cityFull, url: pageUrl },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: `Your Health Now chiropractic care for ${cityFull}`,
      url: pageUrl,
      description: `Chiropractic and functional medicine for ${cityFull} and ${city.county} County, served from our ${CLINICS[city.clinic].name} clinic.`,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: "US",
      },
      areaServed: { "@type": "City", name: city.name },
      parentOrganization: { "@id": ORG_ID },
      provider: { "@id": clinicId },
    },
  ];
}

const AUTHOR_ID_BY_NAME: Record<string, string> = {
  "Dr. Chris Chianese, MS, DC, FMCP": `${SITE_URL}/meet-the-doctor#dr-chris`,
  "Dr. Marc Chianese, MS, DC": `${SITE_URL}/meet-the-doctor#dr-marc`,
  "Dr. Lillee Chianese, DC, ART, CPSC, NRCME": `${SITE_URL}/meet-the-doctor#dr-lillee`,
};

export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
  author?: string;
}) {
  const authorId = (opts.author && AUTHOR_ID_BY_NAME[opts.author]) || `${SITE_URL}/meet-the-doctor#dr-chris`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}`,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    author: { "@id": authorId },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: opts.url,
    about: { "@type": "MedicalSpecialty", name: "Chiropractic" },
  };
}
