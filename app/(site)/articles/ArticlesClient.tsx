"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, BookOpen, Calendar, Clock, Search } from "lucide-react";
import { Breadcrumbs, BookingStrip, FadeUp } from "@/components/page/Primitives";
import { ARTICLE_CATEGORIES, type Article } from "@/lib/articlesData";

function ArticlesIndex({ articles }: { articles: Article[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const [active, setActive] = useState<string>(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...articles].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    if (active !== "All") list = list.filter((a) => a.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [active, query, articles]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream-light">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(31,53,99,0.5) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-12 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1320px] px-6 pt-10 pb-16 lg:px-10 lg:pt-14 lg:pb-20">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Articles" }]} />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                <BookOpen className="h-3.5 w-3.5" />
                Newsletter Library
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-brand md:text-5xl lg:text-6xl">
                Read &amp; <span className="font-script font-normal italic text-accent">recover.</span>
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                style={{ transformOrigin: "left" }}
                className="mt-6 h-[3px] w-24 bg-accent"
              />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
                Practical chiropractic, functional medicine, nutrition, and recovery guidance from
                our team. {articles.length} articles across {ARTICLE_CATEGORIES.length} categories - updated regularly.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-5">
              <div className="flex items-center gap-3 rounded-full border border-brand/15 bg-white px-5 py-3.5 shadow-card">
                <Search size={16} className="text-stone" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles…"
                  className="w-full bg-transparent text-sm text-brand placeholder:text-stone focus:outline-none"
                />
              </div>
              <p className="mt-3 text-xs text-stone">
                {filtered.length} of {articles.length} articles
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS */}
      <section className="sticky top-[72px] z-20 border-y border-brand/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-2 px-6 py-4 lg:px-10">
          {["All", ...ARTICLE_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-all ${
                active === c
                  ? "bg-brand text-white"
                  : "border border-brand/15 bg-cream-light text-stone hover:border-brand/30 hover:text-brand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-6 pt-16 lg:px-10 lg:pt-20">
            <FadeUp>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                Featured Article
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <Link
                href={`/articles/${featured.slug}`}
                className="group mt-6 grid gap-8 overflow-hidden rounded-3xl border border-brand/10 bg-cream-light shadow-card transition-all hover:shadow-card-hover lg:grid-cols-12"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 760px, 100vw"
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-col justify-center px-7 pb-8 pt-2 lg:col-span-5 lg:py-10 lg:pr-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                    {featured.category}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-brand md:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-stone">{featured.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={11} className="text-accent-dark" />
                      {featured.date}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock size={11} className="text-accent-dark" />
                      {featured.readTime} min read
                    </span>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-brand transition-all group-hover:gap-2.5 group-hover:text-accent-dark">
                    Read Article
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            </FadeUp>
          </div>
        </section>
      )}

      {/* GRID */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-20">
          {rest.length === 0 && filtered.length === 0 ? (
            <div className="rounded-3xl border border-brand/10 bg-cream-light p-12 text-center">
              <p className="font-display text-2xl font-bold text-brand">
                No articles match that search.
              </p>
              <p className="mt-3 text-sm text-stone">
                Try a different keyword or browse a category above.
              </p>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => (
                <motion.article
                  key={a.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <Link href={`/articles/${a.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent-dark">
                      {a.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold leading-tight text-brand">
                      <Link
                        href={`/articles/${a.slug}`}
                        className="transition-colors hover:text-accent-dark"
                      >
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">{a.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-brand/10 pt-4">
                      <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone">
                        <Clock size={11} className="text-accent-dark" />
                        {a.readTime} min · {a.date}
                      </span>
                      <Link
                        href={`/articles/${a.slug}`}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-brand transition-all group-hover:gap-2.5 group-hover:text-accent-dark"
                      >
                        Read
                        <ArrowUpRight size={11} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <BookingStrip
        variant="cream"
        eyebrow="Get Care"
        title="Reading is great. Treatment is better."
        copy="Apply what you learn. Book a visit at Merchantville, NJ or Chalfont, PA."
      />
    </main>
  );
}

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  return (
    <Suspense fallback={null}>
      <ArticlesIndex articles={articles} />
    </Suspense>
  );
}
