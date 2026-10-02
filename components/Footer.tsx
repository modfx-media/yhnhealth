"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight, Phone, MapPin, Mail, Clock, Video } from "lucide-react";
import { TELEHEALTH_STATES } from "@/data/telehealth-states";

/** Routes that render as standalone landing pages without the site chrome. */
const BARE_ROUTES = ["/functional-medicine-special-offer"];

type IconProps = { size?: number; strokeWidth?: number };

function FacebookIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4a4 4 0 1 1-7.9 1.2 4 4 0 0 1 7.9-1.2z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Meet The Team", href: "/meet-the-doctor" },
  { label: "Articles", href: "/articles" },
  { label: "Our Locations", href: "/locations" },
  { label: "Telehealth States", href: "/functional-medicine#states" },
  { label: "Contact", href: "/contact-us" },
];

const SERVICE_LINKS = [
  { label: "Chiropractic Medicine", href: "/family-chiropractic-care" },
  { label: "Functional Medicine", href: "/functional-medicine" },
  { label: "Pediatric Care", href: "/pediatric-care" },
  { label: "Pregnancy Care", href: "/pregnancy-care" },
  { label: "Athletic Care", href: "/athletic-care" },
  { label: "Decompression Therapy", href: "/decompression-therapy" },
];

const FOOTER_LOCATIONS = [
  {
    name: "Merchantville",
    state: "NJ",
    address: "5 W Chestnut Ave, Merchantville, NJ 08109",
    phone: "(856) 532-2063",
    tel: "tel:8565322063",
    href: "/locations",
  },
  {
    name: "Chalfont",
    state: "PA",
    address: "350 N Main St #201, Chalfont, PA 18914",
    phone: "(609) 651-7436",
    tel: "tel:6096517436",
    href: "/locations",
  },
];

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/yhnhealth/" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/p/DQrd5dHE7_b/" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/company/your-health-now-llc" },
];

export default function Footer() {
  const pathname = usePathname();

  if (BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-brand to-brand-dark"
      >
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-dashed border-white/10"
        />
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -left-40 -bottom-40 h-[28rem] w-[28rem] rounded-full border border-dashed border-white/8"
        />

        <div className="relative mx-auto flex max-w-[1320px] flex-col items-center gap-3 px-6 py-10 text-center lg:px-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-steel-light backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Begin Today
          </span>
          <h2 className="font-display text-2xl font-bold leading-[1.1] md:text-3xl">
            <span className="font-script font-normal italic text-accent">be well,</span> be you
          </h2>
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-brand"
          >
            Schedule a Visit
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-[1320px] px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" aria-label="Your Health Now - home" className="inline-flex items-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2">
                <Image
                  src="/images/logo.webp"
                  alt="Your Health Now"
                  width={40}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </span>
              <span className="ml-3 font-display text-lg font-bold leading-tight">
                Your Health Now
                <span className="block text-[9px] font-semibold uppercase tracking-[0.28em] text-steel-light">
                  Health for every body
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/70">
              Contemporary chiropractic and functional medicine care. Two locations serving NJ and PA.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <Icon size={14} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">Explore</p>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">Services</p>
            <ul className="mt-4 space-y-2">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">Visit Us</p>
            <div className="mt-4 space-y-4">
              {FOOTER_LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <Link href={loc.href} className="font-display text-sm font-semibold hover:text-accent">
                    {loc.name}, <span className="text-steel-light">{loc.state}</span>
                  </Link>
                  <p className="mt-1 flex items-start gap-2 text-[11px] leading-relaxed text-white/70">
                    <MapPin size={11} className="mt-0.5 shrink-0 text-accent" strokeWidth={2} />
                    {loc.address}
                  </p>
                  <a
                    href={loc.tel}
                    className="mt-1 inline-flex items-center gap-2 text-[11px] font-semibold text-white hover:text-accent"
                  >
                    <Phone size={11} className="text-accent" strokeWidth={2} />
                    {loc.phone}
                  </a>
                </div>
              ))}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 pt-3 text-[11px] text-white/65">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={11} className="text-accent" strokeWidth={2} />
                  Mon–Fri · 7:30a–8p
                </span>
                <a
                  href="mailto:info@yhnhealth.com"
                  className="inline-flex items-center gap-1.5 hover:text-accent"
                >
                  <Mail size={11} className="text-accent" strokeWidth={2} />
                  info@yhnhealth.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-3 px-6 py-5 lg:px-10">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              <Video size={11} />
              Functional Medicine Telehealth
            </p>
            <p className="text-[12px] text-white/70">
              Now available in {TELEHEALTH_STATES.length} states
            </p>
          </div>
          <Link
            href="/functional-medicine#states"
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.24em] text-white/80 hover:text-accent"
          >
            See all states
            <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-6 py-5 text-[11px] uppercase tracking-[0.22em] text-white/50 md:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} Your Health Now. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-accent">Privacy</Link>
            <span className="h-3 w-px bg-white/20" />
            <Link href="/medical-disclaimer" className="hover:text-accent">Disclaimer</Link>
            <span className="h-3 w-px bg-white/20" />
            <Link href="/sitemap" className="hover:text-accent">Sitemap</Link>
            <span className="h-3 w-px bg-white/20" />
            <Link href="/contact-us" className="hover:text-accent">Contact</Link>
          </div>
        </div>
        <p className="mx-auto max-w-[1320px] px-6 pb-5 text-[10px] leading-relaxed normal-case tracking-normal text-white/40 lg:px-10">
          Educational information on this website is not a diagnosis or a substitute for an in-person exam.
          Chiropractic and functional medicine care is provided by licensed clinicians at our Merchantville, NJ
          and Chalfont, PA clinics. Call to confirm insurance, hours, and whether a visit is appropriate for you.
        </p>
      </div>

      <div aria-hidden="true" className="h-[3px] w-full bg-gradient-to-r from-brand via-accent to-brand" />
    </footer>
  );
}
