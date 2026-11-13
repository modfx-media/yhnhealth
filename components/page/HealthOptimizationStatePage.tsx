"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { Breadcrumbs, BookingStrip } from "@/components/page/Primitives";
import RichParagraph from "@/components/page/RichParagraph";
import {
  ArticleBlocks,
  ArticleFaqs,
  ArticleSources,
  ClinicianReview,
  splitIntro,
} from "@/components/page/StateArticle";
import type { HoStatePage } from "@/content/states/types";

export default function HealthOptimizationStatePage({ state }: { state: HoStatePage }) {
  const { intro, rest } = splitIntro(state.blocks);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-light via-white to-mist">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px] px-6 pt-12 pb-16 lg:px-10 lg:pt-16 lg:pb-20">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Health Optimization", href: "/health-optimization-programs" },
              { label: state.name },
            ]}
          />

          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand">
            Health Optimization · Telehealth
          </p>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-brand md:text-5xl lg:text-6xl">
            {state.h1.endsWith(state.name) ? (
              <>
                {state.h1.slice(0, -state.name.length)}
                <span className="font-script font-normal italic text-accent">{state.name}</span>
              </>
            ) : (
              state.h1
            )}
          </h1>

          <div className="mt-7 max-w-3xl space-y-4">
            {intro.map((block, index) =>
              block.type === "p" ? (
                <RichParagraph
                  key={`${block.text.slice(0, 40)}-${index}`}
                  text={block.text}
                  className="text-lg leading-relaxed text-stone"
                />
              ) : null,
            )}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/health-optimization-programs"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-accent-dark"
            >
              See the programs
            </Link>
            <Link
              href="/states"
              className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-brand transition-colors hover:border-accent hover:text-accent-dark"
            >
              <MapPin size={14} />
              All state guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-16 lg:px-10 lg:py-20">
        <ArticleBlocks blocks={rest} />
        <ArticleFaqs heading={`Questions from ${state.name}`} faqs={state.faqs} />
        <ArticleSources sources={state.sources} />
        <ClinicianReview />
      </section>

      <BookingStrip
        fm
        eyebrow="Free 30-Min Consult"
        title={`Talk with Dr. Chris about a ${state.name} visit`}
        copy="The complimentary consult is a fit check on video. It is not a diagnosis, and it does not start a pathway by itself."
      />
    </main>
  );
}
