import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#7c3aed]/60 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
