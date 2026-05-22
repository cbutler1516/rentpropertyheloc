import { cn } from "@/lib/cn";

export function ComplianceNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xs leading-relaxed text-white/50 sm:text-[0.8125rem]", className)}>
      {children}
    </p>
  );
}
