"use client";

import { useEffect } from "react";

const GAP_PX = 16;
const WIDGET_ID = "kka-chat-widget";

/**
 * Lifts the Knock Knock launcher above fixed bottom bars on small screens.
 * Uses a stylesheet so the widget script can keep owning its own inline position.
 */
export default function KnockKnockOffset() {
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-kk-offset", "");
    style.textContent = `
      @media (max-width: 767px) {
        #${WIDGET_ID} {
          bottom: var(--kk-bottom, 20px) !important;
        }
      }
    `;
    document.head.appendChild(style);

    const root = document.documentElement;
    const mq = window.matchMedia("(max-width: 767px)");
    let frame = 0;

    const place = () => {
      if (!mq.matches) {
        root.style.removeProperty("--kk-bottom");
        return;
      }

      let barHeight = 0;
      for (const bar of document.querySelectorAll<HTMLElement>("[data-sticky-bar]")) {
        const cs = getComputedStyle(bar);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const rect = bar.getBoundingClientRect();
        if (rect.height < 1 || rect.bottom < window.innerHeight - 4) continue;
        barHeight = Math.max(barHeight, rect.height);
      }

      const next = barHeight > 0 ? `${Math.ceil(barHeight + GAP_PX)}px` : "20px";
      if (root.style.getPropertyValue("--kk-bottom") !== next) {
        root.style.setProperty("--kk-bottom", next);
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        place();
      });
    };

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    mq.addEventListener("change", schedule);
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      style.remove();
      root.style.removeProperty("--kk-bottom");
    };
  }, []);

  return null;
}
