"use client";

import {
  createSubscription,
  deactivateSubscription,
} from "@/utils/subscription-actions";
import { useSubscriptionContext } from "@/context/subscription-context";
import { ButtonVariants } from "@/constants/constants";
import { useCallback, type FC } from "react";
import { ClientButton } from "./button/client-button";

interface ISubscribeFormProps {
  withLabel?: boolean;
}

export const SubscribeForm: FC<ISubscribeFormProps> = ({ withLabel }) => {
  const { status, loading, setLoading, checkSubscriptionStatus } =
    useSubscriptionContext();

  const handleSubscriptionToggle = useCallback(() => {
    setLoading(true);

    if (status) {
      deactivateSubscription(checkSubscriptionStatus);
    } else {
      createSubscription(checkSubscriptionStatus);
    }
  }, [status, setLoading, checkSubscriptionStatus]);

  return (
    <div>
      {!loading ? (
        <div className="flex justify-center items-center gap-5">
          {withLabel && (
            <span className="text-sm text-muted-foreground">
              {status ? "You are subscribed!" : "You are not subscribed yet!"}
            </span>
          )}
          <ClientButton
            type="submit"
            variant={status ? ButtonVariants.OUTLINE : ButtonVariants.DEFAULT}
            onClick={handleSubscriptionToggle}
          >
            {status ? "Unsubscribe" : "Subscribe"}
          </ClientButton>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground px-4 py-2 font-medium">
          Processing your subscription...
        </span>
      )}
    </div>
  );
};
