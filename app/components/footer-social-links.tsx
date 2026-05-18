import { socialLinks } from "../lib/social-links";
import { TrackedAnchor } from "./tracked-link";

const footerLinks = socialLinks.filter(
  (link) => link.platform !== "Broadview Lending",
);

export function FooterSocialLinks() {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-7xl flex-wrap items-center justify-center gap-4 px-6 font-mono text-[10px] tracking-[0.18em] text-zinc-700 uppercase md:justify-end md:px-10">
      <span>Follow The Loan Playbook</span>
      {footerLinks.map((link) => (
        <TrackedAnchor
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          location="footer_social"
          label={link.label}
          eventType="social"
          platform={link.platform}
          className="transition-colors duration-[var(--duration-hover)] hover:text-[#7c3aed]"
        >
          {link.label}
        </TrackedAnchor>
      ))}
    </div>
  );
}
