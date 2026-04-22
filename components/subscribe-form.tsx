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
  const {
    status,
    loading,
    error,
    setLoading,
    setError,
    checkSubscriptionStatus,
  } = useSubscriptionContext();

  const handleSubscriptionToggle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (status) {
        await deactivateSubscription(checkSubscriptionStatus);
      } else {
        await createSubscription(checkSubscriptionStatus);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [status, setLoading, setError, checkSubscriptionStatus]);

  return (
    <div>
      {!loading ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex justify-center items-center gap-5">
            {withLabel && (
              <span className="text-sm text-muted-foreground">
                {error ? (
                  <span className="text-sm text-red-500">{error}</span>
                ) : status ? (
                  "You are subscribed!"
                ) : (
                  "You are not subscribed yet!"
                )}
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
        </div>
      ) : (
        <span className="inline-flex items-center text-sm text-muted-foreground px-4 py-2 font-medium">
          Processing your subscription...
        </span>
      )}
    </div>
  );
};
