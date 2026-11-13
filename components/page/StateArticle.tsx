"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck, Stethoscope } from "lucide-react";
import { FadeUp } from "@/components/page/Primitives";
import RichParagraph, { RichInline } from "@/components/page/RichParagraph";
import FMCPBadge from "@/components/FMCPBadge";
import type { CopyBlock, HoFaq, SourceNote } from "@/content/states/types";

export function splitIntro(blocks: CopyBlock[]) {
  const firstHeading = blocks.findIndex((block) => block.type === "h2");
  if (firstHeading === -1) return { intro: blocks, rest: [] as CopyBlock[] };
  return { intro: blocks.slice(0, firstHeading), rest: blocks.slice(firstHeading) };
}

export function ArticleBlocks({ blocks }: { blocks: CopyBlock[] }) {
  return (
    <div className="max-w-3xl space-y-4">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={`${block.text}-${index}`} className="pt-8 font-display text-2xl font-bold text-brand md:text-3xl">
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5 text-base leading-relaxed text-stone">
              {block.items.map((item) => (
                <li key={item}>
                  <RichInline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return <RichParagraph key={`${block.text.slice(0, 48)}-${index}`} text={block.text} />;
      })}
    </div>
  );
}

export function ArticleFaqs({ heading, faqs }: { heading: string; faqs: HoFaq[] }) {
  return (
    <div className="mt-16">
      <h2 className="font-display text-2xl font-bold text-brand md:text-3xl">{heading}</h2>
      <div className="mt-6 max-w-3xl divide-y divide-brand/10 rounded-3xl border border-brand/10 bg-cream-light/40">
        {faqs.map((faq) => (
          <div key={faq.q} className="p-6">
            <h3 className="flex items-start gap-2 font-display text-base font-bold text-brand">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
              {faq.q}
            </h3>
            <div className="mt-2 pl-6">
              <RichParagraph text={faq.a} className="text-sm leading-relaxed text-stone" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArticleSources({ sources }: { sources: SourceNote[] }) {
  if (!sources.length) return null;
  return (
    <div className="mt-16 max-w-3xl">
      <h2 className="font-display text-2xl font-bold text-brand md:text-3xl">Sources</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-stone">
        {sources.map((source) => (
          <li key={source.text}>
            {source.href?.startsWith("/") ? (
              <Link href={source.href} className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark">
                {source.text}
              </Link>
            ) : source.href ? (
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark"
              >
                {source.text}
              </a>
            ) : (
              source.text
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Matches the byline already used on functional medicine state pages. No review date until one is confirmed. */
export function ClinicianReview({ children }: { children?: ReactNode }) {
  return (
    <FadeUp>
      <div className="mt-16 flex max-w-3xl flex-col items-start gap-6 rounded-3xl border border-brand/10 bg-white p-6 shadow-soft sm:flex-row sm:items-center">
        <FMCPBadge size={72} showLabel={false} />
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <Stethoscope size={14} className="text-accent" />
            Medically reviewed by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP
          </p>
          {children}
          <Link
            href="/meet-the-doctor"
            className="mt-2 inline-flex text-[12px] font-semibold uppercase tracking-[0.2em] text-brand hover:text-accent-dark"
          >
            Meet the doctor
          </Link>
        </div>
      </div>
    </FadeUp>
  );
}
