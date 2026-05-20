import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-mono text-[10px] tracking-[0.16em] uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-zinc-100 shadow-[0_8px_32px_rgba(255,255,255,0.08)]",
        secondary:
          "border border-zinc-700 bg-zinc-900/60 text-zinc-200 hover:border-[#7c3aed]/50 hover:text-white",
        ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
        gold: "bg-gradient-to-r from-[#c9a227] to-[#e8c547] text-black hover:brightness-110 shadow-[0_8px_32px_rgba(201,162,39,0.2)]",
        outline:
          "border border-[#7c3aed]/40 text-[#c4b5fd] hover:border-[#7c3aed] hover:bg-[#7c3aed]/10",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[9px]",
        lg: "h-12 px-8 text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";
