import { ArticlesFallback } from "@/components/layout/fallbacks";
import { CONTAINER_PADDING } from "@/constants/constants";

export default function SearchLoading() {
  return (
    <div className={CONTAINER_PADDING}>
      <div className="w-[50%] h-10 bg-gray-300 rounded animate-pulse mb-4" />
      <div className="w-full h-10 bg-gray-300 rounded animate-pulse mb-4" />
      <div className="w-full h-10 bg-gray-300 rounded animate-pulse mb-5" />
      <ArticlesFallback />
    </div>
  );
}
