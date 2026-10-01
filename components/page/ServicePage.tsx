"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Breadcrumbs, FadeUp, Parallax } from "@/components/page/Primitives";
import { CLINICS } from "@/lib/pseoData";

export type ServiceSection = { heading?: string; body: string };
export type ServiceBenefit = { icon: LucideIcon; title: string; body?: string };
export type ServiceRelated = { slug: string; label: string };

export type ServiceConfig = {
  slug: string;
  title: string;
  eyebrow?: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  sections: ServiceSection[];
  benefits?: { eyebrow?: string; title: string; items: ServiceBenefit[] };
  related: ServiceRelated[];
};

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function ServicePage({ config }: { config: ServiceConfig }) {
  const { title, eyebrow = "Our Services", intro, imageSrc, imageAlt, sections, benefits, related, slug } = config;
  const isChiropracticMedicine = eyebrow === "Chiropractic Medicine";

  return (
    <main className="bg-white">
        {/* 1 - HERO */}
        <section className="relative overflow-hidden bg-cream-light">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(31,53,99,0.5) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <Parallax speed={80} className="pointer-events-none absolute -right-32 top-12">
            <div className="h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          </Parallax>
          <div className="relative mx-auto max-w-[1320px] px-6 pt-10 pb-16 lg:px-10 lg:pt-14 lg:pb-24">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: title }]} />

            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-dark md:text-xs">
              {eyebrow}
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-brand md:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="mt-6 h-[3px] w-24 rounded-full bg-accent"
            />

            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-3xl text-lg text-stone md:text-xl">{intro}</p>
            </FadeUp>

            <FadeUp delay={0.35}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {isChiropracticMedicine ? (
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-brand-dark hover:shadow-lg"
                  >
                    Contact the Office
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                ) : (
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-brand-dark hover:shadow-lg"
                  >
                    Book Appointment
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                )}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 2 - 2-COL CONTENT */}
        <section className="relative bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="lg:col-span-7"
              >
                <div className="space-y-10">
                  {sections.map((s, i) => (
                    <div key={i}>
                      {s.heading && (
                        <h2 className="font-display text-2xl font-bold leading-tight text-brand md:text-3xl">
                          {s.heading}
                        </h2>
                      )}
                      <p
                        className={`whitespace-pre-line text-base leading-[1.85] text-stone md:text-[17px] ${
                          s.heading ? "mt-5" : ""
                        }`}
                      >
                        {s.body}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className="lg:col-span-5"
              >
                <div className="sticky top-28">
                  <div className="relative aspect-[4/5] lg:aspect-video overflow-hidden rounded-3xl bg-mist shadow-card">
                    <Parallax speed={28} className="absolute inset-0 scale-110">
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </Parallax>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-dark/40 to-transparent" />
                  </div>
                  <div className="mt-5 flex items-center gap-3 rounded-2xl border border-mist bg-cream-light/60 px-5 py-4">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                      Post-graduate trained doctors · NJ & PA
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3 - BENEFITS (optional) */}
        {benefits && benefits.items.length > 0 && (
          <section className="relative bg-cream-light py-20 md:py-28">
            <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
              <FadeUp>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-dark">
                  {benefits.eyebrow ?? "Key Benefits"}
                </p>
                <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-brand md:text-4xl lg:text-[44px]">
                  {benefits.title}
                </h2>
                <div className="mt-5 h-[3px] w-16 rounded-full bg-accent" />
              </FadeUp>

              <motion.div
                variants={cardStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {benefits.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={cardItem}
                      className="group relative overflow-hidden rounded-3xl border border-white bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all group-hover:bg-accent/15" />
                      <div className="relative">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/5 text-brand transition-colors group-hover:bg-accent group-hover:text-white">
                          <Icon size={22} strokeWidth={2} />
                        </div>
                        <h3 className="mt-5 font-display text-lg font-bold text-brand">
                          {item.title}
                        </h3>
                        {item.body && (
                          <p className="mt-2 text-[14px] leading-relaxed text-stone">{item.body}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>
        )}

        {/* 4 - RELATED SERVICES */}
        {related.length > 0 && (
          <section className="bg-white py-20 md:py-24">
            <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <FadeUp>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-dark">
                    Continue Exploring
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-brand md:text-3xl">
                    Related services
                  </h2>
                </FadeUp>
                <Link
                  href="/contact-us"
                  className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand transition-colors hover:text-accent-dark"
                >
                  {isChiropracticMedicine ? "Contact the Office →" : "Book Appointment →"}
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6 }}
                className="mt-10 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:-mx-10 lg:px-10 [scrollbar-width:thin]"
              >
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group relative flex min-w-[260px] max-w-[280px] snap-start flex-col justify-between overflow-hidden rounded-3xl bg-cream-light p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover sm:min-w-[300px]"
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-mist">
                      <Image
                        src={`/images/services/${r.slug}.webp`}
                        alt={r.label}
                        width={400}
                        height={250}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-5 flex items-end justify-between gap-3">
                      <h3 className="font-display text-base font-bold leading-tight text-brand">
                        {r.label}
                      </h3>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors group-hover:bg-accent">
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* 4b - TWO-OFFICE LOCATIONS CARD */}
        <section className="bg-cream-light py-20 md:py-24">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <FadeUp>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent-dark">
                Serving NJ &amp; PA
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-brand md:text-3xl">
                {title} near you.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-stone">
                From our {CLINICS.merchantville.name} and {CLINICS.chalfont.name} clinics, we
                bring this care to patients across South Jersey and Bucks/Montco, PA.
              </p>
              <Link
                href="/locations"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand hover:text-accent-dark"
              >
                See both locations
                <ArrowRight size={13} />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* 5 - NAVY CTA BANNER */}
        <section className="relative overflow-hidden bg-brand text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative mx-auto max-w-[1320px] px-6 py-20 md:py-24 lg:px-10">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <FadeUp className="lg:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
                  Ready to Get Started?
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-[46px]">
                  {isChiropracticMedicine ? "Meet the team behind" : "Schedule your visit and meet the team behind"}{" "}
                  {title
                    .split(" ")
                    .map((w) => (w === w.toUpperCase() ? w : w.toLowerCase()))
                    .join(" ")}
                  .
                </h2>
                <p className="mt-5 max-w-2xl text-white/75">
                  Two locations · Merchantville, NJ and Chalfont, PA. Same-day appointments available.
                </p>
              </FadeUp>

              <FadeUp delay={0.15} className="lg:col-span-5">
                <div className="flex flex-col gap-4">
                  {isChiropracticMedicine ? (
                    <Link
                      href="/contact-us"
                      className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-7 py-4 text-[12px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-accent-dark"
                    >
                      Contact the Office
                      <ArrowRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <Link
                      href="/contact-us"
                      className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-7 py-4 text-[12px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-accent-dark"
                    >
                      Book Your Appointment
                      <ArrowRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:8565322063"
                      className="flex flex-col items-start rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition-colors hover:border-accent hover:bg-white/10"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                        Merchantville, NJ
                      </span>
                      <span className="mt-1 text-base font-bold">(856) 532-2063</span>
                    </a>
                    <a
                      href="tel:6096517436"
                      className="flex flex-col items-start rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition-colors hover:border-accent hover:bg-white/10"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                        Chalfont, PA
                      </span>
                      <span className="mt-1 text-base font-bold">(609) 651-7436</span>
                    </a>
                  </div>
                </div>
              </FadeUp>
            </div>
            <p className="sr-only">Service: {slug}</p>
          </div>
        </section>
      </main>
  );
}
