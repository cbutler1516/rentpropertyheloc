import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { cn } from "@/lib/cn";

type PhoneLinkProps = {
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md";
  /** Override visible label, e.g. "Call (206) 222-5650" */
  label?: string;
};

export function PhoneLink({ className, showIcon = true, size = "md", label }: PhoneLinkProps) {
  const display = label ?? CONTACT_PHONE_DISPLAY;
  return (
    <a
      href={`tel:${CONTACT_PHONE_TEL}`}
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold text-teal-800 underline-offset-2 transition hover:text-teal-900 hover:underline focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
        size === "sm" ? "text-xs sm:text-sm" : "text-sm sm:text-base",
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
