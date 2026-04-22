import { type Metadata } from "next";
import { Button } from "@/components/button/button";
import { ButtonVariants } from "@/constants/constants";

export const metadata: Metadata = {
  title: "Not Found :(",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-6 max-w-md">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            Page Not Found D:
          </h2>
        </div>

        <p className="text-center text-muted-foreground">
          Sorry, the page you&#39;re looking for doesn&#39;t exist. It may have
          been moved or deleted.
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
            Go to Home Page
          </Button>
        </div>
      </div>
    </section>
  );
}
