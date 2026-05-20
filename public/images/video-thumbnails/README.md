# Video thumbnails

Poster images for published hero videos: `[slug].jpg` (e.g. `buyer-preapproval-first-step.jpg`).

Generate from hero MP4s (requires ffmpeg):

```bash
mkdir -p public/images/video-thumbnails
for f in public/videos/hero/*.mp4; do
  slug=$(basename "$f" .mp4)
  ffmpeg -y -ss 00:00:01 -i "$f" -frames:v 1 -q:v 2 "public/images/video-thumbnails/${slug}.jpg"
done
```

Until JPGs exist, cards use a frame from the self-hosted MP4 (seek ~1.5s) via `VideoPosterThumbnail`.

**Generate (Node):**

```bash
node scripts/generate-video-thumbnails.mjs
```
