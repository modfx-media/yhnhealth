"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart, Sparkles, Shield } from "lucide-react";

const PARAGRAPHS = [
  "We pair functional medicine with chiropractic care so you get the deeper picture and the hands-on relief - a personalized care plan, clinical protocols, root-cause investigation, and precise in-clinic care all under one roof.",
  "For chronic conditions, complex illness, fatigue, or hormone and digestive concerns, our doctor-led functional medicine protocols look upstream of your symptoms first. For pain, mobility, and nervous-system care, our chiropractic team delivers patient-specific adjustments and soft-tissue work.",
  "True health care is proactive, preventative, and an ongoing experience we share with our patients - whether you come in for an adjustment, a results review, or both.",
];

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const PILLS = [
  { icon: Sparkles, label: "Functional Medicine" },
  { icon: Heart, label: "Chiropractic Care" },
  { icon: Shield, label: "Root-Cause Solutions" },
];

export default function WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-cream-light py-20 md:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-steel-soft/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12 lg:px-10">
        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative aspect-[5/6] w-full max-w-lg overflow-hidden rounded-[28px] shadow-card-hover sm:rounded-[40px]">
            <Image
              src="/images/yhn-clone/your-health-now.jpg"
              alt="Functional medicine and chiropractic care at Your Health Now"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/30 via-transparent to-transparent" />
          </div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute -right-4 top-12 hidden rounded-2xl border border-brand/10 bg-white/95 p-5 shadow-card backdrop-blur md:block"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-dark">
              Trusted Care
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-brand">
              <Counter end={15} suffix="+" />
            </p>
            <p className="mt-1 text-xs text-stone">Years of Practice</p>
          </motion.div>

          {/* Floating pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-full border border-brand/10 bg-white px-5 py-3 shadow-card md:inline-flex"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
              <Heart size={14} fill="currentColor" />
            </span>
            <div>
              <p className="font-display text-base font-semibold text-brand">
                Root-Cause Care
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone-light">
                Functional Medicine + Chiropractic
              </p>
            </div>
          </motion.div>

          {/* Decorative accent rings */}
          <div
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full border-2 border-accent/30"
          />
          <div
            aria-hidden="true"
            className="absolute -top-6 -left-6 -z-10 h-24 w-24 rounded-full border-2 border-brand/15"
          />
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-brand/15 bg-white px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-dark">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Your Health Now
          </span>

          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-brand md:text-5xl lg:text-6xl">
            Welcome to{" "}
            <span className="font-script font-normal italic text-accent">
              your health
            </span>{" "}
            now
          </h2>

          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-stone">
            <p>
              If you need a chiropractor in Chalfont, PA or Merchantville, NJ,
              you are in the right place. Care is delivered by named doctors —
              Dr. Chris, Dr. Marc, and Dr. Lillee Chianese — not a rotating
              associate you never meet twice.
            </p>
            {PARAGRAPHS.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {PILLS.map((pill) => {
              const Icon = pill.icon;
              return (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-2 text-xs font-semibold text-brand shadow-soft"
                >
                  <Icon size={13} className="text-accent" strokeWidth={2} />
                  {pill.label}
                </span>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-card-hover"
            >
              Schedule a Visit
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/family-chiropractic-care"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand hover:text-accent-dark"
            >
              Chiropractic care
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/functional-medicine"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand hover:text-accent-dark"
            >
              Explore functional medicine
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
