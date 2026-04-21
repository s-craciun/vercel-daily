"use server";

import { API_METHODS, API_ROUTES } from "@/constants/constants";
import { getServerApi } from "./get-server-api";

export const checkSubscriptionStatusAction = async (): Promise<boolean> => {
  try {
    const apiParams = await getServerApi(API_ROUTES.SUBSCRIPTION);
    const res = await fetch(apiParams.url, {
      method: API_METHODS.GET,
      next: { revalidate: 10 },
    });
    const data = await res.json();
    return !!data.hasToken;
  } catch {
    return false;
  }
};
