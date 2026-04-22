import { getCategories } from "@/utils/cached-fetch";
import { CONTAINER_PADDING } from "@/constants/constants";
import { type Metadata } from "next";
import { ArticlesFallback } from "@/components/layout/fallbacks";
import { Suspense } from "react";
import { SearchFilterForm } from "@/components/search-filter/search-filter-form";
import { SearchResults } from "@/components/search-filter/search-results";

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
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function SearchPage({ searchParams }: ISearchPageProps) {
  const { search, category } = await searchParams;
  const categories = await getCategories();

  return (
    <section className={CONTAINER_PADDING}>
      <h1 className="text-3xl font-bold mb-4">Search Articles</h1>
      <SearchFilterForm
        initialSearch={search}
        initialCategory={category}
        categories={categories}
      />
      <Suspense fallback={<ArticlesFallback />}>
        <SearchResults search={search} category={category} />
      </Suspense>
    </section>
  );
}
