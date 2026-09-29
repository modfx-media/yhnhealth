"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Calendar, Phone, X } from "lucide-react";
import { LOCATIONS } from "@/lib/siteData";
import { useBookingPopup } from "@/components/BookingPopup";
import { cn } from "@/lib/utils";

/** Routes that render as standalone landing pages without the site chrome. */
const BARE_ROUTES = ["/functional-medicine-special-offer"];

/**
 * Persistent bottom banner shown site-wide (except on landing pages).
 * Shows "Book Now" + both office phone numbers once the user scrolls past the hero.
 * Visible on both desktop and mobile, dismissible for the session.
 */
export default function BottomBookBanner() {
  const pathname = usePathname();
  const { openBooking } = useBookingPopup();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("yhn.bottomBanner.dismissed") === "1") {
        setDismissed(true);
      }
    } catch {}

    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("yhn.bottomBanner.dismissed", "1");
    } catch {}
  };

  const isBare = BARE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );
  if (isBare) return null;

  const primary = LOCATIONS[0];

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          data-sticky-bar=""
          className="fixed inset-x-0 bottom-0 z-40 border-t border-brand/15 bg-brand-dark/95 text-white shadow-[0_-8px_24px_rgba(0,0,0,0.18)] backdrop-blur"
          role="region"
          aria-label="Book an appointment"
        >
          <div className="mx-auto max-w-[1400px] px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] md:px-8 md:py-3.5">
            {/* Mobile: stacked so location names and numbers stay intact */}
            <div className="flex flex-col gap-2 md:hidden">
              <div className="flex flex-col gap-1">
                {LOCATIONS.map((loc) => (
                  <a
                    key={loc.tel}
                    href={loc.tel}
                    className="flex items-center justify-between gap-3 text-sm text-white/90"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2">
                      <Phone size={14} className="shrink-0 text-accent" strokeWidth={2} />
                      <span className="truncate text-[11px] font-semibold uppercase tracking-wide text-white/70">
                        {loc.name}
                      </span>
                    </span>
                    <span className="shrink-0 font-semibold">{loc.phone}</span>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={primary.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openBooking(primary.bookingUrl);
                  }}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-soft"
                >
                  <Calendar size={14} strokeWidth={2.25} />
                  Book Now
                </Link>
                <button
                  type="button"
                  onClick={handleDismiss}
                  aria-label="Dismiss booking banner"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/70"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden items-center gap-6 md:flex">
              <div className="shrink-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                  Ready when you are
                </p>
                <p className="mt-0.5 font-display text-lg font-bold leading-tight">
                  Book your visit today
                </p>
              </div>

              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-6 gap-y-1">
                {LOCATIONS.map((loc) => (
                  <a
                    key={loc.tel}
                    href={loc.tel}
                    className="group inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-accent"
                  >
                    <Phone size={14} className="text-accent" strokeWidth={2} />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">
                      {loc.name}
                    </span>
                    <span className="font-semibold">{loc.phone}</span>
                  </a>
                ))}
              </div>

              <Link
                href={primary.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openBooking(primary.bookingUrl);
                }}
                className={cn(
                  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
                )}
              >
                <Calendar size={12} strokeWidth={2.25} />
                Book Now
              </Link>

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss booking banner"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
