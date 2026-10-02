"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Calendar,
  FlaskConical,
  MapPin,
  Phone,
  Video,
} from "lucide-react";
import { useBookingPopup } from "@/components/BookingPopup";
import { TELEHEALTH_STATES } from "@/data/telehealth-states";

const FM_BOOKING_URL =
  "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";

const FEATURES = [
  "Personalized clinical protocols",
  "Same depth, same doctor - over secure video",
];

export default function FunctionalMedicineTelehealthBanner() {
  const { openBooking } = useBookingPopup();
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full border-2 border-white/10"
      />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full border border-dashed border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(199,134,49,0.18),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(123,143,181,0.18),transparent_55%)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container relative z-10 grid grid-cols-1 gap-10 py-14 sm:py-16 md:grid-cols-12 md:items-center md:gap-8 md:py-20"
      >
        {/* LEFT - Headline + value */}
        <div className="md:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent backdrop-blur">
            <FlaskConical size={11} strokeWidth={2.25} />
            Functional Medicine · Telehealth
          </span>

          <h3 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Functional medicine,{" "}
            <span className="font-script font-normal italic text-accent">
              wherever you are
            </span>
          </h3>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Doctor-led functional medicine care delivered to{" "}
            <Link href="/functional-medicine#states" className="font-semibold text-white underline decoration-accent/60 underline-offset-4 hover:text-accent">
              9 states nationwide
            </Link>{" "}
            via secure video. No commute, no waiting room - just deep
            root-cause work with Dr. Chris.
          </p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-[13px] font-semibold text-white/85"
              >
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
            {TELEHEALTH_STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/functional-medicine/${state.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur transition-colors hover:border-accent hover:text-accent"
              >
                <MapPin size={12} className="text-accent" strokeWidth={2.25} />
                {state.name}
              </Link>
            ))}
            <Link
              href="/functional-medicine#states"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              <Video size={12} className="text-accent" strokeWidth={2.25} />
              See all states
            </Link>
          </div>
        </div>

        {/* RIGHT - Booking card */}
        <div className="md:col-span-5">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
              Book Functional Medicine
            </p>
            <p className="mt-3 font-display text-2xl font-bold leading-tight text-white">
              Schedule with Dr. Chris
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Telehealth visits open to residents of 9 states. New patients can
              start with a free 30-minute consultation call.
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
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/85">
                    Telehealth Booking
                  </p>
                  <p className="mt-0.5 font-display text-base font-bold text-white">
                    Book a Telehealth Visit
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                  <Calendar size={14} strokeWidth={2.25} />
                </span>
              </a>

              <Link
                href="/functional-medicine"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-white/10"
              >
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                    Learn More
                  </p>
                  <p className="mt-0.5 font-display text-base font-bold text-white">
                    Explore Functional Medicine
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight size={14} strokeWidth={2.25} />
                </span>
              </Link>
            </div>

            <a
              href="tel:6096517436"
              className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/65 transition-colors hover:text-accent"
            >
              <Phone size={12} strokeWidth={2.25} />
              Or call (609) 651-7436
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
