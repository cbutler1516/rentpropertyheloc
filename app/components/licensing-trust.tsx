import { licensingTrustDetail, licensingTrustShort } from "../lib/licensing-trust";

type LicensingTrustProps = {
  className?: string;
  variant?: "inline" | "banner";
};

export function LicensingTrust({ className = "", variant = "inline" }: LicensingTrustProps) {
  if (variant === "banner") {
    return (
      <aside
        className={`rounded-sm border border-zinc-900/80 bg-zinc-950/60 px-6 py-5 ${className}`}
        aria-label="Licensing context"
      >
        <p className="text-sm leading-relaxed text-zinc-400">{licensingTrustShort}</p>
        <p className="mt-3 text-xs leading-relaxed text-zinc-600">{licensingTrustDetail}</p>
      </aside>
    );
  }

  return (
    <p className={`text-sm leading-relaxed text-zinc-500 ${className}`}>
      {licensingTrustShort}{" "}
      <span className="text-zinc-600">Full licensing details appear in the site footer.</span>
    </p>
  );
}
