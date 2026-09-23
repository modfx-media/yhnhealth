"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, HeartPulse, Sparkles, Users, Shield, Atom, GraduationCap, Award } from "lucide-react";
import { Breadcrumbs, FadeUp } from "@/components/page/Primitives";

const TIMELINE = [
  {
    year: "Foundation",
    title: "A salutogenic philosophy",
    body: "YHN was built on the principle of salutogenesis - health promotion rather than symptom suppression. Every protocol exists to make patients healthier, not just less sick.",
    icon: HeartPulse,
  },
  {
    year: "Family Practice",
    title: "Three generations of doctors",
    body: "Dr. Chris Chianese, Dr. Marc Chianese, and Dr. Lillee Chianese - each Summa or Magna Cum Laude - combined their distinct specialties under one roof, supported by Office Director Barbara Chianese.",
    icon: Users,
  },
  {
    year: "Two Locations",
    title: "Merchantville, NJ & Chalfont, PA",
    body: "Care delivered where our patients live. Two flagship offices serve South Jersey and Bucks County families with the same standard of clinical rigor.",
    icon: Shield,
  },
  {
    year: "Post-Graduate",
    title: "Founders of the CPSC seminars",
    body: "Dr. Chris Chianese founded the Certification in Patient-Specific Chiropractic seminar series - six modules of post-graduate training that now educate practicing doctors nationwide.",
    icon: GraduationCap,
  },
  {
    year: "Today",
    title: "Functional medicine integration",
    body: "Beyond chiropractic, YHN now offers full functional medicine - root-cause investigation, lab-driven protocols, and integrative nutrition for the whole person.",
    icon: Atom,
  },
];

const VALUES = [
  {
    icon: HeartPulse,
    title: "Salutogenic Approach",
    body: "Health promotion, not just disease management. We help patients of all ages be healthier - not just less sick.",
  },
  {
    icon: Sparkles,
    title: "Root-Cause First",
    body: "We identify and treat what's actually driving the problem, producing health rather than masking symptoms.",
  },
  {
    icon: Award,
    title: "Clinical Excellence",
    body: "Continuing post-graduate education, advanced certifications, and evidence-based protocols underpin every visit.",
  },
];

export default function AboutUsClient() {
  return (
    <main className="bg-white">
      {/* HERO - dark navy, no photo, abstract texture */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, white 1px, transparent 1.2px), radial-gradient(circle at 70% 80%, white 1px, transparent 1.2px)",
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
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="absolute -bottom-32 -left-40 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-brand-light/40 via-brand-light/10 to-transparent blur-3xl"
        />

        <div className="relative mx-auto max-w-[1320px] px-6 pt-12 pb-24 lg:px-10 lg:pt-16 lg:pb-32">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-accent backdrop-blur-sm"
          >
            <Sparkles size={11} />
            Established Family Practice
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-5xl font-display text-6xl font-bold leading-[0.92] tracking-tight md:text-7xl lg:text-[7.5rem]"
          >
            About <span className="font-script font-normal italic text-accent">Us.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75"
          >
            A multi-generational team of doctors who treat every patient as more than their condition - using the most contemporary, science-backed chiropractic and functional medicine available today.
          </motion.p>
        </div>
      </section>

      {/* MISSION - 2-col oversized pull quote */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Our Mission</p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <span aria-hidden="true" className="font-display text-7xl leading-none text-accent/40">&ldquo;</span>
              <p className="mt-2 font-display text-3xl font-bold leading-[1.15] text-accent md:text-4xl lg:text-5xl">
                The YHN Practice exists to provide the highest quality of Healthcare available today, at the most affordable price, helping people of all ages achieve the quality of life they deserve.
              </p>
            </motion.blockquote>

            <FadeUp delay={0.15} className="lg:col-span-5 lg:pt-6">
              <p className="text-base leading-relaxed text-stone">
                Our practice was built on a single conviction: that healthcare should produce health - not simply manage disease. We bring a salutogenic approach to every patient encounter, working to make people healthier and not just &lsquo;less sick&rsquo;.
              </p>
              <p className="mt-5 text-base leading-relaxed text-stone">
                That means starting with the root cause, listening longer, testing more thoughtfully, and refusing to treat symptoms in isolation. It is, simply, the kind of care our family wants for our own family.
              </p>
              <Link
                href="/meet-the-doctor"
                className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand transition-all hover:text-accent-dark"
              >
                Meet our family team
                <ArrowUpRight size={13} />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* TIMELINE - alternating L/R, slide-in from sides */}
      <section className="relative bg-cream-light">
        <div className="mx-auto max-w-[1100px] px-6 py-24 lg:px-10 lg:py-32">
          <FadeUp className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Our Story</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-brand md:text-5xl lg:text-6xl">
              How YHN came to be.
            </h2>
          </FadeUp>

          <div className="relative mt-20">
            <div
              aria-hidden="true"
              className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent md:left-1/2 md:-translate-x-1/2"
            />

            <ol className="space-y-12 md:space-y-20">
              {TIMELINE.map((item, i) => {
                const isRight = i % 2 === 1;
                const Icon = item.icon;
                return (
                  <li key={item.year} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute left-6 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-cream-light md:left-1/2"
                    />

                    <motion.article
                      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.6, delay: 0.05 }}
                      className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${isRight ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
                    >
                      <div className="rounded-2xl border border-brand/10 bg-white p-7 shadow-card md:p-9">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/5 text-accent-dark">
                            <Icon size={18} strokeWidth={1.75} />
                          </span>
                          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                            {item.year}
                          </p>
                        </div>
                        <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-brand md:text-[1.65rem]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-stone">{item.body}</p>
                      </div>
                    </motion.article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* VALUES - 3-col icon cards on cream */}
      <section className="relative bg-cream-light">
        <div className="mx-auto max-w-[1320px] px-6 pb-24 lg:px-10 lg:pb-32">
          <FadeUp>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">What We Believe</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-brand md:text-5xl">
              The principles that shape every patient visit.
            </h2>
          </FadeUp>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <motion.li
                  key={v.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                  }}
                  className="group rounded-2xl border border-brand/10 bg-white p-8 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark text-white shadow-card">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-7 font-display text-xl font-bold text-brand">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{v.body}</p>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      {/* CTA STRIP - navy w/ two buttons */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-dashed border-white/10"
        />
        <div className="relative mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center lg:px-10 lg:py-20">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">Take The Next Step</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Ready to meet the team behind your care?
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/meet-the-doctor"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-accent-dark"
            >
              Meet Our Team
              <ArrowUpRight size={13} />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:border-accent hover:bg-white/5"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
