import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { ProjectCard } from "@/components/project-card";
import { dict, type Lang } from "@/lib/i18n";
import { formatDate, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { contact } from "@/lib/contact";
import { Protected } from "@/components/protected";

const intro = {
  en: [
    "I'm a software engineer in Regensburg. At BMW Group I work as a technical lead on software for manufacturing.",
    "In my own time I build {blitz}, a hosting platform on servers in the EU. You give it a GitHub repository, a Docker image or a folder of HTML, and you get an HTTPS address back. This site runs on it.",
    "I write here about running software, mostly about what I learn while building blitz.cloud.",
  ],
  de: [
    "Ich bin Softwareentwickler in Regensburg. Bei der BMW Group arbeite ich als Technical Lead an Software für die Produktion.",
    "In meiner freien Zeit baue ich {blitz}, eine Hosting-Plattform mit Servern in der EU. Du gibst ihr ein GitHub-Repository, ein Docker-Image oder einen Ordner mit HTML und bekommst eine HTTPS-Adresse zurück. Diese Seite läuft auch darauf.",
    "Hier schreibe ich über den Betrieb von Software, meistens über das, was ich beim Bau von blitz.cloud lerne.",
  ],
};

const projects = {
  en: [
    "Hosting for apps, databases and websites on servers in the EU. Kubernetes on Hetzner, every app in its own gVisor sandbox.",
    "Guardrails for LLM output in Java and Quarkus. A reply that doesn't fit the schema goes back to the model until it does.",
    "Salary calculator for the IG Metall pay agreements. The payroll tax matches the official BMF test cases to the cent.",
  ],
  de: [
    "Hosting für Apps, Datenbanken und Websites auf Servern in der EU. Kubernetes bei Hetzner, jede App in ihrer eigenen gVisor-Sandbox.",
    "Leitplanken für LLM-Antworten in Java und Quarkus. Eine Antwort, die nicht zum Schema passt, geht zurück an das Modell, bis sie passt.",
    "Gehaltsrechner für die Tarife der IG Metall. Die Lohnsteuer stimmt auf den Cent mit den offiziellen Prüffällen des BMF überein.",
  ],
};

function withLink(text: string) {
  const [before, after] = text.split("{blitz}");
  if (after === undefined) return text;
  return (
    <>
      {before}
      <a href="https://blitz.cloud" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">blitz.cloud</a>
      {after}
    </>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const t = dict[lang];
  const posts = getPosts(lang).slice(0, 5);
  const [blitz, leash, metall] = projects[lang];
  const cards = [
    { title: "blitz.cloud", description: blitz, imgSrc: "/images/projects/blitz-cloud.png", link: "https://blitz.cloud", linkText: t.visit },
    { title: "leash", description: leash, imgSrc: "/images/projects/leash.png", link: "https://github.com/simongloel/leash", linkText: "GitHub" },
    { title: "metalltarif.com", description: metall, imgSrc: "/images/projects/metalltarif.png", link: "https://metalltarif.com", linkText: t.visit },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        alternateName: "Simon Gloel",
        url: site.url,
        image: `${site.url}/images/simon.jpg`,
        jobTitle: lang === "de" ? "Softwareentwickler" : "Software engineer",
        homeLocation: { "@type": "Place", name: "Regensburg, Germany" },
        sameAs: [site.github, site.linkedin],
        founder: { "@type": "Organization", name: "blitz.cloud", url: "https://blitz.cloud" },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: lang,
        publisher: { "@id": `${site.url}/#person` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="pt-6">
        <img src="/images/simon.jpg" alt="Simon Gloël" width={72} height={72} className="h-18 w-18 rounded-full" />
        <h1 className="mt-6 font-serif text-4xl text-ink">Simon Gloël</h1>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/90">
          {intro[lang].map((p) => (
            <p key={p}>{withLink(p)}</p>
          ))}
        </div>
        <div className="mt-6 flex gap-5 text-sm">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">LinkedIn</a>
          <Protected value={contact.email} mail label={t.email} className="text-muted hover:text-ink" />
          <Link href={`/${lang}/cv/`} className="text-muted hover:text-ink">CV</Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.writing}</h2>
        <div className="mt-4 space-y-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} href={`/${lang}/writing/${p.slug}/`} title={p.title} date={formatDate(p.date, lang)} description={p.description} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{t.projects}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {cards.map((p, i) => (
            <ProjectCard key={p.title} {...p} className={i === 0 ? "sm:col-span-2" : undefined} />
          ))}
        </div>
      </section>
    </>
  );
}
