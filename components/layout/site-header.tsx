"use client";

import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-navy-950">
            RH
          </span>
          <span className="hidden sm:inline">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-accent-bright"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            size="sm"
            onClick={() =>
              document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Check eligibility
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="text-lg">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              size="sm"
              className="mt-2 w-full"
              onClick={() => {
                setOpen(false);
                document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Check eligibility
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
