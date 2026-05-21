"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBookingUrl } from "../lib/booking-urls";
import { WordmarkLockup } from "./brand";

const navItems = [
  {
    href: "/buyers",
    label: "Buy a Home",
    description: "Payment and readiness",
  },
  {
    href: "/homeowners",
    label: "Use Equity",
    description: "Refinance and HELOC",
  },
  {
    href: "/investors",
    label: "Invest",
    description: "Rental and DSCR paths",
  },
  {
    href: "/commercial",
    label: "Commercial",
    description: "Operators and sponsors",
  },
  {
    href: "/commercial-capital-matchmaker",
    label: "Capital Match",
    description: "Broadview capital strategy",
  },
  {
    href: "/videos",
    label: "Videos",
    description: "Watch first",
  },
  {
    href: "/learn",
    label: "Learn",
    description: "Read the guide",
  },
];

const reviewOptionsCta = {
  href: "/strategy-review",
  label: "Review Options",
  description: "Short structured intake",
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isOpen = openPathname === pathname;
  const strategyCallHref = getBookingUrl("strategy");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPathname(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="nav-glass sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 md:gap-6 md:px-10 md:py-5 lg:gap-8">
        <Link
          href="/"
          className="nav-brand"
          aria-label="The Loan Playbook home"
        >
          <WordmarkLockup priority />
        </Link>

        <nav
          className="nav-primary hidden items-center gap-1 rounded-full border border-white/[0.06] bg-black/20 p-1.5 font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase md:flex lg:gap-1.5 lg:p-2"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={active ? "page" : undefined}
                data-active={active ? "true" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-cta-group hidden shrink-0 items-center gap-2.5 md:flex lg:gap-3">
          <Link
            href={strategyCallHref}
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-800 px-4 font-mono text-[10px] tracking-[0.16em] text-zinc-300 uppercase transition-colors duration-[var(--duration-hover)] hover:border-[#7c3aed]/50 hover:text-white"
          >
            Strategy Call
          </Link>
          <Link
            href={reviewOptionsCta.href}
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 font-mono text-[10px] tracking-[0.18em] text-black uppercase transition-colors duration-[var(--duration-hover)] hover:bg-zinc-100"
          >
            {reviewOptionsCta.label}
          </Link>
        </div>

        <button
          type="button"
          className="nav-menu-trigger md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setOpenPathname((current) => (current === pathname ? null : pathname))
          }
        >
          <span>{isOpen ? "Close" : "Menu"}</span>
          <span className="nav-menu-icon" aria-hidden />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className="nav-mobile-panel md:hidden"
        data-open={isOpen ? "true" : undefined}
      >
        <nav className="mx-auto grid w-full max-w-7xl gap-px px-6 pb-6">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-mobile-link"
                aria-current={active ? "page" : undefined}
                data-active={active ? "true" : undefined}
                onClick={() => setOpenPathname(null)}
              >
                <span>{item.label}</span>
                <span>{item.description}</span>
              </Link>
            );
          })}
          <Link
            href={strategyCallHref}
            className="nav-mobile-link"
            onClick={() => setOpenPathname(null)}
          >
            <span>Strategy Call</span>
            <span>Talk through your scenario</span>
          </Link>
          <Link
            href={reviewOptionsCta.href}
            className="nav-mobile-link"
            aria-current={
              isActivePath(pathname, reviewOptionsCta.href) ? "page" : undefined
            }
            data-active={
              isActivePath(pathname, reviewOptionsCta.href) ? "true" : undefined
            }
            onClick={() => setOpenPathname(null)}
          >
            <span>{reviewOptionsCta.label}</span>
            <span>{reviewOptionsCta.description}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
