import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { dict, type Lang } from "@/lib/i18n";
import { formatDate, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  return {
    title: dict[lang].writing,
    description: dict[lang].writingDescription,
    alternates: { canonical: `/${lang}/writing/`, languages: { en: "/en/writing/", de: "/de/writing/", "x-default": "/en/writing/" } },
    openGraph: { url: `/${lang}/writing/` },
  };
}

export default async function Writing({ params }: Props) {
  const lang = (await params).lang as Lang;
  return (
    <>
      <h1 className="pt-6 font-serif text-4xl text-ink">{dict[lang].writing}</h1>
      <div className="mt-8 space-y-3">
        {getPosts(lang).map((p) => (
          <BlogCard key={p.slug} href={`/${lang}/writing/${p.slug}/`} title={p.title} date={formatDate(p.date, lang)} description={p.description} />
        ))}
      </div>
    </>
  );
}
