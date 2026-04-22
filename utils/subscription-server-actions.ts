"use server";

import { SUBSCRIPTION_TOKEN_NAME } from "@/constants/constants";
import { cookies } from "next/headers";

export const checkSubscriptionStatusAction = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const subscriptionToken = cookieStore.get(SUBSCRIPTION_TOKEN_NAME)?.value;
    return !!subscriptionToken;
  } catch {
    return false;
  }
};
