import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOTS = ["src"];
const BLOCKED = [
  "1,247+",
  "99.97%",
  "340 appts/mo",
  "2.4x increase",
  "94% renewal rate",
  "38% cart recovery",
  "10x faster hiring",
  "guaranteed SLA",
  "the actual system",
  "real results, live",
  "calculate my exact loss",
  "maps your exact daily loss",
  "break even in",
  "daily loss this stops",
  "recovered/month",
];

async function filesUnder(dir) {
  const entries = await readdir(dir);
  const out = [];
  for (const entry of entries) {
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) out.push(...await filesUnder(path));
    else if (/\.(js|jsx|ts|tsx|html)$/.test(entry)) out.push(path);
  }
  return out;
}

let failed = false;
for (const root of ROOTS) {
  for (const file of await filesUnder(root)) {
    const text = (await readFile(file, "utf8")).toLowerCase();
    for (const phrase of BLOCKED) {
      if (text.includes(phrase.toLowerCase())) {
        failed = true;
        console.error(`Blocked marketing claim: "${phrase}" in ${relative(process.cwd(), file)}`);
      }
    }
  }
}

if (failed) process.exit(1);
console.log("Marketing claim regression guard passed.");
