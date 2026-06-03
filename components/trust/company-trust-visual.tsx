import { cn } from "@/lib/cn";

type CompanyTrustVisualProps = {
  variant?: "full" | "compact";
  className?: string;
};

/** Branded abstract illustration — property, financing, human guidance */
export function CompanyTrustVisual({
  variant = "full",
  className,
}: CompanyTrustVisualProps) {
  const compact = variant === "compact";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-navy-950",
        compact ? "aspect-square rounded-xl" : "aspect-[5/3] rounded-2xl lg:rounded-none lg:rounded-r-2xl",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 600 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ct-bg" x1="0" y1="360" x2="600" y2="0">
            <stop stopColor="#040810" />
            <stop offset="0.5" stopColor="#0a1220" />
            <stop offset="1" stopColor="#134e4a" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="ct-glow" x1="300" y1="360" x2="480" y2="40">
            <stop stopColor="#14b8a6" stopOpacity="0.22" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ct-teal" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#0d9488" />
            <stop offset="1" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>

        <rect width="600" height="360" fill="url(#ct-bg)" />
        <ellipse cx="420" cy="80" rx="180" ry="120" fill="url(#ct-glow)" />

        {/* Subtle grid */}
        {[80, 140, 200, 260, 320].map((y) => (
          <line
            key={`h-${y}`}
            x1="40"
            y1={y}
            x2="560"
            y2={y}
            stroke="#ffffff"
            strokeOpacity="0.04"
            strokeWidth="1"
          />
        ))}
        {[120, 240, 360, 480].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="48"
            x2={x}
            y2="312"
            stroke="#ffffff"
            strokeOpacity="0.04"
            strokeWidth="1"
          />
        ))}

        {/* Property card */}
        <rect
          x="52"
          y="88"
          width="148"
          height="184"
          rx="12"
          fill="#ffffff"
          fillOpacity="0.05"
          stroke="#ffffff"
          strokeOpacity="0.1"
        />
        <path
          d="M88 168 L116 140 L144 168 V208 H88 Z"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
        />
        <rect x="100" y="184" width="16" height="24" rx="2" fill="#475569" fillOpacity="0.6" />
        <circle cx="128" cy="152" r="14" fill="#0d9488" fillOpacity="0.35" stroke="#14b8a6" strokeWidth="1.5" />
        <path
          d="M122 152 L126 156 L134 146"
          stroke="#5eead4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="72" y="108" width="72" height="8" rx="2" fill="#ffffff" fillOpacity="0.12" />
        <rect x="72" y="124" width="48" height="6" rx="2" fill="#ffffff" fillOpacity="0.07" />

        {/* Dashboard panel */}
        <rect
          x="208"
          y="72"
          width="224"
          height="216"
          rx="14"
          fill="#ffffff"
          fillOpacity="0.04"
          stroke="#334155"
          strokeWidth="1"
        />
        <rect x="228" y="92" width="184" height="28" rx="6" fill="#1e293b" />
        <circle cx="244" cy="106" r="5" fill="#14b8a6" />
        <rect x="260" y="101" width="100" height="10" rx="2" fill="#475569" />
        <rect x="228" y="136" width="88" height="72" rx="6" fill="#0f172a" fillOpacity="0.8" />
        <path
          d="M244 192 L256 164 L272 176 L296 132 L320 156 L344 120 L368 148"
          stroke="url(#ct-teal)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="328" y="136" width="84" height="10" rx="2" fill="#334155" />
        <rect x="328" y="154" width="64" height="7" rx="2" fill="#334155" fillOpacity="0.7" />
        <rect x="328" y="168" width="72" height="7" rx="2" fill="#334155" fillOpacity="0.7" />
        <rect x="328" y="182" width="52" height="7" rx="2" fill="#334155" fillOpacity="0.7" />
        <rect x="328" y="204" width="56" height="22" rx="4" fill="#0d9488" fillOpacity="0.25" stroke="#14b8a6" strokeOpacity="0.45" />

        {/* Chat / human guidance */}
        <rect
          x="448"
          y="120"
          width="108"
          height="88"
          rx="14"
          fill="#ffffff"
          fillOpacity="0.06"
          stroke="#14b8a6"
          strokeOpacity="0.35"
        />
        <rect x="464" y="136" width="56" height="8" rx="2" fill="#ffffff" fillOpacity="0.15" />
        <rect x="464" y="152" width="72" height="6" rx="2" fill="#ffffff" fillOpacity="0.1" />
        <rect x="464" y="166" width="48" height="6" rx="2" fill="#ffffff" fillOpacity="0.1" />
        <circle cx="520" cy="248" r="28" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        <path
          d="M520 232c0-8.8 7.2-16 16-16s16 7.2 16 16"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M496 268h48l-6 36h-36l-6-36z" fill="#0f766e" fillOpacity="0.9" />

        {/* Upward equity line accent */}
        <path
          d="M52 300 L180 268 L280 284 L420 228 L548 192"
          stroke="url(#ct-teal)"
          strokeWidth="2"
          strokeOpacity="0.45"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
}
