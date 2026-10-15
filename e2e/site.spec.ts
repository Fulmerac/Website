import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { GOOGLE_FORM, UNCONFIGURED } from "../playwright.config";

const pages = ["/", "/opportunity", "/about", "/join", "/thank-you", "/privacy"];

async function openNav(page: Page) {
  const toggle = page.getByRole("button", { name: "Open menu" });
  if (await toggle.isVisible()) await toggle.click();
}

async function fillValidApplication(page: Page) {
  await page.getByLabel("Full name").fill("Test Applicant");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("Phone number").fill("(555) 123-4567");
  await page.getByLabel("State of residence").selectOption("Ohio");
  await page.getByLabel("Exploring the industry").check();
  await page.getByLabel("Other sales experience").check();
  await page.getByLabel("Why are you interested?").fill("I want to build a business helping families.");
  await page.getByLabel("Weekday evenings").check();
  await page.getByLabel(/can contact me/).check();
}

test.describe("every page", () => {
  for (const path of pages) {
    test(`${path} has one h1, metadata, no placeholders, no sideways scroll, and no serious a11y issues`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("[data-placeholder]")).toHaveCount(0);
      await expect(page).toHaveTitle(/Secure Life Agency/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => v.id)).toEqual([]);
    });
  }
});

test("main navigation reaches each page", async ({ page }) => {
  await page.goto("/");
  for (const [name, heading] of [["The Opportunity", "The Opportunity"], ["About Cole", "About Cole"]] as const) {
    await openNav(page);
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name }).filter({ visible: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
  }
  await openNav(page);
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Apply to Join Our Team" }).filter({ visible: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Join Our Team");
});

test("hero CTAs lead into the funnel", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore the Opportunity", exact: true }).click();
  await expect(page).toHaveURL(/\/opportunity$/);
  await page.goto("/");
  await page.locator("main").getByRole("link", { name: "Apply to Join Our Team" }).first().click();
  await expect(page).toHaveURL(/\/join$/);
});

test("empty submission explains every required field", async ({ page }) => {
  await page.goto("/join");
  await page.getByRole("button", { name: "Submit application" }).click();
  await expect(page.locator('[id$="-error"]')).toHaveCount(9);
  await expect(page.getByLabel("Full name")).toBeFocused();
  await expect(page.getByLabel("Full name")).toHaveAttribute("aria-invalid", "true");
});

test("a delivered application goes to the confirmation page", async ({ page }) => {
  let payload: Record<string, unknown> | null = null;
  await page.route("**/api/apply", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/join");
  await fillValidApplication(page);
  await page.getByRole("button", { name: "Submit application" }).click();
  await expect(page).toHaveURL(/\/thank-you$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Application received.");
  await expect(page.getByRole("heading", { name: "Your introductory call" })).toBeVisible();
  expect(payload).toMatchObject({ state: "Ohio", availability: ["weekday-evenings"], consent: true });
});

test("a failed delivery keeps the applicant on the form with an explanation", async ({ page }) => {
  await page.route("**/api/apply", (route) => route.fulfill({ status: 502, json: { error: "Your application didn't go through." } }));
  await page.goto("/join");
  await fillValidApplication(page);
  await page.getByRole("button", { name: "Submit application" }).click();
  await expect(page.getByText("Your application didn't go through.")).toBeVisible();
  await expect(page).toHaveURL(/\/join$/);
});

test("the API rejects invalid applications", async ({ request }) => {
  const res = await request.post("/api/apply", { data: { fullName: "x" } });
  expect(res.status()).toBe(400);
});

test.describe("without email delivery configured", () => {
  test.use({ baseURL: UNCONFIGURED });

  test("the form says applications aren't open and can't be submitted", async ({ page }) => {
    await page.goto("/join");
    await expect(page.getByText("Online applications aren't open yet.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit application" })).toBeDisabled();
  });

  test("the API refuses instead of pretending to deliver", async ({ request }) => {
    const res = await request.post("/api/apply", {
      data: {
        fullName: "Test Applicant",
        email: "test@example.com",
        phone: "5551234567",
        state: "Ohio",
        licenseStatus: "exploring",
        experience: "none",
        motivation: "I want to build a business.",
        availability: ["weekends"],
        consent: true,
      },
    });
    expect(res.status()).toBe(503);
    expect((await res.json()).error).toMatch(/not sent/);
  });
});

test.describe("without email delivery, with Cole's Google Form", () => {
  test.use({ baseURL: GOOGLE_FORM });

  test("the Join page sends applicants to the Google Form instead of the on-site form", async ({ page }) => {
    await page.goto("/join");
    const apply = page.locator("main").getByRole("link", { name: /Apply to Join Our Team/ }).last();
    await expect(apply).toHaveAttribute("href", "https://forms.gle/NGGHfFpWZJK7Vk4y6");
    await expect(apply).toHaveAttribute("target", "_blank");
    await expect(page.getByRole("button", { name: "Submit application" })).toHaveCount(0);
  });
});
