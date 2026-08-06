import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { AUTHORS } from "@/lib/authors";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Practical guides on renovation costs, contracts, and timelines in Iskandar Puteri and Johor Bahru, from the Inzterior team.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <section className="border-b border-[var(--line)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <span className="mb-4 block text-sm font-semibold text-[var(--accent)]">Articles</span>
          <h1 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            Straight answers on renovating in Johor.
          </h1>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
            Practical guides on cost, contracts, and process from the Inzterior team — grounded in
            what we actually see doing this work in Iskandar Puteri and Johor Bahru.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          {articles.length === 0 ? (
            <p className="text-[var(--ink-soft)]">
              New articles are on the way — check back soon.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {articles.map(({ slug, meta }) => (
                <Link
                  key={slug}
                  href={`/articles/${slug}`}
                  className="group block border border-[var(--line)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-panel)]">
                    <Image
                      src={meta.heroImage.src}
                      alt={meta.heroImage.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-lg font-semibold text-[var(--ink)]">{meta.title}</h2>
                    <p className="mb-4 text-sm text-[var(--ink-soft)]">{meta.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--ink-soft)]">
                      <span>{AUTHORS[meta.author].name}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
