"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronRight, Menu, X, MapPin, Clock, Calendar } from "lucide-react";
import { NAV_ITEMS, isNavGroup, type NavChild, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Routes that render as standalone landing pages without the site chrome. */
const BARE_ROUTES = ["/functional-medicine-special-offer"];

const PHONES = {
  merchantville: { label: "Merchantville", display: "(856) 532-2063", tel: "8565322063" },
  chalfont:      { label: "Chalfont",      display: "(609) 651-7436", tel: "6096517436" },
};

/* -------------------------------------------------------------------------- */
/*  Top Utility Bar                                                           */
/* -------------------------------------------------------------------------- */
function TopBar({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={cn(
        "hidden w-full bg-brand-dark text-white text-[11px] tracking-[0.16em] transition-all duration-500 lg:block",
        hidden && "pointer-events-none -translate-y-full opacity-0"
      )}
      aria-hidden={hidden}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-2.5">
        <div className="flex items-center gap-6 text-white/80">
          <span className="inline-flex items-center gap-2 uppercase">
            <MapPin size={12} className="text-steel-light" strokeWidth={1.75} />
            Chalfont, PA · Merchantville, NJ
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="inline-flex items-center gap-2 uppercase">
            <Clock size={12} className="text-steel-light" strokeWidth={1.75} />
            Mon–Fri · 7:30 am – 8:00 pm
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={`tel:${PHONES.merchantville.tel}`}
            className="group inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-steel-light">
              {PHONES.merchantville.label}
            </span>
            <span className="font-medium text-white/90 group-hover:text-white">
              {PHONES.merchantville.display}
            </span>
          </a>
          <span className="h-3 w-px bg-white/20" />
          <a
            href={`tel:${PHONES.chalfont.tel}`}
            className="group inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-steel-light">
              {PHONES.chalfont.label}
            </span>
            <span className="font-medium text-white/90 group-hover:text-white">
              {PHONES.chalfont.display}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Desktop Dropdown                                                          */
/* -------------------------------------------------------------------------- */
function DropdownBookCTA() {
  const pathname = usePathname();
  return (
    <Link
      href="/contact-us"
      role="menuitem"
      onClick={(e) => {
        if (pathname === "/contact-us") {
          e.preventDefault();
          document
            .getElementById("book")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className="group flex items-center justify-between gap-4 border-t border-brand/10 bg-mist/60 px-5 py-3 text-[13px] font-bold uppercase tracking-[0.18em] text-brand transition-colors hover:bg-accent hover:text-white"
    >
      <span className="inline-flex items-center gap-2">
        <Calendar
          size={13}
          strokeWidth={2.25}
          className="text-accent transition-colors group-hover:text-white"
        />
        Book Appointment
      </span>
      <span className="text-accent transition-colors group-hover:text-white">
        →
      </span>
    </Link>
  );
}

function DesktopDropdown({
  item,
  scrolled,
}: {
  item: NavItem;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);

  const linkBase =
    "relative inline-flex h-full items-center whitespace-nowrap px-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] transition-colors xl:px-3 2xl:px-4 2xl:text-[11.5px] 2xl:tracking-[0.14em]";

  if (item.children.length === 0 && item.href) {
    return (
      <Link
        href={item.href}
        className={cn(linkBase, "text-brand hover:text-brand-light")}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative flex h-full items-stretch"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {item.href ? (
        <Link
          href={item.href}
          aria-haspopup="true"
          aria-expanded={open}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          className={cn(
            linkBase,
            "gap-1.5",
            open ? "text-brand-light" : "text-brand hover:text-brand-light"
          )}
        >
          {item.label}
          <ChevronDown
            size={11}
            strokeWidth={2.5}
            className={cn("transition-transform duration-300", open && "rotate-180")}
          />
        </Link>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          className={cn(
            linkBase,
            "gap-1.5",
            open ? "text-brand-light" : "text-brand hover:text-brand-light"
          )}
        >
          {item.label}
          <ChevronDown
            size={11}
            strokeWidth={2.5}
            className={cn("transition-transform duration-300", open && "rotate-180")}
          />
        </button>
      )}

      {/* Active indicator */}
      <span
        className={cn(
          "pointer-events-none absolute inset-x-3 h-px bg-accent transition-transform duration-300",
          scrolled ? "bottom-2" : "bottom-3",
          open ? "scale-x-100" : "scale-x-0"
        )}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 min-w-[260px] -translate-x-1/2"
            role="menu"
          >
            <div className="rounded-md border border-brand/10 bg-white shadow-card">
              <div className="h-[3px] w-full rounded-t-md bg-gradient-to-r from-brand via-steel to-brand" />
              <div className="py-2">
                {item.children.map((child) => (
                  <DropdownRow key={child.label} child={child} />
                ))}
              </div>
              <DropdownBookCTA />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dropdown row, leaf or nested group flyout                                */
/* -------------------------------------------------------------------------- */
function DropdownRow({ child }: { child: NavChild }) {
  const [open, setOpen] = useState(false);

  if (!isNavGroup(child)) {
    return (
      <Link
        href={child.href}
        role="menuitem"
        className="group flex items-center justify-between gap-4 px-5 py-3 text-[14px] font-medium text-brand transition-colors hover:bg-mist hover:text-brand-light"
      >
        <span>{child.label}</span>
        <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
          →
        </span>
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {child.href ? (
        <Link
          href={child.href}
          role="menuitem"
          className={cn(
            "group flex items-center justify-between gap-4 px-5 py-3 text-[14px] font-medium transition-colors hover:bg-mist",
            open ? "bg-mist text-brand-light" : "text-brand hover:text-brand-light"
          )}
        >
          <span>{child.label}</span>
          <ChevronRight size={12} strokeWidth={2.25} className="text-accent" />
        </Link>
      ) : (
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between gap-4 px-5 py-3 text-left text-[14px] font-medium transition-colors hover:bg-mist",
            open ? "bg-mist text-brand-light" : "text-brand hover:text-brand-light"
          )}
        >
          <span>{child.label}</span>
          <ChevronRight size={12} strokeWidth={2.25} className="text-accent" />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-full top-0 z-50 min-w-[240px] pr-1"
            role="menu"
          >
            <div className="overflow-hidden rounded-md border border-brand/10 bg-white shadow-card">
              <div className="h-[3px] w-full bg-gradient-to-r from-brand via-steel to-brand" />
              <div className="py-2">
                {child.children.map((leaf) => (
                  <Link
                    key={leaf.label}
                    href={leaf.href}
                    role="menuitem"
                    className="group flex items-center justify-between gap-4 px-5 py-3 text-[14px] font-medium text-brand transition-colors hover:bg-mist hover:text-brand-light"
                  >
                    <span>{leaf.label}</span>
                    <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                ))}
              </div>
              <DropdownBookCTA />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile Drawer                                                             */
/* -------------------------------------------------------------------------- */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [accordionOpen, setAccordionOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-brand-dark/50 backdrop-blur-sm xl:hidden"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-[88vw] max-w-md flex-col overflow-y-auto bg-white shadow-2xl xl:hidden"
          >
            <div className="flex items-center justify-between border-b border-brand/10 px-6 py-5">
              <Link href="/" onClick={onClose} aria-label="Your Health Now, home">
                <Image
                  src="/images/logo.webp"
                  alt="Your Health Now"
                  width={120}
                  height={48}
                  className="h-10 w-auto"
                />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand hover:bg-mist"
              >
                <X size={22} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-2 py-2">
              {NAV_ITEMS.map((item, idx) => {
                const isOpen = !!accordionOpen[idx];
                if (item.children.length === 0 && item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-md px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-brand hover:bg-mist hover:text-brand-light"
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setAccordionOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between rounded-md px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-[0.14em] text-brand hover:bg-mist hover:text-brand-light"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 border-l border-brand/15 pb-2 pl-4">
                        {item.children.map((child) =>
                          isNavGroup(child) ? (
                            <div key={child.label} className="py-1">
                              {child.href ? (
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="block py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-brand hover:text-brand-light"
                                >
                                  {child.label}
                                </Link>
                              ) : (
                                <p className="py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
                                  {child.label}
                                </p>
                              )}
                              <div className="ml-3 border-l border-brand/10 pl-3">
                                {child.children.map((leaf) => (
                                  <Link
                                    key={leaf.label}
                                    href={leaf.href}
                                    onClick={onClose}
                                    className="block py-1.5 text-[13px] text-stone hover:text-brand-light"
                                  >
                                    {leaf.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={onClose}
                              className="block py-2 text-[13px] text-stone hover:text-brand-light"
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                        <Link
                          href="/contact-us"
                          onClick={(e) => {
                            if (pathname === "/contact-us") {
                              e.preventDefault();
                              document
                                .getElementById("book")
                                ?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                            onClose();
                          }}
                          className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-accent"
                        >
                          <Calendar size={11} strokeWidth={2.25} />
                          Book Appointment
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 border-t border-brand/10 bg-mist/60 px-6 pt-5 pb-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-dark">
                Contact
              </p>
              {[PHONES.merchantville, PHONES.chalfont].map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="flex items-center justify-between text-sm text-brand hover:text-brand-light"
                >
                  <span className="text-[10px] uppercase tracking-[0.22em] text-stone">
                    {p.label}
                  </span>
                  <span className="font-semibold">{p.display}</span>
                </a>
              ))}
              <Link
                href="/contact-us"
                onClick={(e) => {
                  if (pathname === "/contact-us") {
                    e.preventDefault();
                    document
                      .getElementById("book")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  onClose();
                }}
                className="mt-2 block w-full rounded-full bg-brand py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-brand-light"
              >
                Book Appointment
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */
export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500",
          scrolled ? "bg-white/95 shadow-soft backdrop-blur" : "bg-white"
        )}
      >
        <TopBar hidden={scrolled} />

        {/* Main bar */}
        <div className="border-b border-brand/10">
          <div
            className={cn(
              "mx-auto flex max-w-[1400px] items-center gap-3 px-5 transition-all duration-300 md:gap-6 md:px-8 lg:px-10 xl:gap-2 xl:px-6 2xl:gap-6 2xl:px-10",
              scrolled ? "h-16" : "h-20"
            )}
          >
            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand hover:bg-mist xl:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link
              href="/"
              aria-label="Your Health Now, home"
              className="flex shrink-0 items-center"
            >
              <Image
                src="/images/logo.webp"
                alt="Your Health Now"
                width={140}
                height={56}
                priority
                className={cn(
                  "h-auto w-auto object-contain transition-all duration-300",
                  scrolled ? "max-h-9" : "max-h-11"
                )}
              />
            </Link>

            {/* Desktop nav (centered) */}
            <nav
              aria-label="Primary navigation"
              className="hidden h-full flex-1 items-stretch justify-center xl:flex"
            >
              {NAV_ITEMS.map((item) => (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  scrolled={scrolled}
                />
              ))}
            </nav>

            {/* Right cluster */}
            <div className="ml-auto flex shrink-0 items-center gap-2.5">
              <Link
                href="/contact-us"
                onClick={(e) => {
                  if (pathname === "/contact-us") {
                    e.preventDefault();
                    document
                      .getElementById("book")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={cn(
                  "group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-soft transition-all duration-300 hover:bg-brand-light hover:shadow-card xl:text-[10px] xl:tracking-[0.16em] 2xl:text-[11px] 2xl:tracking-[0.2em]",
                  scrolled ? "px-5 py-2.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5" : "px-6 py-3 xl:px-4 xl:py-2.5 2xl:px-6 2xl:py-3"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent transition-colors group-hover:bg-white" />
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Brand accent hairline */}
        <div
          aria-hidden="true"
          className="h-[2px] w-full bg-gradient-to-r from-brand via-steel to-brand"
        />
      </motion.header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
