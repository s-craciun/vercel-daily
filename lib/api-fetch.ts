import { API_METHODS } from "@/constants/constants";
import { type IApiResponse } from "@/types/types";

export const ApiFetch = async <T>(
  url: string,
  reqBody?: Record<string, unknown> | null,
  params?: Parameters<typeof fetch>[1]
) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("API base URL is not defined in environment variables");
    }

    const bypass = process.env.VERCEL_PROTECTION_BYPASS;

    if (!bypass) {
      throw new Error(
        "Vercel protection bypass token is not defined in environment variables"
      );
    }

    const baseParams: Parameters<typeof fetch>[1] = {
      headers: {
        "x-vercel-protection-bypass": bypass,
      },
      method: API_METHODS.GET,
    };

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
      throw new Error(
        `${baseUrl + url} request failed with status ${res.status}`
      );
    }

    const resBody: IApiResponse<T> = await res.json();

    return { data: resBody as T, ok: true };
  } catch (error) {
    return { data: { message: error } as T, ok: false };
  }
};
