import { type Metadata } from "next";
import { ButtonVariants } from "@/constants/constants";
import { Button } from "@/components/button/button";

export const metadata: Metadata = {
  title: "Articles Not Found :(",
  description: "No articles found.",
};

export default function ArticlesNotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-6 max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">No Articles Found D:</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            Articles not available
          </h2>
        </div>

        <p className="text-center text-muted-foreground">
          It looks like Articles page is not available right now. Check back
          later or explore other sections of our site.
        </p>

        <div className="flex gap-3 w-full flex-col sm:flex-row justify-center">
          <Button
            href="/search"
            variant={ButtonVariants.OUTLINE}
            className="flex-1"
          >
            Search
          </Button>
          <Button href="/" className="flex-1">
            Go to Home Page
          </Button>
        </div>
      </div>
    </section>
  );
}
