/**
 * Generate TLP branding placeholders in public/images/branding/.
 * Requires: npm install sharp (dev) — or copies existing assets when sharp is unavailable.
 */
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const brandDir = path.join(root, "public/images/branding");

async function copyIfExists(from, to) {
  try {
    await copyFile(from, to);
    console.log(`Copied ${path.basename(to)}`);
    return true;
  } catch {
    return false;
  }
}

async function trySharpOg() {
  try {
    const sharp = (await import("sharp")).default;
    const width = 1200;
    const height = 630;
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#082B5B"/>
            <stop offset="100%" stop-color="#134e4a"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
        <text x="80" y="280" font-family="Segoe UI, system-ui, sans-serif" font-size="56" font-weight="700" fill="#ffffff">The Loan Playbook</text>
        <text x="80" y="340" font-family="Segoe UI, system-ui, sans-serif" font-size="28" fill="#5eead4">Modern mortgage company · Strategy-first financing</text>
        <text x="80" y="520" font-family="Segoe UI, system-ui, sans-serif" font-size="18" fill="#94a3b8">theloanplaybook.com · Educational estimates only</text>
      </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(brandDir, "tlp-og-image.png"));
    console.log("Generated tlp-og-image.png (1200x630)");
    return true;
  } catch (e) {
    console.warn("sharp OG generation skipped:", e.message);
    return false;
  }
}

await mkdir(brandDir, { recursive: true });

const lightSrc = path.join(brandDir, "tlp-logo-light.png");
const darkSrc = path.join(brandDir, "tlp-logo-dark.png");
const legacyHeader = path.join(brandDir, "tlp-logo-header.png");
const iconSrc = path.join(root, "public/brand/logo-icon.png");

if (!(await copyIfExists(lightSrc, path.join(brandDir, "tlp-logo-light.png")))) {
  await copyIfExists(headerSrc, path.join(brandDir, "tlp-logo-light.png"));
}

await copyIfExists(darkSrc, path.join(brandDir, "tlp-logo-dark.png"));
if (!(await copyIfExists(legacyHeader, path.join(brandDir, "tlp-logo-dark.png")))) {
  /* tlp-logo-dark.png already from darkSrc or legacy header */
}
await copyIfExists(iconSrc, path.join(brandDir, "tlp-icon.png"));

if (!(await trySharpOg())) {
  await copyIfExists(lightSrc, path.join(brandDir, "tlp-og-image.png"));
}

// Remove legacy RPH assets if present
const legacy = ["rph-logo-header.png", "rph-logo-light.png"];
for (const name of legacy) {
  try {
    await import("node:fs/promises").then(({ unlink }) =>
      unlink(path.join(brandDir, name)),
    );
    console.log(`Removed legacy ${name}`);
  } catch {
    /* already removed */
  }
}

await writeFile(
  path.join(root, "lib/logo-aspect.generated.json"),
  JSON.stringify(
    {
      light: { width: 814, height: 324 },
      dark: { width: 858, height: 349 },
      og: { width: 1200, height: 630 },
    },
    null,
    2,
  ),
);

console.log("TLP branding placeholders ready.");
