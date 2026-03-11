type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export const legalContent: {
  privacySections: LegalSection[];
  imprintSections: LegalSection[];
} = {
  privacySections: [
    {
      title: "Verantwortliche Stelle",
      paragraphs: [
        "Diese Seite ist als datenschutzfreundliche Vorlage vorbereitet. Vor Veröffentlichung sind hier Name, Anschrift, vertretungsberechtigte Person, Kontaktadresse und weitere Pflichtangaben des Unternehmens vollständig einzutragen.",
      ],
    },
    {
      title: "Zwecke der Verarbeitung",
      paragraphs: [
        "Auf dieser Website werden personenbezogene Daten nur verarbeitet, soweit dies für die Bereitstellung der Website, für Kontaktanfragen oder nach ausdrücklicher Einwilligung für externe Dienste erforderlich ist.",
      ],
      items: [
        "Bereitstellung und technische Absicherung der Website",
        "Bearbeitung von Kontaktanfragen",
        "Terminbuchung nach ausdrücklicher Einwilligung in einen externen Dienst",
        "Dokumentation erteilter Einwilligungen im Browser des Nutzers",
      ],
    },
    {
      title: "Externer Dienst für Terminbuchung",
      paragraphs: [
        "Für die Buchung eines Erstgesprächs kann ein externer Dienst eingebunden werden. Dieser wird auf dieser Website bewusst nicht automatisch geladen.",
        "Erst nach einer aktiven Zustimmung wird die Einbettung von Calendly geladen. Vorher erfolgen keine Iframe-, Script- oder Preconnect-Anfragen an den Anbieter.",
      ],
    },
    {
      title: "Speicherdauer und Betroffenenrechte",
      paragraphs: [
        "Speicherdauer, Rechtsgrundlagen und Empfänger sind vor dem Livegang anhand des tatsächlichen Setups zu ergänzen. Ebenso sind Informationen zu Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch vollständig anzugeben.",
      ],
    },
  ],
  imprintSections: [
    {
      title: "Angaben gemäß § 5 TMG",
      paragraphs: [
        "Hier werden vor Veröffentlichung die vollständigen Unternehmensangaben, ladungsfähige Anschrift und vertretungsberechtigte Person ergänzt.",
      ],
      items: [
        "Unternehmensname",
        "Rechtsform",
        "Anschrift",
        "Kontaktmöglichkeiten",
      ],
    },
    {
      title: "Register- und Steuerangaben",
      paragraphs: [
        "Falls vorhanden, sind Handelsregister, Registernummer, Umsatzsteuer-ID oder weitere berufsrechtlich notwendige Angaben zu ergänzen.",
      ],
    },
    {
      title: "Verantwortlich für den Inhalt",
      paragraphs: [
        "Die verantwortliche natürliche Person oder vertretungsberechtigte Stelle ist hier vor dem Livegang verbindlich anzugeben.",
      ],
    },
    {
      title: "Hinweis",
      paragraphs: [
        "Diese Vorlage ist bewusst keine rechtliche Fiktion. Sie schafft die strukturelle Basis für die Pflichtseiten, ersetzt aber keine rechtliche Prüfung und keine vollständigen Unternehmensangaben.",
      ],
    },
  ],
};
