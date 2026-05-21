import { withVideoThumbnail } from "../lib/video-thumbnails";
import { MediaThumbnail } from "./media-thumbnail";
import { VideoPosterThumbnail } from "./video-poster-thumbnail";

export type VideoCardThumbnailPost = {
  slug: string;
  title: string;
  category: string;
  platform: string;
  localVideoSrc?: string;
  thumbnailSrc?: string;
  thumbnailFocalPoint?: string;
  runtime?: string;
};

type VideoCardThumbnailProps = {
  video: VideoCardThumbnailPost;
  className?: string;
  /** First featured card: subtle in-view loop on desktop */
  subtleAutoplay?: boolean;
};

export function VideoCardThumbnail({
  video,
  className,
  subtleAutoplay = false,
}: VideoCardThumbnailProps) {
  const post = withVideoThumbnail(video);
  const localVideoSrc =
    post.localVideoSrc ??
    (post.slug ? `/videos/hero/${post.slug}.mp4` : undefined);

  if (localVideoSrc) {
    return (
      <VideoPosterThumbnail
        posterSrc={post.thumbnailSrc}
        videoSrc={localVideoSrc}
        title={post.title}
        category={post.category}
        platform={post.platform}
        className={className}
        previewOnHover
        subtleAutoplay={subtleAutoplay}
      />
    );
  }

  return (
    <MediaThumbnail
      title={post.title}
      category={post.category}
      platform={post.platform}
      thumbnailSrc={post.thumbnailSrc}
      thumbnailFocalPoint={post.thumbnailFocalPoint}
      runtime={post.runtime}
      className={className}
    />
  );
}
