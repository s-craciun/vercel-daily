import { CONTAINER_PADDING, GRID_CONTAINER } from "@/constants/constants";

export const ArticleFallback = () => {
  return (
    <div className="max-w-xl rounded-2xl p-4 space-y-4 animate-pulse">
      <div className="w-full h-65 bg-gray-300 rounded-xl" />

      <div className="flex items-center gap-2">
        <div className="h-3 w-28 bg-gray-300 rounded" />
        <div className="h-3 w-3 bg-gray-300 rounded-full" />
        <div className="h-3 w-20 bg-gray-300 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-gray-300 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export const FeaturedSectionFallback = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-2" />
          <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse" />
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" />
      </div>

      <ArticlesFallback />
    </div>
  );
};

export const ArticlesFallback = () => {
  return (
    <div className={GRID_CONTAINER}>
      {[1, 2, 3].map((i) => {
        return <ArticleFallback key={i} />;
      })}
    </div>
  );
};

export function ArticleDetailsFallback() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="space-y-3">
        <div className="h-8 w-3/4 bg-gray-300 rounded" />
        <div className="h-8 w-2/3 bg-gray-300 rounded" />
      </div>

      <div className="flex justify-between items-center">
        <div className="h-4 w-32 bg-gray-300 rounded" />
        <div className="h-4 w-28 bg-gray-300 rounded" />
      </div>

      <div className="h-3 w-24 bg-gray-300 rounded" />

      <div className="w-full h-[360px] bg-gray-300 rounded-2xl" />

      <div className="space-y-3 pt-4">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
        <div className="h-4 w-4/6 bg-gray-300 rounded" />
      </div>

      <div className="space-y-3 pt-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
        <div className="h-4 w-3/5 bg-gray-300 rounded" />
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export const HeroSectionFallback = () => {
  return (
    <div
      className={`${CONTAINER_PADDING} bg-gray-300 rounded-md animate-pulse !py-20 mb-10`}
    ></div>
  );
};

export const BreakingNewsFallback = () => {
  return (
    <div
      className={`${CONTAINER_PADDING} bg-gray-300 rounded-md animate-pulse !py-4`}
    >
      <div className="h-5 w-1/2 bg-gray-400 rounded mb-2" />
      <div className="h-4 w-full bg-gray-400 rounded" />
    </div>
  );
};
