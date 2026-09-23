import fs from "node:fs";
import path from "node:path";
import { SITE_PATHS, NAV_ITEMS, isNavGroup } from "@/lib/navigation";
import { SEO } from "@/lib/seoData";
import { SERVICE_CONTENT } from "@/lib/serviceContent";
import { MODULES } from "@/lib/moduleContent";
import { CITIES, SERVICES } from "@/lib/pseoData";
import { getLocalBlogPosts } from "@/lib/ranked/local-posts";
import { nameFromIcon } from "@/lib/cms/icons";
import { templateForPath } from "@/lib/cms/templates";
import { SITE_URL } from "@/lib/siteUrl";

type RecordDoc = {
  collection: "pages" | "posts";
  legacyId: string;
  sourceUrl: string;
  path: string;
  data: Record<string, unknown>;
};

const SITE = SITE_URL.replace(/\/$/, "");

function pageRecord(pagePath: string, extra: Record<string, unknown> = {}): RecordDoc {
  const seo = SEO[pagePath];
  const slug = pagePath === "/" ? "home" : pagePath.replace(/^\//, "").replace(/\//g, "--");
  return {
    collection: "pages",
    legacyId: `page:${pagePath}`,
    sourceUrl: `${SITE}${pagePath === "/" ? "" : pagePath}`,
    path: pagePath,
    data: {
      title: seo?.title || extra.title || pagePath,
      path: pagePath,
      slug,
      template: extra.template || templateForPath(pagePath),
      legacyId: `page:${pagePath}`,
      sourceUrl: `${SITE}${pagePath === "/" ? "" : pagePath}`,
      meta: {
        title: seo?.title || extra.title,
        description: seo?.description || extra.description,
        canonicalUrl: `${SITE}${pagePath === "/" ? "" : pagePath}`,
        noIndex: extra.noIndex === true,
        noFollow: extra.noFollow === true,
        excludeFromSitemap: extra.excludeFromSitemap === true,
      },
      ...extra,
    },
  };
}

function serviceRecord(pagePath: string): RecordDoc {
  const slug = pagePath.replace(/^\//, "");
  const service = SERVICE_CONTENT[slug];
  const base = pageRecord(pagePath, { template: "service" });
  if (!service) return base;
  return {
    ...base,
    data: {
      ...base.data,
      title: service.title,
      slug,
      eyebrow: service.eyebrow,
      intro: service.intro,
      imageSrc: service.imageSrc,
      imageAlt: service.imageAlt,
      sections: service.sections.map((section) => ({ heading: section.heading, body: section.body })),
      benefitsEyebrow: service.benefits?.eyebrow,
      benefitsTitle: service.benefits?.title,
      benefitItems: service.benefits?.items.map((item) => ({
        icon: nameFromIcon(item.icon),
        title: item.title,
        body: item.body,
      })),
      related: service.related,
    },
  };
}

function moduleRecord(pagePath: string): RecordDoc {
  const slug = pagePath.replace(/^\//, "");
  const mod = MODULES[slug];
  const base = pageRecord(pagePath, { template: "module" });
  if (!mod) return base;
  return {
    ...base,
    data: {
      ...base.data,
      title: mod.title,
      slug,
      subtitle: mod.subtitle,
      intro: mod.overview,
      moduleNumber: mod.number,
      imageSrc: mod.imageSrc,
      outcomes: mod.outcomes.map((text) => ({ text })),
    },
  };
}

const records: RecordDoc[] = [];

for (const pagePath of SITE_PATHS) {
  if (SERVICE_CONTENT[pagePath.replace(/^\//, "")]) {
    records.push(serviceRecord(pagePath));
  } else if (MODULES[pagePath.replace(/^\//, "")]) {
    records.push(moduleRecord(pagePath));
  } else {
    records.push(pageRecord(pagePath));
  }
}

records.push(
  pageRecord("/areas-we-serve", {
    template: "area-index",
    title: "Chiropractor near you in NJ & PA | Your Health Now",
    intro:
      "Your Health Now serves cities across South Jersey and Bucks County, PA from clinics in Merchantville, NJ and Chalfont, PA.",
  }),
  pageRecord("/functional-medicine-special-offer", {
    template: "landing",
    title: "Functional Medicine Special Offer | Complimentary Consultation | Your Health Now",
    intro:
      "Limited-time complimentary 30-minute functional medicine consultation in Merchantville, NJ & Chalfont, PA.",
  }),
  pageRecord("/functional-medicine-special-offer/thank-you", {
    template: "thank-you",
    title: "Thank You - Consultation Booked | Your Health Now",
    noIndex: true,
    noFollow: true,
    excludeFromSitemap: true,
  }),
);

for (const city of CITIES) {
  const cityPath = `/areas-we-serve/${city.slug}`;
  records.push(
    pageRecord(cityPath, {
      template: "area-city",
      title: `Chiropractor in ${city.name}, ${city.state} | Your Health Now`,
      description: `Chiropractic and functional medicine for ${city.name}, ${city.state} (${city.zips[0]}) and ${city.county} County.`,
      citySlug: city.slug,
      extra: city,
    }),
  );
  for (const service of SERVICES) {
    const servicePath = `/areas-we-serve/${city.slug}/${service.slug}`;
    records.push(
      pageRecord(servicePath, {
        template: "area-service",
        title: `${service.name} in ${city.name}, ${city.state} | Your Health Now`,
        description: `${service.name} in ${city.name}, ${city.state} (${city.zips[0]}).`,
        citySlug: city.slug,
        serviceSlug: service.slug,
        extra: { city, service },
      }),
    );
  }
}

for (const post of getLocalBlogPosts()) {
  const pagePath = `/articles/${post.slug}`;
  records.push({
    collection: "posts",
    legacyId: `post:${post.slug}`,
    sourceUrl: `${SITE}${pagePath}`,
    path: pagePath,
    data: {
      title: post.title,
      slug: post.slug,
      path: pagePath,
      legacyId: `post:${post.slug}`,
      sourceUrl: `${SITE}${pagePath}`,
      excerpt: post.metaDescription,
      h1: post.h1,
      intro: post.intro,
      imageSrc: post.coverImage,
      imageAlt: post.coverAlt,
      publishDate: post.publishDate,
      sections: post.sections.map((section) => ({
        heading: section.heading,
        body: section.body.join("\n\n"),
      })),
      related: post.relatedPosts,
      meta: {
        title: `${post.title} | Your Health Now`,
        description: post.metaDescription,
        canonicalUrl: `${SITE}${pagePath}`,
      },
    },
  });
}

function mapNav(items: typeof NAV_ITEMS) {
  return items.map((item) => ({
    label: item.label,
    href: item.href,
    children: item.children.map((child) => {
      if (isNavGroup(child)) {
        return {
          label: child.label,
          href: child.href,
          children: child.children.map((leaf) => ({ label: leaf.label, href: leaf.href })),
        };
      }
      return { label: child.label, href: child.href, children: [] };
    }),
  }));
}

const exportDoc = {
  version: 1,
  records,
  globals: {
    header: {
      logoSrc: "/images/yhn-clone/your-health-now.jpg",
      logoAlt: "Your Health Now",
      nav: mapNav(NAV_ITEMS),
    },
    footer: {
      quickLinks: [
        { label: "About Us", href: "/about-us" },
        { label: "Meet The Team", href: "/meet-the-doctor" },
        { label: "Articles", href: "/articles" },
        { label: "Areas We Serve", href: "/areas-we-serve" },
        { label: "Contact", href: "/contact-us" },
      ],
      serviceLinks: [
        { label: "Chiropractic Medicine", href: "/family-chiropractic-care" },
        { label: "Functional Medicine", href: "/functional-medicine" },
        { label: "Pediatric Care", href: "/pediatric-care" },
        { label: "Pregnancy Care", href: "/pregnancy-care" },
        { label: "Athletic Care", href: "/athletic-care" },
        { label: "Decompression Therapy", href: "/decompression-therapy" },
      ],
      socials: [
        { label: "Facebook", href: "https://www.facebook.com/yhnhealth/" },
      ],
      copyright: "Your Health Now",
    },
    "site-settings": {
      siteName: "Your Health Now",
      defaultOgImage: "/images/yhn-clone/your-health-now.jpg",
      locations: [
        {
          name: "Merchantville, NJ",
          address: "5 W Chestnut Ave, Merchantville, NJ 08109",
          phone: "(856) 532-2063",
          tel: "tel:8565322063",
        },
        {
          name: "Chalfont, PA",
          address: "350 N Main St #201, Chalfont, PA 18914",
          phone: "(609) 651-7436",
          tel: "tel:6096517436",
        },
      ],
    },
  },
};

const out = path.resolve("data/content-export.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(exportDoc, null, 2));
console.log(`Wrote ${records.length} records to ${out}`);
