"use client";

import { ClientButton } from "@/components/button/client-button";

export default function GlobalError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <ClientButton onClick={() => unstable_retry()}>Try again</ClientButton>
      </body>
    </html>
  );
}
