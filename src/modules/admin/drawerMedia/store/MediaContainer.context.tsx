"use client";
import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from "react";
import { drawerMediaContainerReducer } from "./mediaReducer";
import { initDrawerMediaContainerState } from "./mediaReducer";
import { DrawerMediaContainerActions } from "./mediaContainerActions";

type DrawerMediaContextType = typeof initDrawerMediaContainerState;
const DrawerMediaContext = createContext<[DrawerMediaContextType, Dispatch<DrawerMediaContainerActions>] | null>(null);

interface DrawerMediaManagerProviderProps extends PropsWithChildren {}

export const DrawerMediaManagerProvider: React.FC<DrawerMediaManagerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(drawerMediaContainerReducer, initDrawerMediaContainerState);
  return <DrawerMediaContext.Provider value={[state, dispatch]}>{children}</DrawerMediaContext.Provider>;
};

export const useDrawerMediaManager = () => {
  const context = useContext(DrawerMediaContext);

  if (!context) {
    throw new Error("Hook must use under DrawerMediaManager");
  }

  return context;
};
