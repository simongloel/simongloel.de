import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

type Entry = { title: string; place: string; when?: string; text?: string };

const cv = {
  en: {
    description: "Experience, projects and qualifications of Simon Gloël, software engineer in Regensburg.",
    intro: "Regensburg, Germany. More on",
    headings: { experience: "Experience", projects: "Projects", qualifications: "Qualifications", skills: "Skills", volunteering: "Volunteering" },
    experience: [
      {
        title: "Software Engineer, Technical Lead",
        place: "BMW Group, Regensburg",
        when: "since Jan 2024",
        text: "Technical lead for software in manufacturing, built in Java and TypeScript and run on Kubernetes in Azure.",
      },
      {
        title: "Apprentice, IT Specialist for Application Development",
        place: "BMW Group, Regensburg",
        when: "Sep 2021 - Jan 2024",
        text: "Dual apprenticeship, shortened to two and a half years. Built internal web applications for production and business teams.",
      },
    ],
    projects: [
      {
        title: "blitz.cloud",
        place: "Founder, BlitzWorks UG",
        when: "since Jun 2025",
        text: "Hosting platform for apps, databases and websites on Kubernetes at Hetzner, every app in its own gVisor sandbox. Includes an MCP server for AI assistants and a build pipeline that writes missing Dockerfiles. About 3,500 users.",
      },
    ],
    qualifications: [
      { title: "B.Sc. Information Systems", place: "OTH Regensburg", when: "expected 2030" },
      { title: "Certified IT Business Manager (IHK)", place: "IHK Passau. Meisterpreis of the Bavarian State Government for the top 20 % of graduates.", when: "Jun 2026" },
      { title: "Certified Vocational Trainer (AEVO)", place: "IHK Passau", when: "Jun 2026" },
      { title: "IT Specialist, Application Development", place: "IHK Regensburg", when: "Jan 2024" },
    ],
    skills: [
      ["Languages and frameworks", "Java, Go, TypeScript, Python, SQL, Quarkus, Spring Boot, Hibernate, Angular"],
      ["Data and messaging", "Apache Kafka, MQTT, PostgreSQL, event-driven architecture, REST APIs"],
      ["Cloud and operations", "Azure, Kubernetes, Helm, Terraform, Argo CD, GitHub Actions, Prometheus, OpenTelemetry"],
      ["AI tooling", "MCP servers, LLM agents"],
      ["Spoken", "German (native), English (fluent)"],
    ],
    volunteering: ["Volunteer examiner for the IT professions, IHK Regensburg", "Editor and reviewer on Wikipedia"],
  },
  de: {
    description: "Berufserfahrung, Projekte und Abschlüsse von Simon Gloël, Softwareentwickler in Regensburg.",
    intro: "Regensburg. Mehr auf",
    headings: { experience: "Berufserfahrung", projects: "Projekte", qualifications: "Abschlüsse", skills: "Kenntnisse", volunteering: "Ehrenamt" },
    experience: [
      {
        title: "Software Engineer, Technical Lead",
        place: "BMW Group, Regensburg",
        when: "seit Jan. 2024",
        text: "Technische Leitung für Software in der Produktion. Gebaut mit Java und TypeScript, betrieben auf Kubernetes in Azure.",
      },
      {
        title: "Ausbildung zum Fachinformatiker für Anwendungsentwicklung",
        place: "BMW Group, Regensburg",
        when: "Sep. 2021 - Jan. 2024",
        text: "Duale Ausbildung, auf zweieinhalb Jahre verkürzt. Dabei interne Webanwendungen für die Produktion und die Fachbereiche gebaut.",
      },
    ],
    projects: [
      {
        title: "blitz.cloud",
        place: "Gründer, BlitzWorks UG",
        when: "seit Juni 2025",
        text: "Hosting-Plattform für Apps, Datenbanken und Websites auf Kubernetes bei Hetzner, jede App in ihrer eigenen gVisor-Sandbox. Mit eigenem MCP-Server für KI-Assistenten und einer Build-Pipeline, die fehlende Dockerfiles selbst schreibt. Rund 3.500 Nutzer.",
      },
    ],
    qualifications: [
      { title: "B.Sc. Wirtschaftsinformatik", place: "OTH Regensburg", when: "voraussichtlich 2030" },
      { title: "Certified IT Business Manager (IHK)", place: "IHK Passau. Meisterpreis der Bayerischen Staatsregierung für die besten 20 % der Absolventen.", when: "Juni 2026" },
      { title: "Ausbildereignung (AEVO)", place: "IHK Passau", when: "Juni 2026" },
      { title: "Fachinformatiker für Anwendungsentwicklung", place: "IHK Regensburg", when: "Jan. 2024" },
    ],
    skills: [
      ["Sprachen und Frameworks", "Java, Go, TypeScript, Python, SQL, Quarkus, Spring Boot, Hibernate, Angular"],
      ["Daten und Messaging", "Apache Kafka, MQTT, PostgreSQL, ereignisgesteuerte Architektur, REST-APIs"],
      ["Cloud und Betrieb", "Azure, Kubernetes, Helm, Terraform, Argo CD, GitHub Actions, Prometheus, OpenTelemetry"],
      ["KI-Werkzeuge", "MCP-Server, LLM-Agenten"],
      ["Sprachen", "Deutsch (Muttersprache), Englisch (fließend)"],
    ],
    volunteering: ["Ehrenamtlicher Prüfer für die IT-Berufe, IHK Regensburg", "Autor und Sichter bei Wikipedia"],
  },
} satisfies Record<Lang, unknown>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return {
    title: "CV",
    description: cv[lang].description,
    alternates: { canonical: `/${lang}/cv/`, languages: { en: "/en/cv/", de: "/de/cv/", "x-default": "/en/cv/" } },
    openGraph: { url: `/${lang}/cv/` },
  };
}

function Section({ title, entries }: { title: string; entries: Entry[] }) {
  return (
    <section className="mt-14">
      <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{title}</h2>
      <div className="mt-6 space-y-8">
        {entries.map((e) => (
          <div key={e.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-medium text-ink">{e.title}</h3>
              {e.when && <span className="text-sm text-muted tabular-nums">{e.when}</span>}
            </div>
            <p className="text-sm text-muted">{e.place}</p>
            {e.text && <p className="mt-2 text-ink/90">{e.text}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function Cv({ params }: Props) {
  const lang = (await params).lang as Lang;
  const c = cv[lang];
  return (
    <>
      <h1 className="pt-6 font-serif text-4xl text-ink">CV</h1>
      <p className="mt-4 text-muted">
        {c.intro}{" "}
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          LinkedIn
        </a>
        .
      </p>
      <Section title={c.headings.experience} entries={c.experience} />
      <Section title={c.headings.projects} entries={c.projects} />
      <Section title={c.headings.qualifications} entries={c.qualifications} />
      <section className="mt-14">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{c.headings.skills}</h2>
        <dl className="mt-6 space-y-4">
          {c.skills.map(([k, v]) => (
            <div key={k} className="grid gap-1 sm:grid-cols-[13rem_1fr]">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="text-ink/90">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="mt-14">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{c.headings.volunteering}</h2>
        <ul className="mt-6 space-y-2 text-ink/90">
          {c.volunteering.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
