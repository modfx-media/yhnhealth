"use client";

import { useState } from "react";
import { US_STATE_PATHS } from "@/components/page/usStatePaths";

/**
 * Pages that already exist. Add a slug here when that state's page is published
 * and the map shape becomes a link to it.
 * Example: alabama: "/health-optimization-programs/alabama"
 */
const STATE_PAGES: Record<string, string> = {};

export default function CoverageMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-3xl border border-brand/10 bg-white p-4 shadow-card sm:p-6">
      <svg
        viewBox="0 0 959 593"
        role="img"
        aria-label="Map of the United States. Each state will open its own page when that page is published."
        className="h-auto w-full"
      >
        {US_STATE_PATHS.map((state) => {
          const href = STATE_PAGES[state.slug];
          const path = (
            <path
              d={state.d}
              strokeWidth={1}
              className="fill-[#e7e2d6] stroke-brand transition-colors hover:fill-accent"
            >
              <title>{state.name}</title>
            </path>
          );
          return (
            <g
              key={state.id}
              onMouseEnter={() => setActive(state.name)}
              onMouseLeave={() => setActive((current) => (current === state.name ? null : current))}
              onFocus={() => setActive(state.name)}
              onBlur={() => setActive((current) => (current === state.name ? null : current))}
            >
              {href ? (
                <a href={href} aria-label={state.name}>
                  {path}
                </a>
              ) : (
                path
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-4 text-center font-display text-xl font-bold text-brand" aria-live="polite">
        {active ?? "All 50 states"}
      </p>
      <p className="mt-1 text-center text-sm text-stone">
        {active
          ? "Click your state!"
          : "Click your state!"}
      </p>
    </div>
  );
}
