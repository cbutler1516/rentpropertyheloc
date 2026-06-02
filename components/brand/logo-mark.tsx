import { ConceptLogoMark } from "@/components/brand/logo-marks";
import { PRIMARY_LOGO_CONCEPT } from "@/lib/brand/logo-system";
import { cn } from "@/lib/cn";

type LogoMarkProps = {
  className?: string;
  size?: number;
  variant?: "color" | "monochrome" | "light";
};

export function LogoMark({ className, size = 40, variant = "color" }: LogoMarkProps) {
  const theme = variant === "light" ? "light" : variant === "monochrome" ? "mono" : "dark";

  return (
    <ConceptLogoMark
      concept={PRIMARY_LOGO_CONCEPT}
      size={size}
      theme={theme}
      className={cn("shrink-0", className)}
    />
  );
}
