"use client";
import { createContext, useContext, useReducer } from "react";

import { AppActions } from "./type";

import rootReducer, { rootState, RootStateType } from "./rootReducer";

export const AppManagerContext = createContext<[RootStateType, React.Dispatch<AppActions>] | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, rootState);
  return <AppManagerContext.Provider value={[state, dispatch]}>{children}</AppManagerContext.Provider>;
};

const useAppManager = () => {
  const context = useContext(AppManagerContext);
  if (!context) {
    throw new Error("Hook must use in AppProvider");
  }
  return context;
};

const useAppSelector = <T,>(selector: (state: RootStateType) => T) => {
  const context = useContext(AppManagerContext);
  if (!context) {
    throw new Error("Hook must use in AppProvider");
  }
  const [state, _] = context;
  return selector(state);
};

export { AppProvider, useAppManager, useAppSelector };
