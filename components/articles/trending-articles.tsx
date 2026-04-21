import { GRID_CONTAINER } from "@/constants/constants";
import { getTrendingArticles } from "@/utils/cached-fetch";
import { ArticleListItem } from "./article-list-item";

export const TrendingArticles = async () => {
  const trendingArticles = await getTrendingArticles();

  return (
    !!trendingArticles?.length && (
      <div>
        <h1 className="text-3xl font-bold mb-4">Trending articles</h1>
        <div className={GRID_CONTAINER}>
          {trendingArticles.map((article) => {
            return <ArticleListItem key={article.id} article={article} />;
          })}
        </div>
      </div>
    )
  );
};
