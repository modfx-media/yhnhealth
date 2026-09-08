"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Calendar,
  Clock,
  Phone,
  Share2,
  Tag,
} from "lucide-react";
import { Breadcrumbs, FadeUp } from "@/components/page/Primitives";
import {
  getArticleAuthor,
  type Article,
  type ArticleBlock,
} from "@/lib/articlesData";

// Parses inline markdown-style links `[label](href)` into React nodes.
// External URLs open in a new tab; internal paths use next/link.
function renderInline(text: string): React.ReactNode {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    const isExternal = /^https?:\/\//i.test(href);
    if (isExternal) {
      nodes.push(
        <a
          key={`lnk-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent-dark underline decoration-accent/50 decoration-2 underline-offset-4 transition-colors hover:text-accent"
        >
          {label}
        </a>
      );
    } else {
      nodes.push(
        <Link
          key={`lnk-${key++}`}
          href={href}
          className="font-semibold text-accent-dark underline decoration-accent/50 decoration-2 underline-offset-4 transition-colors hover:text-accent"
        >
          {label}
        </Link>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes.length ? nodes : text;
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-relaxed text-stone md:text-lg md:leading-[1.85]">
          {renderInline(block.text)}
        </p>
      );
    case "h2":
      return (
        <h2 className="mt-12 font-display text-2xl font-bold text-brand md:text-3xl">
          {renderInline(block.text)}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 font-display text-xl font-bold text-brand md:text-2xl">
          {renderInline(block.text)}
        </h3>
      );
    case "list":
      return (
        <ul className="mt-2 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base leading-relaxed text-stone md:text-lg"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="my-10 border-l-2 border-accent bg-cream-light px-6 py-7 md:px-8 md:py-8">
          <blockquote className="font-display text-xl italic leading-relaxed text-brand md:text-2xl">
            &ldquo;{renderInline(block.text)}&rdquo;
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-dark"> - {block.cite}
            </figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <aside className="my-8 rounded-2xl border border-brand/10 bg-cream-light p-6 md:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
            {block.title}
          </p>
          <p className="mt-3 text-base leading-relaxed text-brand md:text-lg">
            {renderInline(block.text)}
          </p>
        </aside>
      );
    default:
      return null;
  }
}

export default function ArticlePostClient({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const author = getArticleAuthor(article);

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
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Articles", href: "/articles" },
              { label: article.title },
            ]}
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-brand md:text-5xl lg:text-6xl">
                {article.title}
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
                {article.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={12} className="text-accent-dark" />
                  {article.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={12} className="text-accent-dark" />
                  {article.readTime} min read
                </span>
                <span className="inline-flex items-center gap-2">
                  <BookOpen size={12} className="text-accent-dark" />
                  Your Health Now
                </span>
              </div>

              <Link
                href="/meet-the-doctor"
                className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand hover:text-accent-dark"
              >
                <BadgeCheck size={14} className="text-accent-dark" />
                Written &amp; medically reviewed by {author}
              </Link>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-brand/10 shadow-card">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-16 md:py-20 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <div className="space-y-5 lg:max-w-[720px]">
                {article.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>

              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-brand/10 pt-8 lg:max-w-[720px]">
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand transition-colors hover:text-accent-dark"
                >
                  <ArrowLeft size={13} />
                  All Articles
                </Link>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">
                  <Share2 size={12} className="text-accent-dark" />
                  Share with a friend
                </span>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="rounded-3xl border border-brand/10 bg-cream-light p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                    Talk to the team
                  </p>
                  <p className="mt-3 font-display text-xl font-bold text-brand">
                    Ready to apply this in person?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    Reading is great. Treatment is better. Book a visit at our Merchantville, NJ
                    or Chalfont, PA location.
                  </p>
                  <Link
                    href="/contact-us"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-accent"
                  >
                    Book Appointment
                    <ArrowUpRight size={12} />
                  </Link>
                  <a
                    href="tel:8565322063"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand/15 bg-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand transition-colors hover:border-brand/30"
                  >
                    <Phone size={12} className="text-accent-dark" />
                    (856) 532-2063
                  </a>
                </div>

                <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-card">
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                    Filed under
                  </p>
                  <p className="mt-3 font-display text-base font-bold text-brand">
                    {article.category}
                  </p>
                  <Link
                    href={`/articles?category=${encodeURIComponent(article.category)}`}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-stone hover:text-brand"
                  >
                    Browse more in this category
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-cream-light py-20 md:py-24">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <FadeUp className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                Keep reading
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
                Related articles.
              </h2>
              <div className="mt-4 h-[3px] w-20 bg-accent" />
            </FadeUp>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <motion.article
                  key={r.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <Link href={`/articles/${r.slug}`} className="relative block aspect-[16/10]">
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 380px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                      {r.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold leading-tight text-brand">
                      <Link href={`/articles/${r.slug}`} className="hover:text-accent-dark">
                        {r.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone">
                      {r.excerpt}
                    </p>
                    <Link
                      href={`/articles/${r.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-brand transition-all hover:gap-2.5 hover:text-accent-dark"
                    >
                      Read More
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
