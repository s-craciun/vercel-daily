import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUBSCRIPTION_COOKIE_NAME } from "./constants/constants";

export function proxy(req: NextRequest) {
  const token = req.cookies.get(SUBSCRIPTION_COOKIE_NAME)?.value;

  const isArticlePage = req.nextUrl.pathname.startsWith("/articles/");

  if (!isArticlePage) return NextResponse.next();

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = `/articles/preview${req.nextUrl.pathname.replace("/articles", "")}`;

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*"],
};
