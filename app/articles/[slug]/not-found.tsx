import { type Metadata } from "next";
import { ButtonVariants } from "@/constants/constants";
import { Button } from "@/components/button/button";

export const metadata: Metadata = {
  title: "Article Not Found :(",
  description: "The article you are looking for does not exist.",
};

export default function ArticleNotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-6 max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Article Not Found D:</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            404
          </h2>
        </div>

        <p className="text-center text-muted-foreground">
          Sorry, the article you&#39;re looking for doesn&#39;t exist. It may
          have been moved, deleted, or the URL might be incorrect. Browse our
          articles to find something interesting for you!
        </p>

        <div className="flex gap-3 w-full flex-col sm:flex-row justify-center">
          <Button
            href="/articles"
            variant={ButtonVariants.OUTLINE}
            className="flex-1"
          >
            Browse Articles
          </Button>
          <Button href="/search" className="flex-1">
            Search
          </Button>
        </div>
        <Button href="/" variant={ButtonVariants.OUTLINE} className="w-full">
          Go Home
        </Button>
      </div>
    </section>
  );
}
