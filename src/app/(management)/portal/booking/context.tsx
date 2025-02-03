"use client";
import React, { useContext, useState } from "react";
import { Dispatch, SetStateAction, createContext } from "react";
import { initPortalBookingManagerState } from "./reducer";
import { PortalBookingManagerFormData } from "@/app/(management)/portal/booking/modules/bookingInformation.interface";

const PortalBookingManagerContext = createContext<
  [PortalBookingManagerFormData, Dispatch<SetStateAction<PortalBookingManagerFormData>>] | undefined
>(undefined);

const PortalBookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookingInformation, setBookingInformation] = useState(initPortalBookingManagerState);
  return (
    <PortalBookingManagerContext.Provider value={[bookingInformation, setBookingInformation]}>
      {children}
    </PortalBookingManagerContext.Provider>
  );
};

const usePortalBookingManager = () => {
  const context = useContext(PortalBookingManagerContext);

  if (!context) {
    throw new Error("useBooking must be used inside the BookingProvider");
  }
  return context;
};

const usePortalBookingManagerSelector = <T,>(selector?: (state: PortalBookingManagerFormData) => T) => {
  const context = useContext(PortalBookingManagerContext);

  if (!context) {
    throw new Error("useBooking must be used inside the BookingProvider");
  }
  const [booingManager, _] = context;

  return selector?.(booingManager) || booingManager;
};

export { PortalBookingManagerContext, PortalBookingProvider, usePortalBookingManager, usePortalBookingManagerSelector };
