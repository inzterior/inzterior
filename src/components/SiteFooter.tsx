import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-[var(--ink)] text-[#b9bbb5]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-4">
          <div>
            <h4 className="font-serif-display mb-4 text-lg font-semibold text-[#f5f6f3]">
              Inzterior
            </h4>
            <p className="text-sm text-[#9a9c95]">
              A Malaysian interior design studio based in Iskandar Puteri, working across
              residential and commercial spaces.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">Explore</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/services" className="hover:text-[var(--accent-soft)]">Services</Link></li>
              <li><Link href="/about" className="hover:text-[var(--accent-soft)]">About</Link></li>
              <li><Link href="/team" className="hover:text-[var(--accent-soft)]">Our Team</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">Studio Governance</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/terms" className="hover:text-[var(--accent-soft)]">Our Terms</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-[var(--accent-soft)]">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[var(--accent-soft)]">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f5f6f3]">Contact</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="mailto:inquiry@inzterior.com" className="hover:text-[var(--accent-soft)]">inquiry@inzterior.com</a></li>
              <li>Horizon Hills, Iskandar Puteri, Johor</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#83857e] sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 Inzterior. All rights reserved.</span>
          <span>
            <strong className="text-[#b9bbb5]">Inzterior</strong> is the trading name of Istory
            Design Studio (SSM Reg. No. SA0647003-M).
          </span>
        </div>
      </div>
    </footer>
  );
}
