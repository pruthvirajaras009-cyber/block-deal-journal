import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
createServer((request, response) => {
  const requested = request.url === '/' ? 'index.html' : request.url.split('?')[0].replace(/^\//, '');
  const file = normalize(join(root, requested));
  if (!file.startsWith(root) || !existsSync(file)) {
    response.writeHead(404); response.end('Not found'); return;
  }
  response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(4173, () => console.log('Block Deal Journal running at http://localhost:4173'));

