import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 text-2xl font-semibold text-[var(--ink)]">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-[var(--ink)]">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 leading-relaxed text-[var(--ink-soft)]">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-[var(--ink-soft)]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-[var(--ink-soft)]">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-soft)]"
    >
      {children}
    </Link>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-[var(--accent)] pl-4 italic text-[var(--ink-soft)]">
      {children}
    </blockquote>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
