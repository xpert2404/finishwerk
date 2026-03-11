import Image from "next/image";
import {getTranslations} from "next-intl/server";
import {legalNavigation} from "@/data/navigation";
import {CONTACT_FACTS, getSiteConfig} from "@/data/config";
import type {Locale} from "@/data/types";
import {Link} from "@/i18n/navigation";
import {Container} from "@/components/layout/Container";

interface FooterProps {
  locale: Locale;
}

export async function Footer({locale}: FooterProps) {
  const tNav = await getTranslations({locale, namespace: "nav"});
  const tFooter = await getTranslations({locale, namespace: "footer"});
  const tCommon = await getTranslations({locale, namespace: "common"});
  const tUi = await getTranslations({locale, namespace: "ui.labels"});
  const site = getSiteConfig();

  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50/80">
      <Container className="space-y-10 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-4">
            <Image src="/brand/logo-wordmark-transparent.png" alt="nützliche.IT" width={190} height={33} className="h-auto w-[178px] sm:w-[190px]" />
            <p className="max-w-md text-sm leading-relaxed text-slate-600">{tFooter("tagline")}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.anydeskUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex rounded-full border border-[var(--accent-current)] px-4 py-2 text-sm font-medium text-[var(--accent-current)] transition hover:bg-[var(--accent-current)] hover:text-white"
              >
                {tFooter("anydesk")}
              </a>
              <Link href="/faq" locale={locale} className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-[var(--ink-primary)] transition hover:bg-slate-100">
                {tNav("faq")}
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-[var(--ink-primary)]">{tCommon("contactNow")}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>{CONTACT_FACTS.addressLine}</li>
              <li>{CONTACT_FACTS.postalLine}</li>
              <li>
                <a href={`mailto:${CONTACT_FACTS.email}`} className="hover:text-[var(--accent-current)]">
                  {CONTACT_FACTS.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_FACTS.phone.replace(/[^\d+]/g, "")}`} className="hover:text-[var(--accent-current)]">
                  {CONTACT_FACTS.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-[var(--ink-primary)]">{tUi("legal")}</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} locale={locale} className="hover:text-[var(--accent-current)]">
                    {tNav(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} nützliche.IT</p>
        </div>
      </Container>
    </footer>
  );
}
