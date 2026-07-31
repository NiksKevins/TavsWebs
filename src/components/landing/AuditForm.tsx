"use client";

import { useState, type FormEvent } from "react";

const fields = [
  { name: "name", label: "Vārds", type: "text", autoComplete: "name" },
  { name: "email", label: "E-pasts", type: "email", autoComplete: "email" },
  {
    name: "website",
    label: "Mājaslapas adrese",
    type: "url",
    autoComplete: "url",
    placeholder: "https://",
  },
  { name: "phone", label: "Tālruņa numurs", type: "tel", autoComplete: "tel" },
] as const;

type Status = "idle" | "loading" | "success" | "error";

export function AuditForm({ source = "landing.tavswebs.com" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/audit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          website: data.get("website"),
          phone: data.get("phone"),
          source,
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Neizdevās nosūtīt.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("Neizdevās nosūtīt. Mēģiniet vēlreiz.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#5EEAD4]/30 bg-[#0a0a0a] p-8 text-center">
        <p className="text-2xl font-semibold text-white">Paldies!</p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Saņēmām jūsu pieteikumu. Sazināsimies 24 stundu laikā ar bezmaksas
          audita rezultātiem.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)] sm:p-8"
    >
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        Saņemiet savu{" "}
        <span className="text-[#5EEAD4]">BEZMAKSAS</span> auditu
      </h2>
      <p className="mt-2 text-sm text-white/55">
        Aizpildiet formu un mēs ar jums sazināsimies 24 stundu laikā.
      </p>

      <div className="mt-6 space-y-4">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/45">
              {field.label}
            </span>
            <input
              name={field.name}
              type={field.type}
              required
              autoComplete={field.autoComplete}
              placeholder={"placeholder" in field ? field.placeholder : undefined}
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#5EEAD4]/50 focus:ring-1 focus:ring-[#5EEAD4]/40"
            />
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-xl bg-[#5EEAD4] px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-[#7af0dc] disabled:opacity-60"
      >
        {status === "loading" ? "Sūta…" : "Saņemt bezmaksas auditu"}
      </button>
    </form>
  );
}
