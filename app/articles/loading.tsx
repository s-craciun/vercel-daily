import { ArticlesFallback, TitleFallback } from "@/components/layout/fallbacks";
import { CONTAINER_PADDING } from "@/constants/constants";

export default function ArticlesLoading() {
  return (
    <section className={CONTAINER_PADDING}>
      <TitleFallback />
      <ArticlesFallback />
    </section>
  );
}
