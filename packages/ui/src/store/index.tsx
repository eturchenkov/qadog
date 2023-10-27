import { useState, useContext, createContext } from "react";
import type { FC, ReactElement, Dispatch, SetStateAction } from "react";
import type { Store } from "@/types/store";

export const StoreContext = createContext<ContextType | null>(null);

export const StoreProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [store, mutateStore] = useState<Store>({
    epic: null,
    report: { steps: [], id: "" },
  });

  return (
    <StoreContext.Provider value={{ store, mutateStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext) as ContextType;

export type ContextType = {
  store: Store;
  mutateStore: Dispatch<SetStateAction<Store>>;
};
