import { ArticlesFallback } from "@/components/layout/fallbacks";
import { CONTAINER_PADDING } from "@/constants/constants";

export default function ArticlesLoading() {
  return (
    <section className={CONTAINER_PADDING}>
      <h1 className="text-3xl font-bold mb-4">Browse our awesome Articles!</h1>

      <ArticlesFallback />
    </section>
  );
}
