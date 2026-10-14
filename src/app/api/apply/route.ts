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
import { site } from "@/lib/site";

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
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPLICATION_TO_EMAIL;
  const from = process.env.APPLICATION_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[apply] Email is not configured; application logged instead:\n", Object.fromEntries(rows));
      return NextResponse.json({ ok: true });
    }
    console.error("[apply] Missing RESEND_API_KEY, APPLICATION_TO_EMAIL, or APPLICATION_FROM_EMAIL.");
    return NextResponse.json(
      { error: `Applications can't be submitted right now. Please try again later${site.contact.email ? ` or email ${site.contact.email}` : ""}.` },
      { status: 503 },
    );
  }

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n\n");
  const html = `<h2 style="font-family:sans-serif">New application: ${escape(application.fullName)}</h2>
<table cellpadding="8" style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${k}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escape(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
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
