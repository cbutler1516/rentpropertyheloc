import { cn } from "@/lib/utils";

export function MetricTile({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: "purple" | "gold" | "default";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        highlight === "purple" && "border-[#7c3aed]/30 bg-[#7c3aed]/5",
        highlight === "gold" && "border-[#c9a227]/30 bg-[#c9a227]/5",
        (!highlight || highlight === "default") &&
          "border-white/[0.06] bg-zinc-950/50",
      )}
    >
      <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
        {label}
      </p>
      <p className="mt-2 text-2xl font-medium tracking-tight text-white">
        {value}
      </p>
      {sub ? <p className="mt-1 text-xs text-zinc-500">{sub}</p> : null}
    </div>
  );
}

