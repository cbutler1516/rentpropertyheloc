import { TrackedLink } from "./tracked-link";

type ApplicationCtaProps = {
  location: string;
  title?: string;
  body?: string;
  label?: string;
};

export function ApplicationCta({
  location,
  title = "Ready to move forward?",
  body = "Continue to the secure application through Broadview Lending, powered by Barrett Financial Group.",
  label = "Apply Through Broadview Lending",
}: ApplicationCtaProps) {
  return (
    <div className="reveal-item border border-zinc-900/80 bg-[#050505] p-6 md:p-7">
      <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
        Secure Application
      </p>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
        {body}
      </p>
      <TrackedLink
        href="/apply"
        location={location}
        label={label}
        eventType="funnel_apply"
        className="btn-ghost mt-6 inline-flex h-12 w-fit items-center justify-center border border-zinc-800 px-7 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
      >
        {label}
      </TrackedLink>
    </div>
  );
}
