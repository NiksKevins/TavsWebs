import { Resend } from "resend";
import { NextResponse } from "next/server";
import { site } from "@/lib/data";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  description?: string;
  locale?: string;
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

    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const budget = body.budget?.trim() ?? "";
    const description = body.description?.trim() ?? "";
    const locale = body.locale === "en" ? "en" : "lv";

    if (!name || !email || !budget || !description) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    if (description.length > 5000 || name.length > 200) {
      return NextResponse.json({ error: "Payload too large." }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? site.email;
    const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New project inquiry — ${company || name}`,
      text: [
        `New inquiry from the TavsWebs website`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Budget: ${budget}`,
        `Locale: ${locale}`,
        ``,
        `Project description:`,
        description,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a">
          <h2 style="margin:0 0 12px">New project inquiry</h2>
          <p style="margin:0 0 16px;color:#64748b">Submitted via tavswebs.com (${locale})</p>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:6px 0;color:#64748b">Name</td><td style="padding:6px 0"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Company</td><td style="padding:6px 0">${escapeHtml(company || "—")}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Budget</td><td style="padding:6px 0">${escapeHtml(budget)}</td></tr>
          </table>
          <h3 style="margin:24px 0 8px">Project description</h3>
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(description)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
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
