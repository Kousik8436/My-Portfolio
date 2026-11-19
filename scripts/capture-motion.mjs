import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";

const url = process.env.PORTFOLIO_PREVIEW_URL || "http://127.0.0.1:3100";
await fs.mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference" });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await expect(page.locator(".theatre-loader")).toBeHidden({ timeout: 6000 });
  await expect.poll(() => page.locator(".hero-line > span").first().evaluate((element) => getComputedStyle(element).transform)).toBe("none");
  await page.screenshot({ path: "artifacts/desktop-animated-hero.png" });
  const top = await page.locator(".work-stage").evaluate((element) => element.getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), top + 480);
  await expect.poll(() => page.locator(".featured-grid").evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m41)).toBeLessThan(-300);
  await page.mouse.move(900, 370);
  await page.screenshot({ path: "artifacts/desktop-scroll-showcase.png" });
  await page.getByRole("link", { name: "All 18 projects" }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/desktop-archive-top.png" });
  console.log(JSON.stringify({ headerTop: await page.locator(".site-header").evaluate((element) => element.getBoundingClientRect().top), remainingPins: await page.locator(".pin-spacer").count() }));
} finally { await browser.close(); }
