import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white p-6 text-navy-950 shadow-[0_18px_50px_rgba(8,20,40,0.12)]",
        className,
      )}
      {...props}
    />
  );
}
