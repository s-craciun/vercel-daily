import {
  createSubscriptionAction,
  deactivateSubscriptionAction,
} from "./subscription-server-actions";

export const createSubscription = async (callback?: () => void) => {
  try {
    await createSubscriptionAction();

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
    await deactivateSubscriptionAction();

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
