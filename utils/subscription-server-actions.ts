"use server";

import {
  API_METHODS,
  API_ROUTES,
  SUBSCRIPTION_TOKEN_NAME,
} from "@/constants/constants";
import { ApiFetch } from "@/lib/api-fetch";
import { type ISubscription } from "@/types/subscription";
import { type IApiResponse } from "@/types/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const checkSubscriptionStatusAction = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const subscriptionToken = cookieStore.get(SUBSCRIPTION_TOKEN_NAME)?.value;
    return !!subscriptionToken;
  } catch {
    return false;
  }
};

export const createSubscriptionAction = async (): Promise<void> => {
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
    cookieStore.set(SUBSCRIPTION_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 84600,
    });

    revalidatePath("/");
  } catch (error) {
    console.error("[createSubscriptionAction] Error:", error);
    throw new Error("Failed to create subscription");
  }
};

export const deactivateSubscriptionAction = async (): Promise<void> => {
  try {
    const cookieStore = await cookies();
    const subscriptionToken = cookieStore.get(SUBSCRIPTION_TOKEN_NAME)?.value;

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

    cookieStore.delete(SUBSCRIPTION_TOKEN_NAME);
    revalidatePath("/");
  } catch (error) {
    console.error("[deactivateSubscriptionAction] Error:", error);
    throw new Error("Failed to deactivate subscription");
  }
};
