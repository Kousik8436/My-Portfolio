import { defineConfig, devices } from "@playwright/test";

const testPort = Number(process.env.PORTFOLIO_TEST_PORT || 3100);
const previewUrl = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: previewUrl,
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run start",
    url: previewUrl,
    env: { PORT: String(testPort) },
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
