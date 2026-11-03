export type NavLeaf = { label: string; href: string };
export type NavGroup = { label: string; href?: string; children: NavLeaf[] };
export type NavChild = NavLeaf | NavGroup;
export type NavItem = {
  label: string;
  href: string | null;
  children: NavChild[];
};

export function isNavGroup(child: NavChild): child is NavGroup {
  return Array.isArray((child as NavGroup).children);
}

/** Look up a nav item's display label by its href, for building silo cross-links with an accurate title. */
export function getNavLabel(href: string): string | undefined {
  for (const item of NAV_ITEMS) {
    if (item.href === href) return item.label;
    for (const child of item.children) {
      if (child.href === href) return child.label;
      if (isNavGroup(child)) {
        for (const grandchild of child.children) {
          if (grandchild.href === href) return grandchild.label;
        }
      }
    }
  }
  return undefined;
}

/**
 * Nav structure mirrored from https://yhnhealth.com/ - labels, slugs and the
 * nested submenu layout match the live site exactly.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Chiropractic Medicine",
    href: null,
    children: [
      { label: "Family Chiropractic Care", href: "/family-chiropractic-care" },
      { label: "Functional Postural Analysis", href: "/functional-postural-analysis" },
      { label: "Functional Movement Restoration", href: "/functional-movement-restoration" },
      { label: "Functional Kinesiology", href: "/functional-kinesiology" },
      { label: "Webster Technique", href: "/webster-technique" },
      { label: "Pregnancy Care", href: "/pregnancy-care" },
      { label: "Pediatric Care", href: "/pediatric-care" },
      { label: "Geriatric Care", href: "/geriatric-care" },
      { label: "Athletic Care", href: "/athletic-care" },
    ],
  },
  {
    label: "Functional Medicine",
    href: "/functional-medicine",
    children: [],
  },
  {
    label: "Physiotherapy Services",
    href: null,
    children: [
      { label: "ART", href: "/art" },
      { label: "IASTM", href: "/iastm" },
      { label: "Percussion Therapy", href: "/percussion-therapy" },
      { label: "Arthrostimulation Therapy", href: "/arthrostimulation-therapy" },
      { label: "Vibracussion Therapy", href: "/vibracussion-therapy" },
      { label: "Decompression Therapy", href: "/decompression-therapy" },
    ],
  },
  {
    label: "Pain Relief",
    href: null,
    children: [
      { label: "Back Pain & Sciatica", href: "/lower-back" },
      { label: "Neck Pain & Headaches", href: "/head-and-neck" },
      { label: "Upper Back Pain", href: "/upper-back" },
      { label: "Shoulder Pain", href: "/shoulder-and-clavicle" },
    ],
  },
  {
    label: "Other Services",
    href: null,
    children: [
      { label: "Health Optimization Programs", href: "/health-optimization-programs" },
      { label: "Lyme Disease", href: "/lyme-disease-solutions" },
      { label: "Physician Grade Supplementation", href: "/physician-grade-supplementation" },
      { label: "DOT Physicals", href: "/dot-physicals" },
      { label: "Ergonomics", href: "/ergonomics" },
      { label: "Health Talks", href: "/health-talks" },
      { label: "Integrative Nutrition", href: "/integrative-nutrition" },
      { label: "Lifestyle & Nutritional Coaching", href: "/lifestyle-and-nutritional-advice" },
      { label: "Worksite Care", href: "/worksite-care" },
    ],
  },
  {
    label: "Contact",
    href: "/contact-us",
    children: [],
  },
  {
    label: "More",
    href: null,
    children: [
      {
        label: "About Us",
        href: "/about-us",
        children: [
          { label: "Meet The Team", href: "/meet-the-doctor" },
          { label: "Testimonials", href: "/testimonials" },
        ],
      },
      { label: "Articles", href: "/articles" },
      {
        label: "Resources",
        children: [
          { label: "3D Spine Simulator", href: "/3d-spine-simulator" },
        ],
      },
      {
        label: "Post Graduate",
        children: [
          { label: "CPSC", href: "/cpsc" },
          { label: "Module 1", href: "/module-1" },
          { label: "Module 2", href: "/module-2" },
          { label: "Module 3", href: "/module-3" },
          { label: "Module 4", href: "/module-4" },
          { label: "Module 5", href: "/module-5" },
          { label: "Module 6", href: "/module-6" },
        ],
      },
    ],
  },
];

/** All canonical paths - used by the sitemap and for routing. */
export const SITE_PATHS: string[] = [
  "/",
  "/family-chiropractic-care",
  "/functional-postural-analysis",
  "/functional-movement-restoration",
  "/functional-kinesiology",
  "/webster-technique",
  "/pregnancy-care",
  "/pediatric-care",
  "/geriatric-care",
  "/athletic-care",
  "/functional-medicine",
  "/health-optimization-programs",
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
  "/locations",
  "/about-us",
  "/meet-the-doctor",
  "/testimonials",
  "/articles",
  "/contact-us",
  "/3d-spine-simulator",
  "/cpsc",
  "/module-1",
  "/module-2",
  "/module-3",
  "/module-4",
  "/module-5",
  "/module-6",
  "/sitemap",
  "/privacy-policy",
  "/medical-disclaimer",
];
