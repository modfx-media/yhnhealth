export const PAGE_TEMPLATES = [
  "home",
  "service",
  "module",
  "article-index",
  "about",
  "team",
  "testimonials",
  "contact",
  "locations",
  "legal",
  "landing",
  "thank-you",
  "spine",
  "sitemap",
  "area-index",
  "area-city",
  "area-service",
  "cpsc",
  "custom",
] as const;

export type PageTemplate = (typeof PAGE_TEMPLATES)[number];

const STATIC_TEMPLATES: Record<string, PageTemplate> = {
  "/": "home",
  "/articles": "article-index",
  "/about-us": "about",
  "/meet-the-doctor": "team",
  "/testimonials": "testimonials",
  "/contact-us": "contact",
  "/locations": "locations",
  "/privacy-policy": "legal",
  "/medical-disclaimer": "legal",
  "/functional-medicine-special-offer": "landing",
  "/functional-medicine-special-offer/thank-you": "thank-you",
  "/3d-spine-simulator": "spine",
  "/sitemap": "sitemap",
  "/areas-we-serve": "area-index",
  "/cpsc": "cpsc",
  "/functional-medicine": "custom",
  "/health-optimization-programs": "custom",
};

const SERVICE_PATHS = new Set([
  "/family-chiropractic-care",
  "/functional-postural-analysis",
  "/functional-movement-restoration",
  "/functional-kinesiology",
  "/webster-technique",
  "/pregnancy-care",
  "/pediatric-care",
  "/geriatric-care",
  "/athletic-care",
  "/art",
  "/iastm",
  "/percussion-therapy",
  "/arthrostimulation-therapy",
  "/vibracussion-therapy",
  "/decompression-therapy",
  "/lyme-disease-solutions",
  "/physician-grade-supplementation",
  "/dot-physicals",
  "/ergonomics",
  "/health-talks",
  "/integrative-nutrition",
  "/lifestyle-and-nutritional-advice",
  "/worksite-care",
  "/lower-back",
  "/head-and-neck",
  "/upper-back",
  "/shoulder-and-clavicle",
]);

export function templateForPath(path: string): PageTemplate {
  if (STATIC_TEMPLATES[path]) return STATIC_TEMPLATES[path];
  if (SERVICE_PATHS.has(path)) return "service";
  if (/^\/module-[1-6]$/.test(path)) return "module";
  if (/^\/areas-we-serve\/[^/]+$/.test(path)) return "area-city";
  if (/^\/areas-we-serve\/[^/]+\/[^/]+$/.test(path)) return "area-service";
  return "custom";
}
