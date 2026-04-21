import { API_METHODS, API_ROUTES } from "../constants/constants";
import { getServerApi } from "./get-server-api";

export const createSubscription = async (callback?: () => void) => {
  const apiParams = await getServerApi(API_ROUTES.SUBSCRIPTION);
  await fetch(apiParams.url, { method: API_METHODS.POST });
  if (callback) {
    callback();
  }
};

export const deactivateSubscription = async (callback?: () => void) => {
  const apiParams = await getServerApi(API_ROUTES.SUBSCRIPTION);
  await fetch(apiParams.url, { method: API_METHODS.DELETE });
  if (callback) {
    callback();
  }
};
