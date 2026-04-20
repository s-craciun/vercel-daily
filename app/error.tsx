"use client";

import { ClientButton } from "@/components/button/client-button";
import { ButtonVariants } from "@/constants/constants";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="h-150 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-muted-foreground mb-4">
        An unexpected error has occurred. Please come back later.
      </p>
      <ClientButton variant={ButtonVariants.OUTLINE} onClick={handleBackClick}>
        Go to Home page
      </ClientButton>
    </div>
  );
}
