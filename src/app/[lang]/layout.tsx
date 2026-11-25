import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { dict, isLang, langs, other, type Lang } from "@/lib/i18n";
import { getPosts, getTranslation } from "@/lib/posts";
import { site } from "@/lib/site";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["normal", "italic"] });

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} · ${dict[lang].role}`, template: `%s · ${site.name}` },
    description: dict[lang].description,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: `/${lang}/`,
      languages: { en: "/en/", de: "/de/", "x-default": "/en/" },
      types: { "application/rss+xml": `/${lang}/rss.xml` },
    },
    openGraph: {
      type: "profile",
      url: `/${lang}/`,
      siteName: site.name,
      locale: lang === "de" ? "de_DE" : "en_GB",
      alternateLocale: lang === "de" ? "en_GB" : "de_DE",
      images: [{ url: "/images/simon.jpg", width: 400, height: 400, alt: site.name }],
    },
    twitter: { card: "summary" },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

function articlePairs(lang: Lang) {
  const target = other(lang);
  const pairs: Record<string, string> = {};
  for (const post of getPosts(lang)) {
    const t = getTranslation(post, target);
    pairs[`/${lang}/writing/${post.slug}/`] = t ? `/${target}/writing/${t.slug}/` : `/${target}/writing/`;
  }
  return pairs;
}

export default async function RootLayout({ children, params }: Props) {
  const lang = (await params).lang as Lang;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans">
        <div className="mx-auto max-w-2xl px-5">
          <SiteHeader lang={lang} pairs={articlePairs(lang)} />
          <main>{children}</main>
          <SiteFooter lang={lang} />
        </div>
      </body>
    </html>
  );
}
