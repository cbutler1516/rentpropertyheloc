import { socialLinks } from "../lib/social-links";

const footerLinks = socialLinks.filter(
  (link) => link.platform !== "Broadview Lending",
);

export function FooterSocialLinks() {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-7xl flex-wrap items-center justify-center gap-4 px-6 font-mono text-[10px] tracking-[0.18em] text-zinc-700 uppercase md:justify-end md:px-10">
      <span>Follow The Loan Playbook</span>
      {footerLinks.map((link) => (
        <a
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-[var(--duration-hover)] hover:text-[#7c3aed]"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
