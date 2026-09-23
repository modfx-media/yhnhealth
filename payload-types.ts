/* Stub until `npx payload generate:types` runs against a live database. */
export interface Page {
  id: string | number;
  title: string;
  path?: string | null;
  slug?: string | null;
  template: string;
  legacyId?: string | null;
  sourceUrl?: string | null;
  sourceUpdatedAt?: string | null;
  eyebrow?: string | null;
  intro?: string | null;
  imageSrc?: string | null;
  imageAlt?: string | null;
  subtitle?: string | null;
  body?: string | null;
  sections?: { heading?: string | null; body?: string | null; id?: string }[] | null;
  benefitsEyebrow?: string | null;
  benefitsTitle?: string | null;
  benefitItems?: { icon?: string | null; title: string; body?: string | null; id?: string }[] | null;
  related?: { slug?: string | null; label?: string | null; id?: string }[] | null;
  moduleNumber?: string | null;
  outcomes?: { text: string; id?: string }[] | null;
  citySlug?: string | null;
  serviceSlug?: string | null;
  extra?: unknown;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: unknown;
    canonicalUrl?: string | null;
    noIndex?: boolean | null;
    noFollow?: boolean | null;
    excludeFromSitemap?: boolean | null;
  } | null;
  updatedAt?: string;
  createdAt?: string;
  _status?: "draft" | "published";
}

export interface Post {
  id: string | number;
  title: string;
  slug?: string | null;
  path?: string | null;
  legacyId?: string | null;
  sourceUrl?: string | null;
  excerpt?: string | null;
  category?: string | null;
  author?: string | null;
  publishDate?: string | null;
  imageSrc?: string | null;
  imageAlt?: string | null;
  h1?: string | null;
  intro?: string | null;
  bodyHtml?: string | null;
  sections?: { heading?: string | null; body?: string | null; id?: string }[] | null;
  related?: { title?: string | null; slug?: string | null; id?: string }[] | null;
  meta?: Page["meta"];
  updatedAt?: string;
  createdAt?: string;
  _status?: "draft" | "published";
}

export interface Header {
  logoSrc?: string | null;
  logoAlt?: string | null;
  nav?: {
    label?: string | null;
    href?: string | null;
    children?: {
      label?: string | null;
      href?: string | null;
      children?: { label?: string | null; href?: string | null }[] | null;
    }[] | null;
  }[] | null;
  _status?: "draft" | "published";
}

export interface Footer {
  quickLinks?: { label?: string | null; href?: string | null }[] | null;
  serviceLinks?: { label?: string | null; href?: string | null }[] | null;
  socials?: { label?: string | null; href?: string | null }[] | null;
  copyright?: string | null;
  _status?: "draft" | "published";
}

export interface SiteSetting {
  siteName?: string | null;
  defaultOgImage?: string | null;
  locations?: { name?: string | null; address?: string | null; phone?: string | null; tel?: string | null }[] | null;
  _status?: "draft" | "published";
}

export interface Config {
  collections: {
    users: unknown;
    media: unknown;
    pages: Page;
    posts: Post;
  };
  globals: {
    header: Header;
    footer: Footer;
    "site-settings": SiteSetting;
  };
}

declare module "payload" {
  export interface GeneratedTypes extends Config {}
}
