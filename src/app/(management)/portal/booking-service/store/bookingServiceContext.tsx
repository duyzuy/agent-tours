"use client";
import React, { useContext, useReducer, createContext } from "react";
import { initPortalBookingServices } from "./bookingServiceReducer";
import { PortalBookingServiceFormData } from "./bookingService.type";
import { portalBookingServiceReducer } from "./bookingServiceReducer";
import { PortalBookingServiceActions } from "./bookingServiceAction";

const PortalBookingServiceManagerContext = createContext<
  [PortalBookingServiceFormData, React.Dispatch<PortalBookingServiceActions>] | undefined
>(undefined);

const PortalBookingServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [initServiceState, dispatch] = useReducer(portalBookingServiceReducer, initPortalBookingServices);
  return (
    <PortalBookingServiceManagerContext.Provider value={[initServiceState, dispatch]}>
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

const usePortalBookingServiceSelector = <T,>(selector: (state: PortalBookingServiceFormData) => T) => {
  const context = useContext(PortalBookingServiceManagerContext);

  if (!context) {
    throw new Error("useBooking must be used inside the BookingProvider");
  }
  const [booingManager, _] = context;

  return selector?.(booingManager);
};

export { PortalBookingServiceProvider, usePortalBookingServiceManager, usePortalBookingServiceSelector };
