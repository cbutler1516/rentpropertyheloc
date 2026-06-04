import { PLATFORM_EMAIL, EMAIL_OUR_TEAM_LABEL } from "@/lib/contact";
import { cn } from "@/lib/cn";

type PlatformEmailLinkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const sizeClasses = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
} as const;

export function PlatformEmailLink({
  className,
  size = "md",
  label = EMAIL_OUR_TEAM_LABEL,
}: PlatformEmailLinkProps) {
  return (
    <a
      href={`mailto:${PLATFORM_EMAIL}`}
      className={cn(
        "font-semibold text-teal-700 underline-offset-2 transition hover:text-teal-800 hover:underline",
        sizeClasses[size],
        className,
      )}
    >
      {label}
    </a>
  );
}
