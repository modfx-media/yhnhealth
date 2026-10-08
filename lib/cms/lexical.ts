import type { ArticleBlock } from "@/lib/articlesData";
import { publicImageSrc } from "./mediaUrl";

type LexicalNode = {
  type?: string;
  text?: string;
  tag?: string;
  listType?: string;
  url?: string;
  children?: LexicalNode[];
  fields?: {
    url?: string | null;
    linkType?: string | null;
    newTab?: boolean | null;
    alt?: string | null;
    doc?: { value?: unknown; relationTo?: string | null } | null;
  } | null;
  value?: unknown;
  relationTo?: string | null;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

function linkHref(node: LexicalNode): string | null {
  const fields = node.fields;
  if (fields?.url && typeof fields.url === "string") return fields.url;
  const doc = asRecord(fields?.doc?.value);
  if (doc && typeof doc.path === "string") return doc.path;
  if (doc && typeof doc.slug === "string") return `/articles/${doc.slug}`;
  return null;
}

function inlineText(nodes: LexicalNode[] | undefined): string {
  if (!nodes?.length) return "";
  let text = "";
  for (const node of nodes) {
    if (node.type === "text" || node.type === "linebreak") {
      text += node.type === "linebreak" ? " " : node.text || "";
      continue;
    }
    if (node.type === "link" || node.type === "autolink") {
      const label = inlineText(node.children).trim();
      const href = linkHref(node);
      text += label && href ? `[${label}](${href})` : label;
      continue;
    }
    if (node.children?.length) text += inlineText(node.children);
  }
  return text.replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ");
}

function imageFromUpload(node: LexicalNode): ArticleBlock | null {
  const value = asRecord(node.value);
  const src = publicImageSrc(
    (value && typeof value.url === "string" ? value.url : undefined) ||
      (typeof node.url === "string" ? node.url : undefined),
  );
  if (!src) return null;
  const alt =
    (typeof node.fields?.alt === "string" && node.fields.alt) ||
    (value && typeof value.alt === "string" && value.alt) ||
    (value && typeof value.filename === "string" && value.filename) ||
    "";
  return { type: "image", src, alt };
}

function nodeToBlocks(node: LexicalNode): ArticleBlock[] {
  switch (node.type) {
    case "paragraph": {
      const text = inlineText(node.children).trim();
      return text ? [{ type: "p", text }] : [];
    }
    case "heading": {
      const text = inlineText(node.children).trim();
      if (!text) return [];
      const tag = node.tag || "h2";
      return [{ type: tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6" ? "h3" : "h2", text }];
    }
    case "list": {
      const items = (node.children || [])
        .map((item) => inlineText(item.children).trim())
        .filter(Boolean);
      return items.length ? [{ type: "list", items }] : [];
    }
    case "quote": {
      const text = inlineText(node.children).trim();
      return text ? [{ type: "quote", text }] : [];
    }
    case "upload": {
      const image = imageFromUpload(node);
      return image ? [image] : [];
    }
    case "horizontalrule":
      return [];
    default: {
      if (node.type === "image") {
        const image = imageFromUpload(node);
        if (image) return [image];
      }
      if (node.children?.length) return node.children.flatMap(nodeToBlocks);
      return [];
    }
  }
}

/** Convert a Payload Lexical document into the designed article blocks, including inline images. */
export function lexicalToBlocks(content: unknown): ArticleBlock[] {
  const root = asRecord(asRecord(content)?.root);
  const children = root?.children;
  if (!Array.isArray(children)) return [];
  return children.flatMap((child) => nodeToBlocks(child as LexicalNode));
}
