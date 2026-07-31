import { Resend } from "resend";
import { NextResponse } from "next/server";
import { site } from "@/lib/data";

export const runtime = "nodejs";

const SERVICE_LABELS: Record<string, string> = {
  website: "Jauna mājaslapa",
  ecommerce: "Interneta veikals",
  mobile: "Mobilā aplikācija",
  crm: "CRM / biznesa sistēma",
  redesign: "Redesign",
  seo: "SEO audits",
  programming: "Cita programmēšana",
};

type LeadPayload = {
  name?: string;
  email?: string;
  website?: string;
  phone?: string;
  services?: string[];
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 },
      );
    }

    const body = (await request.json()) as LeadPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const website = body.website?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const services = Array.isArray(body.services)
      ? body.services.filter((s) => typeof s === "string" && s in SERVICE_LABELS)
      : [];
    const source = body.source?.trim() || "landing.tavswebs.com";

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Lūdzu, aizpildiet vārdu, e-pastu un tālruni." },
        { status: 400 },
      );
    }

    if (services.length === 0) {
      return NextResponse.json(
        { error: "Izvēlieties vismaz vienu pakalpojumu." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Nederīga e-pasta adrese." },
        { status: 400 },
      );
    }

    if (name.length > 200 || website.length > 500 || phone.length > 40) {
      return NextResponse.json({ error: "Payload too large." }, { status: 400 });
    }

    const serviceLabels = services.map((id) => SERVICE_LABELS[id] ?? id);
    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? site.email;
    const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Jauns piedāvājums — ${name}`,
      text: [
        `Jauns lead no Facebook / landing lapas`,
        ``,
        `Vārds: ${name}`,
        `E-pasts: ${email}`,
        `Tālrunis: ${phone}`,
        `Pakalpojumi: ${serviceLabels.join(", ")}`,
        `Esošā mājaslapa: ${website || "—"}`,
        `Avots: ${source}`,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a">
          <h2 style="margin:0 0 12px">Jauns piedāvājuma pieteikums</h2>
          <p style="margin:0 0 16px;color:#64748b">Avots: ${escapeHtml(source)}</p>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:6px 0;color:#64748b">Vārds</td><td style="padding:6px 0"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">E-pasts</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Tālrunis</td><td style="padding:6px 0"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Pakalpojumi</td><td style="padding:6px 0"><strong>${escapeHtml(serviceLabels.join(", "))}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Esošā mājaslapa</td><td style="padding:6px 0">${escapeHtml(website || "—")}</td></tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("[audit-lead] Resend error:", error);
      return NextResponse.json(
        { error: "Neizdevās nosūtīt. Mēģiniet vēlreiz." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[audit-lead] Unexpected error:", err);
    return NextResponse.json(
      { error: "Neparedzēta kļūda." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
