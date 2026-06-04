"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToHashId(id: string) {
  const attempt = (retriesLeft: number) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (retriesLeft > 0) {
      window.setTimeout(() => attempt(retriesLeft - 1), 100);
    }
  };

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => attempt(8));
  });
}

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash;
    if (!hash) return;

    scrollToHashId(hash.slice(1));
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.pathname !== "/") return;
      const hash = window.location.hash;
      if (!hash) return;
      scrollToHashId(hash.slice(1));
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
