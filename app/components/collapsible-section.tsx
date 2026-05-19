"use client";

import { useId, useState } from "react";

type CollapsibleSectionProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** When true, content stays in DOM for SEO (visually hidden when closed). */
  seoVisible?: boolean;
};

export function CollapsibleSection({
  title,
  eyebrow,
  children,
  defaultOpen = false,
  seoVisible = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <article className="border border-zinc-900/80 bg-[#050505]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left transition-colors hover:bg-zinc-900/20 md:px-8"
      >
        <span>
          {eyebrow ? (
            <span className="block font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
              {eyebrow}
            </span>
          ) : null}
          <span className="mt-1 block text-base font-medium text-white md:text-lg">
            {title}
          </span>
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-800 font-mono text-sm text-zinc-400 transition-transform ${
            open ? "rotate-45 border-[#7c3aed]/40 text-[#a78bfa]" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <CollapsiblePanel
        id={panelId}
        open={open}
        seoVisible={seoVisible}
        className="border-t border-zinc-900/60 px-7 pb-7 md:px-8 md:pb-8"
      >
        {children}
      </CollapsiblePanel>
    </article>
  );
}

function CollapsiblePanel({
  id,
  open,
  seoVisible,
  className,
  children,
}: {
  id: string;
  open: boolean;
  seoVisible: boolean;
  className: string;
  children: React.ReactNode;
}) {
  if (seoVisible) {
    return (
      <div id={id} hidden={!open} className={`${className} ${open ? "" : "sr-only"}`}>
        {children}
      </div>
    );
  }

  if (!open) return null;

  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
