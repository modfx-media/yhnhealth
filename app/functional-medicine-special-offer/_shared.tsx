"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Phone, Quote, Star } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Shared constants                                                           */
/* -------------------------------------------------------------------------- */

export const PHONE_NJ = "+1 609-869-9498";
export const PHONE_NJ_TEL = "tel:+16098699498";

export const LP_PATH = "/functional-medicine-special-offer";
export const THANK_YOU_PATH = "/functional-medicine-special-offer/thank-you";

/** Patient stories shown across the Functional Medicine landing-page funnel. */
export const REVIEWS = [
  {
    text: "After my first call I felt heard. The complimentary consultation alone was more thorough than any visit I had with my previous doctor, and that was before I even stepped into the office. They genuinely care about the WHY behind your symptoms.",
    author: "Jessica R.",
    location: "Merchantville, NJ",
    service: "Functional Medicine",
  },
  {
    text: "Chris is incredibly knowledgeable in addressing not just symptoms, but the root causes. My energy and digestion have slowly improved and I'm finally hopeful again. This is the personal, root-cause care you don't find with other doctors.",
    author: "Mark B.",
    location: "Chalfont, PA",
    service: "Root-Cause Care",
  },
  {
    text: "Years of fatigue and brain fog, and every doctor said my labs were 'normal.' Functional lab testing here finally found what was wrong. Months later I feel like myself again. I only wish I'd found them sooner.",
    author: "Hannah P.",
    location: "Telehealth · NJ",
    service: "Functional Lab Testing",
  },
  {
    text: "The telehealth appointments made it so easy to keep up with my plan. Comprehensive testing, a clear protocol, and real follow-up. My hormones and gut health are finally balanced.",
    author: "Daniel K.",
    location: "Telehealth · PA",
    service: "Hormone & Gut Health",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Header — slim branded bar for funnel sub-pages                             */
/* -------------------------------------------------------------------------- */

export function LpHeader({ ctaHref = THANK_YOU_PATH, ctaLabel = "Book Free Consult" }: { ctaHref?: string; ctaLabel?: string }) {
  return (
    <header className="relative z-40 border-b border-brand/10 bg-white/90 backdrop-blur sm:sticky sm:top-0">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-3 lg:px-10">
        <Link href={LP_PATH} aria-label="Your Health Now, back to overview">
          <Image
            src="/images/logo.webp"
            alt="Your Health Now"
            width={130}
            height={44}
            priority
            className="h-auto w-[108px] select-none sm:w-[130px]"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_NJ_TEL}
            className="hidden items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white sm:inline-flex"
          >
            <Phone size={14} className="text-accent-dark" />
            Call {PHONE_NJ}
          </a>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-brand-dark shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:text-white hover:shadow-md sm:gap-2 sm:px-5"
          >
            {ctaLabel}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reviews — patient-stories grid                                             */
/* -------------------------------------------------------------------------- */

export function ReviewsSection({ id = "stories" }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-cream-light py-20 scroll-mt-28 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-dark">
            Patient Stories
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand sm:text-4xl">
            Real people,{" "}
            <span className="font-script text-4xl font-normal text-accent sm:text-5xl">
              real results
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm font-semibold text-stone">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-accent text-accent" />
              ))}
            </span>
            <span>2,000+ patients served across NJ &amp; PA</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <motion.div
              key={r.author}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative h-full rounded-3xl border border-brand/10 bg-white p-7 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <Quote
                size={40}
                className="absolute right-6 top-6 text-accent/15"
                aria-hidden="true"
              />
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} className="fill-accent text-accent" />
                ))}
              </span>
              <p className="relative mt-4 leading-relaxed text-ink">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-brand/10 pt-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-accent">
                  {r.author.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-brand">{r.author}</p>
                  <p className="text-xs text-stone">
                    {r.service} · {r.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                      */
/* -------------------------------------------------------------------------- */

export function LpFooter() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-5 px-5 pb-28 pt-12 text-center sm:pb-12 lg:px-10">
        <Image
          src="/images/logo.webp"
          alt="Your Health Now"
          width={150}
          height={50}
          className="h-auto w-[150px] rounded-lg bg-white/95 px-3 py-2"
        />
        <a
          href={PHONE_NJ_TEL}
          className="inline-flex items-center gap-2 text-lg font-bold text-accent transition-colors hover:text-white"
        >
          <Phone size={16} /> {PHONE_NJ}
        </a>
        <p className="max-w-2xl text-xs leading-relaxed text-white/55">
          © 2026 Your Health Now. All rights reserved. The information on this page is
          for general educational purposes only and is not medical advice. Results vary
          by individual. Telehealth available across NJ &amp; PA.
        </p>
      </div>
    </footer>
  );
}
