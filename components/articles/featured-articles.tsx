import {
  CONTAINER_PADDING,
  ButtonVariants,
  GRID_CONTAINER,
} from "@/constants/constants";
import { Button } from "../button/button";
import { ArticleListItem } from "./article-list-item";
import { getFeaturedArticles } from "@/utils/cached-fetch";

export const FeaturedArticles = async () => {
  const featuredArticles = await getFeaturedArticles();

  return (
    !!featuredArticles?.length && (
      <section className={CONTAINER_PADDING}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">
              Featured
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground text-sm">
              Handpicked stories from the team.
            </p>
          </div>
          <Button
            className="col-start-2"
            href="/articles"
            variant={ButtonVariants.LINK}
          >
            View all
          </Button>
        </div>
        <div className={GRID_CONTAINER}>
          {featuredArticles.map((article) => {
            return <ArticleListItem key={article.id} article={article} />;
          })}
        </div>
      </section>
    )
  );
};
