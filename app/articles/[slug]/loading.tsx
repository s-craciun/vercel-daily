import { ArticleDetailsFallback } from "@/components/layout/fallbacks";
import { CONTAINER_PADDING } from "@/constants/constants";

export default function ArticleDetailsLoading() {
  return (
    <section className={CONTAINER_PADDING}>
      <ArticleDetailsFallback />
    </section>
  );
}
