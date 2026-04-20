"use server";

import { cookies, headers } from "next/headers";

export const getServerApi = async (url: string) => {
  const h = await headers();
  const cookie = await cookies();
  const host = h.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  return {
    url: `${protocol}://${host}/api/${url}`,
    headers: {
      cookie: cookie.toString(),
    },
  };
};
