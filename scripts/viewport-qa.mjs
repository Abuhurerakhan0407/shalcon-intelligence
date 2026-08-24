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
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.setViewport(viewport);
  await page.goto("http://127.0.0.1:4173", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const metrics = await page.evaluate(async () => {
    const root = document.documentElement;
    const body = document.body;
    const main = document.querySelector("main");
    const stages = [0, 0.3, 0.6, 0.9];
    const horizontal = [];
    const maxY = Math.max(0, root.scrollHeight - innerHeight);

    for (const stage of stages) {
      const y = maxY * stage;
      window.scrollTo({ left: 0, top: y, behavior: "instant" });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const verticalY = window.scrollY;
      window.scrollBy({ left: 99999, top: 0, behavior: "instant" });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      horizontal.push({ stage, expectedY: Math.round(y), verticalY, scrollX: window.scrollX, scrollY: window.scrollY });
      window.scrollTo({ left: 0, top: verticalY, behavior: "instant" });
    }

    window.scrollTo({ left: 0, top: maxY, behavior: "instant" });
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const bottomScrollY = window.scrollY;
    window.scrollTo({ left: 0, top: 0, behavior: "instant" });

    const rect = root.getBoundingClientRect();
    return {
      innerWidth,
      innerHeight,
      clientWidth: root.clientWidth,
      rootWidth: rect.width,
      rootScrollWidth: root.scrollWidth,
      bodyScrollWidth: body.scrollWidth,
      rootScrollHeight: root.scrollHeight,
      bodyScrollHeight: body.scrollHeight,
      mainHeight: main?.getBoundingClientRect().height || 0,
      sectionCount: document.querySelectorAll("main section").length,
      textLength: main?.innerText?.length || 0,
      bottomScrollY,
      horizontal,
    };
  });

  console.log(`${viewport.name}: ${JSON.stringify(metrics)}`);

  const canScrollSideways = metrics.horizontal.some((point) => Math.abs(point.scrollX) > 1);
  const rootWidthMismatch = Math.abs(metrics.rootWidth - metrics.clientWidth) > 1;
  const pageTooShort = metrics.rootScrollHeight < metrics.innerHeight * 4 || metrics.sectionCount < 6;
  const cannotReachPage = metrics.bottomScrollY < metrics.innerHeight * 3;
  const hasRuntimeErrors = runtimeErrors.length > 0;

  if (canScrollSideways || rootWidthMismatch || pageTooShort || cannotReachPage || hasRuntimeErrors) {
    failures.push({ viewport: viewport.name, metrics, runtimeErrors });
  }

  await page.screenshot({ path: `qa/${viewport.name}-top.png`, fullPage: false });

  const project = await page.$("#projects");
  if (project) {
    await project.evaluate((node) => node.scrollIntoView({ block: "start" }));
    await new Promise((resolve) => setTimeout(resolve, 750));
    await page.screenshot({ path: `qa/${viewport.name}-projects.png`, fullPage: false });
  }

  await page.close();
}

await browser.close();

if (failures.length) {
  console.error("Responsive viewport QA failed:", JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log("Viewport QA passed: referral portfolio renders fully, scrolls vertically, has no runtime exceptions, and cannot be scrolled horizontally at any tested breakpoint.");
