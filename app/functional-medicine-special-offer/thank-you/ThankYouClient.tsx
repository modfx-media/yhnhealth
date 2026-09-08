"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  CalendarCheck,
  CheckCircle2,
  Mail,
  Phone,
  PhoneCall,
} from "lucide-react";
import {
  LpHeader,
  LpFooter,
  ReviewsSection,
  PHONE_NJ,
  PHONE_NJ_TEL,
  LP_PATH,
} from "../_shared";

const STEPS = [
  {
    icon: PhoneCall,
    title: "We'll call to confirm",
    copy: "A member of our care team reaches out to lock in the time for your complimentary 30-minute consultation.",
  },
  {
    icon: Mail,
    title: "Check your inbox",
    copy: "You'll receive a confirmation email with everything you need to prepare for your call.",
  },
  {
    icon: CalendarCheck,
    title: "Meet your doctor",
    copy: "We'll dig into the root cause of your symptoms and map out your personalized next step.",
  },
];

export default function ThankYouPage({
  autoRedirect,
}: {
  autoRedirect: ReactNode;
}) {
  // Hide the global Knock Knock chat widget on this standalone funnel page.
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-fm-lp", "hide-chat-widget");
    style.textContent = `
      #knock-knock-widget-container,
      [id*="knock-knock"],
      [class*="knock-knock"],
      iframe[src*="knock-knockapp"],
      #chat-widget,
      .chat-widget,
      [class*="chat-widget"] {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-white font-sans text-ink">
      <LpHeader
        ctaHref={PHONE_NJ_TEL}
        ctaLabel={`Call ${PHONE_NJ}`}
        showPhone={false}
      />

      <main>
        {/* ----------------------------------------------------------------- */}
        {/*  Confirmation hero                                                */}
        {/* ----------------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-dark py-20 text-white lg:py-28">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-2xl px-5 text-center lg:px-10">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30"
            >
              <CheckCircle2 size={40} />
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]"
            >
              You&apos;re all set,{" "}
              <span className="font-script text-4xl font-normal text-accent sm:text-5xl">
                thank you!
              </span>
            </motion.h1>
            {autoRedirect}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-lg text-white/70"
            >
              Your request for a free functional medicine consultation has been received.
              Our team will be in touch shortly to confirm the details.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 flex justify-center"
            >
              <a
                href={PHONE_NJ_TEL}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all hover:border-accent hover:text-accent"
              >
                <Phone size={15} /> Call {PHONE_NJ}
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4"
            >
              <Link
                href={LP_PATH}
                className="text-xs font-semibold text-white/50 underline-offset-4 hover:text-white hover:underline"
              >
                Back to overview
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/*  What happens next                                               */}
        {/* ----------------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-24">
          <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                What Happens Next
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand sm:text-4xl">
                Three simple steps
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative h-full rounded-3xl border border-brand/10 bg-cream-light p-7 shadow-card"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-accent">
                    <s.icon size={22} />
                  </span>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent-dark">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-brand">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{s.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/*  Patient stories                                                  */}
        {/* ----------------------------------------------------------------- */}
        <ReviewsSection />
      </main>

      <LpFooter />
    </div>
  );
}
