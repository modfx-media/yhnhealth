"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  FlaskConical,
  MapPin,
  PhoneCall,
  Video,
} from "lucide-react";
import { useBookingPopup } from "@/components/BookingPopup";

const FM_BOOKING_URL =
  "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";

const BENEFITS = [
  "Speak directly with Dr. Chris",
  "Review your goals & symptoms",
  "See if functional medicine fits",
];

const CASES = [
  "Fatigue & low energy",
  "Hormone & thyroid concerns",
  "Gut & digestive issues",
  "Autoimmune & inflammation",
  "Chronic Lyme & complex illness",
  "Brain fog & sleep issues",
];

export default function ConsultationCallBanner() {
  const { openBooking } = useBookingPopup();
  return (
    <section className="relative overflow-hidden bg-cream-light py-16 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-brand/10 bg-white p-8 shadow-card md:p-12"
        >
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-dashed border-brand/10"
          />

          <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-dark">
                <FlaskConical size={12} strokeWidth={2.25} />
                Functional Medicine · Telehealth
              </span>

              <h2 className="mt-6 font-display text-3xl font-bold leading-[1.1] text-brand md:text-4xl lg:text-5xl">
                Free 30-Min{" "}
                <span className="font-script font-normal italic text-accent">
                  Consultation Call
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-stone md:text-lg">
                Wondering if functional medicine is the right path for your
                chronic symptoms? Start with a complimentary 30-minute phone
                consultation with Dr. Chris, no waiting room, no
                in-person visit required. Open to residents in{" "}
                <Link href="/functional-medicine#states" className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark">
                  9 states nationwide
                </Link>
                .
              </p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                {BENEFITS.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-[13px] font-semibold text-brand"
                  >
                    <CheckCircle2
                      size={14}
                      className="shrink-0 text-accent"
                      strokeWidth={2.25}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl border border-brand/10 bg-cream-light p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                  Common reasons patients call
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {CASES.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-2 text-[13px] text-stone"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-brand/10 bg-cream-light p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                  Schedule Your Free Consult
                </p>
                <p className="mt-3 font-display text-xl font-bold leading-tight text-brand md:text-2xl">
                  30 minutes with Dr. Chris
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  Functional medicine telehealth visits available across 9
                  states nationwide. Pick a time that works for you.
                </p>

                <div className="mt-5 space-y-3">
                  <a
                    href={FM_BOOKING_URL}
                    target="_blank"
                    rel="noopener"
                    onClick={(e) => {
                      e.preventDefault();
                      openBooking(FM_BOOKING_URL);
                    }}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-accent bg-accent px-5 py-4 transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-card"
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/85">
                        Free 30-Min Consult
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-white">
                        Book with Dr. Chris
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                      <Calendar size={14} strokeWidth={2.25} />
                    </span>
                  </a>

                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-brand/10 bg-white px-5 py-4">
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent-dark">
                        Telehealth Coverage
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-brand">
                        <MapPin
                          size={13}
                          className="text-accent"
                          strokeWidth={2.25}
                        />
                        9 States Nationwide
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/5 text-brand">
                      <Video size={14} strokeWidth={2.25} />
                    </span>
                  </div>

                  <a
                    href="tel:6096517436"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-brand/10 bg-white px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
                  >
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent-dark">
                        Prefer to call?
                      </p>
                      <p className="mt-1 font-display text-base font-bold text-brand">
                        (609) 651-7436
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors group-hover:bg-accent">
                      <PhoneCall size={14} strokeWidth={2.25} />
                    </span>
                  </a>
                </div>

                <a
                  href="/contact-us"
                  className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-stone hover:text-accent-dark"
                >
                  Prefer email? Send a message
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
