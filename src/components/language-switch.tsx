"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { other, type Lang } from "@/lib/i18n";

type Props = {
  lang: Lang;
  label: string;
  pairs: Record<string, string>;
};

export function LanguageSwitch({ lang, label, pairs }: Props) {
  const pathname = usePathname() ?? `/${lang}/`;
  const target = other(lang);
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const href = pairs[path] ?? path.replace(new RegExp(`^/${lang}/`), `/${target}/`);

  return (
    <Link
      href={href}
      hrefLang={target}
      onClick={() => {
        document.cookie = `lang=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className="hover:text-ink"
    >
      {label}
    </Link>
  );
}
