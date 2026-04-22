import { API_METHODS, API_ROUTES } from "../constants/constants";
import { getServerApi } from "./get-server-api";

export const createSubscription = async (callback?: () => void) => {
  try {
    const apiParams = await getServerApi(API_ROUTES.SUBSCRIPTION);
    const response = await fetch(apiParams.url, { method: API_METHODS.POST });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to create subscription`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to create subscription");
    }

    if (callback) {
      callback();
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create subscription";
    console.error("[createSubscription] Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const deactivateSubscription = async (callback?: () => void) => {
  try {
    const apiParams = await getServerApi(API_ROUTES.SUBSCRIPTION);
    const response = await fetch(apiParams.url, { method: API_METHODS.DELETE });

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: Failed to deactivate subscription`
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to deactivate subscription");
    }

    if (callback) {
      callback();
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to deactivate subscription";
    console.error("[deactivateSubscription] Error:", errorMessage);
    throw new Error(errorMessage);
  }
};
