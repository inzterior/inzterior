import type { ComponentType } from "react";
import type { AuthorId } from "./authors";
import { AUTHORS } from "./authors";

export const BASE_URL = "https://www.inzterior.com";

export type ArticleMeta = {
  title: string;
  /**
   * Title used for the <title> element and the search snippet, where the budget
   * is ~60 characters. `title` is the on-page H1 and is allowed to be longer and
   * more conversational; when seoTitle is absent the H1 is used and will truncate.
   */
  seoTitle?: string;
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
  "choose-interior-design-studio-johor-bahru-checklist",
  "interior-design-consultation-johor-bahru",
  "small-space-interior-design-johor-bahru-condos",
  "living-room-design-ideas-johor-bahru-terrace-link-houses",
  "3d-visualization-interior-design-what-it-shows-you",
  "johor-climate-renovation-humidity-heat-materials",
  "wet-kitchen-dry-kitchen-renovation-johor-bahru",
  "bathroom-renovation-johor-bahru-waterproofing-layout",
  "renovation-permit-johor-bahru",
  "new-condo-defect-inspection-before-renovating-johor-bahru",
  "rewiring-old-house-renovation-johor-bahru",
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

/**
 * Hand-picked related articles, three per piece. Deliberately NOT "most recent" —
 * the point is topical proximity, so that a reader who arrived on the permit
 * article from search is offered the two questions that actually follow it.
 * Every slug appears as a destination at least twice, so no article depends on
 * the /articles index alone for its internal links.
 */
export const RELATED_ARTICLES: Record<string, [string, string, string]> = {
  "spot-deposit-disappear-contractor-malaysia": [
    "interior-design-contract-guide-malaysia",
    "choose-interior-design-studio-johor-bahru-checklist",
    "renovation-warranty-malaysia-guide",
  ],
  "interior-design-cost-johor-bahru-iskandar-puteri": [
    "interior-design-contract-guide-malaysia",
    "interior-designer-vs-contractor-malaysia",
    "renovation-timeline-malaysia",
  ],
  "interior-design-contract-guide-malaysia": [
    "renovation-warranty-malaysia-guide",
    "spot-deposit-disappear-contractor-malaysia",
    "interior-design-cost-johor-bahru-iskandar-puteri",
  ],
  "condo-vs-landed-renovation-iskandar-puteri": [
    "new-condo-defect-inspection-before-renovating-johor-bahru",
    "small-space-interior-design-johor-bahru-condos",
    "renovation-permit-johor-bahru",
  ],
  "renovation-timeline-malaysia": [
    "renovation-permit-johor-bahru",
    "interior-design-consultation-johor-bahru",
    "interior-design-cost-johor-bahru-iskandar-puteri",
  ],
  "renovation-warranty-malaysia-guide": [
    "interior-design-contract-guide-malaysia",
    "spot-deposit-disappear-contractor-malaysia",
    "bathroom-renovation-johor-bahru-waterproofing-layout",
  ],
  "interior-designer-vs-contractor-malaysia": [
    "choose-interior-design-studio-johor-bahru-checklist",
    "interior-design-cost-johor-bahru-iskandar-puteri",
    "interior-design-contract-guide-malaysia",
  ],
  "choose-interior-design-studio-johor-bahru-checklist": [
    "spot-deposit-disappear-contractor-malaysia",
    "interior-designer-vs-contractor-malaysia",
    "interior-design-contract-guide-malaysia",
  ],
  "interior-design-consultation-johor-bahru": [
    "3d-visualization-interior-design-what-it-shows-you",
    "renovation-timeline-malaysia",
    "interior-design-cost-johor-bahru-iskandar-puteri",
  ],
  "small-space-interior-design-johor-bahru-condos": [
    "condo-vs-landed-renovation-iskandar-puteri",
    "living-room-design-ideas-johor-bahru-terrace-link-houses",
    "new-condo-defect-inspection-before-renovating-johor-bahru",
  ],
  "living-room-design-ideas-johor-bahru-terrace-link-houses": [
    "small-space-interior-design-johor-bahru-condos",
    "johor-climate-renovation-humidity-heat-materials",
    "condo-vs-landed-renovation-iskandar-puteri",
  ],
  "3d-visualization-interior-design-what-it-shows-you": [
    "interior-design-consultation-johor-bahru",
    "renovation-timeline-malaysia",
    "interior-design-contract-guide-malaysia",
  ],
  "johor-climate-renovation-humidity-heat-materials": [
    "bathroom-renovation-johor-bahru-waterproofing-layout",
    "wet-kitchen-dry-kitchen-renovation-johor-bahru",
    "rewiring-old-house-renovation-johor-bahru",
  ],
  "wet-kitchen-dry-kitchen-renovation-johor-bahru": [
    "johor-climate-renovation-humidity-heat-materials",
    "bathroom-renovation-johor-bahru-waterproofing-layout",
    "interior-design-cost-johor-bahru-iskandar-puteri",
  ],
  "bathroom-renovation-johor-bahru-waterproofing-layout": [
    "johor-climate-renovation-humidity-heat-materials",
    "renovation-warranty-malaysia-guide",
    "wet-kitchen-dry-kitchen-renovation-johor-bahru",
  ],
  "renovation-permit-johor-bahru": [
    "condo-vs-landed-renovation-iskandar-puteri",
    "renovation-timeline-malaysia",
    "rewiring-old-house-renovation-johor-bahru",
  ],
  "new-condo-defect-inspection-before-renovating-johor-bahru": [
    "renovation-warranty-malaysia-guide",
    "condo-vs-landed-renovation-iskandar-puteri",
    "renovation-permit-johor-bahru",
  ],
  "rewiring-old-house-renovation-johor-bahru": [
    "renovation-permit-johor-bahru",
    "johor-climate-renovation-humidity-heat-materials",
    "renovation-timeline-malaysia",
  ],
};

export async function getRelatedArticles(
  slug: string,
): Promise<Array<{ slug: string; meta: ArticleMeta }>> {
  const related = RELATED_ARTICLES[slug];
  if (!related) return [];

  return Promise.all(
    related
      .filter((s) => ARTICLE_SLUGS.includes(s))
      .map(async (s) => ({ slug: s, meta: (await getArticleModule(s)).meta })),
  );
}
