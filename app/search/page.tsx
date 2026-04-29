import { CONTAINER_PADDING } from "@/constants/constants";
import { type Metadata } from "next";
import {
  ArticlesFallback,
  SearchFilterFormFallback,
} from "@/components/layout/fallbacks";
import { Suspense } from "react";
import { SearchFilterForm } from "@/components/search-filter/search-filter-form";
import { SearchResults } from "@/components/search-filter/search-results";
import { getCategories } from "@/utils/cached-fetch";

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

export interface ISearchPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

async function SearchFilterFormWrapper({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) {
  const categories = await getCategories();
  return (
    <SearchFilterForm
      search={search}
      category={category}
      categories={categories}
    />
  );
}

export default function SearchPage({ searchParams }: ISearchPageProps) {
  return (
    <section className={CONTAINER_PADDING}>
      <h1 className="text-3xl font-bold mb-4">Search Articles</h1>
      <Suspense fallback={<SearchFilterFormFallback />}>
        <SearchPageContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function SearchPageContent({ searchParams }: ISearchPageProps) {
  const { search, category } = await searchParams;

  return (
    <>
      <Suspense fallback={<SearchFilterFormFallback />}>
        <SearchFilterFormWrapper search={search} category={category} />
      </Suspense>
      <Suspense fallback={<ArticlesFallback />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}
