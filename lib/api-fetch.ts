import { API_METHODS } from "@/constants/constants";

export const ApiFetch = async <T>(
  url: string,
  reqBody?: Record<string, unknown> | null,
  params?: Parameters<typeof fetch>[1]
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://vercel-daily-news-api.vercel.app/api";
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

    const res = await fetch(baseUrl + url, {
      ...finalParams,
      headers: {
        ...baseParams.headers,
        ...finalParams.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const resBody = await res.json();

    return { data: resBody as T, ok: true };
  } catch (error) {
    return { data: {} as T, ok: false };
  }
};
