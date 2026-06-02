import { cn } from "@/lib/cn";
import type { AmbientOverlayVariant } from "@/lib/videos";

type FintechAmbientOverlayProps = {
  variant: AmbientOverlayVariant;
  className?: string;
};

export function FintechAmbientOverlay({ variant, className }: FintechAmbientOverlayProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      aria-hidden
    >
      <div className="absolute inset-0 bg-grid opacity-[0.14]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-navy-950/50 via-transparent to-accent/10" />

      {variant === "property" ? (
        <>
          <div className="absolute left-4 top-4 rounded-lg border border-white/10 bg-navy-950/55 px-2.5 py-1.5 text-[10px] font-medium text-white/70 backdrop-blur-md">
            Est. value · illustrative
          </div>
          <div className="absolute right-4 top-4 h-16 w-24 rounded-lg border border-accent/20 bg-navy-950/40 backdrop-blur-md">
            <div className="h-full w-full bg-gradient-to-t from-accent/25 to-transparent opacity-60" />
          </div>
        </>
      ) : null}

      {variant === "portfolio" ? (
        <>
          <div className="absolute left-4 top-4 flex gap-1.5">
            {["Unit A", "Unit B", "Unit C"].map((label) => (
              <span
                key={label}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-medium uppercase tracking-wide text-white/55 backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="absolute bottom-16 right-4 w-28 rounded-lg border border-white/10 bg-navy-950/50 p-2 backdrop-blur-md">
            <div className="h-1 w-full rounded-full bg-white/10">
              <div className="h-1 w-[68%] rounded-full bg-accent/80" />
            </div>
            <p className="mt-1.5 text-[9px] text-white/45">Utilization</p>
          </div>
        </>
      ) : null}

      {variant === "interior" ? (
        <>
          <div className="absolute left-4 top-4 rounded-lg border border-white/10 bg-navy-950/55 px-2.5 py-1.5 text-[10px] font-medium text-white/70 backdrop-blur-md">
            Rehab · value-add
          </div>
          <div className="absolute right-4 bottom-20 rounded-full border border-accent-bright/25 bg-accent-bright/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-accent-bright/90">
            LTV context
          </div>
        </>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
    </div>
  );
}
