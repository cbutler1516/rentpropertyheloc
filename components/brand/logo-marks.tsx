"use client";

import { LOGO_COLORS, type LogoConceptId } from "@/lib/brand/logo-system";
import { cn } from "@/lib/cn";
import { useId } from "react";

export type LogoMarkTheme = "dark" | "light" | "mono";

type LogoMarkProps = {
  concept: LogoConceptId;
  size?: number;
  theme?: LogoMarkTheme;
  className?: string;
};

function useMarkColors(theme: LogoMarkTheme) {
  const isLight = theme === "light";
  const isMono = theme === "mono";

  return {
    stroke: isLight || isMono ? LOGO_COLORS.navy : LOGO_COLORS.white,
    fill: isLight || isMono ? LOGO_COLORS.navy : LOGO_COLORS.white,
    muted: isLight ? LOGO_COLORS.navy : "rgba(255,255,255,0.55)",
    frame: isMono ? LOGO_COLORS.navy : isLight ? LOGO_COLORS.teal : LOGO_COLORS.tealBright,
    useGradient: theme === "dark",
  };
}

export function ConceptLogoMark({
  concept,
  size = 40,
  theme = "dark",
  className,
}: LogoMarkProps) {
  if (concept === "typography-only") {
    return <TypographyOnlyMark size={size} theme={theme} className={className} />;
  }
  if (concept === "monogram") {
    return <MonogramMark size={size} theme={theme} className={className} />;
  }
  if (concept === "equity-arrow") {
    return <EquityArrowMark size={size} theme={theme} className={className} />;
  }
  if (concept === "building-growth") {
    return <BuildingGrowthMark size={size} theme={theme} className={className} />;
  }
  return <KeyholeCapitalMark size={size} theme={theme} className={className} />;
}

