import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentProps } from "react";

type FooterNavLinkProps = ComponentProps<typeof Link>;

export function FooterNavLink({ className, children, ...props }: FooterNavLinkProps) {
  return (
    <Link
      className={cn(
        "flex min-h-[44px] items-center text-sm text-slate-600 underline-offset-4 transition",
        "max-md:min-h-[48px]",
        "hover:text-brand-navy hover:underline",
        "focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
