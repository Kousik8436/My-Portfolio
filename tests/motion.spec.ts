import { test, expect } from "@playwright/test";

test("the curtain loader clears and pointer or tap feedback leaves no residue", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".theatre-loader")).toBeHidden({ timeout: 6000 });
  await expect
    .poll(() =>
      page
        .locator(".hero-line > span")
        .first()
        .evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("none");
  await page.goto("/projects/");
  const category = page.getByRole("button", { name: "GenAI 7", exact: true });
  await category.dispatchEvent("pointerdown", {
    button: 0,
    clientX: 100,
    clientY: 100,
    pointerType: info.project.name === "mobile" ? "touch" : "mouse",
  });
  await expect(page.locator(".click-ripple")).toHaveCount(1);
  await category.click();
  await expect(page.locator(".archive-card")).toHaveCount(7);
  await expect(page.locator(".click-ripple")).toHaveCount(0);
  if (info.project.name === "desktop") {
    const card = page.locator(".archive-card").first();
    await card.hover({ position: { x: 40, y: 60 } });
    await expect
      .poll(() =>
        card.evaluate((element) => element.style.getPropertyValue("--spot-x")),
      )
      .not.toBe("");
  }
  expect(errors).toEqual([]);
});

test("ScrollTrigger scrubs the showcase, supports pause, and cleans up on route changes", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".theatre-loader")).toBeHidden({ timeout: 6000 });
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  const stageY = await page
    .locator(".work-stage")
    .evaluate((element) => element.getBoundingClientRect().top + scrollY);
  await page.evaluate(
    (top) => scrollTo({ top, behavior: "instant" }),
    stageY + 450,
  );
  await expect
    .poll(() =>
      page
        .locator(".featured-grid")
        .evaluate(
          (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
        ),
    )
    .toBeLessThan(-200);
  const stageTop = await page
    .locator(".work-stage")
    .evaluate((element) => element.getBoundingClientRect().top);
  expect(Math.abs(stageTop - 100)).toBeLessThan(3);
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".featured-grid")).toHaveCSS("display", "grid");
  await page.getByRole("button", { name: "Resume animations" }).click();
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.getByRole("link", { name: "All 18 projects" }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(page.locator(".theatre-loader")).toBeHidden();
  await expect(page.locator(".featured-grid")).toHaveCSS("display", "grid");
});

test("content remains usable with JavaScript disabled", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator(".theatre-loader")).toBeHidden();
  await expect(page.locator(".featured-grid")).toHaveCSS("display", "grid");
  await expect(
    page.getByRole("heading", { name: "Talent IQ", exact: true }),
  ).toBeVisible();
  await page.goto(`${baseURL}/projects/`);
  await expect(page.locator(".archive-card")).toHaveCount(18);
  await context.close();
});
