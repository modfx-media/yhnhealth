"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle, Users, Award, Stethoscope, FlaskConical, Activity } from "lucide-react";

const FEATURES = [
  {
    icon: FlaskConical,
    title: "Functional Medicine",
    body: "Doctor-led, root-cause investigation for chronic conditions, fatigue, hormones, gut health, and complex illness - built on a personalized care plan, clinical protocols, and close clinical follow-up.",
    image: "/images/yhn-clone/practice.webp",
    highlight: "Root-Cause Care",
    href: "/functional-medicine",
  },
  {
    icon: Activity,
    title: "Chiropractic & Manual Care",
    body: "Patient-specific adjustments, decompression, ART, IASTM, and percussion therapy - precision hands-on care for pain, mobility, and nervous-system function across every life stage.",
    image: "/images/yhn-clone/testimonials.jpg",
    imagePosition: "object-top",
    highlight: "Hands-On Care",
    href: "/family-chiropractic-care",
  },
];

const BADGES = [
  { icon: Stethoscope, label: "Functional & Integrative Medicine" },
  { icon: CheckCircle, label: "Board Certified Providers" },
  { icon: Award, label: "Multiple Advanced Accreditations" },
  { icon: Users, label: "Family-Friendly Care" },
];

export default function BetterCareSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-mist px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-dark">
              <span className="h-1 w-1 rounded-full bg-accent" />
              The YHN Difference
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-brand md:text-5xl lg:text-6xl">
              A better{" "}
              <span className="font-script font-normal italic text-accent">
                care
              </span>{" "}
              experience
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg leading-relaxed text-stone lg:col-span-5"
          >
            Two complementary tracks of care under one roof - functional
            medicine for the deeper picture, chiropractic and manual therapy
            for the hands-on relief. You get both, working together, in
            Merchantville and Chalfont.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {FEATURES.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover"
              >
                <Link
                  href={card.href}
                  aria-label={`${card.title} - learn the YHN approach`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={`object-cover ${card.imagePosition ?? ""} transition-transform duration-700 group-hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-brand/20 to-transparent" />
                    <span className="absolute left-6 top-6 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand backdrop-blur">
                      {card.highlight}
                    </span>
                  </div>

                  <div className="relative p-6 sm:p-8 lg:p-10">
                    <div className="absolute -top-7 right-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-card transition-colors duration-500 group-hover:bg-accent">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-dark">
                      0{i + 1} · Care Track
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-brand md:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-stone">{card.body}</p>

                    <div className="mt-6 flex items-center gap-3 border-t border-brand/10 pt-5">
                      <span className="h-px w-8 bg-accent transition-all duration-500 group-hover:w-12" />
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone transition-colors duration-500 group-hover:text-accent-dark">
                        Learn the YHN approach
                        <ArrowUpRight
                          size={12}
                          className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 grid grid-cols-2 gap-6 rounded-2xl border border-brand/10 bg-mist/60 p-6 md:grid-cols-4 md:p-8"
        >
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent-dark shadow-soft">
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                  {b.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
