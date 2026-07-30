import { NextResponse } from "next/server";
import { appendLeadToSheet, sendLeadNotification, type LeadInput } from "@/lib/leads";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "Website";
  const details = typeof body.details === "string" ? body.details.trim() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const lead: LeadInput = { source, name, email, phone, details };

  try {
    await appendLeadToSheet(lead);
  } catch (err) {
    console.error("Failed to save lead to Google Sheet", err);
    return NextResponse.json(
      {
        error:
          "We couldn't save your details right now. Please email inquiry@inzterior.com directly.",
      },
      { status: 502 }
    );
  }

  try {
    await sendLeadNotification(lead);
  } catch (err) {
    // The lead is already saved to the Sheet — don't fail the request over a notification issue.
    console.error("Failed to send lead notification email", err);
  }

  return NextResponse.json({ ok: true });
}
