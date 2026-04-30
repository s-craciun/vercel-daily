import Link from "next/link";
import Image from "next/image";
import { type IArticle } from "@/types/article";
import { type FC } from "react";
import { DOT } from "@/constants/constants";
import { formatArticleCategory, formatDate } from "@/utils/format-data";

interface IArticleListItemProps {
  index?: number;
  article: IArticle;
}

export const ArticleListItem: FC<IArticleListItemProps> = ({
  index,
  article,
}) => {
  const isFirstRow = index !== undefined && index < 3;

  return (
    <Link
      key={article.id}
      href={`/articles/${article.slug ?? article.id}`}
      prefetch={isFirstRow} // Only prefetch for the first row (potentially visible :D) to optimize performance
    >
      <article>
        <div className="relative w-full aspect-[16/9] mb-2">
          <Image
            className="rounded-lg object-cover"
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading={isFirstRow ? "eager" : "lazy"}
          />
        </div>
        <span className="leading-relaxed text-muted-foreground text-sm">
          {formatArticleCategory(article.category)}
          <span className="mx-2">{DOT}</span>
          {formatDate(article.publishedAt)}
        </span>
        <h3 className="font-semibold my-1">{article.title}</h3>
        <p className="leading-relaxed text-muted-foreground text-sm">
          {article.excerpt}
        </p>
      </article>
    </Link>
  );
};
