import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  applicationSchema,
  AVAILABILITY,
  EXPERIENCE,
  labelFor,
  LICENSE_STATUS,
  type Application,
} from "@/lib/application";
import { emailConfig } from "@/lib/email";
import { site } from "@/lib/site";

const NOT_ACCEPTING = `Online applications aren't open yet, so your application was not sent.${
  site.contact.email ? ` Email ${site.contact.email} instead.` : ""
}`;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function summarize(a: Application) {
  return [
    ["Name", a.fullName],
    ["Email", a.email],
    ["Phone", a.phone],
    ["State", a.state],
    ["License status", labelFor(LICENSE_STATUS, a.licenseStatus)],
    ["Experience", labelFor(EXPERIENCE, a.experience)],
    ["Availability", a.availability.map((v) => labelFor(AVAILABILITY, v)).join(", ")],
    ["Schedule notes", a.availabilityNotes || "—"],
    ["Why they're interested", a.motivation],
  ] as const;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Some fields are missing or invalid. Check the form and try again." }, { status: 400 });
  }

  // Bots fill the hidden honeypot field; accept quietly and drop it.
  if (parsed.data.company) return NextResponse.json({ ok: true });

  const application = parsed.data;
  const rows = summarize(application);
  const config = emailConfig();

  // Never report success unless the application was actually delivered.
  if (!config) {
    console.error("[apply] Application not delivered: RESEND_API_KEY, APPLICATION_TO_EMAIL, or APPLICATION_FROM_EMAIL is missing.");
    return NextResponse.json({ error: NOT_ACCEPTING }, { status: 503 });
  }

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n\n");
  const html = `<h2 style="font-family:sans-serif">New application: ${escape(application.fullName)}</h2>
<table cellpadding="8" style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${k}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const { error } = await new Resend(config.apiKey).emails.send({
    from: config.from,
    to: config.to,
    replyTo: application.email,
    subject: `New application: ${application.fullName} (${labelFor(LICENSE_STATUS, application.licenseStatus)}, ${application.state})`,
    text,
    html,
  });

  if (error) {
    console.error("[apply] Resend error:", error);
    return NextResponse.json({ error: "Your application didn't go through. Please try again in a few minutes." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
