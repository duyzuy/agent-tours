"use client";

import { useReducer } from "react";

import { AppManagerContext } from "../context";
import rootReducer, { rootState } from "../reducers/rootReducer";

type Props = {
  children?: React.ReactNode;
};

export const AppManagerProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(rootReducer, rootState);
  return <AppManagerContext.Provider value={[state, dispatch]}>{children}</AppManagerContext.Provider>;
};
