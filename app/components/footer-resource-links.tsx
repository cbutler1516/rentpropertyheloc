import Link from "next/link";

const resourceLinks = [
  { href: "/guides", label: "Financing Guides" },
  { href: "/markets", label: "Markets" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "State Licensing" },
] as const;

export function FooterResourceLinks() {
  return (
    <nav
      className="footer-resource-links"
      aria-label="Additional site resources"
    >
      {resourceLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
