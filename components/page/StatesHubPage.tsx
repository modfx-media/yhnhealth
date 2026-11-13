"use client";

import { Breadcrumbs, BookingStrip, FadeUp } from "@/components/page/Primitives";
import RichParagraph from "@/components/page/RichParagraph";
import StatesHubMap, { type LiveState } from "@/components/page/StatesHubMap";
import {
  ArticleBlocks,
  ArticleFaqs,
  ArticleSources,
  ClinicianReview,
  splitIntro,
} from "@/components/page/StateArticle";
import type { HoHubPage } from "@/content/states/types";

export default function StatesHubPage({ hub, live }: { hub: HoHubPage; live: LiveState[] }) {
  const { intro, rest } = splitIntro(hub.blocks);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-cream-light">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(31,53,99,0.5) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute -right-32 top-12 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto max-w-[1100px] px-6 pt-12 pb-16 lg:px-10 lg:pt-16 lg:pb-20">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Health Optimization", href: "/health-optimization-programs" },
              { label: "States" },
            ]}
          />
          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] text-brand md:text-5xl lg:text-6xl">
            {hub.h1.includes("in All 50 States") ? (
              <>
                {hub.h1.replace("in All 50 States", "")}
                <span className="font-script font-normal italic text-accent">in All 50 States</span>
              </>
            ) : (
              hub.h1
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
        </div>
      </section>

      <section className="bg-mist/40 py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <FadeUp>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Published guides</p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
              Gold states open a page. Every other state stays on the map as coming soon and is not a link.
            </p>
          </FadeUp>
          <div className="mt-8">
            <StatesHubMap live={live} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-16 lg:px-10 lg:py-20">
        <ArticleBlocks blocks={rest} />
        <ArticleFaqs heading="Questions about this guide" faqs={hub.faqs} />
        <ArticleSources sources={hub.sources} />
        <ClinicianReview />
      </section>

      <BookingStrip
        fm
        eyebrow="Free 30-Min Consult"
        title="Start with a fit check, then open your state if it is live."
        copy="The consult is on video with Dr. Chris. A state without a guide can still begin from the programs page."
      />
    </main>
  );
}
