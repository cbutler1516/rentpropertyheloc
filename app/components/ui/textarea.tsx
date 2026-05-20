import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[100px] w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-[#7c3aed]/60 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
