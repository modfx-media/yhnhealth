"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Phone, Clock, Mail, FlaskConical, Video } from "lucide-react";
import { Breadcrumbs, FadeUp } from "@/components/page/Primitives";
import { useBookingPopup } from "@/components/BookingPopup";

type Loc = {
  clinic: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  tel: string;
  bookingUrl: string;
  mapEmbed: string;
  directionsUrl: string;
};

const LOCATIONS: Loc[] = [
  {
    clinic: "Chiropractic Clinic 1",
    city: "Merchantville",
    state: "NJ",
    address: "5 W Chestnut Ave, Merchantville, NJ 08109",
    phone: "(856) 532-2063",
    tel: "tel:8565322063",
    bookingUrl: "https://yourhealthnow.janeapp.com/locations/mmwc/book#/staff_member/1",
    mapEmbed:
      "https://www.google.com/maps?q=5+W+Chestnut+Ave,+Merchantville,+NJ+08109&output=embed",
    directionsUrl: "https://maps.app.goo.gl/eZph1e6LanqehCXF8",
  },
  {
    clinic: "Chiropractic Clinic 2",
    city: "Chalfont",
    state: "PA",
    address: "350 N Main St #201, Chalfont, PA 18914",
    phone: "(609) 651-7436",
    tel: "tel:6096517436",
    bookingUrl: "https://yourhealthnow.janeapp.com/locations/afc/book#/staff_member/3",
    mapEmbed:
      "https://www.google.com/maps?q=350+N+Main+St+%23201,+Chalfont,+PA+18914&output=embed",
    directionsUrl: "https://maps.app.goo.gl/XZTDgRGTwdgtHUgS6",
  },
];

