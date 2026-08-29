import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const DIRECTORY_ROOTS = ["src", "public"];
const STANDALONE_FILES = ["index.html"];
const BLOCKED = [
  "1,247+",
  "99.97%",
  "340 appts/mo",
  "2.4x increase",
  "94% renewal rate",
  "38% cart recovery",
  "10x faster hiring",
  "guaranteed sla",
  "the actual system",
  "real results, live",
  "calculate my exact loss",
  "maps your exact daily loss",
  "break even in",
  "daily loss this stops",
  "recovered/month",
  "zero missed calls",
  "0 missed calls",
  "guaranteed roi",
];

async function filesUnder(dir) {
  const entries = await readdir(dir);
  const out = [];
  for (const entry of entries) {
    const filePath = join(dir, entry);
    const info = await stat(filePath);
    if (info.isDirectory()) out.push(...await filesUnder(filePath));
    else if (/\.(js|jsx|ts|tsx|html)$/.test(entry)) out.push(filePath);
  }
  return out;
}

const files = [
  ...DIRECTORY_ROOTS.flatMap((root) => []),
];
for (const root of DIRECTORY_ROOTS) files.push(...await filesUnder(root));
files.push(...STANDALONE_FILES);

let failed = false;
for (const file of files) {
  const text = (await readFile(file, "utf8")).toLowerCase();
  for (const phrase of BLOCKED) {
    if (text.includes(phrase.toLowerCase())) {
      failed = true;
      console.error(`Blocked marketing claim: "${phrase}" in ${relative(process.cwd(), file)}`);
    }
  }
}

if (failed) process.exit(1);
console.log(`Marketing claim regression guard passed across ${files.length} public/runtime files.`);
