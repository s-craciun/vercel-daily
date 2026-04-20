"use client";

import { API_METHODS } from "@/constants/constants";
import { getServerApi } from "@/utils/get-server-api";
import {
  createContext,
  type FC,
  memo,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ISubscriptionContext {
  status: boolean;
  setSubscriptionData: () => void;
  checkSubscriptionStatus: () => void;
}

const SubscriptionContext = createContext<ISubscriptionContext>({
  status: false,
  setSubscriptionData: () => {},
  checkSubscriptionStatus: () => {},
});

export const SubscriptionContextProvider: FC<PropsWithChildren> = memo(
  function Provider({ children }) {
    const [status, setStatus] = useState(false);

    useEffect(() => {
      const getSubscriptionStatus = async () => {
        const api = await getServerApi("/subscription");
        const { ok } = await fetch(api.url, {
          method: API_METHODS.GET,
        });

        if (!ok) {
          return;
        }

        setStatus(ok);
      };

      getSubscriptionStatus();
    });

    const setSubscriptionData = () => {};
    const checkSubscriptionStatus = () => {};

    const value = useMemo(() => {
      return {
        status,
        setSubscriptionData,
        checkSubscriptionStatus,
      };
    }, [status]);

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
