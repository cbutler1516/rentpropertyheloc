import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source =
  process.argv[2] ??
  path.join(
    root,
    "../.cursor/projects/c-Users-cbutl-the-loan-playbook/assets/c__Users_cbutl_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_RPH_Logo_2-c18cf217-dd2f-42ff-b746-2a9a7f2dd1dd.png",
  );

const brandDir = path.join(root, "public/brand");
await mkdir(brandDir, { recursive: true });

const output = path.join(brandDir, "logo-primary.png");

async function removeNearWhiteBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toFile(outputPath);

  const trimmed = await sharp(outputPath).metadata();
  return trimmed;
}

const info = await removeNearWhiteBackground(source, output);
await writeFile(path.join(brandDir, "logo-horizontal.png"), await readFile(output));

console.log(`Wrote ${info.width}x${info.height} transparent logo to ${output}`);
