"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Award, BookOpen, Activity, Briefcase } from "lucide-react";
import { Breadcrumbs, FadeUp } from "@/components/page/Primitives";
import FMCPBadge from "@/components/FMCPBadge";

type Doc = {
  name: string;
  slug: string;
  credentials: string;
  role: string;
  bio: string[];
  src: string;
  accent: string; // gradient frame around portrait
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  badges: string[];
};

const TEAM: Doc[] = [
  {
    name: "Dr. Chris Chianese",
    slug: "dr-chris",
    credentials: "MS, DC, CPSC, FMCP",
    role: "Functional Medicine Physician · Chiropractic Physician · Applied Nutritionist",
    src: "/images/team/chris.webp",
    accent: "from-brand via-brand-dark to-brand-light",
    icon: Award,
    badges: ["MS Applied Nutrition", "DC Sherman", "CPSC Founder", "FMCP (IFM)", "IASTM", "ART", "Functional Neurology"],
    bio: [
      "Dr. Chris graduated with his Bachelor of Science in Biology from Marist College Cum Laude. He graduated with his Master of Science in Applied Nutrition from Canisius College, with a minor in Exercise Physiology. He was the 7th student to ever achieve Summa Cum Laude (4.0 GPA). His Master's Thesis [Medical Nutrition Therapy in Soft Tissue Treatment & Rehabilitation] is All-But-Published.",
      "He graduated with his Doctor of Chiropractic from Sherman College Summa Cum Laude (3.9 GPA). Dr. Chris received the Milton Garfunkel Distinction Award, the highest honor awarded in each graduating class. As the recipient of this top award, he delivered the Farewell Address at the graduation ceremony. He received most all other graduation honors including the Clinical Excellence Distinction Award, Academy of Chiropractic Excellence Award, and X Ray Internship Award. Dr. Chris is the founder and Lead Instructor of the Certification in PatientSpecific Chiropractic (CPSC) seminar series, post-graduate clinical training that provides Continuing Education in functional analysis for practicing doctors. He is also a Speaker who provides corporate Health & Wellness education and Ergonomic Specialty care.",
      "He has achieved further advanced training in Instrument Assisted Soft Tissue Mobilization (IASTM), Active Release Technique (ART), Functional Neurology, and Neuromusculoskeletal Functional Analysis & Rehabilitation. He is a Functional Medicine Specialist, a member of & listed provider for The Institute for Functional Medicine (IFM), which is the most prestigious organization for functional medicine in the world. Dr. Chris holds the FMCP (Functional Medicine Certified Professional) credential through IFM, the gold-standard, highest level of certification in functional medicine.",
      "Dr. Chris is passionate about getting to the root cause of his patient's health concerns and preventing further health problems before they start. As a leading Doctor of Chiropractic, Dr. Chris is the authority on conservative management of neuromusculoskeletal conditions. As a Functional Medicine Specialist, Dr. Chris is the authority on management of complex health problems, including chronic illness and disease. In all his work, Dr. Chris brings a salutogenic (health promotion) approach to his patient care, helping people of all ages achieve the life they deserve.",
    ],
  },
  {
    name: "Dr. Marc Chianese",
    slug: "dr-marc",
    credentials: "MS, DC, CPSC",
    role: "Chiropractic Physician · Sports & Athletic Care",
    src: "/images/team/marc.webp",
    accent: "from-accent via-accent-dark to-brand",
    icon: Activity,
    badges: ["MS Sport Health Science", "DC Life University", "CPSC Instructor", "IASTM", "ART"],
    bio: [
      "Dr. Marc Chianese earned his Bachelor of Science in Biology from St. Joseph's University, his Master's in Sport Health Science (Sports Chiropractic), and his Doctor of Chiropractic degree from Life University.",
      "With extensive experience treating athletes of all levels, Dr. Marc specializes in helping patients recover from injury, improve performance, and restore optimal function. He has completed advanced training in Neuromusculoskeletal Functional Analysis & Rehabilitation, Instrument Assisted Soft Tissue Mobilization (IASTM), and Active Release Technique (ART).",
      "In addition to patient care, Dr. Marc serves as an instructor for the Certification in Patient-Specific Chiropractic (CPSC), a post-graduate continuing education program for healthcare professionals. He is also a sought-after speaker who provides corporate health, wellness, and ergonomic education.",
      "Dr. Marc is passionate about identifying the root cause of health concerns and helping patients achieve long-term results through conservative, evidence-based care. His goal is to help individuals of all ages move better, feel better, and live healthier lives.",
      "Outside the office, Dr. Marc is an avid fitness enthusiast and accomplished musician.",
    ],
  },
  {
    name: "Dr. Lillee Chianese",
    slug: "dr-lillee",
    credentials: "DC, ART, CPSC, NRCME",
    role: "Chiropractic Physician · Pregnancy & Pediatric Care · DOT Physicals",
    src: "/images/team/lillee.webp",
    accent: "from-brand-light via-brand to-brand-dark",
    icon: BookOpen,
    badges: ["DC Sherman Summa Cum Laude", "Webster Technique Certified", "ART Elite Provider", "CPSC Instructor", "NRCME", "IASTM"],
    bio: [
      "Dr. Lillee Chianese earned her Bachelor of Science in Exercise Physiology and graduated Summa Cum Laude from Sherman College of Chiropractic, finishing second in her graduating class. Throughout her academic career, she received numerous honors for academic excellence, clinical achievement, and National Board performance.",
      "Dr. Lillee is Webster Technique Certified. She has completed advanced training in Instrument Assisted Soft Tissue Mobilization (IASTM), Neuromusculoskeletal Functional Analysis & Rehabilitation, and is an Elite Provider in Active Release Technique (ART). Dr. Lillee also serves as an instructor for the Certification in Patient-Specific Chiropractic (CPSC), a post-graduate continuing education program for healthcare professionals.",
      "In addition, Dr. Lillee is a Nationally Registered Certified Medical Examiner (NRCME) for the U.S. Federal Motor Carrier Safety Administration, allowing her to perform DOT physical examinations for commercial drivers.",
      "Dr. Lillee is passionate about helping patients identify and address the root cause of their health concerns through conservative, evidence-based care. Her goal is to help individuals of all ages improve function, prevent future injuries, and achieve lasting health and wellness.",
      "Outside the clinic, Dr. Lillee is an accomplished equestrian who enjoys spending time outdoors and staying active.",
    ],
  },
  {
    name: "Barbara Chianese",
    slug: "barbara",
    credentials: "Office Director",
    role: "Practice Operations",
    src: "/images/team/barbara.webp",
    accent: "from-accent-dark via-accent to-brand-light",
    icon: Briefcase,
    badges: ["20+ Years Leadership", "Healthcare Operations", "Patient Experience", "Provider Relations"],
    bio: [
      "With more than 20 years of leadership and administrative experience, Barbara Chianese oversees the daily operations of our practice, including scheduling, billing, insurance coordination, patient communications, and provider relations.",
      "Her background includes executive leadership roles in healthcare and professional organizations, giving her a wealth of experience in creating exceptional patient experiences and efficient office operations.",
      "Patients know Barbara not only for her expertise but also for her kindness, compassion, and genuine commitment to helping every individual who walks through our doors feel welcomed and supported.",
    ],
  },
];

