import { dict, langs, type Lang } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET(_: Request, { params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const items = getPosts(lang)
    .map((p) => {
      const url = `${site.url}/${lang}/writing/${p.slug}/`;
      return `<item>
  <title>${esc(p.title)}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  <description>${esc(p.description)}</description>
</item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${site.name}</title>
  <link>${site.url}/${lang}/</link>
  <description>${esc(dict[lang].description)}</description>
  <language>${lang}</language>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
