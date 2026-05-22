"use client";

import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-navy-950">
            RH
          </span>
          <span className="hidden text-sm sm:inline sm:text-base">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <CtaLink href={PRIMARY_CTA_HREF} size="sm" className="hidden shrink-0 md:inline-flex">
          {PRIMARY_CTA_LABEL}
        </CtaLink>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="text-lg">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/85"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <CtaLink
              href={PRIMARY_CTA_HREF}
              size="md"
              className="mt-1 w-full"
              onClick={() => setOpen(false)}
            >
              {PRIMARY_CTA_LABEL}
            </CtaLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
