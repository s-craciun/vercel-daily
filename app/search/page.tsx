import { getArticlesByParams, getCategories } from "@/utils/cached-fetch";
import { CONTAINER_PADDING, GRID_CONTAINER } from "@/constants/constants";
import { type Metadata } from "next";
import { ArticleListItem } from "@/components/article-list-item";
import { ArticlesFallback } from "@/components/layout/fallbacks";
import { NoAvailableArticles } from "@/components/layout/no-available-articles";
import { Suspense } from "react";
import { SearchFilterForm } from "@/components/search-filter/search-filter-form";

export const metadata: Metadata = {
  title: "Search",
  description: "Find articles by keywords or categories.",
  openGraph: {
    title: "Vercel Daily - Search Articles",
    description: "Find articles by keywords or categories.",
    siteName: "Vercel Daily",
    type: "website",
  },
};

interface ISearchPageProps {
  searchParams: {
    search?: string;
    category?: string;
  };
}

export default async function SearchPage({ searchParams }: ISearchPageProps) {
  const { search, category } = await searchParams;
  const [articles, categories] = await Promise.all([
    getArticlesByParams({
      search,
      category,
      limit: 5,
    }),
    getCategories(),
  ]);

  return (
    <section className={CONTAINER_PADDING}>
      <h1 className="text-3xl font-bold mb-4">Search Articles</h1>
      <SearchFilterForm
        initialSearch={search}
        initialCategory={category}
        categories={categories}
      />
      <Suspense fallback={<ArticlesFallback />}>
        {articles?.length ? (
          <div className={GRID_CONTAINER}>
            {articles.map((article) => {
              return <ArticleListItem key={article.id} article={article} />;
            })}
          </div>
        ) : (
          <NoAvailableArticles message="No matching articles. Please change your filters." />
        )}
      </Suspense>
    </section>
  );
}
