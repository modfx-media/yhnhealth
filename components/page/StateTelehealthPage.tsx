"use client";

import Link from "next/link";
import { FlaskConical, MapPin, ShieldCheck, Sparkles, Stethoscope, Video } from "lucide-react";
import { Breadcrumbs, BookingStrip, FadeUp } from "@/components/page/Primitives";
import FMCPBadge from "@/components/FMCPBadge";
import type { TelehealthState } from "@/data/telehealth-states";

const FM_BOOKING_URL = "https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2";

/** Names like "Washington, D.C." already end in a period. */
function endSentence(name: string) {
  return name.endsWith(".") ? name : `${name}.`;
}

/** Date shown in the "Medically reviewed by" byline; bump when this template's clinical copy is revised. */
const REVIEWED_DATE = "2026-10-02";

export const STATE_PAGE_REVIEWED_DATE = REVIEWED_DATE;

export default function StateTelehealthPage({ state }: { state: TelehealthState }) {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-light via-white to-mist">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-brand/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1100px] px-6 pt-12 pb-16 lg:px-10 lg:pt-16 lg:pb-20">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Functional Medicine", href: "/functional-medicine" },
              { label: state.name },
            ]}
          />

          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand">
            <Sparkles size={11} className="text-accent" />
            Functional Medicine &middot; Telehealth
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-brand md:text-5xl lg:text-6xl">
            Functional Medicine Telehealth in{" "}
            <span className="font-script font-normal italic text-accent">{endSentence(state.name)}</span>
          </h1>

          {/* 40-60 word direct answer, with a link to the FM pillar in the first 200 words */}
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-stone">
            {state.directAnswer}{" "}
            <Link href="/functional-medicine" className="font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark">
              See how our functional medicine program works
            </Link>
            .
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={FM_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-accent-dark"
            >
              Book Your Free 30-Min Consult
            </a>
            {state.hasOffice ? (
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-brand transition-colors hover:border-accent hover:text-accent-dark"
              >
                <MapPin size={14} />
                Visit the {state.officeCity} Office
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/10 bg-cream-light px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
                <Video size={14} className="text-accent" />
                Telehealth only, no {state.name} office
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Patient-question H2 sections */}
      <section className="mx-auto max-w-[1100px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="space-y-14">
          <FadeUp>
            <h2 className="font-display text-2xl font-bold text-brand md:text-3xl">
              Is functional medicine telehealth available in {state.name}?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
              Yes. Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP, sees {state.name} residents by secure
              video visit for functional medicine care.{" "}
              {state.hasOffice
                ? `Your Health Now's in-person clinic is in ${state.officeCity}, ${state.abbreviation}, and is available any time you'd prefer to be seen in person.`
                : `Your Health Now does not have a physical office in ${state.name}; every functional medicine visit for ${state.name} residents is a telehealth visit.`}
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-display text-2xl font-bold text-brand md:text-3xl">
              Is telehealth legally licensed in {state.name}?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
              {/* TODO: needs client info - confirm Dr. Chris's specific telehealth licensing/compact status for this state before publishing */}
              Telehealth licensing rules vary by state and by provider type. Our team confirms licensing
              and scope of practice before your first visit; call or ask during your free consult if you
              have questions specific to {endSentence(state.name)}
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-brand md:text-3xl">
              How do lab tests and lab draws work in {state.name}?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
              {/* TODO: needs client info - confirm which lab partner/draw-site network is used for this state */}
              Functional medicine care often includes advanced lab testing. Your specific lab options and
              draw-site logistics in {state.name} are confirmed with you directly once a plan is in place,
              since this can depend on the test panel and your location.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <h2 className="font-display text-2xl font-bold text-brand md:text-3xl">
              What needs an in-person visit instead of telehealth?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
              Telehealth covers the conversation, review of your history, and the care plan itself. A
              physical exam, chiropractic adjustment, or in-office lab draw requires visiting one of our
              two clinics in Merchantville, NJ or Chalfont, PA.{" "}
              {state.hasOffice
                ? `For ${state.name} residents, the ${state.officeCity} office is the closest option.`
                : `${state.name} residents who want any in-person component would need to travel to one of those two clinics.`}
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="font-display text-2xl font-bold text-brand md:text-3xl">
              What does functional medicine telehealth cost, and is it covered by insurance?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone">
              {/* TODO: needs client info - confirm current self-pay pricing and insurance/superbill policy for telehealth */}
              Pricing and insurance coverage for functional medicine telehealth depend on your plan and the
              services involved. The free 30-minute consult call is the best way to get a straight answer
              for your {state.name} coverage before you book a paid visit.
            </p>
          </FadeUp>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="font-display text-2xl font-bold text-brand md:text-3xl">
            {state.name} functional medicine telehealth, frequently asked
          </h2>
          <div className="mt-6 divide-y divide-brand/10 rounded-3xl border border-brand/10 bg-cream-light/40">
            {state.faq.map((f) => (
              <div key={f.q} className="p-6">
                <p className="flex items-start gap-2 font-display text-base font-bold text-brand">
                  <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                  {f.q}
                </p>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-stone">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Author byline + medical review */}
        <div className="mt-16 flex flex-col items-start gap-6 rounded-3xl border border-brand/10 bg-white p-6 shadow-soft sm:flex-row sm:items-center">
          <FMCPBadge size={72} showLabel={false} />
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand">
              <Stethoscope size={14} className="text-accent" />
              Written by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP
            </p>
            <p className="mt-1 text-[13px] text-stone-light">
              Medically reviewed by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP &middot; Last reviewed {REVIEWED_DATE}
            </p>
            <Link
              href="/meet-the-doctor"
              className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand hover:text-accent-dark"
            >
              <FlaskConical size={12} />
              Meet the doctor
            </Link>
          </div>
        </div>
      </section>

      <BookingStrip
        fm
        eyebrow="Free 30-Min Consult"
        title={`Talk to Dr. Chris about functional medicine in ${state.name}`}
        copy="Start with a complimentary telehealth consultation call, no obligation, booked through Jane App."
      />
    </main>
  );
}
