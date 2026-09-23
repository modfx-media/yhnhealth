"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { LpHeader, PHONE_NJ, PHONE_NJ_TEL } from "../_shared";

export default function ThankYouPage({
  autoRedirect,
}: {
  autoRedirect: ReactNode;
}) {
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
    <div className="min-h-screen bg-brand-dark">
      <LpHeader
        ctaHref={PHONE_NJ_TEL}
        ctaLabel={`Call ${PHONE_NJ}`}
        showPhone={false}
      />

      <main>
        <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-dark px-5 py-16 text-center text-white">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-2xl">
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
              Thank You! Let&apos;s Get You Scheduled
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base text-white/75 sm:text-lg"
            >
              Please wait while we are redirecting you to the booking page.
            </motion.p>
            {autoRedirect}
          </div>
        </section>
      </main>
    </div>
  );
}
