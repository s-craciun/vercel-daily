"use client";

import { ButtonVariants } from "@/constants/constants";
import { useRouter } from "next/navigation";
import { ClientButton } from "../button/client-button";
import { type FC } from "react";

interface INoAvailableArticlesProps {
  message?: string;
}

export const NoAvailableArticles: FC<INoAvailableArticlesProps> = ({
  message,
}) => {
  const router = useRouter();
  const messageToDisplay = message
    ? message
    : "We're sorry, but there are currently no articles available. Please check back later for updates!";

  const handleBackClick = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center justify-center py-10 h-[50vh]">
      <h2 className="text-2xl font-bold mb-4">No articles available</h2>
      <p className="text-muted-foreground mb-4">{messageToDisplay}</p>
      {!messageToDisplay && (
        <ClientButton
          variant={ButtonVariants.OUTLINE}
          onClick={handleBackClick}
        >
          Go to Home page
        </ClientButton>
      )}
    </div>
  );
};
