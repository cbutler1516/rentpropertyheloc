#!/usr/bin/env node
/**
 * Generate JPG posters from public/videos/hero/*.mp4
 * Output: public/images/video-thumbnails/[slug].jpg
 *
 * Requires ffmpeg on PATH. Frame grab at ~1.5s.
 *
 * Usage:
 *   node scripts/generate-video-thumbnails.mjs
 */

import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const heroDir = path.join(root, "public", "videos", "hero");
const outDir = path.join(root, "public", "images", "video-thumbnails");
const seekSeconds = "00:00:01.5";

function hasFfmpeg() {
  const result = spawnSync("ffmpeg", ["-version"], {
    stdio: "ignore",
    shell: process.platform === "win32",
  });
  return result.status === 0;
}

function main() {
  if (!fs.existsSync(heroDir)) {
    console.error(`Missing hero directory: ${heroDir}`);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });

  if (!hasFfmpeg()) {
    console.error(
      [
        "ffmpeg not found on PATH.",
        "",
        "Install ffmpeg, then run:",
        "  node scripts/generate-video-thumbnails.mjs",
        "",
        "Manual commands (bash):",
        "  mkdir -p public/images/video-thumbnails",
        "  for f in public/videos/hero/*.mp4; do",
        '    slug=$(basename "$f" .mp4)',
        `    ffmpeg -y -ss ${seekSeconds} -i "$f" -frames:v 1 -q:v 2 "public/images/video-thumbnails/\\${slug}.jpg"`,
        "  done",
        "",
        "Cards still show a frame from each MP4 until JPGs exist.",
      ].join("\n"),
    );
    process.exit(1);
  }

  const mp4s = fs.readdirSync(heroDir).filter((f) => f.endsWith(".mp4"));
  if (mp4s.length === 0) {
    console.error(`No MP4 files in ${heroDir}`);
    process.exit(1);
  }

  for (const file of mp4s) {
    const slug = path.basename(file, ".mp4");
    const input = path.join(heroDir, file);
    const output = path.join(outDir, `${slug}.jpg`);
    console.log(`Generating ${output} ...`);
    execSync(
      [
        "ffmpeg",
        "-y",
        "-ss",
        seekSeconds,
        "-i",
        `"${input}"`,
        "-frames:v",
        "1",
        "-q:v",
        "2",
        `"${output}"`,
      ].join(" "),
      { stdio: "inherit", shell: true, cwd: root },
    );
  }

  console.log(`Done. ${mp4s.length} thumbnail(s) in ${outDir}`);
}

main();
