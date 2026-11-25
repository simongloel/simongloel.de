import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Role = { title: string; period: string };
type Station = { org: string; logo: string; href: string; roles: Role[]; dark?: boolean };

const stations: Record<Lang, Station[]> = {
  en: [
    { org: "blitz.cloud", logo: "/images/logos/blitz-cloud.svg", href: "https://blitz.cloud", roles: [{ title: "Founder", period: "since 2025" }] },
    {
      org: "BMW Group",
      logo: "/images/logos/bmw.svg",
      href: "https://www.bmwgroup.com",
      roles: [
        { title: "Software Engineer, Technical Lead", period: "since 2024" },
        { title: "Apprentice, application development", period: "2021 - 2024" },
      ],
    },
    { org: "OTH Regensburg", logo: "/images/logos/oth.svg", dark: true, href: "https://www.oth-regensburg.de", roles: [{ title: "B.Sc. Information Systems", period: "expected 2030" }] },
  ],
  de: [
    { org: "blitz.cloud", logo: "/images/logos/blitz-cloud.svg", href: "https://blitz.cloud", roles: [{ title: "Gründer", period: "seit 2025" }] },
    {
      org: "BMW Group",
      logo: "/images/logos/bmw.svg",
      href: "https://www.bmwgroup.com",
      roles: [
        { title: "Software Engineer, Technical Lead", period: "seit 2024" },
        { title: "Ausbildung zum Fachinformatiker", period: "2021 - 2024" },
      ],
    },
    { org: "OTH Regensburg", logo: "/images/logos/oth.svg", dark: true, href: "https://www.oth-regensburg.de", roles: [{ title: "B.Sc. Wirtschaftsinformatik", period: "voraussichtlich 2030" }] },
  ],
};

export function MiniCv({ lang, title, more }: { lang: Lang; title: string; more: string }) {
  return (
    <section className="mt-20">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{title}</h2>
        <Link href={`/${lang}/cv/`} className="group inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
          {more}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <ol className="relative mt-6">
        <div className="absolute inset-y-5 left-5 border-l border-line" />
        {stations[lang].map((s) => (
          <li key={s.org} className="relative pb-8 pl-14 last:pb-0">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-line transition-transform hover:scale-105 ${s.dark ? "bg-black" : "bg-white p-1.5"}`}
            >
              <img src={s.logo} alt={s.org} width={28} height={28} className="h-full w-full object-contain" />
            </a>
            <p className="pt-2 font-medium text-ink">{s.org}</p>
            <ul className="mt-1 space-y-1">
              {s.roles.map((r) => (
                <li key={r.title} className="flex flex-wrap justify-between gap-x-4 text-sm">
                  <span className="text-ink/80">{r.title}</span>
                  <span className="text-muted tabular-nums">{r.period}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
