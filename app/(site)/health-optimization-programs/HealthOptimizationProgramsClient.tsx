"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useBookingPopup } from "@/components/BookingPopup";
import {
  ArrowUpRight,
  Compass,
  Stethoscope,
  Flame,
  Calendar,
  Video,
  Pill,
  Scale,
  Activity,
  Battery,
  Thermometer,
  Sparkles,
  Heart,
  Brain,
  Flame as Fire,
  User,
  Users,
  Baby,
} from "lucide-react";
import { Breadcrumbs, BookingStrip, FadeUp } from "@/components/page/Primitives";

const FEATURED = [
  {
    icon: Scale,
    title: "Healthy Weight & Metabolism Program",
    body: "Designed for individuals struggling with weight gain, difficulty losing weight, cravings, low energy, blood sugar concerns, or a \u201Cslow metabolism.\u201D This program focuses on improving metabolism, supporting healthy weight loss, balancing blood sugar, increasing energy, and helping your body function more efficiently through a personalized functional medicine approach.",
  },
  {
    icon: Activity,
    title: "Hormone Balance & Vitality Program",
    body: "Designed for individuals experiencing symptoms that may be related to hormone imbalance such as fatigue, weight changes, poor sleep, mood changes, low libido, brain fog, or decreased energy. This program focuses on restoring balance and helping you feel more energized, resilient, and like yourself again.",
  },
  {
    icon: Battery,
    title: "Energy Restoration Program",
    body: "Designed for individuals dealing with ongoing fatigue, burnout, low motivation, poor recovery, brain fog, or feeling physically and mentally drained. This program focuses on identifying and addressing factors that may be affecting your energy so you can feel stronger, think more clearly, and regain vitality.",
  },
  {
    icon: Thermometer,
    title: "Thyroid Optimization Program",
    body: "Designed for individuals struggling with symptoms commonly associated with thyroid dysfunction such as fatigue, weight gain, hair thinning, brain fog, constipation, dry skin, or feeling cold frequently. This program focuses on optimizing thyroid health and supporting the body systems connected to it.",
  },
  {
    icon: Sparkles,
    title: "Gut Restoration Program",
    body: "Designed for individuals experiencing digestive concerns such as bloating, constipation, diarrhea, reflux, abdominal discomfort, food sensitivities, or ongoing gut issues. This program focuses on improving digestive health and restoring a healthier foundation for overall wellness.",
  },
  {
    icon: Heart,
    title: "Longevity & Healthy Aging Program",
    body: "Designed for individuals who want to take a proactive approach to their health and aging. Whether your goal is maintaining energy, supporting cognitive function, improving overall wellness, or helping reduce future health risks, this program focuses on helping you feel and function at your best for years to come.",
  },
];

const ADDITIONAL = [
  {
    icon: Heart,
    title: "Heart Health Optimization Program",
    body: "Designed for individuals looking to support heart health and reduce future health risks related to cholesterol, blood pressure, inflammation, family history, or overall cardiovascular wellness. This program focuses on helping you build a healthier foundation for long-term health.",
  },
  {
    icon: Brain,
    title: "Brain Health & Cognitive Performance Program",
    body: "Designed for individuals experiencing brain fog, poor concentration, memory concerns, difficulty focusing, or those wanting to support long-term cognitive health. This program focuses on improving mental clarity, focus, and brain function while supporting healthy aging.",
  },
  {
    icon: Fire,
    title: "Inflammation & Pain Recovery Program",
    body: "Designed for individuals dealing with ongoing inflammation, chronic pain, stiffness, headaches, joint discomfort, muscle aches, or symptoms affecting everyday activities. This program focuses on identifying and addressing potential underlying contributors while helping improve function and quality of life.",
  },
  {
    icon: User,
    title: "Women's Vitality Program",
    body: "Designed for women seeking support for overall wellness through different stages of life. Whether you are experiencing hormone-related symptoms, changes in energy, menstrual concerns, menopause-related symptoms, or simply want to optimize your health, this program provides personalized guidance and support.",
  },
  {
    icon: Users,
    title: "Men's Performance & Vitality Program",
    body: "Designed for men looking to improve energy, strength, metabolism, performance, focus, recovery, and overall health. Whether your concerns involve low energy, changes in libido, aging-related changes, or optimizing long-term wellness, this program is designed to help you perform at your best.",
  },
  {
    icon: Baby,
    title: "Healthy Pregnancy Support Program",
    body: "Designed for women who are planning pregnancy, currently pregnant, or seeking additional support during the pregnancy journey. This program focuses on helping support maternal health, nutrition, wellness, and healthy development through a personalized functional medicine approach.",
  },
];

const PATHWAYS = [
  {
    months: "6-Month",
    tagline: "Focused & Targeted",
    body: "Ideal for individuals looking for focused guidance and meaningful progress in a specific area of health.",
  },
  {
    months: "12-Month",
    tagline: "Deep Transformation",
    body: "Ideal for individuals seeking a deeper and more complete health transformation, creating sustainable improvements in overall health and wellness.",
  },
];

