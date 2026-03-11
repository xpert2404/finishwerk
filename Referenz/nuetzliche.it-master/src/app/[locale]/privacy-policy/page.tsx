import {Card, CardContent} from "@/components/ui/card";
import {Container} from "@/components/layout/Container";
import {PageIntro} from "@/components/sections/PageIntro";
import {CONTACT_FACTS} from "@/data/config";
import type {Locale} from "@/data/types";
import {buildMetadata} from "@/lib/metadata";
import {getTranslations} from "next-intl/server";

interface PrivacyPolicyPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: PrivacyPolicyPageProps) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "metadata.privacy"});
  return buildMetadata({locale, route: "privacy-policy", title: t("title"), description: t("description")});
}

export default async function PrivacyPolicyPage({params}: PrivacyPolicyPageProps) {
  const {locale} = await params;
  const isDe = locale === "de";

  return (
    <>
      <PageIntro
        kicker={isDe ? "Datenschutz" : "Privacy"}
        title={isDe ? "Informationen zur Datenverarbeitung" : "Information on data processing"}
        description={
          isDe
            ? "Diese Datenschutzhinweise beschreiben die technische Verarbeitung personenbezogener Daten auf dieser Website."
            : "This notice outlines the technical processing of personal data on this website."
        }
      />

      <section className="py-16 sm:py-20">
        <Container className="space-y-4">
          <Card className="surface-card border-slate-200">
            <CardContent className="space-y-6 p-6 text-sm leading-relaxed text-slate-700 sm:p-7">
              <div>
                <h2 className="text-base font-semibold text-[var(--ink-primary)]">{isDe ? "Verantwortliche Stelle" : "Controller"}</h2>
                <p>nützliche.IT</p>
                <p>{CONTACT_FACTS.addressLine}</p>
                <p>{CONTACT_FACTS.postalLine}</p>
                <p>
                  E-Mail: <a href={`mailto:${CONTACT_FACTS.email}`}>{CONTACT_FACTS.email}</a>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{isDe ? "Server-Logdaten" : "Server log data"}</h3>
                <p>
                  {isDe
                    ? "Beim Aufruf der Website werden technisch notwendige Verbindungsdaten verarbeitet (z. B. IP-Adresse, Zeitpunkt, URL, User-Agent), um Stabilität, Sicherheit und Fehleranalyse zu gewährleisten."
                    : "When visiting this website, technically required connection data is processed (e.g. IP address, timestamp, URL, user agent) to ensure stability, security and troubleshooting."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{isDe ? "Kontaktaufnahme" : "Contact requests"}</h3>
                <p>
                  {isDe
                    ? "Wenn Sie uns per Formular, E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben ausschließlich zur Bearbeitung der Anfrage und zur projektbezogenen Kommunikation."
                    : "If you contact us via form, email or phone, we process your details solely to handle your request and project-related communication."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{isDe ? "Drittanbieter-Embeds (Google Maps, Cal.eu)" : "Third-party embeds (Google Maps, Cal.eu)"}</h3>
                <p>
                  {isDe
                    ? "Karten- und Termin-Embeds werden erst nach aktiver Einwilligung geladen. Beim Laden wird eine Verbindung zu den jeweiligen Drittanbietern aufgebaut; dabei können personenbezogene Daten (z. B. IP-Adresse, Browserdaten) übertragen werden."
                    : "Map and scheduling embeds are loaded only after explicit user consent. Loading an embed establishes a connection to the provider and may transfer personal data (e.g. IP address, browser metadata)."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{isDe ? "Speicherung und Löschung" : "Storage and deletion"}</h3>
                <p>
                  {isDe
                    ? "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen."
                    : "We retain personal data only as long as necessary for the respective purpose or as required by statutory retention obligations."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{isDe ? "Ihre Rechte" : "Your rights"}</h3>
                <p>
                  {isDe
                    ? "Sie haben im gesetzlichen Rahmen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch sowie Datenübertragbarkeit."
                    : "Within the statutory framework you have rights to access, rectification, deletion, restriction of processing, objection and data portability."}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">{isDe ? "Aufsichtsbehörde" : "Supervisory authority"}</h3>
                <p>
                  {isDe
                    ? "Zuständige Aufsichtsbehörde: Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg (final vor Veröffentlichung prüfen)."
                    : "Competent supervisory authority: State Commissioner for Data Protection and Freedom of Information Baden-Württemberg (verify before publication)."}
                </p>
              </div>

              <p className="text-xs text-slate-500">
                {isDe
                  ? "Diese Datenschutzhinweise sind als technische Projektgrundlage formuliert und ersetzen keine Rechtsberatung."
                  : "This privacy notice is prepared as a technical project baseline and does not replace legal advice."}
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}

