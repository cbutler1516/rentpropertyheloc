import {
  ADVISOR_HEADSHOT_ALT,
  ADVISOR_HEADSHOT_AVATAR_CLASS,
  ADVISOR_HEADSHOT_COMPACT_CLASS,
  ADVISOR_HEADSHOT_PORTRAIT_CLASS,
  ADVISOR_HEADSHOT_SRC,
} from "@/lib/trust-content";
import { cn } from "@/lib/cn";
import Image from "next/image";

export type AdvisorImageVariant = "portrait" | "avatar" | "compact";

const variantClass: Record<AdvisorImageVariant, string> = {
  portrait: ADVISOR_HEADSHOT_PORTRAIT_CLASS,
  avatar: ADVISOR_HEADSHOT_AVATAR_CLASS,
  compact: ADVISOR_HEADSHOT_COMPACT_CLASS,
};

type AdvisorImageProps = {
  variant?: AdvisorImageVariant;
  className?: string;
  sizes?: string;
  priority?: boolean;
  src?: string;
  alt?: string;
};

export function AdvisorImage({
  variant = "portrait",
  className,
  sizes,
  priority,
  src = ADVISOR_HEADSHOT_SRC,
  alt = ADVISOR_HEADSHOT_ALT,
}: AdvisorImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn(variantClass[variant], className)}
    />
  );
}
