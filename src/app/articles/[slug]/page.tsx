import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ARTICLE_SLUGS,
  BASE_URL,
  formatDate,
  getArticleModule,
  getRelatedArticles,
} from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";
import { getLocale, getDictionary } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!ARTICLE_SLUGS.includes(slug)) return {};
  const { meta } = await getArticleModule(slug);

  return {
    // absolute: the root layout's "%s — Inzterior" template adds 12 characters,
    // which pushed every article title past the ~60-character SERP budget.
    title: { absolute: meta.seoTitle ?? meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `${BASE_URL}/articles/${slug}` },
    openGraph: {
      title: meta.seoTitle ?? meta.title,
      description: meta.description,
      url: `${BASE_URL}/articles/${slug}`,
      type: "article",
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
      images: [{ url: `${BASE_URL}${meta.heroImage.src}` }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!ARTICLE_SLUGS.includes(slug)) notFound();

  const { meta, default: Content } = await getArticleModule(slug);
  const author = AUTHORS[meta.author];
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const t = dict.articles;
  const related = await getRelatedArticles(slug);

  const articleUrl = `${BASE_URL}/articles/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    // Google truncates headline past 110 characters; every article title is inside that.
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    inLanguage: "en-MY",
    author: { "@type": "Person", name: author.name, url: `${BASE_URL}${author.href}` },
    publisher: {
      "@type": "Organization",
      name: "Istory Design Studio (Inzterior)",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.png`,
      },
    },
    image: `${BASE_URL}${meta.heroImage.src}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    isPartOf: { "@id": `${BASE_URL}/#organization` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${BASE_URL}/articles` },
      { "@type": "ListItem", position: 3, name: meta.title, item: articleUrl },
    ],
  };

  return (
    <article>
      {/* JSON-LD is our own generated data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="border-b border-[var(--line)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">
            {t.eyebrow}
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--ink-soft)]">
            <Link href={author.href} className="font-medium text-[var(--ink)] hover:underline">
              {author.name}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{author.role}</span>
          </div>
          <div className="mt-1 text-xs text-[var(--ink-soft)]">
            {t.published} <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
            {meta.updatedAt !== meta.publishedAt && (
              <>
                {" · "}
                {t.updated}{" "}
                <time dateTime={meta.updatedAt}>{formatDate(meta.updatedAt)}</time>
              </>
            )}
          </div>
          {locale !== "en" && (
            <p className="mt-4 border border-[var(--line)] bg-[var(--bg-panel)] px-4 py-3 text-sm text-[var(--ink-soft)]">
              {t.englishOnlyNotice}
            </p>
          )}
        </div>
      </section>

      <div className="relative aspect-16/9 w-full bg-[var(--bg-panel)]">
        <Image
          src={meta.heroImage.src}
          alt={meta.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <p className="mx-auto max-w-3xl px-6 pt-2 text-right text-xs text-[var(--ink-soft)]">
        {t.photoBy}{" "}
        <a
          href={meta.heroImage.creditUrl}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {meta.heroImage.credit}
        </a>{" "}
        {t.onPexels}
      </p>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <Content />
      </div>

      {related.length > 0 && (
        <section className="border-t border-[var(--line)] py-14">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-lg font-semibold">{t.relatedHeading}</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {related.map((item) => (
                <li key={item.slug} className="border-b border-[var(--line)] pb-4 last:border-b-0">
                  <Link
                    href={`/articles/${item.slug}`}
                    className="font-medium text-[var(--ink)] hover:text-[var(--accent)] hover:underline"
                  >
                    {item.meta.title}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">{item.meta.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-[var(--line)] py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t.ctaHeading}</h2>
          <Link href="/contact" className="btn btn-primary mt-6">
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </article>
  );
}
