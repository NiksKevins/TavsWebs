import Script from "next/script";

const WIDGET_SRC = "https://bot.tavswebs.com/widget.js";
const WIDGET_ID = "78080731-2def-414c-aed5-497531cd06d5";

export function ChatWidget() {
  return (
    <Script
      src={WIDGET_SRC}
      strategy="lazyOnload"
      data-widget-id={WIDGET_ID}
    />
  );
}
