"use server";

import {
  API_METHODS,
  API_ROUTES,
  SUBSCRIPTION_COOKIE_NAME,
} from "@/constants/constants";
import { ApiFetch } from "@/lib/api-fetch";
import { type ISubscription } from "./subscription";
import { type IApiResponse } from "@/types/types";
import { cookies } from "next/headers";

export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const subscriptionToken = cookieStore.get(SUBSCRIPTION_COOKIE_NAME)?.value;
    return !!subscriptionToken;
  } catch {
    return false;
  }
};

export const createSubscriptionAction = async (): Promise<boolean> => {
  try {
    const result = await ApiFetch<IApiResponse<ISubscription>>(
      API_ROUTES.CREATE_SUBSCRIPTION,
      null,
      {
        method: API_METHODS.POST,
      },
    );

    const { data: subscriptionToken } = result;
    const { token } = subscriptionToken || {};

    if (!token) {
      throw new Error("No token received from API");
    }

    const cookieStore = await cookies();
    cookieStore.set(SUBSCRIPTION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 84600,
    });

    const status = await checkSubscriptionStatus();

    return !!status;
  } catch (error) {
    console.error("[createSubscriptionAction] Error:", error);
    throw new Error("Failed to create subscription");
  }
};

export const deactivateSubscriptionAction = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const subscriptionToken = cookieStore.get(SUBSCRIPTION_COOKIE_NAME)?.value;

    if (subscriptionToken) {
      await ApiFetch<IApiResponse<ISubscription>>(
        API_ROUTES.SUBSCRIPTION,
        null,
        {
          headers: { "x-subscription-token": subscriptionToken },
          method: API_METHODS.DELETE,
        },
      );
    }

    cookieStore.delete(SUBSCRIPTION_COOKIE_NAME);
    const status = await checkSubscriptionStatus();
    return !!status;
  } catch (error) {
    console.error("[deactivateSubscriptionAction] Error:", error);
    throw new Error("Failed to deactivate subscription");
  }
};

export const toggleSubscriptionFormAction = async (): Promise<{
  status?: boolean;
  error?: string;
}> => {
  try {
    const isSubscribed = await checkSubscriptionStatus();

    let status;

    if (isSubscribed) {
      status = await deactivateSubscriptionAction();
    } else {
      status = await createSubscriptionAction();
    }

    return { status: !!status };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to toggle subscription",
    };
  }
};
