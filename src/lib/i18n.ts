export const langs = ["en", "de"] as const;
export type Lang = (typeof langs)[number];

export function isLang(value: string): value is Lang {
  return (langs as readonly string[]).includes(value);
}

export const dict = {
  en: {
    description:
      "Software engineer in Regensburg. Technical lead at BMW Group and founder of blitz.cloud, a hosting platform in the EU.",
    role: "Software engineer in Regensburg",
    writing: "Writing",
    writingDescription: "Notes on running software and guides for blitz.cloud.",
    allWriting: "All writing",
    projects: "Projects",
    minRead: "min read",
    email: "Email",
    visit: "Visit",
    notFound: "Not found",
    notFoundText: "This page doesn't exist.",
    backHome: "Back to the start",
    imprint: "Imprint",
    privacy: "Privacy",
    switchTo: "Deutsch",
  },
  de: {
    description:
      "Softwareentwickler in Regensburg. Technical Lead bei der BMW Group und Gründer von blitz.cloud, einer Hosting-Plattform in der EU.",
    role: "Softwareentwickler in Regensburg",
    writing: "Artikel",
    writingDescription: "Notizen zum Betrieb von Software und Anleitungen für blitz.cloud.",
    allWriting: "Alle Artikel",
    projects: "Projekte",
    minRead: "Min. Lesezeit",
    email: "E-Mail",
    visit: "Ansehen",
    notFound: "Nicht gefunden",
    notFoundText: "Diese Seite gibt es nicht.",
    backHome: "Zur Startseite",
    imprint: "Impressum",
    privacy: "Datenschutz",
    switchTo: "English",
  },
} satisfies Record<Lang, Record<string, string>>;

export function other(lang: Lang): Lang {
  return lang === "en" ? "de" : "en";
}
