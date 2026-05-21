import Link from "next/link";

const resourceLinks = [
  { href: "/guides", label: "Financing Guides" },
  { href: "/markets", label: "Markets" },
  { href: "/learn", label: "Learn" },
  { href: "/deal-analyzer", label: "Compare Financing Options" },
  { href: "/agents", label: "For Agents" },
  { href: "/partners", label: "Agent Partnerships" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
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
