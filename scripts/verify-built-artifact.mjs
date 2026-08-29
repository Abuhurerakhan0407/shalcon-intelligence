import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const required = ["index.html", "privacy.html", "terms.html", "shalcon-logo.svg"];
const blockedCompiledText = [
  "LEAD_WEBHOOK_URL",
  "1,247+",
  "99.97%",
  "340 appts/mo",
  "94% renewal rate",
  "38% cart recovery",
  "10x faster hiring",
  "guaranteed roi",
];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

if (!fs.existsSync(DIST)) {
  fail("dist directory is missing");
  process.exit();
}

for (const rel of required) {
  if (!fs.existsSync(path.join(DIST, rel))) fail(`Required production artifact missing: ${rel}`);
}

const files = walk(DIST);
const textual = files.filter((file) => /\.(html|js|css|svg|json|txt)$/i.test(file));
for (const file of textual) {
  const text = fs.readFileSync(file, "utf8").toLowerCase();
  for (const blocked of blockedCompiledText) {
    if (text.includes(blocked.toLowerCase())) {
      fail(`Blocked compiled content "${blocked}" found in ${path.relative(DIST, file)}`);
    }
  }
}

const html = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const initialScripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((match) => match[1]);
const initialStyles = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)].map((match) => match[1]);

function localAsset(url) {
  const clean = String(url).split(/[?#]/)[0].replace(/^\//, "");
  return path.join(DIST, clean);
}

function gzipSize(file) {
  return zlib.gzipSync(fs.readFileSync(file)).byteLength;
}

const initialJsGzip = initialScripts
  .map(localAsset)
  .filter(fs.existsSync)
  .reduce((sum, file) => sum + gzipSize(file), 0);
const initialCssGzip = initialStyles
  .map(localAsset)
  .filter(fs.existsSync)
  .reduce((sum, file) => sum + gzipSize(file), 0);

const jsFiles = files.filter((file) => file.endsWith(".js"));
const jsGzip = jsFiles.map((file) => ({ file, bytes: gzipSize(file) }));
const totalJsGzip = jsGzip.reduce((sum, item) => sum + item.bytes, 0);
const largestJs = jsGzip.sort((a, b) => b.bytes - a.bytes)[0] || { file: "", bytes: 0 };

const KB = 1024;
const budgets = {
  initialJs: 120 * KB,
  initialCss: 20 * KB,
  largestJsChunk: 150 * KB,
  totalJs: 280 * KB,
};

if (initialJsGzip > budgets.initialJs) fail(`Initial JS gzip budget exceeded: ${(initialJsGzip / KB).toFixed(1)} KB > 120 KB`);
if (initialCssGzip > budgets.initialCss) fail(`Initial CSS gzip budget exceeded: ${(initialCssGzip / KB).toFixed(1)} KB > 20 KB`);
if (largestJs.bytes > budgets.largestJsChunk) fail(`Largest JS chunk gzip budget exceeded: ${path.basename(largestJs.file)} ${(largestJs.bytes / KB).toFixed(1)} KB > 150 KB`);
if (totalJsGzip > budgets.totalJs) fail(`Total JS gzip budget exceeded: ${(totalJsGzip / KB).toFixed(1)} KB > 280 KB`);

if (process.exitCode) process.exit(process.exitCode);

console.log(
  `Built artifact guard passed. Initial JS ${(initialJsGzip / KB).toFixed(1)} KB gzip; ` +
  `initial CSS ${(initialCssGzip / KB).toFixed(1)} KB; largest JS ${path.basename(largestJs.file)} ` +
  `${(largestJs.bytes / KB).toFixed(1)} KB; total JS ${(totalJsGzip / KB).toFixed(1)} KB.`
);
