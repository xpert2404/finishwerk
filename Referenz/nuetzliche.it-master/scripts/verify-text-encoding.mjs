import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const filesToCheck = [];
const includeExtensions = new Set([".ts", ".tsx", ".json", ".md"]);
const explicitRoots = ["README.md", "PLAN.md", "middleware.ts", "src", "scripts", "tests"];

function collectFiles(targetPath) {
  const absolute = path.resolve(root, targetPath);
  if (!fs.existsSync(absolute)) {
    return;
  }

  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    if (includeExtensions.has(path.extname(absolute))) {
      filesToCheck.push(absolute);
    }
    return;
  }

  for (const entry of fs.readdirSync(absolute, {withFileTypes: true})) {
    if (entry.name === ".next" || entry.name === "node_modules" || entry.name === "test-results" || entry.name === ".tmp-playwright") {
      continue;
    }

    collectFiles(path.join(targetPath, entry.name));
  }
}

for (const entry of explicitRoots) {
  collectFiles(entry);
}

const brokenWordPattern = /\b[\p{L}]+(?:\?[\p{L}]+)+\b/gu;
const mojibakePatterns = [/Â§/gu, /Ã[\p{L}]/gu, /nÃ/gu];
const ignoredTokens = new Set(["maps?q", "erstgespraech?embed", "cal?embed"]);

const violations = [];

for (const absolute of filesToCheck) {
  const relative = path.relative(root, absolute);
  const content = fs.readFileSync(absolute, "utf8");

  const brokenWordMatches = [...content.matchAll(brokenWordPattern)].map((match) => match[0]);
  const mojibakeMatches = mojibakePatterns.flatMap((pattern) => [...content.matchAll(pattern)].map((match) => match[0]));

  const matches = [...new Set([...brokenWordMatches, ...mojibakeMatches])].filter((token) => !ignoredTokens.has(token));

  if (matches.length > 0) {
    violations.push({file: relative, matches});
  }
}

if (violations.length > 0) {
  console.error("Encoding verification failed:");
  for (const violation of violations) {
    console.error(`- ${violation.file}: ${violation.matches.join(", ")}`);
  }
  process.exit(1);
}

console.log(`Encoding verification passed for ${filesToCheck.length} files.`);
