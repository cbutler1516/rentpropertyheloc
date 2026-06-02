import { ConceptLogoMark, type LogoMarkTheme } from "@/components/brand/logo-marks";
import { Wordmark } from "@/components/brand/wordmark";
import { BRAND } from "@/lib/brand";
import {
  PRIMARY_LOGO_CONCEPT,
  type LogoConceptId,
  type LogoSystemVariant,
} from "@/lib/brand/logo-system";
import { cn } from "@/lib/cn";

type LogoSystemProps = {
  concept?: LogoConceptId;
  variant?: LogoSystemVariant;
  className?: string;
};

function themeForVariant(variant: LogoSystemVariant): LogoMarkTheme {
  return variant === "footer" ? "light" : "dark";
}

function markSizeForVariant(variant: LogoSystemVariant, concept: LogoConceptId): number {
  if (variant === "icon") return 48;
  if (variant === "compact") return 32;
  if (variant === "header") return 36;
  if (variant === "footer") return 36;
  return concept === "typography-only" ? 0 : 44;
}

export function LogoSystem({
  concept = PRIMARY_LOGO_CONCEPT,
  variant = "primary",
  className,
}: LogoSystemProps) {
  const theme = themeForVariant(variant);
  const light = variant === "footer";
  const markSize = markSizeForVariant(variant, concept);
  const typographyOnly = concept === "typography-only";

  if (variant === "icon") {
    return (
      <span className={cn("inline-flex", className)} aria-label={BRAND.name}>
        <ConceptLogoMark concept={concept} size={48} theme={theme} />
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <span
        className={cn("inline-flex items-center gap-2.5", className)}
        aria-label={BRAND.name}
      >
        {!typographyOnly ? (
          <ConceptLogoMark concept={concept} size={32} theme={theme} />
        ) : null}
        <Wordmark compact light={light} showAccentBar={typographyOnly} />
      </span>
    );
  }

  if (variant === "header") {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)} aria-label={BRAND.name}>
        {!typographyOnly ? (
          <ConceptLogoMark concept={concept} size={36} theme={theme} />
        ) : null}
        <Wordmark light={light} showAccentBar={typographyOnly} />
      </span>
    );
  }

  if (variant === "footer") {
    return (
      <span className={cn("inline-flex items-center gap-3", className)} aria-label={BRAND.name}>
        {!typographyOnly ? (
          <ConceptLogoMark concept={concept} size={36} theme="light" />
        ) : null}
        <Wordmark light showAccentBar={typographyOnly} />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)} aria-label={BRAND.name}>
      {!typographyOnly ? (
        <ConceptLogoMark concept={concept} size={44} theme={theme} />
      ) : null}
      <Wordmark light={light} stacked={false} showAccentBar={typographyOnly} />
    </span>
  );
}
