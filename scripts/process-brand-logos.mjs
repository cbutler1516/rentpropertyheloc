import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const brandDir = path.join(root, "public/brand");
await mkdir(brandDir, { recursive: true });

const assetsRoot = path.join(
  root,
  "../.cursor/projects/c-Users-cbutl-the-loan-playbook/assets",
);

const sources = {
  dark: path.join(
    assetsRoot,
    "c__Users_cbutl_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_RPH_Logo_2_-_Edited-403ecb16-93c5-40de-9bda-f8aa999b5223.png",
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
      mode === "dark"
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

const darkMeta = await keyOutBackground(sources.dark, path.join(brandDir, "logo-dark.png"), "dark");
const lightMeta = await keyOutBackground(sources.light, path.join(brandDir, "logo-light.png"), "light");

await writeFile(
  path.join(root, "lib/logo-aspect.generated.json"),
  JSON.stringify(
    {
      dark: { width: darkMeta.width, height: darkMeta.height },
      light: { width: lightMeta.width, height: lightMeta.height },
    },
    null,
    2,
  ),
);

console.log(`logo-dark.png ${darkMeta.width}x${darkMeta.height}`);
console.log(`logo-light.png ${lightMeta.width}x${lightMeta.height}`);
