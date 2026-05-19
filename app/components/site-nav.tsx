"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WordmarkLockup } from "./brand";
import { TrackedLink } from "./tracked-link";

const navItems = [
  {
    href: "/buyers",
    label: "Buyers",
    description: "Start with your number",
  },
  {
    href: "/learn/refinance-timing",
    label: "Homeowners",
    description: "Review refinance timing",
  },
  {
    href: "/agents",
    label: "Agents",
    description: "Financing clarity for clients",
  },
  {
    href: "/partners",
    label: "Partners",
    description: "Brokerages and teams",
  },
  {
    href: "/commercial",
    label: "Commercial",
    description: "Investor and operator scenarios",
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

const primaryNavCta = {
  href: "/learn/buyer-readiness",
  label: "Strategy Call",
  description: "Start here",
};

const secondaryNavCta = {
  href: "/apply",
  label: "Apply",
  description: "Secure application",
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const isOpen = openPathname === pathname;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPathname(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="nav-glass sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <Link
          href="/"
          className="nav-brand"
          aria-label="The Loan Playbook home"
        >
          <WordmarkLockup />
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-white/[0.06] bg-black/20 p-1 font-mono text-[10px] tracking-[0.12em] text-zinc-500 uppercase md:flex"
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

        <div className="hidden items-center gap-2 md:flex">
          <TrackedLink
            href={secondaryNavCta.href}
            location="site_nav"
            label={secondaryNavCta.label}
            eventType="apply_cta"
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-800 px-4 font-mono text-[10px] tracking-[0.16em] text-zinc-300 uppercase transition-colors duration-[var(--duration-hover)] hover:border-[#7c3aed]/50 hover:text-white"
          >
            {secondaryNavCta.label}
          </TrackedLink>
          <Link
            href={primaryNavCta.href}
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 font-mono text-[10px] tracking-[0.18em] text-black uppercase transition-colors duration-[var(--duration-hover)] hover:bg-zinc-100"
          >
            {primaryNavCta.label}
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
          <TrackedLink
            href={secondaryNavCta.href}
            location="site_mobile_nav"
            label={secondaryNavCta.label}
            eventType="apply_cta"
            className="nav-mobile-link"
            onClick={() => setOpenPathname(null)}
          >
            <span>{secondaryNavCta.label}</span>
            <span>{secondaryNavCta.description}</span>
          </TrackedLink>
          <Link
            href={primaryNavCta.href}
            className="nav-mobile-link"
            aria-current={
              isActivePath(pathname, primaryNavCta.href) ? "page" : undefined
            }
            data-active={
              isActivePath(pathname, primaryNavCta.href) ? "true" : undefined
            }
            onClick={() => setOpenPathname(null)}
          >
            <span>{primaryNavCta.label}</span>
            <span>{primaryNavCta.description}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
