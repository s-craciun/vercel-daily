import { getCategories } from "@/utils/cached-fetch";
import { ArticlesFallback } from "@/components/layout/fallbacks";
import { CONTAINER_PADDING } from "@/constants/constants";
import { SearchFilterForm } from "@/components/search-filter/search-filter-form";

export default async function SearchLoading() {
  const categories = await getCategories();

  return (
    <section className={CONTAINER_PADDING}>
      <h1 className="text-3xl font-bold mb-4">Search Articles</h1>
      <SearchFilterForm categories={categories} />
      <ArticlesFallback />
    </section>
  );
}
