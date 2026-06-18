import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(import.meta.dirname, "..");
const input = path.join(root, "public/images/branding/tlp-icon.png");
const publicDir = path.join(root, "public");

const sizes = [
  { name: "favicon-32x32.png", size: 32 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
];

await mkdir(publicDir, { recursive: true });

for (const { name, size } of sizes) {
  await sharp(input)
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, name));
}

const icoBuffer = await pngToIco([
  path.join(publicDir, "favicon-32x32.png"),
  path.join(publicDir, "android-chrome-192x192.png"),
]);

await writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
await writeFile(path.join(root, "app/favicon.ico"), icoBuffer);

console.log("Generated favicon assets");
