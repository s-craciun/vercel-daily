import {
  ArticlesFallback,
  BreakingNewsFallback,
  HeroSectionFallback,
} from "@/components/layout/fallbacks";

export default function HomeLoading() {
  return (
    <div>
      <BreakingNewsFallback />
      <HeroSectionFallback />
      <ArticlesFallback />
    </div>
  );
}
