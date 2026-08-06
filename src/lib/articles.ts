import type { ComponentType } from "react";
import type { AuthorId } from "./authors";
import { AUTHORS } from "./authors";

export const BASE_URL = "https://inzterior.com";

export type ArticleMeta = {
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  author: AuthorId;
  excerpt: string;
  heroImage: {
    src: string;
    alt: string;
    credit: string;
    creditUrl: string;
  };
};

export type ArticleModule = {
  meta: ArticleMeta;
  default: ComponentType;
};

// Appended to as each article ships — see Tasks 6, 8-13.
export const ARTICLE_SLUGS: string[] = [
  "spot-deposit-disappear-contractor-malaysia",
  "interior-design-cost-johor-bahru-iskandar-puteri",
  "interior-design-contract-guide-malaysia",
  "condo-vs-landed-renovation-iskandar-puteri",
  "renovation-timeline-malaysia",
  "renovation-warranty-malaysia-guide",
  "interior-designer-vs-contractor-malaysia",
];

export async function getArticleModule(slug: string): Promise<ArticleModule> {
  // turbopackOptional: keeps the build green if src/content/articles ever
  // ends up empty or missing (e.g. a fresh checkout mid-migration, or all
  // slugs removed from ARTICLE_SLUGS) — Turbopack otherwise fails to
  // resolve this glob-based dynamic import when zero .mdx files match.
  // The import still throws MODULE_NOT_FOUND at runtime if ever called
  // with a slug that has no matching file.
  const mod = (await import(
    /* turbopackOptional: true */ `@/content/articles/${slug}.mdx`
  )) as ArticleModule;

  const { meta } = mod;
  if (!meta || typeof meta.title !== "string" || !meta.title) {
    throw new Error(`Article "${slug}": meta.title is missing or invalid`);
  }
  if (!(meta.author in AUTHORS)) {
    throw new Error(`Article "${slug}": meta.author "${meta.author}" is not a known author`);
  }
  if (Number.isNaN(new Date(meta.publishedAt).getTime())) {
    throw new Error(`Article "${slug}": meta.publishedAt "${meta.publishedAt}" is not a valid date`);
  }
  if (Number.isNaN(new Date(meta.updatedAt).getTime())) {
    throw new Error(`Article "${slug}": meta.updatedAt "${meta.updatedAt}" is not a valid date`);
  }

  return mod;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getAllArticles(): Promise<Array<{ slug: string; meta: ArticleMeta }>> {
  const articles = await Promise.all(
    ARTICLE_SLUGS.map(async (slug) => {
      const { meta } = await getArticleModule(slug);
      return { slug, meta };
    }),
  );

  return articles.sort(
    (a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime(),
  );
}
