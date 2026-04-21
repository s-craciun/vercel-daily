import { type Metadata } from "next";
import { getBreakingNews } from "@/utils/cached-fetch";
import { BreakingNewsBanner } from "@/components/articles/breaking-news-banner";
import { HeroSection } from "@/components/layout/hero-section";
import { Suspense } from "react";
import { FeaturedSectionFallback } from "@/components/layout/fallbacks";
import { FeaturedArticles } from "@/components/articles/featured-articles";

export const metadata: Metadata = {
  title: "Vercel Daily - Home",
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
  const breakingNews = await getBreakingNews();

  return (
    <div>
      {breakingNews && <BreakingNewsBanner breakingNews={breakingNews} />}
      <HeroSection />
      <Suspense fallback={<FeaturedSectionFallback />}>
        <FeaturedArticles />
      </Suspense>
    </div>
  );
}