export default function HealthOptimizationProgramsClient() {
  const { openBooking } = useBookingPopup();
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream-light">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(31,53,99,0.5) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-12 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1320px] px-6 pt-10 pb-20 lg:px-10 lg:pt-14 lg:pb-28">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Functional Medicine", href: "/functional-medicine" },
              { label: "Health Optimization Programs" },
            ]}
          />

          {/* Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/functional-medicine"
              className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-brand transition-all hover:border-accent hover:text-accent-dark"
            >
              <Stethoscope size={12} />
              Personalized Clinical Care
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
              <Compass size={12} className="text-accent" />
              Health Optimization Programs
            </span>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand">
                <Sparkles size={11} className="text-accent" />
                Proactive · Structured · Doctor-Led
              </span>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.0] text-brand md:text-6xl lg:text-[5rem]">
                Health Optimization{" "}
                <span className="font-script font-normal italic text-accent">Programs.</span>
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                style={{ transformOrigin: "left" }}
                className="mt-6 h-[3px] w-24 bg-accent"
              />
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-stone">
                Designed for individuals who want to proactively improve their health, energy,
                longevity, metabolism, hormone balance, and overall wellness through a structured
                functional medicine approach, even if you are not currently dealing with
                major illness or complex medical conditions.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone">
                These guided comprehensive programs provide targeted lab work, personalized
                recommendations, a structured roadmap, education, accountability, and ongoing
                support to help you optimize your health and prevent future disease.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-4">
              <div className="rounded-3xl border border-brand/10 bg-white p-7 shadow-card">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                  How It Starts
                </p>
                <p className="mt-3 font-display text-2xl font-bold text-brand">
                  90-minute telehealth visit with the Doctor.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-stone">
                  <li className="flex items-start gap-2">
                    <Video size={14} className="mt-0.5 shrink-0 text-accent-dark" />
                    Comprehensive intake &amp; goal setting
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar size={14} className="mt-0.5 shrink-0 text-accent-dark" />
                    Choose 6- or 12-month pathway
                  </li>
                  <li className="flex items-start gap-2">
                    <Pill size={14} className="mt-0.5 shrink-0 text-accent-dark" />
                    Professional supplements purchased separately &amp; discounted for patients
                  </li>
                </ul>
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
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-accent"
                >
                  Book Free Consultation
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* PATHWAYS */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeUp className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              Choose Your Pathway
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Two structured timelines.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />
            <p className="mt-5 text-sm leading-relaxed text-stone">
              For each program, patients choose a pathway that matches the depth and pace of
              transformation they&rsquo;re after.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PATHWAYS.map((p, i) => (
              <motion.div
                key={p.months}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-3xl border border-brand/10 bg-cream-light p-8 shadow-card md:p-10"
              >
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/10 blur-3xl"
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                  {p.tagline}
                </p>
                <p className="mt-3 font-display text-5xl font-bold leading-none text-brand md:text-6xl">
                  {p.months}
                </p>
                <div className="mt-5 h-[2px] w-16 bg-accent" />
                <p className="mt-5 text-base leading-relaxed text-stone">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMS */}
      <section className="bg-cream-light py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeUp className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              <Flame size={12} className="text-accent-dark" />
              Featured Programs · Highest Demand in NJ &amp; PA
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Six flagship pathways.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />
            <p className="mt-5 text-base leading-relaxed text-stone">
              Our most-requested programs, each rooted in functional medicine and tailored
              to your biology.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand/10 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-accent-dark">
                  <Flame size={10} />
                  Hot
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                  <p.icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold leading-tight text-brand">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{p.body}</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-accent-dark">
                  6- or 12-Month Pathway
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:-translate-y-0.5"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ADDITIONAL PROGRAMS */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeUp className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              Additional Programs
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Six more specialized pathways.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ADDITIONAL.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group flex h-full flex-col rounded-2xl border border-brand/10 bg-cream-light p-7 transition-all hover:bg-white hover:shadow-card"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-dark">
                  <p.icon size={18} strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-tight text-brand">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{p.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CLARITY / CROSS-LINK */}
      <section className="bg-cream-light py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              Not the right fit?
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Dealing with complex or chronic illness?
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-20 bg-accent" />
            <p className="mt-5 text-base leading-relaxed text-stone">
              If you&rsquo;re managing chronic symptoms, multiple health concerns, or conditions
              that have not improved with conventional approaches, our doctor-led{" "}
              <span className="font-semibold text-brand">Personalized Clinical Care</span> is built
              for you.
            </p>
            <Link
              href="/functional-medicine"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-accent"
            >
              Explore Personalized Clinical Care
              <ArrowUpRight size={13} />
            </Link>
          </FadeUp>
        </div>
      </section>

      <BookingStrip
        variant="navy"
        eyebrow="Get Started"
        title="A complimentary 30-minute consultation."
        copy="Speak with the Doctor to find the program that fits your goals, weight, hormones, energy, longevity, and more."
        fm
      />
    </main>
  );
}
