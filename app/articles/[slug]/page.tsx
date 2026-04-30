import {
  ArticleDetailsFallback,
  SpecificArticleSectionFallback,
} from "@/components/layout/fallbacks";
import { TrendingArticles } from "@/components/articles/trending-articles";
import { CONTAINER_PADDING } from "@/constants/constants";
import { getAllArticles, getArticleBySlug } from "@/utils/cached-fetch";
import type { ResolvingMetadata, Metadata } from "next";
import { Suspense } from "react";
import { type Components } from "react-markdown";
import { ArticleContent } from "@/components/articles/article-content";
import { checkSubscriptionStatus } from "@/lib/subscription";
import { formatArticleCategory, formatDate } from "@/utils/format-data";
import { notFound } from "next/navigation";
import Image from "next/image";

export const MarkdownComponents: Components = {
  p: ({ children }) => (
    <p className="leading-relaxed text-muted-foreground text-sm">{children}</p>
  ),
  a: ({ children, href }) => (
    <a
      className="underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

export interface IArticleDetailsPageProps {
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
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) {
      return {
        title: "Article not found :(",
      };
    }
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
  return (
    <section className={CONTAINER_PADDING}>
      <Suspense fallback={<ArticleDetailsFallback />}>
        <ArticleDetails params={params} />
      </Suspense>
      <Suspense fallback={<SpecificArticleSectionFallback />}>
        <TrendingArticles />
      </Suspense>
    </section>
  );
}

const ArticleDetails = async ({
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
