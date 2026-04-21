import { type Metadata } from "next";
import { Button } from "../components/button/button";
import { ButtonVariants } from "@/constants/constants";

export const metadata: Metadata = {
  title: "Not Found :(",
};

export default function NotFound() {
  const message = "Oops! The page you're looking for doesn't exist.";

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h1 className="text-3xl font-bold mb-4">404 - Not Found D:</h1>
      <p className="text-lg text-muted-foreground mb-6">{message}</p>
      <Button href="/" variant={ButtonVariants.OUTLINE}>
        Go Back Home
      </Button>
    </div>
  );
}
