"use client";

import { ClientButton } from "@/components/button/client-button";
import { ButtonVariants } from "@/constants/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ArticlesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("[Articles Page Error Boundary]", error);
  }, [error]);

  const handleRetry = () => {
    reset();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center justify-center gap-6 max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Oops!</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
            Failed to load articles
          </h2>
        </div>

        <p className="text-center text-muted-foreground">
          We couldn&#39;t load the articles list. This might be a temporary
          issue. Please try again or return to the home page.
        </p>

        {process.env.NODE_ENV === "development" && error && (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-red-900 mb-2">
              Error Details (Development Only):
            </p>
            <p className="text-xs text-red-800 font-mono break-words mb-2">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-600">
                Error ID: <span className="font-mono">{error.digest}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3 w-full flex-col sm:flex-row justify-center">
          <ClientButton
            variant={ButtonVariants.OUTLINE}
            onClick={handleRetry}
            className="flex-1"
          >
            Try Again
          </ClientButton>
          <ClientButton onClick={handleHome} className="flex-1">
            Go to Home Page
          </ClientButton>
        </div>
      </div>
    </section>
  );
}
