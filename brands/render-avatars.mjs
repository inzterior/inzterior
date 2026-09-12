// Renders the brand avatar SVGs to PNGs for social profile uploads.
// Usage: node brands/render-avatars.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const brands = ['kahnso', 'tahtami'];
const sizes = [1024, 512, 180];
const lockupWidth = 1200;
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

  for (const variant of ['lockup', 'lockup-on-dark', 'lockup-on-light']) {
    const lockupOut = join(outDir, `${brand}-${variant}-${lockupWidth}.png`);
    await sharp(join(root, brand, 'assets', `${variant}.svg`), { density: 288 })
      .resize(lockupWidth).png().toFile(lockupOut);
    console.log(`wrote ${lockupOut}`);
  }
}
