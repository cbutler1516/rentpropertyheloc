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
};

export function VideoCardThumbnail({ video, className }: VideoCardThumbnailProps) {
  const post = withVideoThumbnail(video);

  if (post.localVideoSrc) {
    return (
      <VideoPosterThumbnail
        videoSrc={post.localVideoSrc}
        title={post.title}
        category={post.category}
        platform={post.platform}
        className={className}
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
