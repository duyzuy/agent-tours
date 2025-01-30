"use client";
import { createContext, useContext, useReducer } from "react";
import { ModalManager } from "./modal.type";
import { modalReducer, initModalState } from "./modalReduer";
import { ModalManagerActions } from "./modalActions";

export const ModalsManagerContext = createContext<[ModalManager, React.Dispatch<ModalManagerActions>] | undefined>(
  undefined,
);

export const ModalManagerProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initModalState);
  return <ModalsManagerContext.Provider value={[state, dispatch]}>{children}</ModalsManagerContext.Provider>;
};

export const useModalManager = () => {
  const context = useContext(ModalsManagerContext);
  if (!context) {
    throw new Error("Hook must use under Modal manager provider");
  }
  return context;
};

export const useModalManagerSelector = <T,>(selector: (state: ModalManager) => T) => {
  const booking = useContext(ModalsManagerContext);
  if (!booking) {
    throw new Error("Hook must use under Booking provider");
  }
  const [state, _] = booking;
  return selector(state);
};
