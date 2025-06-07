"use client";
import React from "react";

import { PortalBookingServiceProvider } from "./store/bookingServiceContext";
interface BookingServiceLayoutProps {
  children: React.ReactNode;
}
export default function BookingServiceLayout({ children }: BookingServiceLayoutProps) {
  return <PortalBookingServiceProvider>{children}</PortalBookingServiceProvider>;
}
