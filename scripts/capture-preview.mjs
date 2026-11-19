import fs from "node:fs/promises";
import { chromium } from "@playwright/test";

await fs.mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const previewUrl = process.env.PORTFOLIO_PREVIEW_URL || "http://127.0.0.1:3100";
try {
  for (const [name, width, height] of [
    ["desktop", 1440, 1000],
    ["tablet", 768, 1024],
    ["mobile", 390, 844],
    ["small-mobile", 320, 740],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    await page.goto(`${previewUrl}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `artifacts/${name}-home.png`,
      fullPage: true,
    });
    if (name === "desktop")
      await page.screenshot({ path: "artifacts/desktop-hero.png" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    console.log(JSON.stringify({ viewport: name, width, overflow }));
    await page.goto(`${previewUrl}/projects/`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `artifacts/${name}-projects.png`,
      fullPage: name !== "desktop",
    });
    console.log(
      JSON.stringify({
        viewport: name,
        route: "projects",
        overflow: await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      }),
    );
    await page.close();
  }
} finally {
  await browser.close();
}
