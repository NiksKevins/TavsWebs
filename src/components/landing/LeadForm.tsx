"use client";

import { useState, type FormEvent } from "react";

export const landingServices = [
  { id: "website", label: "Jauna mājaslapa" },
  { id: "ecommerce", label: "Interneta veikals" },
  { id: "mobile", label: "Mobilā aplikācija" },
  { id: "crm", label: "CRM / biznesa sistēma" },
  { id: "redesign", label: "Redesign (esošai lapai)" },
  { id: "seo", label: "SEO audits" },
  { id: "programming", label: "Cits" },
] as const;

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({
  source = "landing.tavswebs.com",
}: {
  source?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [services, setServices] = useState<string[]>(["website"]);

  function toggleService(id: string) {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    if (services.length === 0) {
      setError("Izvēlieties vismaz vienu pakalpojumu.");
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/audit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          website: data.get("website"),
          services,
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
      setServices(["website"]);
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
          piedāvājumu.
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
        Saņemiet{" "}
        <span className="text-[#5EEAD4]">BEZMAKSAS</span> piedāvājumu
      </h2>
      <p className="mt-2 text-sm text-white/55">
        Pastāstiet, kas vajadzīgs — atbildēsim 24 stundu laikā.
      </p>

      <fieldset className="mt-6">
        <legend className="mb-2.5 text-xs font-medium uppercase tracking-wider text-white/45">
          Kas jums vajadzīgs?
        </legend>
        <div className="flex flex-wrap gap-2">
          {landingServices.map((service) => {
            const active = services.includes(service.id);
            return (
              <label
                key={service.id}
                className={
                  active
                    ? "cursor-pointer select-none rounded-full border border-[#5EEAD4] bg-[#5EEAD4]/15 px-3.5 py-2 text-xs font-medium text-[#5EEAD4] shadow-[0_0_0_1px_rgba(94,234,212,0.25)]"
                    : "cursor-pointer select-none rounded-full border border-white/25 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white/75 hover:border-white/45 hover:bg-white/[0.06] hover:text-white"
                }
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  onChange={() => toggleService(service.id)}
                />
                {service.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/45">
            Vārds
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#5EEAD4]/50 focus:ring-1 focus:ring-[#5EEAD4]/40"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/45">
            E-pasts
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#5EEAD4]/50 focus:ring-1 focus:ring-[#5EEAD4]/40"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/45">
            Tālruņa numurs
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#5EEAD4]/50 focus:ring-1 focus:ring-[#5EEAD4]/40"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/45">
            Esošā mājaslapa{" "}
            <span className="normal-case tracking-normal text-white/30">
              (pēc izvēles)
            </span>
          </span>
          <input
            name="website"
            type="url"
            autoComplete="url"
            placeholder="https:// — ja jau ir"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#5EEAD4]/50 focus:ring-1 focus:ring-[#5EEAD4]/40"
          />
        </label>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-xl bg-[#5EEAD4] px-5 py-3.5 text-sm font-semibold !text-black transition hover:bg-[#7af0dc] disabled:opacity-60"
      >
        {status === "loading" ? "Sūta…" : "Saņemt bezmaksas piedāvājumu"}
      </button>
    </form>
  );
}
