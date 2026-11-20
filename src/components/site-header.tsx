import Link from "next/link";
import { dict, type Lang } from "@/lib/i18n";
import { LanguageSwitch } from "./language-switch";

type Props = { lang: Lang; pairs: Record<string, string> };

export function SiteHeader({ lang, pairs }: Props) {
  const t = dict[lang];
  return (
    <header className="flex items-center justify-between py-8">
      <Link href={`/${lang}/`} className="font-medium text-ink hover:text-accent">
        Simon Gloël
      </Link>
      <nav className="flex gap-6 text-sm text-muted">
        <Link href={`/${lang}/writing/`} className="hover:text-ink">
          {t.writing}
        </Link>
        <Link href={`/${lang}/cv/`} className="hover:text-ink">
          CV
        </Link>
        <LanguageSwitch lang={lang} label={t.switchTo} pairs={pairs} />
      </nav>
    </header>
  );
}
