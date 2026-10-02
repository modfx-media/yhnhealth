"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Atom, Microscope, Heart, Sparkles, ListChecks, Stethoscope, Compass, Phone, MapPin, Video } from "lucide-react";
import { Breadcrumbs, BookingStrip, FadeUp } from "@/components/page/Primitives";
import { useBookingPopup } from "@/components/BookingPopup";
import FMCPBadge from "@/components/FMCPBadge";
import { TELEHEALTH_STATES } from "@/data/telehealth-states";

const PILLARS = [
  { icon: Atom, title: "Root-Cause Analysis", body: "We investigate biochemistry, gut health, hormones, and lifestyle to find why symptoms appear, not just what they look like." },
  { icon: Microscope, title: "Functional Diagnostic Testing", body: "Comprehensive testing that goes beyond standard panels: micronutrients, food sensitivity, hormonal panels, and gut microbiome analysis." },
  { icon: Heart, title: "Personalized Care Plan", body: "Your protocol is built around your biology, your history, and your goals, not a one-size-fits-all template." },
  { icon: ListChecks, title: "Ongoing Optimization", body: "Functional medicine is iterative. We measure, adjust, and refine until you're not just less sick, you're well." },
];

const CONDITIONS = [
  "Chronic Fatigue & Energy",
  "Digestive Issues & Gut Health",
  "Hormone Imbalances",
  "Autoimmune Conditions",
  "Lyme Disease & Tick-Borne",
  "Inflammation & Pain",
  "Brain Fog & Mood",
  "Metabolic Health",
];

