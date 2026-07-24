import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body style={{ background: "#05070c", color: "#fff", fontFamily: "sans-serif", padding: 40 }}>
        <h1>404</h1>
        <p>Page not found.</p>
      </body>
    </html>
  );
}
