"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, Phone, MapPin, ArrowUpRight, FlaskConical, Video, Calendar } from "lucide-react";
import { HOURS, LOCATIONS } from "@/lib/siteData";
import { useBookingPopup } from "@/components/BookingPopup";

const FM_BOOKING_URL =
  "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";

type IconProps = { size?: number };

function FacebookIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YelpIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.5 2.1c-.3 0-3.6.7-4.6 1.6-.4.4-.5 1-.3 1.5l3.7 7c.4.7 1.5.4 1.5-.4V2.9c0-.4-.3-.8-.8-.8h.5zM4.6 9.5c-.4 0-.7.3-.7.7v3.6c0 .4.3.7.7.7h.1l4.7-1.3c.7-.2.7-1.2 0-1.4l-4.4-2.2c-.1-.1-.3-.1-.4-.1zm14.7 0c-.4 0-.7.2-1.1.4l-3.4 2.1c-.6.4-.4 1.3.3 1.5l4.6 1.3c.5.1 1-.2 1-.7V11c0-.4-.3-.7-.7-.7h-.7zm-7.6 5.2c-.4 0-.8.4-.8.8v6c0 .4.3.8.8.8.3 0 3.6-.7 4.6-1.6.4-.4.5-1 .3-1.5l-3.7-7c-.2-.3-.5-.5-.8-.5h-.4z"/>
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, { Icon: (p: IconProps) => ReactElement; label: string }> = {
  facebook: { Icon: FacebookIcon, label: "Facebook" },
  instagram: { Icon: InstagramIcon, label: "Instagram" },
  linkedin: { Icon: LinkedinIcon, label: "LinkedIn" },
  yelp: { Icon: YelpIcon, label: "Yelp" },
};

export default function HoursContactSection() {
  const { openBooking } = useBookingPopup();
  return (
    <section className="relative overflow-hidden bg-cream-light py-20 md:py-24 lg:py-28">
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Hours card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative h-full overflow-hidden rounded-3xl border border-brand/10 bg-white p-8 shadow-soft md:p-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                  <Clock size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-dark">
                    Office Hours
                  </p>
                  <h3 className="font-display text-2xl font-bold text-brand">
                    When we&rsquo;re open
                  </h3>
                </div>
              </div>

              <ul className="mt-8 divide-y divide-brand/10">
                {HOURS.map((h, i) => (
                  <motion.li
                    key={h.day}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center justify-between py-3.5"
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
                      {h.day}
                    </span>
                    <span
                      className={
                        h.open
                          ? "text-sm font-medium text-stone"
                          : "text-[11px] font-bold uppercase tracking-[0.22em] text-accent-dark"
                      }
                    >
                      {h.hours}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl bg-mist p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-dark">
                  Need urgent care?
                </p>
                <p className="mt-1 text-sm text-stone">
                  Call your nearest location to schedule a same-day visit.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-accent/20 bg-accent/5 p-5">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-dark">
                  <Video size={12} strokeWidth={2.25} />
                  Functional Medicine Telehealth
                </p>
                <p className="mt-1 text-sm text-stone">
                  Telehealth visits with Dr. Chris are scheduled by appointment
                  and run independently of office hours. Available across 9
                  states nationwide.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Locations stack */}
          <div className="space-y-6 lg:col-span-7">
            {LOCATIONS.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-brand/10 bg-white p-8 shadow-soft transition-shadow duration-500 hover:shadow-card-hover md:p-10"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mist opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-dark">
                      {i === 0 ? "New Jersey" : "Pennsylvania"}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-bold text-brand md:text-4xl">
                      {loc.name}
                    </h3>
                    <div className="mt-5 space-y-3">
                      <p className="flex items-start gap-3 text-sm text-stone">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-accent"
                          strokeWidth={1.75}
                        />
                        {loc.address}
                      </p>
                      <a
                        href={loc.tel}
                        className="flex items-center gap-3 text-sm font-semibold text-brand hover:text-accent-dark"
                      >
                        <Phone
                          size={16}
                          className="shrink-0 text-accent"
                          strokeWidth={1.75}
                        />
                        {loc.phone}
                      </a>
                    </div>

                    {/* Per-location socials */}
                    <div className="mt-5 flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-light">
                        Follow this location
                      </span>
                      <span className="h-px flex-1 bg-brand/10" />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {(["facebook", "instagram", "linkedin", "yelp"] as const).map((key) => {
                        const url = (loc.social as Record<string, string | undefined>)[key];
                        if (!url) return null;
                        const { Icon, label } = SOCIAL_ICONS[key];
                        return (
                          <Link
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${loc.name} on ${label}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand/15 bg-white text-brand transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
                          >
                            <Icon size={14} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href={loc.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openBooking(loc.bookingUrl);
                      }}
                      className="group/btn inline-flex items-center justify-center gap-3 rounded-full bg-brand px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-light"
                    >
                      Book Online
                      <ArrowUpRight
                        size={12}
                        className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </Link>
                    <Link
                      href={loc.social.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-brand transition-colors hover:border-accent hover:text-accent-dark"
                    >
                      Get Directions
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* FM Telehealth - third "location" */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: LOCATIONS.length * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-accent/30 bg-brand p-8 shadow-card transition-shadow duration-500 hover:shadow-card-hover md:p-10"
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                    <FlaskConical size={11} strokeWidth={2.25} />
                    9 States Nationwide
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
                    Functional Medicine Telehealth
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                    Doctor-led functional medicine care with Dr. Chris,
                    delivered via secure video. Open to residents in{" "}
                    <Link href="/functional-medicine#states" className="font-semibold text-white underline decoration-accent/60 underline-offset-4 hover:text-accent">
                      9 states
                    </Link>{" "}
                    - no commute, no waiting room.
                  </p>
                  <div className="mt-5 space-y-3">
                    <p className="flex items-start gap-3 text-sm text-white/80">
                      <Video
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                        strokeWidth={1.75}
                      />
                      Secure video visits · scheduled by appointment
                    </p>
                    <p className="flex items-start gap-3 text-sm text-white/80">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                        strokeWidth={1.75}
                      />
                      Available in 9 states nationwide
                    </p>
                    <a
                      href="tel:6096517436"
                      className="flex items-center gap-3 text-sm font-semibold text-white hover:text-accent"
                    >
                      <Phone
                        size={16}
                        className="shrink-0 text-accent"
                        strokeWidth={1.75}
                      />
                      (609) 651-7436
                    </a>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                      Free 30-min consult available
                    </span>
                    <span className="h-px flex-1 bg-white/15" />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href={FM_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      openBooking(FM_BOOKING_URL);
                    }}
                    className="group/btn inline-flex items-center justify-center gap-3 rounded-full bg-accent px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                  >
                    <Calendar size={12} strokeWidth={2.25} />
                    Book Telehealth
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </Link>
                  <Link
                    href="/functional-medicine"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:border-accent hover:text-accent"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
