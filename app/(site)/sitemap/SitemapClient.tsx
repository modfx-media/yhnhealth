"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronRight,
  Compass,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
} from "lucide-react";
import { NAV_ITEMS, isNavGroup } from "@/lib/navigation";
import { LOCATIONS, HOURS } from "@/lib/siteData";
import { CITIES, SERVICES } from "@/lib/pseoData";
import { Breadcrumbs, FadeUp } from "@/components/page/Primitives";

const TOTAL_PSEO = CITIES.length * SERVICES.length + CITIES.length + 1;

export default function SitemapPage() {
  const njCities = CITIES.filter((c) => c.state === "NJ");
  const paCities = CITIES.filter((c) => c.state === "PA");
  const totalSitePages =
    1 /* home */ +
    NAV_ITEMS.reduce((acc, item) => {
      let n = item.href ? 1 : 0;
      for (const child of item.children) {
        if (isNavGroup(child)) n += child.children.length + (child.href ? 1 : 0);
        else n += 1;
      }
      return acc + n;
    }, 0) +
    TOTAL_PSEO;

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
        <div className="relative mx-auto max-w-[1320px] px-6 pt-10 pb-16 lg:px-10 lg:pt-14 lg:pb-20">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Sitemap" }]} />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <FadeUp className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                <Compass className="h-3.5 w-3.5" />
                Full Site Index
              </span>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-brand md:text-5xl lg:text-6xl">
                Site<span className="text-accent">map</span>
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                style={{ transformOrigin: "left" }}
                className="mt-6 h-[3px] w-24 bg-accent"
              />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
                Every page on yhnhealth.com - chiropractic care, functional medicine, physiotherapy
                services, locations, resources, and {TOTAL_PSEO.toLocaleString()} local service pages
                across South Jersey and Bucks/Montgomery County, PA.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-4">
              <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-card">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                  XML Sitemap
                </p>
                <p className="mt-3 text-sm text-stone">
                  Crawler-friendly version for search engines.
                </p>
                <a
                  href="/sitemap.xml"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-accent"
                >
                  /sitemap.xml
                  <ExternalLink size={12} />
                </a>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.2} className="mt-10">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand/10 md:grid-cols-4">
              {[
                { label: "Total Pages", value: totalSitePages.toLocaleString() },
                { label: "Cities", value: String(CITIES.length) },
                { label: "Services", value: String(SERVICES.length) },
                { label: "Counties", value: "5" },
              ].map((s) => (
                <div key={s.label} className="bg-cream-light px-5 py-5 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone">
                    {s.label}
                  </div>
                  <div className="mt-2 font-display text-base font-bold text-brand md:text-lg">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* MAIN NAV */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeUp className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              Main Navigation
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Pages on Your Health Now.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />
          </FadeUp>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/"
              className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-brand/10 bg-cream-light p-5 transition-all hover:bg-white hover:shadow-card"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                  Top Level
                </p>
                <p className="mt-2 font-display text-base font-bold text-brand">Home</p>
              </div>
              <ArrowUpRight
                size={14}
                className="mt-1 shrink-0 text-accent-dark transition-transform group-hover:-translate-y-0.5"
              />
            </Link>

            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-brand/10 bg-cream-light p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                  Section
                </p>
                <p className="mt-2 font-display text-base font-bold text-brand">
                  {item.href ? (
                    <Link href={item.href} className="hover:text-accent-dark">
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </p>

                {item.children.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.children.map((child) =>
                      isNavGroup(child) ? (
                        <li key={child.label}>
                          <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone">
                            <ChevronRight size={11} />
                            {child.href ? (
                              <Link href={child.href} className="hover:text-brand">
                                {child.label}
                              </Link>
                            ) : (
                              child.label
                            )}
                          </p>
                          <ul className="ml-4 mt-1 space-y-1">
                            {child.children.map((leaf) => (
                              <li key={leaf.label}>
                                <Link
                                  href={leaf.href}
                                  className="text-xs text-stone hover:text-brand"
                                >
                                  {leaf.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="flex items-center gap-1 text-xs text-stone hover:text-brand"
                          >
                            <ChevronRight size={11} className="text-accent-dark" />
                            {child.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section className="bg-cream-light py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeUp className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              Areas We Serve · {TOTAL_PSEO.toLocaleString()} pages
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Local pages across NJ &amp; PA.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />
            <p className="mt-5 text-sm leading-relaxed text-stone">
              City hubs and dedicated local service pages for every combination of {CITIES.length}{" "}
              cities and {SERVICES.length} services.
            </p>
            <Link
              href="/areas-we-serve"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-accent"
            >
              Browse Areas Index
              <ArrowUpRight size={12} />
            </Link>
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { state: "New Jersey", list: njCities },
              { state: "Pennsylvania", list: paCities },
            ].map((g) => (
              <div
                key={g.state}
                className="rounded-3xl border border-brand/10 bg-white p-6 shadow-card md:p-7"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
                  {g.state}
                </p>
                <p className="mt-1 font-display text-lg font-bold text-brand">
                  {g.list.length} city hubs
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                  {g.list.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/areas-we-serve/${c.slug}`}
                        className="group inline-flex items-center gap-1 text-sm text-stone hover:text-brand"
                      >
                        <ChevronRight
                          size={11}
                          className="text-accent-dark transition-transform group-hover:translate-x-0.5"
                        />
                        {c.name}, {c.state}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              Local Service Pages · {(CITIES.length * SERVICES.length).toLocaleString()}
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-brand md:text-3xl">
              Every service in every city.
            </p>
            <p className="mt-2 text-sm text-stone">
              Click a service to expand all {CITIES.length} city pages.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {SERVICES.map((s) => (
                <details
                  key={s.slug}
                  className="group rounded-2xl border border-brand/10 bg-white p-5 shadow-card open:shadow-card-hover"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                        {s.category}
                      </p>
                      <p className="mt-1 font-display text-base font-bold text-brand">
                        {s.name}
                      </p>
                      <p className="mt-1 text-[11px] text-stone">{CITIES.length} cities</p>
                    </div>
                    <span className="text-accent-dark transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>

                  <ul className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {CITIES.map((c) => (
                      <li key={`${s.slug}-${c.slug}`}>
                        <Link
                          href={`/areas-we-serve/${c.slug}/${s.slug}`}
                          className="group/link flex items-center gap-1 rounded-md px-2 py-1 text-xs text-stone transition-colors hover:bg-cream-light hover:text-brand"
                        >
                          <ChevronRight
                            size={10}
                            className="text-accent-dark/60 transition-transform group-hover/link:translate-x-0.5"
                          />
                          {c.name}, {c.state}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS + HOURS */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 lg:grid-cols-12 lg:px-10">
          <FadeUp className="lg:col-span-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              Visit Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              Two clinics, one practice.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.name}
                  className="rounded-2xl border border-brand/10 bg-cream-light p-6"
                >
                  <p className="font-display text-lg font-bold text-brand">{loc.name}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-stone">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-accent-dark" />
                    {loc.address}
                  </p>
                  <a
                    href={loc.tel}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent-dark"
                  >
                    <Phone size={14} className="text-accent-dark" />
                    {loc.phone}
                  </a>
                  <a
                    href={loc.social.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone hover:text-brand"
                  >
                    View on map
                    <ExternalLink size={11} />
                  </a>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">
              Office Hours
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand md:text-4xl">
              When we&rsquo;re open.
            </h2>
            <div className="mt-4 h-[3px] w-20 bg-accent" />

            <div className="mt-8 rounded-2xl border border-brand/10 bg-cream-light p-6">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent-dark">
                <Clock size={12} />
                Both Locations
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                {HOURS.map(({ day, hours, open }) => (
                  <div
                    key={day}
                    className="flex justify-between border-b border-brand/10 pb-2 last:border-0"
                  >
                    <dt className="font-semibold text-brand">{day}</dt>
                    <dd className={open ? "text-stone" : "text-stone/60"}>{hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-dark py-20 text-white md:py-24">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-32 -top-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent">
              Couldn&rsquo;t find it?
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              We&rsquo;re happy to point you the right way.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75">
              If a page you&rsquo;re looking for isn&rsquo;t listed here, send us a quick note and
              we&rsquo;ll send you the link.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-dark transition-colors hover:bg-white"
              >
                Send a Message
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/areas-we-serve"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/10"
              >
                Browse Areas
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
