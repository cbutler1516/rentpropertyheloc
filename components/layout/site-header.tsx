"use client";

import { Logo } from "@/components/brand/logo";
import { SiteNavLink } from "@/components/layout/site-nav-link";
import { CtaLink } from "@/components/ui/cta-link";
import {
  PLATFORM_PHONE_DISPLAY,
  PLATFORM_PHONE_TEL,
} from "@/lib/contact";
import { FUNNEL_SECTION_ID, HEADER_FUNNEL_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { scrollToSection } from "@/lib/scroll-to-section";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";

function HeaderPhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.5 3.5h2.2l1.1 2.6a1 1 0 0 1-.24 1.05l-1.45 1.45a11.5 11.5 0 0 0 5.34 5.34l1.45-1.45a1 1 0 0 1 1.05-.24l2.6 1.1v2.2a1 1 0 0 1-.92 1A14.5 14.5 0 0 1 3.5 5.42a1 1 0 0 1 1-1.02h2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeaderDesktopPhone({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${PLATFORM_PHONE_TEL}`}
      className={cn(
        "hidden shrink-0 flex-col justify-center text-right leading-tight transition hover:opacity-100 md:flex",
        className,
      )}
    >
      <span className="text-[11px] font-medium text-white/50">
        Questions? Call or Text
      </span>
      <span className="mt-0.5 text-sm font-medium text-white/85 transition hover:text-white">
        {PLATFORM_PHONE_DISPLAY}
      </span>
    </a>
  );
}

function HeaderMobilePhoneLink({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href={`tel:${PLATFORM_PHONE_TEL}`}
      onClick={onClick}
      className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-white/90 transition hover:bg-white/5"
    >
      <HeaderPhoneIcon className="h-5 w-5 shrink-0 text-white/70" />
      <span className="flex flex-col">
        <span className="text-xs text-white/55">Questions? Call or Text</span>
        <span className="text-base font-medium text-white">{PLATFORM_PHONE_DISPLAY}</span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  function handleFindRateClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/check-options") {
      event.preventDefault();
      if (scrollToSection(`#${FUNNEL_SECTION_ID}`)) {
        window.history.pushState(null, "", HEADER_FUNNEL_HREF);
      }
    }
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-brand-dark/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-3 sm:gap-5 sm:px-6 md:h-[4.25rem] md:gap-8 lg:px-8">
        <Link
          href="/"
          className="mr-1 shrink-0 rounded-lg py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mr-3"
        >
          <Logo variant="navbar" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
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

        <div className="ml-auto flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <HeaderDesktopPhone />

          <CtaLink
            href={HEADER_FUNNEL_HREF}
            size="sm"
            className="inline-flex shrink-0 max-md:!h-10 max-md:!min-h-[44px] max-md:!px-3 max-md:!text-xs"
            onClick={handleFindRateClick}
          >
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
              <HeaderMobilePhoneLink onClick={() => setOpen(false)} />
              <CtaLink
                href={HEADER_FUNNEL_HREF}
                size="lg"
                className="mt-3 w-full"
                onClick={handleFindRateClick}
              >
                {PRIMARY_CTA_LABEL}
              </CtaLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
