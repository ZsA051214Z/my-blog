const { createServer } = require('http');
const { readFile, stat } = require('fs/promises');
const { join, extname } = require('path');
const { createReadStream } = require('fs');

const ROOT = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost:5500');
    let filePath = join(ROOT, url.pathname);
    // If path is a directory, serve index.html
    if ((await stat(filePath).catch(() => null))?.isDirectory()) {
      filePath = join(filePath, 'index.html');
    }
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 - Not Found</h1>');
  }
}).listen(5500, () => {
  console.log('Blog server running at http://localhost:5500');
});
