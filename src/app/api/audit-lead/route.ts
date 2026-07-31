import { Resend } from "resend";
import { NextResponse } from "next/server";
import { site } from "@/lib/data";

export const runtime = "nodejs";

type AuditLeadPayload = {
  name?: string;
  email?: string;
  website?: string;
  phone?: string;
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

    const body = (await request.json()) as AuditLeadPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const website = body.website?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const source = body.source?.trim() || "landing.tavswebs.com";

    if (!name || !email || !website || !phone) {
      return NextResponse.json(
        { error: "Lūdzu, aizpildiet visus laukus." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Nederīga e-pasta adrese." },
        { status: 400 },
      );
    }

    if (
      name.length > 200 ||
      website.length > 500 ||
      phone.length > 40
    ) {
      return NextResponse.json({ error: "Payload too large." }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? site.email;
    const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Bezmaksas audits — ${name}`,
      text: [
        `Jauns lead no Facebook / landing lapas`,
        ``,
        `Vārds: ${name}`,
        `E-pasts: ${email}`,
        `Mājaslapa: ${website}`,
        `Tālrunis: ${phone}`,
        `Avots: ${source}`,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a">
          <h2 style="margin:0 0 12px">Bezmaksas audits — jauns lead</h2>
          <p style="margin:0 0 16px;color:#64748b">Avots: ${escapeHtml(source)}</p>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:6px 0;color:#64748b">Vārds</td><td style="padding:6px 0"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">E-pasts</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Mājaslapa</td><td style="padding:6px 0">${escapeHtml(website)}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Tālrunis</td><td style="padding:6px 0"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
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
