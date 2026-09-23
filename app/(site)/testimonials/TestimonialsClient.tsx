"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Phone, Quote, Star } from "lucide-react";
import { Breadcrumbs, FadeUp } from "@/components/page/Primitives";
import { REVIEWS, VERIFIED_REVIEW_COUNT } from "@/lib/testimonialsData";

const SOURCES = ["All", "Google", "Yelp", "Facebook"] as const;
type SourceFilter = (typeof SOURCES)[number];

const SOURCE_DOT: Record<string, string> = {
  Google: "bg-[#4285F4]",
  Yelp: "bg-[#D32323]",
  Facebook: "bg-[#1877F2]",
};

function Stars({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="fill-accent text-accent" strokeWidth={0} />
      ))}
    </div>
  );
}

export default function TestimonialsClient() {
  const [filter, setFilter] = useState<SourceFilter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? REVIEWS : REVIEWS.filter((r) => r.source === filter)),
    [filter]
  );

  const featured = REVIEWS[0];
  const rest = filtered.filter((r) => r !== featured);

  const sourceCounts = useMemo(() => {
    const c: Record<string, number> = { All: REVIEWS.length };
    for (const r of REVIEWS) {
      if (r.source) c[r.source] = (c[r.source] ?? 0) + 1;
    }
    return c;
  }, []);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-[1320px] px-6 pt-12 pb-16 lg:px-10 lg:pt-16 lg:pb-20">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Testimonials" }]} />

          <FadeUp className="mx-auto mt-14 max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Reviews</p>
            <h1 className="relative mt-5 inline-block font-display text-5xl font-bold leading-[0.95] text-brand md:text-6xl lg:text-7xl">
              What Our Patients
              <span className="relative ml-3 font-script font-normal italic text-accent">
                Say
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-[6px] origin-left rounded-full bg-accent/40"
                />
              </span>
            </h1>
            <p className="mt-8 text-base leading-relaxed text-stone md:text-lg">
              We value our patients&rsquo; experience at Your Health Now. If you are currently a patient, please feel free to submit your review to one of our social media pages or email us on our contact page.
            </p>
            <p className="mt-4 text-sm font-semibold tracking-wide text-brand"> - Dr. Chris Chianese</p>
          </FadeUp>
        </div>
      </section>

      {/* STAR SUMMARY BAR */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 h-72 w-72 rounded-full border border-dashed border-white/10"
        />
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -left-32 -bottom-32 h-72 w-72 rounded-full border border-dashed border-accent/15"
        />
        <FadeUp className="relative mx-auto max-w-[1320px] px-6 py-14 text-center lg:px-10 lg:py-16">
          <div className="mx-auto inline-flex flex-col items-center gap-3">
            <span className="font-display text-7xl font-bold leading-none tracking-tight md:text-8xl">5.0</span>
            <Stars size={22} />
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.32em] text-accent">
              across {VERIFIED_REVIEW_COUNT}+ verified reviews
            </p>
            <p className="mt-2 max-w-md text-sm text-white/70">
              From Google, Yelp, Facebook, and our patients&rsquo; own letters.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* FEATURED PULL QUOTE */}
      <section className="relative bg-cream-light">
        <div className="mx-auto max-w-[1320px] px-6 pt-20 lg:px-10 lg:pt-24">
          <FadeUp>
            <article className="relative overflow-hidden rounded-3xl border border-brand/10 bg-white p-8 shadow-card md:p-12">
              <Quote
                size={140}
                className="absolute -right-2 -top-4 text-accent/15"
                strokeWidth={1}
              />
              <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <div className="flex items-center gap-3">
                    <Stars size={16} count={featured.stars ?? 5} />
                    {featured.source && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-stone">
                        <span className={`h-1.5 w-1.5 rounded-full ${SOURCE_DOT[featured.source]}`} />
                        Featured · via {featured.source}
                      </span>
                    )}
                  </div>
                  <blockquote className="mt-5 font-display text-xl font-medium leading-snug text-brand md:text-2xl">
                    &ldquo;{featured.text}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="h-px w-8 bg-accent" />
                    <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-accent-dark">
                      {featured.author}
                    </p>
                    {featured.location && (
                      <p className="text-[11px] uppercase tracking-[0.22em] text-stone-light">
                        {featured.location}
                      </p>
                    )}
                    {featured.service && (
                      <span className="rounded-full border border-brand/15 bg-cream-light px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                        {featured.service}
                      </span>
                    )}
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="rounded-2xl border border-brand/10 bg-mist p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                      Ready to Book?
                    </p>
                    <p className="mt-2 text-sm text-stone">
                      Pick a service, location, and time that works for you - booking is open online.
                    </p>
                    <Link
                      href="/contact-us"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5 hover:bg-accent"
                    >
                      Book Appointment
                      <ArrowUpRight size={12} strokeWidth={2.25} />
                    </Link>
                    <a
                      href="tel:6096517436"
                      className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand hover:text-accent-dark"
                    >
                      <Phone size={12} strokeWidth={2.25} />
                      (609) 651-7436
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </FadeUp>
        </div>
      </section>

      {/* MASONRY REVIEW WALL with FILTER */}
      <section className="relative bg-cream-light">
        <div className="mx-auto max-w-[1320px] px-6 pt-12 pb-24 lg:px-10 lg:pt-16 lg:pb-32">
          <FadeUp className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Patient Stories</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-brand md:text-4xl">
                Real words from real patients.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by review source">
              {SOURCES.map((s) => {
                const active = filter === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(s)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition-all ${
                      active
                        ? "border-brand bg-brand text-white shadow-soft"
                        : "border-brand/15 bg-white text-brand hover:border-accent hover:text-accent-dark"
                    }`}
                  >
                    {s !== "All" && (
                      <span className={`h-1.5 w-1.5 rounded-full ${SOURCE_DOT[s] ?? "bg-brand/30"}`} />
                    )}
                    {s}
                    <span className={`text-[10px] font-semibold ${active ? "text-white/70" : "text-stone-light"}`}>
                      {sourceCounts[s] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeUp>

          <div className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {rest.map((r, i) => (
              <motion.article
                key={`${r.author}-${r.source ?? "x"}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4), ease: "easeOut" }}
                className="group rounded-2xl bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-8"
              >
                <div className="flex items-start justify-between gap-3">
                  <Stars count={r.stars ?? 5} />
                  {r.source && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-stone">
                      <span className={`h-1.5 w-1.5 rounded-full ${SOURCE_DOT[r.source]}`} />
                      {r.source}
                    </span>
                  )}
                </div>
                <blockquote className="mt-5 text-[15px] italic leading-relaxed text-stone">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-brand/10 pt-5">
                  <div>
                    <p className="text-sm font-bold text-accent-dark">{r.author}</p>
                    {r.location && (
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-stone-light">
                        {r.location}
                      </p>
                    )}
                  </div>
                  {r.service && (
                    <span className="rounded-full border border-brand/10 bg-cream-light px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand">
                      {r.service}
                    </span>
                  )}
                </footer>
              </motion.article>
            ))}
          </div>

          {rest.length === 0 && (
            <p className="mt-12 text-center text-sm text-stone">
              No reviews yet from {filter}. Try a different source.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, white 1px, transparent 1.2px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">Join Them</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Experience the <span className="font-script font-normal italic text-accent">difference</span>.
            </h2>
            <p className="mt-3 max-w-lg text-sm text-white/70">
              Schedule your visit at our Merchantville, NJ or Chalfont, PA location - or start with a complimentary 15-minute consultation call.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-accent-dark"
            >
              Book Your Appointment
              <ArrowUpRight size={14} />
            </Link>
            <a
              href="tel:8565322063"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 hover:border-accent hover:text-accent"
            >
              <Phone size={12} strokeWidth={2.25} />
              Free Consult Call
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
