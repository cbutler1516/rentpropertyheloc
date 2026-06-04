"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type SiteNavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

function scrollToSection(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function SiteNavLink({ href, onClick, ...props }: SiteNavLinkProps) {
  const pathname = usePathname();
  const isHomeHashLink = href.startsWith("/#");
  const hash = isHomeHashLink ? href.slice(1) : "";

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !isHomeHashLink) return;

    if (pathname === "/") {
      event.preventDefault();
      if (scrollToSection(hash)) {
        window.history.pushState(null, "", href);
      }
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
