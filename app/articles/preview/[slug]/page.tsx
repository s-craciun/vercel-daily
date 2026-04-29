import { ArticlesFallback } from "@/components/layout/fallbacks";
import { TrendingArticles } from "@/components/articles/trending-articles";
import { CONTAINER_PADDING } from "@/constants/constants";
import { getAllArticles, getArticleBySlug } from "@/utils/cached-fetch";
import { formatArticleCategory, formatDate } from "@/utils/format-data";
import type { ResolvingMetadata, Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { MarkdownComponents } from "../../[slug]/page";
import { SubscribeForm } from "@/components/subscribe-form";

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
      title: article.title + " - Preview",
      description: article.excerpt ?? "No excerpt available for this article.",
      openGraph: {
        title: article.title + " - Preview",
        description:
          article.excerpt ?? "No excerpt available for this article.",
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

export default async function ArticleDetailsPreviewPage({
  params,
}: IArticleDetailsPageProps) {
  const { slug } = await params;
  let article;

  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

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
        <ReactMarkdown components={MarkdownComponents}>
          {article.excerpt ?? "No content available for preview."}
        </ReactMarkdown>
      </article>
      {
        <div className="w-[100%] border border-gray-200 rounded-md py-10 px-10 shadow-md mb-10">
          <p className="mb-3 text-center text-sm text-muted-foreground">
            To read the full article, subscribe now.
          </p>
          <SubscribeForm isSubscribed={false} />
        </div>
      }
      <Suspense fallback={<ArticlesFallback />}>
        <TrendingArticles />
      </Suspense>
    </section>
  );
}