function MarkSvg({
  size,
  className,
  children,
}: {
  size: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function MonogramMark({ size, theme, className }: Omit<LogoMarkProps, "concept">) {
  const uid = useId();
  const colors = useMarkColors(theme ?? "dark");

  return (
    <MarkSvg size={size ?? 40} className={className}>
      {colors.useGradient ? (
        <defs>
          <linearGradient id={`${uid}-grad`} x1="8" y1="40" x2="40" y2="8">
            <stop stopColor={LOGO_COLORS.tealBright} />
            <stop offset="1" stopColor={LOGO_COLORS.teal} />
          </linearGradient>
        </defs>
      ) : null}
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="11"
        stroke={colors.useGradient ? `url(#${uid}-grad)` : colors.frame}
        strokeWidth="1.5"
        fill={theme === "light" ? LOGO_COLORS.white : LOGO_COLORS.navyDeep}
      />
      <path
        d="M16 14v20M16 14c0 0 0-2 4-2s6 2 6 6-2.5 6-6 6"
        stroke={colors.stroke}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 14v20M28 14h5.5c3.5 0 5.5 2.2 5.5 5.5S37 25 31.5 25H28"
        stroke={colors.stroke}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MarkSvg>
  );
}

function EquityArrowMark({ size, theme, className }: Omit<LogoMarkProps, "concept">) {
  const uid = useId();
  const colors = useMarkColors(theme ?? "dark");

  return (
    <MarkSvg size={size ?? 40} className={className}>
      {colors.useGradient ? (
        <defs>
          <linearGradient id={`${uid}-grad`} x1="6" y1="42" x2="42" y2="6">
            <stop stopColor={LOGO_COLORS.tealBright} />
            <stop offset="1" stopColor={LOGO_COLORS.teal} />
          </linearGradient>
        </defs>
      ) : null}
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke={colors.useGradient ? `url(#${uid}-grad)` : colors.frame}
        strokeWidth="1.35"
        fill={theme === "light" ? LOGO_COLORS.white : LOGO_COLORS.navyDeep}
      />
      <path
        d="M15.5 30.5V17.5h4.2l3.1 3.1V30.5M15.5 22.2h7.3"
        stroke={colors.stroke}
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 17.5v13M24.5 17.5h3.8c2.4 0 3.8 1.5 3.8 3.8s-1.4 3.7-3.8 3.7h-3.8"
        stroke={colors.stroke}
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.5 31.5L38.5 14.5M38.5 14.5H32.2M38.5 14.5V20.8"
        stroke={colors.useGradient ? `url(#${uid}-grad)` : colors.frame}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MarkSvg>
  );
}

function BuildingGrowthMark({ size, theme, className }: Omit<LogoMarkProps, "concept">) {
  const uid = useId();
  const colors = useMarkColors(theme ?? "dark");

  return (
    <MarkSvg size={size ?? 40} className={className}>
      {colors.useGradient ? (
        <defs>
          <linearGradient id={`${uid}-grad`} x1="10" y1="38" x2="38" y2="10">
            <stop stopColor={LOGO_COLORS.tealBright} />
            <stop offset="1" stopColor={LOGO_COLORS.teal} />
          </linearGradient>
        </defs>
      ) : null}
      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="10"
        stroke={colors.useGradient ? `url(#${uid}-grad)` : colors.frame}
        strokeWidth="1.35"
        fill={theme === "light" ? LOGO_COLORS.white : LOGO_COLORS.navyDeep}
      />
      <path
        d="M13 34V24h5v10M20 34V19h5v15M27 34V14h5v20"
        fill={colors.useGradient ? `url(#${uid}-grad)` : colors.frame}
        opacity="0.95"
      />
      <path
        d="M12 34h26"
        stroke={colors.muted}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M31 28l4-4 3 2.5 5-7"
        stroke={colors.stroke}
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="28" r="1.35" fill={colors.stroke} />
      <circle cx="35" cy="24" r="1.35" fill={colors.stroke} />
      <circle cx="38" cy="26.5" r="1.35" fill={colors.stroke} />
      <circle cx="43" cy="19.5" r="1.35" fill={colors.useGradient ? `url(#${uid}-grad)` : colors.frame} />
    </MarkSvg>
  );
}

function KeyholeCapitalMark({ size, theme, className }: Omit<LogoMarkProps, "concept">) {
  const uid = useId();
  const colors = useMarkColors(theme ?? "dark");

  return (
    <MarkSvg size={size ?? 40} className={className}>
      {colors.useGradient ? (
        <defs>
          <linearGradient id={`${uid}-grad`} x1="12" y1="36" x2="36" y2="12">
            <stop stopColor={LOGO_COLORS.tealBright} />
            <stop offset="1" stopColor={LOGO_COLORS.teal} />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M24 6c-6.6 0-12 5.4-12 12 0 4.2 2.2 7.9 5.5 10l-2.2 14h17.4l-2.2-14c3.3-2.1 5.5-5.8 5.5-10 0-6.6-5.4-12-12-12z"
        stroke={colors.useGradient ? `url(#${uid}-grad)` : colors.frame}
        strokeWidth="1.5"
        fill={theme === "light" ? LOGO_COLORS.white : LOGO_COLORS.navyDeep}
      />
      <circle
        cx="24"
        cy="18"
        r="5.25"
        stroke={colors.stroke}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M21.5 18.5l2 2 4.5-4.5"
        stroke={colors.useGradient ? `url(#${uid}-grad)` : colors.frame}
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 34h8"
        stroke={colors.muted}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </MarkSvg>
  );
}

function TypographyOnlyMark({ size, theme, className }: Omit<LogoMarkProps, "concept">) {
  const colors = useMarkColors(theme ?? "dark");

  return (
    <MarkSvg size={size ?? 40} className={className}>
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="10"
        fill={theme === "light" ? LOGO_COLORS.white : LOGO_COLORS.navyDeep}
        stroke={colors.frame}
        strokeWidth="1.35"
      />
      <rect x="14" y="13" width="2.5" height="22" rx="1.25" fill={colors.frame} />
      <text
        x="20"
        y="29"
        fill={colors.stroke}
        fontSize="13"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="0.08em"
      >
        RP
      </text>
    </MarkSvg>
  );
}
