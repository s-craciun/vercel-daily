import { GRID_CONTAINER } from "@/constants/constants";
import { getArticlesByParams } from "@/utils/cached-fetch";
import { ArticleListItem } from "../articles/article-list-item";
import { NoAvailableArticles } from "../layout/no-available-articles";
import { type FC } from "react";

export const SearchResults: FC<{
  search?: string;
  category?: string;
}> = async ({ search, category }) => {
  const articles = await getArticlesByParams({ search, category, limit: 5 });

  return articles?.length ? (
    <div className={GRID_CONTAINER}>
      {articles.map((article, index) => {
        return (
          <ArticleListItem index={index} key={article.id} article={article} />
        );
      })}
    </div>
  ) : (
    <NoAvailableArticles message="No matching articles. Please change your filters." />
  );
};
