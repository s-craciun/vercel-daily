import Link from "next/link";
import Image from "next/image";
import { type IArticle } from "@/types/article";
import { type FC } from "react";
import { DOT } from "@/constants/constants";
import { formatArticleCategory, formatDate } from "@/utils/format-data";

interface IArticleListItemProps {
  article: IArticle;
}

export const ArticleListItem: FC<IArticleListItemProps> = ({ article }) => {
  return (
    <Link key={article.id} href={`/articles/${article.slug ?? article.id}`}>
      <article>
        <Image
          className="w-full border border-gray-200 rounded-lg object-cover mb-2 h-65"
          src={article.image}
          alt={article.title}
          width={300}
          height={120}
        />
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