export default function FunctionalMedicineClient() {
  const { openBooking } = useBookingPopup();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-cream-light via-white to-mist">
        <motion.div style={{ y }} aria-hidden="true" className="absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <motion.div style={{ y }} aria-hidden="true" className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1320px] px-6 pt-12 pb-20 lg:px-10 lg:pt-16 lg:pb-32">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Functional Medicine", href: "/functional-medicine" }, { label: "Personalized Clinical Care" }]} />

          {/* Tab switcher */}
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
              <Stethoscope size={12} className="text-accent" />
              Personalized Clinical Care
            </span>
            <Link
              href="/health-optimization-programs"
              className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-brand transition-all hover:border-accent hover:text-accent-dark"
            >
              <Compass size={12} />
              Health Optimization Programs
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand"
              >
                <Sparkles size={11} className="text-accent" />
                Beyond Symptom Management
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 font-display text-5xl font-bold leading-[0.95] text-brand md:text-6xl lg:text-[5.5rem]"
              >
                Functional <span className="font-script font-normal italic text-accent">Medicine.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-stone"
              >
                Where conventional medicine has failed to find the answer, functional medicine asks the next question. We address complex chronic conditions by treating the whole biology, not just the diagnosis.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <Link
                  href="https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openBooking(
                      "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2"
                    );
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-accent"
                >
                  Free Consultation Call
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  href="/meet-the-doctor"
                  className="inline-flex items-center gap-2 rounded-full border border-brand/15 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand transition-all hover:bg-mist"
                >
                  Meet Dr. Chris
                </Link>
                <a
                  href="tel:6096517436"
                  className="inline-flex items-center gap-2 rounded-full border border-brand/15 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand transition-all hover:bg-mist"
                >
                  <Phone size={14} />
                  Call (609) 651-7436
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-8 text-brand"
              >
                <FMCPBadge size={112} />
              </motion.div>
            </div>

            {/* Hero video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative mx-auto w-full max-w-[320px] lg:col-span-5 lg:max-w-[380px]"
            >
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-[2rem] border border-dashed border-brand/15"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-accent/15 via-transparent to-brand/10 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-brand/10 bg-brand-dark shadow-card">
                <div className="relative aspect-[9/16] w-full">
                  <iframe
                    src="https://player.vimeo.com/video/1200442621?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title="Functional Medicine, Your Health Now"
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative bg-brand-dark text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">Our Approach</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
              Four pillars of functional care.
            </h2>
          </FadeUp>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:bg-white/10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
                  <p.icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{p.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Clinical Care explainer */}
      <section className="bg-cream-light">
        <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <FadeUp className="lg:col-span-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Care Pathway</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-brand md:text-5xl">
                Personalized <span className="font-script font-normal italic text-accent">Clinical Care.</span>
              </h2>
              <div className="mt-5 h-[3px] w-20 bg-accent" />
              <p className="mt-6 text-base leading-relaxed text-stone">
                Designed for individuals dealing with more complex or ongoing health concerns who are looking for a deeper, highly individualized functional medicine approach.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="lg:col-span-7">
              <div className="rounded-3xl border border-brand/10 bg-white p-7 shadow-card md:p-9">
                <p className="text-base leading-relaxed text-stone">
                  This doctor-led care focuses on identifying and addressing the root causes of illness through{" "}
                  <span className="font-semibold text-brand">comprehensive testing</span>,{" "}
                  <span className="font-semibold text-brand">advanced personalized treatment plans</span>,{" "}
                  <span className="font-semibold text-brand">ongoing clinical guidance</span>, and{" "}
                  <span className="font-semibold text-brand">close follow-up management care</span>.
                </p>
                <p className="mt-5 text-base leading-relaxed text-stone">
                  Ideal for those struggling with chronic symptoms, complex illness, multiple health concerns, or conditions that have not fully improved with conventional approaches.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    "Comprehensive testing",
                    "Personalized treatment plans",
                    "Ongoing clinical guidance",
                    "Close follow-up management",
                  ].map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 rounded-xl border border-brand/10 bg-cream-light px-4 py-3"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="text-sm font-semibold text-brand">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-brand/10 bg-cream-light p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">Looking to optimize, not treat?</p>
                  <p className="mt-2 text-sm text-stone">
                    If you&rsquo;re proactively focused on energy, longevity, hormones, or metabolism, our 12 structured programs may be a better fit.
                  </p>
                  <Link
                    href="/health-optimization-programs"
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand hover:text-accent-dark"
                  >
                    Explore Health Optimization Programs
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Conditions list */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <FadeUp className="lg:col-span-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Conditions We Address</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-brand md:text-5xl">
                When conventional care leaves you with{" "}
                <span className="font-script font-normal italic text-accent">questions.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-stone">
                Functional medicine is at its best with complex, chronic, multi-system conditions. If you&rsquo;ve been told your test results are &ldquo;normal&rdquo; but you don&rsquo;t feel well, this is for you.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CONDITIONS.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="flex items-center gap-3 rounded-xl border border-brand/10 bg-mist/40 px-5 py-4 transition-all hover:border-accent/30 hover:bg-white"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="text-sm font-semibold text-brand">{c}</span>
                  </motion.li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* How a visit works. Shared clinical depth lives here, not copied onto every state page. */}
      <section className="relative bg-cream-light">
        <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-24">
          <div id="visit" className="scroll-mt-[120px]">
          <FadeUp>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">The Visit</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-brand md:text-5xl">
              How a functional medicine visit works.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-stone">
              This is the same pathway in every state we serve. What changes by state is whether a clinic is nearby and what time the video visit lands on your clock. Those details are on the state pages. Licensing, which testing network is used, and what a visit costs are confirmed with you on the consult. They are not guessed on this page.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <FadeUp>
              <article className="h-full rounded-3xl border border-brand/10 bg-white p-7 shadow-card md:p-9">
                <h3 className="font-display text-2xl font-bold text-brand">The free 30-minute consult</h3>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  The first step is a complimentary 30-minute call with Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. It is a fit check. You talk through why you are calling. It is not a treatment visit, and it is not a diagnosis.
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  Use it to find out whether Personalized Clinical Care is the right path. If you are proactively focused on energy, longevity, hormones, or metabolism, the 12{" "}
                  <Link href="/health-optimization-programs" className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark">
                    Health Optimization Programs
                  </Link>{" "}
                  may fit better. If the case is complex, ongoing, or has not improved with conventional care, this clinical pathway is the one to discuss.
                </p>
              </article>
            </FadeUp>
            <FadeUp delay={0.08}>
              <article className="h-full rounded-3xl border border-brand/10 bg-white p-7 shadow-card md:p-9">
                <h3 className="font-display text-2xl font-bold text-brand">If you continue</h3>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  The clinical visit reviews your health history, current symptoms, and goals, then whether functional diagnostic testing makes sense for your case. From there the work is comprehensive testing, a treatment plan built around your history, ongoing clinical guidance, and close follow-up.
                </p>
                <p className="mt-4 text-base leading-relaxed text-stone">
                  That conversation can happen by secure video from any of the nine states, or in person at Merchantville or Chalfont if you would rather be in the room. Video does not shorten the agenda. It changes where you sit.
                </p>
              </article>
            </FadeUp>
          </div>

          <FadeUp className="mt-8">
            <div className="max-w-3xl">
              <h3 className="font-display text-2xl font-bold text-brand">What this program is for</h3>
              <p className="mt-4 text-base leading-relaxed text-stone">
                Functional medicine here is aimed at complex, chronic, multi-system problems: fatigue and energy, digestion and gut health, hormone imbalance, autoimmune conditions, Lyme disease and other tick-borne illness, inflammation and pain, brain fog and mood, and metabolic health. If standard testing has been called normal and you still do not feel well, bring that to the consult. Dr. Chris&apos;s own history with chronic Lyme, and how this clinic approaches it, is on the{" "}
                <Link href="/lyme-disease-solutions" className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark">
                  Lyme disease page
                </Link>
                {". His training is on "}
                <Link href="/meet-the-doctor" className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark">
                  meet the doctor
                </Link>.
              </p>
              <p className="mt-4 text-base leading-relaxed text-stone">
                The consult is also where a case can be turned away. Not every symptom picture is one we should take. That is the point of the free call.
              </p>
            </div>
          </FadeUp>
          </div>
        </div>
      </section>

      {/* States we serve by telehealth */}
      <section className="relative bg-mist/40">
        <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-24">
          <FadeUp>
            <div id="states" className="scroll-mt-[120px]">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              <Video size={12} />
              Telehealth Coverage
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight text-brand md:text-5xl">
              States we serve by functional medicine telehealth.
            </h2>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone">
              Select your preferred state.
            </p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TELEHEALTH_STATES.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link
                  href={`/functional-medicine/${s.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-brand/10 bg-white px-5 py-4 transition-all hover:border-accent/40 hover:shadow-card"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-brand">
                    <MapPin size={14} className="text-accent" />
                    {s.name}
                    {s.hasOffice && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-accent-dark">
                        + office
                      </span>
                    )}
                  </span>
                  <ArrowUpRight size={14} className="text-stone-light transition-colors group-hover:text-accent" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingStrip
        variant="navy"
        eyebrow="Schedule"
        title="A complimentary 30-minute consultation."
        copy="Speak with Dr. Chris before you commit. We'll discuss your case and whether functional medicine is the right fit."
        fm
      />
    </main>
  );
}
