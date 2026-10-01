"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { useBookingPopup } from "@/components/BookingPopup";

const LOCATIONS = [
  {
    clinic: "Chiropractic Clinic",
    city: "Merchantville",
    state: "NJ",
    phone: "(856) 532-2063",
    phoneHref: "tel:+18565322063",
    address: "5 W Chestnut Ave",
    bookingUrl: "https://yourhealthnow.janeapp.com/locations/mmwc/book#/staff_member/1",
    careHref: "/locations",
  },
  {
    clinic: "Chiropractic Clinic",
    city: "Chalfont",
    state: "PA",
    phone: "(609) 651-7436",
    phoneHref: "tel:+16096517436",
    address: "350 N Main St #201",
    bookingUrl: "https://yourhealthnow.janeapp.com/locations/afc/book#/staff_member/3",
    careHref: "/locations",
  },
];

export default function LocationCTABanner() {
  const { openBooking } = useBookingPopup();
  return (
    <section className="relative grid grid-cols-1 overflow-hidden md:grid-cols-2">
      {LOCATIONS.map((loc, i) => (
        <motion.div
          key={loc.city}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
          className={i === 0 ? "relative bg-brand" : "relative bg-brand-light"}
        >
          {/* Decorative rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full border-2 border-white/10"
          />
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full border border-dashed border-white/15"
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-14 text-center sm:px-8 sm:py-16 md:px-14 md:py-20">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur">
              <MapPin size={12} className="text-accent" strokeWidth={2.25} />
              {loc.clinic} · In-Person
            </span>

            {/* City headline */}
            <h3 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              {loc.city}
              <span className="ml-2 align-middle text-xl font-normal text-accent sm:ml-3 sm:text-2xl md:text-3xl">
                , {loc.state}
              </span>
            </h3>

            <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.28em] text-accent">
              Book an appointment
            </p>

            {/* Contact rows */}
            <div className="mt-7 w-full max-w-md space-y-3">
              <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                  <MapPin size={14} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                    Address
                  </p>
                  <p className="mt-0.5 text-base font-medium text-white">
                    {loc.address}
                  </p>
                </div>
              </div>

              <a
                href={loc.phoneHref}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur transition-colors hover:border-accent/60 hover:bg-white/10"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                  <Phone size={14} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                    Phone
                  </p>
                  <p className="mt-0.5 text-base font-semibold text-white">
                    {loc.phone}
                  </p>
                </div>
              </a>
            </div>

            <Link
              href={loc.careHref}
              className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-white/85 underline-offset-4 hover:text-accent hover:underline"
            >
              Chiropractic care in {loc.city}, {loc.state}
            </Link>

            {/* CTA */}
            <a
              href={loc.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openBooking(loc.bookingUrl);
              }}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-dark shadow-card transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-card-hover"
            >
              Book at this location
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>
      ))}

      {/* Center divider gem */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/10 bg-white text-[10px] font-bold uppercase tracking-[0.24em] text-brand shadow-card md:flex"
      >
        YHN
      </div>
    </section>
  );
}
