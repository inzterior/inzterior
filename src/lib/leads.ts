import { google } from "googleapis";
import { Resend } from "resend";

export type LeadInput = {
  source: string;
  name: string;
  email: string;
  phone?: string;
  details?: string;
};

function normalizePrivateKey(raw: string) {
  let key = raw.trim();
  // Strip wrapping quotes — a common copy-paste mistake when pulling the
  // value out of the downloaded service account JSON file.
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
}

function getSheetsAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const key = rawKey ? normalizePrivateKey(rawKey) : undefined;

  if (!email || !key) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY environment variables."
    );
  }

  // Temporary diagnostic — logs only non-secret shape info (length, line
  // count, and the boilerplate PEM markers), never the key material itself.
  console.log("GOOGLE_PRIVATE_KEY diagnostic", {
    length: key.length,
    lineCount: key.split("\n").length,
    startsWithHeader: key.startsWith("-----BEGIN PRIVATE KEY-----"),
    endsWithFooter: key.trim().endsWith("-----END PRIVATE KEY-----"),
    first20: key.slice(0, 20),
    last20: key.slice(-20),
  });

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendLeadToSheet(lead: LeadInput) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID environment variable.");
  }
  const sheetName = process.env.GOOGLE_SHEET_NAME || "Leads";

  const sheets = google.sheets({ version: "v4", auth: getSheetsAuth() });
  const timestamp = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:F`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [timestamp, lead.source, lead.name, lead.email, lead.phone || "", lead.details || ""],
      ],
    },
  });
}

export async function sendLeadNotification(lead: LeadInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Email notification is optional — the Sheet is the source of truth.
    return;
  }

  const resend = new Resend(apiKey);
  const to = process.env.LEADS_NOTIFY_EMAIL || "inquiry@inzterior.com";
  const from = process.env.RESEND_FROM_EMAIL || "Inzterior Leads <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    subject: `New Lead — ${lead.source} — ${lead.name}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone || "-"}`,
      `Source: ${lead.source}`,
      "",
      lead.details || "",
    ].join("\n"),
  });
}
