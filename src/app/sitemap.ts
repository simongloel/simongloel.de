import type { MetadataRoute } from "next";
import { langs } from "@/lib/i18n";
import { getPosts, getTranslation } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "writing/", "cv/"].map((p) => ({
    url: `${site.url}/en/${p}`,
    alternates: { languages: { en: `${site.url}/en/${p}`, de: `${site.url}/de/${p}`, "x-default": `${site.url}/en/${p}` } },
  }));
  const dePages = pages.map((p) => ({ ...p, url: p.alternates.languages.de }));
  const posts = langs.flatMap((lang) =>
    getPosts(lang).map((p) => {
      const languages: Record<string, string> = { [lang]: `${site.url}/${lang}/writing/${p.slug}/` };
      for (const l of langs) {
        const t = l === lang ? undefined : getTranslation(p, l);
        if (t) languages[l] = `${site.url}/${l}/writing/${t.slug}/`;
      }
      return { url: languages[lang], lastModified: p.date, alternates: { languages } };
    }),
  );
  return [...pages, ...dePages, ...posts];
}
