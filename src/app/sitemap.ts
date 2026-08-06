import type { MetadataRoute } from "next";
import { BASE_URL, getAllArticles } from "@/lib/articles";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/team",
  "/articles",
  "/contact",
  "/estimate",
  "/privacy-policy",
  "/terms",
  "/terms-of-service",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...articles.map(({ slug, meta }) => ({
      url: `${BASE_URL}/articles/${slug}`,
      lastModified: new Date(meta.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
