"use client";
import React from "react";
import { MenuManagerProvider } from "./store/manageMenuContext";
interface Props {
  children: React.ReactNode;
}

const MenuLayout: React.FC<Props> = ({ children }) => {
  return <MenuManagerProvider>{children}</MenuManagerProvider>;
};
export default MenuLayout;
