import { API_METHODS } from "@/constants/constants";
import { notFound } from "next/navigation";

export const ApiFetch = async <T>(
  url: string,
  reqBody?: Record<string, unknown> | null,
  params?: Parameters<typeof fetch>[1]
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const baseParams: Parameters<typeof fetch>[1] = {
    headers: {
      "x-vercel-protection-bypass": process.env.VERCEL_PROTECTION_BYPASS || "",
    },
    method: API_METHODS.GET,
  };

  try {
    const finalParams = { ...baseParams, ...(params || {}) };

    if (reqBody) {
      finalParams.body = JSON.stringify(reqBody);
    }

    console.log("Making API request to:", baseUrl + url);
    const res = await fetch(baseUrl + url, {
      ...finalParams,
      headers: {
        ...baseParams.headers,
        ...finalParams.headers,
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }

      throw new Error(`API request failed with status ${res.status}`);
    }

    const resBody = await res.json();

    return { data: resBody as T, ok: true };
  } catch (error) {
    return { data: {} as T, ok: false };
  }
};
