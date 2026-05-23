import { cn } from "@/lib/cn";

type LogoMarkProps = {
  className?: string;
  size?: number;
  variant?: "color" | "monochrome" | "light";
};

export function LogoMark({ className, size = 40, variant = "color" }: LogoMarkProps) {
  const stroke = variant === "light" ? "#06101f" : "#ffffff";
  const useGradient = variant === "color";

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
      {useGradient ? (
        <defs>
          <linearGradient id="brandGrad" x1="8" y1="36" x2="40" y2="12">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#4ade80" />
          </linearGradient>
        </defs>
      ) : null}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke={useGradient ? "url(#brandGrad)" : stroke}
        strokeWidth="1.25"
        opacity={variant === "monochrome" ? 0.9 : 1}
      />
      <path
        d="M15 30V22l9-7 9 7v8"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="17" y="28" width="3.5" height="6" rx="0.5" fill={useGradient ? "url(#brandGrad)" : stroke} />
      <rect x="22.25" y="25" width="3.5" height="9" rx="0.5" fill={useGradient ? "url(#brandGrad)" : stroke} />
      <rect x="27.5" y="22" width="3.5" height="12" rx="0.5" fill={useGradient ? "url(#brandGrad)" : stroke} />
    </svg>
  );
}
