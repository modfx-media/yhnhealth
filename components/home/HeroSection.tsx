"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, RotateCw, Sparkles } from "lucide-react";
import { HERO_SLIDES } from "@/lib/siteData";
import { cn } from "@/lib/utils";
import { useBookingPopup } from "@/components/BookingPopup";
import FMCPBadge from "@/components/FMCPBadge";

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const { openBooking } = useBookingPopup();
  const [paused, setPaused] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  const slide = HERO_SLIDES[active];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused]);

  // Reset to front face whenever the slide changes so the new image is seen first.
  useEffect(() => {
    setFlipped(false);
  }, [active]);

  const prev = () =>
    setActive((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setActive((i) => (i + 1) % HERO_SLIDES.length);

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slideshow background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[active].src}
              alt={HERO_SLIDES[active].alt}
              fill
              priority={active === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Brand color overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-brand-dark/85 via-brand/65 to-brand-dark/40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(123,143,181,0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(20,35,72,0.6),transparent_50%)]"
      />

      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-steel/30 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
        }}
        className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pb-32 pt-20 md:py-24 lg:px-10"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-steel-light backdrop-blur"
            >
              <Sparkles size={12} className="text-accent" strokeWidth={2} />
              Chalfont, PA · Merchantville, NJ
            </motion.span>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="mt-7 font-display text-[36px] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[72px]"
            >
              Chiropractor in Chalfont, PA{" "}
              <span className="block sm:inline">&amp; Merchantville, NJ</span>
            </motion.h1>
            <p className="mt-4 font-script text-3xl font-normal italic text-accent sm:text-4xl">
              Health For Every Body
            </p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] md:text-xl"
            >
              Your Health Now is a doctor-led chiropractic and functional
              medicine clinic with offices in Chalfont, Pennsylvania and
              Merchantville, New Jersey. Patients come here for back pain, neck
              pain, sciatica, family adjustments, and root-cause care — not a
              one-size-fits-all visit.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-10 flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-brand-dark transition-colors hover:bg-white"
              >
                Chiropractic in Chalfont
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur transition-colors hover:border-accent hover:text-accent"
              >
                Chiropractic in Merchantville
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/80 hover:text-accent"
              >
                Discover Our Care
              </Link>
            </motion.div>

            {/* Free consultation call note */}
            <motion.a
              href="https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2"
              target="_blank"
              rel="noopener"
              onClick={(e) => {
                e.preventDefault();
                openBooking(
                  "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2"
                );
              }}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
              className="group relative mt-6 inline-flex items-center gap-3 self-start overflow-hidden rounded-full bg-accent px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_18px_45px_-15px_rgba(199,134,49,0.85)] ring-2 ring-accent/40 ring-offset-2 ring-offset-transparent transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_22px_55px_-15px_rgba(199,134,49,1)] sm:px-7 sm:py-4"
            >
              {/* Pulsing halo */}
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 -z-0 rounded-full bg-accent/60"
              />
              {/* Sheen sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full"
              />
              <span className="relative">Book Free Functional Medicine Consultation</span>
              <ChevronRight
                size={14}
                strokeWidth={2.5}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
              Meet with our team to discuss your health concerns, goals,
              symptoms, and treatment options. We&apos;ll help determine the best
              path forward for your unique needs.
            </p>

            {/* Stats strip */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/15 pt-7 sm:mt-14 sm:gap-4"
            >
              {[
                { value: "15+", label: "Years of Care" },
                { value: "20", label: "Specialty Services" },
                { value: "5.0", label: "Patient Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:text-3xl md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:text-[10px] sm:tracking-[0.22em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="mt-8 max-w-2xl text-white"
            >
              <FMCPBadge size={72} />
            </motion.div>
          </div>

          {/* Slide preview flip card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="hidden lg:col-span-4 lg:block"
          >
            <div className="relative ml-auto max-w-sm" style={{ perspective: "1600px" }}>
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-accent/30 to-steel/20 blur-2xl" />
              <button
                type="button"
                aria-label={flipped ? `Hide details for ${slide.title}` : `Show details about ${slide.title}`}
                aria-pressed={flipped}
                onClick={() => setFlipped((v) => !v)}
                className="group relative block aspect-[4/5] w-full text-left focus:outline-none"
              >
                <motion.div
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                  className="relative h-full w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front - slide preview */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <AnimatePresence mode="sync">
                        <motion.div
                          key={`card-${active}`}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={slide.src}
                            alt=""
                            fill
                            sizes="400px"
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/55 to-brand-dark/10" />
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.24em] text-white backdrop-blur transition-colors group-hover:bg-accent">
                        <RotateCw size={10} strokeWidth={2.25} />
                        Tap to flip
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                          {slide.eyebrow}
                        </p>
                        <p className="mt-2 font-display text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                          {slide.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back - per-slide info */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-brand to-brand-dark p-7"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-accent">
                        <Sparkles size={10} strokeWidth={2.25} />
                        {slide.eyebrow}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">
                        {slide.title}
                      </h3>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                        {slide.info}
                      </p>

                      {/* Value points — fill the card and lead the eye toward the CTA */}
                      <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                        {[
                          "Doctor-led, root-cause care",
                          "A plan built around your biology",
                          "In-office care in PA & NJ, telehealth in 9 states",
                        ].map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-[12.5px] leading-snug text-white/85"
                          >
                            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                              <Check size={10} strokeWidth={3} />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {slide.href && (
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                          <motion.span
                            aria-hidden="true"
                            animate={{ y: [0, 4, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-flex"
                          >
                            <ArrowDown size={13} strokeWidth={2.5} />
                          </motion.span>
                          Get started below
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-3">
                        {slide.href ? (
                          <Link
                            href={slide.href}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-card transition-all hover:bg-accent-dark"
                          >
                            {slide.cta ?? "Learn more"}
                            <ArrowUpRight size={12} strokeWidth={2.5} />
                          </Link>
                        ) : (
                          <span className="h-1" />
                        )}
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.24em] text-white">
                          <RotateCw size={10} strokeWidth={2.25} />
                          Flip back
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-6 sm:bottom-8 lg:bottom-10 lg:px-10">
        <div className="flex items-center gap-2 sm:gap-3 text-white/70">
          <span className="font-display text-2xl font-bold text-white sm:text-3xl">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-white/30 sm:w-10" />
          <span className="text-[10px] uppercase tracking-[0.24em] sm:text-[11px] sm:tracking-[0.28em]">
            of {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        <div className="hidden flex-1 items-center gap-1 md:flex">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-[2px] flex-1 transition-all duration-500",
                i === active ? "bg-accent" : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-all hover:border-accent hover:text-accent sm:h-11 sm:w-11"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition-all hover:border-accent hover:text-accent sm:h-11 sm:w-11"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to next section"
        className="absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 text-white/40 hover:text-accent md:block"
      >
        <ChevronDown size={20} />
      </motion.button>
    </section>
  );
}
