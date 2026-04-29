import { getArticleBySlug } from "@/utils/cached-fetch";
import { formatArticleCategory, formatDate } from "@/utils/format-data";
import { ArticleContent } from "./article-content";
import Image from "next/image";
import { checkSubscriptionStatus } from "@/lib/subscription";
import { notFound } from "next/navigation";

export const ArticleDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const [article, isSubscribed] = await Promise.all([
    getArticleBySlug(slug),
    checkSubscriptionStatus(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <article className="mb-10">
      <div className="md:flex justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">{article.title}</h1>
          <span className="text-muted-foreground">
            {formatArticleCategory(article.category)}
          </span>
        </div>
        <div className="text-muted-foreground">
          <span>{article.author.name}</span>
          <span className="mx-3">|</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
      <div className="relative w-[60vw] h-96 mx-auto mb-6">
        <Image
          className="rounded-lg object-cover"
          src={article.image}
          alt={article.title}
          fill
          preload
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      <ArticleContent article={article} isSubscribed={isSubscribed} />
    </article>
  );
};
