"use client";

import { useRef } from "react";
import { trackVideoEngagement } from "../lib/analytics-events";
import { MediaThumbnail } from "./media-thumbnail";

type HeroVideoPlayerProps = {
  title: string;
  category: string;
  platform: string;
  embedUrl?: string;
  localVideoSrc?: string;
  posterSrc?: string;
  thumbnailFocalPoint?: string;
};

export function HeroVideoPlayer({
  title,
  category,
  platform,
  embedUrl,
  localVideoSrc,
  posterSrc,
  thumbnailFocalPoint,
}: HeroVideoPlayerProps) {
  const progressMarks = useRef(new Set<number>());

  function trackProgress(video: HTMLVideoElement) {
    if (!video.duration || !Number.isFinite(video.duration)) return;
    const percent = Math.round((video.currentTime / video.duration) * 100);
    const milestones = [25, 50, 75];
    milestones.forEach((mark) => {
      if (percent >= mark && !progressMarks.current.has(mark)) {
        progressMarks.current.add(mark);
        trackVideoEngagement({
          action: "progress",
          label: title,
          progressPercent: mark,
          location: "hero_video_player",
          videoSrc: localVideoSrc,
        });
      }
    });
  }

  return (
    <div className="relative aspect-[9/12] overflow-hidden border border-zinc-900/80 bg-[#080808] lg:aspect-[4/5]">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${title} video`}
          className="absolute inset-0 h-full w-full border-0"
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : localVideoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={posterSrc}
          aria-label={title}
          onPlay={() =>
            trackVideoEngagement({
              action: "play",
              label: title,
              location: "hero_video_player",
              videoSrc: localVideoSrc,
            })
          }
          onPause={() =>
            trackVideoEngagement({
              action: "pause",
              label: title,
              location: "hero_video_player",
              videoSrc: localVideoSrc,
            })
          }
          onEnded={() =>
            trackVideoEngagement({
              action: "complete",
              label: title,
              location: "hero_video_player",
              videoSrc: localVideoSrc,
            })
          }
          onTimeUpdate={(event) => trackProgress(event.currentTarget)}
        >
          <source src={localVideoSrc} type="video/mp4" />
        </video>
      ) : (
        <MediaThumbnail
          title={title}
          category={category}
          platform={platform}
          thumbnailSrc={posterSrc}
          thumbnailFocalPoint={thumbnailFocalPoint}
          className="h-full"
        />
      )}
    </div>
  );
}
