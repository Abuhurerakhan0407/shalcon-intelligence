import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
const runtimeDeps = Object.keys(packageJson.dependencies || {});

const roots = ["src", "api"].map((p) => path.join(ROOT, p));
const extensions = new Set([".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx"]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (extensions.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function packageRoot(specifier) {
  if (!specifier || specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("node:")) return null;
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

const used = new Set();
const importPatterns = [
  /\bfrom\s+["']([^"']+)["']/g,
  /\bimport\s*["']([^"']+)["']/g,
  /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
  /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
];

for (const file of roots.flatMap((dir) => walk(dir))) {
  const source = fs.readFileSync(file, "utf8");
  for (const pattern of importPatterns) {
    pattern.lastIndex = 0;
    for (const match of source.matchAll(pattern)) {
      const root = packageRoot(match[1]);
      if (root) used.add(root);
    }
  }
}

const unused = runtimeDeps.filter((dep) => !used.has(dep));
const missing = [...used].filter((dep) => !runtimeDeps.includes(dep));

if (unused.length) {
  console.error(`Unused runtime dependencies: ${unused.join(", ")}`);
}
if (missing.length) {
  console.error(`Imported packages missing from dependencies: ${missing.join(", ")}`);
}

if (unused.length || missing.length) process.exit(1);
console.log(`Runtime dependency guard passed (${runtimeDeps.length} direct runtime dependencies).`);
