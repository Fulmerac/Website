import { defineConfig, devices } from "@playwright/test";

/**
 * Two production servers from one build:
 * - :3101 has (dummy) email settings, so the form accepts submissions. Tests mock /api/apply.
 * - :3102 has none, so the site must refuse applications instead of pretending to send them.
 */
export const CONFIGURED = "http://localhost:3101";
export const UNCONFIGURED = "http://localhost:3102";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: CONFIGURED, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: [
    {
      command: "npx next start -p 3101",
      url: CONFIGURED,
      reuseExistingServer: !process.env.CI,
      env: {
        RESEND_API_KEY: "re_test_dummy",
        APPLICATION_TO_EMAIL: "cole@example.com",
        APPLICATION_FROM_EMAIL: "Applications <applications@example.com>",
      },
    },
    {
      command: "npx next start -p 3102",
      url: UNCONFIGURED,
      reuseExistingServer: !process.env.CI,
      env: { RESEND_API_KEY: "", APPLICATION_TO_EMAIL: "", APPLICATION_FROM_EMAIL: "" },
    },
  ],
});
