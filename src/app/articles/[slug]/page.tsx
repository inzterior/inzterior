import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ARTICLE_SLUGS, BASE_URL, formatDate, getArticleModule } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";

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
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `${BASE_URL}/articles/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    author: { "@type": "Person", name: author.name, url: `${BASE_URL}${author.href}` },
    publisher: {
      "@type": "Organization",
      name: "Istory Design Studio (Inzterior)",
      url: BASE_URL,
    },
    image: `${BASE_URL}${meta.heroImage.src}`,
    mainEntityOfPage: `${BASE_URL}/articles/${slug}`,
  };

  return (
    <article>
      {/* JSON-LD is our own generated data, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-[var(--line)] py-16">
        <div className="mx-auto max-w-3xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">Articles</span>
          <h1 className="text-3xl font-semibold sm:text-4xl">{meta.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--ink-soft)]">
            <Link href={author.href} className="font-medium text-[var(--ink)] hover:underline">
              {author.name}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{author.role}</span>
          </div>
          <div className="mt-1 text-xs text-[var(--ink-soft)]">
            Published <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
            {meta.updatedAt !== meta.publishedAt && (
              <>
                {" · Updated "}
                <time dateTime={meta.updatedAt}>{formatDate(meta.updatedAt)}</time>
              </>
            )}
          </div>
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
        Photo by{" "}
        <a
          href={meta.heroImage.creditUrl}
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {meta.heroImage.credit}
        </a>{" "}
        on Pexels
      </p>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <Content />
      </div>

      <section className="border-t border-[var(--line)] py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">Ready to talk about your space?</h2>
          <Link href="/contact" className="btn btn-primary mt-6">
            Start a Project
          </Link>
        </div>
      </section>
    </article>
  );
}
