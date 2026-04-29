"use client";

import { toggleSubscriptionFormAction } from "@/utils/subscription-server-actions";
import { ButtonVariants } from "@/constants/constants";
import { useActionState } from "react";
import { ClientButton } from "./button/client-button";
import { useRouter } from "next/navigation";

interface ISubscribeFormProps {
  withLabel?: boolean;
  isSubscribed: boolean;
}

export const SubscribeForm = ({
  withLabel,
  isSubscribed,
}: ISubscribeFormProps) => {
  const router = useRouter();
  const [{ error }, formAction, isPending] = useActionState(
    toggleSubscriptionFormAction,
    {},
  );

  return (
    <form
      action={() => {
        formAction();
        router.refresh();
      }}
    >
      {!isPending ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex justify-center items-center gap-5">
            {withLabel && (
              <span className="text-sm text-muted-foreground">
                {error ? (
                  <span className="text-sm text-red-500">{error}</span>
                ) : isSubscribed ? (
                  "You are subscribed!"
                ) : (
                  "You are not subscribed yet!"
                )}
              </span>
            )}
            <ClientButton
              type="submit"
              variant={
                isSubscribed ? ButtonVariants.OUTLINE : ButtonVariants.DEFAULT
              }
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </ClientButton>
          </div>
        </div>
      ) : (
        <span className="inline-flex items-center text-sm text-muted-foreground px-4 py-2 font-medium">
          Processing your subscription...
        </span>
      )}
    </form>
  );
};
