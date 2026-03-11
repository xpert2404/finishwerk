import {expect, test} from "@playwright/test";

const redirectChecks = [
  {path: "/", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en", status: 307},
  {path: "/", headers: {"accept-language": "de-DE,de;q=0.9"}, expected: "/de", status: 307},
  {path: "/", headers: {"accept-language": "fr-FR,fr;q=0.9"}, expected: "/de", status: 307},
  {path: "/services", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en/services", status: 307},
  {path: "/services", headers: {cookie: "NEXT_LOCALE=de"}, expected: "/de/leistungen", status: 307},
  {
    path: "/services",
    headers: {cookie: "NEXT_LOCALE=en", "accept-language": "de-DE,de;q=0.9"},
    expected: "/en/services",
    status: 307
  },
  {path: "/services?x=1", headers: {cookie: "NEXT_LOCALE=de"}, expected: "/de/leistungen?x=1", status: 307},
  {path: "/leistungen", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en/services", status: 307},
  {path: "/about", headers: {"accept-language": "en-US,en;q=0.9"}, expected: "/en/about-us", status: 307},
  {path: "/about-us", headers: {cookie: "NEXT_LOCALE=de"}, expected: "/de/ueber-uns", status: 307},
  {path: "/ueber-uns", headers: {cookie: "NEXT_LOCALE=de"}, expected: "/de/ueber-uns", status: 307},
  {path: "/contact", headers: {cookie: "NEXT_LOCALE=de"}, expected: "/de/kontakt", status: 307},
  {path: "/kontakt", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en/contact", status: 307},
  {path: "/projects", headers: {cookie: "NEXT_LOCALE=de"}, expected: "/de/projekte", status: 307},
  {path: "/projekte", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en/projects", status: 307},
  {path: "/ai-data-control", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en/ai-data-control", status: 307},
  {path: "/legal-notice", headers: {cookie: "NEXT_LOCALE=de"}, expected: "/de/impressum", status: 307},
  {path: "/impressum", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en/legal-notice", status: 307},
  {path: "/privacy-policy", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en/privacy-policy", status: 307},
  {path: "/datenschutz", headers: {cookie: "NEXT_LOCALE=de"}, expected: "/de/datenschutz", status: 307},
  {path: "/faq", headers: {cookie: "NEXT_LOCALE=en"}, expected: "/en/faq", status: 307},
  {path: "/de/contact", expected: "/de/kontakt", status: 308},
  {path: "/de/services", expected: "/de/leistungen", status: 308},
  {path: "/de/%C3%BCber-uns", expected: "/de/ueber-uns", status: 308},
  {path: "/de/about", expected: "/de/ueber-uns", status: 308},
  {path: "/de/about-us", expected: "/de/ueber-uns", status: 308},
  {path: "/de/projects", expected: "/de/projekte", status: 308},
  {path: "/de/legal-notice", expected: "/de/impressum", status: 308},
  {path: "/de/privacy-policy", expected: "/de/datenschutz", status: 308},
  {path: "/en/leistungen", expected: "/en/services", status: 308},
  {path: "/en/kontakt", expected: "/en/contact", status: 308},
  {path: "/en/ueber-uns", expected: "/en/about-us", status: 308},
  {path: "/en/projekte", expected: "/en/projects", status: 308},
  {path: "/en/impressum", expected: "/en/legal-notice", status: 308},
  {path: "/en/datenschutz", expected: "/en/privacy-policy", status: 308}
] as const;

const okChecks = [
  "/de",
  "/de/leistungen",
  "/de/ki-datenkontrolle",
  "/de/projekte",
  "/de/ueber-uns",
  "/de/kontakt",
  "/de/impressum",
  "/de/datenschutz",
  "/de/faq",
  "/en",
  "/en/services",
  "/en/ai-data-control",
  "/en/projects",
  "/en/about-us",
  "/en/contact",
  "/en/legal-notice",
  "/en/privacy-policy",
  "/en/faq"
] as const;

const notFoundChecks = ["/de/unknown-route", "/en/not-a-real-page", "/fr/services"] as const;

test.describe("locale alias routing", () => {
  test("legacy aliases resolve locale-sensitively", async ({request}) => {
    for (const check of redirectChecks) {
      const response = await request.get(check.path, {
        maxRedirects: 0,
        headers: "headers" in check ? check.headers : undefined
      });
      expect(response.status(), `${check.path} should redirect with ${check.status}`).toBe(check.status);
      expect(response.headers().location, `${check.path} should resolve to ${check.expected}`).toBe(check.expected);
    }
  });

  test("canonical routes return 200 without loops", async ({request}) => {
    for (const route of okChecks) {
      const response = await request.get(route, {maxRedirects: 5});
      expect(response.status(), `${route} should resolve without loops`).toBe(200);
    }
  });

  test("unsupported routes return not found instead of guessing", async ({request}) => {
    for (const route of notFoundChecks) {
      const response = await request.get(route, {maxRedirects: 0});
      expect(response.status(), `${route} should not resolve via alias guessing`).toBe(404);
    }
  });
});
