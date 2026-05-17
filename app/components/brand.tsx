type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark brand-mark-${size} ${className}`} aria-hidden>
      <svg viewBox="0 0 72 72" role="img" focusable="false">
        <rect
          className="brand-mark-frame"
          x="9"
          y="9"
          width="54"
          height="54"
          rx="14"
        />
        <path
          className="brand-mark-route"
          d="M 17 52 C 27 58 45 56 56 46"
        />
        <path className="brand-mark-arrow" d="M 56 46 L 50 45 M 56 46 L 54 40" />
        <text className="brand-mark-lp" x="36" y="45" textAnchor="middle">
          LP
        </text>
      </svg>
    </span>
  );
}

export function BrandIcon({ className = "" }: { className?: string }) {
  return <BrandMark size="sm" className={className} />;
}

export function WordmarkLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <BrandMark size="md" />
      <span className="brand-wordmark">
        <span>THE LOAN</span>
        <strong>PLAYBOOK</strong>
      </span>
    </span>
  );
}

export function FooterBrand({ className = "" }: { className?: string }) {
  return (
    <div className={`footer-brand ${className}`}>
      <BrandMark size="md" />
      <div>
        <p>The Loan Playbook</p>
        <p>Strategy before submission</p>
      </div>
    </div>
  );
}
