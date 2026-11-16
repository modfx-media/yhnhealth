"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight, Phone } from "lucide-react";
import { useBookingPopup } from "@/components/BookingPopup";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone">
      {trail.map((c, i) => (
        <span key={`${c.label}-${i}`} className="inline-flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={11} className="text-steel/60" strokeWidth={2} />}
          {c.href ? (
            <Link href={c.href} className="text-stone transition-colors hover:text-brand">
              {c.label}
            </Link>
          ) : (
            <span className="text-brand">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/**
 * Inline booking strip - every page calls this so the site keeps a strong CTA.
 * variant lets pages choose a tonal treatment without the strip looking
 * identical on neighbouring pages.
 */
export function BookingStrip({
  variant = "navy",
  eyebrow = "Book Now",
  title = "Ready to feel the difference?",
  copy = "Schedule your visit at our Merchantville, NJ or Chalfont, PA location.",
  fm = false,
  consultHref,
}: {
  variant?: "navy" | "cream" | "gold" | "split";
  eyebrow?: string;
  title?: string;
  copy?: string;
  fm?: boolean;
  /** When set with `fm`, the consult control goes here instead of the booking widget. */
  consultHref?: string;
}) {
  const palettes = {
    navy: "bg-brand text-white",
    cream: "bg-cream-light text-brand",
    gold: "bg-accent text-white",
    split: "bg-gradient-to-r from-brand via-brand-dark to-brand text-white",
  } as const;

  const FM_BOOKING_URL =
    "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";
  const { openBooking } = useBookingPopup();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className={`${palettes[variant]} relative overflow-hidden`}
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center md:py-14 lg:px-10">
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.32em] ${variant === "cream" ? "text-accent-dark" : "text-accent"}`}>
            {eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold leading-tight md:text-3xl">{title}</h2>
          <p className={`mt-2 max-w-xl text-sm ${variant === "cream" ? "text-stone" : "text-white/75"}`}>{copy}</p>
          {!fm && (
            <p className={`mt-2 max-w-xl text-[12px] ${variant === "cream" ? "text-stone-light" : "text-white/55"}`}>
              Prefer to talk first? Start with a free 15-minute consultation call.
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {!fm && (
            <Link
              href="/contact-us"
              className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-[11px] font-bold uppercase tracking-[0.24em] transition-all ${
                variant === "cream"
                  ? "bg-brand text-white hover:bg-brand-dark"
                  : "bg-white text-brand hover:bg-accent hover:text-white"
              }`}
            >
              Book Appointment
            </Link>
          )}
          <a
            href={fm ? (consultHref ?? FM_BOOKING_URL) : "tel:8565322063"}
            target={fm && !consultHref ? "_blank" : undefined}
            rel={fm && !consultHref ? "noopener noreferrer" : undefined}
            onClick={
              fm && !consultHref
                ? (e) => {
                    e.preventDefault();
                    openBooking(FM_BOOKING_URL);
                  }
                : undefined
            }
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors ${
              variant === "cream"
                ? "border-brand/20 text-brand hover:border-accent hover:text-accent-dark"
                : "border-white/25 text-white/85 hover:border-accent hover:text-accent"
            }`}
          >
            <Phone size={12} strokeWidth={2.25} />
            Free Consult Call
          </a>
          {fm && (
            <a
              href="tel:6096517436"
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors ${
                variant === "cream"
                  ? "border-brand/20 text-brand hover:border-accent hover:text-accent-dark"
                  : "border-white/25 text-white/85 hover:border-accent hover:text-accent"
              }`}
            >
              <Phone size={12} strokeWidth={2.25} />
              Call (609) 651-7436
            </a>
          )}
        </div>
      </div>
    </motion.section>
  );
}

/**
 * Lightweight headline animator used by content sections so each page gets a
 * consistent fade-in-up entrance without re-importing motion in every file.
 */
export function FadeUp({
  children,
  delay = 0,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const offset = 36;
  const initial =
    direction === "left"
      ? { opacity: 0, x: -offset, filter: "blur(6px)" }
      : direction === "right"
      ? { opacity: 0, x: offset, filter: "blur(6px)" }
      : direction === "down"
      ? { opacity: 0, y: -offset, filter: "blur(6px)" }
      : { opacity: 0, y: offset, filter: "blur(6px)" };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked parallax wrapper. Children drift vertically as the element
 * moves through the viewport, giving inner pages continuous motion on scroll
 * (not just on hover or a one-shot reveal). `speed` controls travel distance
 * in pixels; negative values move the content the opposite way.
 */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
