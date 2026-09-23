import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CITIES, SERVICES, CLINICS } from "@/lib/pseoData";
import { Breadcrumbs, FadeUp } from "@/components/page/Primitives";
import { SITE_URL } from "@/lib/siteUrl";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

const PATH = "/areas-we-serve";

const fallbackMetadata: Metadata = {
  title: { absolute: "Chiropractor near you in NJ & PA | Your Health Now" },
  description:
    "Your Health Now serves cities across South Jersey and Bucks County, PA from clinics in Merchantville, NJ and Chalfont, PA. Find chiropractic and functional medicine near you.",
  alternates: { canonical: `${SITE_URL}/areas-we-serve` },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, fallbackMetadata);
}

export default function AreasWeServePage() {
  const njCities = CITIES.filter((c) => c.state === "NJ").sort((a, b) => a.driveMin - b.driveMin);
  const paCities = CITIES.filter((c) => c.state === "PA").sort((a, b) => a.driveMin - b.driveMin);
  const totalPages = CITIES.length * SERVICES.length;

  return (
    <CMSRoute path={PATH}>
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
        <div aria-hidden className="pointer-events-none absolute -right-32 top-12 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto max-w-[1320px] px-6 pt-10 pb-16 lg:px-10 lg:pt-14 lg:pb-20">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Areas We Serve" }]} />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                <MapPin className="h-3.5 w-3.5" />
                South Jersey · Bucks · Montgomery
              </span>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-brand md:text-5xl lg:text-6xl">
                Areas We <span className="text-accent">Serve</span>
              </h1>
              <div className="mt-6 h-[3px] w-24 bg-accent" />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
                Two clinics. {CITIES.length} cities. {SERVICES.length} services. Find your town below to
                see local context, drive time, neighborhoods, and every service we offer near you.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-4">
              <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-card">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Two Clinics</p>
                <ul className="mt-4 space-y-4">
                  {Object.values(CLINICS).map((c) => (
                    <li key={c.key}>
                      <p className="font-display text-base font-bold text-brand">{c.name}</p>
                      <p className="mt-1 text-xs text-stone">{c.address}</p>
                      <a href={c.tel} className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-accent-dark">
                        {c.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.2} className="mt-10">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand/10 md:grid-cols-4">
              {[
                { label: "Cities", value: String(CITIES.length) },
                { label: "Services", value: String(SERVICES.length) },
                { label: "Local Pages", value: `${totalPages.toLocaleString()}+` },
                { label: "Counties", value: "5" },
              ].map((s) => (
                <div key={s.label} className="bg-cream-light px-5 py-5 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone">{s.label}</div>
                  <div className="mt-2 font-display text-base font-bold text-brand md:text-lg">{s.value}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* NJ + PA city grids */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1320px] space-y-16 px-6 lg:px-10">
          {[
            { label: "New Jersey", anchor: CLINICS.merchantville, list: njCities },
            { label: "Pennsylvania", anchor: CLINICS.chalfont, list: paCities },
          ].map((group) => (
            <div key={group.label}>
              <FadeUp className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                  {group.label} · Anchor clinic {group.anchor.name}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
                  Cities we serve in {group.label}.
                </h2>
                <div className="mt-4 h-[3px] w-20 bg-accent" />
              </FadeUp>

              <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.list.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/areas-we-serve/${c.slug}`}
                      className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-brand/10 bg-cream-light p-5 transition-all hover:bg-white hover:shadow-card"
                    >
                      <div>
                        <p className="font-display text-base font-bold text-brand">
                          {c.name}, {c.state}
                        </p>
                        <p className="mt-1 text-xs text-stone">
                          {c.county} County · {c.driveMin === 0 ? "Local" : `~${c.driveMin} min`}
                        </p>
                      </div>
                      <ArrowUpRight size={14} className="mt-1 shrink-0 text-accent-dark transition-transform group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE × CITY MATRIX */}
      <section className="bg-cream-light py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeUp className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">Local Service Pages</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Every service, in every city.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />
            <p className="mt-5 text-sm leading-relaxed text-stone">
              Pick a service to see all {CITIES.length} city pages, or pick a city above for a single hub.
            </p>
          </FadeUp>

          <div className="mt-10 space-y-10">
            {SERVICES.map((s) => (
              <div key={s.slug} className="rounded-3xl border border-brand/10 bg-white p-6 shadow-card md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">{s.category}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-brand md:text-2xl">{s.name}</h3>
                  </div>
                  {s.parentSlug && (
                    <Link
                      href={s.parentSlug}
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.22em] text-brand hover:text-accent-dark"
                    >
                      Service overview
                      <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {CITIES.map((c) => (
                    <li key={`${s.slug}-${c.slug}`}>
                      <Link
                        href={`/areas-we-serve/${c.slug}/${s.slug}`}
                        className="block rounded-xl border border-brand/10 bg-cream-light px-3 py-2 text-xs text-brand transition-colors hover:border-accent/40 hover:bg-white"
                      >
                        {s.name} · {c.name}, {c.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </CMSRoute>
  );
}
