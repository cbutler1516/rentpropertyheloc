"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WordmarkLockup } from "./brand";

const navItems = [
  {
    href: "/learn",
    label: "Learn",
    description: "Education hub",
  },
  {
    href: "/videos",
    label: "Videos",
    description: "Social strategy",
  },
  {
    href: "/agents",
    label: "Agents",
    description: "Agent platform",
  },
  {
    href: "/partners",
    label: "Partners",
    description: "Brokerage platform",
  },
  {
    href: "/commercial",
    label: "Commercial",
    description: "Capital strategy",
  },
  {
    href: "/about",
    label: "About",
    description: "The method",
  },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
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
          className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-black/20 p-1 font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase md:flex"
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

        <button
          type="button"
          className="nav-menu-trigger md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
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
              >
                <span>{item.label}</span>
                <span>{item.description}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
