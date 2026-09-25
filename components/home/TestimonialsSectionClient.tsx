"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Quote, Star, X } from "lucide-react";

export type Testimonial = {
  quote: string;
  author: string;
  location?: string;
  service?: string;
  source?: "Google" | "Yelp" | "Facebook";
  stars: number;
};

const SOURCE_DOT: Record<string, string> = {
  Google: "bg-[#4285F4]",
  Yelp: "bg-[#D32323]",
  Facebook: "bg-[#1877F2]",
};

// Above this many characters a card truncates and offers "Read more".
const TRUNCATE_AT = 220;

function ReviewModal({ t, onClose }: { t: Testimonial; onClose: () => void }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-brand-dark p-7 shadow-2xl md:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close review"
          className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/5 p-1.5 text-white/70 hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <div className="flex gap-1">
            {Array.from({ length: t.stars }).map((_, s) => (
              <Star key={s} size={14} className="fill-accent text-accent" />
            ))}
          </div>
          {t.source && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
              <span className={`h-1.5 w-1.5 rounded-full ${SOURCE_DOT[t.source] ?? "bg-white/40"}`} />
              via {t.source}
            </span>
          )}
        </div>

        <blockquote className="mt-5 font-display text-lg font-medium leading-relaxed text-white md:text-xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-steel-light">{t.author}</p>
          {t.location && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{t.location}</p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function TestimonialCard({
  t,
  compact = false,
  onReadMore,
}: {
  t: Testimonial;
  compact?: boolean;
  onReadMore: (t: Testimonial) => void;
}) {
  const isLong = t.quote.length > TRUNCATE_AT;

  return (
    <article
      className={`relative flex shrink-0 flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur ${
        compact
          ? "min-h-[230px] w-[78vw] max-w-[420px] p-6 md:w-[420px]"
          : "min-h-[260px] w-[88vw] max-w-[520px] p-7 md:w-[520px] md:p-8"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: t.stars }).map((_, s) => (
            <Star key={s} size={14} className="fill-accent text-accent" />
          ))}
        </div>
        {t.source && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
            <span className={`h-1.5 w-1.5 rounded-full ${SOURCE_DOT[t.source] ?? "bg-white/40"}`} />
            via {t.source}
          </span>
        )}
      </div>

      <blockquote className="mt-4 line-clamp-5 font-display text-[15px] font-medium leading-relaxed text-white md:text-base">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {isLong && (
        <button
          type="button"
          onClick={() => onReadMore(t)}
          onMouseEnter={() => onReadMore(t)}
          className="mt-2 self-start text-[11px] font-bold uppercase tracking-[0.18em] text-accent hover:text-white"
        >
          Read more
        </button>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-steel-light">
          {t.author}
        </p>
        {t.location && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
            {t.location}
          </p>
        )}
      </div>
    </article>
  );
}

export default function TestimonialsSectionClient({
  testimonials,
  rating,
  reviewCount,
}: {
  testimonials: Testimonial[];
  rating: number;
  reviewCount: number;
}) {
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [pausedA, setPausedA] = useState(false);
  const [pausedB, setPausedB] = useState(false);

  const featured = testimonials[0];
  const rest = testimonials.slice(1);
  const half = Math.ceil(rest.length / 2);
  const rowA = rest.slice(0, half);
  const rowB = rest.slice(half);
  const loopA = [...rowA, ...rowA];
  const loopB = [...rowB, ...rowB];

  return (
    <section className="relative overflow-hidden bg-brand-dark py-20 md:py-24 lg:py-28">
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-white/5"
      />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/5"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,143,181,0.18),transparent_60%)]"
      />

      <div className="relative">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-steel-light backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Patient Stories
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
                What our{" "}
                <span className="font-script font-normal italic text-accent">
                  patients
                </span>{" "}
                say
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div>
                  <p className="font-display text-5xl font-bold leading-none text-white">{rating.toFixed(1)}</p>
                  <div className="mt-2 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <div className="h-12 w-px bg-white/15" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                    {reviewCount}+ Google Reviews
                  </p>
                  <p className="mt-1 text-xs text-white/65">
                    Across our Merchantville &amp; Chalfont locations
                  </p>
                </div>
                <Link
                  href="/testimonials"
                  className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 hover:text-accent"
                >
                  Read all
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mt-12 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-brand to-brand-dark p-8 md:p-12"
          >
            <Quote
              size={120}
              className="absolute -right-4 -top-6 text-accent/15"
              strokeWidth={1}
            />
            <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: featured.stars }).map((_, s) => (
                      <Star key={s} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  {featured.source && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                      <span className={`h-1.5 w-1.5 rounded-full ${SOURCE_DOT[featured.source] ?? "bg-white/40"}`} />
                      Featured · via {featured.source}
                    </span>
                  )}
                </div>
                <blockquote className="mt-5 line-clamp-6 font-display text-2xl font-medium leading-snug text-white md:text-[28px] md:leading-tight">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                {featured.quote.length > TRUNCATE_AT && (
                  <button
                    type="button"
                    onClick={() => setSelected(featured)}
                    onMouseEnter={() => setSelected(featured)}
                    className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent hover:text-white"
                  >
                    Read more
                  </button>
                )}
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="h-px w-8 bg-accent" />
                  <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-white">
                    {featured.author}
                  </p>
                  {featured.location && (
                    <p className="text-[11px] uppercase tracking-[0.22em] text-steel-light">
                      {featured.location}
                    </p>
                  )}
                  {featured.service && (
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                      {featured.service}
                    </span>
                  )}
                </div>
              </div>
              <div className="md:col-span-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                    Hear More Stories
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    Read verified five-star reviews from our patients across NJ &amp; PA.
                  </p>
                  <Link
                    href="/testimonials"
                    className="group mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-brand"
                  >
                    All Testimonials
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </div>

        <div
          className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          onMouseEnter={() => setPausedA(true)}
          onMouseLeave={() => setPausedA(false)}
        >
          <div
            className="flex w-max animate-testimonial-marquee gap-5 px-6"
            style={{ animationPlayState: pausedA || !!selected ? "paused" : "running" }}
          >
            {loopA.map((t, i) => (
              <TestimonialCard key={`a-${t.author}-${i}`} t={t} onReadMore={setSelected} />
            ))}
          </div>
        </div>
        <div
          className="relative mt-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          onMouseEnter={() => setPausedB(true)}
          onMouseLeave={() => setPausedB(false)}
        >
          <div
            className="flex w-max animate-testimonial-marquee gap-5 px-6"
            style={{
              animationDirection: "reverse",
              animationDuration: "55s",
              animationPlayState: pausedB || !!selected ? "paused" : "running",
            }}
          >
            {loopB.map((t, i) => (
              <TestimonialCard key={`b-${t.author}-${i}`} t={t} compact onReadMore={setSelected} />
            ))}
          </div>
        </div>
      </div>

      {selected && <ReviewModal t={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
