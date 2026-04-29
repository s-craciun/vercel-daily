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
import { ArticleDetails } from "@/components/articles/article-details";

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
