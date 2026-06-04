/**
 * Extract a hero background poster from the first usable video frame (~0.75s).
 * Requires: npm install --no-save ffmpeg-static
 */
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");

if (!ffmpegPath) {
  console.error("ffmpeg-static binary not found. Run: npm install --no-save ffmpeg-static");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const video = join(root, "public/videos/Luxury_real_estate_drone_footage_202606031728.mp4");
const outDir = join(root, "public/images/hero");
const poster = join(outDir, "hero-background-poster.jpg");

mkdirSync(outDir, { recursive: true });

execFileSync(
  ffmpegPath,
  ["-ss", "0.75", "-i", video, "-vframes", "1", "-update", "1", "-q:v", "2", "-y", poster],
  { stdio: "inherit" },
);

console.log(`Poster written to ${poster}`);
