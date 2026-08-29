"use client";

import { useState, type FormEvent } from "react";

export const landingServices = [
  { id: "website", label: "Jauna mājaslapa" },
  { id: "ecommerce", label: "Interneta veikals" },
  { id: "mobile", label: "Mobilā aplikācija" },
  { id: "crm", label: "CRM / biznesa sistēma" },
  { id: "redesign", label: "Redesign (esošai lapai)" },
  { id: "seo", label: "SEO audits" },
  { id: "chatbot", label: "AI čatbots" },
  { id: "programming", label: "Cits" },
] as const;

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-bg-elevated px-4 py-3 text-sm text-text outline-none transition placeholder:text-dim focus:border-accent/50 focus:ring-2 focus:ring-accent/10";

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
      <div className="card p-8 text-center">
        <p className="text-2xl font-semibold text-text">Paldies!</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Saņēmām jūsu pieteikumu. Sazināsimies 24 stundu laikā ar bezmaksas
          piedāvājumu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
        Saņemiet{" "}
        <span className="text-accent">bezmaksas</span> piedāvājumu
      </h2>
      <p className="mt-2 text-sm text-muted">
        Pastāstiet, kas vajadzīgs — atbildēsim 24 stundu laikā.
      </p>

      <fieldset className="mt-6">
        <legend className="mb-2.5 text-xs font-medium uppercase tracking-wider text-dim">
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
                    ? "cursor-pointer select-none rounded-full border border-accent bg-accent/10 px-3.5 py-2 text-xs font-medium text-accent"
                    : "cursor-pointer select-none rounded-full border border-border bg-bg px-3.5 py-2 text-xs font-medium text-muted hover:border-accent/30 hover:text-text"
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
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-dim">
            Vārds
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-dim">
            E-pasts
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-dim">
            Tālruņa numurs
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-dim">
            Esošā mājaslapa{" "}
            <span className="normal-case tracking-normal text-dim">(pēc izvēles)</span>
          </span>
          <input
            name="website"
            type="url"
            autoComplete="url"
            placeholder="https:// — ja jau ir"
            className={inputClass}
          />
        </label>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(10,95,168,0.42)] transition-all duration-200 hover:bg-accent-bright hover:-translate-y-0.5 active:translate-y-0 active:bg-accent-deep disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "loading" ? "Sūta…" : "Saņemt bezmaksas piedāvājumu"}
      </button>
    </form>
  );
}
