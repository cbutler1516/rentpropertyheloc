import {
  CALL_OUR_TEAM_LABEL,
  PLATFORM_PHONE_DISPLAY,
  PLATFORM_PHONE_TEL,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

type PlatformPhoneLinkProps = {
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  /** Override visible label; defaults to formatted phone number */
  label?: string;
};

const sizeClasses = {
  sm: "text-xs sm:text-sm",
  md: "text-sm sm:text-base",
  lg: "text-base",
} as const;

export function PlatformPhoneLink({
  className,
  showIcon = true,
  size = "md",
  label,
}: PlatformPhoneLinkProps) {
  const display = label ?? PLATFORM_PHONE_DISPLAY;

  return (
    <a
      href={`tel:${PLATFORM_PHONE_TEL}`}
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold text-brand-navy underline-offset-2 transition hover:text-brand-secondary hover:underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary",
        sizeClasses[size],
        className,
      )}
    >
      {showIcon ? (
        <span aria-hidden className="text-base leading-none">
          📞
        </span>
      ) : null}
      {display}
    </a>
  );
}

/** @deprecated Use PlatformPhoneLink */
export const PhoneLink = PlatformPhoneLink;

export { CALL_OUR_TEAM_LABEL as DEFAULT_PHONE_LINK_LABEL };
