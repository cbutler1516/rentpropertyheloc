import { TrackedAnchor } from "./tracked-link";

type StickyMobileCtaProps = {
  href: string;
  label: string;
  eyebrow?: string;
  location: string;
};

export function StickyMobileCta({
  href,
  label,
  eyebrow = "Next Move",
  location,
}: StickyMobileCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-900/80 bg-[#050505]/95 px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] tracking-[0.22em] text-[#7c3aed] uppercase">
            {eyebrow}
          </p>
          <p className="mt-1 text-xs text-zinc-500">No-pressure guidance.</p>
        </div>
        <TrackedAnchor
          href={href}
          location={location}
          label={label}
          eventType="sticky_cta"
          className="btn-primary inline-flex h-11 shrink-0 items-center justify-center bg-white px-5 text-xs font-medium tracking-wide text-black hover:bg-zinc-100"
        >
          {label}
        </TrackedAnchor>
      </div>
    </div>
  );
}
