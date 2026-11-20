import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import type { Lang } from "./i18n";

const root = path.join(process.cwd(), "content/writing");

const marked = new Marked({
  renderer: {
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      return external
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
        : `<a href="${href}">${text}</a>`;
    },
  },
});

export type Post = {
  lang: Lang;
  key: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  order: number;
  html: string;
  minutes: number;
};

function read(lang: Lang, file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(root, lang, file), "utf8"));
  const slug = file.replace(/\.md$/, "");
  return {
    lang,
    key: data.key ?? slug,
    slug,
    title: data.title,
    description: data.description,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    order: Number(data.order ?? 99),
    html: marked.parse(content, { async: false }),
    minutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
  };
}

export function getPosts(lang: Lang): Post[] {
  return fs
    .readdirSync(path.join(root, lang))
    .filter((f) => f.endsWith(".md"))
    .map((f) => read(lang, f))
    .sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order || a.slug.localeCompare(b.slug));
}

export function getPost(lang: Lang, slug: string): Post | undefined {
  return getPosts(lang).find((p) => p.slug === slug);
}

export function getTranslation(post: Post, lang: Lang): Post | undefined {
  return getPosts(lang).find((p) => p.key === post.key);
}

export function formatDate(date: string, lang: Lang) {
  return new Date(date).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
