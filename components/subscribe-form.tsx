"use client";

import {
  createSubscription,
  deactivateSubscription,
} from "@/utils/subscription-actions";
import { Button } from "./button/button";
import { useSubscriptionContext } from "@/context/subscription-context";
import { ButtonVariants } from "@/constants/constants";
import { type FC } from "react";

interface ISubscribeFormProps {
  withLabel?: boolean;
}

export const SubscribeForm: FC<ISubscribeFormProps> = ({ withLabel }) => {
  const { status } = useSubscriptionContext();

  return (
    <form
      className="flex justify-center items-center gap-2"
      action={() => {
        if (status) {
          deactivateSubscription();
        } else {
          createSubscription();
        }
      }}
    >
      {withLabel && (
        <span className="text-sm text-muted-foreground">
          {status ? "You are subscribed!" : "You are not subscribed yet!"}
        </span>
      )}
      <Button
        type="submit"
        variant={status ? ButtonVariants.OUTLINE : ButtonVariants.DEFAULT}
      >
        {status ? "Unsubscribe" : "Subscribe"}
      </Button>
    </form>
  );
};
