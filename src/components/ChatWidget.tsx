"use client";

import { useEffect } from "react";

const WIDGET_SRC = "https://bot.tavswebs.com/widget.js";
const WIDGET_ID = "78080731-2def-414c-aed5-497531cd06d5";
/** Wait for LCP / main content before competing for bandwidth on mobile. */
const IDLE_DELAY_MS = 4000;

/**
 * Injects the TavsWebs Bot embed after idle / first interaction so it does not
 * compete with fonts and LCP on slow mobile networks. Prefer DOM injection over
 * next/script so widget.js can read data-widget-id via document.currentScript.
 */
export function ChatWidget() {
  useEffect(() => {
    let loaded = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const scriptRef: { current: HTMLScriptElement | null } = { current: null };

    const cleanupListeners = () => {
      window.removeEventListener("scroll", load, true);
      window.removeEventListener("pointerdown", load, true);
      window.removeEventListener("keydown", load, true);
      window.removeEventListener("touchstart", load, true);
    };

    function load() {
      if (loaded) return;
      loaded = true;
      cleanupListeners();
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);

      const existing = document.querySelector(
        `script[data-widget-id="${WIDGET_ID}"]`,
      );
      if (existing) return;

      const script = document.createElement("script");
      script.src = WIDGET_SRC;
      script.async = true;
      script.dataset.widgetId = WIDGET_ID;
      script.onerror = () => {
        script.remove();
      };
      scriptRef.current = script;
      document.body.appendChild(script);
    }

    const schedule = () => {
      timeoutId = setTimeout(load, IDLE_DELAY_MS);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(schedule, { timeout: IDLE_DELAY_MS });
    } else {
      schedule();
    }

    window.addEventListener("scroll", load, { once: true, passive: true, capture: true });
    window.addEventListener("pointerdown", load, { once: true, passive: true, capture: true });
    window.addEventListener("keydown", load, { once: true, capture: true });
    window.addEventListener("touchstart", load, { once: true, passive: true, capture: true });

    return () => {
      loaded = true;
      cleanupListeners();
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      scriptRef.current?.remove();
      const hostId = `tavswebs-bot-host-${WIDGET_ID.replace(/[^a-zA-Z0-9_-]/g, "")}`;
      document.getElementById(hostId)?.remove();
    };
  }, []);

  return null;
}
