"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const alignHash = () => {
      const hash = window.location.hash;
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "auto" });
    };

    if (window.location.hash) {
      const frame = requestAnimationFrame(alignHash);
      const later = window.setTimeout(alignHash, 80);
      return () => {
        cancelAnimationFrame(frame);
        window.clearTimeout(later);
      };
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  /* When a button or nav link points to the page the user is already on,
     scroll back to the top instead of doing nothing. Handled globally with
     a single delegated listener (capture phase, so it runs before Next.js
     Link's own click handler) and applies to every link/button. */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClick = (event: MouseEvent) => {
      // Respect modifier / non-primary clicks (new tab, etc.)
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip links that intentionally open elsewhere or aren't navigations.
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;
      if (/^(mailto:|tel:|sms:|#)/i.test(href)) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // Only handle same-origin links to the exact page we're already on.
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      // Let in-page anchor links (#section) behave normally.
      if (url.hash) return;

      // Already on this page → just scroll back to the top.
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

