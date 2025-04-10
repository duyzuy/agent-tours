"use client";
import React, { useContext, useState } from "react";
import { Dispatch, SetStateAction, createContext } from "react";
import { initPortalBookingServiceManagerState } from "./reducer";
import { PortalBookingServiceFormData } from "../bookingInformation.interface";

const PortalBookingServiceManagerContext = createContext<
  [PortalBookingServiceFormData, Dispatch<SetStateAction<PortalBookingServiceFormData>>] | undefined
>(undefined);

const PortalBookingServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookingInformation, setBookingInformation] = useState(initPortalBookingServiceManagerState);
  return (
    <PortalBookingServiceManagerContext.Provider value={[bookingInformation, setBookingInformation]}>
      {children}
    </PortalBookingServiceManagerContext.Provider>
  );
};

const usePortalBookingServiceManager = () => {
  const context = useContext(PortalBookingServiceManagerContext);

  if (!context) {
    throw new Error(
      "usePortalBookingServiceManager must be used inside the PortalBookingServiceManagerContext.Provider",
    );
  }
  return context;
};

const usePortalBookingManagerSelector = <T,>(selector?: (state: PortalBookingServiceFormData) => T) => {
  const context = useContext(PortalBookingServiceManagerContext);

  if (!context) {
    throw new Error("useBooking must be used inside the BookingProvider");
  }
  const [booingManager, _] = context;

  return selector?.(booingManager) || booingManager;
};

export { PortalBookingServiceProvider, usePortalBookingServiceManager, usePortalBookingManagerSelector };
