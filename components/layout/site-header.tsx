"use client";

import { Logo } from "@/components/brand/logo";
import { SiteNavLink } from "@/components/layout/site-nav-link";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { NAV_LINKS } from "@/lib/site";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-brand-dark/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-lg py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Logo variant="navbar" priority />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {NAV_LINKS.map((link) => (
            <SiteNavLink
              key={link.href}
              href={link.href}
              className="text-sm text-white/65 transition hover:text-white"
            >
              {link.label}
            </SiteNavLink>
          ))}
        </nav>

        <CtaLink href={PRIMARY_CTA_HREF} size="sm" className="hidden shrink-0 md:inline-flex">
          {PRIMARY_CTA_LABEL}
        </CtaLink>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 text-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-5">
              {NAV_LINKS.map((link) => (
                <SiteNavLink
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3.5 text-base text-white/90 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </SiteNavLink>
              ))}
              <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="mt-3 w-full" onClick={() => setOpen(false)}>
                {PRIMARY_CTA_LABEL}
              </CtaLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
