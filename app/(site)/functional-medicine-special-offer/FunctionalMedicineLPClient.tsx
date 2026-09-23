"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Activity,
  ArrowUpRight,
  Atom,
  Brain,
  CheckCircle2,
  ClipboardList,
  Compass,
  Droplets,
  FlaskConical,
  HeartPulse,
  ListChecks,
  Microscope,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  TestTube,
  Video,
  X,
} from "lucide-react";
import FMCPBadge from "@/components/FMCPBadge";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const PHONE_NJ = "+1 609-869-9498";
const PHONE_NJ_TEL = "tel:+16098699498";

const BOOKING_URL =
  "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";

const LEAD_FORM_ID = "QFOqExGO8VVWILYAid61";
const LEAD_FORM_SRC = `https://api.leadconnectorhq.com/widget/form/${LEAD_FORM_ID}`;

/** Detect a completed-submission message broadcast by the GoHighLevel form
 *  embed. LeadConnector doesn't publish a fixed message contract for forms,
 *  so we match on the documented iframe-resize prefix being absent plus a
 *  handful of defensive keyword checks. */
function isLeadFormSubmitted(data: unknown): boolean {
  if (typeof data === "string") {
    if (data.startsWith("[iFrameSizer]")) return false;
    const d = data.toLowerCase();
    return (
      d.includes("submit") ||
      d.includes("thank-you") ||
      d.includes("thankyou") ||
      d.includes("thank you") ||
      d.includes("redirected") ||
      d.includes("appointment")
    );
  }
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const o = data as Record<string, unknown>;
    const combined = [o.type, o.event, o.action, o.page, o.pageUrl, o.redirectUrl, o.url]
      .filter((v): v is string => typeof v === "string")
      .join(" ")
      .toLowerCase();
    return (
      combined.includes("submit") ||
      combined.includes("success") ||
      combined.includes("thank-you") ||
      combined.includes("thankyou")
    );
  }
  return false;
}

/** The GoHighLevel embed script (form_embed.js) auto-resizes the iframe by
 *  posting "[iFrameSizer]<id>:<height>:<width>:<type>" on every content-height
 *  change. When the multi-field intake form is replaced by GHL's own short
 *  "thank you" confirmation, the reported height collapses sharply — a
 *  reliable, verifiable signal we use as a fallback when no explicit
 *  submit/success message is sent. */
function parseIframeSizerHeight(data: unknown, iframeId: string): number | null {
  if (typeof data !== "string" || !data.startsWith("[iFrameSizer]")) return null;
  const [id, heightStr] = data.slice("[iFrameSizer]".length).split(":");
  if (id !== iframeId && !id?.startsWith(`${iframeId}___`)) return null;
  const height = Number(heightStr);
  return Number.isFinite(height) ? height : null;
}

const VIMEO_SRC =
  "https://player.vimeo.com/video/1200442621?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0";

const REVIEWS = [
  {
    text: "After my first call I felt heard. The complimentary consultation alone was more thorough than any visit I had with my previous doctor, and that was before I even stepped into the office. They genuinely care about the WHY behind your symptoms.",
    author: "Jessica R.",
    location: "Merchantville, NJ",
    service: "Functional Medicine",
  },
  {
    text: "Chris is incredibly knowledgeable in addressing not just symptoms, but the root causes. My energy and digestion have slowly improved and I'm finally hopeful again. This is the personal, root-cause care you don't find with other doctors.",
    author: "Mark B.",
    location: "Chalfont, PA",
    service: "Root-Cause Care",
  },
  {
    text: "Years of fatigue and brain fog, and every doctor said my labs were 'normal.' Functional lab testing here finally found what was wrong. Months later I feel like myself again. I only wish I'd found them sooner.",
    author: "Hannah P.",
    location: "Telehealth · NJ",
    service: "Functional Lab Testing",
  },
  {
    text: "The telehealth appointments made it so easy to keep up with my plan. Comprehensive testing, a clear protocol, and real follow-up. My hormones and gut health are finally balanced.",
    author: "Daniel K.",
    location: "Telehealth · PA",
    service: "Hormone & Gut Health",
  },
];

/* -------------------------------------------------------------------------- */
/*  CTA buttons                                                                */
/* -------------------------------------------------------------------------- */

