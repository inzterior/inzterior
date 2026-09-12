// Renders the brand avatar SVGs to PNGs for social profile uploads.
// Usage: node brands/render-avatars.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const brands = ['kahnso', 'tahtami'];
const sizes = [1024, 512, 180];
const root = dirname(fileURLToPath(import.meta.url));

for (const brand of brands) {
  const src = join(root, brand, 'assets', 'avatar.svg');
  const outDir = join(root, brand, 'assets', 'png');
  await mkdir(outDir, { recursive: true });

  for (const size of sizes) {
    const out = join(outDir, `${brand}-avatar-${size}.png`);
    await sharp(src, { density: 384 }).resize(size, size).png().toFile(out);
    console.log(`wrote ${out}`);
  }
}
