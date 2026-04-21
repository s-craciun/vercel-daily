import {
  API_METHODS,
  API_ROUTES,
  SUBSCRIPTION_TOKEN_NAME,
} from "@/constants/constants";
import { ApiFetch } from "@/lib/api-fetch";
import { type ISubscription } from "@/types/subscription";
import { type IApiResponse } from "@/types/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const activateCheckSubscription = async (token: string) => {
  await ApiFetch<IApiResponse<ISubscription>>(API_ROUTES.SUBSCRIPTION, null, {
    headers: { "x-subscription-token": token },
    method: API_METHODS.POST,
  });

  const cookieStore = await cookies();
  cookieStore.set(SUBSCRIPTION_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 84600,
  });
};

export async function GET() {
  const cookieStore = await cookies();
  const subscriptionToken = cookieStore.get(SUBSCRIPTION_TOKEN_NAME)?.value;

  return NextResponse.json(
    {
      success: !!subscriptionToken,
      hasToken: !!subscriptionToken,
    },
    { status: 200 }
  );
}

export async function POST() {
  const {
    data: { data: subscriptionToken },
  } = await ApiFetch<IApiResponse<ISubscription>>(
    API_ROUTES.CREATE_SUBSCRIPTION,
    null,
    {
      method: API_METHODS.POST,
    }
  );
  const { token } = subscriptionToken || {};

  if (!token) {
    return NextResponse.json({ success: false });
  }

  await activateCheckSubscription(token);

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const subscriptionToken = cookieStore.get(SUBSCRIPTION_TOKEN_NAME)?.value;

  if (subscriptionToken) {
    await ApiFetch<IApiResponse<ISubscription>>(API_ROUTES.SUBSCRIPTION, null, {
      headers: { "x-subscription-token": subscriptionToken },
      method: API_METHODS.DELETE,
    });
  }

  cookieStore.delete(SUBSCRIPTION_TOKEN_NAME);

  return NextResponse.json({ success: true });
}
