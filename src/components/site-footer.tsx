import Link from "next/link";
import { dict, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <footer className="mt-24 flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-8 text-sm text-muted">
      <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
      <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
      <a href={`/${lang}/rss.xml`} className="hover:text-ink">RSS</a>
      <span className="flex-1" />
      <Link href={`/${lang}/impressum/`} className="hover:text-ink">{t.imprint}</Link>
      <Link href={`/${lang}/datenschutz/`} className="hover:text-ink">{t.privacy}</Link>
    </footer>
  );
}
