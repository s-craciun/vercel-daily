import { ArticleListItem } from "@/components/articles/article-list-item";
import { ArticlesFallback } from "@/components/layout/fallbacks";
import { NoAvailableArticles } from "@/components/layout/no-available-articles";
import { getAllArticles } from "@/utils/cached-fetch";
import { CONTAINER_PADDING, GRID_CONTAINER } from "@/constants/constants";
import { type Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Explore our collection of insightful articles on web development.",
  openGraph: {
    title: "Vercel Daily - Articles",
    description:
      "Explore our collection of insightful articles on web development.",
    siteName: "Vercel Daily",
    type: "website",
  },
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  if (!articles?.length) {
    return <NoAvailableArticles />;
  }

  return (
    <section className={CONTAINER_PADDING}>
      <h1 className="text-3xl font-bold mb-4">Browse our awesome Articles!</h1>
      <Suspense fallback={<ArticlesFallback />}>
        <div className={GRID_CONTAINER}>
          {articles.map((article, index) => {
            return (
              <ArticleListItem
                index={index}
                key={article.id}
                article={article}
              />
            );
          })}
        </div>
      </Suspense>
    </section>
  );
}
