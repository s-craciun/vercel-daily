"use client";

import { API_METHODS, API_ROUTES } from "@/constants/constants";
import { getServerApi } from "@/utils/get-server-api";
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
  setLoading: Dispatch<SetStateAction<boolean>>;
  checkSubscriptionStatus: () => void;
}

const SubscriptionContext = createContext<ISubscriptionContext>({
  status: false,
  loading: false,
  setLoading: () => {},
  checkSubscriptionStatus: () => {},
});

export const SubscriptionContextProvider: FC<PropsWithChildren> = memo(
  function Provider({ children }) {
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkSubscriptionStatus = useCallback(async () => {
      try {
        const api = await getServerApi(API_ROUTES.SUBSCRIPTION);
        const res = await fetch(api.url, {
          method: API_METHODS.GET,
          next: { revalidate: 10 },
        });
        const data = await res.json();
        setStatus(!!data.hasToken);
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
        setLoading,
        checkSubscriptionStatus,
      };
    }, [status, loading, checkSubscriptionStatus]);

    return (
      <SubscriptionContext.Provider value={value}>
        {children}
      </SubscriptionContext.Provider>
    );
  }
);

export const useSubscriptionContext = () => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscriptionContext must be used within a SubscriptionContextProvider"
    );
  }

  return context;
};