const ALL_BADGES = [
  "MS Applied Nutrition",
  "DC Sherman College",
  "Summa Cum Laude",
  "CPSC Founder & Lead Instructor",
  "Active Release Technique (ART)",
  "IASTM Certified",
  "Functional Neurology",
  "Neuromusculoskeletal Functional Analysis",
  "MS Sport Health Science",
  "DC Life University",
  "ART Elite Provider",
  "NRCME · FMCSA",
  "Milton Garfunkel Distinction",
  "Clinical Excellence Award",
  "Academy of Chiropractic Excellence",
  "X-Ray Internship Award",
  "20+ Years HR Leadership",
];

export default function MeetTheDoctorClient() {
  return (
    <main className="bg-white">
      {/* HERO - cream, no full-bleed photo */}
      <section className="relative bg-cream-light">
        <div className="mx-auto max-w-[1320px] px-6 pt-12 pb-20 lg:px-10 lg:pt-16 lg:pb-28">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Meet The Team" }]} />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Our Family Team</p>
              <h1 className="mt-5 font-display text-6xl font-bold leading-[0.92] text-brand md:text-7xl lg:text-[7.5rem]">
                Meet The <span className="font-script font-normal italic text-accent">Team.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.15} className="lg:col-span-4">
              <p className="max-w-md text-base leading-relaxed text-stone">
                A multi-generational family of doctors and operators, each bringing decades of training, certifications, and a shared salutogenic approach to your care.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* DOCTORS - alternating editorial rows */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">The Doctors</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Three doctors. One philosophy.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />
          </FadeUp>

          <div className="mt-16 space-y-20 md:space-y-24">
            {TEAM.slice(0, 3).map((doc, i) => {
              const Icon = doc.icon;
              const reverse = i % 2 === 1;
              return (
                <motion.article
                  key={doc.name}
                  id={doc.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 scroll-mt-32"
                >
                  {/* Portrait - compact 4:5 */}
                  <div className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-mist shadow-card lg:sticky lg:top-28">
                      <Image
                        src={doc.src}
                        alt={`${doc.name}, ${doc.credentials}`}
                        fill
                        sizes="(min-width:1024px) 40vw, 100vw"
                        className="object-cover object-center"
                        priority={i === 0}
                      />
                      <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-dark/55 via-brand-dark/10 to-transparent" />
                      <div className="absolute bottom-5 left-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-dark">
                          <Icon size={12} className="text-accent-dark" />
                          {doc.credentials}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-stone">
                      0{i + 1} / 03
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-brand md:text-[2.25rem]">
                      {doc.name}
                    </h3>
                    <p className="mt-3 text-sm font-semibold text-stone">{doc.role}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {doc.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full border border-brand/15 bg-mist/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-stone">
                      {doc.bio.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {doc.slug === "dr-chris" && (
                      <div className="mt-7 border-t border-brand/10 pt-6 text-brand">
                        <FMCPBadge size={112} />
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPERATIONS - slim featured row for Barbara */}
      {TEAM[3] && (
        <section id={TEAM[3].slug} className="relative bg-cream-light scroll-mt-32">
          <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-24">
            <FadeUp className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Operations</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
                The person who makes it run.
              </h2>
              <div className="mt-4 h-[3px] w-20 bg-accent" />
            </FadeUp>

            <FadeUp delay={0.1} className="mt-12">
              <article className="grid gap-8 overflow-hidden rounded-3xl border border-brand/10 bg-white p-6 shadow-card md:grid-cols-12 md:p-8">
                <div className="md:col-span-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
                    <Image
                      src={TEAM[3].src}
                      alt={TEAM[3].name}
                      fill
                      sizes="(min-width:768px) 30vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="md:col-span-8">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                    <Briefcase className="h-3.5 w-3.5" />
                    {TEAM[3].credentials}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-brand md:text-3xl">
                    {TEAM[3].name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-stone">{TEAM[3].role}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {TEAM[3].badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-full border border-brand/15 bg-mist/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-stone">
                    {TEAM[3].bio.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            </FadeUp>
          </div>
        </section>
      )}

      {/* CREDENTIALS - horizontal scrolling badge strip */}
      <section className="relative overflow-hidden bg-brand-dark py-14 text-white">
        <FadeUp className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">Credentials &amp; Accreditations</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Decades of training, distilled.
          </h2>
        </FadeUp>

        <div className="relative mt-10">
          {/* edge fades */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-dark to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-dark to-transparent" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-3 px-6 lg:px-10"
          >
            {[...ALL_BADGES, ...ALL_BADGES].map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white/85 backdrop-blur-sm"
              >
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-cream-light">
        <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10 lg:py-28">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Visit Us</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-brand md:text-5xl lg:text-6xl">
              Ready to meet us in <span className="font-script font-normal italic text-accent">person?</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone">
              Stop by our Merchantville, NJ or Chalfont, PA office - or schedule online and we&rsquo;ll greet you when you arrive.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-accent"
              >
                Find a Location
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-brand/15 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-brand transition-all hover:bg-white"
              >
                Send a Message
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
