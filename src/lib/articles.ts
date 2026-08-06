import type { ComponentType } from "react";
import type { AuthorId } from "./authors";

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
];

export async function getArticleModule(slug: string): Promise<ArticleModule> {
  // turbopackOptional: the @/content/articles glob currently matches no
  // .mdx files (ARTICLE_SLUGS is empty), which would otherwise fail the
  // Turbopack build. This suppresses the build-time resolve error; the
  // import still throws at runtime if ever called with a missing slug.
  return (await import(
    /* turbopackOptional: true */ `@/content/articles/${slug}.mdx`
  )) as ArticleModule;
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