const HOURS = [
  { day: "Monday", time: "7:30 am – 8:00 pm" },
  { day: "Tuesday", time: "7:30 am – 8:00 pm" },
  { day: "Wednesday", time: "7:30 am – 8:00 pm" },
  { day: "Thursday", time: "7:30 am – 8:00 pm" },
  { day: "Friday", time: "7:30 am – 8:00 pm" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

const FM_BOOKING_URL =
  "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";

const FM_REGION_MAP =
  "https://www.google.com/maps?q=Pennsylvania+and+New+Jersey,+USA&z=7&output=embed";

export default function LocationsClient() {
  const { openBooking } = useBookingPopup();
  return (
    <main className="bg-cream-light">
      {/* HERO - full-width navy banner */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, white 1px, transparent 1.2px), radial-gradient(circle at 75% 70%, white 1px, transparent 1.2px)",
            backgroundSize: "44px 44px, 64px 64px",
          }}
        />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-accent/20 via-accent/5 to-transparent blur-3xl"
        />

        <div className="relative mx-auto max-w-[1320px] px-6 pt-12 pb-24 lg:px-10 lg:pt-16 lg:pb-32">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Locations" }]} />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-accent backdrop-blur-sm"
          >
            <MapPin size={11} />
            NJ &amp; PA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-4xl font-display text-6xl font-bold leading-[0.92] tracking-tight md:text-7xl lg:text-[7.5rem]"
          >
            Our <span className="font-script font-normal italic text-accent">Locations.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/75"
          >
            Two convenient locations to serve you - one in South Jersey, one in Bucks County. Same care, same standard, wherever you are.
          </motion.p>
        </div>
      </section>

      {/* LOCATION CARDS - 2-col side-by-side */}
      <section className="relative">
        <div className="mx-auto max-w-[1320px] px-6 -mt-16 pb-20 lg:px-10 lg:-mt-20 lg:pb-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {LOCATIONS.map((loc, i) => {
              const fromLeft = i === 0;
              return (
                <motion.article
                  key={loc.city}
                  initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="overflow-hidden rounded-3xl bg-white shadow-card transition-all hover:shadow-card-hover"
                >
                  {/* navy top accent bar */}
                  <div className="relative bg-brand-dark px-7 py-6 text-white md:px-9">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                          {loc.clinic} · {loc.state}
                        </p>
                        <h2 className="mt-1 font-display text-3xl font-bold leading-tight md:text-4xl">
                          {loc.city}
                        </h2>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                          In-Person Visits
                        </p>
                      </div>
                      <span className="font-display text-5xl font-bold leading-none text-accent/40 md:text-6xl">
                        0{i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Map embed */}
                  <div className="relative aspect-[16/10] w-full bg-mist">
                    <iframe
                      src={loc.mapEmbed}
                      title={`Map of ${loc.city} office`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0"
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-5 px-7 py-7 md:px-9 md:py-9">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-accent-dark">
                        <MapPin size={15} strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone">
                          Address
                        </p>
                        <p className="mt-1 text-sm font-semibold text-brand">{loc.address}</p>
                        <a
                          href={loc.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-dark hover:text-accent"
                        >
                          Get directions
                          <ArrowUpRight size={12} />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-accent-dark">
                        <Phone size={15} strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone">
                          Phone
                        </p>
                        <a href={loc.tel} className="mt-1 block text-sm font-semibold text-brand hover:text-accent-dark">
                          {loc.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={loc.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          openBooking(loc.bookingUrl);
                        }}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-accent-dark"
                      >
                        <Calendar size={13} strokeWidth={2.5} />
                        Book at this location
                        <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </a>
                      <Link
                        href="/contact-us"
                        className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand hover:text-accent-dark"
                      >
                        Send a message
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FUNCTIONAL MEDICINE - TELEHEALTH STATEWIDE */}
      <section className="relative bg-cream-light">
        <div className="mx-auto max-w-[1320px] px-6 pb-20 lg:px-10 lg:pb-28">
          <FadeUp>
            <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                  <FlaskConical size={11} strokeWidth={2.25} />
                  Functional Medicine · Telehealth
                </p>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-brand md:text-4xl lg:text-[44px]">
                  Serving all of <span className="font-script font-normal italic text-accent">PA &amp; NJ.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-stone md:text-right">
                Dr. Chris sees functional medicine patients via secure video visit anywhere in Pennsylvania and New Jersey - no in-person visit required.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <article className="mt-10 overflow-hidden rounded-3xl bg-white shadow-card">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Map */}
                <div className="relative aspect-[16/10] w-full bg-mist lg:col-span-7 lg:aspect-auto">
                  <iframe
                    src={FM_REGION_MAP}
                    title="Pennsylvania and New Jersey service area"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                  <div className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-white shadow-card">
                    <Video size={11} strokeWidth={2.5} />
                    PA &amp; NJ Coverage
                  </div>
                </div>

                {/* Details */}
                <div className="bg-brand-dark px-7 py-9 text-white md:px-9 md:py-11 lg:col-span-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
                    Telehealth · Statewide
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">
                    Functional medicine, wherever you are.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/75">
                    Doctor-led functional medicine with Dr. Chris. Available to residents anywhere in Pennsylvania and New Jersey via secure video visit.
                  </p>

                  <div className="mt-7 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent">
                        <Video size={15} strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                          Format
                        </p>
                        <p className="mt-1 text-sm font-semibold">Secure video visits - no clinic visit required</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent">
                        <MapPin size={15} strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                          Coverage
                        </p>
                        <p className="mt-1 text-sm font-semibold">All of Pennsylvania &amp; New Jersey</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent">
                        <Phone size={15} strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                          Schedule by phone
                        </p>
                        <a href="tel:6096517436" className="mt-1 block text-sm font-semibold hover:text-accent">
                          (609) 651-7436
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={FM_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openBooking(FM_BOOKING_URL);
                      }}
                      className="group inline-flex items-center justify-between gap-3 rounded-full bg-accent px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-accent-dark"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Calendar size={13} strokeWidth={2.5} />
                        Book Free 30-Min Consult
                      </span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <Link
                      href="/functional-medicine"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/85 transition-colors hover:border-accent hover:text-accent"
                    >
                      Explore Functional Medicine
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </FadeUp>
        </div>
      </section>

      {/* SHARED HOURS TABLE */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-[1100px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <FadeUp className="lg:col-span-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                <Clock size={18} strokeWidth={1.75} />
              </span>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                Hours
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-brand md:text-4xl">
                Same hours at both offices.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
                Open early, close late - built around the schedules of working families and professionals across NJ and PA.
              </p>
              <a
                href="mailto:info@yhnhealth.com"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand hover:text-accent-dark"
              >
                <Mail size={12} strokeWidth={2} />
                info@yhnhealth.com
              </a>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-7">
              <ul className="overflow-hidden rounded-2xl border border-brand/10 bg-cream-light">
                {HOURS.map((h, i) => {
                  const closed = h.time === "Closed";
                  return (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between px-6 py-4 text-sm md:px-8 md:py-5 ${
                        i !== HOURS.length - 1 ? "border-b border-brand/10" : ""
                      } ${closed ? "bg-white/50" : ""}`}
                    >
                      <span className="font-bold uppercase tracking-[0.18em] text-brand">{h.day}</span>
                      <span className={`text-sm ${closed ? "text-stone/70" : "font-semibold text-accent-dark"}`}>
                        {h.time}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
