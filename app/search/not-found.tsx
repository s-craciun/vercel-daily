import { type Metadata } from "next";
import { ButtonVariants } from "@/constants/constants";
import { Button } from "@/components/button/button";

export const metadata: Metadata = {
  title: "Search Results Not Found",
  description: "No results found for your search.",
};

export default function SearchNotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-6 max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">No Results</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            Search results not found
          </h2>
        </div>

        <p className="text-center text-muted-foreground">
          We couldn&#39;t find any articles matching your search criteria. Try
          different keywords or browse all articles.
        </p>

        <div className="flex gap-3 w-full flex-col sm:flex-row justify-center">
          <Button
            href="/articles"
            variant={ButtonVariants.OUTLINE}
            className="flex-1"
          >
            Browse Articles
          </Button>
          <Button href="/" className="flex-1">
            Go Home
          </Button>
        </div>
      </div>
    </section>
  );
}
