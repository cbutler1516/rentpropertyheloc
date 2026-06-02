import {
  TEAM_TRUST_IMAGE_ALT,
  TEAM_TRUST_IMAGE_FRAME_CLASS,
  TEAM_TRUST_IMAGE_SRC,
} from "@/lib/trust-content";
import { cn } from "@/lib/cn";
import Image from "next/image";

type TeamTrustVisualProps = {
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function TeamTrustVisual({
  className,
  frameClassName,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 480px",
}: TeamTrustVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-slate-900 shadow-md ring-1 ring-slate-200/80",
        TEAM_TRUST_IMAGE_FRAME_CLASS,
        frameClassName,
        className,
      )}
    >
      <Image
        src={TEAM_TRUST_IMAGE_SRC}
        alt={TEAM_TRUST_IMAGE_ALT}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center"
      />
    </div>
  );
}
