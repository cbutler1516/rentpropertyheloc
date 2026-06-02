import { LogoSystem } from "@/components/brand/logo-system";
import { ConceptLogoMark } from "@/components/brand/logo-marks";
import { Wordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/cn";
import { BRAND, type LogoVariant } from "@/lib/brand";
import { PRIMARY_LOGO_CONCEPT } from "@/lib/brand/logo-system";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
};

export function Logo({ variant = "navbar", className }: LogoProps) {
  if (variant === "horizontal") {
    return <LogoSystem variant="primary" className={className} />;
  }

  if (variant === "navbar") {
    return <LogoSystem variant="header" className={className} />;
  }

  if (variant === "light") {
    return <LogoSystem variant="footer" className={className} />;
  }

  if (variant === "icon") {
    return <LogoSystem variant="icon" className={className} />;
  }

  if (variant === "monochrome") {
    return (
      <span className={cn("inline-flex items-center gap-3", className)} aria-label={BRAND.name}>
        <ConceptLogoMark concept={PRIMARY_LOGO_CONCEPT} size={44} theme="mono" />
        <Wordmark light />
      </span>
    );
  }

  if (variant === "stacked") {
    const light = false;
    return (
      <span className={cn("inline-flex items-center gap-4", className)} aria-label={BRAND.name}>
        <ConceptLogoMark concept={PRIMARY_LOGO_CONCEPT} size={52} theme="dark" />
        <Wordmark stacked light={light} />
      </span>
    );
  }

  return <LogoSystem variant="primary" className={className} />;
}
