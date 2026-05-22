type IconProps = { className?: string };

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20V6l8-4 8 4v14H4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 20v-5h6v5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function CycleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M17 7A7 7 0 1 0 7.2 16.5M7 7v4H3m14 6v-4h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M7 16V11m5 5V8m5 8v-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.5 11.5 14.5 15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ICON_MAP = {
  building: BuildingIcon,
  cycle: CycleIcon,
  chart: ChartIcon,
  shield: ShieldIcon,
} as const;

export function ProgramIcon({
  name,
  className,
}: {
  name: keyof typeof ICON_MAP;
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} />;
}
