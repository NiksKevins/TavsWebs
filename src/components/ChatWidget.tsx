"use client";

import { useEffect } from "react";

const WIDGET_SRC = "https://bot.tavswebs.com/widget.js";
const WIDGET_ID = "78080731-2def-414c-aed5-497531cd06d5";

/**
 * Injects the TavsWebs Bot embed. Prefer DOM injection over next/script so
 * widget.js can read data-widget-id via document.currentScript.
 */
export function ChatWidget() {
  useEffect(() => {
    const existing = document.querySelector(
      `script[data-widget-id="${WIDGET_ID}"]`,
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.dataset.widgetId = WIDGET_ID;
    document.body.appendChild(script);

    return () => {
      script.remove();
      const hostId = `tavswebs-bot-host-${WIDGET_ID.replace(/[^a-zA-Z0-9_-]/g, "")}`;
      document.getElementById(hostId)?.remove();
    };
  }, []);

  return null;
}
