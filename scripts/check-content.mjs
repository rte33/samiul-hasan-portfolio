import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];

async function checkFile(filePath, desc) {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    errors.push(`Failed to read or parse ${desc} (${path.relative(root, filePath)}): ${err.message}`);
    return null;
  }
}

async function assetExists(relPath) {
  const cleanPath = relPath.startsWith("/") ? relPath.slice(1) : relPath;
  const target = path.join(root, "public", cleanPath);
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

function checkPlaceholders(obj, prefix = "") {
  if (typeof obj === "string") {
    if (/^\s*\[[a-zA-Z\s_-]+\]\s*$/.test(obj)) {
      warnings.push(`Placeholder text detected at ${prefix}: "${obj}"`);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => checkPlaceholders(item, `${prefix}[${i}]`));
  } else if (obj && typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      checkPlaceholders(val, prefix ? `${prefix}.${key}` : key);
    }
  }
}

// 1. Check portfolio.json
const portfolio = await checkFile(path.join(root, "content", "portfolio.json"), "portfolio.json");
if (portfolio) {
  const required = [
    ["site.title", portfolio.site?.title],
    ["site.description", portfolio.site?.description],
    ["profile.name", portfolio.profile?.name],
    ["profile.summary", portfolio.profile?.summary],
    ["profile.cv", portfolio.profile?.cv],
    ["contact.email", portfolio.contact?.email],
  ];

  for (const [field, val] of required) {
    if (!val) errors.push(`portfolio.json: "${field}" is required`);
  }

  if (portfolio.profile?.cv && portfolio.profile.cv.startsWith("/")) {
    const exists = await assetExists(portfolio.profile.cv);
    if (!exists) errors.push(`portfolio.json: CV file not found in public folder: ${portfolio.profile.cv}`);
  }

  if (portfolio.profile?.portrait && portfolio.profile.portrait.startsWith("/")) {
    const exists = await assetExists(portfolio.profile.portrait);
    if (!exists) errors.push(`portfolio.json: Portrait file not found in public folder: ${portfolio.profile.portrait}`);
  }

  checkPlaceholders(portfolio, "portfolio.json");
}

// 2. Check projects.json
const projects = await checkFile(path.join(root, "content", "projects.json"), "projects.json");
if (projects) {
  if (!Array.isArray(projects)) {
    errors.push(`projects.json: must be an array of projects`);
  } else {
    const slugs = new Set();
    projects.forEach((p, idx) => {
      if (!p.slug) {
        errors.push(`projects.json [${idx}]: missing "slug"`);
      } else if (!/^[a-z0-9-]+$/.test(p.slug)) {
        errors.push(`projects.json [${idx}]: slug "${p.slug}" should only contain lowercase letters, numbers, and hyphens`);
      } else if (slugs.has(p.slug)) {
        errors.push(`projects.json: duplicate slug "${p.slug}"`);
      } else {
        slugs.add(p.slug);
      }

      if (!p.title) errors.push(`projects.json [${p.slug || idx}]: missing "title"`);
      if (!p.summary) errors.push(`projects.json [${p.slug || idx}]: missing "summary"`);
    });
  }

  checkPlaceholders(projects, "projects.json");
}

// 3. Check updates.json
const updates = await checkFile(path.join(root, "content", "updates.json"), "updates.json");
if (updates) {
  if (!updates.updated || !/^\d{4}(-\d{2}){0,2}$/.test(updates.updated)) {
    errors.push(`updates.json: "updated" must be a date format like YYYY-MM-DD or YYYY`);
  }
  if (!updates.now || !updates.now.title) {
    errors.push(`updates.json: "now" section must contain a "title"`);
  }
  if (!Array.isArray(updates.entries)) {
    errors.push(`updates.json: "entries" must be an array`);
  } else {
    updates.entries.forEach((e, idx) => {
      if (!e.title) errors.push(`updates.json entries[${idx}]: missing "title"`);
      if (!e.date) errors.push(`updates.json entries[${idx}]: missing "date"`);
    });
  }

  checkPlaceholders(updates, "updates.json");
}

// Output report
if (warnings.length > 0) {
  console.warn("\n⚠️  Warnings:");
  warnings.forEach((w) => console.warn(`  - ${w}`));
}

if (errors.length > 0) {
  console.error("\n❌ Content Validation Failed:");
  errors.forEach((e) => console.error(`  - ${e}`));
  console.error("");
  process.exit(1);
} else {
  console.log("\n✅ All content checks passed successfully!");
}