function PrimaryCTA({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-accent-dark ${className}`}
    >
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>
  );
}

function GhostCTA({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all hover:border-accent hover:text-accent ${className}`}
    >
      <Phone size={15} />
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Motion graphics                                                            */
/* -------------------------------------------------------------------------- */

/** Animated rising "recovery trend" line graph with gradient fill + pulse dot. */
function TrendGraph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 160"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fmTrendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[40, 80, 120].map((y) => (
        <line
          key={y}
          x1="0"
          x2="320"
          y1={y}
          y2={y}
          stroke="#1F3563"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      ))}

      <motion.path
        d="M0 132 C 48 128, 78 96, 120 92 S 196 56, 240 40 S 300 16, 320 12"
        stroke="#1F3563"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M0 132 C 48 128, 78 96, 120 92 S 196 56, 240 40 S 300 16, 320 12 L 320 160 L 0 160 Z"
        fill="url(#fmTrendFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.6 }}
      />
      <motion.circle
        cx="320"
        cy="12"
        r="5"
        fill="#C9A96E"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: [0, 1.4, 1], opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.8 }}
      />
    </svg>
  );
}

/** Animated lab-marker bars (each fills to its target on view). */
function MarkerBars() {
  const bars = [
    { label: "Energy", value: 88 },
    { label: "Gut Health", value: 76 },
    { label: "Hormones", value: 82 },
    { label: "Inflammation", value: 71 },
  ];
  return (
    <div className="flex flex-col gap-4">
      {bars.map((b, i) => (
        <div key={b.label}>
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-brand">
            <span>{b.label}</span>
            <span className="text-accent-dark">Optimizing</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-mist">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand via-brand-light to-accent"
              initial={{ width: 0 }}
              whileInView={{ width: `${b.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, delay: i * 0.15, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Decorative floating orbs + rotating dashed rings for dark sections. */
function DarkMotionField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-steel/25 blur-3xl"
        animate={{ y: [0, -22, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        animate={{ y: [0, 24, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.span
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-dashed border-white/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Animated counter                                                           */
/* -------------------------------------------------------------------------- */

function Counter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/* Simple fade-up wrapper */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Large collage image shown in full (no crop), with a compact floating label. */
function CollageImage({
  src,
  alt,
  label,
  width,
  height,
  dark = false,
  className = "",
  priority = false,
  fill = false,
}: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  dark?: boolean;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  return (
    <FadeUp className={`${fill ? "h-full" : ""} ${className}`}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`group relative overflow-hidden rounded-[28px] shadow-card-hover ${
          fill ? "h-full" : ""
        } ${
          dark ? "border border-white/15 bg-white/5" : "border border-brand/10 bg-mist/30"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`w-full transition-transform duration-700 group-hover:scale-[1.03] ${
            fill ? "h-full object-cover" : "h-auto object-contain"
          }`}
        />
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-brand-dark/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur">
          <Sparkles size={12} className="text-accent" />
          {label}
        </span>
      </motion.div>
    </FadeUp>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function FunctionalMedicineSpecialOfferPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const redirectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxFormHeight = useRef(0);
  const sizerReports = useRef(0);

  const openModal = () => {
    setFormSubmitted(false);
    maxFormHeight.current = 0;
    sizerReports.current = 0;
    setIsFormOpen(true);
  };
  const closeModal = () => {
    setIsFormOpen(false);
    if (redirectTimeout.current) clearTimeout(redirectTimeout.current);
  };

  // Lock background scroll and allow Escape to dismiss while the form modal is open.
  useEffect(() => {
    if (!isFormOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFormOpen]);

  // Once the embedded lead form reports a completed submission, show a
  // confirmation message for a few seconds, then hand the visitor off to
  // the booking calendar.
  useEffect(() => {
    if (!isFormOpen || formSubmitted) return;
    const markSubmitted = () => {
      setFormSubmitted(true);
      redirectTimeout.current = setTimeout(() => {
        window.location.href = BOOKING_URL;
      }, 2500);
    };
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes("leadconnectorhq.com") && !event.origin.includes("msgsndr")) {
        return;
      }
      const height = parseIframeSizerHeight(event.data, `inline-${LEAD_FORM_ID}`);
      if (height !== null) {
        sizerReports.current += 1;
        if (height > maxFormHeight.current) maxFormHeight.current = height;
        const droppedSharply =
          sizerReports.current >= 1 &&
          maxFormHeight.current >= 300 &&
          height > 0 &&
          (height <= Math.max(320, maxFormHeight.current * 0.75) ||
            maxFormHeight.current - height >= 120);
        if (droppedSharply) {
          markSubmitted();
        }
        return;
      }
      if (isLeadFormSubmitted(event.data)) {
        markSubmitted();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isFormOpen, formSubmitted]);

  useEffect(() => () => {
    if (redirectTimeout.current) clearTimeout(redirectTimeout.current);
  }, []);

  // Hide the global Knock Knock chat widget on this standalone landing page
  // (fallback for client-side navigation; layout already skips loading it here).
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-fm-lp", "hide-chat-widget");
    style.textContent = `
      #knock-knock-widget-container,
      [id*="knock-knock"],
      [class*="knock-knock"],
      iframe[src*="knock-knockapp"],
      #chat-widget,
      .chat-widget,
      [class*="chat-widget"] {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLIFrameElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  // Prevent Vimeo's "More from …" end screen from showing when the hero video
  // finishes by resetting the player back to the first frame on the "ended" event.
  useEffect(() => {
    const iframe = heroVideoRef.current;
    if (!iframe) return;

    const SDK_SRC = "https://player.vimeo.com/api/player.js";
    let player: { on: (e: string, cb: () => void) => void; destroy: () => void; setCurrentTime: (t: number) => Promise<number>; pause: () => Promise<void> } | null = null;

    const init = () => {
      const Vimeo = (window as unknown as { Vimeo?: { Player: new (el: HTMLIFrameElement) => typeof player } }).Vimeo;
      if (!Vimeo || !iframe) return;
      player = new Vimeo.Player(iframe) as typeof player;
      player?.on("ended", () => {
        player?.setCurrentTime(0).catch(() => {});
        player?.pause().catch(() => {});
      });
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SDK_SRC}"]`);
    if ((window as unknown as { Vimeo?: unknown }).Vimeo) {
      init();
    } else if (existing) {
      existing.addEventListener("load", init);
    } else {
      const script = document.createElement("script");
      script.src = SDK_SRC;
      script.async = true;
      script.addEventListener("load", init);
      document.body.appendChild(script);
    }

    return () => {
      player?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-white font-sans text-ink">
      {/* ----------------------------------------------------------------- */}
      {/*  Slim Top Bar                                                      */}
      {/* ----------------------------------------------------------------- */}
      <header className="relative z-40 border-b border-brand/10 bg-white/90 backdrop-blur sm:sticky sm:top-0">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-3 lg:px-10">
          <Image
            src="/images/logo.webp"
            alt="Your Health Now"
            width={130}
            height={44}
            priority
            className="h-auto w-[108px] select-none sm:w-[130px]"
          />
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={PHONE_NJ_TEL}
              className="hidden items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white sm:inline-flex"
            >
              <Phone size={14} className="text-accent-dark" />
              Call {PHONE_NJ}
            </a>
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-brand-dark shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:text-white hover:shadow-md sm:gap-2 sm:px-5"
            >
              Book Free Consult
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* --------------------------------------------------------------- */}
        {/*  HERO                                                            */}
        {/* --------------------------------------------------------------- */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-dark text-white"
        >
          <DarkMotionField />
          <motion.span
            aria-hidden="true"
            style={{ y: orbY }}
            className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
          />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pb-20 lg:pt-20">
            {/* Text */}
            <motion.div
              className="text-center lg:col-span-6 lg:text-left"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
            >
              <motion.span
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-steel-light backdrop-blur"
              >
                <Sparkles size={12} className="text-accent" />
                Functional Medicine • NJ &amp; PA • Telehealth
              </motion.span>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7 }}
                className="mt-6 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]"
              >
                When Conventional Medicine Doesn&rsquo;t Have the Answer{" "}
                <span className="mt-2 block">
                  <span className="font-script text-5xl font-normal text-accent sm:text-6xl lg:text-7xl">
                    we ask
                  </span>{" "}
                  the next question.
                </span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75 lg:mx-0"
              >
                Doctor-led <strong className="font-semibold text-white">root cause medicine</strong>{" "}
                for complex chronic conditions. Comprehensive functional lab testing,
                personalized treatment, and whole-person care, in-person or via telehealth.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <PrimaryCTA onClick={openModal}>Free 30-Min Consultation</PrimaryCTA>
                <GhostCTA href={PHONE_NJ_TEL}>{PHONE_NJ}</GhostCTA>
              </motion.div>

              <motion.ul
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="mt-8 flex flex-col items-center gap-3 text-sm text-white/75 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start"
              >
                {[
                  "No-obligation consultation",
                  "Telehealth & in-office",
                  "Doctor-led care",
                ].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-accent" />
                    {t}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="mt-8 flex justify-center text-white lg:justify-start"
              >
                <FMCPBadge size={112} linked={false} />
              </motion.div>
            </motion.div>

            {/* Video — matches the functional-medicine page treatment */}
            <motion.div
              className="mx-auto w-full max-w-[300px] lg:col-span-6 lg:max-w-[380px]"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="relative">
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-[2rem] border border-dashed border-white/20"
                />
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-accent/25 via-transparent to-steel/20 blur-2xl"
                />
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-brand-dark shadow-card-hover">
                  <div className="relative aspect-[9/16] w-full">
                    <iframe
                      ref={heroVideoRef}
                      src={VIMEO_SRC}
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      allowFullScreen
                      title="Functional Medicine, Your Health Now"
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats band — integrated into the hero */}
          <div className="relative border-t border-white/10">
            <div className="mx-auto max-w-[1320px] px-5 py-8 lg:px-10 lg:py-10">
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
                {[
                  { big: <Counter end={2000} suffix="+" />, label: "Patients Served" },
                  { big: "2", label: "Chiropractic Care Locations" },
                  { big: "Telehealth", label: "Across NJ & PA" },
                  { big: <Counter end={30} suffix=" min" />, label: "Free Consultation" },
                ].map((s, i) => (
                  <FadeUp
                    key={s.label}
                    delay={i * 0.08}
                    className="text-center sm:border-l sm:border-white/10 sm:first:border-l-0"
                  >
                    <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {s.big}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                      {s.label}
                    </p>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*  REVIEWS                                                         */}
        {/* --------------------------------------------------------------- */}
        <section id="stories" className="relative overflow-hidden bg-cream-light py-20 scroll-mt-28 lg:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
            <FadeUp className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                Patient Stories
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand sm:text-4xl">
                Real people,{" "}
                <span className="font-script text-4xl font-normal text-accent sm:text-5xl">
                  real results
                </span>
              </h2>
              <div className="mt-4 flex items-center justify-center gap-3 text-sm font-semibold text-stone">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="fill-accent text-accent" />
                  ))}
                </span>
                <span>
                  <Counter end={2000} suffix="+" /> patients served across NJ &amp; PA
                </span>
              </div>
            </FadeUp>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {REVIEWS.map((r, i) => (
                <FadeUp key={r.author} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-full rounded-3xl border border-brand/10 bg-white p-7 shadow-card transition-shadow hover:shadow-card-hover"
                  >
                    <Quote
                      size={40}
                      className="absolute right-6 top-6 text-accent/15"
                      aria-hidden="true"
                    />
                    <span className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={15} className="fill-accent text-accent" />
                      ))}
                    </span>
                    <p className="relative mt-4 leading-relaxed text-ink">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-brand/10 pt-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-accent">
                        {r.author.charAt(0)}
                      </span>
                      <div>
                        <p className="font-semibold text-brand">{r.author}</p>
                        <p className="text-xs text-stone">
                          {r.service} · {r.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.1} className="mt-12 text-center">
              <PrimaryCTA onClick={openModal} className="mx-auto">
                Start Your Success Story
              </PrimaryCTA>
            </FadeUp>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*  FOUR PILLARS                                                    */}
        {/* --------------------------------------------------------------- */}
        <section id="approach" className="relative overflow-hidden bg-white py-20 scroll-mt-28 lg:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-steel-soft/40 blur-3xl"
          />
          <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
            <FadeUp className="text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                Our Approach
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand sm:text-4xl">
                Four Pillars of{" "}
                <span className="font-script text-4xl font-normal text-accent sm:text-5xl">
                  functional care
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-stone sm:mx-0">
                A functional medicine doctor looks upstream of your symptoms, combining
                advanced diagnostics with personalized protocols to restore how you feel.
              </p>
            </FadeUp>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
              {/* Collage image */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                <CollageImage
                  src="/images/functional-medicine-lp/what-is-functional-medicine-hero.jpg"
                  alt="Functional medicine doctor discussing root-cause care with a patient"
                  label="Doctor-Led Consultations"
                  width={800}
                  height={800}
                  fill
                  className="flex-1"
                />
                <PrimaryCTA onClick={openModal} className="w-full justify-center">
                  Book Your Free Consultation
                </PrimaryCTA>
              </div>

              {/* Cards */}
              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                {[
                  {
                    icon: Atom,
                    title: "Root-Cause Analysis",
                    body: "We investigate biochemistry, gut health, hormones, and lifestyle to find WHY symptoms appear, not just what they look like. This is root cause medicine, not symptom suppression.",
                  },
                  {
                    icon: Microscope,
                    title: "Functional Lab Testing",
                    body: "Comprehensive labs beyond standard panels: micronutrients, food sensitivity testing, hormone panel testing, and gut microbiome testing to map your full picture.",
                  },
                  {
                    icon: ClipboardList,
                    title: "Personalized Care Plan",
                    body: "Your protocol is built around your biology, your history, and your goals, guided by a functional medicine doctor, never a one-size-fits-all template.",
                  },
                  {
                    icon: ListChecks,
                    title: "Ongoing Optimization",
                    body: "Functional medicine is iterative. We measure, adjust, and refine until you're not just less sick, you're well.",
                  },
                ].map((c, i) => (
                  <FadeUp key={c.title} delay={i * 0.08}>
                    <div className="group h-full rounded-3xl border border-brand/10 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <c.icon size={22} />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-bold text-brand">
                        {c.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-stone">{c.body}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*  RESULTS / MOTION GRAPHS                                         */}
        {/* --------------------------------------------------------------- */}
        <section id="results" className="relative overflow-hidden bg-cream-light py-20 scroll-mt-28 lg:py-28">
          <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <FadeUp className="text-center sm:text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                  The Functional Difference
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-brand sm:text-4xl">
                  From &ldquo;your labs are normal&rdquo; to{" "}
                  <span className="font-script text-4xl font-normal text-accent sm:text-5xl">
                    feeling well again
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-stone sm:mx-0">
                  We track the markers conventional panels often miss and build a clear
                  path forward. As your gut, hormones, and inflammation rebalance, your
                  energy and clarity follow.
                </p>

                <CollageImage
                  src="/images/functional-medicine-lp/functional-medicine-1-68226040901f6.avif"
                  alt="Functional medicine clinic providing personalized whole-person care"
                  label="Whole-Person Care"
                  width={980}
                  height={1225}
                  className="mt-8"
                />
              </FadeUp>

              <div className="flex flex-col gap-5">
                <FadeUp>
                  <div className="rounded-3xl border border-brand/10 bg-white p-7 shadow-card">
                    <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-brand">
                      <Activity size={16} className="text-accent-dark" />
                      Marker Optimization
                    </div>
                    <MarkerBars />
                  </div>
                </FadeUp>

                <FadeUp delay={0.15}>
                  <div className="relative rounded-3xl border border-brand/10 bg-white p-7 shadow-card-hover">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-dark">
                          Recovery Trend
                        </p>
                        <p className="font-display text-xl font-bold text-brand">
                          Whole-person progress
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-dark">
                        <HeartPulse size={13} /> Trending up
                      </span>
                    </div>
                    <div className="mt-6 h-44 w-full">
                      <TrendGraph className="h-full w-full" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                      {[
                        { n: <Counter end={87} suffix="%" />, l: "More energy" },
                        { n: <Counter end={92} suffix="%" />, l: "Better digestion" },
                        { n: <Counter end={3} suffix="x" />, l: "Clarity" },
                      ].map((s) => (
                        <div key={s.l} className="rounded-2xl bg-mist px-2 py-3">
                          <p className="font-display text-lg font-bold text-brand">{s.n}</p>
                          <p className="text-[11px] font-semibold text-stone">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>

                <FadeUp delay={0.25} className="flex justify-center sm:justify-start">
                  <PrimaryCTA onClick={openModal}>Book Your Free Consultation</PrimaryCTA>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*  CONDITIONS                                                      */}
        {/* --------------------------------------------------------------- */}
        <section id="conditions" className="bg-white py-20 scroll-mt-28 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <FadeUp className="text-center sm:text-left">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                    Conditions We Address
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-brand sm:text-4xl">
                    When conventional care leaves you with questions
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-lg text-stone sm:mx-0">
                    Functional medicine is at its best with complex, chronic, multi-system
                    conditions. If you&rsquo;ve been told your labs are &ldquo;normal&rdquo;
                    but you don&rsquo;t feel well, this is for you.
                  </p>
                </FadeUp>

                <div className="mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
                  {[
                    { icon: Activity, label: "Chronic Fatigue & Low Energy" },
                    { icon: Droplets, label: "Digestive Issues & Gut Health" },
                    { icon: FlaskConical, label: "Hormone Imbalances" },
                    { icon: ShieldCheck, label: "Autoimmune Conditions" },
                    { icon: TestTube, label: "Lyme Disease & Tick-Borne Illness" },
                    { icon: HeartPulse, label: "Chronic Inflammation & Pain" },
                    { icon: Brain, label: "Brain Fog & Mood Disorders" },
                    { icon: Stethoscope, label: "Metabolic Health & Weight" },
                  ].map((c, i) => (
                    <FadeUp key={c.label} delay={i * 0.04}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-mist/60 px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-accent hover:bg-accent/10">
                        <c.icon size={15} className="text-accent-dark" />
                        {c.label}
                      </span>
                    </FadeUp>
                  ))}
                </div>

                <FadeUp delay={0.1} className="mt-10 flex justify-center sm:justify-start">
                  <PrimaryCTA onClick={openModal}>Book Your Free Consultation</PrimaryCTA>
                </FadeUp>
              </div>

              <CollageImage
                src="/images/functional-medicine-lp/functional_medicine_4.webp"
                alt="Functional lab testing and root-cause diagnostics for chronic conditions"
                label="Functional Lab Testing"
                width={1052}
                height={806}
              />
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*  CARE PATHWAY                                                    */}
        {/* --------------------------------------------------------------- */}
        <section id="pathway" className="bg-cream-light py-20 scroll-mt-28 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <FadeUp className="text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                Care Pathway
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand sm:text-4xl">
                Personalized clinical care
              </h2>
            </FadeUp>

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              <CollageImage
                src="/images/functional-medicine-lp/functional-medicine-img-7.webp"
                alt="Personalized functional medicine treatment plan and protocol"
                label="Personalized Protocols"
                width={525}
                height={558}
              />

              <FadeUp delay={0.12}>
                <p className="text-lg leading-relaxed text-stone">
                  Designed for individuals dealing with complex or ongoing health concerns
                  who want a deeper, highly individualized functional medicine approach.
                  This doctor-led care focuses on identifying and addressing the root
                  causes of illness through comprehensive testing, advanced personalized
                  treatment plans, ongoing clinical guidance, and close follow-up
                  management.
                </p>

                <div className="mt-7 rounded-3xl border border-brand/10 bg-white p-8 shadow-card">
                  <ul className="flex flex-col gap-5">
                    {[
                      "Comprehensive functional lab testing",
                      "Personalized treatment plans",
                      "Ongoing clinical guidance",
                      "Close follow-up management care",
                    ].map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        className="flex items-start gap-3"
                      >
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                          <CheckCircle2 size={16} />
                        </span>
                        <span className="font-medium text-brand">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 text-base italic text-stone">
                  Telehealth appointments available, see a functional medicine doctor
                  from anywhere in NJ, PA, and beyond.
                </p>

                <div className="mt-8">
                  <PrimaryCTA onClick={openModal}>Book Your Free Consultation</PrimaryCTA>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*  TESTING SECTION                                                 */}
        {/* --------------------------------------------------------------- */}
        <section id="testing" className="bg-white py-20 scroll-mt-28 lg:py-28">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
            <FadeUp className="text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                Functional Lab Testing
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand sm:text-4xl">
                We test deeper, so we can{" "}
                <span className="font-script text-4xl font-normal text-accent sm:text-5xl">
                  treat smarter
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-stone sm:mx-0">
                Standard bloodwork only tells part of the story. Our functional lab
                testing reveals the root-cause drivers behind chronic symptoms.
              </p>
            </FadeUp>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
              <CollageImage
                src="/images/functional-medicine-lp/fb639531-1408-5ca9-90bb-1d0370501c61.webp"
                alt="Root-cause medicine and integrative functional lab testing"
                label="Root-Cause Medicine"
                width={1080}
                height={1080}
                className="lg:col-span-5"
              />

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {[
                {
                  icon: Droplets,
                  title: "Gut Microbiome Testing",
                  body: "Map bacterial balance, digestion, and inflammation driving gut and immune issues.",
                },
                {
                  icon: FlaskConical,
                  title: "Hormone Panel Testing",
                  body: "Thyroid, adrenal, and sex-hormone panels to uncover fatigue, mood, and metabolic imbalances.",
                },
                {
                  icon: TestTube,
                  title: "Food Sensitivity Testing",
                  body: "Identify reactive foods quietly fueling inflammation, bloating, and brain fog.",
                },
                {
                  icon: Microscope,
                  title: "Micronutrient Analysis",
                  body: "Pinpoint vitamin and mineral deficiencies that standard panels overlook.",
                },
                {
                  icon: ShieldCheck,
                  title: "Autoimmune & Lyme Markers",
                  body: "Advanced screening for autoimmune activity and tick-borne illness.",
                },
                {
                  icon: Activity,
                  title: "Metabolic & Inflammation",
                  body: "Track inflammation and metabolic markers that predict long-term health.",
                },
              ].map((c, i) => (
                <FadeUp key={c.title} delay={i * 0.06}>
                  <div className="flex h-full items-start gap-4 rounded-3xl border border-brand/10 bg-cream-light p-6 transition-all hover:-translate-y-1 hover:shadow-card">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-accent">
                      <c.icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-brand">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-stone">{c.body}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*  WHY CHOOSE                                                      */}
        {/* --------------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-dark py-20 text-white lg:py-28">
          <DarkMotionField />
          <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
            <FadeUp className="text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
                Why Patients Choose Us
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                A functional medicine clinic built around{" "}
                <span className="font-script text-4xl font-normal text-accent sm:text-5xl">
                  you
                </span>
              </h2>
            </FadeUp>

            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
              <CollageImage
                src="/images/functional-medicine-lp/telehealth.webp"
                alt="Functional medicine telehealth appointment from anywhere in NJ and PA"
                label="Telehealth Visits"
                width={656}
                height={656}
                dark
                className="lg:sticky lg:top-8 lg:col-span-5"
              />

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                {[
                  {
                    icon: Stethoscope,
                    title: "Doctor-Led Care",
                    body: "Every plan is guided by an experienced functional medicine doctor, not handed off.",
                  },
                  {
                    icon: Video,
                    title: "Telehealth Available",
                    body: "See a functional medicine doctor near you or from home, anywhere in NJ & PA.",
                  },
                  {
                    icon: Compass,
                    title: "Root-Cause Focus",
                    body: "We resolve the why behind your symptoms instead of masking them long-term.",
                  },
                  {
                    icon: HeartPulse,
                    title: "Whole-Person Plans",
                    body: "Nutrition, labs, lifestyle, and clinical care working together as one protocol.",
                  },
                ].map((c, i) => (
                  <FadeUp key={c.title} delay={i * 0.08}>
                    <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:border-accent/40">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-brand-dark">
                        <c.icon size={22} />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-bold">{c.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{c.body}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/*  OFFER / CTA                                                     */}
        {/* --------------------------------------------------------------- */}
        <section id="offer" className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-dark py-20 text-white scroll-mt-28 lg:py-28">
          <DarkMotionField />
          <span
            aria-hidden="true"
            className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-steel/25 blur-3xl"
          />

          <div className="relative mx-auto max-w-[1320px] px-5 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              {/* Left — message */}
              <FadeUp className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-steel-light backdrop-blur">
                  <Sparkles size={12} className="text-accent" /> Limited Consultations
                </span>
                <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.9rem]">
                  Start with a free{" "}
                  <span className="font-script text-5xl font-normal text-accent sm:text-6xl">
                    30-minute
                  </span>{" "}
                  consultation
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                  Speak with Dr. Chris before you commit. We&rsquo;ll review your case and
                  determine if functional medicine is the right fit for you. No pressure.
                  No obligation.
                </p>

                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
                  {[
                    "No-obligation review",
                    "Doctor-led consultation",
                    "Telehealth & in-office",
                  ].map((t) => (
                    <li key={t} className="inline-flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent" />
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <PrimaryCTA onClick={openModal}>Claim My Free Consultation</PrimaryCTA>
                  <GhostCTA href={PHONE_NJ_TEL}>{PHONE_NJ}</GhostCTA>
                </div>
              </FadeUp>

              {/* Right — glass stat card */}
              <FadeUp delay={0.15} className="lg:col-span-5">
                <div className="relative rounded-[28px] border border-white/15 bg-white/5 p-8 shadow-card-hover backdrop-blur-md">
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                    className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full border border-dashed border-white/15"
                  />
                  <div className="flex items-center gap-2 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mt-4 font-display text-xl font-bold leading-snug">
                    Trusted by patients across NJ &amp; PA
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {[
                      { big: <Counter end={2000} suffix="+" />, label: "Patients Served" },
                      { big: <Counter end={30} suffix=" min" />, label: "Free Consult" },
                      { big: "2", label: "NJ & PA Offices" },
                      { big: "100%", label: "Doctor-Led" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                      >
                        <p className="font-display text-2xl font-bold text-white">{s.big}</p>
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-center text-xs text-white/55">
                    Telehealth available · Merchantville, NJ &amp; Chalfont, PA
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------------- */}
      {/*  Footer                                                            */}
      {/* ----------------------------------------------------------------- */}
      <footer className="bg-brand-dark text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-5 px-5 pb-28 pt-12 text-center sm:pb-12 lg:px-10">
          <Image
            src="/images/logo.webp"
            alt="Your Health Now"
            width={150}
            height={50}
            className="h-auto w-[150px] rounded-lg bg-white/95 px-3 py-2"
          />
          <FMCPBadge size={88} className="text-white" linked={false} />
          <a
            href={PHONE_NJ_TEL}
            className="inline-flex items-center gap-2 text-lg font-bold text-accent transition-colors hover:text-white"
          >
            <Phone size={16} /> {PHONE_NJ}
          </a>
          <p className="max-w-2xl text-xs leading-relaxed text-white/55">
            © 2026 Your Health Now. All rights reserved. The information on this page is
            for general educational purposes only and is not medical advice. Results vary
            by individual. Telehealth available across NJ &amp; PA.
          </p>
        </div>
      </footer>

      {/* Sticky mobile CTA bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-brand/10 bg-white/95 p-3 backdrop-blur sm:hidden"
      >
        <a
          href={PHONE_NJ_TEL}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 py-3 text-sm font-bold text-brand"
          aria-label={`Call ${PHONE_NJ}`}
        >
          <Phone size={16} className="text-accent-dark" /> Call Now
        </a>
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-sm font-bold text-brand-dark shadow-card"
        >
          Book Consultation
          <ArrowUpRight size={15} />
        </button>
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/*  Lead form modal — GoHighLevel embed, opened by every CTA button   */}
      {/* ----------------------------------------------------------------- */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book your free consultation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/80 p-3 backdrop-blur-md sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-[28px] bg-white shadow-card-hover ring-1 ring-brand/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Branded header */}
              <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-dark px-6 pb-7 pt-6 text-white sm:px-8 sm:pt-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-steel/25 blur-3xl"
                />
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-accent hover:bg-white/20 hover:text-accent"
                >
                  <X size={18} />
                </button>
                <span className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                  <Sparkles size={12} /> Free 30-Min Consultation
                </span>
                <h2 className="relative mt-3 max-w-sm font-display text-2xl font-bold leading-tight sm:text-[1.75rem]">
                  Let&apos;s find the{" "}
                  <span className="font-script text-3xl font-normal text-accent sm:text-4xl">
                    root cause
                  </span>
                </h2>
                <p className="relative mt-2 max-w-sm text-sm text-white/70">
                  Fill out the quick form below and our team will reach out to
                  confirm your complimentary consultation.
                </p>
              </div>

              {/* Form / confirmation */}
              {formSubmitted ? (
                <div className="relative flex min-h-[360px] flex-1 flex-col items-center justify-center gap-5 overflow-hidden bg-gradient-to-b from-mist/60 via-white to-white px-6 py-16 text-center sm:px-10">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-3xl"
                  />
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-white shadow-lg shadow-accent/30 ring-8 ring-accent/10"
                  >
                    <CheckCircle2 size={40} strokeWidth={2.25} />
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="relative flex flex-col items-center gap-2"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-dark">
                      <Sparkles size={12} /> You&apos;re all set
                    </span>
                    <h3 className="font-display text-2xl font-bold text-brand sm:text-[1.7rem]">
                      Thank You for Submitting Your Information!
                    </h3>
                    <p className="max-w-sm text-sm leading-relaxed text-stone">
                      Your details have been received. You&apos;ll now be
                      redirected to our booking page to choose a convenient
                      date and time for your appointment.
                    </p>
                  </motion.div>
                  <div className="relative flex w-48 flex-col items-center gap-2">
                    <span className="h-1.5 w-full overflow-hidden rounded-full bg-brand/10">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-accent to-accent-dark"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                      />
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wide text-steel">
                      Redirecting to booking&hellip;
                    </span>
                  </div>
                </div>
              ) : (
                <div className="min-h-0 flex-1 overflow-y-auto bg-mist/40 p-3 sm:p-4">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-inner ring-1 ring-brand/10">
                    <iframe
                      src={LEAD_FORM_SRC}
                      style={{ width: "100%", height: "min(62vh, 700px)", border: "none", borderRadius: 16 }}
                      id={`inline-${LEAD_FORM_ID}`}
                      data-layout="{'id':'INLINE'}"
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="neverDeactivate"
                      data-deactivation-value=""
                      data-form-name="landing Page Form"
                      data-height="804"
                      data-layout-iframe-id={`inline-${LEAD_FORM_ID}`}
                      data-form-id={LEAD_FORM_ID}
                      data-cookie-consent="true"
                      data-cookie-consent-provider="auto"
                      title="landing Page Form"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
