import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("renders original profile content without layout overflow or browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "CREATE.",
  );
  await expect(page.getByRole("img", { name: /Kousik Maity/ })).toBeVisible();
  await expect(page.getByText("9.05 / 10 CGPA")).toBeVisible();
  await expect(page.getByText("79.2%", { exact: true })).toBeVisible();
  await expect(page.getByText("86.43%", { exact: true })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test("project archive preserves all projects and filters by category and text", async ({
  page,
}) => {
  await page.goto("/projects/");
  await expect(page.locator(".archive-card")).toHaveCount(18);
  await page.getByRole("button", { name: "GenAI 7", exact: true }).click();
  await expect(page.locator(".archive-card")).toHaveCount(7);
  await page.getByRole("searchbox", { name: "Search projects" }).fill("jarvis");
  await expect(page.locator(".archive-card")).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      name: "J.A.R.V.I.S AI Desktop Assistant",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("no-such-project");
  await expect(page.locator(".archive-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".archive-card")).toHaveCount(18);
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("logistics");
  await expect(page.locator(".archive-card")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Movetto", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Live project\s*:\s*Movetto/ }),
  ).toHaveAttribute("href", "https://movetto.vercel.app/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test("mobile navigation closes with Escape and follows the selected anchor", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "mobile");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Skills" })
    .click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("contact form validates fields and preserves them on delivery failure", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "webdriver", { get: () => false }),
  );
  let requests = 0;
  await page.route(
    "https://api.emailjs.com/api/v1.0/email/send",
    async (route) => {
      requests++;
      await route.fulfill({ status: 500, body: "Temporary delivery failure" });
    },
  );
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(
    page.getByText("Please enter your name.", { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Your name")).toBeFocused();
  expect(requests).toBe(0);
  await page.getByLabel("Your name").fill("Portfolio test");
  await page.getByLabel("Email address").fill("not-an-email");
  await page
    .getByLabel("Your message")
    .fill("A test message that must never reach a real inbox.");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(
    page.getByText("Please enter a valid email address.", { exact: true }),
  ).toBeVisible();
  expect(requests).toBe(0);
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(
    page.getByRole("form", { name: "Contact Kousik Maity" }).getByRole("alert"),
  ).toContainText("couldn’t be sent");
  await expect(page.getByLabel("Your message")).toHaveValue(
    "A test message that must never reach a real inbox.",
  );
  await expect(
    page.getByRole("button", { name: "Send message", exact: true }),
  ).toBeEnabled();
  expect(requests).toBe(1);
});

test("contact sends compatible template fields, prevents double sends, and resets after success", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "webdriver", { get: () => false }),
  );
  let requests = 0;
  let params: Record<string, unknown> = {};
  await page.route(
    "https://api.emailjs.com/api/v1.0/email/send",
    async (route) => {
      requests++;
      const body = route.request().postDataJSON();
      params = body.template_params;
      expect(body.service_id).toBeTruthy();
      expect(body.template_id).toBeTruthy();
      expect(body.user_id).toBeTruthy();
      await route.fulfill({ status: 200, body: "OK" });
    },
  );
  await page.goto("/#contact");
  await page.getByLabel("Your name").fill(" Alex Morgan ");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Your message").fill("Let’s discuss a project.");
  await page
    .getByRole("form", { name: "Contact Kousik Maity" })
    .evaluate((form: HTMLFormElement) => {
      form.requestSubmit();
      form.requestSubmit();
    });
  await expect(
    page.getByText("Thank you! Your message has been sent.", { exact: true }),
  ).toBeVisible();
  expect(requests).toBe(1);
  expect(params).toMatchObject({
    name: "Alex Morgan",
    from_name: "Alex Morgan",
    email: "alex@example.com",
    reply_to: "alex@example.com",
    message: "Let’s discuss a project.",
  });
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await expect(page.getByLabel("Email address")).toHaveValue("");
  await expect(page.getByLabel("Your message")).toHaveValue("");
});

test("public pages pass automated WCAG accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/projects/"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      JSON.stringify(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ),
    ).toEqual([]);
  }
});

test("metadata, structured data and crawler files are present in the production HTML", async ({
  request,
}) => {
  const home = await request.get("/");
  const html = await home.text();
  expect(html).toContain(
    "Kousik Maity | Full Stack Developer &amp; GenAI Engineer",
  );
  expect(html).toContain('rel="canonical"');
  expect(html).toContain('property="og:image"');
  expect(html).toContain('name="twitter:card"');
  expect(html).toContain("application/ld+json");
  expect(html).toContain('"@type":"Person"');
  expect(html).toContain("Talent IQ");
  const archive = await request.get("/projects/");
  expect(await archive.text()).toContain("Advanced To Do List");
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("sitemap.xml");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/projects/");
  const image = await request.get("/images/social-card.png");
  expect(image.headers()["content-type"]).toContain("image/png");
  const missing = await request.get("/missing-page/");
  expect(missing.status()).toBe(404);
});
