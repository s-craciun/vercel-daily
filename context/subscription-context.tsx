"use client";

import { checkSubscriptionStatusAction } from "@/utils/subscription-server-actions";
import {
  createContext,
  type Dispatch,
  type FC,
  memo,
  type PropsWithChildren,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ISubscriptionContext {
  status: boolean;
  loading: boolean;
  error: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  checkSubscriptionStatus: () => void;
}

const SubscriptionContext = createContext<ISubscriptionContext>({
  status: false,
  loading: false,
  error: null,
  setLoading: () => {},
  setError: () => {},
  checkSubscriptionStatus: () => {},
});

export const SubscriptionContextProvider: FC<PropsWithChildren> = memo(
  function Provider({ children }) {
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkSubscriptionStatus = useCallback(async () => {
      try {
        const hasSubscription = await checkSubscriptionStatusAction();
        setStatus(hasSubscription);
      } catch {
        setStatus(false);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      const checkStatus = async () => {
        checkSubscriptionStatus();
      };

      checkStatus();
    }, [checkSubscriptionStatus]);

    const value = useMemo(() => {
      return {
        status,
        loading,
        error,
        setLoading,
        setError,
        checkSubscriptionStatus,
      };
    }, [status, loading, error, checkSubscriptionStatus]);

    return (
      <SubscriptionContext.Provider value={value}>
        {children}
      </SubscriptionContext.Provider>
    );
  },
);

export const useSubscriptionContext = () => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscriptionContext must be used within a SubscriptionContextProvider",
    );
  }

  return context;
};
