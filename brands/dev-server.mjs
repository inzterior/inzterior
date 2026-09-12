// Local static server for previewing the brand holding pages.
// Usage: node brands/dev-server.mjs   → http://localhost:4321/kahnso/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const types = {
  '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.css': 'text/css', '.js': 'text/javascript', '.md': 'text/plain',
};

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = join(root, normalize(path).replace(/^([/\\])+/, ''));

  if (!file.startsWith(root)) {
    res.writeHead(403).end('forbidden');
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
  }
}).listen(4321, () => console.log('brands preview on http://localhost:4321/kahnso/'));
