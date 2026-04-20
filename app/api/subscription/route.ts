import { getSubscriptionToken } from "@/utils/subscription-actions";
import { NextResponse } from "next/server";

export async function GET() {
  const subscriptionToken = await getSubscriptionToken();

  if (!subscriptionToken) {
    return NextResponse.json(
      { success: false, message: "No subscription token found" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
