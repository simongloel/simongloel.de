import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dict, langs, other, type Lang } from "@/lib/i18n";
import { formatDate, getPost, getPosts, getTranslation } from "@/lib/posts";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.flatMap((lang) => getPosts(lang).map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = (await params).lang as Lang;
  const post = getPost(lang, slug);
  if (!post) return {};
  const translation = getTranslation(post, other(lang));
  const languages: Record<string, string> = { [lang]: `/${lang}/writing/${post.slug}/` };
  if (translation) languages[translation.lang] = `/${translation.lang}/writing/${translation.slug}/`;
  languages["x-default"] = languages.en ?? languages[lang];
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/${lang}/writing/${post.slug}/`, languages },
    openGraph: {
      type: "article",
      url: `/${lang}/writing/${post.slug}/`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [site.url],
      images: [{ url: "/images/simon.jpg", width: 400, height: 400, alt: site.name }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const lang = (await params).lang as Lang;
  const post = getPost(lang, slug);
  if (!post) notFound();
  const t = dict[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    image: `${site.url}/images/simon.jpg`,
    mainEntityOfPage: `${site.url}/${lang}/writing/${post.slug}/`,
    author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
    url: `${site.url}/${lang}/writing/${post.slug}/`,
  };

  return (
    <article className="pt-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-sm text-muted">
        <time dateTime={post.date}>{formatDate(post.date, lang)}</time> · {post.minutes} {t.minRead}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">{post.title}</h1>
      <div
        className="prose prose-neutral mt-10 max-w-none prose-headings:font-semibold prose-h2:text-xl prose-a:underline-offset-2"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <p className="mt-16 text-sm text-muted">
        <Link href={`/${lang}/writing/`} className="hover:text-ink">{t.allWriting}</Link>
      </p>
    </article>
  );
}
