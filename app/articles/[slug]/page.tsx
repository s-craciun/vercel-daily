import { ArticleContent } from "@/components/articles/article-content";
import { ArticlesFallback } from "@/components/layout/fallbacks";
import { TrendingArticles } from "@/components/articles/trending-articles";
import { CONTAINER_PADDING } from "@/constants/constants";
import { getAllArticles, getArticleBySlug } from "@/utils/cached-fetch";
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

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
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
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className={CONTAINER_PADDING}>
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
        <Image
          src={article.image}
          alt={article.title}
          width={600}
          height={600}
          className="mb-6 rounded-lg w-[60vw] object-cover mx-auto"
        />
        <ArticleContent article={article} />
      </article>
      <Suspense fallback={<ArticlesFallback />}>
        <TrendingArticles />
      </Suspense>
    </section>
  );
}
