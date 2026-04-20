"use server";

import { ApiFetch } from "@/lib/api-fetch";
import { type ISubscription } from "@/types/subscription";
import { type IApiResponse } from "@/types/types";
import { API_METHODS, SUBSCRIPTION_TOKEN_NAME } from "../constants/constants";
import { cookies } from "next/headers";

export const getSubscriptionToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SUBSCRIPTION_TOKEN_NAME)?.value;
  return token;
};

const setSubscriptionToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(SUBSCRIPTION_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
};

const deleteSubscriptionToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SUBSCRIPTION_TOKEN_NAME);
};

export const createSubscription = async () => {
  const {
    data: { data: subscriptionDetails },
  } = await ApiFetch<IApiResponse<ISubscription>>(
    `/subscription/create`,
    null,
    {
      method: API_METHODS.POST,
    }
  );

  await activateCheckSubscription(subscriptionDetails.token);
};

export const activateCheckSubscription = async (token: string) => {
  const {
    data: { data: subscriptionDetails },
  } = await ApiFetch<IApiResponse<ISubscription>>(`/subscription`, null, {
    headers: { "x-subscription-token": token },
    method: API_METHODS.POST,
  });

  await setSubscriptionToken(subscriptionDetails.token);
};

export const deactivateSubscription = async () => {
  const token = await getSubscriptionToken();

  if (token) {
    await ApiFetch<IApiResponse<ISubscription>>(`/subscription`, null, {
      headers: { "x-subscription-token": token },
      method: API_METHODS.DELETE,
    });
  }

  await deleteSubscriptionToken();
};
