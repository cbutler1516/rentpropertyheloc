import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const brandDir = path.join(root, "public/images/branding");
await mkdir(brandDir, { recursive: true });

/** Pass source PNG paths as CLI args, or place files in public/images/branding/*.source.png */
const sources = {
  header: process.argv[2] ?? path.join(brandDir, "tlp-logo-dark.source.png"),
  light: process.argv[3] ?? path.join(brandDir, "tlp-logo-light.source.png"),
};

async function keyOutBackground(inputPath, outputPath, mode) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    const remove =
      mode === "header"
        ? r < 24 && g < 24 && b < 24
        : r > 240 && g > 240 && b > 240;

    if (remove) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toFile(outputPath);

  return sharp(outputPath).metadata();
}

const headerMeta = await keyOutBackground(
  sources.header,
  path.join(brandDir, "tlp-logo-dark.png"),
  "header",
);
const lightMeta = await keyOutBackground(
  sources.light,
  path.join(brandDir, "tlp-logo-light.png"),
  "light",
);

await writeFile(
  path.join(root, "lib/logo-aspect.generated.json"),
  JSON.stringify(
    {
      header: { width: headerMeta.width, height: headerMeta.height },
      light: { width: lightMeta.width, height: lightMeta.height },
    },
    null,
    2,
  ),
);

console.log(`tlp-logo-dark.png ${headerMeta.width}x${headerMeta.height}`);
console.log(`tlp-logo-light.png ${lightMeta.width}x${lightMeta.height}`);
