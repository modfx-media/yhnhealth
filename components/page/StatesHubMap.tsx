"use client";

import { useState } from "react";
import Link from "next/link";
import { US_STATE_PATHS } from "@/components/page/usStatePaths";

export type LiveState = { slug: string; name: string; href: string };

/**
 * Hub map. Published states are links. Every other state is visible and
 * has no href, matching the rollout rule that unpublished guides have no URL.
 * Visual treatment reuses the existing map palette.
 */
export default function StatesHubMap({ live }: { live: LiveState[] }) {
  const bySlug = new Map(live.map((state) => [state.slug, state]));
  const [active, setActive] = useState<string | null>(null);
  const current = active ? bySlug.get(US_STATE_PATHS.find((state) => state.name === active)?.slug ?? "") : undefined;

  return (
    <div className="overflow-hidden rounded-3xl border border-brand/10 bg-white p-4 shadow-card sm:p-6">
      <svg
        viewBox="0 0 959 593"
        role="img"
        aria-label="United States map. Published state guides are links. Other states are marked coming soon and are not links."
        className="h-auto w-full"
      >
        {US_STATE_PATHS.map((state) => {
          const page = bySlug.get(state.slug);
          const path = (
            <path
              d={state.d}
              strokeWidth={1}
              className={
                page
                  ? "fill-accent/40 stroke-brand transition-colors hover:fill-accent"
                  : "fill-[#e7e2d6] stroke-brand"
              }
            >
              <title>{page ? `${state.name}. Open the guide.` : `${state.name}. Coming soon.`}</title>
            </path>
          );
          return (
            <g
              key={state.id}
              onMouseEnter={() => setActive(state.name)}
              onMouseLeave={() => setActive((name) => (name === state.name ? null : name))}
              onFocus={() => setActive(state.name)}
              onBlur={() => setActive((name) => (name === state.name ? null : name))}
            >
              {page ? (
                <Link href={page.href} aria-label={`${state.name} health optimization guide`}>
                  {path}
                </Link>
              ) : (
                path
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-4 text-center font-display text-xl font-bold text-brand" aria-live="polite">
        {active ?? "Select a state"}
      </p>
      <p className="mt-1 text-center text-sm text-stone">
        {active
          ? current
            ? "Guide published. Open the state page."
            : "Coming soon. No page and no URL yet."
          : "Gold states have a guide. Other states are coming soon and are not linked."}
      </p>
    </div>
  );
}
