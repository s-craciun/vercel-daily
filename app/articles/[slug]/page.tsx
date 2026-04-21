import { ArticleContent } from "@/components/article-content";
import { ArticleListItem } from "@/components/article-list-item";
import {
  ArticleDetailsFallback,
  ArticlesFallback,
} from "@/components/layout/fallbacks";
import { CONTAINER_PADDING, GRID_CONTAINER } from "@/constants/constants";
import { getArticleBySlug, getTrendingArticles } from "@/utils/cached-fetch";
import { formatArticleCategory, formatDate } from "@/utils/format-data";
import type { ResolvingMetadata, Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface IArticleDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: IArticleDetailsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: article.title,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: [
          ...previousImages,
          {
            url: article.image,
            alt: article.title,
            width: 200,
            height: 150,
          },
        ],
        type: "article",
      },
    };
  } catch {
    return {
      title: "Article not found :(",
      description: "No article found with the provided slug.",
    };
  }
}

export default async function ArticleDetailsPage({
  params,
}: IArticleDetailsPageProps) {
  const { slug } = await params;
  const [article, trendingArticles] = await Promise.all([
    getArticleBySlug(slug),
    getTrendingArticles(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <section className={CONTAINER_PADDING}>
      <Suspense fallback={<ArticleDetailsFallback />}>
        <article className="mb-10">
          <div className="flex justify-between mb-4">
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
          <Image
            src={article.image}
            alt={article.title}
            width={600}
            height={600}
            className="mb-6 rounded-lg w-[60vw] object-cover mx-auto"
          />
          <ArticleContent article={article} />
        </article>
      </Suspense>
      <Suspense fallback={<ArticlesFallback />}>
        {!!trendingArticles?.length && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Trending articles</h1>
            <div className={GRID_CONTAINER}>
              {trendingArticles.map((article) => {
                return <ArticleListItem key={article.id} article={article} />;
              })}
            </div>
          </div>
        )}
      </Suspense>
    </section>
  );
}
