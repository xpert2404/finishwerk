import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

const CURRENT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/[0.06]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* ── Main Grid ── */}
        <div className="grid gap-10 py-12 lg:grid-cols-[1.3fr_0.85fr_0.85fr]">
          {/* Brand Column */}
          <div className="space-y-5">
            <div className="relative h-14 w-40">
              <Image
                src="/brand/finishwerk-wordmark.png"
                alt="FinishWerk"
                fill
                className="object-contain object-left"
                sizes="160px"
              />
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--muted-strong)]">
              {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[var(--accent)]"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--muted-strong)] transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Recht & Kontakt
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href={siteConfig.legal.privacyHref}
                className="text-sm text-[var(--muted-strong)] transition-colors hover:text-white"
              >
                Datenschutz
              </Link>
              <Link
                href={siteConfig.legal.imprintHref}
                className="text-sm text-[var(--muted-strong)] transition-colors hover:text-white"
              >
                Impressum
              </Link>
            </div>
          </div>
        </div>

        {/* ── Copyright Bar ── */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] py-6 sm:flex-row">
          <p className="text-xs text-[var(--muted)]">
            &copy; {CURRENT_YEAR} FinishWerk
          </p>
          <p className="text-xs text-[var(--muted)]">
            Digitale Systeme f&uuml;r mehr Umsatz, Sichtbarkeit und Kontrolle.
          </p>
        </div>
      </div>
    </footer>
  );
}
