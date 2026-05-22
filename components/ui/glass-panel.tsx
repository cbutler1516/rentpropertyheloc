import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function GlassPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
