/**
 * Copy model for /states and /health-optimization-programs/{state}.
 *
 * Adding a later state is a new file in this folder plus one line in index.ts.
 * Paragraphs and list items may include markdown links: [label](/path).
 */

export type CopyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type HoFaq = {
  q: string;
  a: string;
};

export type SourceNote = {
  text: string;
  href?: string;
};

export type HoPresence = "clinic" | "fm-telehealth" | "ho-telehealth";

export type HoStatePage = {
  slug: string;
  name: string;
  abbreviation: string;
  presence: HoPresence;
  title: string;
  metaDescription: string;
  h1: string;
  /** Reported for the batch summary. Not rendered on the page. */
  primaryKeyword: string;
  blocks: CopyBlock[];
  faqs: HoFaq[];
  sources: SourceNote[];
};

export type HoHubPage = {
  title: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  blocks: CopyBlock[];
  faqs: HoFaq[];
  sources: SourceNote[];
};
