"use client";
import { UserManagerContext } from "../context";
import { useReducer } from "react";
import { initUserManagerState, userManagerReducer } from "../reducers";
type Props = {
  children?: React.ReactNode;
};

export const UserManagerProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(userManagerReducer, initUserManagerState);
  return <UserManagerContext.Provider value={[state, dispatch]}>{children}</UserManagerContext.Provider>;
};
