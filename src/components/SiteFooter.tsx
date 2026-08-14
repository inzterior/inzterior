import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";

export default function SiteFooter({ dict }: { dict: Dictionary["footer"] }) {
  return (
    <footer className="mt-24 bg-[var(--ink)] text-[#b9bbb5]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <h4 className="font-serif-display mb-4 text-lg font-semibold text-[#f5f6f3]">
              Inzterior
            </h4>
            <p className="text-sm text-[#9a9c95]">{dict.tagline}</p>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">{dict.explore}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/services" className="hover:text-[var(--accent-soft)]">{dict.services}</Link></li>
              <li><Link href="/about" className="hover:text-[var(--accent-soft)]">{dict.about}</Link></li>
              <li><Link href="/team" className="hover:text-[var(--accent-soft)]">{dict.ourTeam}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">{dict.studioGovernance}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/terms" className="hover:text-[var(--accent-soft)]">{dict.ourTerms}</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-[var(--accent-soft)]">{dict.termsOfService}</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[var(--accent-soft)]">{dict.privacyPolicy}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">{dict.contact}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="mailto:inquiry@inzterior.com" className="hover:text-[var(--accent-soft)]">inquiry@inzterior.com</a></li>
              <li>{dict.location}</li>
            </ul>
            <h4 className="mt-6 mb-4 text-xs tracking-wide text-[#f5f6f3]">{dict.follow}</h4>
            <ul className="flex gap-4 text-sm">
              <li>
                <a href="https://facebook.com/Inzterior" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-soft)]">
                  {dict.facebook}
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/inzterior" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-soft)]">
                  {dict.instagram}
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@inzterior" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-soft)]">
                  {dict.tiktok}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#83857e] sm:flex-row sm:items-center sm:justify-between">
          <span>{dict.copyright}</span>
          <span>{dict.tradingName}</span>
        </div>
      </div>
    </footer>
  );
}
