import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="pb-8">
      <SectionShell className="pt-10" innerClassName="max-w-7xl">
        <div className="surface-panel noise rounded-[2rem] px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div className="space-y-4">
              <div className="relative h-16 w-44">
                <Image
                  src="/brand/finishwerk-wordmark.png"
                  alt="FinishWerk"
                  fill
                  className="object-contain object-left"
                  sizes="176px"
                />
              </div>
              <p className="max-w-md text-sm leading-7 text-[var(--muted-strong)]">
                Digitale Systeme für mehr Umsatz, Sichtbarkeit und Kontrolle.
                FinishWerk verbindet technische Umsetzung mit klarer
                Geschäftswirkung.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Navigation
              </p>
              <div className="flex flex-col gap-3">
                {siteConfig.navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[var(--muted-strong)] hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Recht & Kontakt
              </p>
              <div className="flex flex-col gap-3 text-sm text-[var(--muted-strong)]">
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
                <Link href={siteConfig.legal.privacyHref} className="hover:text-white">
                  Datenschutz
                </Link>
                <Link href={siteConfig.legal.imprintHref} className="hover:text-white">
                  Impressum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </footer>
  );
}
