import {expect, test} from "@playwright/test";

const pages = [
  {name: "home-de", path: "/de", heading: /Software, die passt/i, requiresPrimaryCta: true},
  {name: "home-en", path: "/en", heading: /Software that fits/i, requiresPrimaryCta: false},
  {name: "services-de", path: "/de/leistungen", heading: /Leistungen mit klarem Einsatzbild/i, requiresPrimaryCta: false},
  {name: "services-en", path: "/en/services", heading: /Services with a clear use case/i, requiresPrimaryCta: false},
  {name: "ai-data-control-de", path: "/de/ki-datenkontrolle", heading: /Lokale KI-Lösungen mit klaren Prozessgrenzen/i, requiresPrimaryCta: false},
  {name: "ai-data-control-en", path: "/en/ai-data-control", heading: /Local AI solutions with explicit process boundaries/i, requiresPrimaryCta: false},
  {name: "about-de", path: "/de/ueber-uns", heading: /Über 10 Jahre gebündelte Erfahrung im Team/i, requiresPrimaryCta: false},
  {name: "about-en", path: "/en/about-us", heading: /Over 10 years of combined team experience/i, requiresPrimaryCta: false},
  {name: "projects-de", path: "/de/projekte", heading: /Ausgewählte Fallbeispiele/i, requiresPrimaryCta: false},
  {name: "projects-en", path: "/en/projects", heading: /Selected case examples/i, requiresPrimaryCta: false},
  {name: "contact-de", path: "/de/kontakt", heading: /Schnell klären, sauber starten/i, requiresPrimaryCta: false},
  {name: "contact-en", path: "/en/contact", heading: /Clarify quickly, start cleanly/i, requiresPrimaryCta: false},
  {name: "faq-de", path: "/de/faq", heading: /Fragen, die im Erstgespräch häufig gestellt werden/i, requiresPrimaryCta: false},
  {name: "faq-en", path: "/en/faq", heading: /Questions we hear most in intro calls/i, requiresPrimaryCta: false},
  {name: "legal-de", path: "/de/impressum", heading: /Angaben gemäß §5 TMG/i, requiresPrimaryCta: false},
  {name: "legal-en", path: "/en/legal-notice", heading: /Information according to §5 TMG/i, requiresPrimaryCta: false},
  {name: "privacy-de", path: "/de/datenschutz", heading: /Informationen zur Datenverarbeitung/i, requiresPrimaryCta: false},
  {name: "privacy-en", path: "/en/privacy-policy", heading: /Information on data processing/i, requiresPrimaryCta: false}
] as const;

const hydrationPattern = /hydration|didn't match|did not match|server rendered html|aria-controls/i;

for (const route of pages) {
  test(`${route.name} smoke`, async ({page}, testInfo) => {
    const consoleErrors: string[] = [];
    const hydrationWarnings: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (msg.type() === "error") {
        consoleErrors.push(text);
      }
      if (hydrationPattern.test(text)) {
        hydrationWarnings.push(text);
      }
    });

    page.on("pageerror", (error) => {
      consoleErrors.push(error.message);
    });

    await page.goto(route.path, {waitUntil: "networkidle"});
    await expect(page.getByRole("heading", {level: 1, name: route.heading})).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    if (route.requiresPrimaryCta) {
      await expect(page.getByRole("button", {name: /Erstgespräch buchen/i}).first()).toBeVisible();
    }

    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(horizontalOverflow).toBeLessThanOrEqual(2);

    const nextErrorOverlay = page.locator("[data-nextjs-dialog], [data-nextjs-dialog-overlay], [data-nextjs-dialog-backdrop]");
    await expect(nextErrorOverlay).toHaveCount(0);

    expect(hydrationWarnings, `${route.name} produced hydration warnings`).toEqual([]);
    expect(consoleErrors, `${route.name} produced console errors`).toEqual([]);

    await page.screenshot({path: testInfo.outputPath(`${route.name}.png`), fullPage: true});
  });
}

test("booking modal smoke", async ({page}, testInfo) => {
  const consoleErrors: string[] = [];
  const hydrationWarnings: string[] = [];

  page.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error") {
      consoleErrors.push(text);
    }
    if (hydrationPattern.test(text)) {
      hydrationWarnings.push(text);
    }
  });

  page.on("pageerror", (error) => {
    consoleErrors.push(error.message);
  });

  await page.goto("/de", {waitUntil: "networkidle"});
  await page.getByRole("button", {name: /Erstgespräch buchen/i}).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("heading", {name: /Kalender laden/i})).toBeVisible();
  await page.getByRole("button", {name: /Einwilligen und öffnen/i}).click();
  await expect(page.getByRole("heading", {name: /Erstgespräch buchen/i})).toBeVisible();
  await expect(page.locator("iframe[title=\"Erstgespräch buchen\"]")).toBeVisible();

  expect(hydrationWarnings, "booking modal produced hydration warnings").toEqual([]);
  expect(consoleErrors, "booking modal produced console errors").toEqual([]);

  await page.screenshot({path: testInfo.outputPath("booking-modal.png"), fullPage: true});
});
