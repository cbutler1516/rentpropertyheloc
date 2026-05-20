import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";
