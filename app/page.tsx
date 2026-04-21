import {
  ButtonVariants,
  CONTAINER_PADDING,
  GRID_CONTAINER,
} from "@/constants/constants";
import { type Metadata } from "next";
import { Button } from "@/components/button/button";
import { ArticleListItem } from "@/components/article-list-item";
import { getBreakingNews, getFeaturedArticles } from "@/utils/cached-fetch";
import { Suspense } from "react";
import {
  ArticlesFallback,
  BreakingNewsFallback,
} from "@/components/layout/fallbacks";
import { BreakingNewsBanner } from "@/components/breaking-news-banner";
import { HeroSection } from "@/components/layout/hero-section";

export const metadata: Metadata = {
  title: "Home",
  openGraph: {
    title: "Vercel Daily - Home",
    description: "News and insights for modern web developers.",
    siteName: "Vercel Daily",
    images: [
      {
        url: "https://img.freepik.com/free-photo/cropped-image-businessman-eyeglasses-sitting-by-table-cafe-using-laptop-computer_171337-5604.jpg",
        width: 200,
        height: 150,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function HomePage() {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  const [articles, breakingNews] = await Promise.all([
    getFeaturedArticles(),
    getBreakingNews(),
  ]);

  return (
    <div>
      <Suspense fallback={<BreakingNewsFallback />}>
        {breakingNews && <BreakingNewsBanner breakingNews={breakingNews} />}
      </Suspense>
      <HeroSection />
      <Suspense fallback={<ArticlesFallback />}>
        {!!articles?.length && (
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
              {articles.map((article) => {
                return <ArticleListItem key={article.id} article={article} />;
              })}
            </div>
          </section>
        )}
      </Suspense>
    </div>
  );
}
