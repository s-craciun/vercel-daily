"use client";

import { ClientButton } from "@/components/button/client-button";
import { ButtonVariants } from "@/constants/constants";
import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error Boundary]", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <section>
          <div>
            <div>
              <h1>Critical Error D:</h1>
              <h2>Application Error</h2>
            </div>

            <p>
              A critical error occurred. The application needs to be reloaded.
              Our team has been notified of this issue.
            </p>

            {process.env.NODE_ENV === "development" && error && (
              <div>
                <p>Error Details (Development Only):</p>
                <p>{error.message}</p>
                {error.digest && (
                  <p>
                    Error ID: <span>{error.digest}</span>
                  </p>
                )}
              </div>
            )}

            <ClientButton
              variant={ButtonVariants.OUTLINE}
              onClick={() => unstable_retry()}
              className="flex-1"
            >
              Retry
            </ClientButton>
          </div>
        </section>
      </body>
    </html>
  );
}
