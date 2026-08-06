#!/usr/bin/env node
// Fetches a topically relevant Pexels photo for an Inzterior article, skipping
// any photo ID already used across this user's other projects.
//
// Usage: node scripts/fetch-pexels-image.mjs <slug> "<search query>"

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const LEDGER_PATH = "E:/assets/used-pexels-ids.json";
const PUBLIC_DIR = path.resolve(process.cwd(), "public/images/articles");

const [, , slug, ...queryParts] = process.argv;
const query = queryParts.join(" ");

if (!slug || !query) {
  console.error('Usage: node scripts/fetch-pexels-image.mjs <slug> "<search query>"');
  process.exit(1);
}

const apiKey = process.env.PEXELS_API_KEY;
if (!apiKey) {
  console.error("PEXELS_API_KEY is not set. Export it or run with `node -r dotenv/config`.");
  process.exit(1);
}

const ledger = JSON.parse(await readFile(LEDGER_PATH, "utf8"));
const usedIds = new Set(ledger.usedIds);

const searchRes = await fetch(
  `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`,
  { headers: { Authorization: apiKey } },
);
if (!searchRes.ok) {
  console.error(`Pexels API error: ${searchRes.status} ${searchRes.statusText}`);
  process.exit(1);
}
const searchData = await searchRes.json();

const photo = searchData.photos.find((p) => !usedIds.has(p.id));
if (!photo) {
  console.error(`No unused Pexels photo found for query "${query}".`);
  process.exit(1);
}

const imageRes = await fetch(photo.src.large2x);
const buffer = Buffer.from(await imageRes.arrayBuffer());

await mkdir(PUBLIC_DIR, { recursive: true });
await writeFile(path.join(PUBLIC_DIR, `${slug}.jpg`), buffer);

ledger.usedIds.push(photo.id);
await writeFile(LEDGER_PATH, `${JSON.stringify(ledger, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      slug,
      alt: photo.alt || query,
      credit: photo.photographer,
      creditUrl: photo.photographer_url,
      photoId: photo.id,
    },
    null,
    2,
  ),
);
