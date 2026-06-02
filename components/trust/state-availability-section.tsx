import { LICENSED_STATES } from "@/lib/contact";
import { cn } from "@/lib/cn";

type StateAvailabilitySectionProps = {
  variant?: "footer" | "inline";
  className?: string;
};

export function StateAvailabilitySection({
  variant = "inline",
  className,
}: StateAvailabilitySectionProps) {
  const compact = variant === "footer";

  return (
    <div className={cn(compact ? "text-left" : "text-center", className)}>
      <p
        className={cn(
          "font-semibold uppercase tracking-[0.14em] text-slate-500",
          compact ? "text-[10px]" : "text-[10px] sm:text-xs",
        )}
      >
        Currently Serving Investors In
      </p>
      <ul
        className={cn(
          "mt-3 flex flex-wrap gap-2",
          compact ? "justify-start" : "justify-center",
        )}
        aria-label="States currently served"
      >
        {LICENSED_STATES.map((state) => (
          <li
            key={state}
            className="rounded-lg border border-teal-100 bg-teal-50/80 px-3 py-1.5 text-xs font-bold tracking-wide text-teal-900"
          >
            {state}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
        Programs may be available in additional states through lending partners, subject to
        licensing and approval.
      </p>
    </div>
  );
}
