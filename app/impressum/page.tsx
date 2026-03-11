import { SectionShell } from "@/components/layout/section-shell";
import { legalContent } from "@/content/legal";

export default function ImprintPage() {
  return (
    <SectionShell className="pt-36 pb-24">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
            Impressum
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Anbieterkennzeichnung
          </h1>
          <p className="max-w-2xl text-lg text-[var(--muted-strong)]">
            Diese Seite ist als saubere Vorlage angelegt. Vor einer
            Veröffentlichung müssen die verbindlichen Unternehmensdaten ergänzt
            und rechtlich geprüft werden.
          </p>
        </div>

        <div className="surface-panel legal-copy space-y-8 rounded-[2rem] p-8 sm:p-10">
          {legalContent.imprintSections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-white">
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
