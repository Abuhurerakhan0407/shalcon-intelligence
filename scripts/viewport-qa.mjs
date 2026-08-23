import fs from "node:fs";
import puppeteer from "puppeteer-core";

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const executablePath = chromeCandidates.find((path) => fs.existsSync(path));
if (!executablePath) throw new Error("Chrome/Chromium executable not found on CI runner");

fs.mkdirSync("qa", { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

const viewports = [
  { name: "mobile-390", width: 390, height: 844, deviceScaleFactor: 1 },
  { name: "mobile-430", width: 430, height: 932, deviceScaleFactor: 1 },
  { name: "tablet-768", width: 768, height: 1024, deviceScaleFactor: 1 },
  { name: "desktop-1440", width: 1440, height: 900, deviceScaleFactor: 1 },
];

const failures = [];

for (const viewport of viewports) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const metrics = await page.evaluate(async () => {
    const root = document.documentElement;
    const body = document.body;
    const stages = [0, 0.3, 0.6, 0.9];
    const horizontal = [];

    for (const stage of stages) {
      const y = Math.max(0, (root.scrollHeight - innerHeight) * stage);
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      window.scrollTo(99999, y);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      horizontal.push({ stage, scrollX: window.scrollX, scrollY: window.scrollY });
      window.scrollTo(0, y);
    }

    window.scrollTo(0, 0);
    const rect = root.getBoundingClientRect();
    return {
      innerWidth,
      clientWidth: root.clientWidth,
      rootWidth: rect.width,
      rootScrollWidth: root.scrollWidth,
      bodyScrollWidth: body.scrollWidth,
      horizontal,
    };
  });

  console.log(`${viewport.name}: ${JSON.stringify(metrics)}`);

  const canScrollSideways = metrics.horizontal.some((point) => Math.abs(point.scrollX) > 1);
  const rootWidthMismatch = Math.abs(metrics.rootWidth - metrics.clientWidth) > 1;
  if (canScrollSideways || rootWidthMismatch) {
    failures.push({ viewport: viewport.name, metrics });
  }

  await page.screenshot({ path: `qa/${viewport.name}-top.png`, fullPage: false });

  const project = await page.$("#projects");
  if (project) {
    await project.evaluate((node) => node.scrollIntoView({ block: "start" }));
    await new Promise((resolve) => setTimeout(resolve, 700));
    await page.screenshot({ path: `qa/${viewport.name}-projects.png`, fullPage: false });
  }

  await page.close();
}

await browser.close();

if (failures.length) {
  console.error("Horizontal viewport QA failed:", JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log("Viewport QA passed: page cannot be scrolled horizontally at all tested breakpoints.");
