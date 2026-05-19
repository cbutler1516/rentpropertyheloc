/** Poster images for published hero videos (public/images/video-thumbnails/[slug].jpg). */
export function getVideoThumbnailSrc(slug: string) {
  return `/images/video-thumbnails/${slug}.jpg`;
}

export function withVideoThumbnail<T extends { slug: string; thumbnailSrc?: string }>(
  video: T,
): T {
  return {
    ...video,
    thumbnailSrc: video.thumbnailSrc ?? getVideoThumbnailSrc(video.slug),
  };
}
