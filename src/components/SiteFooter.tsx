import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-[var(--ink)] text-[#c9bea9]">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h4 className="font-serif-display mb-4 text-lg font-semibold text-[#f0e9da]">
              Inzterior
            </h4>
            <p className="text-sm text-[#a89b83]">
              A Malaysian interior design studio based in Iskandar Puteri, working across
              residential and commercial spaces.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f0e9da]">Explore</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs tracking-wide text-[#f0e9da]">Contact</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="mailto:inquiry@inzterior.com">inquiry@inzterior.com</a></li>
              <li>Horizon Hills, Iskandar Puteri, Johor</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#8c816d] sm:flex-row sm:justify-between">
          <span>&copy; 2026 Inzterior. All rights reserved.</span>
          <span>
            <strong className="text-[#c9bea9]">Inzterior</strong> is the trading name of Istory
            Design Studio (SSM Reg. No. SA0647003-M).
          </span>
        </div>
      </div>
    </footer>
  );
}
