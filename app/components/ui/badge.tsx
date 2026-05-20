import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.18em] uppercase",
  {
    variants: {
      variant: {
        default: "border border-zinc-700 bg-zinc-900 text-zinc-300",
        purple: "border border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#c4b5fd]",
        gold: "border border-[#c9a227]/40 bg-[#c9a227]/10 text-[#e8c547]",
        success: "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        warning: "border border-amber-500/30 bg-amber-500/10 text-amber-300",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
