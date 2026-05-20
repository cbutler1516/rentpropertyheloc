import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-11 w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 text-sm text-white transition-colors focus:border-[#7c3aed]/60 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
