import { cn } from "@/lib/utils";

type DealAnalyzerSkeletonProps = {
  className?: string;
  lines?: number;
};

export function DealAnalyzerSkeleton({
  className,
  lines = 3,
}: DealAnalyzerSkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-3", className)} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 rounded-full bg-zinc-800",
            i === 0 && "w-2/3",
            i === 1 && "w-full",
            i > 1 && "w-4/5",
          )}
        />
      ))}
    </div>
  );
}

export function ReportLoadingSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading report">
      <div className="animate-pulse rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-6">
        <div className="flex flex-wrap gap-3">
          <div className="h-9 w-28 rounded-full bg-zinc-800" />
          <div className="h-9 w-32 rounded-full bg-zinc-800" />
          <div className="h-9 w-36 rounded-full bg-zinc-800" />
        </div>
      </div>
      <div className="animate-pulse space-y-4 rounded-2xl border border-white/[0.06] bg-zinc-900/30 p-8">
        <div className="h-6 w-48 rounded-full bg-zinc-800" />
        <DealAnalyzerSkeleton lines={4} />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="h-20 rounded-xl bg-zinc-800/80" />
          <div className="h-20 rounded-xl bg-zinc-800/80" />
          <div className="h-20 rounded-xl bg-zinc-800/80" />
        </div>
      </div>
      <p className="text-center font-mono text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
        Loading Playbook Report…
      </p>
    </div>
  );
}
