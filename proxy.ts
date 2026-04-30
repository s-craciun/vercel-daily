import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUBSCRIPTION_COOKIE_NAME } from "./constants/constants";

export function proxy(req: NextRequest) {
  const token = req.cookies.get(SUBSCRIPTION_COOKIE_NAME)?.value;

  if (token) {
    const headers = new Headers(req.headers);
    headers.set("x-daily-news-subscriber", token);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*"],
};
