import { type Metadata } from "next";
import { ButtonVariants } from "@/constants/constants";
import { Button } from "@/components/button/button";

export const metadata: Metadata = {
  title: "Article not found :(",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h1 className="text-3xl font-bold mb-4">404 - Not Found D:</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Seems this article does not exist... Browse our articles to find
        something interesting for you!
      </p>
      <Button href="/articles" variant={ButtonVariants.OUTLINE}>
        Go Browse Articles
      </Button>
    </div>
  );
}
