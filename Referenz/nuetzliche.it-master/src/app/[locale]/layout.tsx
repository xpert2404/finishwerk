import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {BookingProvider} from "@/components/booking/BookingProvider";
import {Footer} from "@/components/layout/Footer";
import {Header} from "@/components/layout/Header";
import {getSiteConfig} from "@/data/config";
import {routing} from "@/i18n/routing";
import type {Locale} from "@/data/types";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tA11y = await getTranslations({locale, namespace: "ui.accessibility"});
  const tBooking = await getTranslations({locale, namespace: "booking"});
  const site = getSiteConfig();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <BookingProvider
        booking={site.booking}
        labels={{
          title: tBooking("title"),
          description: tBooking("description"),
          consentTitle: tBooking("consentTitle"),
          consentDescription: tBooking("consentDescription"),
          consentAction: tBooking("consentAction"),
          externalAction: tBooking("externalAction"),
          missingConfig: tBooking("missingConfig"),
          preConsentTitle: tBooking("preConsentTitle"),
          preConsentDescription: tBooking("preConsentDescription"),
          preConsentAction: tBooking("preConsentAction"),
          preConsentSecondaryAction: tBooking("preConsentSecondaryAction")
        }}
      >
        <div data-theme={site.defaultTheme} className="min-h-screen bg-white text-[var(--ink-primary)]">
          <a
            href="#main-content"
            className="sr-only z-50 rounded-md bg-[var(--accent-current)] px-3 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
          >
            {tA11y("skipToContent")}
          </a>
          <Header />
          <main id="main-content" className="min-h-[70vh]">
            {children}
          </main>
          <Footer locale={locale as Locale} />
        </div>
      </BookingProvider>
    </NextIntlClientProvider>
  );
}

