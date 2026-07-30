import { google } from "googleapis";
import { Resend } from "resend";

export type LeadInput = {
  source: string;
  name: string;
  email: string;
  phone?: string;
  details?: string;
};

const PEM_BEGIN = "-----BEGIN PRIVATE KEY-----";
const PEM_END = "-----END PRIVATE KEY-----";

// Reconstructs a canonical PEM from whatever whitespace/line-break mangling
// happened in transit (env var UIs are inconsistent about preserving
// newlines in pasted multi-line values). As long as the header/footer
// markers and the base64 body between them are intact, this rebuilds a
// structurally valid key regardless of how the newlines got scrambled.
function normalizePrivateKey(raw: string) {
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  key = key.replace(/\\n/g, "\n");

  const beginIdx = key.indexOf(PEM_BEGIN);
  const endIdx = key.indexOf(PEM_END);
  if (beginIdx === -1 || endIdx === -1) {
    return key;
  }

  const body = key.slice(beginIdx + PEM_BEGIN.length, endIdx).replace(/\s+/g, "");
  const wrapped = body.match(/.{1,64}/g)?.join("\n") ?? body;

  return `${PEM_BEGIN}\n${wrapped}\n${PEM_END}\n`;
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
  let sheetName = (process.env.GOOGLE_SHEET_NAME || "Leads").trim();
  if (
    (sheetName.startsWith('"') && sheetName.endsWith('"')) ||
    (sheetName.startsWith("'") && sheetName.endsWith("'"))
  ) {
    sheetName = sheetName.slice(1, -1);
  }

  const sheets = google.sheets({ version: "v4", auth: getSheetsAuth() });
  const timestamp = new Date().toISOString();
  const range = `${sheetName}!A:F`;

  // Temporary diagnostic — the resolved range string isn't secret.
  console.log("Sheets append range diagnostic", { sheetName, range });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
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
