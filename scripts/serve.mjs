import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream";

const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};
if (!fs.existsSync(path.join(root, "index.html")))
  throw new Error("Run npm run build before starting the production preview.");

http
  .createServer((request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405).end();
      return;
    }
    let filename;
    try {
      filename = path.resolve(
        root,
        "." +
          decodeURIComponent(new URL(request.url, "http://localhost").pathname),
      );
    } catch {
      response.writeHead(400).end();
      return;
    }
    if (filename !== root && !filename.startsWith(root + path.sep)) {
      response.writeHead(403).end();
      return;
    }
    if (fs.existsSync(filename) && fs.statSync(filename).isDirectory())
      filename = path.join(filename, "index.html");
    const exists = fs.existsSync(filename) && fs.statSync(filename).isFile();
    if (!exists) filename = path.join(root, "404.html");
    response.writeHead(exists ? 200 : 404, {
      "Content-Type":
        mime[path.extname(filename)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    pipeline(fs.createReadStream(filename), response, () => {});
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Portfolio preview: http://127.0.0.1:${port}`),
  );
