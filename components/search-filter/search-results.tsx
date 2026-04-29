import { GRID_CONTAINER } from "@/constants/constants";
import { getArticlesByParams } from "@/utils/cached-fetch";
import { ArticleListItem } from "../articles/article-list-item";
import { NoAvailableArticles } from "../layout/no-available-articles";
import { type FC } from "react";
import { type ISearchPageProps } from "@/app/search/page";

export const SearchResults: FC<ISearchPageProps> = async ({ searchParams }) => {
  // Well, in this case I cannot make a parallel await because
  // I need the search and category params to fetch the articles,
  // so I'm awaiting them sequentially
  const { search, category } = await searchParams;
  const articles = await getArticlesByParams({ search, category });

  return articles?.length ? (
    <div className={GRID_CONTAINER}>
      {articles.map((article) => {
        return <ArticleListItem key={article.id} article={article} />;
      })}
    </div>
  ) : (
    <NoAvailableArticles message="No matching articles. Please change your filters." />
  );
};
