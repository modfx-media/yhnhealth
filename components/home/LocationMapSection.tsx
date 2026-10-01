"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, ArrowUpRight, Calendar, FlaskConical, Video, Navigation } from "lucide-react";
import { LOCATIONS } from "@/lib/siteData";
import { useBookingPopup } from "@/components/BookingPopup";

const FM_BOOKING_URL =
  "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";

const MAPS = [
  {
    name: "Merchantville, NJ",
    embed:
      "https://www.google.com/maps?q=5+W+Chestnut+Ave,+Merchantville,+NJ+08109&output=embed",
    href: LOCATIONS[0].social.maps,
    address: LOCATIONS[0].address,
  },
  {
    name: "Chalfont, PA",
    embed:
      "https://www.google.com/maps?q=350+N+Main+St,+Chalfont,+PA+18914&output=embed",
    href: LOCATIONS[1].social.maps,
    address: LOCATIONS[1].address,
  },
];

const PA_NJ_REGION_EMBED =
  "https://www.google.com/maps?q=United+States&z=4&output=embed";

export default function LocationMapSection() {
  const { openBooking } = useBookingPopup();
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-mist px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-dark">
            <MapPin size={11} className="text-accent" strokeWidth={2} />
            Find Us
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-brand md:text-5xl">
            Two clinics + telehealth,{" "}
            <span className="font-script font-normal italic text-accent">
              one mission
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Visit us in person at our Merchantville, NJ or Chalfont, PA
            chiropractic offices, or see Dr. Chris from anywhere in{" "}
            <Link href="/functional-medicine#states" className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark">
              9 states nationwide
            </Link>{" "}
            via secure functional medicine telehealth.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {MAPS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover"
            >
              <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand backdrop-blur">
                <MapPin size={10} className="text-accent" strokeWidth={2.25} />
                Chiropractic
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist">
                <iframe
                  src={m.embed}
                  title={`Map of ${m.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale transition-all duration-700 group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-dark">
                    Chiropractic Clinic · 0{i + 1}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-brand md:text-2xl">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm text-stone">{m.address}</p>
                </div>
                <div className="flex items-center gap-3 md:shrink-0">
                  <Link
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to ${m.name}`}
                    className="group/dir inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent"
                  >
                    <Navigation size={12} strokeWidth={2.25} />
                    Get Directions
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-300 group-hover/dir:translate-x-0.5 group-hover/dir:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FM Telehealth coverage card, nationwide (9 states) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 grid grid-cols-1 overflow-hidden rounded-3xl border border-accent/30 bg-brand shadow-card lg:grid-cols-12"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist lg:aspect-auto lg:col-span-7">
            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
              <FlaskConical size={10} strokeWidth={2.25} />
              Functional Medicine · Telehealth
            </div>
            <iframe
              src={PA_NJ_REGION_EMBED}
              title="Functional medicine telehealth coverage area: 9 states nationwide"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full opacity-90 grayscale transition-all duration-700 hover:grayscale-0"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand/40 to-transparent"
            />
          </div>

          <div className="flex flex-col justify-between gap-6 p-8 text-white md:p-10 lg:col-span-5">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                <Video size={11} strokeWidth={2.25} />
                Nationwide Coverage
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                Available in{" "}
                <span className="font-script font-normal italic text-accent">
                  9 states
                </span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75 md:text-base">
                Functional medicine consults with Dr. Chris are delivered via
                secure video, so you don&rsquo;t need to live near our
                Merchantville or Chalfont offices. New patients can start with a
                free 30-minute consultation call.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur">
                  <MapPin size={11} className="text-accent" strokeWidth={2.25} />
                  9 States Nationwide
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur">
                  <Video size={11} className="text-accent" strokeWidth={2.25} />
                  Secure Video
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={FM_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openBooking(FM_BOOKING_URL);
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                <Calendar size={12} strokeWidth={2.25} />
                Book Telehealth
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                href="/functional-medicine"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:border-accent hover:text-accent"
              >
                Explore Functional Medicine
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
