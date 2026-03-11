import {spawn, spawnSync} from "node:child_process";
import process from "node:process";
import {setTimeout as delay} from "node:timers/promises";

const port = Number(process.env.VERIFY_ROUTES_PORT ?? 3017);
const baseUrl = `http://localhost:${port}`;
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runBuild() {
  const result =
    process.platform === "win32"
      ? spawnSync("cmd.exe", ["/d", "/s", "/c", `${npmCommand} run build`], {
          cwd: process.cwd(),
          stdio: "inherit",
          env: process.env
        })
      : spawnSync(npmCommand, ["run", "build"], {
          cwd: process.cwd(),
          stdio: "inherit",
          env: process.env
        });

  assert(result.status === 0, `next build failed during route verification${result.error ? `: ${result.error.message}` : ""}`);
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseUrl, {redirect: "manual"});
      if (response.status > 0) {
        return;
      }
    } catch {
      // Server not ready yet.
    }

    await delay(1000);
  }

  throw new Error(`Server did not become ready at ${baseUrl}`);
}

function stopServer(server) {
  if (!server?.pid) {
    return;
  }

  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], {stdio: "ignore"});
    return;
  }

  server.kill("SIGTERM");
}

function startServer() {
  const server =
    process.platform === "win32"
      ? spawn("cmd.exe", ["/d", "/s", "/c", `${npmCommand} run start -- --hostname localhost --port ${port}`], {
          cwd: process.cwd(),
          stdio: ["ignore", "pipe", "pipe"],
          env: process.env
        })
      : spawn(npmCommand, ["run", "start", "--", "--hostname", "localhost", "--port", String(port)], {
          cwd: process.cwd(),
          stdio: ["ignore", "pipe", "pipe"],
          env: process.env
        });

  server.stdout.on("data", (chunk) => process.stdout.write(chunk));
  server.stderr.on("data", (chunk) => process.stderr.write(chunk));

  return server;
}

async function request(pathname, headers = {}) {
  return fetch(`${baseUrl}${pathname}`, {
    redirect: "manual",
    headers
  });
}

async function expectRedirect(pathname, expectedLocation, headers = {}) {
  const response = await request(pathname, headers);
  assert(response.status === expectedLocation.status, `${pathname} should redirect with ${expectedLocation.status}, got ${response.status}`);
  assert(
    response.headers.get("location") === expectedLocation.location,
    `${pathname} should redirect to ${expectedLocation.location}, got ${response.headers.get("location")}`
  );
}

async function expectOk(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, {redirect: "follow"});
  assert(response.status === 200, `${pathname} should resolve to 200, got ${response.status}`);
}

async function expectNotFound(pathname) {
  const response = await request(pathname);
  assert(response.status === 404, `${pathname} should resolve to 404, got ${response.status}`);
}

const canonicalRoutes = [
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
];

const redirectChecks = [
  {pathname: "/", expectedLocation: {location: "/en", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {pathname: "/", expectedLocation: {location: "/de", status: 307}, headers: {"Accept-Language": "de-DE,de;q=0.9"}},
  {pathname: "/", expectedLocation: {location: "/de", status: 307}, headers: {"Accept-Language": "fr-FR,fr;q=0.9"}},
  {pathname: "/services", expectedLocation: {location: "/de/leistungen", status: 307}, headers: {Cookie: "NEXT_LOCALE=de"}},
  {pathname: "/services", expectedLocation: {location: "/en/services", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {
    pathname: "/services",
    expectedLocation: {location: "/en/services", status: 307},
    headers: {Cookie: "NEXT_LOCALE=en", "Accept-Language": "de-DE,de;q=0.9"}
  },
  {pathname: "/services?x=1", expectedLocation: {location: "/de/leistungen?x=1", status: 307}, headers: {Cookie: "NEXT_LOCALE=de"}},
  {pathname: "/leistungen", expectedLocation: {location: "/en/services", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {pathname: "/about", expectedLocation: {location: "/en/about-us", status: 307}, headers: {"Accept-Language": "en-US,en;q=0.9"}},
  {pathname: "/about-us", expectedLocation: {location: "/de/ueber-uns", status: 307}, headers: {Cookie: "NEXT_LOCALE=de"}},
  {pathname: "/ueber-uns", expectedLocation: {location: "/de/ueber-uns", status: 307}, headers: {Cookie: "NEXT_LOCALE=de"}},
  {pathname: "/contact", expectedLocation: {location: "/de/kontakt", status: 307}, headers: {Cookie: "NEXT_LOCALE=de"}},
  {pathname: "/kontakt", expectedLocation: {location: "/en/contact", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {pathname: "/projects", expectedLocation: {location: "/de/projekte", status: 307}, headers: {Cookie: "NEXT_LOCALE=de"}},
  {pathname: "/projekte", expectedLocation: {location: "/en/projects", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {pathname: "/ai-data-control", expectedLocation: {location: "/en/ai-data-control", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {pathname: "/legal-notice", expectedLocation: {location: "/de/impressum", status: 307}, headers: {Cookie: "NEXT_LOCALE=de"}},
  {pathname: "/impressum", expectedLocation: {location: "/en/legal-notice", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {pathname: "/privacy-policy", expectedLocation: {location: "/en/privacy-policy", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {pathname: "/datenschutz", expectedLocation: {location: "/de/datenschutz", status: 307}, headers: {Cookie: "NEXT_LOCALE=de"}},
  {pathname: "/faq", expectedLocation: {location: "/en/faq", status: 307}, headers: {Cookie: "NEXT_LOCALE=en"}},
  {pathname: "/de/contact", expectedLocation: {location: "/de/kontakt", status: 308}},
  {pathname: "/de/services", expectedLocation: {location: "/de/leistungen", status: 308}},
  {pathname: "/de/%C3%BCber-uns", expectedLocation: {location: "/de/ueber-uns", status: 308}},
  {pathname: "/de/about", expectedLocation: {location: "/de/ueber-uns", status: 308}},
  {pathname: "/de/about-us", expectedLocation: {location: "/de/ueber-uns", status: 308}},
  {pathname: "/de/projects", expectedLocation: {location: "/de/projekte", status: 308}},
  {pathname: "/de/legal-notice", expectedLocation: {location: "/de/impressum", status: 308}},
  {pathname: "/de/privacy-policy", expectedLocation: {location: "/de/datenschutz", status: 308}},
  {pathname: "/en/leistungen", expectedLocation: {location: "/en/services", status: 308}},
  {pathname: "/en/kontakt", expectedLocation: {location: "/en/contact", status: 308}},
  {pathname: "/en/ueber-uns", expectedLocation: {location: "/en/about-us", status: 308}},
  {pathname: "/en/projekte", expectedLocation: {location: "/en/projects", status: 308}},
  {pathname: "/en/impressum", expectedLocation: {location: "/en/legal-notice", status: 308}},
  {pathname: "/en/datenschutz", expectedLocation: {location: "/en/privacy-policy", status: 308}}
];

const notFoundChecks = ["/de/unknown-route", "/en/not-a-real-page", "/fr/services"];

let server;

try {
  runBuild();
  server = startServer();
  await waitForServer();

  for (const check of redirectChecks) {
    await expectRedirect(check.pathname, check.expectedLocation, check.headers);
  }

  for (const route of canonicalRoutes) {
    await expectOk(route);
  }

  for (const route of notFoundChecks) {
    await expectNotFound(route);
  }

  console.log(
    `Route verification passed for ${redirectChecks.length} redirects, ${canonicalRoutes.length} canonical routes and ${notFoundChecks.length} not-found routes.`
  );
} finally {
  stopServer(server);
}
