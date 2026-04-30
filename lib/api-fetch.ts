import { API_METHODS } from "@/constants/constants";
import { type IApiResponse } from "@/types/types";

export const ApiFetch = async <T>(
  url: string,
  reqBody?: Record<string, unknown> | null,
  params?: Parameters<typeof fetch>[1],
): Promise<T & { ok: boolean }> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("API base URL is not defined in environment variables");
    }

    const bypass = process.env.VERCEL_PROTECTION_BYPASS;

    if (!bypass) {
      throw new Error(
        "Vercel protection bypass token is not defined in environment variables",
      );
    }

    const baseParams: Parameters<typeof fetch>[1] = {
      headers: {
        "x-vercel-protection-bypass": bypass,
      },
      method: API_METHODS.GET,
      next: {
        revalidate: 3600,
      },
    };

    const finalParams = {
      ...baseParams,
      ...(params || {}),
      headers: {
        ...baseParams.headers,
        ...(params?.headers || {}),
      },
      next: {
        ...baseParams.next,
        ...(params?.next || {}),
      },
    };

    if (reqBody) {
      finalParams.body = JSON.stringify(reqBody);
      finalParams.headers = {
        ...finalParams.headers,
        "Content-Type": "application/json",
      };
    }

    let res: Response;
    try {
      res = await fetch(baseUrl + url, {
        ...finalParams,
        headers: {
          ...baseParams.headers,
          ...finalParams.headers,
        },
      });
    } catch (fetchError) {
      throw new Error(
        `Network error while fetching ${url}: ${fetchError instanceof Error ? fetchError.message : "Unknown network error"}`,
      );
    }

    if (!res.ok) {
      let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      try {
        const errorData = await res.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (jsonError) {
        // If JSON parsing fails, use the status text
        console.warn(
          `Failed to parse error response JSON for ${url}:`,
          jsonError,
        );
      }
      throw new Error(errorMessage);
    }

    let resBody: IApiResponse<T>;
    try {
      resBody = await res.json();
    } catch (jsonError) {
      throw new Error(
        `Failed to parse JSON response from ${url}: ${jsonError instanceof Error ? jsonError.message : "Invalid JSON"}`,
      );
    }

    if (!resBody.success) {
      const errorMsg = resBody.error?.message || "API request failed";
      throw new Error(errorMsg);
    }

    return { ...(resBody as T), ok: true };
  } catch (error) {
    console.error(`[ApiFetch] Error fetching ${url}:`, error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown API error");
  }
};
