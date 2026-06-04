import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const brandDir = path.join(root, "public/images/branding");
await mkdir(brandDir, { recursive: true });

const assetsRoot = path.join(
  root,
  "../.cursor/projects/c-Users-cbutl-the-loan-playbook/assets",
);

const sources = {
  header: path.join(
    assetsRoot,
    "c__Users_cbutl_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_RPH_Logo_White-d518b485-49e5-4ad4-88e7-ea2597b9233d.png",
  ),
  light: path.join(
    assetsRoot,
    "c__Users_cbutl_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_RPH_Logo_2-c18cf217-dd2f-42ff-b746-2a9a7f2dd1dd.png",
  ),
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
  path.join(brandDir, "rph-logo-header.png"),
  "header",
);
const lightMeta = await keyOutBackground(
  sources.light,
  path.join(brandDir, "rph-logo-light.png"),
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

console.log(`rph-logo-header.png ${headerMeta.width}x${headerMeta.height}`);
console.log(`rph-logo-light.png ${lightMeta.width}x${lightMeta.height}`);
