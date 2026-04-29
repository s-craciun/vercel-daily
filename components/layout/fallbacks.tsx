import { CONTAINER_PADDING, GRID_CONTAINER } from "@/constants/constants";

export const HeaderFallback = () => {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-200 bg-background/80 backdrop-blur-md flex flex-col md:flex-row gap-3 items-center ${CONTAINER_PADDING} !py-4`}
    >
      <div className="flex gap-8">
        <div className="flex flex-row items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 rounded" />
          <div className="h-5 w-24 bg-gray-300 rounded" />
        </div>
        <nav className="flex flex-row items-center gap-8">
          <div className="h-4 w-8 bg-gray-300 rounded" />
          <div className="h-4 w-12 bg-gray-300 rounded" />
        </nav>
      </div>
      <div className="md:ml-auto">
        <div className="h-8 w-24 bg-gray-300 rounded" />
      </div>
    </header>
  );
};

export const ArticleFallback = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-65 bg-gray-300 rounded-lg mb-2" />

      <div className="flex items-center gap-2">
        <div className="h-3 w-28 bg-gray-300 rounded" />
        <div className="h-3 w-3 bg-gray-300 rounded-full" />
        <div className="h-3 w-20 bg-gray-300 rounded" />
      </div>

      <div className="space-y-2 my-1">
        <div className="h-5 w-3/4 bg-gray-300 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export const SpecificArticleSectionFallback = ({
  withPadding = false,
}: {
  withPadding?: boolean;
}) => {
  return (
    <section className={withPadding ? CONTAINER_PADDING : ""}>
      <div className="flex justify-between items-start mb-6 animate-pulse">
        <div>
          <div className="h-7 w-32 bg-gray-300 rounded-md mb-1" />
          <div className="h-4 w-48 bg-gray-300 rounded-md" />
        </div>
      </div>

      <ArticlesFallback />
    </section>
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
    <article className="mb-10 animate-pulse">
      <div className="md:flex justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="h-8 w-3/4 bg-gray-300 rounded mb-1" />
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </div>
        <div className="text-muted-foreground">
          <div className="h-4 w-28 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="relative w-[60vw] h-96 mx-auto mb-6">
        <div className="w-full h-full bg-gray-300 rounded-lg" />
      </div>

      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
        <div className="h-4 w-4/6 bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
      </div>
    </article>
  );
}

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

export const SearchFilterFormFallback = () => {
  return (
    <form className="mb-10 animate-pulse">
      <div className="flex flex-col md:flex-row items-center gap-5 mb-5">
        <div className="h-10 w-full rounded-md bg-gray-300" />
        <div className="w-[100%] md:w-[20%]">
          <div className="h-10 w-full rounded-md bg-gray-300" />
        </div>
      </div>
      <div className="h-10 w-32 rounded-md bg-gray-300" />
    </form>
  );
};
