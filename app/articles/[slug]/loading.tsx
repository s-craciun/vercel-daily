import { ArticleDetailsFallback } from "@/components/layout/fallbacks";
import { CONTAINER_PADDING } from "@/constants/constants";

export default function ArticleDetailsLoading() {
  return (
    <div className={CONTAINER_PADDING}>
      <ArticleDetailsFallback />
    </div>
  );
}
