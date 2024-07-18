"use client";
import React from "react";
import { MenuManagerContext } from "./store/manageMenuContext";
import { useReducer } from "react";
import { initMenuManagerState, menuManagerReducer } from "./store/reducer";
interface Props {
  children: React.ReactNode;
}

const MenuManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuManagerState, dispatch] = useReducer(menuManagerReducer, initMenuManagerState);
  return <MenuManagerContext.Provider value={[menuManagerState, dispatch]}>{children}</MenuManagerContext.Provider>;
};
const LayoutMenuPage: React.FC<Props> = ({ children }) => {
  return <MenuManagerProvider>{children}</MenuManagerProvider>;
};
export default LayoutMenuPage;
