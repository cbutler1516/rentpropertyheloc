import type { ReactNode } from "react";

type AdminEmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function AdminEmptyState({
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/[0.1] bg-zinc-950/40 px-6 py-12 text-center">
      <p className="font-mono text-[9px] tracking-[0.22em] text-zinc-600 uppercase">
        Nothing here yet
      </p>
      <p className="mt-3 text-base font-medium text-zinc-300">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
