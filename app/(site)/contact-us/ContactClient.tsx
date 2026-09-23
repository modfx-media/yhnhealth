"use client";

import { motion } from "motion/react";
import Script from "next/script";
import { Phone, MapPin, Calendar, ArrowUpRight, Video, Clock, Navigation } from "lucide-react";
import { Breadcrumbs } from "@/components/page/Primitives";
import { useBookingPopup } from "@/components/BookingPopup";
import { LOCATIONS } from "@/lib/siteData";

const MAP_EMBEDS: Record<string, string> = {
  Merchantville:
    "https://www.google.com/maps?q=5+W+Chestnut+Ave,+Merchantville,+NJ+08109&output=embed",
  Chalfont:
    "https://www.google.com/maps?q=350+N+Main+St+%23201,+Chalfont,+PA+18914&output=embed",
};

const LOCATION_STATE: Record<string, string> = {
  Merchantville: "NJ",
  Chalfont: "PA",
};

const FM_BOOKING_URL =
  "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";

export default function ContactClient() {
  const { openBooking } = useBookingPopup();
  return (
    <main className="bg-cream-light">
      <section className="relative bg-white">
        <div className="mx-auto max-w-[1320px] px-6 pt-12 pb-8 lg:px-10 lg:pt-16">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 lg:grid-cols-12">
          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white px-6 py-16 lg:col-span-7 lg:px-12 lg:py-24"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Contact Us</p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[0.98] text-brand md:text-6xl">
              Let&rsquo;s <span className="font-script font-normal italic text-accent">talk</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone">
              Send us a quick message and our team will reply within one business day. To book an
              appointment, use the booking links for your location. For urgent care, call us directly.
            </p>

            <div id="book" className="mt-10 scroll-mt-28">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/75fLlP8l9bjou8xrpwwT"
                style={{ width: "100%", height: "470px", border: "none", borderRadius: 0 }}
                id="inline-75fLlP8l9bjou8xrpwwT"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="🔵 Website contact page form 23-06-26  "
                data-height="470"
                data-layout-iframe-id="inline-75fLlP8l9bjou8xrpwwT"
                data-form-id="75fLlP8l9bjou8xrpwwT"
                title="🔵 Website contact page form 23-06-26  "
              />
              <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
            </div>
          </motion.div>

          {/* Right: info dark panel with per-location booking links */}
          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden bg-brand-dark px-6 py-16 text-white lg:col-span-5 lg:px-10 lg:py-24"
          >
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-dashed border-white/10"
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">Visit or Book</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              Two locations. <br />
              Book in seconds.
            </h2>

            <div className="mt-10 space-y-8">
              {LOCATIONS.map((loc) => (
                <LocationBlock
                  key={loc.name}
                  title={`${loc.name}, ${LOCATION_STATE[loc.name] ?? ""}`}
                  address={loc.address}
                  phone={loc.phone}
                  tel={loc.tel}
                  bookingUrl={loc.bookingUrl}
                />
              ))}

              <div className="rounded-2xl border border-accent/40 bg-white/5 p-6 backdrop-blur">
                <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                  <Video size={11} strokeWidth={2.25} />
                  Functional Medicine
                </p>
                <p className="mt-3 font-display text-2xl font-bold leading-tight text-white">
                  Free 30-minute consultation
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  New to functional medicine? Start with a complimentary 30-minute
                  telehealth consult with Dr. Chris, available across all of PA &amp; NJ.
                </p>

                <a
                  href={FM_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openBooking(FM_BOOKING_URL);
                  }}
                  className="group mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                >
                  <Calendar size={12} strokeWidth={2.25} />
                  Book Free Consult
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                <a
                  href="tel:6096517436"
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-accent"
                >
                  <Phone size={13} className="text-accent" strokeWidth={2} />
                  (609) 651-7436
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Smaller maps - one compact map per location */}
      <section className="bg-cream-light pb-20 pt-4 lg:pb-28">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.name}
                className="overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-card"
              >
                <div className="relative aspect-[16/9]">
                  <iframe
                    src={MAP_EMBEDS[loc.name]}
                    title={`Map of ${loc.name} office`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-brand">{loc.name}</p>
                    <p className="truncate text-xs text-stone">{loc.address}</p>
                  </div>
                  <a
                    href={loc.social.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to ${loc.name}`}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent"
                  >
                    <Navigation size={11} strokeWidth={2.25} />
                    Get Directions
                    <ArrowUpRight
                      size={11}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Office hours */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-2xl border border-brand/10 bg-white px-6 py-5 text-center shadow-card sm:flex-row sm:gap-4 sm:text-left">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
              <Clock size={13} className="text-accent" strokeWidth={2.25} />
              Office Hours
            </p>
            <p className="text-sm text-stone">
              Monday &ndash; Friday{" "}
              <span className="font-semibold text-brand">7:30 am &ndash; 8:00 pm</span>
              <span className="mx-2 hidden text-stone/40 sm:inline">&middot;</span>
              <span className="text-stone/70">Saturday &amp; Sunday Closed</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function LocationBlock({
  title,
  address,
  phone,
  tel,
  bookingUrl,
}: {
  title: string;
  address: string;
  phone: string;
  tel: string;
  bookingUrl: string;
}) {
  const { openBooking } = useBookingPopup();
  return (
    <div>
      <p className="font-display text-lg font-bold">{title}</p>
      <p className="mt-3 inline-flex items-start gap-2 text-sm text-white/75">
        <MapPin size={13} className="mt-0.5 shrink-0 text-accent" strokeWidth={2} />
        <span>{address}</span>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a href={tel} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent">
          <Phone size={13} className="text-accent" strokeWidth={2} />
          {phone}
        </a>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            openBooking(bookingUrl);
          }}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-accent-dark"
        >
          <Calendar size={12} strokeWidth={2.25} />
          Book Online
          <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
